# JS基础 

> 语法来源 Java 和 C，这两种语言的语法特性同样适用 JavaScript

## 一、数据类型

- [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)（数字）
- [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)（字符串）
- [`Boolean`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)（布尔）
- [`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)（符号）（ES2015 新增）
- `BigInt`
- [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null)（空）
- [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)（未定义）

一个复杂数据类型

- `Object`（对象）
  - [`Function`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)（函数）
  - [`Array`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)（数组）
  - [`Date`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)（日期）
  - [`RegExp`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)（正则表达式）



### 1.1 undefined（原子）

- 表示变量声明, 但未初始化的状态;

```
// typeof 对无声明和未初始化的变量 返回 undefined
let message;
console.log(typeof message); // "undefined"
console.log(typeof age); // "undefined"
```

### 1.2  Null（原子）

- 表示没有值;
- 通常用于初始化对象, 表示一个空的对象;

:bulb: typeof null返回 "object"是历史遗留 bug

### 1.3 Boolean（原子）

- true + false;

#### 布尔类型与数字的关系

- true 不等于 1;
- false 不等于 0;
- 两者通过 Number() 可转换为 1 和 0;

#### 任意类型的布尔值

- 任意类型都具有布尔值;
- 可通过 Boolean() 函数转换;

| 数据类型  | 真值           | 假值      |
| --------- | -------------- | --------- |
| Boolean   | true           | false     |
| String    | 任何非空字符串 | 空字符串  |
| Number    | 任何非 0 数字  | 0, NaN    |
| Object    | 任意对象       | null      |
| Undefined | n/a            | undefined |

### 1.4 Number（原子）

#### 格式

- 使用 IEEE–754 表示整数和浮点数;
- 64 位双浮点数精度;

#### 进制

```typescript
// 十进制
let intNum = 55; // integer
// 二进制
let bNum = 0b10;
// 八进制
let octalNum = 070; // octal for 56
// 十六进制
let hexNum = 0xa;
```

#### 浮点数

##### 语法格式

```typescript
let floatNum1 = 1.1;
```

###### float 到 int 的隐式转换

```typescript
// 若小数点后无数字或为 0, 将其转换为 int
let floatNum1 = 1; // 等效于 int 1
let floatNum2 = 10.0; // 等效于 int 10
```



##### 科学计数法

```typescript
let floatNum = 3.125e7; // equal to 31250000
let floatNum = 3e-7; // equal to 0.0000003
```

:bulb:浮点数有精度损失

```typescript
// 不要用于 if 语句中测试具体值
let a = 0.1 + 0.2; // equal to   0.30000000000000004
```



#### 数字的范围

- Number.MIN_VALUE: 5e–324;
- Number.MAX_VALUE: 1.7976931348623157e+308;
- 若计算范围超过 JavaScript 范围, 结果为 Infinity/-Infinity;



#### 整数和浮点数的内存耗费

- 存储在栈上, 耗费 8 字节

#### NaN

- 表明无效值;
- NaN 与任何值计算结果皆为 NaN;
- NaN 不等于任何值, 包括 NaN;
- 只能通过 isNaN() 方法判断是否为 NaN, 其余方法一直为 false;

```typescript
console.log(typeof NaN); // 输出 "number"
let x = NaN;
console.log(x == NaN); // 输出 "false"
console.log(x === NaN); // 输出 "false"
console.log(isNaN(x)); // 输出 "true"
```

### 1.5 BigInt （原子）

任意精度格式的整数（特殊场景：加密算法、数字签名、游戏经济系统、随机ID）

### 1.6 String（原子）

- immutable 不可变
- length

字面量是写法，如'hello'字符串字面量、5 数字面量、true 布尔字面量、{}对象字面量、[]数组字面量

基本类型的字面量是原始值（不可变）、复杂类型的字面量是引用值

### 1.7 Symbol（原子）

- 作为对象属性的标识符

```javascript
let s1 = Symbol("foo");
let s2 = Symbol("bar");
let s3 = Symbol("baz");
let s4 = Symbol("qux");

let o = {};

// 方法1：计算属性语法
o[s1] = "foo val";

// 方法2：点语法（错误，不适用于Symbol）
// o.s2 = "bar val";  // 错误！创建的是字符串属性"s2"

// 方法3：Object.defineProperty
Object.defineProperty(o, s2, { 
  value: "bar val"
});

// 方法4：Object.defineProperties
Object.defineProperties(o, {
  [s3]: { 
    value: "baz val",
    enumerable: true
  },
  [s4]: { 
    value: "qux val",
    enumerable: true
  }
});

// 验证属性存在
console.log(o[s1]);  // "foo val"
console.log(o[s2]);  // "bar val"
console.log(o[s3]);  // "baz val"
console.log(o[s4]);  // "qux val"

// Symbol属性不会出现在常规遍历中
console.log(Object.keys(o));  // []
console.log(Object.getOwnPropertyNames(o));  // []

// 需要专门的方法获取Symbol属性
console.log(Object.getOwnPropertySymbols(o));  
// [Symbol(foo), Symbol(bar), Symbol(baz), Symbol(qux)]
```



## 二、运算符及表达式

### 2.1 运算符

#### 自增和自减

- A++
  - 后置自增运算符
- A--
  - 后置自减运算符
- ++A
  - 前置自增运算符
- --A
  - 前置自减运算符

####  一元运算符

> 一元运算符只有一个操作数

- delete

  - 删除对象的属性；如果该属性的值是一个对象，并没有更多对该对象的引用，该属性持有的对象最终会被释放

  - ```typescript
    const Employee = {
      firstname: 'Maria',
      lastname: 'Sanchez',
    };
    
    console.log(Employee.firstname);
    // Expected output: "Maria"
    
    delete Employee.firstname;
    
    console.log(Employee.firstname);
    // Expected output: undefined
    ```

- void

  - 表示表达式放弃返回值

- typeof

  - 用于判断给定对象的类型

  - | 类型                                                         | 结果                                                         |
    | :----------------------------------------------------------- | :----------------------------------------------------------- |
    | [Undefined](https://developer.mozilla.org/zh-CN/docs/Glossary/Undefined) | `"undefined"`                                                |
    | [Null](https://developer.mozilla.org/zh-CN/docs/Glossary/Null) | `"object"`（[原因](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof#typeof_null)） |
    | [Boolean](https://developer.mozilla.org/zh-CN/docs/Glossary/Boolean) | `"boolean"`                                                  |
    | [Number](https://developer.mozilla.org/zh-CN/docs/Glossary/Number) | `"number"`                                                   |
    | [BigInt](https://developer.mozilla.org/zh-CN/docs/Glossary/BigInt) | `"bigint"`                                                   |
    | [String](https://developer.mozilla.org/zh-CN/docs/Glossary/String) | `"string"`                                                   |
    | [Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol) | `"symbol"`                                                   |
    | [Function](https://developer.mozilla.org/zh-CN/docs/Glossary/Function)（在 ECMA-262 中实现 [[Call]]；[classes](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/class)也是函数) | `"function"`                                                 |
    | 其他任何对象                                                 | `"object"`                                                   |

- +

  - 一元加运算符，用于将操作转换为Number类型

- -

  - 一元减运算符，用于将操作转换为Number类型并取反

  - ```typescript
    const x = 4;
    const y = -x;
    
    console.log(y);
    // Expected output: -4
    
    const a = '4';
    const b = -a;
    
    console.log(b);
    // Expected output: -4
    ```

- ~

  - 按位非运算符

    - 将操作数的位反转。如同其他位运算符一样，它将操作数转化为 32 位的有符号整型。

    - ```typescript
      const a = 5; // 00000000000000000000000000000101
      const b = -3; // 11111111111111111111111111111101
      
      console.log(~a); // 11111111111111111111111111111010
      // Expected output: -6
      
      console.log(~b); // 00000000000000000000000000000010
      // Expected output: 2
      ```

- !

  - 逻辑非运算符

#### 算数运算符

> 以两个数值（字面量或变量）作操作数，返回单个数值

- +
  - 加法运算法
- -
  - 减法运算符
- /
  - 除法运算符
- *
  - 乘法运算符
- %
  - 取模运算符
- **
  - 求幂运算符

#### 关系运算符

> 比较运算符比较两个操作数并返回基于比较结果的布尔值

- in

  - 判断对象是否拥有给定属性

  - ```typescript
    const car = { make: 'Honda', model: 'Accord', year: 1998 };
    
    console.log('make' in car);
    // Expected output: true
    
    delete car.make;
    if ('make' in car === false) {
      car.make = 'Suzuki';
    }
    
    console.log(car.make);
    // Expected output: "Suzuki"
    ```

- instanceof

  - 判断一个对象是否是另一个对象的实例

- <

  - 小于运算符

- `> `

  - 大于运算符

- <=

  - 小于等于运算符

- `>=`

  - 大于等于运算符

:warning: `=>` 是箭头函数

#### 相等运算符

> 判断后返回布尔值

- ==
  - 相等运算符
- !=
  - 不等运算符
- ===
  - 全等运算符，不仅是值，而且匹配类型
- !==
  - 非全等运算符

#### 位移运算符

> 在二进制的基础上对数字进行移动操作

- <<

  - 按位左移运算符，增

  - ```typescript
    const a = 5; // 00000000000000000000000000000101
    const b = 2; // 00000000000000000000000000000010
    
    console.log(a << b); // 00000000000000000000000000010100
    // Expected output: 20
    
    ```

- `>>`

  - 按位右移运算符，减

- `>>>`

  - 按位无符号右移运算符,将左操作数计算为无符号数，并将该数字的二进制表示形式移位为右操作数指定的位数，取模 32。向右移动的多余位将被丢弃，零位从左移入。其符号位变为 `0`，因此结果始终为非负数。与其他按位运算符不同，零填充右移返回一个无符号 32 位整数。

  - ```typescript
    const a = 5; //  00000000000000000000000000000101
    const b = 2; //  00000000000000000000000000000010
    const c = -5; //  11111111111111111111111111111011
    
    console.log(a >>> b); //  00000000000000000000000000000001
    // Expected output: 1
    
    console.log(c >>> b); //  00111111111111111111111111111110
    // Expected output: 1073741822
    
    ```

#### 二进制位运算符

> 二进制运算符将它们的操作数作为32个二进制位(0 或 1)的集合，并返回保准的JavaScript数值

- &

  - 按位与：在两个操作数对应的二进位都为 `1` 时，该位的结果值才为 `1`。

  - ```typescript
    const a = 5; // 00000000000000000000000000000101
    const b = 3; // 00000000000000000000000000000011
    
    console.log(a & b); // 00000000000000000000000000000001
    // Expected output: 1
    
    ```

- |

  - 按位或：在其中一个或两个操作数对应的二进制位为 `1` 时，该位的结果值为 `1`。

  - ```typescript
    const a = 5; // 00000000000000000000000000000101
    const b = 3; // 00000000000000000000000000000011
    
    console.log(a | b); // 00000000000000000000000000000111
    // Expected output: 7
    ```

- ^

  - 位异或：在两个操作数有且仅有一个对应的二进制位为 `1` 时，该位的结果值为 `1`

  - ```typescript
    const a = 5; // 00000000000000000000000000000101
    const b = 3; // 00000000000000000000000000000011
    
    console.log(a ^ b); // 00000000000000000000000000000110
    // Expected output: 6
    ```

#### 二元逻辑运算符

> 逻辑运算符典型的用法是用于布尔值运算

- &&

  - 逻辑与，全部为真才返回真

- ||

  - 逻辑或，有一个或多个为真，则返回真

- ??

  - 空值合并运算符，当左侧的操作数为 [`null`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/null) 或者 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined) 时，返回其右侧操作数，否则返回左侧操作数。

  - ```typescript
    const foo = null ?? 'default string';
    console.log(foo);
    // Expected output: "default string"
    
    const baz = 0 ?? 42;
    console.log(baz);
    // Expected output: 0
    ```

#### 可选链运算符

- ?.

  - 允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。`?.` 运算符的功能类似于 `.` 链式运算符，不同之处在于，在引用为空（null或者undefined）的情况下不会引起错误，该表达式短路返回值是 `undefined`。与函数调用一起使用时，如果给定的函数不存在，则返回 `undefined`。

  - ```typescript
    const adventurer = {
      name: 'Alice',
      cat: {
        name: 'Dinah',
      },
    };
    
    const dogName = adventurer.dog?.name;
    console.log(dogName);
    // Expected output: undefined
    
    console.log(adventurer.someNonExistentMethod?.());
    // Expected output: undefined
    ```

#### 条件（三元）运算符

- （condition? ifTrue : ifFalse）
  - 把两个结果中其中一个符合运算逻辑的值返回

#### 赋值运算符

> 赋值运算符将右边的操作数的值分配给左边的操作数

- =

  - 赋值运算符

- *=

  - 赋值乘积

- **=

  - 求幂赋值

- /=

  - 赋值商

- %=

  - 赋值求余

- +=

  - 赋值求和

- -=

  - 赋值求差

- <<=

  - 左位移

- `>>=`

  - 右位移

- `>>>=`

  - 无符号右位移

- &=

  - 使用两个操作数的二进制表示，对它们进行按位与运算并将结果赋值给变量

  - ```typescript
    let a = 5; // 00000000000000000000000000000101
    a &= 3; // 00000000000000000000000000000011
    
    console.log(a); // 00000000000000000000000000000001
    // Expected output: 1
    ```

- ^=

  - 赋值按位异或

- |=

  - 赋值或

- &&=

  - 逻辑和赋值运算符

- ||=

  - 逻辑或赋值运算符

- ??=

  - 逻辑空赋值运算符

- [a, b] = arr, {a, b} = obj

  - 解构赋值，允许使用类似数组或对象字面量的语法将数组或对象的属性赋值给变量

#### 逗号运算符

- ,

  - 对它的每个操作数从左到右求值，并返回最后一个操作数的值。这让你可以创建一个复合表达式，其中多个表达式被评估，复合表达式的最终值是其成员表达式中最右边的值。这通常用于为 [`for`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for) 循环提供多个参数。

  - ```typescript
    let x = 1;
    
    x = (x++, ++x);
    
    console.log(x);
    // Expected output: 2
    
    x = (2, 3);
    
    console.log(x);
    // Expected output: 3
    
    ```



### 2.2 表达式及关键词

#### this

- 指向函数的执行上下文

#### class

- 定义类表达式

#### function

- 定义函数表达式

#### async function

- 异步函数表达式

- await
  - 暂停或恢复执行异步函数，并等待promise的resolve/reject回调


#### 其他

- []
  - 数组初始化/字面量语法

- {}
  - 对象初始化/字面量语法

- /ab+c/i
  - 正则表达式字面量语法

- ()
  - 分组操作符

- 属性访问符，提供两种方式用于访问一个对象的属性 `.` 和 `[]`

  - ```typescript
    const person1 = {};
    person1['firstname'] = 'Mario';
    person1['lastname'] = 'Rossi';
    
    console.log(person1.firstname);
    // Expected output: "Mario"
    
    const person2 = {
      firstname: 'John',
      lastname: 'Doe',
    };
    
    console.log(person2['lastname']);
    // Expected output: "Doe"
    
    ```

- new

  - 构建构造函数实例

- new.target

  - 在构造器中，new.target指向new调用的构造器

- import.meta

  - 向JavaScript模块暴露特定上下文的元数据属性的对象，这个对象包含了这个模块的信息，比如这个模块的URL

- super

  - 调用父类的构造器

- ...obj

  - `展开运算符`允许在需要多个参数 或者 多个元素 的地方展开表达式，不一定需要使用对象的解构赋值



## 三、原子（引用）数据类型与作用域

### 3.1原子数据类型与引用数据类型

#### 原子数据类型内存（上述7种）

- 存储在 栈中 的内存地址值， 该值可操作实际值;

##### 复制值

- 在栈中创建一个新空间;
- 然后将旧变量在栈中的实际值赋值给新空间;
- 将新空间栈中的内存地址赋值给新变量;
- 两者相互隔绝;

![image-20260119151321986](./JS%E5%9F%BA%E7%A1%80.assets/image-20260119151321986.png)

#### 引用类型类型内存（object）

- 存储在 栈中 的内存地址值，该值存储堆中的内存地址，操作对 object 的引用

##### 复制值

- 在栈中创建一个新空间;
- 然后将旧变量在栈中的实际值赋值给新空间;
- 将新空间栈中的内存地址赋值给新变量;
- 但新变量在栈中的对应值是指向对象的堆内存地址;
- 两者实际还是指向一个对象;

![引用传递](./JS%E5%9F%BA%E7%A1%80.assets/2023-03-10-20-01-39-ef1a479566dd25eadd725640d5bc3b4f.png)

#### 动态属性

```javascript
let name = "Nicholas";
name.age = 27;
console.log(name.age); // undefined
let person = new Object();
person.name = "Nicholas";
console.log(person.name); // "Nicholas"
```



#### typeof 与 instanceof 

##### typeof

```javascript
let message = "some string";
console.log(typeof message); // "string"
```

| 检测对象       | 返回值      |
| -------------- | ----------- |
| undefined      | "undefined" |
| Boolean        | "boolean"   |
| String         | "string"    |
| Number         | "number"    |
| Object or null | "object"    |
| Function       | "function"  |
| Symbol         | "symbol"    |

##### instanceof

检测引用类型的具体数据类型

- 检测 reference value, 总是 true;
- 检测 primitive value, 总是 false;

```javascript
console.log(person instanceof Object); // is the variable person an Object?
console.log(colors instanceof Array); // is the variable colors an Array?
console.log(pattern instanceof RegExp); // is the variable pattern a RegExp?
```



### 3.2 作用域

#### 3.2.1 词法环境

组成

- Environment Record: `存储标识符与变量, 函数等类型的关联`;
  - Global Environment Record: 对应于全局上下文
  - Declarative Environment Record
    - Function Environment Record: 对应于函数执行上下文;
    - Module Environment Record: 对应与 ESM 模块的顶级上下文, outer 为 Global Environment Record;
- outer: 指向的上级 lexicalEnvironment;
- this: lexicalEnvironment 绑定的 this;



#### 3.2.2 this确定

- 全局执行上下文;
  - 严格模式为 undefined;
  - 非严格模式为 windows/global;
- 函数执行上下文;
  - 普通函数: 根据函数被调用时的方式;
    - 函数被对象调用/new, this 指向该对象 (对象、构造函数或类的实例);
    - 函数不被对象调用, this 指向 undefined/windows;
  - 箭头函数;
    - 箭头函数`创建时候`的`执行上下文`的 `lexicalEnvironment` 无 this binding;
    - 其沿着 lexicalEnvironment 中 outer 获得最邻近 this, 使用该 this;



```javascript
// 普通函数
function test() {
  console.log(this);
}
const o = {
  test: test;
};
// 普通函数不被被对象调用, this 指向该对象
test(); // windows
// 普通函数被对象 o 调用, this 指向 o
o.test(); // Object: o

// 箭头函数
const o = {
  test0: () => {
    console.log(this);
  };
  test1: function () {
    (() => {
      console.log(this);
    })();
  };
};
// 箭头函数 test0 最邻近的lexicalEnvironment为全局上下文的 LexicalEnvironment, this 指向 undefined/windows
o.test0();
// test1 中的匿名箭头函数最邻近的lexicalEnvironment为 test1 的生成的函数执行上下文的 LexicalEnvironment, this 指向 test1 的 this, 即对象 o
o.test1();
```



#### 3.2.3 作用域与作用域链

> var/const/let/function 等标识符可以访问的 lexicalEnvironment;

##### 分类

- 全局作用域;
  - 存储在全局执行上下文的 LexicalEnvironment 或 VariableEnvironment 中;
  - 可以被执行栈上的任意执行上下文的 LexicalEnvironment 或 VariableEnvironment 中的任意标识符访问;
- 函数作用域;
  - 存储在对应的函数执行上下文的 LexicalEnvironment 或 VariableEnvironment 中;
  - 可以被该函数执行上下文下级的执行上下文的 LexicalEnvironment 或 VariableEnvironment 中的标识符访问;
- 块级作用域;
  - 存储在 临时创建的 LexicalEnvironment 中;
  - 仅能被该 LexicalEnvironment 中的标识符访问;



##### 作用域链

- 基于执行上下文的 outer 访问执行栈中的变量和函数
- 当前 > 父级 > > 全局



## 四、垃圾回收

> - js 自动进行垃圾回收, 释放不再使用的变量

- 新生代和老生代对象（经过多次垃圾回收依旧存在）

### 4.1 回收方法

- 引用计数（Reference Counting）
  - 这是早期垃圾回收机制的一种方式，通过计数每个对象被引用的次数来跟踪。当引用计数降到0时，对象被认为是垃圾，可以被回收。
- 标记-清除（Mark-and-Sweep）
  - 现代JavaScript引擎（如V8，SpiderMonkey）使用标记-清除算法。这个过程分为两个阶段：
    - **标记阶段**：垃圾回收器从根对象（通常是全局对象）开始，遍历所有可达的对象，将它们标记为活跃的。
    - **清除阶段**：垃圾回收器再次遍历堆内存，清除那些未被标记的对象。
- 垃圾回收触发条件
  - 垃圾回收器会在内存使用达到一定阈值时自动触发，或者在特定操作（如页面隐藏或长时间运行的脚本后）后触发。

### 4.2 性能消耗

由于性能耗费较大，如下方便垃圾回收（对于不需要的）

- 手动赋值null
  - 和初始化变量为null 冲突。初始化时候没有对象要被回收，一般后期手动赋值null ， 回收不需要对象
- 避免全局变量，尽量定义函数中
- 使用let const
- 减少闭包



## 五、引用类型

### 5.1 基本引用类型

- Date;
- RegExp;
- Math;
- Primitive Wrapper Types（原始包装类型）
  - Boolean;
  - Number;
  - String;



### 5.2 集合引用类型

- array
  - Array
  - 伪数组（具有length， 可转换）
- typedArray 类型化数组
- object
- map
- weakMap
- set
- weakSet

:bulb: 拓展运算符（`...`）：具有 default iterator （Array Map Set）的集合引用类型均可用于 for...of 循环



#### 5.2.1 Array

##### 创建数组

创建数组的传统方法是：

```typescript
var a = new Array();
a[0] = "dog";
a[1] = "cat";
a[2] = "hen";
a.length; // 3
```

使用数组字面量（array literal）法更加方便：

```typescript
var a = ["dog", "cat", "hen"];
a.length; // 3
```

注意，`Array.length` 并不总是等于数组中元素的个数，如下所示：

```typescript
var a = ["dog", "cat", "hen"];
a[100] = "fox";
a.length; // 101

```

如果试图访问一个不存在的数组索引，会得到 `undefined`：

```typescript
typeof a[90]; // undefined
```



##### 数组循环

可以通过如下方式遍历一个数组：

```typescript
for (var i = 0; i < a.length; i++) {
  // Do something with a[i]
}
```

ES2015引入了更加简洁的 [`for`...`of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环，可以用它来遍历可迭代对象，例如数组： :star: 

```typescript
for (const currentValue of a) {
  // Do something with currentValue
}
```

遍历数组的另一种方法是使用 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环，然而这并不是遍历数组元素而是数组的索引

```typescript
for (var i in a) {
  // 操作 a[i]
}
```

ECMAScript 5 增加了另一个遍历数组的方法，[`forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)：

```typescript
["dog", "cat", "hen"].forEach(function (currentValue, index, array) {
  // 操作 currentValue 或者 array[index]
});
```



##### 常用方法

arr.forEach => 执行一次操作

arr.map  => 返回新数组 执行方法返回新数组  array1.map((x) => x * 2)

arr.filter =>  返回部分数组 给定数组的一部分浅拷贝 words.filter((word) => word.length > 6)，` 如果数组每项是对象，则修改筛选后的对象某部分属性值，则同样会影响原数组。因为在原数组中每项存储的是对象的地址值，导致赋值时复制的是内存地址的引用,因此修改副本会影响原始值`

arr.every =>  返回布尔 检验数组元素是否都符合某个函数 array1.every(isBelowThreshold)

arr.some => 返回布尔 检验是否有符合某个函数 array.some(even)

arr.find/findLast => 返回数组元素 第一/最后一个满足测试的元素 array1.find((element) => element > 10)

arr.includes  => 返回布尔 判断数组是否包含指定值

arr.splice() => 返回原数组，用于增加/删除，如果删除指定项倒序删除 arr.splice(i, 1)

arr.reduce()=> 方法对数组中的每个元素按序执行一个提供的 **reducer** 函数，每一次运行 **reducer** 会将先前元素的计算结果作为参数传入，最后将其结果汇总为单个返回值。

```vue
<div class="s_hasSelected">
        已选择：{{curActive == 'senior' ? data.seniorIndustryData.filter(item => item.status).length : data.recentHotIndustryData.filter(item => item.status).length}}个产业，
        {{curActive == 'senior' ? data.seniorIndustryData.filter(item => item.status).reduce((acc, cur) => acc + cur.children.filter(child => child.status).length, 0) : data.recentHotIndustryData.filter(item => item.status).reduce((acc, cur) => acc + cur.children.filter(child => child.status).length, 0)}}个行业，
        {{curActive == 'senior' ? data.seniorIndustryData.filter(item => item.status).reduce((acc, cur) => acc + cur.children.filter(child => child.status).reduce((acc, subChild) => acc + subChild.children.filter(subChild => subChild.status).length, 0), 0) : data.recentHotIndustryData.filter(item => item.status).reduce((acc, cur) => acc + cur.children.filter(child => child.status).reduce((acc, subChild) => acc + subChild.children.filter(subChild => subChild.status).length, 0), 0)}}个岗位
      </div>
```

```json
数据结构
[
  {
    "name": "制造业",
    "status": false,
    "score": 484.5,
    "children": [
      {
        "name": "电子器件制造",
        "status": false,
        "score": 65.6,
        "children": [
          {
            "name": "硬件工程师",
            "status": false,
            "score": 7.5
          },
          {
            "name": "电子/电器维修工程师/技师",
            "status": false,
            "score": 2.8
          }
        ]
      },
      {
        "name": "其他电子设备制造",
        "status": false,
        "score": 53.7,
        "children": [
          {
            "name": "半导体产品经理/产品工程师",
            "status": false,
            "score": 7.3
          }
        ]
      }
    ]
  }
]
```



#### 5.2.2 Object

##### 创建对象

这两种方法在语义上是相同的。第二种更方便的方法叫作“对象字面量（object literal）”法，一般优先选择第二种方法。

```typescript
var obj = new Object();
var obj = {};
```



对象的属性可以通过链式（chain）表示方法进行访问

```typescript
var obj = {
  name: "Carrot",
  _for: "Max", //'for' 是保留字之一，使用'_for'代替
  details: {
    color: "orange",
    size: 12,
  },
};
```

```typescript
obj.details.color; // orange
obj["details"]["size"]; // 12
```



复制对象：

```typescript
// 快速复制一个对象
//方式一
const originalObj = { name: 'John', age: 30, city: 'New York' };
const copiedObj = { ...originalObj };
//方式二
const originalObj = { name: 'John', age: 30, city: 'New York' };
const copiedObj = Object.assign({}, originalObj);
```



##### 常用方法

Object.assign(target, source) => 复制源对象所有可枚举自身属性给target,返回修改后的target

Object.entries(obj) => 返回数组，包含obj所有自身可枚举字符串键属性的键值对

Object.keys(obj) => 返回数组，包含obj所有自身可枚举字符串键的数组

Object.values(obj) => 返回数组，包含obj所有自身可枚举字符串属性值的数组

Object.hasOwn(obj, 'key1') => 返回布尔，检验obj 是否包含指定键对应的值

Object.create(person)  => 返回一个object 对象 ，该对象隐式原型为person的prototype

Object.defineProperties(obj1, prototypeName, {desc...}) => 为对象定义属性，注意defineProperties设置时候对象的writable  enumerable  和 configurable 默认为false； 字面量声明对象默认都为true

```javascript
const aabb = {
    c: 1
}
Object.defineProperty(aabb, 'd', {
    value: 1
})
aabb.c = 2
aabb.d = 2
console.log(aabb.c , aabb.d) // 2 1
```



#### 5.2.3 map

- 保存键值对，并能记住键的原始插入顺序

```typescript
const map1 = new Map();

map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);

console.log(map1.get('a'));
// Expected output: 1
```

:bulb: 如果只是为实现键值对， 相同大小内存 Map大约可比Object多存储50%的总数。



#### 5.2.4 weakmap

- 键值对的集合，键必须是`对象或非全局注册的symbol`，值可以是任意的JavaScript类型。一旦一个对象作为键被回收，那么在 `WeakMap` 中相应的值便成为了进行垃圾回收的候选对象，只要它们没有其他的引用存在
- 不能遍历



#### 5.2.5 set

- set对象是值的合集。set中的元素`只会出现一次，即集合中的元素是唯一的`。可以按照插入顺序迭代集合中的元素。*插入顺序*对应于add()方法成功将每一个元素插入到集合中（调用 `add()` 方法时集合中不存在相同的元素）的顺序。



#### 5.2.6 weakset

- 可被垃圾回收的值的集合，`对象`。`WeakSet` 中的值只能出现一次。它在 `WeakSet` 的集合中是唯一的。



> - map 和 weakmap的区别
>   1. **键类型和垃圾回收行为**：
>      - **Map**：`Map` 对象的键可以是任意类型的值（包括基本类型、对象或其他引用类型），并且存储的键值对不会被垃圾回收，直到被明确移除或 `Map` 对象被销毁。
>      - **WeakMap**：`WeakMap` 的键必须是对象。与 `Map` 不同，`WeakMap` 中的键被视为弱引用，即如果该键是 `WeakMap` 中的唯一引用，并且没有其他引用指向该键，则垃圾回收器可能会清除该键值对。这意味着 `WeakMap` 不会阻止其键对象被回收，因此在键对象被销毁后，相应的键值对也会被自动移除。
>   2. **迭代和遍历**：
>      - **Map**：`Map` 对象是可迭代的，可以使用迭代器（例如 `for...of` 循环）遍历 `Map` 中的键值对。
>      - **WeakMap**：由于 `WeakMap` 键的弱引用特性，不支持直接的迭代和遍历。因此无法像 `Map` 那样轻松遍历 `WeakMap` 中的内容。
> - set 和 weakset的区别
>   1. **键的类型**：
>      - **Set**：`Set` 对象存储的是一组唯一的值，这些值可以是任意类型的，包括基本类型和对象引用等。
>      - **WeakSet**：`WeakSet` 只能存储对象引用，不能存储基本类型的值。
>   2. **引用和垃圾回收**：
>      - **Set**：`Set` 对象存储的值不会阻止垃圾回收器回收这些值。
>      - **WeakSet**：`WeakSet` 中存储的对象引用是弱引用，也就是说，如果对象是 `WeakSet` 中的唯一引用并且没有其他引用指向它，那么垃圾回收器可能会回收这个对象。这种特性使得在对象被移除时，`WeakSet` 也会随之自动更新。
>   3. **迭代和遍历**：
>      - **Set**：`Set` 是可迭代的对象，可以通过迭代器（例如 `for...of`）或 `forEach` 方法遍历其中的值。
>      - **WeakSet**：`WeakSet` 不是可迭代的对象，因此无法直接通过迭代器或 `forEach` 方法遍历其内容。



### 5.3 常用方法总结

[查看章节](https://liusihu-source.github.io/%E5%89%8D%E7%AB%AF/JS/%E5%B7%A5%E5%85%B7%E8%BD%AF%E4%BB%B6/%E5%B8%B8%E7%94%A8%E6%96%B9%E6%B3%95%E5%BA%93.html)



### 5.4 自写数组方法

forEach

```javascript
Array.prototype.myForEach = function (callback) {
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this);
  }
};

