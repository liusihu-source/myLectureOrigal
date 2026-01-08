# NodeJS实用总结 

> https://www.nodejs.com.cn/7-days-nodejs/#1.1

## 一、NodeJS基础

### 1.1 概念

- 脚本语言都需要一个解析器才能运行。对于写在HTML页面里的JS，浏览器充当了解析器的角色。而对于需要独立运行的JS，`NodeJS就是一个解析器`。

- 每一种解析器都是一个运行环境，不但允许JS定义各种数据结构，进行各种计算，还允许JS使用运行环境提供的内置对象和方法做一些事情。例如运行在浏览器中的JS的用途是操作DOM，浏览器就提供了`document`之类的内置对象。而运行在NodeJS中的JS的用途是操作磁盘文件或搭建HTTP服务器，NodeJS就相应提供了`fs`、`http`等内置对象。



### 1.2 用处

- Web服务
- 调试JS代码片段



### 1.3 安装

windows方式：

略，看NodeJS简介篇即可。



linux方式：

Linux系统下没有现成的安装程序可用，虽然一些发行版可以使用`apt-get`之类的方式安装，但不一定能安装到最新版。因此Linux系统下一般使用以下方式编译方式安装NodeJS。

1. 确保系统下g++版本在4.6以上，python版本在2.6以上。

