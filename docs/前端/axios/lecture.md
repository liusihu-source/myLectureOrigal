# Axios

> https://www.axios-http.cn/
>

## 概念

- 基于Promise的网络请求库，用于浏览器 和 NodeJS
- 封装Axios 减少重复编写相同的请求参数 和 错误处理



## 封装步骤

### 设置请求域名

根目录下新增 .env.development & .env.production 文件，内部写入不同的baseURL

```
NODE_ENV = "development"
VITE_BASE_URL = "http://127.0.0.1:3000"

NODE_ENV = "production"
VUE_APP_BASE_URL = "http://124.70.78.39:8009"
```

vue.config.js 或 vite.config.ts 设置代理转发

```typescript
export default defineConfig( {
  plugins: [
    vue(),
    cesium()
  ],
  server: {
    //自定义代理规则  
    proxy: {
      '/data': {
        target: process.env.VITE_API_BASE_URL || 'https://echarts.apache.org/examples/data/asset/data',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/data/, '')
      }
    }
  }
})
```



### 设置请求头

```javascript
const service = axios.create({
    baseURL: VITE_APP_BASEURL
    timeout: 30000,
	  headers: {
        get: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        post: {
          'Content-Type': 'application/json;charset=utf-8'
        }
  },
})
```

### 封装请求方法

```javascript
import { service } from '@/api/index'
// 用户路由
export const userAPI = {
  // POST 添加用户
  add(registerData) {
    return service.post('/pollution/user/add', registerData)
  },
  // POST 登录接口
  login(loginData) {
    return service.post('/pollution/user/login', loginData)
  }
}
```

### 组件使用

```javascript
import { userAPI } from '@/api/userAPI'
// ...
const { data: res } = await userAPI.login({
  createTime: '',
  id: 0,
  password: password.value,
  salt: '',
  username: username.value
})
```

### 请求拦截器

```javascript
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断登录情况，此处token一般是用户完成登录后储存到localstorage里的
    token && (config.headers.Authorization = token)
    return config
  },
  error => {
    return Promise.error(error)
  })
```

### 响应拦截器

```javascript
axios.interceptors.response.use(response => {
  // 根据状态码执行逻辑
  if (response.status === 200) {
    if (response.data.code === 511) {
        
    } else if (response.data.code === 510) {
    } else {
      return Promise.resolve(response)
    }
  } else {
    return Promise.reject(response)
  }
}, error => {
  if (error.response.status) {
    return Promise.reject(error.response)
  }
})
```



## Axios单独使用

```javascript
//get请求
btn.onclick = function(){
    axios({
        method:'GET',
        url: 'http://localhost:3000/'
    }).then(response){
        console.log(response)
    }
}

//post添加
btn.onclick = function(){
    axios({
        method: 'POST',
        url: 'http://localhost:3000/posts',
        data: {
            ....
        },
    }).then(response){
        console.log(response)
    }
}

//PUT更新
btn.onclick = function(){
    axios({
        method: 'PUT',
        url: 'http://localhost:3000/posts/3',
        data: {
            ....
        },
    }).then(response){
        console.log(response)
    }
}

//Delete删除
btn.onclick = function(){
    axios({
        method: 'DELETE',
        url: 'http://localhost:3000/posts/3'
    }).then(response){
        console.log(response)
    }
}

//通用方式
btn.click = function(){
    axios({
        method: '具体类型',
        url: '',
        baseURL: '',
        headers:  //请求头信息
        params: {},
        timeout:  //请求的超时时间
        ......
    })
}
axios.defaults.baseURL = '....'
//可创建不同的axios对象实例
```

