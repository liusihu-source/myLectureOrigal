# computed

基于响应式数据 缓存计算结果，一般不需要传参

```javascript
<script setup>
import { ref, computed } from 'vue'
const price = ref(10)
const quantity = ref(2)
// 典型场景1：商品总价计算
const total = computed(() => price.value * quantity.value)  // 内部可写复杂逻辑
// 典型场景2：过滤列表(或者搜索栏)
const todos = ref([{ id: 1, text: '买菜', done: true }])
const activeTodos = computed(() => todos.value.filter(todo => !todo.done))
</script>
<template>
  <p>总价: {{ total }}</p>
  <p>未完成: {{ activeTodos.length }}</p>
</template>
```