2. 从[nodejs.org](http://nodejs.org/download/)下载`tar.gz`后缀的NodeJS最新版源代码包并解压到某个位置。

3. 进入解压到的目录，使用以下命令编译和安装。

   ```bash
    $ ./configure
    $ make
    $ sudo make install
   ```



### 1.4 使用

打开终端，键入`node`进入命令交互模式，可以输入一条代码语句后立即执行并显示结果，例如：

```bash
$ node
> console.log('Hello World!');
Hello World!
```



如果要运行一大段代码的话，可以先写一个JS文件再运行。例如有以下`hello.js`。

```typescript
function hello() {
    console.log('Hello World!');
}
hello();
```



写好后在终端下键入`node hello.js`运行，结果如下：

```bash
$ node hello.js
Hello World!
```

![image-20231225224649099](NodeJS实用总结.assets/image-20231225224649099.png)

:bulb: linux下使用权限问题

在Linux系统下，使用NodeJS监听80或443端口提供HTTP(S)服务时需要root权限，有两种方式可以做到。

一种方式是使用`sudo`命令运行NodeJS。例如通过以下命令运行的`server.js`中有权限使用80和443端口。一般推荐这种方式，可以保证仅为有需要的JS脚本提供root权限。

```bash
$ sudo node server.js
```



另一种方式是使用`chmod +s`命令让NodeJS总是以root权限运行，具体做法如下。因为这种方式让任何JS脚本都有了root权限，不太安全，因此在需要很考虑安全的系统下不推荐使用。

```bash
$ sudo chown root /usr/local/bin/node
$ sudo chmod +s /usr/local/bin/node
```



### 1.5 模块

> - 编写稍大一点的程序时一般都会将代码模块化。在NodeJS中，一般将代码合理拆分到不同的JS文件中，每一个文件就是一个模块，而文件路径就是模块名。
> - 在编写每个模块时，都有`require`、`exports`、`module`三个预先定义好的变量可供使用。

#### 1.5.1  require :star:

`require`函数用于在当前模块中加载和使用别的模块，传入一个模块名，返回一个模块导出对象。模块名可使用相对路径（以`./`开头），或者是绝对路径（以`/`或`C:`之类的盘符开头）。另外，模块名中的`.js`扩展名可以省略。以下是一个例子。

```typescript
var foo1 = require('./foo');
var foo2 = require('./foo.js');
var foo3 = require('/home/user/foo');
var foo4 = require('/home/user/foo.js');

// foo1至foo4中保存的是同一个模块的导出对象。
```



另外，可以使用以下方式加载和使用一个JSON文件。

```typescript
var data = require('./data.json');
```



#### 1.5.2 exports :star: 

`exports`对象是当前模块的导出对象，用于导出模块公有方法和属性。别的模块通过`require`函数使用当前模块时得到的就是当前模块的`exports`对象。以下例子中导出了一个公有方法。

```typescript
exports.hello = function () {
    console.log('Hello World!');
};
```



#### 1.5.3 module

通过`module`对象可以访问到当前模块的一些相关信息，`但最多的用途是替换当前模块的导出对象`。例如模块导出对象默认是一个普通对象，如果想改成一个函数的话，可以使用以下方式。

```typescript
module.exports = function () {
    console.log('Hello World!');
};
//以上代码中，模块默认导出对象被替换为一个函数。
```



#### 1.5.4 模块初始化

- 一个模块中的JS代码`仅在模块第一次被使用时执行一次，并在执行过程中初始化模块的导出对象`。

- 之后，`缓存起来的导出对象被重复利用`。



#### 1.5.5 主模块

通过命令行参数传递给NodeJS以启动程序的模块被称为主模块。主模块负责调度组成整个程序的其它模块完成工作。例如通过以下命令启动程序时，`main.js`就是主模块。例如有以下目录。

```bash
- /home/user/hello/
    - util/
        counter.js
    main.js
```

其中`counter.js`内容如下：

```typescript
var i = 0;

function count() {
    return ++i;
}

exports.count = count;
```

该模块内部定义了一个私有变量`i`，并在`exports`对象导出了一个公有方法`count`。

主模块`main.js`内容如下：

```typescript
var counter1 = require('./util/counter');
var counter2 = require('./util/counter');

console.log(counter1.count());
console.log(counter2.count());
console.log(counter2.count());
```



运行该程序的结果如下：

```bash
$ node main.js
1
2
3
```

> :bulb: 可以看到，`counter.js`并没有因为被require了两次而初始化两次。



:book: 虽然一般使用JS编写模块，但`NodeJS也支持使用C/C++编写二进制模块。编译好的二进制模块除了文件扩展名是.node外，和JS模块的使用方式相同`。虽然二进制模块能使用操作系统提供的所有功能，拥有无限的潜能，但对于前端同学而言编写过于困难，并且难以跨平台使用。



## 二、代码的组织 和 部署

任何项目开发前，都需要有个入口，以及后续的目录结构等。同样的，`使用NodeJS编写程序前，为了有个良好的开端，首先需要准备好代码的目录结构和部署方式，本节内容将介绍相关的知识`。



### 2.1 模块路径解析规则 :star:

`require`函数支持三种模块引入方式

:bulb: 前两种引入方式在模块之间建立了强耦合关系，一旦某个模块文件的存放位置需要变更，使用该模块的其它模块的代码也需要跟着调整。因此也有第三种方式

1. 支持斜杠（`/`）或盘符（`C:`）开头的绝对路径

2. 支持`./`开头的相对路径。

   - 但这两种路径在模块之间建立了强耦合关系，一旦某个模块文件的存放位置需要变更，使用该模块的其它模块的代码也需要跟着调整，变得牵一发动全身。因此，`require`函数支持第三种形式的路径，写法类似于`foo/bar`，并依次按照以下规则解析路径，直到找到模块位置。

3. 比如需要引入require('foo/bar')

   - 内置模块

     - 如果传递给`require`函数的是NodeJS内置模块名称，不做路径解析，直接返回内部模块的导出对象，例如`require('fs')`。

   - node_modules目录

     - NodeJS定义了一个特殊的`node_modules`目录用于存放模块。例如某个模块的绝对路径是`/home/user/hello.js`，在该模块中使用`require('foo/bar')`方式加载模块时，则NodeJS依次尝试使用以下路径。

       ```bash
        /home/user/node_modules/foo/bar
        /home/node_modules/foo/bar
        /node_modules/foo/bar
       ```

   - NODE_PATH环境变量

     - 与PATH环境变量类似，NodeJS允许通过NODE_PATH环境变量来指定额外的模块搜索路径。NODE_PATH环境变量中包含一到多个目录路径，路径之间在Linux下使用`:`分隔，在Windows下使用`;`分隔

       ```bash
        NODE_PATH=/home/user/lib:/home/lib
       ```

     - 当使用`require('foo/bar')`的方式加载模块时，则NodeJS依次尝试以下路径

       ```bash
        /home/user/lib/foo/bar
        /home/lib/foo/bar
       ```

> :bulb: 以上方式中，自建的文件一般以相对路径引入，再有内置模块 和 node_module模块较为常用



### 2.2 package包

> - `JS模块的基本单位是单个JS文件`，但复杂些的模块往往由多个子模块组成。
> - 为了便于管理和使用，我们可以把由多个子模块组成的大模块称做`包`，并把所有子模块放在同一个目录里。
> - `在组成一个包的所有子模块中，需要有一个入口模块，入口模块的导出对象被作为包的导出对象`。



#### 2.2.1 自建包结构

如有如下目录结构

```bash
- /home/user/lib/
    - cat/
        head.js
        body.js
        main.js
```

其中`cat`目录定义了一个包，其中包含了3个子模块。`main.js`作为入口模块，其内容如下：

```typescript
var head = require('./head');
var body = require('./body');

exports.create = function (name) {
    return {
        name: name,
        head: head.create(),
        body: body.create()
    };
};
```

其他模块使用包的时候，使用`require('/home/user/lib/cat/main')`能达到目的，但`入口模块名称出现在路径里看上去不是个好主意。因此我们需要做点额外的工作，让包使用起来更像是单个模块`。



#### 2.2.2 npm注册表中软件包结构:star:

**index.js**

当模块的文件名是`index.js`，加载模块时可以使用模块所在目录的路径代替模块文件路径，因此接着上例，以下两条语句等价。

```typescript
var cat = require('/home/user/lib/cat');
var cat = require('/home/user/lib/cat/index');
```

现在只需把包目录路径传递给`require`函数，感觉上整个目录被当作单个模块使用，更有`整体感`。



**package.json**

如果想自定义入口模块的文件名和存放位置，就需要在包目录下包含一个`package.json`文件，并在其中指定入口模块的路径。上例中的`cat`模块可以重构如下。

```bash
- /home/user/lib/
    - cat/
        + doc/
        - lib/
            head.js
            body.js
            main.js
        + tests/
        package.json
```

其中，package.json内容如下：

```typescript
{
    "name": "cat",
    "main": "./lib/main.js"
}
```

这样可以使用`require('/home/user/lib/cat')`的方式加载模块。NodeJS会根据包目录下的`package.json`找到入口模块所在位置。

![image-20231226102741918](NodeJS实用总结.assets/image-20231226102741918.png)



### 2.3 命令行程序

使用NodeJS编写的东西，要么是一个包，要么是一个命令行程序，而前者最终也会用于开发后者。



使用NodeJS写个程序，可以把命令行参数原样打印出来。该程序很简单，在主模块内实现了所有功能。并且写好后，把该程序部署在`/home/user/bin/node-echo.js`这个位置。为了在任何目录下都能运行该程序，需要使用以下终端命令。

```bash
$ node /home/user/bin/node-echo.js Hello World
Hello World
```

这种使用方式看起来不怎么像是一个命令行程序，下边的才是我们期望的方式。

```bash
$ node-echo Hello World
```



#### 2.3.1 Linux

在Linux系统下，可以把JS文件当作shell脚本来运行，从而达到上述目的，具体步骤如下：

1. 在shell脚本中，可以通过`#!`注释来指定当前脚本使用的解析器。所以首先在`node-echo.js`文件顶部增加以下一行注释，表明当前脚本使用NodeJS解析。

   ```
    #! /usr/bin/env node
   ```

   NodeJS会忽略掉位于JS模块首行的`#!`注释，不必担心这行注释是非法语句。

2. 然后使用以下命令赋予`node-echo.js`文件执行权限。

   ```
    $ chmod +x /home/user/bin/node-echo.js
   ```

3. 最后在PATH环境变量中指定的某个目录下，例如在`/usr/local/bin`下边创建一个软链文件，文件名与希望使用的终端命令同名，命令如下：

   ```
    $ sudo ln -s /home/user/bin/node-echo.js /usr/local/bin/node-echo
   ```

这样就可以在任何目录下使用`node-echo`命令了。



#### 2.3.2 Windows:star:

在Windows系统下的做法完全不同，需要使用`.cmd`文件来解决问题。假设`node-echo.js`存放在`C:\Users\user\bin`目录，并且该目录已经添加到PATH环境变量里了。接下来需要在该目录下新建一个名为`node-echo.cmd`的文件，文件内容如下：

```
@node "C:\User\user\bin\node-echo.js" %*
```

这样处理后，我们就可以在任何目录下使用`node-echo`命令了。



### 2.4 工程目录 :star:

完整地规划一个工程目录。以编写一个命令行程序为例，一般`会同时提供命令行模式和API模式两种使用方式`，并且会`借助三方包来编写代码`。除了代码外，一个完整的程序也应该有`自己的文档和测试用例`。因此，一个标准的工程目录都看起来像下边这样。

```bash
- /home/user/workspace/node-echo/   # 工程目录
    - bin/                          # 存放命令行相关代码
        node-echo
    + doc/                          # 存放文档
    - lib/                          # 存放API相关代码
        echo.js
    - node_modules/                 # 存放三方包
        + argv/
    + tests/                        # 存放测试用例
    package.json                    # 元数据文件
    README.md                       # 说明文件
```

其中部分文件内容如下：

```typescript
/* bin/node-echo */
var argv = require('argv'),
    echo = require('../lib/echo');
console.log(echo(argv.join(' ')));

/* lib/echo.js */
module.exports = function (message) {
    return message;
};

/* package.json */
{
    "name": "node-echo",
    "main": "./lib/echo.js"
}
```

![image-20231226110251395](NodeJS实用总结.assets/image-20231226110251395.png)

![image-20231226112423444](NodeJS实用总结.assets/image-20231226112423444.png)

![image-20231226112439351](NodeJS实用总结.assets/image-20231226112439351.png)

![image-20231226112531207](NodeJS实用总结.assets/image-20231226112531207.png)

![image-20231226112602697](NodeJS实用总结.assets/image-20231226112602697.png)



### 2.5 NPM

NPM是随同NodeJS一起安装的包管理工具，能解决NodeJS代码部署上的很多问题，常见的使用场景有以下几种：

- `允许用户从NPM服务器下载别人编写的三方包到本地使用`。
- `允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用`。
- 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用。

> :bulb: 由此NPM建立了一个NodeJS生态圈，NodeJS开发者和用户可以在里边互通有无。



#### 2.5.1 下载第三方包

> 需要使用三方包时，首先得知道有哪些包可用。[npmjs.org](https://npmjs.org/) 提供了搜索框可以根据包名来搜索

如上边例子中的`argv`，就可以在工程目录下打开终端，使用以下命令来下载三方包。

```bash
$ npm install argv@0.0.1
...
argv@0.0.1 node_modules\argv
```



- 下载好之后，`argv`包就放在了工程目录下的`node_modules`目录中，因此在代码中只需要通过`require('argv')`的方式就好，无需指定三方包路径。

```json
{
    "name": "node-echo",
    "main": "./lib/echo.js",
    "dependencies": {
        "argv": "0.0.2"
    }
}

```



- 以上命令默认下载最新版三方包，如果想要下载指定版本的话，可以在包名后边加上`@<version>`，例如通过以下命令可下载0.0.1版的`argv`。

```bash
$ npm install argv@0.0.1
...
argv@0.0.1 node_modules\argv
```

:warning: 现在的argv包已经过时了，可以使用process.argv替换



若使用到的三方包比较多，可直接根据package.json内的dependencies，利用npm install / yarn install等。



#### 2.5.2 安装命令行程序 :star::star: 

从NPM服务上下载安装一个命令行程序的方法与三方包类似。使用如下命令即可

```bash
$ npm install node-echo -g
```



参数中的`-g`表示全局安装，因此`node-echo`会默认安装到以下位置，并且NPM会自动创建好Linux系统下需要的软链文件或Windows系统下需要的`.cmd`文件。

```bash
- /usr/local/               # Linux系统下
    - lib/node_modules/
        + node-echo/
        ...
    - bin/
        node-echo
        ...
    ...

- %C:\Users\小Tiger\AppData\Roaming\npm\            # Windows系统下
    - node_modules\
        + node-echo\
        ...
    node-echo.cmd
    ...
```

如下图中的yarn 和 json-server

![image-20231226132233617](NodeJS实用总结.assets/image-20231226132233617.png)



#### 2.5.3 发布代码

第一次使用NPM发布代码前需要注册一个账号。终端下运行`npm adduser`，之后按照提示做即可。账号搞定后，接着我们需要编辑`package.json`文件，加入NPM必需的字段。接着上边`node-echo`的例子，`package.json`里必要的字段如下。

```json
{
    "name": "node-echo",           # 包名，在NPM服务器上须要保持唯一
    "version": "1.0.0",            # 当前版本号
    "dependencies": {              # 三方包依赖，需要指定包名和版本号
        "argv": "0.0.2"
      },
    "main": "./lib/echo.js",       # 入口模块位置
    "bin" : {
        "node-echo": "./bin/node-echo"      # 命令行程序名和主模块位置
    }
}
```

在当下目录中运行`npm publish`即可发布代码了



#### 2.5.4 版本号:star:

语义版本号分为`X.Y.Z`三位，分别代表主版本号、次版本号和补丁版本号

```bash
+ 如果只是修复bug，需要更新Z位。

+ 如果是新增了功能，但是向下兼容，需要更新Y位。

+ 如果有大变动，向下不兼容，需要更新X位。
```



#### 2.5.5 其他命令

NPM还提供了很多功能，`package.json`里也有很多其它有用的字段。可以在[npmjs.org/doc/](https://npmjs.org/doc/)查看官方文档



## 三、文件操作:star: 

### 3.1 文件拷贝

#### 3.1.1 小文件拷贝

使用NodeJS内置的`fs`模块简单实现这个程序如下。

```typescript
var fs = require('fs');

function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
```

以上程序使用`fs.readFileSync`从源路径读取文件内容，并使用`fs.writeFileSync`将文件内容写入目标路径。

> :bulb: `process`是一个全局变量，可通过`process.argv`获得命令行参数。由于`argv[0]`固定等于NodeJS执行程序的绝对路径，`argv[1]`固定等于主模块的绝对路径，因此第一个命令行参数从`argv[2]`这个位置开始。



#### 3.1.2 大文件拷贝

上边的程序拷贝一些小文件没啥问题，但这种一次性把所有文件内容都读取到内存中后再一次性写入磁盘的方式不适合拷贝大文件，内存会爆仓。对于大文件，只能读一点写一点，直到完成拷贝。因此上边的程序需要改造如下。

```typescript
var fs = require('fs');

function copy(src, dst) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));
```

以上程序使用`fs.createReadStream`创建了一个源文件的只读数据流，并使用`fs.createWriteStream`创建了一个目标文件的只写数据流，并且用`pipe`方法把两个数据流连接了起来。连接起来后发生的事情，说得抽象点的话，水顺着水管从一个桶流到了另一个桶。



### 3.2 API概述 :star:

> 官方API文档：https://nodejs.org/docs/latest/api/



#### 3.2.1 Buffer

:bulb: **官方文档：** http://nodejs.org/api/buffer.html

JS语言自身只有字符串数据类型，没有二进制数据类型，因此NodeJS提供了一个与`String`对等的全局构造函数`Buffer`来提供对二进制数据的操作。除了可以读取文件得到`Buffer`的实例外，还能够直接构造，例如：

```bash
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
```



`Buffer`与字符串类似，除了可以用`.length`属性得到字节长度外，还可以用`[index]`方式读取指定位置的字节，例如：

```typescript
bin[0]; // => 0x68;
```



`Buffer`与字符串能够互相转化，例如可以使用指定编码将二进制数据转化为字符串：

```typescript
var str = bin.toString('utf-8'); // => "hello"

var bin = new Buffer('hello', 'utf-8'); // => <Buffer 68 65 6c 6c 6f>
```



:star: `Buffer`与字符串有一个重要区别。字符串是只读的（字面量），并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变。至于`Buffer`，更像是可以做指针操作的C语言数组。例如，可以用`[index]`方式直接修改某个位置的字节。

```typescript
bin[0] = 0x48;
```

而`.slice`方法也不是返回一个新的`Buffer`，而更像是返回了指向原`Buffer`中间的某个位置的指针，如下所示。

```typescript
[ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]
    ^           ^
    |           |
   bin     bin.slice(2)
```

因此对`.slice`方法返回的`Buffer`的修改会作用于原`Buffer`，例如：

```typescript
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2);

sub[0] = 0x65;
console.log(bin); // => <Buffer 68 65 65 6c 6f>
```

也因此，如果想要拷贝一份`Buffer`，得首先创建一个新的`Buffer`，并通过`.copy`方法把原`Buffer`中的数据复制过去。这个类似于申请一块新的内存，并把已有内存中的数据复制过去。以下是一个例子。

```typescript
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 65 6c 6f>
```



#### 3.2.2 Stream

> **官方文档：** http://nodejs.org/api/stream.html

当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，需要用到数据流。NodeJS中通过各种`Stream`来提供对数据流的操作。

以上边的大文件拷贝程序为例，可以为数据来源创建一个只读数据流，以下代码给`doSomething`函数加上了回调，因此可以在处理数据前暂停数据读取，并在处理数据后继续读取数据。：

```typescript
var rs = fs.createReadStream(src);

rs.on('data', function (chunk) {
    rs.pause();
    doSomething(chunk, function () {
        rs.resume();
    });
});

rs.on('end', function () {
    cleanUp();
});
```



此外，也可以为数据目标创建一个只写数据流，以下代码实现了数据从只读数据流到只写数据流的搬运，并包括了防爆仓控制。因为这种使用场景很多，例如上边的大文件拷贝程序，NodeJS直接提供了`.pipe`方法来做这件事情，其内部实现方式与上边的代码类似

```typescript
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);

rs.on('data', function (chunk) {
    if (ws.write(chunk) === false) {
        rs.pause();
    }
});

rs.on('end', function () {
    ws.end();
});

ws.on('drain', function () {
    rs.resume();
});
```



#### 3.2.3 File System

> **官方文档：** http://nodejs.org/api/fs.html

NodeJS通过`fs`内置模块提供对文件的操作。`fs`模块提供的API基本上可以分为以下三类

- 文件属性读写。

  其中常用的有`fs.stat`、`fs.chmod`、`fs.chown`等等。

  - stat：获取文件或目录的信息，如文件大小、创建日期、修改日期等
  - chmod：用于更改文件或目录的权限
  - chown：用于更改文件或目录的所有者（owner）和所属组（group）

- 文件内容读写。

  其中常用的有`fs.readFile`、`fs.readdir`、`fs.writeFile`、`fs.mkdir`等等。

- 底层文件操作。

  其中常用的有`fs.open`、`fs.read`、`fs.write`、`fs.close`等等。

> :bulb: fs.readFile 和 fs.read 两者区别
>
> - fs.readFile 更高级别、更方便的文件读取方法，将文件的全部内容读取到内存中的一个 Buffer 或字符串中，并在读取完成后将其作为整个文件的内容传递给回调函数。
> - fs.read 更底层的方法，用于从文件中读取数据到缓冲区（Buffer）中，需要显式地打开文件描述符，并且需要指定读取的字节数量和读取的起始位置。



NodeJS最精华的异步IO模型在`fs`模块里有着充分的体现，例如上边提到的这些API都通过回调函数传递结果。以`fs.readFile`为例：

```typescript
fs.readFile(pathname, function (err, data) {
    if (err) {
        // Deal with error.
    } else {
        // Deal with data.
    }
});
```

上边代码所示，基本上所有`fs`模块API的回调参数都有两个。第一个参数在有错误发生时等于异常对象，第二个参数始终用于返回API方法执行结果。



此外，`fs`模块的所有异步API都有对应的同步版本，用于无法使用异步操作时，或者同步操作更方便时的情况。同步API除了方法名的末尾多了一个`Sync`之外，异常对象与执行结果的传递方式也有相应变化。同样以`fs.readFileSync`为例：

```typescript
try {
    var data = fs.readFileSync(pathname);
    // Deal with data.
} catch (err) {
    // Deal with error.
}
```



#### 3.2.4 Path

操作文件时难免不与文件路径打交道。NodeJS提供了`path`内置模块来简化路径相关操作，并提升代码可读性。以下分别介绍几个常用的API。



**path.normalize**（返回一个标准化的路径，确保程序在不同系统下都能正确使用相同的路径）

`将传入的路径转换为标准路径`，具体讲的话，除了解析路径中的`.`与`..`外，还能去掉多余的斜杠。如果有程序需要使用路径作为某些数据的索引，但又允许用户随意输入路径时，就需要使用该方法保证路径的唯一性。以下是一个例子：

```typescript
 var cache = {};

  function store(key, value) {
      cache[path.normalize(key)] = value;
  }

  store('foo/bar', 1);
  store('foo//baz//../bar', 2);
  console.log(cache);  // => { "foo/bar": 2 }
```



**path.join** （动态构建文件路径）

将传入的多个路径拼接为标准路径。该方法可避免手工拼接路径字符串的繁琐，并且能在不同系统下正确使用相应的路径分隔符。以下是一个例子：

```typescript
path.join('foo/', 'baz/', '../bar'); // => "foo/bar"
```



**path.extname**（文件类型识别）

当需要根据不同文件扩展名做不同操作时，该方法就显得很好用。以下是一个例子：

```typescript
path.extname('foo/bar.js'); // => ".js"
```



### 3.3 遍历目录

遍历目录是操作文件时的一个常见需求。比如写一个程序，需要找到并处理指定目录下的所有JS文件时，就需要遍历整个目录。



#### 3.3.1 递归算法

遍历目录时一般使用递归算法，这种方法外观是简洁的代码

```typescript
function factorial(n) {
    if (n === 1) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}
```

:warning: 使用递归算法编写的代码虽然简洁，但由于每递归一次就产生一次函数调用，在需要优先考虑性能时，需要把递归算法转换为循环算法，以减少函数调用次数。



#### 3.3.2 遍历算法

目录是一个树状结构，在遍历时一般使用深度优先+先序遍历算法。深度优先，意味着到达一个节点后，首先接着遍历子节点而不是邻居节点。先序遍历，意味着首次到达了某节点就算遍历完成，而不是最后一次返回某节点才算数。因此使用这种遍历方式时，下边这棵树的遍历顺序是`A > B > D > E > C > F`。

```bash
          A
         / \
        B   C
       / \   \
      D   E   F
```



#### 3.3.3 同步遍历 :star: :star:

了解了必要的算法后，我们可以简单地实现以下目录遍历函数。

```typescript
function travel(dir, callback) {
    fs.readdirSync(dir).forEach(function (file) {
        var pathname = path.join(dir, file);

        if (fs.statSync(pathname).isDirectory()) {
            travel(pathname, callback);
        } else {
            callback(pathname);
        }
    });
}
```



可以看到，该函数以某个目录作为遍历的起点。遇到一个子目录时，就先接着遍历子目录。遇到一个文件时，就把文件的绝对路径传给回调函数。回调函数拿到文件路径后，就可以做各种判断和处理。因此假设有以下目录：

```bash
- /home/user/
    - foo/
        x.js
    - bar/
        y.js
    z.css
```



使用上述方法后遍历结果如下

```typescript
travel('/home/user', function (pathname) {
    console.log(pathname);
});

------------------------
/home/user/foo/x.js
/home/user/bar/y.js
/home/user/z.css
```



#### 3.3.4 异步遍历

读取目录或读取文件状态时使用的是异步API，目录遍历函数实现起来会有些复杂，但原理完全相同。`travel`函数的异步版本如下。

```typescript
function travel(dir, callback, finish) {
    fs.readdir(dir, function (err, files) {
        (function next(i) {
            if (i < files.length) {
                var pathname = path.join(dir, files[i]);

                fs.stat(pathname, function (err, stats) {
                    if (stats.isDirectory()) {
                        travel(pathname, callback, function () {
                            next(i + 1);
                        });
                    } else {
                        callback(pathname, function () {
                            next(i + 1);
                        });
                    }
                });
            } else {
                finish && finish();
            }
        }(0));
    });
}
```



### 3.4 文本编码

使用NodeJS编写前端工具时，操作得最多的是文本文件，因此也就涉及到了文件编码的处理问题。

我们常用的文本编码有`UTF8`和`GBK`两种，并且`UTF8`文件还可能带有BOM。在读取不同编码的文本文件时，`需要将文件内容转换为JS使用的UTF8编码字符串后才能正常处理`



#### 3.4.1 BOM移除

BOM用于标记一个文本文件使用Unicode编码，其本身是一个Unicode字符（"\uFEFF"），位于文本文件头部。可使用以下代码判断文件是否包含BOM，把包含的去掉即可。

```typescript
const fs = require('fs');
const path = require('path');

function containsBOM(filepath) {
    const buffer = fs.readFileSync(filepath);

    if (buffer.length >= 3 && buffer[0] === 0xEF && buffer[1] === 0xBB && buffer[2] === 0xBF) {
        return true; // 文件包含BOM
    }

    return false; // 文件不包含BOM
}

function traverseDirectory(dirPath) {
    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            traverseDirectory(filePath); // 如果是目录，递归遍历子目录
        } else if (stats.isFile() && path.extname(file) === '.js') {
            // 判断是否是.js文件
            if (containsBOM(filePath)) {
                console.log(`File ${filePath} contains BOM.`);
            } else {
                console.log(`File ${filePath} does not contain BOM.`);
            }
        }
    });
}

// 指定目录路径
const directoryPath = '/path/to/your/directory';

// 开始遍历目录
traverseDirectory(directoryPath);

```

:bulb: 经过测试，个人建立的js文件一般都不包括BOM

![image-20231227101306524](NodeJS实用总结.assets/image-20231227101306524.png)



#### 3.4.2 GBK转UTF8

NodeJS支持在读取文本文件时，或者在`Buffer`转换为字符串时指定文本编码，但遗憾的是，GBK编码不在NodeJS自身支持范围内。因此，一般借助`iconv-lite`这个三方包来转换编码。使用NPM下载该包后，可以按下边方式编写一个读取GBK文本文件的函数。

```typescript
var iconv = require('iconv-lite');

function readGBKText(pathname) {
    var bin = fs.readFileSync(pathname);

    return iconv.decode(bin, 'gbk');
}
```



## 四、网络操作 :star: 

> - 获取其他源数据
> - 优化前端性能
> - 故障排查

### 4.1 小案例

以下程序创建了一个HTTP服务器并监听`8124`端口，浏览器访问该端口`http://127.0.0.1:8124/`能看到效果。

```typescript
var http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200, { 'Content-Type': 'text-plain' });
    response.end('Hello World\n');
}).listen(8124);
```



### 4.2 API概述

#### 4.2.1 HTTP

> **官方文档：** http://nodejs.org/api/http.html

http模块提供两种使用方式：

- 作为服务端使用时，创建一个HTTP服务器，监听HTTP客户端请求并返回响应。
- 作为客户端使用时，发起一个HTTP客户端请求，获取服务端响应。



:bulb: HTTP请求 和 HTTP响应本质都是数据流，由请求头 和 请求体组成

```typescript
//请求
POST / HTTP/1.1
User-Agent: curl/7.26.0
Host: localhost
Accept: */*
Content-Length: 11
Content-Type: application/x-www-form-urlencoded

Hello World

//响应
HTTP/1.1 200 OK
Content-Type: text/plain
Content-Length: 11
Date: Tue, 05 Nov 2013 05:31:38 GMT
Connection: keep-alive

Hello World
```



做服务端案例

```typescript
http.createServer(function (request, response) {
    var body = [];

    console.log(request.method);
    console.log(request.headers);

    request.on('data', function (chunk) {
        body.push(chunk);
    });

    request.on('end', function () {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
}).listen(80);
```



做客户端案例

```typescript
var options = {
        hostname: 'www.example.com',
        port: 80,
        path: '/upload',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

var request = http.request(options, function (response) {});

request.write('Hello World');
request.end();
```



#### 4.2.2 HTTPS :star: 

:bulb: `https`模块与`http`模块极为类似，区别在于`https`模块需要额外处理SSL（**Secure Sockets Layer**）证书。ssl证书在双端建立加密链接，保护通信内容的机密性 和 完整性。



服务端下

- 增加一个options对象，内部设置key：服务器使用的私钥 和 cert字段：服务器的公钥
- NodeJS支持SNI（Server name indication 服务器名称指示）技术，同一个https服务器下可以根据不同的域名使用不同的证书

```typescript
var options = {
        key: fs.readFileSync('./ssl/default.key'),
        cert: fs.readFileSync('./ssl/default.cer')
    };

var server = https.createServer(options, function (request, response) {
    // ...
});

server.addContext('foo.com', {
    key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.com.key'),
    cert: fs.readFileSync('./ssl/bar.com.cer')
});
```

:bulb: 如果目标服务器使用的SSL证书是自制的，不是从颁发机构购买的，默认情况下`https`模块会拒绝连接，提示说有证书安全问题。在`options`里加入`rejectUnauthorized: false`字段可以禁用对证书有效性的检查，从而允许`https`模块请求开发环境下使用自制证书的HTTPS服务器。



客户端下

同HTTP相同

```typescript
var options = {
        hostname: 'www.example.com',
        port: 443,
        path: '/',
        method: 'GET'
    };

var request = https.request(options, function (response) {});

request.end();
```



#### 4.2.3 URL :star: 

> **官方文档：** http://nodejs.org/api/url.html

处理HTTP请求时`url`模块使用率超高，因为该模块允许`解析URL、生成URL，以及拼接URL`。

认识一个URL字符串整体结构

```json
                           href
 -----------------------------------------------------------------
                            host              path
                      --------------- ----------------------------
 http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
 -----    ---------   --------   ---- -------- ------------- -----
protocol     auth     hostname   port pathname     search     hash
                                                ------------
                                                   query
```



如下示例可将一个URL字符串转为URL对象。

```typescript
url.parse('http://user:pass@host.com:8080/p/a/t/h?query=string#hash');
/* =>
{ protocol: 'http:',
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
*/
```

其中，url.parse方法内部的URL字符串不一定是完整的URL，例如在HTTP服务器回调函数中，`request.url`不包含协议头和域名，但同样可以用`.parse`方法解析。

```typescript
http.createServer(function (request, response) {
    var tmp = request.url; // => "/foo/bar?a=b"
    url.parse(tmp);
    /* =>
    { protocol: null,
      slashes: null,
      auth: null,
      host: null,
      port: null,
      hostname: null,
      hash: null,
      search: '?a=b',
      query: 'a=b',
      pathname: '/foo/bar',
      path: '/foo/bar?a=b',
      href: '/foo/bar?a=b' }
    */
}).listen(80);
```

`.parse`方法还支持第二个和第三个布尔类型可选参数。第二个参数等于`true`时，该方法返回的URL对象中，`query`字段不再是一个字符串，而是一个经过`querystring`模块转换后的参数对象。第三个参数等于`true`时，该方法可以正确解析不带协议头的URL，例如`//www.example.com/foo/bar`。



相反的，format方法可以将一个URL对象转换为URL字符串，示例如下

```typescript
url.format({
    protocol: 'http:',
    host: 'www.example.com',
    pathname: '/p/a/t/h',
    search: 'query=string'
});
/* =>
'http://www.example.com/p/a/t/h?query=string'
*/
```



另外，`.resolve`方法可以用于拼接URL，示例如下

```typescript
url.resolve('http://www.example.com/foo/bar', '../baz');
/* =>
http://www.example.com/baz
*/
```



#### 4.2.4 Query String

> **官方文档：** http://nodejs.org/api/querystring.html

`querystring`模块用于实现URL参数字符串与参数对象的互相转换，示例如下

```typescript
querystring.parse('foo=bar&baz=qux&baz=quux&corge');
/* =>
{ foo: 'bar', baz: ['qux', 'quux'], corge: '' }
*/

querystring.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' });
/* =>
'foo=bar&baz=qux&baz=quux&corge='
*/
```



#### 4.2.5 Zlib

提供了数据压缩和解压的功能



判断客户端是否支持接收gzip响应，并在支持的情况下使用`zlib`模块返回gzip之后的响应体数据

```typescript
http.createServer(function (request, response) {
    var i = 1024,
        data = '';

    while (i--) {
        data += '.';
    }

    if ((request.headers['accept-encoding'] || '').indexOf('gzip') !== -1) {
        zlib.gzip(data, function (err, data) {
            response.writeHead(200, {
                'Content-Type': 'text/plain',
                'Content-Encoding': 'gzip'
            });
            response.end(data);
        });
    } else {
        response.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        response.end(data);
    }
}).listen(80);
```



判断服务端响应是否使用gzip压缩，并在压缩的情况使用`zlib`模块解压响应体数据

```typescript
var options = {
        hostname: 'www.example.com',
        port: 80,
        path: '/',
        method: 'GET',
        headers: {
            'Accept-Encoding': 'gzip, deflate'
        }
    };

http.request(options, function (response) {
    var body = [];

    response.on('data', function (chunk) {
        body.push(chunk);
    });

    response.on('end', function () {
        body = Buffer.concat(body);

        if (response.headers['content-encoding'] === 'gzip') {
            zlib.gunzip(body, function (err, data) {
                console.log(data.toString());
            });
        } else {
            console.log(data.toString());
        }
    });
}).end();
```



#### 4.2.6 Net

> **官方文档：** http://nodejs.org/api/net.html

简单案例



服务端

这个HTTP服务器不管收到啥请求，都固定返回相同的响应

```typescript
net.createServer(function (conn) {
    conn.on('data', function (data) {
        conn.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 11',
            '',
            'Hello World'
        ].join('\n'));
    });
}).listen(80);
```

客户端

Socket客户端在建立连接后发送了一个HTTP GET请求，并通过`data`事件监听函数来获取服务器响应。

```typescript
var options = {
        port: 80,
        host: 'www.example.com'
    };

var client = net.connect(options, function () {
        client.write([
            'GET / HTTP/1.1',
            'User-Agent: curl/7.26.0',
            'Host: www.baidu.com',
            'Accept: */*',
            '',
            ''
        ].join('\n'));
    });

client.on('data', function (data) {
    console.log(data.toString());
    client.end();
});
```



**总结**

- `http`和`https`模块支持服务端模式和客户端模式两种使用方式。
- `request`和`response`对象除了用于读写头数据外，都可以当作数据流来操作。
- `url.parse`方法加上`request.url`属性是处理HTTP请求时的固定搭配。
- 使用`zlib`模块可以减少使用HTTP协议时的数据传输量。
- 通过`net`模块的Socket服务器与客户端可对HTTP协议做底层操作
  - 通常情况下，HTTP 服务器是基于 TCP 的 Socket 服务器构建的，而 Node.js 的 `net` 模块允许在更低级别上直接操作 TCP 和网络通信，因此可以在这个基础上构建和处理 HTTP 协议。



## 五、进程管理

### 5.1 拷贝文件案例

使用NodeJS调用终端命令来简化目录拷贝

```typescript
var child_process = require('child_process');
var util = require('util');

function copy(source, target, callback) {
    child_process.exec(
        util.format('cp -r %s/* %s', source, target), callback);
}

copy('a', 'b', function (err) {
    // ...
});
```

:bulb: `从以上代码中可以看到，子进程是异步运行的，是通过回调函数返回执行结果`



### 5.2 API概述

#### 5.2.1 Process :star:

> **官方文档：** http://nodejs.org/api/process.html

任何一个进程都有启动进程时使用的命令行参数，有标准输入标准输出，有运行权限，有运行环境和运行状态。在NodeJS中，可以通过`process`对象感知和控制NodeJS自身进程的方方面面。另外需要注意的是，`process`不是内置模块，`而是一个全局对象，因此在任何地方都可以直接使用`。



#### 5.2.2 Child Process :star:

> **官方文档：** http://nodejs.org/api/child_process.html

使用``模块可以创建和控制子进程`。该模块提供的API中最核心的是`.spawn`，其余API都是针对特定使用场景对它的进一步封装，算是一种语法糖。

:bulb: 其中.spawn 用于执行外部命令，例如`运行系统命令、执行可执行文件等。它是一个异步操作，允许你在 Node.js 中与其他程序进行交互，比如执行命令、传递参数、接收标准输入输出`等。



#### 5.2.3 Cluster :star:

> **官方文档：** http://nodejs.org/api/cluster.html

`cluster` 模块用于创建多进程的集群，允许 Node.js 应用程序利用多核系统资源，通过将工作负载分布到多个子进程来提高性能和可靠性。



`cluster` 模块的主要作用包括：:star: 

1. **利用多核 CPU**: Node.js 是单线程的，通过 `cluster` 模块，可以充分利用多核 CPU 的优势，创建多个子进程来同时处理请求，提高应用程序的并发处理能力和性能。
2. **负载均衡**: `cluster` 模块提供了一种简单的负载均衡机制。它允许主进程（Master）接收外部的连接，并将连接请求分发到多个子进程（Worker）上去处理。
3. **提高应用的稳定性**: 单个 Node.js 进程崩溃可能导致整个应用程序崩溃，而使用 `cluster` 模块可以创建多个子进程，即使某个子进程出现了问题，其他子进程仍然可以继续工作，提高了应用的稳定性。



### 5.3 应用场景

#### 5.3.1 获取命令行参数(Process) :star:

在NodeJS中可以通过`process.argv`获取命令行参数。但是比较意外的是，`node`执行程序路径和主模块文件路径固定占据了`argv[0]`和`argv[1]`两个位置，而第一个命令行参数从`argv[2]`开始。为了让`argv`使用起来更加自然，可以按照以下方式处理。

```typescript
function main(argv) {
    // ...
}

main(process.argv.slice(2));
```



#### 5.3.2 退出程序(Process) :star:

通常一个程序做完所有事情后就正常退出了，这时程序的退出状态码为`0`。或者一个程序运行时发生了异常后就挂了，这时程序的退出状态码不等于`0`。如果我们在代码中捕获了某个异常，但是觉得程序不应该继续运行下去，需要立即退出，并且需要把退出状态码设置为指定数字`1`

![image-20231228104120029](NodeJS实用总结.assets/image-20231228104120029.png)



#### 5.3.3 控制输入输出(Process)

NodeJS程序的标准输入流（stdin）、一个标准输出流（stdout）、一个标准错误流（stderr）分别对应`process.stdin`、`process.stdout`和`process.stderr`，第一个是只读数据流，后边两个是只写数据流，对它们的操作按照对数据流的操作方式即可。例如，`console.log`可以按照以下方式实现。

```typescript
function log() {
    process.stdout.write(
        util.format.apply(util, arguments) + '\n');
}
```

:bulb: 上述代码使用 `util.format.apply(util, arguments)` 来格式化传入的参数，并通过 `process.stdout.write()` 将格式化后的内容写入标准输出流，并在最后添加换行符 `\n`。



#### 5.3.4 创建子进程(childProcess) :star:

案例

```typescript
var child = child_process.spawn('node', [ 'xxx.js' ]);

child.stdout.on('data', function (data) {
    console.log('stdout: ' + data);
});

child.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
});

child.on('close', function (code) {
    console.log('child process exited with code ' + code);
});
```

上例中使用了`.spawn(exec, args, options)`方法，该方法支持三个参数。第一个参数是执行文件路径，可以是执行文件的相对或绝对路径，也可以是根据PATH环境变量能找到的执行文件名。第二个参数中，数组中的每个成员都按顺序对应一个命令行参数。第三个参数可选，用于配置子进程的执行环境与行为。

另外，上例中虽然通过子进程对象的`.stdout`和`.stderr`访问子进程的输出，但通过`options.stdio`字段的不同配置，可以将子进程的输入输出重定向到任何数据流上，或者让子进程共享父进程的标准输入输出流，或者直接忽略子进程的输入输出。



#### 5.3.5 进程间通讯 :star:

如果父子进程都是NodeJS进程，就可以通过IPC（进程间通讯）双向传递数据。以下是一个例子，类似Vue中的Bus机制

```typescript
/* parent.js */
var child = child_process.spawn('node', [ 'child.js' ], {
        stdio: [ 0, 1, 2, 'ipc' ]
    });

child.on('message', function (msg) {
    console.log(msg);
});

child.send({ hello: 'hello' });

/* child.js */
process.on('message', function (msg) {
    msg.hello = msg.hello.toUpperCase();
    process.send(msg);
});
```

可以看到，父进程在创建子进程时，在`options.stdio`字段中通过`ipc`开启了一条IPC通道，之后就可以监听子进程对象的`message`事件接收来自子进程的消息，并通过`.send`方法给子进程发送消息。在子进程这边，可以在`process`对象上监听`message`事件接收来自父进程的消息，并通过`.send`方法向父进程发送消息。数据在传递过程中，会先在发送端使用`JSON.stringify`方法序列化，再在接收端使用`JSON.parse`方法反序列化。



#### 5.3.6 守护子进程

守护进程一般用于监控工作进程的运行状态，`在工作进程不正常退出时重启工作进程，保障工作进程不间断运行`。以下是一种实现方式。

```typescript
/* daemon.js */
function spawn(mainModule) {
    var worker = child_process.spawn('node', [ mainModule ]);

    worker.on('exit', function (code) {
        if (code !== 0) {
            spawn(mainModule);
        }
    });
}

spawn('worker.js');
```



**总结**

- 使用`process`对象管理自身。
- 使用`child_process`模块创建和管理子进程。



## 六、异步编程::star:

### 6.1 回调 :star: 

:bulb: JS本身是单线程运行的，不可能在一段代码还未结束运行时去运行别的代码，因此也就不存在异步执行的概念。`但是，如果某个函数做的事情是创建一个别的线程或进程，并与JS主线程并行地做一些事情，并在事情做完后通知JS主线程，那情况又不一样了。我们接着看看以下代码。`

```typescript
setTimeout(function () {
    console.log('world');
}, 1000);

console.log('hello');

-- Console ------------------------------
hello
world
```

:bulb: 如同上边所说，JS本身是单线程的，无法异步执行，因此我们可以认为`setTimeout`这类JS规范之外的由运行环境提供的特殊函数做的事情是创建一个平行线程后立即返回，让JS主进程可以接着执行后续代码，并在收到平行进程的通知后再执行回调函数。除了`setTimeout`、`setInterval`这些常见的，这类函数还包括NodeJS提供的诸如`fs.readFile`之类的异步API。



:bulb: 另外，仍然回到JS是单线程运行的这个事实上，这决定了JS在执行完一段代码之前无法执行包括回调函数在内的别的代码。也就是说，即使平行线程完成工作了，通知JS主线程执行回调函数了，回调函数也要等到JS主线程空闲时才能开始执行。



### 6.2 代码设计模式

> 异步编程有很多特有的代码设计模式，为了实现同样的功能，使用同步方式和异步方式编写的代码会有很大差异。以下分别介绍一些常见的模式。

#### 6.2.1  函数返回值

使用一个函数的输出作为另一个函数的输入是很常见的需求，在同步方式下一般按以下方式编写代码：

```typescript
var output = fn1(fn2('input'));
// Do something.
```

而在异步方式下，由于函数执行结果不是通过返回值，而是通过回调函数传递，因此一般按以下方式编写代码：

```typescript
fn2('input', function (output2) {
    fn1(output2, function (output1) {
        // Do something.
    });
});
```

:warning: 可以看到，这种方式就是一个回调函数套一个回调函多，套得太多了很容易写出`>`形状的代码。



#### 6.2.2 遍历数组

在遍历数组时，使用某个函数依次对数据成员做一些处理也是常见的需求。如果函数是同步执行的，一般就会写出以下代码：

```typescript
var len = arr.length,
    i = 0;

for (; i < len; ++i) {
    arr[i] = sync(arr[i]);
}

// All array items have processed.
```



如果函数是异步执行的，以上代码就无法保证循环结束后所有数组成员都处理完毕了。如果数组成员必须一个接一个串行处理，则一般按照以下方式编写异步代码：

```typescript
(function next(i, len, callback) {
    if (i < len) {
        async(arr[i], function (value) {
            arr[i] = value;
            next(i + 1, len, callback);
        });
    } else {
        callback();
    }
}(0, arr.length, function () {
    // All array items have processed.
}));
```



#### 6.2.3 异常处理

JS自身提供的异常捕获和处理机制——`try..catch..`，只能用于同步执行的代码。例子如下

```typescript
function sync(fn) {
    return fn();
}

try {
    sync(null);
    // Do something.
} catch (err) {
    console.log('Error: %s', err.message);
}

-- Console ------------------------------
Error: object is not a function
```

可以看到，异常会沿着代码执行路径一直冒泡，直到遇到第一个`try`语句时被捕获住。



但由于异步函数会打断代码执行路径，异步函数执行过程中以及执行之后产生的异常冒泡到执行路径被打断的位置时，如果一直没有遇到`try`语句，就作为一个全局异常抛出。以下是一个例子。

```typescript
function async(fn, callback) {
    // Code execution path breaks here.
    setTimeout(function ()　{
        callback(fn());
    }, 0);
}

try {
    async(null, function (data) {
        // Do something.
    });
} catch (err) {
    console.log('Error: %s', err.message);
}

-- Console ------------------------------
/home/user/test.js:4
        callback(fn());
                 ^
TypeError: object is not a function
    at null._onTimeout (/home/user/test.js:4:13)
    at Timer.listOnTimeout [as ontimeout] (timers.js:110:15)
```



:bulb:因为代码执行路径被打断了，需要在异常冒泡到断点之前用`try`语句把异常捕获住，并通过回调函数传递被捕获的异常。于是可以像下边这样改造上边的例子。

```typescript
function async(fn, callback) {
    // Code execution path breaks here.
    setTimeout(function ()　{
        try {
            callback(null, fn());
        } catch (err) {
            callback(err);
        }
    }, 0);
}

async(null, function (err, data) {
    if (err) {
        console.log('Error: %s', err.message);
    } else {
        // Do something.
    }
});

-- Console ------------------------------
Error: object is not a function
```



有了异常处理方式后，接着可以想一想一般我们是怎么写代码的。基本上代码都是做一些事情，然后调用一个函数，然后再做一些事情，然后再调用一个函数，如此循环。如果我们写的是同步代码，只需要在代码入口点写一个`try`语句就能捕获所有冒泡上来的异常，示例如下。

```typescript
function main() {
    // Do something.
    syncA();
    // Do something.
    syncB();
    // Do something.
    syncC();
}

try {
    main();
} catch (err) {
    // Deal with exception.
}
```



但是，如果写的是异步代码，由于每次异步函数调用都会打断代码执行路径，只能通过回调函数来传递异常，于是需要在每个回调函数里判断是否有异常发生，于是只用三次异步函数调用，就会产生下边这种代码（回调地域）。

```typescript
function main(callback) {
    // Do something.
    asyncA(function (err, data) {
        if (err) {
            callback(err);
        } else {
            // Do something
            asyncB(function (err, data) {
                if (err) {
                    callback(err);
                } else {
                    // Do something
                    asyncC(function (err, data) {
                        if (err) {
                            callback(err);
                        } else {
                            // Do something
                            callback(null);
                        }
                    });
                }
            });
        }
    });
}

main(function (err) {
    if (err) {
        // Deal with exception.
    }
});
```

可以看到，回调函数已经让代码变得复杂了，而异步方式下对异常的处理更加剧了代码的复杂度。如果NodeJS的最大卖点最后变成这个样子，那就没人愿意用NodeJS了，因此接下来会介绍NodeJS提供的一些解决方案。



