# VNode及Diff

> https://vue3js.cn/interview/vue/vnode.html#%E4%B8%80%E3%80%81%E4%BB%80%E4%B9%88%E6%98%AF%E8%99%9A%E6%8B%9Fdom

## VNode

概念：真实DOM的抽象

作用：利用diff算法 减少 JS操作真实DOM带来的性能消耗、 跨平台(安卓 IOS)表示

构成：表现为一个JS Object对象，至少包含tag标签名、attrs属性和children子元素对象属性

`src/core/vdom/vnode.js`



## Diff算法

概念：同层树节点进行比较的高效算法

特点：从`两边向中间比较`、且只会在`同层级`进行比较

作用：新旧VNode节点比较