# nextTick

## 概念

官方定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM

简化理解：`DOM页面更新后，再执行nextTick内部的回调函数`

也是一种优化策略，防止如for循环这样每执行一次就调用一次，有了nexttick只需要调用一次



## 使用场景

修改数据后里的得到更新后的DOM结构。在组件内使用this.$nextTick()，this自动绑定到当前vue实例

```javascript
this.message = '修改后的值'
console.log(this.$el.textContent) // => '原始的值'
this.$nextTick(function () {
    console.log(this.$el.textContent) // => '页面更新后，在执行这里得到修改后的值'
})
```

