# Vieualize3DTerrain

```shell
CesiumJS supports streaming and visualizing global high-resolution terrain and water effects for oceans, lakes, and rivers. View mountain peaks, valleys, and other terrain features and embrace the 3D globe. Use Cesium ion to stream your own tiled terrain data or high resolution curated terrain such as Cesium World Terrain.

#translate
CesiumJS 支持流式传输和可视化海洋、湖泊和河流的全球高分辨率地形和水效果。查看山峰、山谷和其他地形特征并拥抱3D 地球。使用 Cesium ion 流式传输您自己的平铺地形数据或高分辨率精选地形，例如 Cesium World Terrain。
```

- 前言
  - 可以用CesiumJS实现海洋 湖泊 河流 山峰 山谷等地形特征
- 支持的影像数据格式

| Format                      | File extensions |
| :-------------------------- | :-------------- |
| GeoTIFF                     | .tiff, .tif     |
| Floating Point Raster       | .flt            |
| Arc/Info ASCII Grid         | .asc            |
| Source Map                  | .src            |
| Erdas Imagine               | .img            |
| USGS ASCII DEM and CDED     | .dem            |
| Cesium Terrain Database     | .terraindb      |
| Other common raster formats |                 |

- Terrain files must be georeferenced before being loaded into Cesium ion.
- GeoTIFF input must be a single band of floating point or integer elevations.
- Files may be zipped.
- Include any sidecar files when uploading (such as .aux, .xml, .tab, .tfw, .wld, .prj, .ovr, .rrd).
- Uploaded terrain is automatically reprojected to EPSG:4326 before tiling.

## 一、Choosing a base terrain layer

- 选一个基础地形底图
- To visualize your terrain with our global base layer, select **Cesium World Terrain** as the base terrain. This will create a new global layer that uses heights from your data where it is defined, and heights from the base layer everywhere else.

## 二、Choosing the right height

- 铯离子存储相对于椭球体的高度。如果您的栅格文件中的高度是相对于平均海平面的，则选择“平均海平面”将转换高度值，以便在 CesiumJS 中正确显示您的地形。 如果您的身高不是以米为单位，请选择适当的单位，Cesium ion 会将其缩放为米。

![image-20220323172449367](Visualize3DTerrain.assets/image-20220323172449367.png)

## 三、Combining terrain and imagery

- CesiumJS 在运行时将卫星图像与 3D 地形结合起来，因此您可以动态更改图像或添加自己的图像。

![image-20220323172253248](Visualize3DTerrain.assets/image-20220323172253248.png)

## 四、demo 功能

### Querying height values

You can query the terrain height at runtime using [Cesium.sampleTerrainMostDetailed](https://cesium.com/docs/cesiumjs-ref-doc/global.html?classFilter=sampleT#sampleTerrainMostDetailed) at an individual point or a list of points, like along a path.

See a [live code example](https://sandcastle.cesium.com/?src=Terrain.html). Press “Sample Most Detailed Everest Terrain” to sample heights in a grid and display the height values in the scene.

### Clamping to terrain

In addition to draping satellite or drone imagery over your 3D terrain in CesiumJS, you can clamp vector data (like GeoJSON and KML). See [this code example](https://sandcastle.cesium.com/?src=Clamp to Terrain.html) for how different types of geometry can be clamped to terrain.

You can dynamically create new geometry that’s clamped to terrain as well, see the [drawing on terrain](https://sandcastle.cesium.com/?src=Drawing on Terrain.html) example.

## 五、Qucik Start

By default, the globe is a [WGS84 ellipsoid](http://earth-info.nga.mil/GandG/publications/tr8350.2/wgs84fin.pdf). Specify a different terrain provider by passing the `terrainProvider` option to the `Viewer`.

```javascript
// Your access token can be found at: https://cesium.com/ion/tokens.
// This is the default access token from your ion account
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYjIyNDk5Ni1hNmFlLTQyNzctOGMwOS1hYWU4NmEyMjcxZTEiLCJpZCI6NDM0MjEsImlhdCI6MTYxNTcyNDg5NH0.fyGAT3jkTTGTMKbvXAllYNUvXbU9qwcTMkhLEXcD9Rc';

var viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider : Cesium.createWorldTerrain()
});
```

As we zoom closer, CesiumJS requests higher resolution terrain based on what parts of the globe are visible and how far away they are.

Terrain and imagery are treated separately, and any imagery provider can be used with any terrain provider.   --> 可以共同使用 影像 和 地形结合

## 六、Enabling terrain lighting and water effects