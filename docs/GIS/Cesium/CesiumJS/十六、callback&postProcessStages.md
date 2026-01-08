# callback & postProcessStages 

## 一、callback

主要给一些entity属性值添加Cesium.CallbackProperty(function(time, result){}, boolean)

应用案例

```typescript
// 逐渐拉伸
function scaleProperty(property, scalingFactor) {
  // returns a property that scales another property by a constant factor.
  return new Cesium.CallbackProperty(function (time, result) {
    result = property.getValue(time, result);
    result = result * scalingFactor;
    return result;
  }, property.isConstant);
}
colorado.polygon.extrudedHeight = scaleProperty(property, 1 / 50.0);

//线变长
const redLine = viewer.entities.add({
  polyline: {
    // This callback updates positions each frame.
    positions: new Cesium.CallbackProperty(function (time, result) {
      endLongitude =
        startLongitude +
        0.001 * Cesium.JulianDate.secondsDifference(time, startTime);
      return Cesium.Cartesian3.fromDegreesArray(
        [startLongitude, startLatitude, endLongitude, startLatitude],
        Cesium.Ellipsoid.WGS84,
        result
      );
    }, isConstant),
    width: 5,
    material: Cesium.Color.RED,
  },
});

//更改标注文字
const modelLabel = viewer.entities.add({
  position: position,
  orientation: new Cesium.VelocityOrientationProperty(position), // Automatically set the model's orientation to the direction it's facing.
  label: {
    text: new Cesium.CallbackProperty(updateSpeedLabel, false),
    font: "20px sans-serif",
    showBackground: true,
    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
      0.0,
      100.0
    ),
    eyeOffset: new Cesium.Cartesian3(0, 7.2, 0),
  },
});
```



## 二、postProcessStages

着色器语言与，用于scene.postProcessStages.add(Cesium.PostProcessStage(options))，postProcessStages:PostProcessStageCollection

:bulb: 其中只有fragmentShader 是必填项

```typescript
const stage = scene.postProcessStages.add(
  new Cesium.PostProcessStage({
    fragmentShader: fragmentShaderSource,
    uniforms: {
      highlight: function () {
        return new Cesium.Color(1.0, 0.0, 0.0, 0.5);
      },
    },
  })
);
```

