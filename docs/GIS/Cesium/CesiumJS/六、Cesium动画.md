# Cesium动画 

> Cesium官网动画案例整理
>
> - GPX
> - Interpolation:star2: :star2:
>   - 原理：因为无法指定具体实体对象在每个时间点的 位置 和 方向速度等，需要插值
>   - 实现步骤：
>     1. 根据实际需要，创建带有多个不同指定点及位置坐标信息的数组，利用该数组创建Cesium.SampledPositionProperty对象。可通过该对象的addSample()方法依次添加数组元素，同时完成实体点对象的场景创建
>     2. 创建指定时间内运动的模型对象实体。首先设置显示时间的起终点（其他时间该对象不可见），以SampledPositionProperty对象的元素为插值点`position`，并利用这些插值点完成`path`对象的创建并自定义显示样式
>     3. 基于上述模型对象实体设置自定义的插值方式，如下常见的插值方式
>        - Cesium.LinearApproximation,//线性逼近
>        - Cesium.LagrangePolynomialApproximation, //拉格朗日多项式逼近
>        - Cesium.HermitePolynomialApproximation,//埃尔米特多项式逼近
> - Manually controlled animation
>   - 与上面案例不同在于增加模型本身的动画 及 运动速率发生改变
>   - 实现步骤：
>     1. 填充SampledPositionProperty 实例 和 SampledProperty实例。因为要求速率发生变化，所以单位时间内的移动距离应当不同。根据需要添加SampledPositionProperty 内元素（时间 和 坐标），此外增加SampledProperty实例存储时间 和 每段之间的距离。
>     2. 增加模型。因为模型本身运行一遍时间固定，欲实现模型速度加快，即这段模型运行时间内移动距离更快，所以利用[ModelAnimation.animationTime](https://cesium.com/learn/cesiumjs/ref-doc/ModelAnimation.html#animationTime) 调整速率。同时利用矩阵转换完成模型位置的实时变化（较难）
>     3. 增加辅助速度牌div 和 其他信息label
> - Multi-part CZML
>   - 路径存储在czml中
>
>
> :bulb: 注意shouldAnimate 的开启

## 一、GPX

https://sandcastle.cesium.com/index.html?src=GPX.html

:bulb: gpx格式：一种常见的用于`存储地理位置数据的开放式XML文件格式`。它通常用于记录全球定位系统（GPS）设备生成的轨迹、航迹或路线等数据。GPX文件可以包含路线、轨迹点、航迹点和路线点等信息，以及相关的时间、海拔高度和地理坐标等元数据，案例如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="My GPS Device">
  <metadata>
    <name>My Hiking Trip</name>
    <desc>A hiking trip through the mountains</desc>
    <author>
      <name>John Doe</name>
      <email>john@example.com</email>
    </author>
  </metadata>
  <trk>
    <name>Hiking Track</name>
    <trkseg>
      <trkpt lat="40.123456" lon="-105.678910">
        <ele>1500</ele>
        <time>2023-11-13T08:00:00Z</time>
      </trkpt>
      <trkpt lat="40.123457" lon="-105.678911">
        <ele>1520</ele>
        <time>2023-11-13T08:05:00Z</time>
      </trkpt>
      <!-- More track points go here -->
    </trkseg>
  </trk>
</gpx>

```

```typescript
const viewer = new Cesium.Viewer("cesiumContainer", {
  terrain: Cesium.Terrain.fromWorldTerrain(),
});

const pinBuilder = new Cesium.PinBuilder();

Sandcastle.addToolbarMenu(
  [
    {
      text: "Track with Waypoints",
      onselect: function () {
        viewer.dataSources
          .add(
            Cesium.GpxDataSource.load(
              "../SampleData/gpx/lamina.gpx",
              {
                clampToGround: true,
              }
            )
          )
          .then(function (dataSource) {
            viewer.zoomTo(dataSource.entities);
          });
      },
    },
    {
      text: "Route",
      onselect: function () {
        viewer.dataSources
          .add(
            Cesium.GpxDataSource.load(
              "../SampleData/gpx/route.gpx",
              {
                clampToGround: true,
              }
            )
          )
          .then(function (dataSource) {
            viewer.zoomTo(dataSource.entities);
          });
      },
    },
    {
      text: "Waypoints",
      onselect: function () {
        viewer.dataSources
          .add(
            Cesium.GpxDataSource.load("../SampleData/gpx/wpt.gpx", {
              clampToGround: true,
            })
          )
          .then(function (dataSource) {
            viewer.zoomTo(dataSource.entities);
          });
      },
    },
    {
      text: "Multiple Tracks with Waypoints",
      onselect: function () {
        viewer.dataSources
          .add(
            Cesium.GpxDataSource.load(
              "../SampleData/gpx/complexTrk.gpx",
              { clampToGround: true }
            )
          )
          .then(function (dataSource) {
            viewer.zoomTo(dataSource.entities);
          });
      },
    },
    {
      text: "Symbology Options",
      onselect: function () {
        viewer.dataSources
          .add(
            Cesium.GpxDataSource.load(
              "../SampleData/gpx/lamina.gpx",
              {
                clampToGround: true,
                trackColor: Cesium.Color.YELLOW,
                waypointImage: pinBuilder.fromMakiIconId(
                  "bicycle",
                  Cesium.Color.BLUE,
                  48
                ),
              }
            )
          )
          .then(function (dataSource) {
            viewer.zoomTo(dataSource.entities);
          });
      },
    },
  ],
  "toolbar"
);

Sandcastle.reset = function () {
  viewer.dataSources.removeAll();
    //确定当到达#startTime或#stopTime时时钟应该如何工作，Cesium.ClockRange.UNBOUNDED表示始终按照当前方向（direction）前进（advance）时钟，也就是在任何时间范围内运行，不受任何限制
  viewer.clock.clockRange = Cesium.ClockRange.UNBOUNDED;
    //确定对Clock#tick的调用是依赖于帧还是依赖于系统时钟，Cesium.ClockStep.SYSTEM_CLOCK将时钟设置为当前系统时间；忽略所有其他设置
  viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
};

```



## 二、Interpolation

https://sandcastle.cesium.com/index.html?src=Interpolation.html

```typescript
const viewer = new Cesium.Viewer("cesiumContainer", {
  infoBox: false, //Disable InfoBox widget
  selectionIndicator: false, //Disable selection indicator
  shouldAnimate: true, // Enable animations
  terrain: Cesium.Terrain.fromWorldTerrain(),
});

//启用光照效果后，Cesium会根据太阳的位置、地球表面的几何形状以及光的散射和反射等物理特性，计算出地球表面各个位置的光照情况。这样可以让地球表面在不同时间、不同位置的光照效果更加逼真，提升了场景的视觉质量和真实感。
viewer.scene.globe.enableLighting = true;

//当地形深度测试开启时，场景中的对象会根据地形的几何形状进行遮挡和显示。这有助于确保地形在视觉上位于正确的位置，并且能够与其他对象正确交互，提升了场景的视觉效果和真实感。
viewer.scene.globe.depthTestAgainstTerrain = true;

//设置随机数种子可以用于创建具有确定性的随机效果，例如在测试中确保相同的随机数序列被使用，或者在复现问题时保持一致的随机行为。这有助于提高代码的可重现性和可测试性。
Cesium.Math.setRandomNumberSeed(3);

//设置边界时间
const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
const stop = Cesium.JulianDate.addSeconds(
  start,
  360,
  new Cesium.JulianDate()
);

//Make sure viewer is at the desired time.
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //循环
viewer.clock.multiplier = 10;  //用于设置倍速

//Set timeline to simulation bounds
viewer.timeline.zoomTo(start, stop);

//创建 Cesium.SampledPositionProperty 对象.
function computeCirclularFlight(lon, lat, radius) {
  const property = new Cesium.SampledPositionProperty();
  for (let i = 0; i <= 360; i += 45) {
    const radians = Cesium.Math.toRadians(i);
    const time = Cesium.JulianDate.addSeconds(
      start,
      i,
      new Cesium.JulianDate()
    );
    const position = Cesium.Cartesian3.fromDegrees(
      lon + radius * 1.5 * Math.cos(radians),
      lat + radius * Math.sin(radians),
      Cesium.Math.nextRandomNumber() * 500 + 1750
    );
    property.addSample(time, position);

    //Also create a point for each sample we generate.
    viewer.entities.add({
      position: position,
      point: {
        pixelSize: 8,
        color: Cesium.Color.TRANSPARENT,
        outlineColor: Cesium.Color.YELLOW,
        outlineWidth: 3,
      },
    });
  }
  return property;
}

//Compute the entity position property.
const position = computeCirclularFlight(-112.110693, 36.0994841, 0.03);

//创建指定时间段内的模型对象及路径
const entity = viewer.entities.add({
  //实体将只在指定的时间段内显示，并在其他时间段内隐藏。
  availability: new Cesium.TimeIntervalCollection([
    new Cesium.TimeInterval({
      start: start,
      stop: stop,
    }),
  ]),

  //使用Cesium.SampledPositionProperty对象数组点
  position: position,

  //依据数组点自行计算速度 方向
  orientation: new Cesium.VelocityOrientationProperty(position),

  //用具体的模型代替指定实体
  model: {
    uri: "../SampleData/models/CesiumAir/Cesium_Air.glb",
    minimumPixelSize: 64,
  },

  //与实体相关联的路径样式
  path: {
    resolution: 1,
    material: new Cesium.PolylineGlowMaterialProperty({
      glowPower: 0.1, //发光强度
      color: Cesium.Color.YELLOW,
    }),
    width: 10,
  },
});

//Add button to view the path from the top down
Sandcastle.addDefaultToolbarButton("View Top Down", function () {
  viewer.trackedEntity = undefined;
  viewer.zoomTo(
    viewer.entities,
    new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-90))
  );
});

