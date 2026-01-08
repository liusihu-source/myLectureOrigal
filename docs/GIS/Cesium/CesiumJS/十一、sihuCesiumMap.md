# Pinia + Bus(可选) + Vue组件 + Env环境配置 + Cesium1.96



## 一、简述

1. 目的
   1. 方便各组件间Cesium对象共享
   2. 方便Cesium单文件存储
   3. 方便开发环境和生产环境的搭建
2. 整体流程简述
   1. 配置环境文件
      - .env.development
        - VUE_APP_BASE_URL： 本机AJAXApiURL  【端口1】
      - .env.production
        - VUE_APP_BASE_URL： 服务器AJAXApiURL  【端口1】
   2. Bus通讯配置
      - Bus.js文件配置
      - Vue1： Bus.emit
      - Vue2： Bus.on   和   Bus.off
   3. Pinia全局配置
      - 分modules进行存储
      - 单个module
        - state
        - getters
        - action
   4. myCesium类
      - constructor ： property
      - constructor ： methods
        - init  //将原生CesiumViewer对象赋给myCesium类的自定义#viewer，其他类似
        - otherFunction...
   5. Vue组件使用
      - 引入Pinia myCesium【Env环境参数 和 Bus 可选】
      - setup：onMounted
        - Pinia + myCesium => state : CesiumObj 实例化 与 各组件之间映射实例化对象
      - Bus + Env
        - 组件间监听事件，方便CesiumObj操作
        - Env环境参数



## 二、使用步骤

### 1、安装

- Cesium1.96.0
- pinia2.0.23
- vite-plugin-cesium1.2.20

```json
{
  "name": "viteblank",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.2.37"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^3.1.0",
    "axios": "^1.1.2",
    "cesium": "1.96.0",
    "default-passive-events": "^2.0.0",
    "element-plus": "^2.2.17",
    "fast-glob": "^3.2.12",
    "path": "^0.12.7",
    "pinia": "^2.0.23",
    "sass": "^1.55.0",
    "typescript": "^4.6.4",
    "vite": "^3.1.0",
    "vite-plugin-cesium": "1.2.20",
    "vite-plugin-svg-icons": "^2.0.1",
    "vue-router": "^4.1.5",
    "vue-tsc": "^0.40.4"
  }
}
```

### 2、vite.config,ts

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
//主要配置以下这两行
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import cesium from 'vite-plugin-cesium'

// https://vitejs.dev/config/
export default defineConfig( {
  plugins: [
    //主要配置 createSvgIconsPlugin方法参数对象
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    vue(),
    cesium()
  ],
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  envPrefix: 'VITE_'
})
```

### 3、src/store/index.ts

```typescript
import CesiumInstance from "./Cesium/Cesium";
import useModuleTwo from "./moduleTwo/moduleTwo";

//allStore是一个对象类型，然后通过:{} 来 指定该对象的内部键值对类型
const allStore:{ [key: string]: any } = {}
export default function useStore(){
  allStore.CesiumInstance = CesiumInstance()
  allStore.moduleTwo = useModuleTwo()
  return allStore
}

```

`Cesium.ts`

```typescript
import {defineStore} from "pinia";
import {ITodoItem} from "@/util/dataType";
import request from "@/util/request";

const CesiumInstance = defineStore('CesiumCenter', {
  state: () => ({
    list : [] as ITodoItem[],
    displayCondition: '',
    cesiumObj: null
  }),
  actions:{
    async getlist(){
      const { data } = await request.get<ITodoItem[]>('/todos' )
      this.list = data
    },
    setCesiumObj(value:any) {
      this.cesiumObj = value
    }
  },
  getters:{

  }
  }
)

export default CesiumInstance

```

### 4、src/assets/cesiumConfig

```typescript
// @ts-ignore
import * as Cesium from 'cesium/Build/Cesium';
import 'cesium/Build/Cesium/Widgets/widgets.css'
import { ElMessage } from 'element-plus'

