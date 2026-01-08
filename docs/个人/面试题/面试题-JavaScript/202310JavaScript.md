# JavaScript面试题

## 1、JavaScript 有哪些垃圾回收机制

1. **标记-清除（Mark and Sweep）**：这是JavaScript最常见的垃圾回收算法。它通过标记不再使用的对象，然后清除（删除）它们来工作。算法有两个阶段：标记阶段，其中标记不再需要的对象，以及清除阶段，在此阶段清除已标记的对象。这是JavaScript中最常用的垃圾回收机制。
2. **引用计数（Reference Counting）**:warning: ：虽然不常见，但某些JavaScript引擎仍然使用引用计数。该算法会跟踪对象的引用次数，一旦引用次数为零，对象就被认为是不再需要的，并被回收。但这种方法有缺点，无法正确处理循环引用，因此在现代JavaScript引擎中并不常见。



## 2、列举几种常见类型的DOM节点

- 文档节点：整个文档是一个文档节点
- 元素节点：每个html标签是一个元素节点
- 属性节点：每个html元素中的属性是一个属性节点
- 文本节点：每个html元素中的文本时文本节点



## 3、script 标签中的defer 和 async区别

1. **`defer` 属性**：
   - `defer` 属性表示脚本将被推迟执行，直到文档完全解析为止，但在 `DOMContentLoaded` 事件之前执行。这意味着脚本不会阻塞文档的解析，允许文档的内容在加载脚本的同时继续渲染。
   - 多个带有 `defer` 属性的脚本将按它们在文档中出现的顺序依次执行。
   - 适合用于需要在文档加载完成前不立即执行的脚本，例如初始化应用程序的代码。

```typescript
<script src="your-script.js" defer></script>
```

1. **`async` 属性**：
   - `async` 属性表示脚本是异步加载的，不会阻塞文档的解析。脚本会在下载完毕后尽快执行，而不考虑文档的解析状态。
   - 多个带有 `async` 属性的脚本无法保证执行顺序，它们将在下载完成后立即执行。
   - 适合用于无需等待其他脚本或文档解析的脚本，例如跟踪分析代码。

```typescript
<script src="your-script.js" async></script>
```



## 4、介绍javascript 中的 call（） 和 apply()方法

`call()` 和 `apply()` 是 JavaScript 中用于调用函数的方法，它们允许你显式设置函数的 `this` 值，并传递参数。它们的主要区别在于参数的传递方式。

- call案例

```typescript
const person = {
  firstName: 'John',
  lastName: 'Doe',
};

function greet(greeting) {
  console.log(`${greeting}, ${this.firstName} ${this.lastName}`);
}

greet.call(person, 'Hello'); // 输出: Hello, John Doe

```

- apply案例

```typescript
function add(a, b) {
  return a + b;
}

const args = [2, 3];
const result = add.apply(null, args); // 传递参数数组
console.log(result); // 输出: 5
```

