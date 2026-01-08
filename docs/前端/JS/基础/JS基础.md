# JS基础 

> 语法来源 Java 和 C，这两种语言的语法特性同样适用 JavaScript

## 一、基本数据类型

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



## 二、数字类型

### 2.1 概述

- “遵循 IEEE 754 标准的双精度 64 位格式”表示数字。

- 除了[`BigInt`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt)，**并不存在整数/整型 (Integer)。**

```typescript
console.log(3 / 2);             // 1.5,not 1
console.log(Math.floor(3 / 2)); // 1
console.log(0.1 + 0.2)  //0.30000000000000004
```

:warning: 一个看上去是整数的东西，其实都是浮点数。



### 2.2 使用

- 支持标准的[算术运算符 (en-US)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators)，如加法、减法、取模（或取余）等等
- 提供内置对象 [`Math`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)（数学对象），以处理更多的高级数学函数和常数

```typescript
Math.sin(3.5);
var circumference = 2 * Math.PI * r;
```

- 可使用内置函数 [`parseInt()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt) 将字符串转换为整型。该函数的第二个可选参数表示字符串表示（进制）：

```typescript
parseInt("123", 10); // 123
parseInt("010", 10); // 10
parseInt("11", 2); // 3
```

- 内置函数 [`parseFloat()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)，解析浮点数字符串，`parseFloat()` 只应用于解析十进制数字。