export default class CesiumMap {
  tigerViewer:any
  tilesManage:any
  constructor () {
    return this
  }
  //初始化
  init (container:any){
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJhYjIyNDk5Ni1hNmFlLTQyNzctOGMwOS1hYWU4NmEyMjcxZTEiLCJpZCI6NDM0MjEsImlhdCI6MTYxNTcyNDg5NH0.fyGAT3jkTTGTMKbvXAllYNUvXbU9qwcTMkhLEXcD9Rc';
    this.tigerViewer = new Cesium.Viewer(container, {
      baseLayerPicker: false,   //Cesium自带底图切换功能
      timeline: false,  //时间条
      infoBox: true,   //信息框
      fullscreenButton: false,  //全屏
      geocoder: false,
      sceneModePicker: false,
      navigationHelpButton: false,  //Cesium自带帮助信息栏
      homeButton:false,
      animation: false,
      depthTestAgainstTerrain: true,
      terrainProvider : Cesium.createWorldTerrain({
        url : Cesium.IonResource.fromAssetId(1),
        requestWaterMask : true
      })
    })
    this.tigerViewer._cesiumWidget._creditContainer.style.display = 'none'  //去掉logo

    this.tigerViewer.scene.primitives.destroyPrimitives = false  //
    this.tilesManage = new Cesium.PrimitiveCollection()
    this.tigerViewer.scene.primitives.add(this.tilesManage)

    Cesium.ExperimentalFeatures.enableModelExperimental = true   //开启泛光特效
  }
  /*
  * 1.模型管理
  * addTileModel：添加模型
  * tigerflyTo： 飞行
  * removeTileModel： 移除
  * */
  addTileModel(tileModel:any){
    if(this.tilesManage.contains(tileModel)){
      alert('不可重复加载')
    } else {
      this.tilesManage.add(tileModel)
    }
  }
  tigerflyTo(tilePoi:any){
    this.tigerViewer.flyTo(tilePoi)
  }
  removeTileModel(tileModel:any){
    if (this.tilesManage.contains(tileModel)) {
      this.tilesManage.remove(tileModel)
    } else {
      alert('模型已移除')
    }
  }

