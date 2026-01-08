# CesiumLab

> https://space.bilibili.com/346212872/video?tid=0&pn=1&keyword=&order=pubdate
>
> https://www.bilibili.com/video/BV12E411H7YJ/?p=2&spm_id_from=pageDriver&vd_source=c3aed98126d5ffa7b2c72cf011d9383c

## 一、地形

### 1.1 地形服务 及 数据源

下载所需影像的DEM数据

![image-20240306212629859](CesiumLab.assets/image-20240306212629859.png)

![image-20240306212645301](CesiumLab.assets/image-20240306212645301.png)

CesiumLab地形切片

![image-20240306212707903](CesiumLab.assets/image-20240306212707903.png)

![image-20240306212739733](CesiumLab.assets/image-20240306212739733.png)

服务预览查看（只有下载区域是有地形的，其他区域没有地形）

![image-20240306212808695](CesiumLab.assets/image-20240306212808695.png)



### 1.2 地形着色

加载自行发布的地形服务后，可通过着色按钮处尝试高程、坡度、坡向 和 等高线等工具的使用

![image-20240306214959109](CesiumLab.assets/image-20240306214959109.png)



地形夸张工具可以放大地形的高度

![image-20240306215307824](CesiumLab.assets/image-20240306215307824.png)



### 1.3 地形效果

下拉按钮，选择重新绘制自定义区域，切换挖空状态，可以切换选中要素。

![image-20240307105434872](CesiumLab.assets/image-20240307105434872.png)

![image-20240307105459299](CesiumLab.assets/image-20240307105459299.png)



## 二、效果控件

通过点击具体效果图标 及 下拉按钮，可设置不同程度的模拟效果。

![image-20240307112645590](CesiumLab.assets/image-20240307112645590.png)



## 三、分析

### 3.1 剖面

点击剖面，可根据自定义路线绘制出该线的高程变化。也可切换采样间隔

![image-20240307113248702](CesiumLab.assets/image-20240307113248702.png)

也可先自定义绘制折线，然后将折线拖动到剖面工具中。

![image-20240307113635941](CesiumLab.assets/image-20240307113635941.png)



### 3.2 水面





![image-20240313222830775](CesiumLab.assets/image-20240313222830775.png)









## 四、标绘

### 4.1 创建标绘图标

用户可使用自带标绘库 或 自定义标绘库在指定位置创建标绘图标

![image-20240307114401182](CesiumLab.assets/image-20240307114401182.png)



### 4.2 路径动画

标绘 - > 创建路径动画，也可选择已有的折线对象。

- 首尾相连：自动连接起终点
- 关键点：会在折点位置创建相机
- 动画：控制播放相关设置

![image-20240307154950048](CesiumLab.assets/image-20240307154950048.png)

创建标绘点，然后绑定具体的路径动画，也可切换图片

![image-20240307155221032](CesiumLab.assets/image-20240307155221032.png)

根据需要播放动画

![image-20240307163014840](CesiumLab.assets/image-20240307163014840.png)



### 4.3 模型标绘（可绑定动画）

可尝试下载glb模型，变换模型大小 及 切换表皮效果

![image-20240307164216861](CesiumLab.assets/image-20240307164216861.png)

![image-20240307164116560](CesiumLab.assets/image-20240307164116560.png)



![Video_2024-03-15_160707](CesiumLab.assets/Video_2024-03-15_160707.gif)



### 4.4 单体化

可对整体模型，利用该工具拆分模型，并设置拾取的结果值

![image-20240307165415869](CesiumLab.assets/image-20240307165415869.png)

更改拾取内容返回值

![image-20240307165601781](CesiumLab.assets/image-20240307165601781.png)



### 4.5 粒子效果

可自定义位置、高度、颜色 和 半径。

![image-20240315161527913](CesiumLab.assets/image-20240315161527913.png)

![Video_2024-03-15_160707](CesiumLab.assets/Video_2024-03-15_160707-1710490628713-2.gif)





## 五、工具

### 5.1 地形切片工具加水面效果(Cesium加载自定义区域数据)

思路：`地理空间数据云 > Arcgis裁剪 > Lab地形切片 > 本地Tomcat等服务/直接使用Lab服务 > Cesium`

Lab切片参数说明

- 输入文件：自动识别坐标系，七参数根据实际增加
- 处理参数：
  - 三角算法
    - vcg是基于经典的边塌陷算法的三角网简化算法，该算法网格结构质量较好，误差更小，但是缺陷是处理速度较慢 :heavy_check_mark:
    - ctb是一种基于网格的快速三角网简化算法，算法计算速度快，缺陷是误差较大
  - 水面文件
    - 该区域的指定位置shp文件（面）
- 输出类型
  - 紧凑：node端 和 lab均可使用并发布服务
  - 散列：单个文件



```typescript
window.viewer = new Cesium.Viewer('mapContainer', {
        sceneMode: Cesium.SceneMode.SCENE3D,
        infoBox: false, //信息框
        selectionIndicator: false, //绿色框
 
        geocoder: false,//是否显示geocoder小器件，右上角查询按钮
        homeButton: false,//是否显示Home按钮
        sceneModePicker: false,//是否显示3D/2D选择器
        baseLayerPicker: false,//是否显示图层选择器
 
        navigationHelpButton: false,//是否显示右上角的帮助按钮
        animation: false,//是否创建动画小器件，左下角仪表
        timeline: false,//是否显示时间轴
        fullscreenButton: false,//是否显示全屏按钮
 
        // imageryProvider: tdtImageryProvider, // 天地图
        terrainProvider: new Cesium.CesiumTerrainProvider({  
            url:"http://localhost:7080/YiChangShi/",  
            minimumLevel: 0,  
            maximumLevel: 15,  
        }), 
    });
```



### 5.2 批量制作小模型（路灯、井盖、树）

实例模型切片

![image-20240315172817593](CesiumLab.assets/image-20240315172817593.png)

![image-20240315172841102](CesiumLab.assets/image-20240315172841102.png)

https://www.bilibili.com/video/BV1BM411s78F/?spm_id_from=333.999.0.0&vd_source=c3aed98126d5ffa7b2c72cf011d9383c



### 5.3 倾斜模型OSGB（Ordnance Survey Great Britain）转 3Dtiles

一般是无人机飞行数据，下面是`倾斜模型切片`工具参数设置 及 对比效果

- 输入文件

  会默认读取XML文件中的EPSG 和 中心坐标信息，:warning: 但倾斜模型需要指定条件

  ![image-20240316101007165](CesiumLab.assets/image-20240316101007165.png)

- 重建顶层

  默认关闭。

  ![image-20240316101050122](CesiumLab.assets/image-20240316101050122.png)

- 效果参数

  ![image-20240316101351548](CesiumLab.assets/image-20240316101351548.png)

- 压缩参数

  ![image-20240316101403668](CesiumLab.assets/image-20240316101403668.png)

- 存储类型



### 5.4 利用Blender 规范建模、倾斜模型





### 5.5 建筑体块及建筑呼吸特效 :star:





### 5.6 BIM转3DTiles





### 5.7 Winows公网/局域网发布自定义影像、地形、建筑地块、模型3Dtiles等 :star:





### 5.8 Linux 公网/局域网部署minio/postgres/mongo分布式对象数据库并发布3DTiles :star:





### 5.9 3Dtiles参数配置详解



## 六、ESSS信令

https://www.bilibili.com/video/BV1sX4y1x74K/?spm_id_from=333.999.0.0&vd_source=c3aed98126d5ffa7b2c72cf011d9383c
