# Cesium新内容总结

## 一、Cesium for unreal

> 2021年2月17日（星期三）上午1 : 10

Cesium for Unreal插件旨在将整个3D地理空间生态系统带入Unreal引擎。

- 用于虚幻引擎的全尺寸高精度WGS84地球仪
- 使用3D Tiles在运行时可视化大规模高分辨率真实世界摄影测量和3D内容
- 开放式API、开放式空间索引标准（如3D Tiles）
- 可选订阅Cesium ion，一键访问全球策划的3D内容，包括地形、图像、3D城市和摄影测量



### 1.1 Cesium for UNreal 工作流程

![image-20240311095836809](Cesium新特性总结.assets/image-20240311095836809.png)

![2cm Photogrammetry of Denver, Colorado (provided by Aerometrex) visualized in Unreal Engine.](Cesium新特性总结.assets/2021-02-16-denver-unreal.jpg)

2cm的精度



### 1.2 下载

https://www.unrealengine.com/marketplace/en-US/product/87b0d05800a545d49bf858ef3458c4f7



### 1.3 教程

https://cesium.com/learn/unreal/



## 二、PropVR & CesiumJS

> 2022年11月16日

PropVR使用Cesium为房地产带来交互式3D可视化和可发现性



## 三、Cesium for Unity

> 2022年11月30日晚上11:15

类似 Cesium for Unreal





## 四、Cesium and Google Maps Platform Partner on Photorealistic 3D Tiles

> 2023年6月15日（星期三）下午3 : 59

https://cesium.com/learn/cesiumjs-learn/travel-time-cesiumjs-photorealistic-3d-tiles-arcgis/

现在可用Google 影像 及 3D瓦片数据了，但是这些瓦片数据缺少 属性数据可查看。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<script src="https://cesium.com/downloads/cesiumjs/releases/1.115/Build/Cesium/Cesium.js"></script>
<link
  href="https://cesium.com/downloads/cesiumjs/releases/1.115/Build/Cesium/Widgets/widgets.css"
  rel="stylesheet"
/>
<script src="https://unpkg.com/@esri/arcgis-rest-request@4.0.0/dist/bundled/request.umd.js"></script>
<script src="https://unpkg.com/@esri/arcgis-rest-routing@4.0.0/dist/bundled/routing.umd.js"></script>
<style type="text/css">
  #cesiumContainer{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
</style>
<body>
    <div id="cesiumContainer"></div>
  <script type="module">
    Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYjIyNDk5Ni1hNmFlLTQyNzctOGMwOS1hYWU4NmEyMjcxZTEiLCJpZCI6NDM0MjEsImlhdCI6MTYxNTcyNDg5NH0.fyGAT3jkTTGTMKbvXAllYNUvXbU9qwcTMkhLEXcD9Rc";

    // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
    const viewer = new Cesium.Viewer('cesiumContainer', {
      timeline: false,
      animation: false,
      sceneModePicker: false,
      baseLayerPicker: false,
      // The globe does not need to be displayed,
      // since the Photorealistic 3D Tiles include terrain
      globe: false,
    });    

    try {
        const tileset = await Cesium.createGooglePhotorealistic3DTileset();
        viewer.scene.primitives.add(tileset);
    } catch (error) {
        console.log(`Failed to load tileset: ${error}`);
    } 
  </script>
</body>
</html>
```

:bulb: 可通过scene.globe.show 布尔值控制场景globe是否显示

![image-20240312144941133](Cesium新特性总结.assets/image-20240312144941133.png)

:bulb: 可通过scene.invertClassification 控制是否模糊非分类区域

```typescript
  const scene = viewer.scene;
  scene.invertClassification = true;
  scene.invertClassificationColor = new Cesium.Color(0.4, 0.4, 0.4, 1.0);
```

![Inverse classification used in CesiumJS to dim Photorealistic 3D Tiles in the area outside of a polygon.](Cesium新特性总结.assets/c938f06e-e789-4951-a9c2-2138b351f644_Inverse_Classification.jpeg)

![Travel time from Cesium headquarters in Philadelphia, PA, USA, presented in shades of gray and blue.](Cesium新特性总结.assets/91e4ea3a-0983-4cae-b725-6d7e98a2aa6f_Travel_Time_Cesium_HQ.jpeg)



## 五、New Reality Tiler Optimizes 3D Tiles for Photogrammetry and Reality Models

### 5.1 提高摄影测量模型的可伸缩性 和 鲁棒性

与现有的3D模型平铺器相比，Reality平铺器减小了平铺集的大小，并提高了平铺速度、运行时加载延迟和视觉质量。

| Source Data             | Tiler             | Tileset Size | Tiling Time | Avg. Load Time |
| ----------------------- | ----------------- | ------------ | ----------- | -------------- |
| AGI HQ                  | 3D Model Tiler    | 36 MB        | 1:45        | 1.48s          |
|                         | **Reality Tiler** | **61 MB**    | **0:52**    | **2.54s**      |
| Osaka                   | 3D Model Tiler    | 4.3 GB       | 26:02       | 4.64s          |
|                         | **Reality Tiler** | **1.74 GB**  | **26:08**   | **3.97s**      |
| Discovery Space Shuttle | 3D Model Tiler    | 1.7 GB       | 17:00:00    | 4.36s          |
|                         | **Reality Tiler** | **1.61 GB**  | **1:31:39** | **2.37s**      |

### 5.2 KTX 2.0 Texture Compression

|                         | Tileset Size | GPU Texture Memory             | Avg. Load Time per Tile    |                            |
| ----------------------- | ------------ | ------------------------------ | -------------------------- | -------------------------- |
| Melbourne               | JPEG         | 7.73 GB                        | 2200 MB                    | 199 ms                     |
|                         | **KTX 2.0**  | **3.21 GB (58.47% reduction)** | **219 MB (90% reduction)** | **46 ms (76% faster)**     |
| AGI HQ                  | JPEG         | 68 MB                          | 187 MB                     | 19.596 ms                  |
|                         | **KTX 2.0**  | **61 MB (10% reduction)**      | **24 MB (87% reduction)**  | **19.014 ms (3% faster)**  |
| Osaka                   | JPEG         | 2.58 GB                        | 484 MB                     | 24.364 ms                  |
|                         | **KTX 2.0**  | **1.74 GB (32% reduction)**    | **64 MB (86% reduction)**  | **19.929 ms (18% faster)** |
| Discovery Space Shuttle | JPEG         | 2.25 GB                        | 696 MB                     | 28.756 ms                  |
|                         | **KTX 2.0**  | **1.61 GB (28% reduction)**    | **127 MB (81% reduction)** | **19.769 ms (31% faster)** |



### 5.3 Coordinate Reference System Support

Reality Tiler可以将已知的投影系统转换为WGS84，以便在全球参考系统中准确定位。



## 六、QGIS 支持 3DTiles

QGIS最低稳定版本：3.34 

https://www.qgis.org/en/site/forusers/download.html



![3D Tiles now supported in QGIS: Melbourne, Australia, via Cesium ion in QGIS.](Cesium新特性总结.assets/43af57f0-6063-40c2-9f10-6f7f7dbca238_Melbourne_ion_QGIS.jpeg)