  /*
  * 2.基本分析
  * formatDegree： 角度经纬度 -> 度分秒经纬度
  * getPoi： 获取坐标
  * tigerLengthMeasure：长度测量
  * tigerAreaMeasure：面积测量
  * */
  formatDegree(value: any) {
    if(value != null && value != ''){
      ///<summary>将度转换成为度分秒</summary>
      value = Math.abs(value);  //返回数的绝对值
      let v1 = Math.floor(value);//度   //对数进行下舍入
      let v2 = Math.floor((value - v1) * 60);//分
      let v3 = Math.round((value - v1) * 3600 % 60);//秒  //把数四舍五入为最接近的整数
      return v1 + "°" + v2 + "'" + v3;
    }else{
      return '' + ';' + '' + ';' + '' + ';';
    }
  };
  getPoi(){
    let handler = new Cesium.ScreenSpaceEventHandler(this.tigerViewer.scene.canvas)
    // 设置要在输入事件上执行的功能，官方文档查询ScreenSpaceEventType可以看到所有的cesium鼠标事件
    handler.setInputAction((movement:any) => {
      let cartesian3 = this.tigerViewer.scene.camera.pickEllipsoid(movement.position, this.tigerViewer.scene.globe.ellipsoid)
      // 防止点击到地球之外报错，加个判断
      if (cartesian3 && Cesium.defined(cartesian3)) {
        let cartographic = Cesium.Cartographic.fromCartesian(cartesian3)  //弧度
        let lng = Cesium.Math.toDegrees(cartographic.longitude)  //角度经度，单位度
        let lat = Cesium.Math.toDegrees(cartographic.latitude)   //角度纬度，单位度
        let height = cartographic.height;  //角度高度，单位米
        console.log('角度经纬度',lng, lat, height);
        console.log('地理经度', this.formatDegree(lng))
        console.log('地理纬度', this.formatDegree(lat))
        ElMessage({
          message: `经度：${this.formatDegree(lng)},纬度：${this.formatDegree(lat)}`,
          type: 'success',
        })
      }
      handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK)
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
  }
  tigerLengthMeasure(){
    let start:Cesium.Cartesian3;
    let end:Cesium.Cartesian3;
    const that = this
    // 监听鼠标左击事件
    that.tigerViewer.screenSpaceEventHandler.setInputAction(function (click:any) {
      //返回Ray(在世界坐标中，从摄影机位置通过windowPosition处的像素创建光线。)
      //click.position，属于Cartesian2类型，即一个像素的XY坐标
      const ray = that.tigerViewer.camera.getPickRay(click.position);
      //globe获取或设置深度测试椭球体；
      //返回的position是Cartesian3类型
      const position = that.tigerViewer.scene.globe.pick(ray, that.tigerViewer.scene);
      const point = that.tigerViewer.entities.add({
        name: 'startOrEnd point',
        position: position,
        point: {
          pixelSize: 5,
          color: Cesium.Color.RED,
          outlineColor: Cesium.Color.WHITE,
          outlineWidth: 2,
        },
        label: {
          text: '起点',
          font: "24px Helvetica",
          fillColor: Cesium.Color.RED,
          style: Cesium.LabelStyle.FILL_AND_OUTLINE,
          showBackground: true
        },
      })
      if (!Cesium.defined(start)) {
        start = position;
      } else if (!Cesium.defined(end)) {
        end = position;
        const distance = Cesium.Cartesian3.distance(start, end);
        const midpoint = Cesium.Cartesian3.midpoint(start, end, new Cesium.Cartesian3());
        let cartographicStart = Cesium.Cartographic.fromCartesian(start)
        let cartographicEnd = Cesium.Cartographic.fromCartesian(end)
        const polyline = that.tigerViewer.entities.add({
          polyline: {
            positions: Cesium.Cartesian3.fromDegreesArray(
              [
                Cesium.Math.toDegrees(cartographicStart.longitude),
                Cesium.Math.toDegrees(cartographicStart.latitude),
                Cesium.Math.toDegrees(cartographicEnd.longitude),
                Cesium.Math.toDegrees(cartographicEnd.latitude)
              ]
            ),
            width: 10,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.2,
              taperPower: 0.5,
              color: Cesium.Color.CORNFLOWERBLUE,
            }),
          }
        });
        const lengthLabel = that.tigerViewer.entities.add({
          position: midpoint,
          label: {
            text: '距离为：' + distance + 'M',
            font: "24px Helvetica",
            fillColor: Cesium.Color.RED,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            showBackground: true
          },
        })
      } else {
        start = position;
        end = undefined;
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }
  tigerAreaMeasure(){
    alert('小虎面积测量')
  }
  tigerRemoveAll(){
    this.tigerViewer.entities.removeAll()
  }

  /*
  * 3.切换底图
  * changeImageProvider：切换底图
  * */
  changeImageProvider(concreteProvider: any){
    alert(111)
  }

  /*
  * 4.定位查找
  * tigerIdLocate：ID定位
  * tigerTypeLocate：类型定位
  * */
  tigerIdLocate(){
    alert('小虎ID定位')
  }
  tigerTypeLocate(){
    alert('小虎类型定位')
  }

  /*
  * 5.路径导航
  * customPathNavi： 路径导航
  * */
  customPathNavi(){
    alert('自定义导航')
  }

  /*
  * 6.图表分析
  * tigerChartsAnalyse：图表分析
  * */
  tigerChartsAnalyse(){
    alert('小虎图表分析')
  }

  /*
  * 7.城市管理
  * tigerCustomShader：科技感
  * visualFieldAna：可视域分析
  * modelSection：模型剖切
  * */
  tigerCustomShader(tileModel:any){
    tileModel.style = new Cesium.Cesium3DTileStyle({
      color: {
        conditions: [['true', "color('rgb(51, 153, 255)',1)"]]
      }
    })
    tileModel.customShader = new Cesium.CustomShader({
      lightingModel: Cesium.LightingModel.UNLIT,
      fragmentShaderText: `
                    void fragmentMain(FragmentInput fsInput, inout czm_modelMaterial material) {
                        float _baseHeight = 0.0; // 物体的基础高度，需要修改成一个合适的建筑基础高度
                        float _heightRange = 60.0; // 高亮的范围(_baseHeight ~ _baseHeight + _      heightRange) 默认是 0-60米
                        float _glowRange = 300.0; // 光环的移动范围(高度)
                        float vtxf_height = fsInput.attributes.positionMC.z-_baseHeight;
                        float vtxf_a11 = fract(czm_frameNumber / 120.0) * 3.14159265 * 2.0;
                        float vtxf_a12 = vtxf_height / _heightRange + sin(vtxf_a11) * 0.1;
                        material.diffuse*= vec3(vtxf_a12, vtxf_a12, vtxf_a12);
                        float vtxf_a13 = fract(czm_frameNumber / 360.0);
                        float vtxf_h = clamp(vtxf_height / _glowRange, 0.0, 1.0);
                        vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
                        float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
                        material.diffuse += material.diffuse * (1.0 - vtxf_diff);
                    }
                    `
    })
  }
  visualFieldAna(){
    alert('可视域分析')
  }
  modelSection(){
    alert('模型剖切')
  }

  /*
  * 8.粒子系统
  * flameSimulation：火焰粒子
  * customParticles：自定义粒子源
  * */
  flameSimulation(){
    alert('火焰粒子')
  }
  customParticles(){
    alert('自定义粒子源')
  }

  /*
  * 9.灾情模拟
  *
  * */
  waterRipple(){
    alert('水位上涨')
  }
  floodSimulation(){
    alert('水面波纹')
  }
}

```

### 5、Home.vue

```vue
<template>
  <div class="all">
    <div class="cesiumArea" id="sceneViewer"></div>
    <div class="functionMain">
      <OperateCesiumMenu></OperateCesiumMenu>
    </div>
    <div class="functionContain">
      <OperateCesiumPara></OperateCesiumPara>
    </div>
  </div>
</template>

<script>
import 'cesium/Build/Cesium/Widgets/widgets.css';
import * as Cesium from 'cesium/Build/Cesium';
import CesiumMap from "@/assets/cesiumConfig/CesiumConfig.ts";

import OperateCesiumMenu from "@/components/operateCesiumMenu/OperateCesiumMenu.vue";
import OperateCesiumPara from "@/components/operateCesiumPara/OperateCesiumPara.vue";

import useStore from "@/store/index.ts";
import {onMounted} from "vue";

export default {
  name: "Home",
  components:{
    OperateCesiumMenu,
    OperateCesiumPara
  },
  setup(){
    const { CesiumInstance } = useStore()
    onMounted(() => {
      /*
      * 初始store的cesiumObj为空
      * 没有情况下，创建新的cesiumObj对象
      * 初始化
      * */
      if(!CesiumInstance.cesiumObj){
        CesiumInstance.setCesiumObj(new CesiumMap())
        CesiumInstance.cesiumObj.init('sceneViewer')
      }
    })
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.all{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  .cesiumArea{
    width: 100%;
    height: 100%;
  }
  .functionMain{
    position: absolute;
    top: 0;
    left: 0;
  }
  .functionContain{
    position: absolute;
    top: 0;
    right: 0;
    width: 15%;
    height: 100%;
  }
}
</style>

```

### 6、OperateCesiumMenu.vue

```vue
<template>
  <div class="all">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">折叠</el-radio-button>
    </el-radio-group>
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" @open="changeDisplayCondition" @close="initDispaly">
      <el-sub-menu v-for="item in elSlotContent" :index="item.index">
        <template #title>
          <ElSlot :msg="item.iconType"></ElSlot>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="site in item.item" :index="site.index" @click="slotFunction(site.index)">{{site.text}}</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import {ref} from 'vue'
import { slotContent } from '@/components/elSlot/ElSlot.ts'
import useStore from "@/store/index.ts";
import ElSlot from "@/components/elSlot/ElSlot.vue";
import OperateCesiumMenu from "@/components/operateCesiumMenu/OperateCesiumMenu.ts";

export default {
  name: "OperateCesiumMenu",
  components:{
    ElSlot
  },
  setup(){
    const elSlotContent = ref(slotContent)
    const isCollapse = ref(true)
    const { CesiumInstance } = useStore()
    function changeDisplayCondition(key){
      CesiumInstance.displayCondition = key;
    }
    function initDispaly(){
      CesiumInstance.displayCondition = ''
    }
    function slotFunction(value){
      switch (value){
        case 'flyto':
          OperateCesiumMenu.flyto()
          break
        case 'removeModel':
          OperateCesiumMenu.removeModel()
          break
        case 'getPoi':
          OperateCesiumMenu.getPoi()
          break
        case 'lengthMeasure':
          OperateCesiumMenu.lengthMeasure()
          break
        case 'areaMeasure':
          OperateCesiumMenu.areaMeasure(value)
          break
        case 'biying':
          OperateCesiumMenu.changeProvider(value)
          break
        case 'arcgis':
          OperateCesiumMenu.changeProvider(value)
          break
        case 'tianditu':
          OperateCesiumMenu.changeProvider(value)
          break
        case 'tiandituimagery':
          OperateCesiumMenu.changeProvider(value)
          break
        case 'IDlocate':
          OperateCesiumMenu.IDlocate(value)
          break
        case 'typeLocate':
          OperateCesiumMenu.typeLocate(value)
          break
        case 'createPath':
          OperateCesiumMenu.createPath(value)
          break
        case 'histogram':
          OperateCesiumMenu.chartsAnaly(value)
          break
        case 'pieChart':
          OperateCesiumMenu.chartsAnaly(value)
          break
        case 'thermodynamics':
          OperateCesiumMenu.chartsAnaly(value)
          break
        case 'metroRoute':
          OperateCesiumMenu.chartsAnaly(value)
          break
        case 'techSense':
          OperateCesiumMenu.techSense()
          break
        case 'visualFieldAna':
          OperateCesiumMenu.visualFieldAna(value)
          break
        case 'modelSection':
          OperateCesiumMenu.modelSection(value)
          break
        case 'flameSimulation':
          OperateCesiumMenu.flameSimulation(value)
          break
        case 'customParticles':
          OperateCesiumMenu.customParticles(value)
          break
        case 'waterRipple':
          OperateCesiumMenu.waterRipple(value)
          break
        case 'floodsimulation':
          OperateCesiumMenu.floodsimulation(value)
          break
      }
    }
    return {
      isCollapse,
      elSlotContent,
      changeDisplayCondition,
      initDispaly,
      slotFunction,
    }
  }
}
</script>

<style scoped lang="scss">
.all{
  width: 100%;
  height: 100%;
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>

```

### 7、OperateCesiumMenu.ts

```typescript
// @ts-ignore
import * as Cesium from 'cesium/Build/Cesium';
import useStore from "@/store";
import { ElMessage } from 'element-plus'
let myTile: any
const { CesiumInstance } = useStore()

export default {
  /*
  * 1.模型管理
  * */
  flyto(){
  // const myTile = new Cesium.Cesium3DTileset({
  //   url: Cesium.IonResource.fromAssetId(1343233),
  // })
  myTile = new Cesium.Cesium3DTileset({
    url: Cesium.IonResource.fromAssetId(75343),
  })
  CesiumInstance.cesiumObj.addTileModel(myTile)
  CesiumInstance.cesiumObj.tigerflyTo(myTile)
  },
  removeModel(){
    CesiumInstance.cesiumObj.removeTileModel(myTile)
  },
  /*
  * 2.基本分析
  * */
  getPoi(){
  CesiumInstance.cesiumObj.getPoi()
  },
  lengthMeasure(){
    CesiumInstance.cesiumObj.tigerLengthMeasure()
  },
  areaMeasure(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  },
  /*
  * 3.切换底图
  * */
  changeProvider(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  },
  /*
  * 4.定位查找
  * */
  IDlocate(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  },
  typeLocate(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  },
  /*
  * 5.路径导航
  * */
  createPath(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  },
  /*
  * 6.图表分析
  * */
  chartsAnaly(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  },
  /*
  * 7.城市管理
  * */
  techSense(){
    CesiumInstance.cesiumObj.tigerCustomShader(myTile)
  },
  visualFieldAna(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  },
  modelSection(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  },
  /*
  * 8.粒子系统
  * */
  flameSimulation(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  },
  customParticles(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  },
  /*
  * 9.灾情模拟
  * */
  waterRipple(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  },
  floodsimulation(key:string){
    ElMessage({
      message: `click on item ${key}`,
      type: 'success',
    })
  }
}

```

### 8、OperateCesiumPara.vue

```vue
<template>
  <div class="all">
    <Transition name="slide-fade">
      <div class="modelManage" v-show="CesiumInstance.displayCondition === 'modelManage'">
        <el-button @click="showList" size="large">Json-server 测试按钮</el-button><span>{{data}}</span>
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div class="basicAnalyse" v-show="CesiumInstance.displayCondition === 'basicAnalyse'">
        <div class="mt-4">
          <el-input
            v-model="latitudeLon"
            placeholder="纬度坐标"
            class="input-with-select">
            <template #prepend>
              <el-select v-model="corUnit" placeholder="Select" style="width: 115px">
                <el-option label="地理经纬度" value="1" />
                <el-option label="角度经纬度" value="2" />
                <el-option label="弧度经纬度" value="3" />
              </el-select>
            </template>
          </el-input>
        </div>
        <div class="mt-4">
          <el-input
            v-model="latitudeLon"
            placeholder="经度坐标"
            class="input-with-select">
            <template #prepend>
              <el-select v-model="corUnit" placeholder="Select" style="width: 115px">
                <el-option label="地理经纬度" value="1" />
                <el-option label="角度经纬度" value="2" />
                <el-option label="弧度经纬度" value="3" />
              </el-select>
            </template>
          </el-input>
        </div>
        <el-dropdown size="large" split-button type="primary">切换单位
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="meter">米:m</el-dropdown-item>
              <el-dropdown-item command="km">千米：km</el-dropdown-item>
              <el-dropdown-item command="suqareMeter">平方米：m²</el-dropdown-item>
              <el-dropdown-item command="suqareKm">平方千米：km²</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <el-button @click="tigerRemoveAll" size="large">清除所有实体</el-button>
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div class="toggleMap" v-show="CesiumInstance.displayCondition === 'toggleMap'">
        切换底图
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div class="locateFind" v-show="CesiumInstance.displayCondition === 'locateFind'">
        <div>ID查找：<el-input style="display: inline" v-model="input1" placeholder="Please input" clearable size="large"/></div>
        <div>类型查找：<el-input style="display: inline" v-model="input1" placeholder="Please input" clearable size="large"/></div>
        <el-button @click="showList" size="large" type="success">路线查找</el-button><span>{{data}}</span>
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div class="navigation" v-show="CesiumInstance.displayCondition === 'navigation'">
        <div>
          起点：<el-input style="display: inline" v-model="input1" placeholder="Please input" clearable size="large"/>
        </div>
        <div>
          终点：<el-input style="display: inline" v-model="input2" placeholder="Please input" clearable size="large"/>
        </div>
        <el-button @click="showList" size="large" type="success">路线查找</el-button><span>{{data}}</span>
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div class="echartsAnalyse" v-show="CesiumInstance.displayCondition === 'echartsAnalyse'">
        图表分析
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div class="cityManage" v-show="CesiumInstance.displayCondition === 'cityManage'">
        城市管理
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div class="particleSystem" v-show="CesiumInstance.displayCondition === 'particleSystem'">
        粒子系统
      </div>
    </Transition>
    <Transition name="slide-fade">
      <div class="disasterSimulation" v-show="CesiumInstance.displayCondition === 'disasterSimulation'">
        灾情模拟
      </div>
    </Transition>
  </div>
</template>

<script>
import useStore from "@/store/index.ts";
import {reactive, ref} from "vue";
import SvgIcon from "@/components/svgIcon/SvgIcon.vue";

export default {
  name: "OperateCesiumPara",
  components:{
    SvgIcon
  },
  setup(){
    const CesiumInstance = useStore().CesiumInstance

    const data = reactive([])
    let latitudeLon = ref('')
    let corUnit = ref('')
    let input1, input2 = ref('')

    function tigerRemoveAll(){
      CesiumInstance.cesiumObj.tigerRemoveAll()
    }
    async function showList(){
      await CesiumInstance.getlist().then(function () {
        data.splice(0, data.length, ...CesiumInstance.list);
      })
    }
    return {
      data,
      CesiumInstance,
      latitudeLon,
      corUnit,
      input1, input2,
      showList,
      tigerRemoveAll
    }
  }
}
</script>

<style scoped lang="scss">
.all{
  width: 100%;
  height: 100%;
  .slide-fade-enter-active {
    transition: all 0.4s ease-out;
  }
  .slide-fade-leave-active {
    transition: all 0.4s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  .modelManage,.basicAnalyse,.toggleMap,.locateFind,.navigation,.echartsAnalyse,.cityManage,.particleSystem,.disasterSimulation{
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    div,button{
      margin-top: 20px;
    }
  }
}
</style>

```

相关效果图

![image-20230304143853304](sihuCesiumMap.assets/image-20230304143853304.png)

![image-20230304143943764](sihuCesiumMap.assets/image-20230304143943764.png)

继续完善中...
