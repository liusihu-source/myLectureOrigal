# This

> https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this
>

## 全局上下文

```typescript
// 在浏览器中，window 对象同时也是全局对象：
console.log(this === window); // true

a = 37;
console.log(window.a); // 37

this.b = "MDN";
console.log(window.b); // "MDN"
console.log(b); // "MDN"

```

## 函数上下文

用call 或 apply

不在严格模式下，  `this` 的值默认指向全局对象，浏览器中就是 [`window`](https://developer.mozilla.org/zh-CN/docs/Web/API/Window)。

```typescript
function f1() {
  return this;
}
//在浏览器中：
f1() === window; //在浏览器中，全局对象是 window

//在 Node 中：
f1() === globalThis;

```

然而，在严格模式下，如果进入执行环境时没有设置 `this` 的值，`this` 会保持为 `undefined`，如下：

```typescript
function f2() {
  "use strict"; // 这里是严格模式
  return this;
}

f2() === undefined; // true

```

```typescript
// 对象可以作为 bind 或 apply 的第一个参数传递，并且该参数将绑定到该对象。
var obj = { a: "Custom" };

// 声明一个变量，并将该变量作为全局对象 window 的属性。
var a = "Global";

function whatsThis() {
  return this.a; // this 的值取决于函数被调用的方式
}

whatsThis(); // 'Global' 因为在这个函数中 this 没有被设定，所以它默认为 全局/ window 对象
whatsThis.call(obj); // 'Custom' 因为函数中的 this 被设置为 obj
whatsThis.apply(obj); // 'Custom' 因为函数中的 this 被设置为 obj

```



## 类上下文

指向实例对象

```typescript
let that = this
class Example {
  constructor() {
    const proto = Object.getPrototypeOf(this);
    console.log(Object.getOwnPropertyNames(proto)); //Array ["constructor", "first", "second"]
  }
  first(){console.log(this === that)}
  second(){console.log(this.first)}
  static third(){}
}

new Example().first(); // false
new Example().second(); //first(){console.log(this === that)}
```

## 箭头函数

```typescript
// 创建一个含有 bar 方法的 obj 对象，
// bar 返回一个函数，这个函数返回 this，
// 这个返回的函数是以箭头函数创建的，
// 所以它的 this 被永久绑定到了它外层函数的 this。
var obj = {
  bar: function () {
    var x = () => this;
    return x;
  },
};

var fn = obj.bar();
console.log(fn() === obj); // true

//----------------------------------------------------------
// 但如果只是引用 obj 的方法，this 指向 window
var fn2 = obj.bar;
console.log(fn2()() == window); // true
```



认清自己题

```javascript
var name = 'window'
const obj1 = {
    name: 'obj1',
    intro1: function (){
        console.log(this.name)
        return () => {
            console.log(this.name)
        }
    },
    intro2: () => {
        console.log(this.name)
        return function (){
            console.log(this.name)
        }
    }
}
const obj2 = {
    name: 'obj2'
}
obj1.intro1.call(obj2)()  //obj2 obj2
obj1.intro1().call(obj2)  //obj1 obj1
obj1.intro2.call(obj2)()  //window window
obj1.intro2().call(obj2)  //window obj2
```

```
intro1.call(obj2)()
│
├── [intro1 this] → 通过call强制绑定为obj2
│   │
│   └── [箭头函数 this] → 继承自intro1的this → obj2
│
└── 调用箭头函数时this保持不变 → obj2

obj1.intro1().call(obj2)
│
├── [intro1 this] → 隐式绑定为obj1
│   │
│   └── [箭头函数 this] → 继承自intro1的this → obj1
│       │
│       └── call(obj2)尝试修改失败 → 保持obj1
│
└── 调用箭头函数时this保持不变 → obj1
```

1. **箭头函数 `this` 的固化时机**：
   - 在函数**声明/创建时**确定（而非调用时）
   - 继承自外层普通函数的 `this`（或全局对象如果没有外层普通函数）
2. **不可变性**：
   - 一旦箭头函数的 `this` 确定后，无法通过 `call`/`apply`/`bind` 改变
   - 这是与普通函数最本质的区别
3. **链式调用中的表现**：
   - 箭头函数的 `this` 取决于它**直接外层普通函数**的 `this`
   - 如果外层也是箭头函数，则会继续向上查找直到普通函数或全局