//Add button to view the path from the side
Sandcastle.addToolbarButton("View Side", function () {
  viewer.trackedEntity = undefined;
  viewer.zoomTo(
    viewer.entities,
    new Cesium.HeadingPitchRange(
      Cesium.Math.toRadians(-90),
      Cesium.Math.toRadians(-15),
      7500
    )
  );
});

//Add button to track the entity as it moves
Sandcastle.addToolbarButton("View Aircraft", function () {
  viewer.trackedEntity = entity;
});

//基于指定时段内对象设置插值方式
Sandcastle.addToolbarMenu(
  [
    {
      text: "Interpolation: Linear Approximation",
      onselect: function () {
        entity.position.setInterpolationOptions({
            //设置实体位置属性的插值算法和插值程度
          interpolationDegree: 1,
          interpolationAlgorithm: Cesium.LinearApproximation,//线性逼近
        });
      },
    },
    {
      text: "Interpolation: Lagrange Polynomial Approximation",
      onselect: function () {
        entity.position.setInterpolationOptions({
          interpolationDegree: 5,
          interpolationAlgorithm:
            Cesium.LagrangePolynomialApproximation, //拉格朗日多项式逼近
        });
      },
    },
    {
      text: "Interpolation: Hermite Polynomial Approximation",
      onselect: function () {
        entity.position.setInte
          rpolationOptions({
          interpolationDegree: 2,
          interpolationAlgorithm: Cesium.HermitePolynomialApproximation,//埃尔米特多项式逼近
        });
      },
    },
  ],
  "interpolationMenu"
);

