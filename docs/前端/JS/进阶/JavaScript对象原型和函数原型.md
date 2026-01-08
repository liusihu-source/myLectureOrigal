# JavaScript 对象原型 和 函数原型

> - `__proto__` 将对象和原型连接起来组成了原型链。
> - 所有的函数的 `__proto__` 都指向Function原型对象。
> - **js的原型链最终指向的是Object原型对象(Object.prototype)**,  Object.prototype 指向 null

## 一、prototype和constructor

**prototype指向函数的原型对象，这是一个显式原型属性，只有函数才拥有该属性**。**constructor**指向原型对象的构造函数。

![img](JavaScript对象原型和函数原型.assets/v2-9fac94a2b19528c4c6f5dbe3357426c5_720w.webp)

## 二、`__proto__`

每个对象都有`_proto_`，它是隐式原型属性，指向了创建该对象的构造函数原型。**由于js中是没有类的概念，而为了实现继承，通过 `_proto_` 将对象和原型联系起来组成原型链**，就可以让对象访问到不属于自己的属性。

![img](JavaScript对象原型和函数原型.assets/v2-3b976f8c6a6823839b52ca7798c16891_720w.webp)

Foo、Function和Object都是函数，它们的`_proto_`都指向`Function.prototype`。

![图片](JavaScript对象原型和函数原型.assets/640.png)

![图片](JavaScript对象原型和函数原型.assets/640-1698128093989-13.png)

![图片](JavaScript对象原型和函数原型.assets/640-1698128099931-16.png)

## 三、原型对象之间的关系

![img](JavaScript对象原型和函数原型.assets/v2-fa1f64d5c02b1f346b0b2b6d73d7c218_720w.webp)

它们的`_proto_`都指向了`Object.prototype`。js原型链最终指向的是Object原型对象

![image-20231024141934580](JavaScript对象原型和函数原型.assets/image-20231024141934580.png)

## 四、`__proto__`原型链图

![img](JavaScript对象原型和函数原型.assets/v2-5786ab539108c04cad410e70a480e17c_720w.webp)

## 五、总结

- Function 和 Object 是两个函数。
- **`__proto__`** 将对象和原型连接起来组成了原型链。
- 所有的函数的 `__proto__` 都指向Function原型对象。
- **js的原型链最终指向的是Object原型对象(Object.prototype)**,  Object.prototype 指向 null

![img](JavaScript对象原型和函数原型.assets/v2-ef620fd88d566ba51c73e561f4f53ca3_720w.webp)