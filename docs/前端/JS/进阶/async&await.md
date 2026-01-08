# async&await

> 简化使用基于promise 的 API 

## 一、描述

- async 可包含 0 个或者多个 [`await`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/await) 表达式。
  - 0个await ，同步执行
  - await 暂停整个 async 函数执行进程并出让控制权，等待内部promise结束
    - promise 的解决值被当作该 await 表达式的返回值。



- async 一定返回一个 promise 对象。如果看起来不是 promise，会被隐式包装 promise 

```typescript
async function foo() {
  return 1;
}

```

等价于：

```typescript
function foo() {
  return Promise.resolve(1);
}

```

- 多个 await 表达式都将加入链式调用的 then 回调中，`返回值为最后一个 then 回调的返回值`。



## 二、示例

##### 示例一

```typescript
function resolveAfter2Seconds() {
  console.log("starting slow promise");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("slow");
      console.log("slow promise is done");
    }, 2000);
  });
}

function resolveAfter1Second() {
  console.log("starting fast promise");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("fast");
      console.log("fast promise is done");
    }, 1000);
  });
}

async function sequentialStart() {
  console.log("==SEQUENTIAL START==");

  // 1. Execution gets here almost instantly
  const slow = await resolveAfter2Seconds();
  console.log(slow); // 2. this runs 2 seconds after 1.

  const fast = await resolveAfter1Second();
  console.log(fast); // 3. this runs 3 seconds after 1.
}

async function concurrentStart() {
  console.log("==CONCURRENT START with await==");
  const slow = resolveAfter2Seconds(); // starts timer immediately
  const fast = resolveAfter1Second(); // starts timer immediately

  // 1. Execution gets here almost instantly
  console.log(await slow); // 2. this runs 2 seconds after 1.
  console.log(await fast); // 3. this runs 2 seconds after 1., immediately after 2., since fast is already resolved
}

function concurrentPromise() {
  console.log("==CONCURRENT START with Promise.all==");
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(
    (messages) => {
      console.log(messages[0]); // slow
      console.log(messages[1]); // fast
    },
  );
}

async function parallel() {
  console.log("==PARALLEL with await Promise.all==");

  // Start 2 "jobs" in parallel and wait for both of them to complete
  await Promise.all([
    (async () => console.log(await resolveAfter2Seconds()))(),
    (async () => console.log(await resolveAfter1Second()))(),
  ]);
}

sequentialStart(); // after 2 seconds, logs "slow", then after 1 more second, "fast"

// wait above to finish
setTimeout(concurrentStart, 4000); // after 2 seconds, logs "slow" and then "fast"

// wait again
setTimeout(concurrentPromise, 7000); // same as concurrentStart

// wait again
setTimeout(parallel, 10000); // truly parallel: after 1 second, logs "fast", then after 1 more second, "slow"

//结果如下
==SEQUENTIAL START==
VM59:2 starting slow promise
VM59:6 slow promise is done
VM59:26 slow
VM59:12 starting fast promise
VM59:16 fast promise is done
VM59:29 fast
VM59:33 ==CONCURRENT START with await==
VM59:2 starting slow promise
VM59:12 starting fast promise
VM59:16 fast promise is done
VM59:6 slow promise is done
VM59:38 slow
VM59:39 fast
VM59:43 ==CONCURRENT START with Promise.all==
VM59:2 starting slow promise
VM59:12 starting fast promise
VM59:16 fast promise is done
VM59:6 slow promise is done
VM59:46 slow
VM59:47 fast
VM59:53 ==PARALLEL with await Promise.all==
VM59:2 starting slow promise
VM59:12 starting fast promise
VM59:16 fast promise is done
VM59:58 fast
VM59:6 slow promise is done
VM59:57 slow
```

##### await 和并行

在 `sequentialStart` 中，程序在第一个 `await` 停留了 2 秒，然后又在第二个 `await` 停留了 1 秒。直到第一个计时器结束后，第二个计时器才被创建。程序需要 3 秒执行完毕。

在 `concurrentStart` 中，两个计时器被同时创建，然后执行 `await`。这两个计时器同时运行，这意味着程序完成运行只需要 2 秒，而不是 3 秒，即最慢的计时器的时间。

但是 `await` 仍旧是顺序执行的，第二个 `await` 还是得等待第一个执行完。在这个例子中，这使得先运行结束的输出出现在最慢的输出之后。

如果你希望并行执行两个或更多的任务，你必须像在`parallel`中一样使用`await Promise.all([job1(), job2()])`。

