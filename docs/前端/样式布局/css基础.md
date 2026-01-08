# css基础

## 方式

外联、内联、内部style



## 回流 

- 页面元素布局或几何属性发生变化；
- 浏览器重新构建布局树，进而重新绘制页面；
- 回流具有极高的性能耗费；
- 常见场景
  - 修改窗口；
    - 尺寸；
  - 修改文本样式；
    - 大小；
    - 字体类型；
  - 修改元素；
    - 盒子模型布局相关；
    - 子元素；
  - 修改布局；
    - float/clear；
    - display；
  - 添加/删除样式表；



## 重绘

- 页面元素样式发生变化；
- 浏览器重新绘制元素样式，即更新渲染树，但不会改变布局树；
- 重绘代价相对于回流较低，但依旧具有一定的性能耗费；
- 常见场景
  - 修改元素样式；
    - 元素颜色；
    - 可见性/透明度；
    - 盒子模型样式相关：radius/shadow；
  - 修改文本样式；
    - 文本装饰；
    - 字体属性；
  - 修改背景；
    - 背景图片；
    - 背景颜色



回流一定导致重绘，但重绘不一定导致回流



## CSS3新特新

- 选择器；
- 长度单位：rem/vw/vh；
- 边框属性；
  - border-radius；
  - box-shadow；
- 背景属性；
  - background-clip；
  - background-origin；
  - background-size；
- 自定义字体；
- 文字属性；
  - word-warp；
  - text-overflow；
  - text-shadow；
  - text-decoration；
- 媒体查询；
- 颜色；
  - rgba；
  - linear/radial-gradient；
- 布局：flex/grid/多列布局；
- 动画；
  - transition；
  - transform；
  - animation