- 如果给定的字符串不存在数值形式，函数会返回一个特殊的值 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)（Not a Number 的缩写）
  - 此外NaN` 作为参数进行任何数学运算，结果也会是 `NaN
  - 可使用内置函数 [`isNaN()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN) 来判断一个变量是否为 `NaN`：

```typescript
parseInt("hello", 10); // NaN
NaN + 5; //NaN
isNaN(NaN); // true
```



## 三、字符串类型

- 一串[Unicode 字符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types#unicode.e7.bc.96.e7.a0.81)序列
- 每一个 Unicode 字符由一个或两个编码单元来表示
- 每一个编码单元由一个 16 位二进制数表示



### 3.1 字符串的属性

 [`length`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/length)（编码单元的个数）属性，可以得到它的长度。

```typescript
"hello".length; // 5
```



### 3.2 字符串的常用方法

```typescript
"hello".charAt(0); // "h"
"hello, world".replace("world", "mars"); // "hello, mars"
"hello".toUpperCase(); // "HELLO"
```



## 四、其他类型

- 布尔类型，分别是 `true` 和 `false`（两者都是关键字）。

- 支持变量转换成布尔类型：

1. `false`、`0`、空字符串（`""`）、`NaN`、`null` 和 `undefined` 被转换为 `false`
2. 所有其他值被转换为 `true`



## 五、运算符及表达式

### 5.1 运算符

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



### 5.2 表达式及关键词

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



## 六、变量

使用关键字 [`let`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/let) 、[`const`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/const) 和 [`var`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/var)：

- **`let`** 语句声明一个`块级作用域`的本地变量，并且可选的将其初始化为一个值。

```typescript
let a;
let name = "Simon";
```



- **`const`** 声明一个不可变的常量。这个常量在定义域内总是可见的。

```typescript
const Pi = 3.14; // 设置 Pi 的值
Pi = 1; // 将会抛出一个错误因为你改变了一个常量的值。

```



- **`var`** 尽量不要用



## 七、逻辑结构

### 7.1 if else结构

- 使用 `if` 、 `else` 、`else-if`定义条件语句

```typescript
var name = "kittens";
if (name == "puppies") {
  name += "!";
} else if (name == "kittens") {
  name += "!!";
} else {
  name = "!" + name;
}
name == "kittens!!"; // true

```

- 可使用基于一个`数字或字符串`的 `switch` 语句：

```typescript
switch (action) {
  case "draw":
    drawIt();
    break;
  case "eat":
    eatIt();
    break;
  default:
    doNothing();
}

```

:bulb: 注意添加break；



### 7.2 循环结构

- 支持 `while` 循环和 `do-while` 循环。

```typescript
while (true) {
  // 一个无限循环！
}

var input;
do {
  input = get_input();
} while (inputIsNotValid(input));

```

- for循环

```typescript
for (var i = 0; i < 5; i++) {
  // 将会执行五次
}

```

- for of & for in

```typescript
const array1 = ['a', 'b', 'c'];

for (const element of array1) {
  console.log(element);
}

const object = { a: 1, b: 2, c: 3 };

for (const property in object) {
  console.log(`${property}: ${object[property]}`);
}
```



## 八、引用类型

### 8.1 基本引用类型





### 8.2 复杂引用类型



## 九、数组

### 9.1 创建数组

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



### 9.2 数组循环

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

遍历数组的另一种方法是使用 [`for...in`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 循环，然而这并不是遍历数组元素而是数组的索引。注意，如果哪个家伙直接向 `Array.prototype` 添加了新的属性，使用这样的循环这些属性也同样会被遍历。所以并不推荐使用这种方法遍历数组：

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



### 9.3  常用方法

arr.forEach => 执行一次操作

arr.map  => 返回新数组 执行方法返回新数组  array1.map((x) => x * 2)

arr.filter =>  返回部分数组 给定数组的一部分浅拷贝 words.filter((word) => word.length > 6)

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







## 十、对象

### 10.1 创建对象

有两种简单方法可以创建一个空对象：

```typescript
var obj = new Object();
var obj = {};
```

这两种方法在语义上是相同的。第二种更方便的方法叫作“对象字面量（object literal）”法，一般优先选择第二种方法。

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

对象的属性可以通过链式（chain）表示方法进行访问：

```typescript
obj.details.color; // orange
obj["details"]["size"]; // 12
```

下面的例子创建了一个对象原型，**`Person`**，和这个原型的实例，**`You`**。(构造函数的方式)

```typescript
function Person(name, age) {
  this.name = name;
  this.age = age;
}

var You = new Person("You", 24);
// 我们创建了一个新的 Person，名称是 "You"
// ("You" 是第一个参数，24 是第二个参数..)

```

完成创建后，对象属性可以通过如下两种方式进行赋值和访问：

```typescript
// 点表示法 (dot notation)
obj.name = "Simon";
var name = obj.name;

// 括号表示法 (bracket notation)
obj["name"] = "Simon";
var name = obj["name"];
var user = prompt("what is your key?");
obj[user] = prompt("what is its value?");

-----------------------------------------------------
// 快速复制一个对象
//方式一
const originalObj = { name: 'John', age: 30, city: 'New York' };
const copiedObj = { ...originalObj };
//方式二
const originalObj = { name: 'John', age: 30, city: 'New York' };
const copiedObj = Object.assign({}, originalObj);
```



### 10.2 常用方法

Object.assign(target, source) => 复制源对象所有可枚举自身属性给target,返回修改后的target

Object.entries(obj) => 返回数组，包含obj所有自身可枚举字符串键属性的键值对

Object.keys(obj) => 返回数组，包含obj所有自身可枚举字符串键的数组

Object.values(obj) => 返回数组，包含obj所有自身可枚举字符串属性值的数组

Object.hasOwn(obj, 'key1') => 返回布尔，检验obj 是否包含指定键对应的值



## 十一、Map、WeakMap（带键的集合）、Set、WeakSet

:bulb: 如果只是为实现键值对， 相同大小内存 Map大约可比Object多存储50%的总数。

### 11.1 map

- 保存键值对，并能记住键的原始插入顺序

```typescript
const map1 = new Map();

map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);

console.log(map1.get('a'));
// Expected output: 1
```

### 11.2 weakmap

- 键值对的集合，键必须是对象或非全局注册的符号，值可以是任意的JavaScript类型。一旦一个对象作为键被回收，那么在 `WeakMap` 中相应的值便成为了进行垃圾回收的候选对象，只要它们没有其他的引用存在

### 11.3 set

- set对象是值的合集。set中的元素只会出现一次，即集合中的元素是唯一的。可以按照插入顺序迭代集合中的元素。*插入顺序*对应于add()方法成功将每一个元素插入到集合中（即，调用 `add()` 方法时集合中不存在相同的元素）的顺序。

### 11.4 weakset

- 可被垃圾回收的值的集合，包括对象和非全局注册的符号。`WeakSet` 中的值只能出现一次。它在 `WeakSet` 的集合中是唯一的。

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



## 十二、函数

- 包含 0 个或多个已命名的参数。
- 函数体中的表达式数量没有限制。
- return` 语句在返回一个值并结束函数。如果没有使用 `return` 语句，或者一个没有值的 `return` 语句，JavaScript 会返回 `undefined`。



### 12.1 函数参数

如果调用函数时没有提供足够的参数，缺少的参数会被 `undefined` 替代。



