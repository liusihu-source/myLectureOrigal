# GeoJson格式解读

## 一、简介

> GeoJSON是一种对地理数据结构进行编码的格式。
>
> GeoJSON对象可以表示几何信息、要素或者要素集合，主要包括`要素对象` 和 `几何对象`两种类型

- 要素对象：`"Feature", 或者 "FeatureCollection"`
- 几何对象：`"Point", "MultiPoint", "LineString", "MultiLineString", "Polygon", "MultiPolygon", "GeometryCollection"`



## 二、type

> 该键的值由GeoJSON对象的类型所确定（同简介中的类型一致）

### 1.要素对象 ☆☆☆

- 要素对象必须有一个名字为"geometry"的成员，这个几何成员的值是上面定义的geometry对象或者JSON的null值。
- 要素对象必须有一个名字为“properties"的成员，这个属性成员的值是一个对象（任何JSON对象或者JSON的null值）。
- 如果要素是常用的标识符，那么这个标识符应当包含名字为“id”的对象成员。`当然可以添加自定义属性，如用户想要点击弹框中的属性值`

### 2.几何对象

**Point**

- 对类型"Point"来说，“coordinates"成员必须是一个单独的position。

**MultiPoint**

- 对类型"MultiPoint"来说，"coordinates"成员必须是position数组。

**LineString**

- 对类型"LineString"来说，“coordinates"成员必须是两个或者多个position的数组。

  > 线性环是具有4个或者更多position的封闭的线。第一个和最后一个位置是相同的（它们表示相同的的点）虽然线性环没有鲜明地作为GeoJSON几何类型，不过在面几何类型定义里有提到它。

**MultiLineString**

- 对类型“MultiLineString"来说，"coordinates"成员必须是一个线坐标数组的数组。

**Polygon**

- 对类型"Polygon"来说，"coordinates"成员必须是一个线性环坐标数组的数组。

**MultiPlygon**

- 对类型"MultiPlygon"来说，"coordinates"成员必须是面坐标数组的数组。

**Geometry Collection**

- 类型为"GeometryCollection"的GeoJSON对象是一个集合对象，它表示几何对象的集合。几何集合必须有一个名字为"geometries"的成员。与"geometries"相对应的值是一个数组。这个数组中的每个元素都是一个GeoJSON几何对象。



## 三、crs

- 该键的值是一个坐标参考系统



## 四、bbox（bounding boxes）

- 该键的值是一个边界框数值（类似geoserver中的边界框）

