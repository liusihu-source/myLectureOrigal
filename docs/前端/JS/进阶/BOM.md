# BOM基础

> Browser Object Model（浏览器对象模型）

## 一、window对象

### 窗口关系

#### 基本概念

```typescript
windows.top; // 指向浏览器顶层窗口
windows.parent; // 当前窗口的父窗口, 若无窗口即 windows.top
windows.self; // windows 本身
```

#### 窗口位置

```typescript
windows.screenLeft; // 窗口左侧位置的像素值
windows.screenTop; // 窗口顶部位置的像素值
```

#### 移动窗口

```typescript
// 将窗口移动至 (x, y) 对应的绝对位置
window.moveTo(0, 50); // 0, 50
// 把窗口相对移动 (x, y)
window.moveBy(0, 100); // 0, 150
```

#### 像素比

```typescript
// 物理像素: 屏幕实际分辨率
// 逻辑像素: 浏览器转换后的虚拟分辨率
// 表示物理像素和逻辑像素的比值, 与 DPI 对应
window.devicePixelRatio;
```

### 窗口大小

#### 默认窗口大小

```javascript
// 浏览器窗口大小
let pageWidth = window.outerWidth;
let pageHeight = window.outerHeight;
// 浏览器窗口中页面视口大小
let pageWidth = window.innerWidth;
let pageHeight = window.innerHeight;
```

```javascript
// 精准获得页面视口大小
let pageWidth = window.innerWidth,
  pageHeight = window.innerHeight;
// 未获取成功
if (typeof pageWidth != "number") {
  // 判断页面是否为标准模式, 通过 document.documentElement 获取大小
  if (document.compatMode == "CSS1Compat") {
    pageWidth = document.documentElement.clientWidth;
    pageHeight = document.documentElement.clientHeight;
  } // 否则通过 document.body 获取大小
  else {
    pageWidth = document.body.clientWidth;
    pageHeight = document.body.clientHeight;
  }
}
```

#### 调整窗口大小

```javascript
// 缩放至 (w, h)
window.resizeTo(100, 100); // 100 * 100
// (w, h) + (w, h)
window.resizeBy(100, 50); // 200 * 150
```

### 视口位置

#### 视口位置

```javascript
// 相对于页面视口的位置
window.scrollX; // x 相对位置
window.scrollY; // y 相对位置
```

#### 滚动视口

```javascript
// 相对于当前视口向下滚动 100 像素
window.scrollBy(0, 100);
// 相对于当前视口向右滚动 40 像素
window.scrollBy(40, 0);
// 滚动到页面左上角
window.scrollTo(0, 0);
// 平滑滚动
window.scrollTo({
  left: 100,
  top: 100,
  behavior: "smooth",
});
```

### 元素

| 属性              | 含义      | 包含范围                                 | 单位      |
| --------------- | ------- | ------------------------------------ | ------- |
| **clientWidth** | 可视区域宽度  | 内容区 + 左右内边距✅ 不含边框、滚动条、溢出内容           | 数字 (px) |
| **offsetWidth** | 元素占位总宽度 | 内容区 + 左右内边距 + 左右边框 + 垂直滚动条✅ 完整占位宽度   | 数字 (px) |
| **scrollWidth** | 实际内容总宽度 | 内容区 + 左右内边距 + 溢出隐藏的内容宽度✅ 不含边框，包含溢出内容 | 数字 (px) |

获取元素**相对于浏览器可视窗口（视口）** 的位置，用 `getBoundingClientRect()`：

- `rect.top`：元素上边缘 到 视口顶部的距离
- `rect.left`：元素左边缘 到 视口左侧的距离
- `rect.bottom`：元素下边缘 到 视口顶部的距离
- `rect.right`：元素右边缘 到 视口左侧的距离



### 系统对话框

```javascript
// console.log() 为警告框
// confirm() 为确认框, 点击确认返回 true, 反之返回 false
if (window.confirm("Are you sure?")) {
  console.log("I'm so glad you're sure!");
} else {
  console.log("I'm sorry to hear you're not sure.");
}

// prompt() 为提示框, 第一个参数为显示文本, 第二个参数为输入默认值
// 点击确认返回输入值, 反之返回 null
let result = window.prompt("What is your name? ", "");
if (result !== null) {
  console.log("Welcome, " + result);
}
```

### 导航与打开新窗口

```javascript
// 打开至指定 url, 并指定在 topFrame 窗口页打开
window.open("http://liusihu-source.github.io/", "topFrame");
```

### global作用域

#### 机制

```typescript
// window 复用为 ECMAScript 的 Global 对象
// 任何 var 声明的变量和函数为其属性和方法
var age = 29;
var sayAge = () => console.log(this.age);
window.age; // 29
window.sayAge(); // 29
```

### 定时器

#### setTimeout()

- setTimeout(functionRef, delay, param1, param2, /\_ …, \_/ paramN);
  - 第一个参数表示回调函数, 第二个参数为等待时间;
  - 其余参数为传递给 fn 的函数参数;
- clearTimeout(timeoutId): 取消定时任务;

```typescript
let timeoutId = setTimeout(() => console.log("Hello world!"), 1000);
clearTimeout(timeoutId);
```

#### setInterval()

- setInterval(functionRef, delay, param1, param2, /\_ …, \_/ paramN);
  - 第一个参数表示回调函数, 第二个参数为循环时间;
  - 其余参数为传递给 fn 的函数参数;
- clearInterval(timeoutId): 取消循环任务;

```typescript
let timeoutId = setInterval(() => console.log("Hello world!"), 10000);
clearInterval(timeoutId);
```

#### setInterval() 的局限

- 两个任务之间的时间间隔无法保证;
- 有可能会跳过部分任务;

## 二、location 对象

### location 基础

#### 属性

```typescript
location.hash; // url 散列值
location.host; // 服务器名:端口名
location.hostname; // 服务器名
location.href; // 当前窗口的 url
location.pathname; // host 后的路径
location.port; // 端口名
location.protocol; // http/https
location.search; // url 查询字符串, 以 ? 开头
location.username; // 用户名
location.password; // 密码
location.origin; // url 源地址
```

### 查询字符串

```typescript
let qs = "?q=javascript&num=10";
// 创建 URLSearchParams
let searchParams = new URLSearchParams(qs);
console.log(searchParams.toString()); // " q=javascript&num=10"
// 是否存在对应参数
searchParams.has("num"); // true
// 获取对应参数
searchParams.get("num"); // 10
// 设置对应参数
searchParams.set("page", "3");
console.log(searchParams.toString()); // " q=javascript&num=10&page=3"
// 删除对应参数
searchParams.delete("q");
console.log(searchParams.toString()); // " num=10&page=3"
```

