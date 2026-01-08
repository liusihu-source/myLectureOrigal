# Geoserver使用案例



- 导航道路要先打断相交线

  - 略（ArcMap拓扑操作）

- 空间数据库的扩展插件

  ```sql
  CREATE EXTENSION postgis;
  CREATE EXTENSION postgis_topology;
  CREATE EXTENSION postgis_sfcgal;
  CREATE EXTENSION fuzzystrmatch;
  CREATE EXTENSION address_standardizer;
  CREATE EXTENSION address_standardizer_data_us;
  CREATE EXTENSION postgis_tiger_geocoder;
  ```

- 利用postgis bundle 导入空间数据

  - 记得坐标系的选取

- 自定义导航路线函数

  - 配置道路属性表属性名及类型

    ```sql
    select * from road
    
    alter table road drop column id;
    
    select AddGeometryColumn ('road','geom',4326,'LINESTRING',2);
    
    create index gidx_road_geom on road using gist(geom);
    
    --检查无效的几何对象
    
    select gid from road where ST_IsValid(the_geom) IS FALSE;
    
    update road set geom=ST_LineMerge(the_geom);
    
    alter table road drop column the_geom;
    
    --添加路网分析必须的字段
    
    alter table road
    
    add column source integer, /*当前线段起点连接至上一线段的id*/
    
    add column target integer, /*当前线段终点连接至下一线段的id*/
    
    add column cost double precision, /*正向成本*/
    
    add column cost_time double precision, /*正向成本所需的时间*/
    
    add column rcost double precision, /*反向成本*/
    
    add column rcost_time double precision, /*反向成本所需的时间*/
    
    add column x1 double precision, /*当前线段起点坐标(x)*/
    
    add column y1 double precision, /*当前线段起点坐标(Y)*/
    
    add column x2 double precision, /*当前线段终点坐标(x)*/
    
    add column y2 double precision, /*当前线段终点坐标(y)*/
    
    add column to_cost double precision,
    
    add column rule text,
    
    add column isolated integer;
    
    with base as(
    
        select 'SPHEROID["WGS84",6378137,298.25728]'::spheroid as sph
    
    ) update road set x1 = st_x(st_startpoint(geom)),
    
                          y1 = st_y(st_startpoint(geom)),
    
                          x2 = st_x(st_endpoint(geom)),
    
                          y2 = st_y(st_endpoint(geom)),
    
      cost  = ST_LengthSpheroid(geom, f.sph)::integer,
    
      rcost = ST_LengthSpheroid(geom, f.sph)::integer
    
    from base as f;
    ```

  - 数据库通过SQL语句测试导航函数 **pgr_fromatob**

    ```sql
    ---------------------------自定义函部分
    CREATE OR REPLACE FUNCTION "public"."pgr_fromatob"("tbl" varchar, "startx" float8, "starty" float8, "endx" float8, "endy" float8)
      RETURNS "public"."geometry" AS $BODY$  
     
    declare 
     
        v_startLine geometry;--离起点最近的线 
     
        v_endLine geometry;--离终点最近的线 
     
         
     
        v_startTarget integer;--距离起点最近线的终点
     
        v_startSource integer;
     
        v_endSource integer;--距离终点最近线的起点
     
        v_endTarget integer;
     
     
     
        v_statpoint geometry;--在v_startLine上距离起点最近的点 
     
        v_endpoint geometry;--在v_endLine上距离终点最近的点 
     
         
     
        v_res geometry;--最短路径分析结果
     
        v_res_a geometry;
     
        v_res_b geometry;
     
        v_res_c geometry;
     
        v_res_d geometry; 
     
     
     
        v_perStart float;--v_statpoint在v_res上的百分比 
     
        v_perEnd float;--v_endpoint在v_res上的百分比 
     
     
     
        v_shPath_se geometry;--开始到结束
     
        v_shPath_es geometry;--结束到开始
     
        v_shPath geometry;--最终结果
     
        tempnode float;      
     
    begin
     
        --查询离起点最近的线 
     
        execute 'select geom, source, target  from ' ||tbl||
     
                                ' where ST_DWithin(geom,ST_Geometryfromtext(''point('||         startx ||' ' || starty||')'',4326),150)
                                order by ST_Distance(geom,ST_GeometryFromText(''point('|| startx ||' '|| starty ||')'',4326))  limit 1'
     
                                into v_startLine, v_startSource ,v_startTarget; 
     
         
     
        --查询离终点最近的线 
     
        execute 'select geom, source, target from ' ||tbl||
     
                                ' where ST_DWithin(geom,ST_Geometryfromtext(''point('|| endx || ' ' || endy ||')'',4326),150)
                                order by ST_Distance(geom,ST_GeometryFromText(''point('|| endx ||' ' || endy ||')'',4326))  limit 1'
     
                                into v_endLine, v_endSource,v_endTarget; 
     
     
     
        --如果没找到最近的线，就返回null 
     
        if (v_startLine is null) or (v_endLine is null) then 
     
            return null; 
     
        end if ; 
     
       
     
       -- ST_Distance 
     
         
     
        --从开始的起点到结束的起点最短路径 
     
        execute 'SELECT st_linemerge(st_union(b.geom)) ' ||
     
        'FROM pgr_dijkstra( 
        ''SELECT gid as id, source, target, cost FROM ' || tbl ||''',' 
     
        ||v_startSource || ', ' ||v_endSource||' ,false 
        ) a, ' 
     
        || tbl || ' b 
        WHERE a.edge=b.gid ' into v_res ;
     
       
     
        --从开始的终点到结束的起点最短路径
     
        execute 'SELECT st_linemerge(st_union(b.geom)) ' ||
     
        'FROM pgr_dijkstra( 
        ''SELECT gid as id, source, target, cost FROM ' || tbl ||''',' 
     
        ||v_startTarget || ', ' ||v_endSource||' ,false
        ) a, ' 
     
        || tbl || ' b 
        WHERE a.edge=b.gid ' into v_res_b ;
     
     
     
        --从开始的起点到结束的终点最短路径
     
        execute 'SELECT st_linemerge(st_union(b.geom)) ' ||
     
        'FROM pgr_dijkstra( 
        ''SELECT gid as id, source, target, cost FROM ' || tbl ||''',' 
     
        ||v_startSource || ', ' ||v_endTarget||' ,false 
        ) a, ' 
     
        || tbl || ' b 
        WHERE a.edge=b.gid ' into v_res_c ;
     
     
     
        --从开始的终点到结束的终点最短路径
     
        execute 'SELECT st_linemerge(st_union(b.geom)) ' ||
     
        'FROM pgr_dijkstra( 
        ''SELECT gid as id, source, target, cost FROM ' || tbl ||''',' 
     
        ||v_startTarget || ', ' ||v_endTarget||' ,false
        ) a, ' 
     
        || tbl || ' b 
        WHERE a.edge=b.gid ' into v_res_d ;
     
     
     
        if(ST_Length(v_res) > ST_Length(v_res_b)) then
     
           v_res = v_res_b;
     
        end if;
     
       
     
        if(ST_Length(v_res) > ST_Length(v_res_c)) then
     
           v_res = v_res_c;
     
        end if;
     
       
     
        if(ST_Length(v_res) > ST_Length(v_res_d)) then
     
           v_res = v_res_d;
     
        end if;
     
                 
     
     
     
        --如果找不到最短路径，就返回null 
     
        --if(v_res is null) then 
     
        --    return null; 
     
        --end if; 
     
         
     
        --将v_res,v_startLine,v_endLine进行拼接 
     
        select  st_linemerge(ST_Union(array[v_res,v_startLine,v_endLine])) into v_res;
     
     
    		select  ST_LineLocatePoint(v_res, ST_Geometryfromtext('point('|| startx ||' ' || starty ||')',4326)) into v_perStart;
    		
    		select  ST_LineLocatePoint(v_res, ST_GeometryFromText('point('|| endx ||' ' || endy ||')',4326)) into v_perEnd;
     
            
     
        if(v_perStart > v_perEnd) then 
     
            tempnode =  v_perStart;
     
            v_perStart = v_perEnd;
     
            v_perEnd = tempnode;
     
        end if;
     
            
     
        --截取v_res 
     
        SELECT ST_LineSubstring(v_res,v_perStart, v_perEnd) into v_shPath;
     
     
     
        return v_shPath; 
     
     
     
    end; 
     
    $BODY$
      LANGUAGE plpgsql VOLATILE STRICT
      COST 100
    ```

    ```sql
    --测试导航
    select pgr_createTopology('road', 0.000001, the_geom:='geom', id:='gid', source:='source', target:='target');
    
    SELECT * FROM pgr_fromatob(
    
    'road',
    
    115.748654,
    
    36.102071,
    
    115.749094,
    
    36.102726
    
    );
    ```

    

- Geoserver连接PostGre[PostGIS]

  - 通过postgres 和 对应数据库密码连接
    - 预先设置空的工作区
  - 添加新的图层，配置导航SQL视图
    - SQL视图中注意函数的使用，**是需要查找使用的表格，不要弄混**
    - 最下方的类型 选择 Geometry即可