const arr = [1, 2, 3, 4, 5];
arr.myForEach((item) => console.log(item));
```



Map

```typescript
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

const arr = [1, 2, 3];
const mappedArr = arr.myMap((x) => x * 2);
console.log(mappedArr); // [2, 4, 6]
```



filter

```typescript
Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

const arr = [1, 2, 3, 4, 5];
const filteredArr = arr.myFilter((x) => x % 2 === 1);
console.log(filteredArr); // [1, 3, 5]
```



some

```typescript
Array.prototype.mySome = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return true;
    }
  }
  return false;
};

const arr = [1, 2, 3, 4, 5];
const isEven = (x) => x % 2 === 0;
console.log(arr.mySome(isEven)); // true
```



every

```typescript
Array.prototype.myEvery = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) {
      return false;
    }
  }
  return true;
};

const arr = [1, 2, 3, 4, 5];
const isEven = (x) => x % 2 === 0;
console.log(arr.myEvery(isEven)); // false
```



find

```typescript
Array.prototype.myFind = function (callback) {
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      return this[i];
    }
  }
  return undefined;
};

const arr = [1, 2, 3, 4, 5];
const isEven = (x) => x % 2 === 0;
console.log(arr.myFind(isEven)); // 2
```



reduce

```typescript
Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue === undefined ? undefined : initialValue;

  for (let i = 0; i < this.length; i++) {
    if (accumulator !== undefined) {
      accumulator = callback.call(undefined, accumulator, this[i], i, this);
    } else {
      accumulator = this[i];
    }
  }

  return accumulator;
};

const arr = [1, 2, 3, 4, 5];
const sum = (prev, curr) => prev + curr;
console.log(arr.myReduce(sum)); // 15
```



flat

```typescript
Array.prototype.myFlat = function (depth = 1) {
  const result = [];

  const flatten = (arr, d) => {
    arr.forEach((item) => {
      if (Array.isArray(item) && d > 0) {
        flatten(item, d - 1);
      } else {
        result.push(item);
      }
    });
  };

  flatten(this, depth);

  return result;
};

const arr = [1, [2, [3, [4]], 5]];
console.log(arr.myFlat()); // [1, 2, [3, [4]], 5]
console.log(arr.myFlat(1)); // [1, 2, [3, [4]], 5]
console.log(arr.myFlat(2)); // [1, 2, 3, [4], 5]
console.log(arr.myFlat(3)); // [1, 2, 3, 4, 5]
```



## 六、迭代器与生成器

常见迭代器

- String、Array、Maps、Sets



自写迭代器

- 必须实现next 方法;

- 返回包括 value 和 done 两属性的对象;
  - value: 当前值;
  - done: 是否迭代完成;
