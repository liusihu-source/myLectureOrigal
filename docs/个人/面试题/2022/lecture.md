# 前端面试题

## 2022.12.28

### 1.nextTick

- vue异步更新DOM
    - created初始化data，挂载到Vue实例前； mounted挂载后
- 如果需要在更新DOM后即刻获得data数据值，需要使用nextTikc()
    - 更改组件的data值，Vue不会立即更新，先将该操作放入队列，等待同一事件的数据都变化完成后，将队列内的事件再处理
    - 目的：提升性能，等异步操作都更改完成后，统一刷新DOM

不使用nextTick

```javascript
new Vue({
	el: '#app',
	data: function(){
		return {
			msg: ''
		}
	},
	mounted(){
		this.msg = '测试文字'
		console.log(msg)   //此时会打印空值
	}
})
```

使用nextTick
不使用nextTick

```javascript
new Vue({
	el: '#app',
	data: function(){
		return {
			msg: ''
		}
	},
	mounted(){
		this.msg = '测试文字'
		console.log(msg)   //此时会打印空值
		this.$nextTick( () => {
			consolo.log(msg)  //会打印测试文字
		})
	}
})
```

### 2.改变数组并且会被vue监听到的方法

push()在末尾添加一个
pop()在末尾删除一个
shift()头部删除
unshift()头部添加
splice()删除，插入，替换
sort()排序
reverse() 颠倒原来顺序

## 2022.12.29

### 1.activated & deactvated

当组件使用keep-alive时，进入组件 和 离开组件会触发的两个函数

## 2022.12.30

### 1.vue-lazyload

- 该指令可实现图片的懒加载
- key属性可有可无，用于标识图片的id

```javascript
//安装
npm install vue-lazyload --save-dev
```

```typescript
//main.ts
import VueLazyLoad from  'vue-lazyload' 
Vue.use(VueLazyLoad,  { preLoad:  1, error:  		      	require('./assets/imgError.png'),  // 错误图片 loading:   require('./assets/imgLoading.png'),  // 加载中图片 attempt:  2,  
})
```

```vue
<template>  
  <div>  
   	<div id="lazyload">  	
   	  <div class="img">  
   	  	<div style="margin: 20px;" v-for="(item, index) in imgList"  :key="index">  
   	  	  <img v-lazy="item" alt="" style="width: 50px;"> </div>  
   	  	</div>
   	  </div>  
   </div>  
</template>  
<script>  
export  default  { 
	name:  'Lazyload', 
	components:  {}, 
	props:  {},  
	data()  { 
	  return  { 
	    imgList:[  
	      require('../assets/weatherIcon/W0.png'),
	      require('../assets/weatherIcon/W1.png'),
	      require('../assets/weatherIcon/W10.png')]  
	  }  
	}, 
	filters:  {},  
	mounted()  {},
	methods:  {}  
}  
</script>  
<style scoped lang="less"> 
	#lazyload { 
	background-color: #ccc; 
	margin:  0 auto;  
	.img { 
		background-color: #ccc;  
	} 
}  
</style>
```

## 2022.12.31

### 1.vue-router

- router
    - VueRouter的实例，一个全局对象
    - this.$router.push()、this.$router.replace、this.$router.go()
    - hash / history
        - hash 通过onhashchange监听
        - history通过history.pushState 和 history.replaceState
- route
    - 正在跳转的路由，一个局部对象，可以获取该路由的name、path、params和id等

### 2.父子组件创建销毁的生命周期

父beforecreate -> 父created -> 父beforemount -> 子beforecreate -> 子created -> 子beforemount -> 子mounted ->父mounted -> 父beforeDestroy -> 子berforeDestroy -> 子destroyed -> 父destroyed