```



## 三、Manually controlled animation

https://sandcastle.cesium.com/index.html?src=Manually%20Controlled%20Animation.html

```typescript
const viewer = new Cesium.Viewer("cesiumContainer", {
  shouldAnimate: true,
});

//Make sure viewer is at the desired time.
const start = Cesium.JulianDate.fromDate(new Date(2018, 11, 12, 15));
const totalSeconds = 30;
const stop = Cesium.JulianDate.addSeconds(
  start,
  totalSeconds,
  new Cesium.JulianDate()
);
viewer.clock.startTime = start.clone();
viewer.clock.stopTime = stop.clone();
viewer.clock.currentTime = start.clone();
viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
viewer.timeline.zoomTo(start, stop);

// Create a path for our model by lerping between two positions.
const position = new Cesium.SampledPositionProperty();
const distance = new Cesium.SampledProperty(Number);
const startPosition = new Cesium.Cartesian3(
  -2379556.799372864,
  -4665528.205030263,
  3628013.106599678
);
const endPosition = new Cesium.Cartesian3(
  -2379603.7074103747,
  -4665623.48990283,
  3627860.82704567
);
// A velocity vector property will give us the entity's speed and direction at any given time.
const velocityVectorProperty = new Cesium.VelocityVectorProperty(
  position,
  false
);
const velocityVector = new Cesium.Cartesian3();

