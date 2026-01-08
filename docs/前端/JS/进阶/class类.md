# Class类 

> 类是用于创建对象的模板。

## 一、定义类

两部分：类表达式 和 类声明。

### 1.1 类声明

使用`class`关键字的类名

```typescript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}

```

:warning: 函数声明 和 类声明有个重要区别。`函数声明会提升，类不存在声明提升`

```typescript
let p = new Rectangle(); // ReferenceError

class Rectangle {}
```



### 1.2 类表达式

```typescript
// 未命名/匿名类
let Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};
console.log(Rectangle.name);
// output: "Rectangle"

```



## 二、类体和方法定义

一对花括号 `{}` 中部分，定义方法和属性

### 2.1 严格模式

检验严格模式两种方法：在Js脚本中最顶行输入`"use strict"`; 通过window 或者 global的strict mode判断



### 2.2 构造函数

- 一个类只能拥有一个名为[constructor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/constructor)的特殊方法

- constructor内可用 `super` 关键字调用父类的构造函数。



### 2.3 静态方法

[`static`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/static) 定义静态方法。

:bulb: 通常用于创建工具函数，如Math.max()

```typescript
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static displayName = "Point";

  static distance(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.hypot(dx, dy);
  }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);
p1.displayName;
// undefined
p1.distance;
// undefined

console.log(Point.displayName);
// "Point"
console.log(Point.distance(p1, p2));
// 7.0710678118654755

```



### 2.4 用原型和静态方法绑定this

当调用静态或原型方法时没有指定 *this* 的值，那么方法内的 *this* 值将被置为 **`undefined`**。

```typescript
class Animal {
  speak() {
    return this;
  }
  static eat() {
    return this;
  }
}

let obj = new Animal();
obj.speak(); // Animal {}
let speak = obj.speak;
speak(); // undefined

Animal.eat(); // class Animal
let eat = Animal.eat;
eat(); // undefined

```



### 2.5 实例属性

实例的属性必须定义在类的方法里：

```typescript
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```

静态的或原型的数据属性必须定义在类定义的外面。

```typescript
Rectangle.staticWidth = 20;
Rectangle.prototype.prototypeWidth = 25;
```



### 2.7 字段声明

公有字段声明（`类似java 中的public，只是public 默认不写`）

使用 JavaScript 字段声明语法，上面的示例可以写成

```typescript
class Rectangle {
  height = 0;
  width;
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
```



私有字段声明

从类外部引用私有字段是错误的。它们只能在类里面中读取或写入。



## 三、使用extends扩展子类

[`extends`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes/extends) 关键字在 *类声明* 或 *类表达式* 中用于创建一个类作为另一个类的一个子类。

```typescript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name); // 调用超类构造函数并传入 name 参数
  }

  speak() {
    console.log(`${this.name} barks.`);
  }
}

var d = new Dog("Mitzie");
d.speak(); // 'Mitzie barks.'

```

如果子类中定义了构造函数，那么它必须先调用 `super()` 才能使用 `this` 。

也可以继承传统的基于函数的“类”：

```typescript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  console.log(this.name + " makes a noise.");
};

class Dog extends Animal {
  speak() {
    super.speak();
    console.log(this.name + " barks.");
  }
}

var d = new Dog("Mitzie");
d.speak(); //Mitzie makes a noise.  Mitzie barks.

```

:warning: 类不能继承常规对象（不可构造的），如果要继承常规对象，可使用Object.setPrototypeOf()

```typescript
var Animal = {
  speak() {
    console.log(this.name + " makes a noise.");
  },
};

class Dog {
  constructor(name) {
    this.name = name;
  }
}

Object.setPrototypeOf(Dog.prototype, Animal); // 如果不这样做，在调用 speak 时会返回 TypeError

var d = new Dog("Mitzie");
d.speak(); // Mitzie makes a noise.

```

## 四、Species

尝试在派生数组类或其他子类中返回Array类或其他父类，可通过species方式覆盖默认的构造函数。如下：

```typescript
class MyArray extends Array {
  // Overwrite species to the parent Array constructor
  static get [Symbol.species]() {
    return Array;
  }
}
var a = new MyArray(1, 2, 3);
var mapped = a.map((x) => x * x);

console.log(mapped instanceof MyArray);
// false
console.log(mapped instanceof Array);
// true

```



## 五、使用super调用超类

[`super`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/super) 关键字用于调用对象的父对象上的函数。

```typescript
class Cat {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(this.name + " makes a noise.");
  }
}

class Lion extends Cat {
  speak() {
    super.speak();
    console.log(this.name + " roars.");
  }
}

```



## 六、Mix-ins / 混入

> 在JavaScript中，一个ES类只能有一个单超类，所以想要从工具类实现多重继承是不可的。
>
> `Mix-ins(mixture-inheritance) / 混入`的概念：一种面向对象编程中将特定功能混合到类中的方式。从而使类具有这些功能的能力。

```typescript
const CanEat = {
  eat() {
    console.log('Eating...');
  }
};

const CanSleep = {
  sleep() {
    console.log('Sleeping...');
  }
};

class Person {}

// 使用 Object.assign() 将多个 Mix-ins 混入到 Person 类中
Object.assign(Person.prototype, CanEat, CanSleep);

const person = new Person();
person.eat(); // 输出: Eating...
person.sleep(); // 输出: Sleeping...

```

