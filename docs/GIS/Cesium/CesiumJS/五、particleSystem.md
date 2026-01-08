# ParticleSystem

> **viewer.clock.shouldAnimate = true;**   绝对要打开

## 1.时间JulianDate

> 即自 1 月 1 日中午 （公元前 4713 年） 正午以来的天数

```typescript
const start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
const stop = Cesium.JulianDate.addSeconds(
  start,
  120,
  new Cesium.JulianDate()
);
```

## 2.knockout.jsUI库

> 特点在于数据双向绑定，即MVVM

- 用法Demo

```html
<!DOCTYPE html>
<html lang="zh-CN">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="https://cesium.com/downloads/cesiumjs/releases/1.88/Build/Cesium/Cesium.js"></script>
  <link href="https://cesium.com/downloads/cesiumjs/releases/1.88/Build/Cesium/Widgets/widgets.css" rel="stylesheet">
  <style>
    html,
    body,
    #cesiumContainer {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
    }

    .inputPanel {
      position: absolute;
      background-color: aliceblue;
      top: 20px;
      left: 20px;
      padding: 10px;
      border-radius: 10px;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      width: 100%;
      text-align: center;
    }

    .form-item {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 10px;
    }

    .form-item .label {
      width: 80px;
    }

    .form-item .value {
      width: 40px;
    }
  </style>
  <title>Cesium.knockout示例</title>
</head>

<body>
  <div id="cesiumContainer"></div>
  <div id="inputPanel" class="inputPanel">
    <div class="title">图层参数调整</div>
    <div class="form-item">
      <div class="label">透明度:</div>
      <input type="range" min="0.0" max="1.0" step="0.01" data-bind="value: alpha, valueUpdate: 'input'">
      <div class="value" data-bind="html: alpha"></div>
    </div>
    <div class="form-item">
      <div class="label">亮度:</div>
      <input type="range" min="0.0" max="10" step="0.01" data-bind="value: brightness, valueUpdate: 'input'">
      <div class="value" data-bind="html: brightness"></div>
    </div>
    <div class="form-item">
      <div class="label">对比度:</div>
      <input type="range" min="0.0" max="10" step="0.01" data-bind="value: contrast, valueUpdate: 'input'">
      <div class="value" data-bind="html: contrast"></div>
    </div>
    <div class="form-item">
      <div class="label">色调:</div>
      <input type="range" min="0.0" max="6.283" step="0.01" data-bind="value: hue, valueUpdate: 'input'">
      <div class="value" data-bind="html: hue"></div>
    </div>
    <div class="form-item">
      <div class="label">饱和度:</div>
      <input type="range" min="0.0" max="10" step="0.01" data-bind="value: saturation, valueUpdate: 'input'">
      <div class="value" data-bind="html: saturation"></div>
    </div>
    <div class="form-item">
      <div class="label">伽马值:</div>
      <input type="range" min="0.0" max="10" step="0.01" data-bind="value: gamma, valueUpdate: 'input'">
      <div class="value" data-bind="html: gamma"></div>
    </div>
  </div>
  <script>
    let viewer = new Cesium.Viewer('cesiumContainer');

    // 1.创建viewModel对象
    const viewModel = {
      alpha: 1.0, // 透明度, 范围0.0-1.0
      brightness: 1.0, // 亮度
      contrast: 1.0, // 对比度
      hue: 0.0, // 色调
      saturation: 1.0, // 饱和度
      gamma: 1.0, // 伽马值
    };

    // 2.监测viewModel中的属性
    Cesium.knockout.track(viewModel);

    // 3.激活属性, 将viewModel对象与html控件绑定
    const inputPanel = document.getElementById('inputPanel');
    Cesium.knockout.applyBindings(viewModel, inputPanel);
    // 获取当前地球影像
    const mLayer = viewer.imageryLayers.get(0);

    // 4.监听属性变化
    monitorParamChange("alpha");
    monitorParamChange("brightness");
    monitorParamChange("contrast");
    monitorParamChange("hue");
    monitorParamChange("saturation");
    monitorParamChange("gamma");

    function monitorParamChange(name) {
      Cesium.knockout.getObservable(viewModel, name).subscribe(function (value) {
        // value值改变后会赋值给imagelayer的相应属性
        mLayer[name] = value;
      });
    }
  </script>
</body>

</html>

```

## 3.Matrix3

> 用于返回一个3*3的矩阵

```typescript
new Cesium.Matrix3(column0Row0, column1Row0, column2Row0, column0Row1, column1Row1, column2Row1, column0Row2, column1Row2, column2Row2)
```

## 4.Matrix4

> 用于返回一个4*4的矩阵
>

```typescript
new Cesium.Matrix4(column0Row0, column1Row0, column2Row0, column3Row0, column0Row1, column1Row1, column2Row1, column3Row1, column0Row2, column1Row2, column2Row2, column3Row2, column0Row3, column1Row3, column2Row3, column3Row3)
```

## 5.Entity.computeModelMatrix -> Matrix4

> 用于在指定时间点计算实体转换的模型矩阵。如果方向或位置未定义，则返回未定义。

```typescript
function computeModelMatrix(entity, time) {
  return entity.computeModelMatrix(time, new Cesium.Matrix4());
}
```

## 6.HeadingPitchRoll -> Quaternion

> 用偏航（heading）、俯仰（pitch）和翻滚（roll）表示的旋转。 heading是实体与z轴的旋转角，pitch是实体与y轴的旋转角，roll是实体与x轴的旋转角。
>
> - 注：这些参数的单位是 `弧度`

```typescript
new Cesium.HeadingPitchRoll(heading, pitch, roll)
```

## 7.Quaternion -> TranslationRotationScale.rotation

> 一个四元数[w, (x, y, z)]定义了复数 w+xi+yj+zk，很多标准复数的性质都能应用到四元数上。更重要的是，和复数能用来旋转2D中的向量类似，四元数也能用来旋转3D中的向量。
>
> - 一个四元数包含一个标量和一个3D向量，经常记标量分量为w，记向量分量为单一的v 或分开的x、y、z。
> - Cesium.Quaternion.fromHeadingPitchRoll(headingPitchRoll, result)
>   - 从给定的偏航角（heading），俯仰角（pitch）和翻滚角（roll）计算一个旋转。 `偏航是绕z轴负方向旋转。俯仰是绕y轴负方向旋转。翻滚是绕x轴正方向旋转。`

```typescript
new Cesium.Quaternion(x, y, z, w)

//fromHeadingPitchRoll方法
hpr = Cesium.HeadingPitchRoll.fromDegrees(0.0, 0.0, 0.0, hpr);
trs.rotation = Cesium.Quaternion.fromHeadingPitchRoll(hpr, rotation);
```

## 8.TranslationRotationScale -> Matrix4

> 由平移、旋转和缩放定义的仿射变换。
>
> - translation： 平移，`类型：Cartesian3，用于控制距离指定Cartesian3点的相对平移偏移量`
> - rotation：旋转 ，`类型：Quaternion`
> - scale：缩放，`类型：Cartesian3`

```typescript
new Cesium.TranslationRotationScale(translation, rotation, scale)
```