const numberOfSamples = 100;
let prevLocation = startPosition;
let totalDistance = 0;
for (let i = 0; i <= numberOfSamples; ++i) {
  const factor = i / numberOfSamples;
  const time = Cesium.JulianDate.addSeconds(
    start,
    factor * totalSeconds, //s
    new Cesium.JulianDate()
  );

  // Lerp using a non-linear factor so that the model accelerates.
  const locationFactor = Math.pow(factor, 2); //非线性，平方
  const location = Cesium.Cartesian3.lerp(
    startPosition,
    endPosition,
    locationFactor, //插值百分比，单位时间段内的行走距离逐渐增加
    new Cesium.Cartesian3()
  );
  position.addSample(time, location);
  distance.addSample(
    time,
    (totalDistance += Cesium.Cartesian3.distance(
      location,
      prevLocation
    ))  //每段数据包含时间和对应的距离值，
      //如{ time: new Cesium.JulianDate(2459856.6), value: 100.0 }
  );
  prevLocation = location;
}

function updateSpeedLabel(time, result) {
  velocityVectorProperty.getValue(time, velocityVector);
  const metersPerSecond = Cesium.Cartesian3.magnitude(velocityVector);
  const kmPerHour = Math.round(metersPerSecond * 3.6);

  return `${kmPerHour} km/hr`;
}

// Add our model.
try {
  const modelPrimitive = viewer.scene.primitives.add(
    await Cesium.Model.fromGltfAsync({
      url: "../SampleData/models/CesiumMan/Cesium_Man.glb",
      scale: 4,
    })
  );

  modelPrimitive.readyEvent.addEventListener(() => {
    modelPrimitive.activeAnimations.addAll({
      loop: Cesium.ModelAnimationLoop.REPEAT,
      animationTime: function (duration) {
        return distance.getValue(viewer.clock.currentTime) / duration; //因为模型本身运行一遍时间固定，这里随着距离越大，速度也就越快
      },
      multiplier: 0.25, //模型整体的运行速率为原始0.25倍
    });
  });

  //根据模型的位置和速度属性来更新模型的旋转矩阵，以确保模型随着位置和速度的变化而正确旋转。
  const rotation = new Cesium.Matrix3();
  viewer.scene.preUpdate.addEventListener(function () {
    const time = viewer.clock.currentTime;
    const pos = position.getValue(time);
    const vel = velocityVectorProperty.getValue(time);
    Cesium.Cartesian3.normalize(vel, vel);
    Cesium.Transforms.rotationMatrixFromPositionVelocity(
      pos,
      vel,
      viewer.scene.globe.ellipsoid,
      rotation
    );
    Cesium.Matrix4.fromRotationTranslation(
      rotation,
      pos,
      modelPrimitive.modelMatrix
    );
  });
} catch (error) {
  window.alert(error);
}

const modelLabel = viewer.entities.add({
  position: position,
  orientation: new Cesium.VelocityOrientationProperty(position), 
  label: {
    text: new Cesium.CallbackProperty(updateSpeedLabel, false),
    font: "20px sans-serif",
    showBackground: true,
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      0.0,
      100.0  //显示标志的距离范围，超出不可视
    ),
    eyeOffset: new Cesium.Cartesian3(0, 7.2, 0),
  },
});
viewer.trackedEntity = modelLabel;
modelLabel.viewFrom = new Cesium.Cartesian3(-30.0, -10.0, 10.0);

```

## 四、Multi-part CZML（Cesium Zenith Map Language）

https://sandcastle.cesium.com/index.html?src=Multi-part%20CZML.html

### 案例说明

#### Cesium代码

```typescript
const viewer = new Cesium.Viewer("cesiumContainer", {
  shouldAnimate: true,
});

const statusDisplay = document.createElement("div");
const fuelDisplay = document.createElement("div");
const czmlPath = "../../SampleData/";
let vehicleEntity;

// Add a blank CzmlDataSource to hold our multi-part entity/entities.
const dataSource = new Cesium.CzmlDataSource();
viewer.dataSources.add(dataSource);

// This demo shows how a single path can be broken up into several CZML streams.
const partsToLoad = [
  {
    url: "MultipartVehicle_part1.czml",
    range: [0, 1500],
    requested: false,
    loaded: false,
  },
  {
    url: "MultipartVehicle_part2.czml",
    range: [1500, 3000],
    requested: false,
    loaded: false,
  },
  {
    url: "MultipartVehicle_part3.czml",
    range: [3000, 4500],
    requested: false,
    loaded: false,
  },
];

function updateStatusDisplay() {
  let msg = "";
  partsToLoad.forEach(function (part) {
    msg += `${part.url} - `;
    if (part.loaded) {
      msg += "Loaded.<br/>";
    } else if (part.requested) {
      msg += "Loading now...<br/>";
    } else {
      msg += "Not needed yet.<br/>";
    }
  });
  statusDisplay.innerHTML = msg;
}

