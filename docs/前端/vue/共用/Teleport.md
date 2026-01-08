# Teleport组件

> 内置组件，`用于将组件内容渲染到DOM中指定位置`，常用于弹出框。

## 示例

```vue
<template>
  <div>
    <button @click="showModal = true">打开模态框</button>

    <!-- 使用 teleport 将模态框内容传送到 body 标签的末尾 -->
    <teleport to="body">
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <p>这是一个模态框</p>
          <button @click="showModal = false">关闭</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const showModal = ref(false);

    return {
      showModal,
    };
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
</style>
```

