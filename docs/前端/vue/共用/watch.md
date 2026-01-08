# Watch

用来监听单一数据，仅在数据发生变化时候才执行

- data内部的数据
- 父组件传来props中的数据
- 监听路由router

```javascript
//语法
watch: {
    key1: function(newVal, oldVal) {
        console.log(newVal, oldVal)
    },
    key2:{
        handler: function(newVal, oldVal) {
            console.log(newVal, oldVal)
        },
        deep: true  //深度监听，用于当监听变量是一个对象时候使用
    }
}
```

## Vue2 demo

```vue
<template>
  <div class="parent">
    {{msg}}
    <div>
    	<input type="text" v-model="obj1.user">
    </div>
  </div>
</template>

<script>

export default {
  name: 'parent',
  data() {
    return {
      msg: 'hello!',
      obj1: {
          user: '小虎'
      }
    }
  },
  methods: {
  },
  watch: {
      msg: function (newVal, oldVal) {
          console.log(newVal, oldVal)
      },
      obj1: {
          handler: function(newVal, oldVal) {
            console.log(newVal, oldVal)
        },
        deep: true  //深度监听，用于当监听变量是一个对象时候使用
      },
      '$router.path'(newVal, oldVal) {
          console.log(newVal, oldVal)  //可用于监听路由
      },
      '$store.state.data.age'(newVal,oldVal){
          //对数据执行操作
          console.log(newVal,oldVal)
      }
  }
}
</script>
```

## Vue3 Demo

```vue
<script setup>
import { ref, watch, watchEffect, watchPostEffect, watchSyncEffect } from 'vue'

// 1. 监听单个 ref
const count = ref(0)
watch(count, (newVal, oldVal) => {
  console.log('count变化:', oldVal, '→', newVal)
})

// 2. 监听多个源（其中一个变化就会触发）
const x = ref(0)
const y = ref(0)
watch([x, y], ([newX, newY], [oldX, oldY]) => {
  console.log(`x: ${oldX}→${newX}, y: ${oldY}→${newY}`)
})

// 3. 深度监听对象
const user = ref({ 
  profile: { 
    name: 'Alice',
    details: { age: 30 }
  }
})
watch(
  user,
  (newVal) => {
    console.log('user深度变化:', newVal)
  },
  { deep: true }
)

// 4. 立即执行（组件挂载立即执行）
const immediateData = ref('initial')
watch(
  immediateData,
  (newVal) => {
    console.log('立即执行，当前值:', newVal)
  },
  { immediate: true }
)

// 5. 监听 reactive 对象
import { reactive, toRefs } from 'vue'
const obj = reactive({ foo: 'bar', baz: 'qux' })
watch(
  () => obj.foo,
  (newVal) => {
    console.log('obj.foo变化:', newVal)
  }
)

// 6. 监听 props
const props = defineProps(['message'])
watch(
  () => props.message,
  (newVal) => {
    console.log('props.message变化:', newVal)
  }
)
    
</script>

<template>
  <div id="app">
    <button @click="count++">增加计数: {{ count }}</button>
    <button @click="x++">x: {{ x }}</button>
    <button @click="user.profile.details.age++">年龄: {{ user.profile.details.age }}</button>
    <input v-model="searchQuery" placeholder="搜索..." />
  </div>
</template>
```

:bulb: 监听语法的区别

```javascript
// 直接监听 ref 变量
watch(count, callback)  // 直接传递 ref
// 等价于：
watch(() => count.value, callback)

// 监听 reactive 对象的属性
watch(() => obj.foo, callback)  // 需要使用 getter 函数
// 不能直接写：
watch(obj.foo, callback)  // ❌ 错误，obj.foo 不是响应式引用

// 监听整个 reactive 对象
watch(obj, callback, { deep: true })  // 可以直接传递 reactive
```

