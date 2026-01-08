# TS值类型

## 常用类型

基本：number、string、boolean、bigint、symbol、undefined、null

复杂：array、object、tuple、enum

特殊：any、unknown、void

```typescript
//基本--------------------------------------------------------------------
const myNumber: string[] = ["item1", "item2", "item3"];
const myNumber: Array<string> = ["item1", "item2"];


//复杂------------------------------------------------------------------------------
//tuple 已知数量 和 类型的数组
let x: [string, number] = ["hello", 10];

//enum 一组命名常量
enum Color {
  Red,
  Green,
  Blue
}
let c: Color = Color.Green;


//特殊-----------------------------------------------------------------------
//any 类型不限，随意
let anything: any = "hello";
anything = 10;

//unknown 表示未知类型，使用前需要类型检查
let notSure: unknown = 4;
if (typeof notSure === "number") {
    let sure: number = notSure;
}

//void 没有返回值
function warnUser(): void {
    console.log("This is a warning message");
}

//扩展--------------------------------------------------------------
//支持类型或 和 接口类型定义
let id: string | number;
let person: Person & Serializable;

interface MyObject {
  [key: string]: number;
}

const myArray: MyObject[] = [
  { age: 25 },
  { height: 180 },
  { score: 100 }
];
```



## 泛型对象类型

泛型接口

```typescript
//定义一个可以操作不同类型数据的容器接口
interface Container<T> {
    value: T;
}

let stringContainer: Container<string> = { value: "Hello, TypeScript" };
let numberContainer: Container<number> = { value: 42 };

```



泛型类

```typescript
//定义一个泛型栈类
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }
}

let stringStack = new Stack<string>();
stringStack.push("Hello");
console.log(stringStack.pop()); // "Hello"

let numberStack = new Stack<number>();
numberStack.push(42);
console.log(numberStack.pop()); // 42

```



泛型函数

```typescript
//定义函数的参数 和 返回值类型
function identity<T>(arg: T): T {
    return arg;
}

let output1 = identity<string>("myString");
let output2 = identity<number>(100);

```



泛型函数

```typescript
//定义智能操作具有length属性的泛型函数
interface Lengthwise {
    length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}

logLength("Hello"); // 输出: 5
logLength([1, 2, 3]); // 输出: 3
// logLength(42); // 错误: number 没有 length 属性

```

