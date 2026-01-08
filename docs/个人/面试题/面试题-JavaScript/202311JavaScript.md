# JavaScript面试题

## 1、settimeout 异步

全局的 **`setTimeout()`** 方法设置一个定时器，一旦定时器到期，就会执行一个函数或指定的代码片段。

**语法**

```typescript
setTimeout(code)
setTimeout(code, delay)

setTimeout(functionRef)
setTimeout(functionRef, delay)
setTimeout(functionRef, delay, param1)
setTimeout(functionRef, delay, param1, param2)
setTimeout(functionRef, delay, param1, param2, /* … ,*/ paramN)

```



**参数**

[`functionRef`](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#functionref)

当定时器到期后，将要执行的 [`function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)。

[`code`](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#code)

这是一个可选语法，允许你包含在定时器到期后编译和执行的字符串而非函数。使用该语法是**不推荐的**，原因和使用 [`eval()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/eval) 一样，有安全风险。

[`delay`](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#delay) 可选

定时器在执行指定的函数或代码之前应该等待的时间，单位是毫秒。如果省略该参数，则使用值 0，意味着“立即”执行，或者更准确地说，在下一个事件循环执行。

注意，无论是哪种情况，实际延迟可能会比预期长一些，参见下方[延时比指定值更长的原因](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#延时比指定值更长的原因)一节的叙述。

还要注意的是，如果值不是数字，隐含的[类型强制转换](https://developer.mozilla.org/zh-CN/docs/Glossary/Type_coercion)会静默地对该值进行转换，使其成为一个数字——这可能导致意想不到的、令人惊讶的结果；见[非数字延迟值被静默地强制转化为数字](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#非数字延迟值被静默地强制转化为数字)以了解一个示例。

[`param1`](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#param1), …, `paramN` 可选

附加参数，一旦定时器到期，它们会作为参数传递给 `functionRef` 指定的函数。



**非数字延迟值被静默强转为数字**

如果调用 `setTimeout()` 的 [*delay*](https://developer.mozilla.org/zh-CN/docs/Web/API/setTimeout#delay) 值不是数字，隐含的[类型强制转换](https://developer.mozilla.org/zh-CN/docs/Glossary/Type_coercion)会静默地对该值进行转换，使其成为数字。例如，下面的代码在 *delay* 值中错误地使用了字符串 `"1000"`，而不是数字 `1000`——但它仍然有效，因为当代码运行时，字符串被强制转换成数字 `1000`，所以代码在 1 秒后执行。

```typescript
setTimeout(() => {
  console.log("延迟了 1 秒。");
}, "1000");

```

但在许多情况下，隐式类型强制转换会导致意想不到的、令人惊讶的结果。例如，当下面的代码运行时，字符串 `"1 秒"` 最终被强制转换为数字 `0`——因此，代码立即执行，没有延迟。

```typescript
setTimeout(() => {
  console.log("延迟了 1 秒。");
}, "1 秒");

```

**this**

由 `setTimeout()` 执行的代码是从一个独立于调用 `setTimeout` 的函数的执行环境中调用的。为被调用的函数设置 `this` 关键字的通常规则适用，如果你没有在调用中或用 `bind` 设置 `this`，它将默认为 `window`（或 `global`）对象。它将与调用 `setTimeout` 的函数的 `this` 值不一样。

```typescript
const myArray = ["zero", "one", "two"];
myArray.myMethod = function (sProperty) {
  console.log(arguments.length > 0 ? this[sProperty] : this);
};

myArray.myMethod(); // 输出 "zero,one,two"
myArray.myMethod(1); // 输出 "one"

```

上面这段代码正常工作，当调用 `myArray` 时，它的 `this` 设定为 `myArray`，故在函数中 `this[sProperty]` 与 `myArray[sProperty]` 等价。然而，在以下示例中：

```typescript
setTimeout(myArray.myMethod, 1.0 * 1000); // 在 1 秒后输出 "[object Window]"
setTimeout(myArray.myMethod, 1.5 * 1000, "1"); // 在 1.5 秒后输出 "undefined"

```

传递给 `setTimeout` 的是 `myArray.myMethod` 函数，当调用它的时候，`this` 没有指向，故其默认指向 `window` 对象。



## 2、null 和 undefined的区别是什么

> null是一个表示无的对象，转为数值时为0；undefined表示无的原始值，转为数值为NaN

null使用场景

- 表示尚未存在的对象，后续再赋值
- 作为对象原型链的终点

undefined使用场景

- 如果变量声明了，但没有赋值，则默认为undefined
- 调用函数时，如果没有提供需要的参数，该参数默认为undefined
- 当函数没有返回值时，默认返回undefined



## 3、给出JavaScript对象的几种创建方式及对应例子

- 字面量表示法

```typescript
var person = {
  name: 'John',
  age: 30,
  sayHello: function() {
    console.log('Hello!');
  }
};

```

- 构造函数

```typescript
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.sayHello = function() {
    console.log('Hello!');
  };
}

var person = new Person('John', 30);

```

- Object构造函数

```typescript
var person = new Object();
person.name = 'John';
person.age = 30;
person.sayHello = function() {
  console.log('Hello!');
};

```

- Object.create

```typescript
var person = Object.create(null);
person.name = 'John';
person.age = 30;
person.sayHello = function() {
  console.log('Hello!');
};

```

- 工厂函数

```typescript
function createPerson(name, age) {
  return {
    name: name,
    age: age,
    sayHello: function() {
      console.log('Hello!');
    }
  };
}

var person = createPerson('John', 30);

```

- ES6的class

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log('Hello!');
  }
}

var person = new Person('John', 30);

```

