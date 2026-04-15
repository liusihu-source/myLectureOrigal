# jsPlumb

:bulb: 实例属性配置用小写、默认配置用大写

:bulb: 父容器必须有`position:relative`



## 坐标方式

```javascript
import { jsPlumb } from 'jsplumb'
// 工具函数
function getTwoPointsByID(sourceId, targetId) {
  const sourceElement = document.getElementById(sourceId)
  const targetElement = document.getElementById(targetId)
  const sourceRect = sourceElement.getBoundingClientRect()
  const targetRect = targetElement.getBoundingClientRect()
  
  // 获取容器的相对位置
  const container = document.getElementById('s_lineContainer')
  const containerRect = container.getBoundingClientRect()
  
  return {
    // 转换为相对于容器的坐标
    sourceX: sourceRect.right - containerRect.left,
    sourceY: sourceRect.top + 24 - containerRect.top,
    targetX: targetRect.left - containerRect.left,
    targetY: targetRect.top + 24 - containerRect.top
  }
}

function createConnectionBetweenPoints(x1, y1, x2, y2){
    const container = document.getElementById('s_lineContainer')
    // 创建源端点容器 和 目标端点容器
    const sourceDiv = document.createElement('div')
    sourceDiv.style.cssText = `
      position: absolute;
      left: ${x1}px;
      top: ${y1}px;
    `
    container.appendChild(sourceDiv)

    const targetDiv = document.createElement('div')
    targetDiv.style.cssText = `
      position: absolute;
      left: ${x2}px;
      top: ${y2}px;
    `
    container.appendChild(targetDiv)
    
    // 建立连接
    let connection = jsPlumb.connect({
        source: sourceDiv,
        target: targetDiv,
        anchors: ['Right', 'Left'],
        // 连线样式
        paintStyle: {
          stroke: '#3A8BFF',
          strokeWidth: 2,
          radius: 5
        },
        // 箭头
        overlays: [
          ['Arrow', {
            width: 10,
            length: 10,
            location: 0.97
          }]
        ],
        // connector: ['Flowchart']
        connector: ['Bezier', { curviness: 50 }]
      })
      connection.endpoints[0].setPaintStyle({ fill: '#3A8BFF', radius: 5 })
      connection.endpoints[1].setPaintStyle({ fill: '#00B368', radius: 5 })
    
    return { sourceDiv, targetDiv, connection }
}
```



```javascript
const connectLineList = ref([])

const { sourceX, sourceY, targetX, targetY } = getTwoPointsByID(startPointId.value, targetId)
const { sourceDiv, targetDiv, connection } = createConnectionBetweenPoints(sourceX, sourceY, targetX, targetY)

onnectLineList.value.push({
    id: startPointId.value + '-' + targetId,
    sourceDiv: sourceDiv,
    targetDiv: targetDiv,
    connection: connection,
    leftInitScrollTop: scrollMap.get(startPointId.value.split('_')[0]).value.scrollTop,
    rightInitScrollTop: scrollMap.get(targetId.split('_')[0]).value.scrollTop
})
```





## dom节点方式

```javascript
import { jsPlumb } from 'jsplumb'
// 默认配置可选，统一用
jsPlumb.importDefaults({
    EndpointStyle: {
      fill: 'transparent'
    },
    Anchor: ['Left', 'Right', 'Top', 'Bottom'],
    Container: container,
    ConnectionsDetachable: false,
    ConnectionOverlays: [
      ['Arrow', {
        location: 0.01,
        width: 10,
        length: 10
      }]
    ],
    Connector: ['Bezier', { curviness: 10 }],
    PaintStyle: {
      strokeWidth: 15
    }
})

let sourceElement = XXX
let targetElement = XXX

jsPlumb.connect({
  source: sourceElement,
  target: targetElement,
  anchors: anchors,
  overlays: [
    ['Arrow', {
      width: 10,
      length: 10,
      location: 0.01
    }],
    ['Label', {
      label: item.label,
      location: 0.95
    }]
  ],
  paintStyle: {
    stroke: '#666',
    strokeWidth: 10,
    gradient: {
      stops: [
        [0, hexToRgba(getLineColor(item.source, COURSES.value, COURSEBGMAP.value), 0.8)],
        [1, hexToRgba(getLineColor(item.target, COURSES.value, COURSEBGMAP.value), 0.8)]
      ]
    }
  },
  // connector: ['Bezier', { curviness: 80 }]
  connector: ['Flowchart', {
    gap: 0
  }]
})
```



## 属性

```javascript
//可控制连接线 连接点样式（颜色 大小 背景图片）； 连接点位置；
jsPlumb.importDefaults({
  // 端点样式
  endpointStyle: {
    fill: 'transparent',  // 透明填充
    outlineStroke: 'transparent',  // 透明边框
    radius: 5  // 端点半径（仅对Dot类型有效）
  },
  endpoint: ["Dot", { radius: 5 }]        // 圆点
  endpoint: ["Rectangle", { width: 10, height: 10 }] // 矩形
  endpoint: ["Image", { src: "endpoint.png" }] // 图片
  
  // 锚点配置
  anchor: ['Left', 'Right', 'Top', 'Bottom'],  // 允许的锚点位置
  anchor: 'AutoDefault',  // 自动选择最佳锚点
  anchors: [[0.3,1,0,1], "Top"] //连接点位置精确描述, 元素水平 30%、垂直 100%（底边）处
  
  // 容器与行为
  container: taskListContainer.value,
  connectionsDetachable: false,  // 禁止拖动断开连接
  reattachConnections: true,  // 拖动节点时自动重连
  
  // 连接线样式
  connector: ['Bezier', { 
    curviness: 100,  // 
      贝塞尔曲线曲率
    stub: 30,  // 起始段长度
    gap: 5  // 与端点的间距
  }],
  
  // 绘制样式
  paintStyle: {
    stroke: '#2981FF',  // 默认线条颜色
    strokeWidth: 2,  // 线条宽度
    dashstyle: '0',  // 虚线样式（如"5 2"表示5px实线+2px空白）
    outlineStroke: 'transparent',  // 点击热区边框
    outlineWidth: 10  // 点击热区宽度
  },
  
  // 覆盖层（箭头/标签等）
  connectionOverlays: [
    ['Diamond', {
      location: 0.99,
      width: 12,
      length: 12,
      foldback: 0.8  // 菱形锐度（0-1）
    }],
    ['Label', {  // 添加文字标签
      label: '连接',
      cssClass: 'connection-label',
      location: 0.5
    }]
  ]
});
```



![image-20260107142742886](./JSplumb.assets/image-20260107142742886.png)