// Helper function to mark a part as requested, and process it into the dataSource.
function processPart(part) {
  part.requested = true;
  updateStatusDisplay();
  dataSource.process(czmlPath + part.url).then(function () {
    part.loaded = true;
    updateStatusDisplay();

    // Follow the vehicle with the camera.
    if (!viewer.trackedEntity) {
      viewer.trackedEntity = vehicleEntity = dataSource.entities.getById(
        "Vehicle"
      );
    }
  });
}

// Load the first part up front.
processPart(partsToLoad[0]);

// Load a new section before the clock naturally gets there.
// Note this can't predict when a user may fast-forward to it.
const preloadTimeInSeconds = 100;

viewer.clock.onTick.addEventListener(function (clock) {
  // This example uses time offsets from the start to identify which parts need loading.
  const timeOffset = Cesium.JulianDate.secondsDifference(
    clock.currentTime,
    clock.startTime
  );

  // Filter the list of parts to just the ones that need loading right now.
  // Then, process each part that needs loading.
  partsToLoad
    .filter(function (part) {
      return (
        !part.requested &&
        timeOffset >= part.range[0] - preloadTimeInSeconds &&
        timeOffset <= part.range[1]
      );
    })
    .forEach(function (part) {
      processPart(part);
    });

  if (vehicleEntity) {
    const fuel = vehicleEntity.properties.fuel_remaining.getValue(
      clock.currentTime
    );
    if (Cesium.defined(fuel)) {
      fuelDisplay.textContent = `Fuel: ${fuel.toFixed(2)} gal`;
    }
  }
});

// Add a reset button, for convenience.
Sandcastle.addToolbarButton("Reset demo", function () {
  // Put things back to the starting position.
  viewer.clock.currentTime = viewer.clock.startTime;
  viewer.clock.shouldAnimate = true;

  partsToLoad.forEach(function (part) {
    part.requested = false;
    part.loaded = false;
  });

  dataSource.entities.removeAll();
  processPart(partsToLoad[0]);
});

// Show the status display below the reset button.
statusDisplay.style.background = "rgba(42, 42, 42, 0.7)";
statusDisplay.style.padding = "5px 10px";
document.getElementById("toolbar").appendChild(statusDisplay);

// Show a multi-part custom property being read from CZML.
fuelDisplay.style.background = "rgba(42, 42, 42, 0.7)";
fuelDisplay.style.padding = "5px 10px";
fuelDisplay.style.marginTop = "5px";
document.getElementById("toolbar").appendChild(fuelDisplay);

