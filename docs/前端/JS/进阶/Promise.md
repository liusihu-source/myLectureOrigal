# Promise

## 一、描述

- 一个 **`Promise`** 代表在创建 promise 时的未知值。
- 将处理程序与异步操作的最终成功值或失败原因关联起来。



### 状态

- *待定（pending）*：初始状态，既没有被兑现，也没有被拒绝。
- *已兑现（fulfilled）*：意味着操作成功完成。
- *已拒绝（rejected）*：意味着操作失败。



有*最终状态*后 Promise 的 `then` 方法串联的处理程序将被调用。

![流程图展示了 Promise 状态在 pending、fulfilled 和 rejected 之间如何通过 then() 和 catch() 处理程序进行转换。一个待定的 Promise 可以变成已兑现或已拒绝的状态。如果 Promise 已经兑现，则会执行“on fulfillment”处理程序（即 then() 方法的第一个参数），并继续执行进一步的异步操作。如果 Promise 被拒绝，则会执行错误处理程序，可以将其作为 then() 方法的第二个参数或 catch() 方法的唯一参数来传递。](Promise.assets/promises.png)



### 链式调用

- [`then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)、[`catch()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) 和 [`finally()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally) 实例方法将进一步的操作与已敲定的 Promise 相关联。这些方法返回 Promise，因此可被链式调用。

  - `then()` 方法最多接受两个参数；第一个Promise 兑现时的回调函数，第二个`可选` Promise 拒绝时的回调函数。

    ```javascript
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("foo");
      }, 300);
    });
    
    myPromise
      .then(handleFulfilledA, handleRejectedA)
      .then(handleFulfilledB, handleRejectedB)
      .then(handleFulfilledC, handleRejectedC);
    
    ```

  - 可使用`箭头函数`作为回调函数

    ```javascript
    myPromise
      .then((value) => `${value} and bar`)
      .then((value) => `${value} and bar again`)
      .then((value) => {
        console.log(value);
      })
      .catch((err) => {
        console.error(err);
      });
    ```

  - 链中已兑现的 Promise 的返回值会传递给下一个 `.then()`，而已拒绝的 Promise 会把失败原因传递给链中下一个拒绝处理函数。

- `.catch()` 其实就是一个没有为 Promise 兑现时的回调函数留出空位的 `.then()`。

```typescript
myPromise
  .then(handleFulfilledA)
  .then(handleFulfilledB)
  .then(handleFulfilledC)
  .catch(handleRejectedAny);

```

## 二、构造函数

[`Promise()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)

创建一个新的 `Promise` 对象。该构造函数主要用于封装还没有添加 promise 支持的函数。



## 三、静态方法

[`Promise.all()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

- 参数 Promise可迭代对象
- 返回单个Promise
  - 所有都兑现，Promise结果为对象
  - 有一个拒绝，返回该拒绝值



[`Promise.allSettled()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

- 参数 Promise可迭代对象
- 返回单个Promise
  - 所有都敲定，值为所有promise对象数组的Promise



[`Promise.any()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

- 参数 Promise可迭代对象
- 返回单个Promise
  - 第一个被兑现的Promise值
  - 都拒绝时返回带有拒绝原因的数组



[`Promise.race()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

- 参数 Promise可迭代对象
- 返回单个Promise
  - 第一个被敲定的Promise



[`Promise.reject()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

返回一个新的 `Promise` 对象，该对象以给定的原因拒绝。



[`Promise.resolve()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

返回一个新的 `Promise` 对象，该对象以给定的值兑现。



## 四、实例方法

[`Promise.prototype.catch()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

- 参数为函数

一个在此 Promise 对象被拒绝时异步执行的函数。它的返回值将成为 `catch()` 返回的 Promise 对象的兑现值。



[`Promise.prototype.finally()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

- 参数为函数

一个当 promise 敲定时异步执行的函数。返回值将被忽略，除非返回一个被拒绝的 promise。



[`Promise.prototype.then()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

- 参数为两个函数 then(onFulfilled, onRejected)

将一个兑现处理器和拒绝处理器附加到 Promise 上，并返回一个新的 Promise



## 五、示例

基础示例

```typescript
const myFirstPromise = new Promise((resolve, reject) => {
  // 当异步操作成功时，我们调用 resolve(...)，当其失败时，调用 reject(...)。
  // 在这个例子中，我们使用 setTimeout(...) 来模拟异步代码。
  // 在实际情况中，你可能会使用类似 XHR 或 HTML API 等。
  setTimeout(() => {
    resolve("成功！"); // 耶！一切顺利！
  }, 250);
});

myFirstPromise.then((successMessage) => {
  // successMessage 是我们在上面的 resolve(...) 函数中传入的任何内容。
  // 它不一定是字符串，但如果它只是一个成功的消息，那么它大概率是字符串。
  console.log(`耶！${successMessage}`);
});

```

```typescript
// 为了尝试错误处理，使用“阈值”值会随机地引发错误。
const THRESHOLD_A = 8; // 可以使用 0 使错误必现

function tetheredGetNumber(resolve, reject) {
  setTimeout(() => {
    const randomInt = Date.now();
    const value = randomInt % 10;
    if (value < THRESHOLD_A) {
      resolve(value);
    } else {
      reject(`太大了：${value}`);
    }
  }, 500);
}

function determineParity(value) {
  const isOdd = value % 2 === 1;
  return { value, isOdd };
}

function troubleWithGetNumber(reason) {
  const err = new Error("获取数据时遇到问题", { cause: reason });
  console.error(err);
  throw err;
}

function promiseGetWord(parityInfo) {
  return new Promise((resolve, reject) => {
    const { value, isOdd } = parityInfo;
    if (value >= THRESHOLD_A - 1) {
      reject(`还是太大了：${value}`);
    } else {
      parityInfo.wordEvenOdd = isOdd ? "奇数" : "偶数";
      resolve(parityInfo);
    }
  });
}

new Promise(tetheredGetNumber)
  .then(determineParity, troubleWithGetNumber)
  .then(promiseGetWord)
  .then((info) => {
    console.log(`得到了：${info.value}, ${info.wordEvenOdd}`);
    return info;
  })
  .catch((reason) => {
    if (reason.cause) {
      console.error("已经在前面处理过错误了");
    } else {
      console.error(`运行 promiseGetWord() 时遇到问题：${reason}`);
    }
  })
  .finally((info) => console.log("所有回调都完成了"));

```





