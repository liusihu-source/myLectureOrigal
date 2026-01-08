# Json Web Token

> https://blog.csdn.net/weixin_43263566/article/details/126990129

## 一、概念

全称 JSON Web TOKEN，一种`跨域认证解决方案`



## 二、JWT工作原理

:bulb: 用户的信息通过Token字符串的形式，保存在客户端浏览器中，服务器通过还原Token字符串的形式进而认证用户的身份。

![image-20231106130752043](JWT.assets/image-20231106130752043.png)



## 三、JWT组成部分

JWT由三部分组成，分别是Header头部、Payload有效荷载，Signature签名。三者之间使用英文的.分隔，格式如下

Header.Payload.Signature

**具体字符串示例**

```shell
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsInVzZXJuYW1lIjoid3pqIiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6Iuato-e7j-S6uiIsImVtYWlsIjoiMTI4NDUwMzI5OUBxcS5jb20iLCJ1c2VyX3BpYyI6IiIsInJvbGVfaWQiOjEsInJvbGVfbmFtZSI6Iui2hee6p-euoeeQhuWRmCIsImlzX2VuYWJsZWQiOjAsImlhdCI6MTY2Mjg4OTEzNywiZXhwIjoxNjYyOTI1MTM3fQ.D1MRl0v18cP-QlgAWxZO9-cwnNNQH-y-Db2ezAapfps
```

- PayLoad部分才是真正的用户信息，它是用户信息经过加密之后生成的字符串 
- Header 和 Signature 是安全性相关的部分，只是为了保证Token的安全性

![image-20231106131255035](JWT.assets/image-20231106131255035.png)



## 四、Node端使用JWT

### 4.1 安装相关包  npm i jsonwebtoken express-jwt

- jsonwebtoken 用于生成 JWT 字符串（也就是 token ）
- express-jwt 用于将 JWT 字符串解析还原成 JSON 对象



### 4.2 使用require 导入包

```javascript
// 1.导入用与生成 JWT 字符串的包
const jwt = require('jsonwebtoken')
// 2.导入用于将客户端发送过来的 JWT 字符串，解析还原成 JSON 对象的包
const expressJWT = require('express-jwt')
```



### 4.3 定义secret 密匙

为了保证 JWT 字符串的安全性，防止 JWT 字符串在网络传输过程中被别人破解，我们需要专门定义一个用于加密和解密的 secret 密钥：

当生成 JWT 字符串的时候，需要使用 secret 密钥对用户的信息进行加密，最终得到加密好的 JWT 字符串
当把 JWT 字符串解析还原成 JSON 对象的时候，需要使用 secret 密钥进行解密

```
// secret 秘钥本质，就是一个字符串
 
const secretKey = 'itheima No ^_^'
```



### 4.4 登录成功后生成JWT字符串（返给客户端的localStorage）

调用 jsonwebtoken 包提供的 sign() 方法，将用户的信息加密成 JWT 字符串，响应给客户端：

```javascript
// secret 秘钥本质，就是一个字符串
const secretKey = 'itheima No ^_^'
 
app.post('/api/login', (req, res) => {
  // 判断用户提交的登录信息是否正确
  if (req.body.username !== 'adnin' || req.body.password !== '000000') {
    return res.send({ status: 1, msg: '登录失败' })
  }
  res.send({
    status: 0,
    msg: '登录成功',
    // 调用 jwt.sign() 生成 JWT 字符串，三个参数分别是：用户信息对象。加密秘钥、配置对象
    token: jwt.sign({ username: req.body.username, password: req.body.password }, secretKey, { expiresIn: '30s' })
  })
})
```



### 4.5 将JWT字符串还原为JSON对象

客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的 Authorization 字段，将 Token 字符串发送到服务器进行身份认证。

此时，服务器可以通过 express-jwt 这个中间件，自动将客户端发送过来的 Token 解析还原成 JSON 对象：

```javascript
// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()
 
// TODO_01：安装并导入 JWT 相关的两个包，分别是 jsonwebtoken 和 express-jwt ,npm  i jsonwebtoken express-jwt
// 1.导入用与生成 JWT 字符串的包
const jwt = require('jsonwebtoken')
// 2.导入用于将客户端发送过来的 JWT 字符串，解析还原成 JSON 对象的包
const expressJWT = require('express-jwt')
 
// 允许跨域资源共享
const cors = require('cors')
app.use(cors())
 
// 解析 post 表单数据的中间件
const bodyParser = require('body-parser')
 
app.use(bodyParser.urlencoded({ extended: false }))
 
// TODO_02：定义 secret 密钥，建议将密钥命名为 secretKey
const secretKey = 'itheima No ^_^'
 
// TODO_04：注册将 JWT 字符串解析还原成 JSON 对象的中间件
// 使用app.use() 用来注册中间件
// expressJWT({ secret: secretKey }) 就是用来解析 Token 的中间件
// .unless({ path: [/^\/api\//] }) 用来指定那些接口不需要访问权限
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，
// 挂载到 req.user 属性上
app.use(expressJWT({ secret: secretKey }).unless({ path: [/^\/api\//] }))
// expressJWT({secret: secretKey, algorithms: ['HS256']})
// 登录接口
app.post('/api/login', function (req, res) {
  // 将 req.body 请求体中的数据，转存为 userinfo 常量
  const userinfo = req.body
  // 登录失败
  if (userinfo.username !== 'admin' || userinfo.password !== '000000') {
    return res.send({
      status: 400,
      message: '登录失败！',
      data: userinfo
    })
  }
  // 登录成功  
  // TODO_03：在登录成功之后，调用 jwt.sign() 方法生成 JWT 字符串。并通过 token 属性发送给客户端
  res.send({
    status: 200,
    message: '登录成功！',
    // 参数1：用户的信息对象
    // 参数2：加密的秘钥
    // 参数3：配置对象，可以配置当前 token 的有效期
    // 记住：千万不要把密码加密到 token 字符中
    token: jwt.sign({ username: req.body.username }, secretKey, { expiresIn: '300s' }) // 要发送给客户端的 token 字符串
  })
})
 
// 这是一个有权限的 API 接口
// 客户端每次在访问那些有权限接口的时候，都需要主动通过请求头中的 Authorization 字段，
// 将 Token 字符串发送到服务器进行身份认证。
// 例如：Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjYxNzY4NjIxLCJleHAiOjE2NjE3Njg2NTF9.7uEDhiNtkdFNdAENrsKPIhzBXMJIIWMjmB9T95fl_Es
app.get('/admin/getinfo', function (req, res) {
  // TODO_05：使用 req.user 获取用户信息，并使用 data 属性将用户信息发送给客户端
  // 当 express-jwt 这个中间件配置成功之后，即可在那些有权限的接口中，使用 req.user 对象，
  // 来访问从 JWT 字符串
  // 中解析出来的用户信息了，示例代码
  res.send({
    status: 200,
    message: '获取用户信息成功！',
    data: req.user // 要发送给客户端的用户信息
  })
})
 
// TODO_06：使用全局错误处理中间件，捕获解析 JWT 失败后产生的错误
app.use((err, req, res, next) => {
  // token 解析失败导致的错误
  if (err.name === 'UnauthorizedError') {
    return res.send({ status: 401, message: '无效的token' })
  }
  // 其它原因导致的错误
  res.send({ status: 500, message: '未知错误' })
})
 
// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(8888, function () {
  console.log('Express server running at http://127.0.0.1:8888')
})
```