```

#### czml代码

> https://github.com/AnalyticalGraphicsInc/czml-writer/wiki/Packet

- id: 唯一标识符
- availability：控制加载要素什么时候显示
- label：文字标注
- model：加载模型
- orientation：方向
- viewFrom：加载要素时候摄像机位置
- properties：自定义属性
- path：路径显示时间 和 样式
- position：插值方式 和 插值度、不同时刻的位置



使用带模型移动的路径时候--修改步骤：

1、更改Cartesian3 的坐标列表（笛卡尔坐标系--坐标拾取 或者 利用Cesium提供的角度转笛卡尔坐标系方式）

```typescript
//记得高度设置，适当调高些，防止地形遮盖
//通过角度经纬度
let cartesian3 = Cesium.Cartesian3.fromDegrees( 121.80348,29.8171504923588,2500)
//如果所给是度分秒方式，可先转为角度经纬度--https://jwd.bmcx.com/
```

2、更改id内容

3、更改currenttime等时间

4、改标注内容

5、改插值方式

6、其他需要修改的内容，查看上述的github链接



```json
[
  {
    "id":"document",
    "version":"1.0"
  },
  {
    "id":"Vehicle",
    "availability":"2012-08-04T16:00:00Z/2012-08-04T17:04:54.9962195740191Z",
    "label":{
      "fillColor":[
        {
          "interval":"2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
          "rgba":[
            255,255,0,255
          ]
        }
      ],
      "font":"bold 10pt Segoe UI Semibold",
      "horizontalOrigin":"CENTER",
      "outlineColor":{
        "rgba":[
          0,0,0,255
        ]
      },
      "pixelOffset":{
        "cartesian2":[
          0.0,30.0
        ]
      },
      "scale":1.0,
      "show":[
        {
          "interval":"2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
          "boolean":true
        }
      ],
      "style":"FILL",
      "text":"Test Vehicle",
      "verticalOrigin":"CENTER"
    },
    "model":{
      "gltf":"models/CesiumMilkTruck/CesiumMilkTruck.glb",
      "minimumPixelSize":100,
      "maximumScale":50
    },
    "orientation" : {
      "velocityReference": "#position"
    },
    "viewFrom": {
      "cartesian": [ -2080, -1715, 779 ]
    },
    "properties" : {
        "fuel_remaining" : {
            "epoch":"2012-08-04T16:00:00Z",
            "number": [
                0, 22.5,
                1500, 21.2
            ]
        }
    },
    "path":{
      "material":{
          "solidColor":{
            "color":{
                "interval":"2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                "rgba":[
                  255,255,0,255
                ]
              }
            }
      },
      "width":[
        {
          "interval":"2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
          "number":5.0
        }
      ],
      "show":[
        {
          "interval":"2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
          "boolean":true
        }
      ]
    },
    "position":{
      "interpolationAlgorithm":"LAGRANGE",
      "interpolationDegree":1,
      "epoch":"2012-08-04T16:00:00Z",
      "cartesian":[
        0.0,-2379754.6637012,-4665332.88013588,3628133.68924173,
        10.0,-2379510.08905552,-4665419.64840452,3628182.20006795,
        20.0,-2379568.4769522,-4665555.3441867,3627970.83323261,
        30.0,-2379638.93786855,-4665691.63561896,3627750.82085873,
        40.0,-2379709.29834665,-4665827.9679646,3627530.80187124,
        50.0,-2379837.28064915,-4665847.7494347,3627422.12874017,
        60.0,-2379624.98289073,-4665907.50853722,3627484.1191848,
        70.0,-2379386.12743523,-4666029.54174431,3627483.83297459,
        80.0,-2379147.26777171,-4666151.56669944,3627483.5403492,
        90.0,-2378908.40390057,-4666273.58340244,3627483.24130864,
        1e2,-2378663.69301645,-4666379.62408751,3627507.14485116,
        110.0,-2378416.29648478,-4666444.93145547,3627584.82610021,
        120.0,-2378184.75115833,-4666458.05260387,3627718.84628509,
        130.0,-2377958.22637221,-4666461.11592729,3627862.42864636,
        140.0,-2377733.79758374,-4666460.508441,3628009.31669747,
        150.0,-2377509.36460154,-4666459.89268533,3628156.19830638,
        160.0,-2377284.92742603,-4666459.26866028,3628303.07347284,
        170.0,-2377060.48605759,-4666458.63636585,3628449.9421966,
        180.0,-2376835.38472681,-4666459.12413084,3628595.78980713,
        190.0,-2376609.71084875,-4666460.58154837,3628740.75156098,
        2e2,-2376384.03277903,-4666462.03069678,3628885.70687201,
        210.0,-2376158.35051806,-4666463.47157605,3629030.65573998,
        220.0,-2375928.48736859,-4666473.69575712,3629167.08552075,
        230.0,-2375685.23921682,-4666516.66377513,3629270.3788586,
        240.0,-2375437.34307768,-4666580.50029931,3629350.0215939,
        250.0,-2375189.01133306,-4666646.99320452,3629426.53515423,
        260.0,-2374940.52675783,-4666719.29042452,3629495.71527129,
        270.0,-2374695.15633549,-4666818.94185605,3629527.91579302,
        280.0,-2374469.42323533,-4666959.02687352,3629495.69349509,
        290.0,-2374249.06659405,-4667105.51477438,3629451.77975513,
        3e2,-2374028.70574724,-4667251.99442379,3629407.85959417,
        310.0,-2373808.3406953,-4667398.46582147,3629363.9330123,
        320.0,-2373585.10773309,-4667542.05948567,3629325.52597676,
        330.0,-2373360.83645524,-4667684.60869937,3629289.10800226,
        340.0,-2373136.5609746,-4667827.1496603,3629252.68360778,
        350.0,-2372912.28129155,-4667969.68236819,3629216.25279339,
        360.0,-2372687.9974065,-4668112.20682281,3629179.81555915,
        370.0,-2372463.70931983,-4668254.72302389,3629143.37190511,
        380.0,-2372239.41703195,-4668397.2309712,3629106.92183136,
        390.0,-2372018.7615611,-4668543.12509124,3629063.76398058,
        4e2,-2371803.72586004,-4668694.25404103,3629010.24868951,
        410.0,-2371587.17705087,-4668844.01756398,3628959.44085712,
        420.0,-2371365.33472237,-4668989.01539779,3628918.13984128,
        430.0,-2371134.7547923,-4669122.83460485,3628896.77687771,
        440.0,-2370898.14635373,-4669248.94021679,3628889.16522147,
        450.0,-2370660.31892949,-4669372.89697404,3628885.07134974,
        460.0,-2370422.47459187,-4669496.82305927,3628881.00796265,
        470.0,-2370184.62606153,-4669620.7408867,3628876.93815788,
        480.0,-2369946.77333888,-4669744.65045611,3628872.86193545,
        490.0,-2369708.91642433,-4669868.55176729,3628868.77929537,
        5e2,-2369471.05531832,-4669992.44482001,3628864.69023764,
        510.0,-2369233.19002126,-4670116.32961405,3628860.59476226,
        520.0,-2368989.65950726,-4670225.94237244,3628878.39787596,
        530.0,-2368742.64810033,-4670324.93393451,3628912.01606989,
        540.0,-2368494.95906007,-4670419.65546435,3628951.51257903,
        550.0,-2368248.2848424,-4670519.53079746,3628983.74302284,
        560.0,-2368001.37437725,-4670618.8319301,3629016.84097985,
        570.0,-2367753.95809484,-4670715.82368808,3629053.19940679,
        580.0,-2367506.53762994,-4670812.80718267,3629089.55141416,
        590.0,-2367259.11298298,-4670909.78241366,3629125.89700192,
        6e2,-2367011.6841544,-4671006.74938092,3629162.23617,
        610.0,-2366764.25114462,-4671103.70808425,3629198.56891833,
        620.0,-2366516.81395411,-4671200.6585235,3629234.89524684,
        630.0,-2366269.37258329,-4671297.60069848,3629271.21515549,
        640.0,-2366021.9270326,-4671394.53460904,3629307.52864419,
        650.0,-2365774.47730247,-4671491.460255,3629343.8357129,
        660.0,-2365527.02339333,-4671588.37763618,3629380.13636155,
        670.0,-2365279.56530564,-4671685.28675242,3629416.43059006,
        680.0,-2365032.10303983,-4671782.18760355,3629452.71839837,
        690.0,-2364784.63659633,-4671879.0801894,3629488.99978644,
        7e2,-2364537.16597558,-4671975.96450979,3629525.27475418,
        710.0,-2364289.69117801,-4672072.84056456,3629561.54330154,
        720.0,-2364042.21220407,-4672169.70835353,3629597.80542845,
        730.0,-2363794.72905419,-4672266.56787654,3629634.06113485,
        740.0,-2363547.2417288,-4672363.41913342,3629670.31042068,
        750.0,-2363299.75022835,-4672460.26212398,3629706.55328587,
        760.0,-2363052.25455328,-4672557.09684808,3629742.78973036,
        770.0,-2362805.96213832,-4672658.44235501,3629772.46055,
        780.0,-2362566.28756432,-4672777.84646024,3629774.74120741,
        790.0,-2362330.01543718,-4672904.47715606,3629765.56158533,
        8e2,-2362093.73913086,-4673031.09958839,3629756.37554393,
        810.0,-2361857.4586458,-4673157.71375702,3629747.18308323,
        820.0,-2361621.17398239,-4673284.31966172,3629737.98420324,
        830.0,-2361379.13396171,-4673398.62592987,3629748.21496888,
        840.0,-2361130.58722369,-4673488.59963461,3629793.74986512,
        850.0,-2360881.58098042,-4673573.14384665,3629846.50583809,
        860.0,-2360632.51954154,-4673657.07225834,3629900.06533886,
        870.0,-2360383.45393477,-4673740.99239963,3629953.61841672,
        880.0,-2360134.38416057,-4673824.90427038,3630007.16507155,
        890.0,-2359885.31021938,-4673908.80787044,3630060.70530326,
        9e2,-2359636.23211162,-4673992.70319966,3630114.23911177,
        910.0,-2359387.14983775,-4674076.5902579,3630167.76649697,
        920.0,-2359138.06339821,-4674160.469045,3630221.28745878,
        930.0,-2358889.14548278,-4674246.80164025,3630271.54165003,
        940.0,-2358640.17887385,-4674332.39488805,3630322.75317441,
        950.0,-2358391.03374684,-4674415.32432296,3630377.46713032,
        960.0,-2358141.88445605,-4674498.24548602,3630432.17466229,
        970.0,-2357892.7310019,-4674581.15837706,3630486.87577026,
        980.0,-2357643.59031994,-4674664.39449658,3630541.13554932,
        990.0,-2357394.48770584,-4674748.44899573,3630594.30439711,
        1e3,-2357145.38092955,-4674832.4952226,3630647.46682079,
        1010.0,-2356896.26999152,-4674916.53317705,3630700.62282028,
        1020.0,-2356647.15489217,-4675000.56285892,3630753.77239547,
        1030.0,-2356398.03563196,-4675084.58426807,3630806.91554629,
        1040.0,-2356148.91221132,-4675168.59740435,3630860.05227262,
        1050.0,-2355899.78463069,-4675252.60226762,3630913.18257437,
        1060.0,-2355650.65289051,-4675336.59885772,3630966.30645147,
        1070.0,-2355401.51699122,-4675420.58717452,3631019.42390381,
        1080.0,-2355152.37693328,-4675504.56721785,3631072.5349313,
        1090.0,-2354903.2327171,-4675588.53898758,3631125.63953384,
        1.1e3,-2354654.08434313,-4675672.50248355,3631178.73771134,
        1110.0,-2354404.86337217,-4675754.50046618,3631234.37690825,
        1120.0,-2354155.84214723,-4675830.29554952,3631297.80148619,
        1130.0,-2353909.99308372,-4675880.61174319,3631391.75187422,
        1140.0,-2353667.55938687,-4675917.7532863,3631500.33400567,
        1150.0,-2353425.14548842,-4675954.80919402,3631608.99321685,
        1160.0,-2353182.7274392,-4675991.85682064,3631717.64599126,
        1170.0,-2352940.30523964,-4676028.89616608,3631826.29232871,
        1180.0,-2352697.87889015,-4676065.92723028,3631934.93222899,
        1190.0,-2352455.44839119,-4676102.95001317,3632043.56569193,
        1.2e3,-2352213.01374317,-4676139.9645147,3632152.19271733,
        1210.0,-2351970.57494653,-4676176.97073479,3632260.81330501,
        1220.0,-2351728.13200169,-4676213.96867339,3632369.42745476,
        1230.0,-2351485.68490907,-4676250.95833043,3632478.03516641,
        1240.0,-2351243.23366913,-4676287.93970586,3632586.63643975,
        1250.0,-2351000.77828228,-4676324.91279958,3632695.2312746,
        1260.0,-2350758.31874895,-4676361.87761156,3632803.81967077,
        1270.0,-2350515.85506957,-4676398.83414172,3632912.40162807,
        1280.0,-2350273.38724458,-4676435.78239001,3633020.9771463,
        1290.0,-2350029.47875804,-4676477.3914753,3633124.49944636,
        1.3e3,-2349785.42349382,-4676519.45587927,3633227.51421022,
        1310.0,-2349541.36408501,-4676561.51200187,3633330.52253589,
        1320.0,-2349297.30053206,-4676603.55984302,3633433.52442318,
        1330.0,-2349053.2328354,-4676645.59940266,3633536.51987191,
        1340.0,-2348809.16099546,-4676687.63068071,3633639.50888189,
        1350.0,-2348565.08501267,-4676729.65367709,3633742.49145297,
        1360.0,-2348321.00488746,-4676771.66839174,3633845.46758493,
        1370.0,-2348076.92062027,-4676813.67482458,3633948.43727762,
        1380.0,-2347832.83221153,-4676855.67297554,3634051.40053084,
        1390.0,-2347588.73966167,-4676897.66284454,3634154.35734442,
        1.4e3,-2347344.64297113,-4676939.64443151,3634257.30771818,
        1410.0,-2347101.04731466,-4676979.96034855,3634362.04616856,
        1420.0,-2346858.26575513,-4677017.5834931,3634469.6847769,
        1430.0,-2346614.99348312,-4677056.89461847,3634575.46081166,
        1440.0,-2346369.55744615,-4677103.7262244,3634672.99207759,
        1450.0,-2346124.8248997,-4677147.9423086,3634773.39569376,
        1460.0,-2345880.74403986,-4677189.73374292,3634876.46090671,
        1470.0,-2345636.65904236,-4677231.51689469,3634979.51967852,
        1480.0,-2345392.56990766,-4677273.29176384,3635082.57200902,
        1490.0,-2345148.47663614,-4677315.05835029,3635185.61789803,
        1.5e3,-2344904.37922829,-4677356.81665397,3635288.65734536
      ]
    }
  }
]

```

