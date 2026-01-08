## Collection & dataSources 

> billboardCollection 管理 billBoard
>
> dataSources 管理 各种数据源数据 和 entity（polyline point polygon等）
>
> tileseManage 管理 3dtiels合集
>
> primitivesCollections
>

## 一、Viewer

####  dataSourceDisplay : DataSourceDisplay

Gets the display used for [`DataSource`](http://localhost/Cesium196/Build/Documentation/DataSource.html) visualization.



#### dataSources：DataSourceCollection

Gets the set of [`DataSource`](http://localhost/Cesium196/Build/Documentation/DataSource.html) instances to be visualized.



#### entities：EntityCollection

Gets the collection of entities not tied to a particular data source. This is a shortcut to [`dataSourceDisplay.defaultDataSource.entities`](http://localhost/Cesium196/Build/Documentation/Viewer.html#dataSourceDisplay).

:bulb: 其中dataSources可以添加各种DataSource，如czmldataSource等



## 二、entity 和 primitive

#### primitive

- `primitives`是`Scene`的一个属性，用于添加自定义的几何体（`Primitive`）。
- 适用于需要高度自定义的场景，例如创建复杂的3D模型或特效。
- 通常用于创建那些不是简单的点、线、面的对象，比如体积渲染、自定义着色器等。
- 可以通过`PrimitiveCollection`来管理，它提供了优化，特别是在渲染大量相同的几何体时。

##### 性能优势：
- **批处理渲染**：`PrimitiveCollection`可以将多个几何实例打包在一起，减少绘制调用（Draw Calls），从而提高渲染效率。
- **内存管理**：由于几何体是批量处理的，内存使用更加高效。
- **状态更改优化**：减少 WebGL 状态更改，因为多个几何体可以使用相同的着色器和材质进行渲染。

#### Entities：
- `entities`是`Viewer`的一个属性，用于添加和管理地理空间实体（`Entity`）。
- 适用于表示具有地理坐标的点、线、面等基本图形，如标记点、路径、盒子、圆柱等。
- 提供了丰富的属性来定义实体的样式和行为，例如标签、描述、图像等。
- 通常用于数据可视化和简单的地理空间标注。

#### 使用场景：

- 当需要表示具有地理或屏幕位置的简单图形时，使用`entities`。
- 当需要与时间轴或其他Cesium控件交互时，使用`entities`。

#### 区别和适用场景：

- **复杂度**：`primitives`适合复杂和高度自定义的几何体，`entities`适合简单的、标准形状的几何体。
- **管理**：`primitives`使用`PrimitiveCollection`进行管理，而`entities`使用`EntityCollection`。
- **性能**：`primitives`在渲染大量相同的几何体时有性能优势，`entities`则在管理和交互方面更加方便。
- **场景**：如果你需要创建大量的自定义几何体，比如成千上万个点或自定义形状，使用`primitives`。如果你需要在地图上标记特定的位置或路径，使用`entities`。

选择使用`primitives`还是`entities`，取决于你的具体需求，包括所需的几何体复杂度、性能要求、以及是否需要与Cesium的其他功能（如时间轴）进行交互。

