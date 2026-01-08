# VisualizeImagery

```shell
CesiumJS supports drawing and layering high-resolution imagery (maps) from many services, including Cesium ion. Use Cesium ion to stream curated high resolution imagery or tile your own imagery layers from raster data to CesiumJS apps. Layers can be ordered and blended together. Each layer’s brightness, contrast, gamma, hue, and saturation can be dynamically changed. This tutorial introduces imagery layer concepts and the related CesiumJS APIs.

#translate
CesiumJS 支持从包括 Cesium ion 在内的许多服务中绘制和分层高分辨率图像（地图）。使用 Cesium ion 流式传输精选的高分辨率图像或将您自己的图像层从栅格数据平铺到 CesiumJS 应用程序。图层可以排序和混合在一起。每一层的亮度、对比度、伽玛、色调和饱和度都可以动态改变。本教程介绍图像层概念和相关的 CesiumJS API。
```

前言

可以在`Cesium ion`上传影像，之后通过 `Open complete code example` 查看自己上传的东西

```javascript
// Grant CesiumJS access to your ion assets
Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYjIyNDk5Ni1hNmFlLTQyNzctOGMwOS1hYWU4NmEyMjcxZTEiLCJpZCI6NDM0MjEsImlhdCI6MTYxNTcyNDg5NH0.fyGAT3jkTTGTMKbvXAllYNUvXbU9qwcTMkhLEXcD9Rc";

const viewer = new Cesium.Viewer("cesiumContainer");

const imageryLayer = viewer.imageryLayers.addImageryProvider(
  new Cesium.IonImageryProvider({ assetId: 890134 })
);

(async () => {
  try {
    await viewer.zoomTo(imageryLayer);
  } catch (error) {
    console.log(error);
  }
})();
```

![image-20220323110400312](VisualizeImagery.assets/image-20220323110400312.png)

- 支持的影像数据格式

| format                      | file extensions |
| :-------------------------- | :-------------- |
| GeoTIFF                     | .tiff, .tif     |
| Floating Point Raster       | .flt            |
| Arc/Info ASCII Grid         | .asc            |
| Source Map                  | .src            |
| Erdas Imagine               | .img            |
| USGS ASCII DEM and CDED     | .dem            |
| JPEG                        | .jpg, .jpeg     |
| PNG                         | .png            |
| Other common raster formats |                 |

Imagery files must be georeferenced before being loaded into Cesium ion.  （必须先配准好）

- Files may be zipped.
- Include any sidecar files when uploading (such as .aux, .xml, .tab, .tfw, .wld, .prj, .ovr, .rrd).
- Uploaded imagery is automatically reprojected to EPSG:3857.

## 一、Quick Start

```javascript
// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token from your ion account
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYjIyNDk5Ni1hNmFlLTQyNzctOGMwOS1hYWU4NmEyMjcxZTEiLCJpZCI6NDM0MjEsImlhdCI6MTYxNTcyNDg5NH0.fyGAT3jkTTGTMKbvXAllYNUvXbU9qwcTMkhLEXcD9Rc';

var viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider : Cesium.createWorldImagery({
        style : Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS
        //only AERIAL, AERIAL_WITH_LABELS, and ROAD are currently supported.
    }),
    baseLayerPicker : false  
    //imageryProvider  只有在baseLayerPicker为false时候有效，
});
var layers = viewer.scene.imageryLayers;
var blackMarble = layers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: 3812 }));

blackMarble.alpha = 0.5; // 0.0 is transparent.  1.0 is opaque.

blackMarble.brightness = 2.0; // > 1.0 increases brightness.  < 1.0 decreases.

layers.addImageryProvider(new Cesium.SingleTileImageryProvider({
    url : 'localhost:7080/img/test.jpg',
    rectangle : Cesium.Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75)
}));
```

- 可以通过创建viewer对象时候，就直接设置imageryProvider属性
- 可以后面通过viewer.scene获取到当前的imageryLayers，然后通过addImageryProvider方法添加新的底图图层，添加的这些图层可以是以下这些类型
  - [ArcGisMapServerImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/ArcGisMapServerImageryProvider.html)
  - [BingMapsImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/BingMapsImageryProvider.html)
  - [OpenStreetMapImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/OpenStreetMapImageryProvider.html)
  - [TileMapServiceImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/TileMapServiceImageryProvider.html)
  - [GoogleEarthEnterpriseImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/GoogleEarthEnterpriseImageryProvider.html)
  - [GoogleEarthEnterpriseMapsProvider](https://cesium.com/learn/cesiumjs/ref-doc/GoogleEarthEnterpriseMapsProvider.html)
  - [GridImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/GridImageryProvider.html)
  - [IonImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/IonImageryProvider.html)
  - [MapboxImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/MapboxImageryProvider.html)
  - [MapboxStyleImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/MapboxStyleImageryProvider.html)
  - [SingleTileImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/SingleTileImageryProvider.html)
  - [TileCoordinatesImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/TileCoordinatesImageryProvider.html)
  - [UrlTemplateImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/UrlTemplateImageryProvider.html)
  - [WebMapServiceImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/WebMapServiceImageryProvider.html)
  - [WebMapTileServiceImageryProvider](https://cesium.com/learn/cesiumjs/ref-doc/WebMapTileServiceImageryProvider.html)

## 二、Cross-origin resource sharing

- 支持跨域请求
  - 用tomcat发布服务

## 三、demo（可以实现的效果）

https://sandcastle.cesium.com/?src=Imagery%20Layers%20Manipulation.html

![image-20220323162950880](VisualizeImagery.assets/image-20220323162950880.png)

https://sandcastle.cesium.com/?src=Imagery%20Adjustment.html

![image-20220323163007830](VisualizeImagery.assets/image-20220323163007830.png)