# CesiumIon

## 一、创建账号

- 注册账号

  - 拥有全球卫星影像和真实3D场景内容

    - [Cesium World Terrain](https://cesium.com/platform/cesium-ion/content/cesium-world-terrain/) — high resolution terrain with up to 1 meter accuracy.
    - [Cesium OSM Buildings](https://cesium.com/platform/cesium-ion/content/cesium-osm-buildings/) — over 350 million buildings derived from OpenStreetMap data.

    - Bing Maps Aerial Imagery — global satellite imagery with up to 15 cm resolution.

  - 默认token值

    - ```shell
      eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYjIyNDk5Ni1hNmFlLTQyNzctOGMwOS1hYWU4NmEyMjcxZTEiLCJpZCI6NDM0MjEsImlhdCI6MTYxNTcyNDg5NH0.fyGAT3jkTTGTMKbvXAllYNUvXbU9qwcTMkhLEXcD9Rc
      ```

## 二、创建CesiumJS客户端

- CDN

  - ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <!-- Include the CesiumJS JavaScript and CSS files -->
      <script src="https://cesium.com/downloads/cesiumjs/releases/1.91/Build/Cesium/Cesium.js"></script>
      <link href="https://cesium.com/downloads/cesiumjs/releases/1.91/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
    </head>
    <body>
      <div id="cesiumContainer"></div>
      <script>
        // Your access token can be found at: https://cesium.com/ion/tokens.
        // This is the default access token from your ion account
    
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYjIyNDk5Ni1hNmFlLTQyNzctOGMwOS1hYWU4NmEyMjcxZTEiLCJpZCI6NDM0MjEsImlhdCI6MTYxNTcyNDg5NH0.fyGAT3jkTTGTMKbvXAllYNUvXbU9qwcTMkhLEXcD9Rc';
    
        // Initialize the Cesium Viewer in the HTML element with the `cesiumContainer` ID.
        const viewer = new Cesium.Viewer('cesiumContainer', {
          terrainProvider: Cesium.createWorldTerrain()
        });    
        // Add Cesium OSM Buildings, a global 3D buildings layer.
        const buildingTileset = viewer.scene.primitives.add(Cesium.createOsmBuildings());   
        // Fly the camera to San Francisco at the given longitude, latitude, and height.
        viewer.camera.flyTo({
          destination : Cesium.Cartesian3.fromDegrees(-122.4175, 37.655, 400),
          orientation : {
            heading : Cesium.Math.toRadians(0.0),
            pitch : Cesium.Math.toRadians(-15.0),
          }
        });
      </script>
     </div>
    </body>
    </html>
    ```

- NPM

  - 略

![image-20220307104901431](CesiumIon.assets/image-20220307104901431.png)

## 三、Cesium global 3D content

- Ceisum ion  是一个Cesium的在线服务器

  ![image-20220307110037150-1647842742291](CesiumIon.assets/image-20220307110037150-1647842742291.png)

## 四、Cesium Stories introduction

`可以利用Cesium Stories来创建一个互动的3D演示，类似在线版的PPT`

#### create a new story

创建一个Cesium 故事

#### add data to slide

添加数据到幻灯片中，可随时添加各种数据，如GeoJSON、KML、CZML等格式

#### capture view

捕获想要的视野，然后可以新建map 或者 新建slide

#### add infobox content

添加信息内容，如标题和具体信息

#### explore sellf dataset

![image-20220312135804490](CesiumIon.assets/image-20220312135804490.png)

#### share self story

```shell
#教程地址，可以在Stories viewer 进行查看了，可以公网发布（可选）
https://cesium.com/learn/ion/stories-introduction/
```

## 五、Cesium ion integratioin从哪些软件中可以导出数据到Cesium ion

哪些软件内置了Cesium的的插件（类似这个概念）

- 3DS MAX
- Blender
- FME
- STK
- WebODM

从哪些软件中可以导出数据到Cesium ion

- Bentley Context Capture
- RealityCapture
- Simactive Correlator3D
- Agisoft Metashape
- SketchUp

哪些软件可以使用Cesium ion

- CesiumJS
- Cesium for Unreal
- deck.gl
- iModel.js
- osgEarth



## 六、host assets on a local server

#### 8.1 Imagery

如果本地网络（例如WMS、ArcGIS、Google Earth Enterprise）上有图像服务器，可以配置CesiumJS来使用它。

https://cesium.com/learn/cesiumjs/ref-doc/ImageryProvider.html

![image-20240325141135915](CesiumIon.assets/image-20240325141135915.png)

```typescript
const viewer = new Cesium.Viewer("cesiumContainer", {
  baseLayer: Cesium.ImageryLayer.fromProviderAsync(
    Cesium.TileMapServiceImageryProvider.fromUrl(
      Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
    )
  ),
  baseLayerPicker: false,
  geocoder: false,
});
```



#### 8.2 3Dtiles,glTF, and other static files

1. Download and install [Node.js](https://nodejs.org/en/download/)

2. At the command line, run

   ```
   npm install http-server -g
   ```

   :bulb: https://www.npmjs.com/package/http-server

   This will install the 'http-server' app from https://github.com/http-party/http-server globally

3. In the directory that contains the data, run  `具体端口自定义`

   ```
   http-server -a localhost -p 8003 --cors=http://localhost:5173/
   ```

   

   This will start the server, under the address localhost, using port `8003`. The cors parameter will allow the a CesiumJS app running at port `5173` to access the data from this locally running server.

4. Load files in a CesiumJS app at the served url.

   For example, a local tileset in an `example` directory can now be loaded with the following url:

   ```
   try {
     const tileset = await Cesium.Cesium3DTileset.fromUrl(
       "http://localhost:8003/example/tileset.json"
     );
     viewer.scene.primitives.add(tileset);
   } catch (error) {
     console.log(`Error loading tileset: ${error}`);
   }
   ```

![image-20240325141857217](CesiumIon.assets/image-20240325141857217.png)

## 七、Export an asset to S3

> S3 ： 
>
> - Amazon Simple Storage Service(简称S3)，是亚马逊AWS服务在2006年第一个正式对外推出的**云计算服务**。
> - Amazon S3 是互联网存储解决方案。该服务旨在降低开发人员进行网络规模级计算的难度。
> - Amazon S3 提供了一个**简单 Web 服务接口**，可用于随时在 Web 上的任何位置存储和检索任何数量的数据。此服务让所有开发人员都能访问同一个具备**高扩展性、可靠性、安全性和快速价廉**的数据存储基础设施， Amazon 用它来运行其全球的网站网络。此服务旨在为开发人员带来最大化的规模效益。
>
> :bulb: 把这个S3当做 和 Cesium ion类似的数据存储平台即可，也有对应的token，方便仓库间的转移资源



## 八、不同用户使用限制

![image-20240325145156180](CesiumIon.assets/image-20240325145156180.png)

案例：当前使用状况截图

![image-20240325145244491](CesiumIon.assets/image-20240325145244491.png)

## 九、部署自己的Cesium ion平台

https://cesium.com/learn/ion/self-hosted/

难，Kubernetes 一个全新的基于容器技术的分布式架构解决方案，是 Google 开源的一个容器集群管理系统