函数实际上是访问函数体中一个 [`arguments`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments) 的内部对象，这个对象如同一个类似于数组的对象一样，包括了所有被传入的参数。

```typescript
function add() {
  var sum = 0;
  for (var i = 0, j = arguments.length; i < j; i++) {
    sum += arguments[i];
  }
  return sum;
}

add(2, 3, 4, 5); // 14

```

这跟直接写成 `2 + 3 + 4 + 5` 也没什么区别。再创建一个求平均数的函数：

```typescript
function avg() {
  var sum = 0;
  for (var i = 0, j = arguments.length; i < j; i++) {
    sum += arguments[i];
  }
  return sum / arguments.length;
}
avg(2, 3, 4, 5); // 3.5

```

[展开运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/rest_parameters)来替换 arguments 的使用。

```typescript
function avg(...args) {
  var sum = 0;
  for (let value of args) {
    sum += value;
  }
  return sum / args.length;
}

avg(2, 3, 4, 5); // 3.5
```

允许通过任意函数对象的 [`apply()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法来传递给它一个数组作为参数列表。

```typescript
avg.apply(null, [2, 3, 4, 5]); // 3.5
```



### 12.2 创建匿名函数

下面的函数在语义上与 `function avg()` 相同。可以在代码中的任何地方定义这个函数，就像写普通的表达式一样。

```typescript
var avg = function () {
  var sum = 0;
  for (var i = 0, j = arguments.length; i < j; i++) {
    sum += arguments[i];
  }
  return sum / arguments.length;
};
```

基于这个特性，有人发明出一些有趣的技巧。与 C 中的块级作用域类似，下面这个例子隐藏了局部变量--`立即执行函数IIFE`：

```typescript
var a = 1;
var b = 2;
(function () {
  var b = 3;
  a += b;
})();

a; // 4
b; // 2

```

JavaScript 允许以递归方式调用函数。递归在处理树形结构（比如浏览器 [DOM](https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model)）时非常有用。

```typescript
function countChars(elm) {
  if (elm.nodeType == 3) {
    // 文本节点
    return elm.nodeValue.length;
  }
  var count = 0;
  for (var i = 0, child; (child = elm.childNodes[i]); i++) {
    count += countChars(child);
  }
  return count;
}

```



## 十三、自定义对象

> 介绍从函数 到 对象的演变过程，涉及this 、prototype、call和apply

- 自定义对象概念：指数据和在这些数据上进行的操作的集合。`JavaScript 是一种基于原型的编程语言，并没有 class 语句，而是把函数用作类`。

```typescript
function makePerson(first, last) {
  return {
    first: first,
    last: last,
    fullName: function () {
      return this.first + " " + this.last;
    },
    fullNameReversed: function () {
      return this.last + ", " + this.first;
    },
  };
}
s = makePerson("Simon", "Willison");
s.fullName(); // "Simon Willison"
s.fullNameReversed(); // Willison, Simon

```



- 关键字 [`this`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)。
  - 函数中使用，`this` 指代当前的对象，即用[点或者方括号](https://developer.mozilla.org/zh-CN/docs/JavaScript/Reference/Operators/Member_Operators)来访问属性或方法
  - 如果并没有使用“点”运算符调用某个对象，那么 `this` 将指向全局对象（global object）



- 原型 prototype
  - 原型链，可被`Person` 的所有实例共享的对象
  - 试图访问 `Person` 某个实例没有定义的属性，会向上访问  `Person.prototype` 

```typescript
function Person(first, last) {
  this.first = first;
  this.last = last;
}
Person.prototype.fullName = function () {
  return this.first + " " + this.last;
};
Person.prototype.fullNameReversed = function () {
  return this.last + ", " + this.first;
};

```

```typescript
s = new Person("Simon", "Willison");
s.firstNameCaps(); // TypeError on line 1: s.firstNameCaps is not a function

Person.prototype.firstNameCaps = function () {
  return this.first.toUpperCase();
};
s.firstNameCaps(); // SIMON

```



```typescript
var s = "Simon";
s.reversed(); // TypeError on line 1: s.reversed is not a function

String.prototype.reversed = function () {
  var r = "";
  for (var i = this.length - 1; i >= 0; i--) {
    r += this[i];
  }
  return r;
};
s.reversed(); // nomiS

```

:bulb: 原型链的根节点是 `Object.prototype`
