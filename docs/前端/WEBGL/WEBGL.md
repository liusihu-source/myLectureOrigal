# WBEGL

> https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial

## 一、WEBGL概念

使支持canvas标签的浏览器，在不借助插件情况下使用opengl 提供的API进行3D渲染。

WEBGL = js控制代码 + GPU中的渲染代码 shader code



## 二、画一条线

- 获取 canvas 的引用，保存在‘canvas’变量里
- 调用getContext并传递webgl参数返回gl对象
- 

```
<body onload="main()">
  <canvas id="glcanvas" width="640" height="480">
    你的浏览器似乎不支持或者禁用了 HTML5 <code>&lt;canvas&gt;</code> 元素。
  </canvas>
</body>

```

```
// 从这里开始
function main() {
  const canvas = document.querySelector("#glcanvas");
  // 初始化 WebGL 上下文
  const gl = canvas.getContext("webgl");

  // 确认 WebGL 支持性
  if (!gl) {
    alert("无法初始化 WebGL，你的浏览器、操作系统或硬件等可能不支持 WebGL。");
    return;
  }

  // 使用完全不透明的黑色清除所有图像
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  // 用上面指定的颜色清除缓冲区
  gl.clear(gl.COLOR_BUFFER_BIT);
}
```





## 三、Cesium中使用

PostProcessStage 后期纹理处理

```typescript
HkScrCreatePostStage(viewDistance: number, visibleAreaColor: Cesium.Color, inVisibleAreaColor: Cesium.Color) {
    const myPostStage = new Cesium.PostProcessStage({
      fragmentShader: glslView,
      uniforms: {
        shadowMap_textureCube: () => {
          this.HkScrShadowMap.update(Reflect.get(this.HkScrViewer.scene, "_frameState"));
          return Reflect.get(this.HkScrShadowMap, "_shadowMapTexture");
        },
        shadowMap_matrix: () => {
          this.HkScrShadowMap.update(Reflect.get(this.HkScrViewer.scene, "_frameState"));
          return Reflect.get(this.HkScrShadowMap, "_shadowMapMatrix");
        },
        shadowMap_lightPositionEC: () => {
          this.HkScrShadowMap.update(Reflect.get(this.HkScrViewer.scene, "_frameState"));
          return Reflect.get(this.HkScrShadowMap, "_lightPositionEC");
        },
        shadowMap_normalOffsetScaleDistanceMaxDistanceAndDarkness: () => {
          this.HkScrShadowMap.update(Reflect.get(this.HkScrViewer.scene, "_frameState"));
          const bias = this.HkScrShadowMap._pointBias;
          return Cesium.Cartesian4.fromElements(
            bias.normalOffsetScale,
            this.HkScrShadowMap._distance,
            this.HkScrShadowMap.maximumDistance,
            0.0,
            new Cesium.Cartesian4()
          );
        },
        shadowMap_texelSizeDepthBiasAndNormalShadingSmooth: () => {
          this.HkScrShadowMap.update(Reflect.get(this.HkScrViewer.scene, "_frameState"));
          const bias = this.HkScrShadowMap._pointBias;
          const texelStepSize = new Cesium.Cartesian2();
          texelStepSize.x = 1.0 / this.HkScrShadowMap._textureSize.x;
          texelStepSize.y = 1.0 / this.HkScrShadowMap._textureSize.y;
          return Cesium.Cartesian4.fromElements(
            texelStepSize.x,
            texelStepSize.y,
            bias.depthBias,
            bias.normalShadingSmooth,
            new Cesium.Cartesian4()
          );
        },
        camera_projection_matrix: this.HkScrLightCamera.frustum.projectionMatrix,
        camera_view_matrix: this.HkScrLightCamera.viewMatrix,
        helsing_viewDistance: () => {
          return viewDistance;
        },
        helsing_visibleAreaColor: visibleAreaColor,
        helsing_invisibleAreaColor: inVisibleAreaColor
      },
    });
    this.HkScrPostStage = this.HkScrViewer.scene.postProcessStages.add(myPostStage);
  }
```

