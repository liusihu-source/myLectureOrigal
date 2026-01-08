# Vue3Setup

## 使用方式

方式一：script标签直接添加setup

```typescript
<script setup lang="ts">

</script>
```

- template 和 setup中变量使用方式

  - | 类型         | `<template>` 中使用  | `<script setup>` 中使用 |
    | :----------- | :------------------- | :---------------------- |
    | **ref**      | 直接使用（自动解包） | 需要 `.value`           |
    | **reactive** | 直接使用             | 直接使用                |
    | **computed** | 直接使用（自动解包） | 需要 `.value`           |
    | **普通变量** | 直接使用             | 直接使用                |

  - ```vue
    <template>
      <div>
        <p>{{ state.count }}</p> <!-- 直接使用 state.count -->
        <button @click="increment">Increment</button>
      </div>
    </template>
    
    <script setup>
    import { reactive } from 'vue';
    const state = reactive({
      count: 0,
    });
    function increment() {
      state.count++; // 不需要 .value
    }
    </script>
    ```

    

- 组件名称不需要单独声明，外部直接引用文件名即可

  - 如需声明，可直接在script标签上声明即可，如下

    ```vue
    <script lang="ts" setup name="system-user">
    
    </script>
    ```



方式二：script 内部单独建立setup，略



文件全局搜索 + 文件中查找 => 定位文件

- 全局搜索：只会搜索文件名 `两次shift`
- 文件中查找：所有文件中查找指定代码 Alt + F
