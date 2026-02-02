# Class类

## 一、基础

### 1.1 创建 Class

- 大驼峰;
- class 声明不会发生变量提升;
- 块作用域;



### 1.2 构造函数

- constructor 可选, 默认空函数;
- 定义实例属性和实例方法;

```javascript
const Person = class {
  constructor() {
    console.log("person ctor");
  }
};
```



### 1.3 实例化

- 创建一个 object;
- object 的 `__proto__` 指向 constructor 的 prototype;
- constructor 的 this 指向 object;
- 执行 constructor 内语句;
- 若 constructor 返回一个 object, 则返回该 object, 否则返回新创建的对象;

```javascript
const Person = class {
  constructor() {
    console.log("0");
  }
};
let p1 = new Person(); // 0
```



## 二、类方法

### 2.1 分类

#### 2.1.1 实例方法

在constructure中定义 实例方法、实例属性，不同实例间隔离

```javascript
class Person {
  constructor() {
    this.name = new String("Jack");
    this.sayName = () => console.log(this.name);
    this.nicknames = ["Jake", "J-Dog"];
  }
}

let p1 = new Person(),
p1.sayName(); // Jack
p1.name = p1.nicknames[0];
p1.sayName(); // Jake
```



#### 2.1.2 原型方法

定义在class内部，不同实例间共享

```javascript
class Person {
  constructor() {
    this.locate = () => console.log("instance");
  }
  locate() {
    console.log("prototype");
  }
}
let p = new Person();
p.locate(); // instance
Person.prototype.locate(); // prototype
```

:bulb: 如果全局确定只有一个实例，可以写在原型中。实例一个对象放在pinia中，全局各处使用



#### 2.1.3 访问器方法

- 只定义 get, 表明只读;
- 只定义 set, 表示只写;

```javascript
// 写 name 属性时触发 set
// 读 name 属性时触发 get
class Person {
  set name(newName) {
    this.name_ = newName;
  }
  get name() {
    return this.name_;
  }
}
let p = new Person();
p.name = "Jake";
console.log(p.name); // Jake
```



#### 2.1.4 静态方法

- 定义在 class 对应的 object 上, 不需要实例化即可访问;

```javascript
class Person {
  constructor() {
    // 实例方法
    this.locate = () => console.log("instance", this);
  }
  // 原型方法
  locate() {
    console.log("prototype", this);
  }
  // 静态方法
  static locate() {
    console.log("class", this);
  }
}
let p = new Person();
p.locate(); // instance, Person {}
Person.prototype.locate(); // prototype, {constructor: ... }
Person.locate(); // class, class Person {}
```



### 2.2 两种函数形式

```javascript
class Test {
  // 普通函数
  fun() {
    console.log(this.color);
  }

  // 箭头函数
  arrow = () => {
    console.log(this.color);
  };
}
```

:bulb: this指向问题： 前端-JS-进阶-函数



## 三、类继承

### 3.1 继承基础

- 使用 extends 关键字;
- 子类继承父类所有的属性和方法;

```typescript
class Vehicle {
  identifyPrototype(id) {
    console.log(id, this);
  }
}
```



### 3.2 super

- 子类自定义 constructor 必须使用 super;
  - 只能用于子类 constructor 和 static method 中;
  - 用于调用父类的 constructor 并赋值给子类的 this;
- 当不自定义 constructor 时, 自动调用 super;

```typescript
class Vehicle {
  constructor() {
    this.hasEngine = true;
  }
}
class Bus extends Vehicle {
  constructor() {
    // 调用 super() 之前, 子类无法使用 this
    // 自定义 constructor 必须使用 super(), 或返回一个自定义 object
    super();
    console.log(this instanceof Vehicle); // true
    console.log(this); // Bus { hasEngine: true }
  }
}
```



### 3.3 抽象基类

- 不会被实例化的类;
- 使用 new.target 属性, 禁止实例化;

```typescript
class Vehicle {
  constructor() {
    console.log(new.target);
    if (new.target === Vehicle) {
      throw new Error("Vehicle cannot be directly instantiated");
    }
  }
}
// Derived class
class Bus extends Vehicle {}
new Bus(); // class Bus {}
new Vehicle(); // class Vehicle {}
// Error: Vehicle cannot be directly instantiated
```



### 3.4 类进阶

#### class本质

```javascript
const Person = class {};
console.log(Person); // class Person {}
console.log(typeof Person); // function
```

#### instanceof 操作符

- 检查实例所属类;

```typescript
class Person {}
let p = new Person();
console.log(p instanceof Person); // true
```

#### 实现方式

- 寄生组合式继承

