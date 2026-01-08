# Vue-router

## Vue2.X使用步骤

### 1、安装依赖

```shell
yarn add vue-router
```

### 2、新建router文件夹

- 内部创建index.js

```javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/login/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router

```

### 补---路由嵌套，即子路由

- router.js

```javascript
import { createRouter } from 'vue-router'
import User from './views/User.vue'
import UserHome from './views/UserHome.vue'
import UserProfile from './views/UserProfile.vue'
import UserPosts from './views/UserPosts.vue'

export const router = createRouter({
  routes: [
    {
      path: '/users/:username',
      component: User,
      children: [
        { path: '', component: UserHome },
        { path: 'profile', component: UserProfile },
        { path: 'posts', component: UserPosts },
      ],
    },
  ],
})
```

- 解释
  - app.vue首先页面上面有三个router-link标签，用来跳转，跳转时候根据路由参数跳转
  - app.vue下面有个router-view，所以去找默认初始组件，找到User.vue
    - User.vue默认传递$route.params.username值为空，所以router-view默认为空
    - 因为是空，所以router就会找到User路由中默认为空的子路由，也就是UserHome.vue，进而渲染
  - 当点击其他router-link时候，按照同样上面步骤，实现子路由的跳转

### 3、main.js挂载router

```javascript
import Vue from 'vue'
import App from './App.vue'
import router from "@/router";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

```

### 4、组件使用

```vue
<template>
  <div id="app">
      <!--routerview作用将路由匹配到的组件渲染到对应位置-->
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
*{
  padding: 0;
  margin: 0;
  font-family: Microsoft YaHei;
}
#app {
  width: 100%;
  height: 100%;
}
</style>

```

```vue
<template>
  <div id="all">111</div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style lang="scss" scoped>
#all {
  width: 100%;
  height: 100%
}
</style>

```



## Vue3.X使用步骤

### 1、安装依赖

```shell
yarn add vue-router
```

### 2、新建router文件夹

- 内部创建index.js

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/login/Login')
  },
  {
    path: '/home',
    component: () => import('@/views/home/Home'),
    meta: {
      requireAuth: true
    }
  },
  {
    path: '*',  //用来匹配404页面，该路由一定放到最后位置
    component: () => import('@/views/home/notFuond')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//导航守卫，判断用户是否已经登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    if (localStorage.token) {
      next()
    } else {
      next(
        {
          path: '',
          query: { redirect: to.fullPath }
        }
      )
    }
  } else {
    next()
  }
})

export default router

```

### 3、main.js挂载router

```javascript
import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import 'cesium/Build/Cesium/Widgets/widgets.css'
window.CESIUM_BASE_URL = '/'

createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')

```

### 4、组件使用

```vue
<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style scoped>
</style>

```

```vue
<template>
  <div id="all">
    <div class="switch">
      <h2>没有/已有账号？</h2>
    </div>
    <input type="checkbox" style="display: none;" id="change">
    <label for="change">切 换</label>
    <div class="turn">
      <div class="over">
        <form action="" class="login" id="login_form">
          <h1>乡 村 三 维 管 理 登 录 界 面</h1>
          <input type="text" placeholder="UserName" name="username">
          <input type="password" placeholder="PassWord" name="password">
          <input type="submit" class="btn" value="登 录">
        </form>
        <form action="" class="sign" id="regis_form">
          <h1>注册界面</h1>
          <input type="text" placeholder="UserName" name="username" id="regName">
          <input type="password" placeholder="PassWord" name="password" id="regPass">
          <input type="submit" class="btn" value="注 册" id="btnRegis">
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { stopp } from '@/assets/js/Sakura'

export default {
  name: 'Login',
  methods: {

  },
  created () {
    // startSakura()
    // import('@/assets/js/Sakura')
  },
  mounted () {
    const that = this
    $('#login_form').on('submit', function (e) {
      e.preventDefault()
      const formData = $(this).serialize()
      $.ajax({
        url: 'http://127.0.0.1:3000/api/login',
        type: 'post',
        data: formData,
        dataType: 'json',
        success: function (data) {
          const errCode = data.err_code
          const username = data.username
          if (errCode === 0) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('userName', data.username)
            localStorage.setItem('UserID', data.username.id)
            window.alert('欢迎回来，' + username)
            that.$router.push('/home')
          } else if (errCode === 1) {
            window.alert('用户名与密码不匹配')
          } else if (errCode === 2) {
            window.alert('用户名不存在')
          }
        }
      })
    })
    $('#regis_form').on('submit', function (e) {
      e.preventDefault()
      const formData = $(this).serialize()
      $.ajax({
        url: 'http://127.0.0.1:3000/api/register',
        type: 'post',
        data: formData,
        dataType: 'json',
        success: function (data) {
          const errCode = data.err_code
          if (errCode === 0) {
            window.alert('注册成功,请重新登录')
            document.getElementById('regName').value = ''
            document.getElementById('regPass').value = ''
            document.getElementById('change').checked = false
          } else if (errCode === 1) {
            window.alert('用户已存在')
          }
        }
      })
    })
  },
  beforeRouteLeave () {
    stopp()
  }
}
</script>

<style scoped lang="scss">
#all{
  width: 100%;
  height: 100%;
  background: url("../../assets/img/bg.jpg");
  background-size: 100%;
  text-align: center;
  .switch{
    background-color: #000;
    opacity: 0.7;
    width: 400px;
    height: 140px;
    position: absolute;
    left: calc((100% - 400px) / 2);
    top: 73%;
    border-radius: 8px;
    h2{
      padding-top: 5%;
      color: #fff;
      user-select: none;
    }
  }
  #change:checked+label,#change:not(:checked)+label{
    background-image: linear-gradient(120deg, #fccb90 0%, #d57eeb 100%);
    color: white;
    width: 280px;
    padding: 8px 0;
    font-size: 24px;
    font-weight: 600;
    position: absolute;
    left: 50%;
    margin-left: -140px;
    top: 81%;
    border-radius: 8px;
    cursor: pointer;
  }
  .turn{
    width: 34%;
    height: 36%;
    position: absolute;
    left: 33%;
    margin: 0 auto;
    top: 16%;
    opacity: 0.7;
    perspective: 800px;
    .over{
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      transition: all 1.6s ease;
      .login,.sign{
        width: 100%;
      }
      .login input:nth-child(-n+3){
        margin: 20px 0;
      }
      .sign input:nth-child(-n+3){
        margin: 20px 0;
      }
    }
    form{
      position: absolute;
      background-color: #FCFBFA;
      height: 100%;
      border-radius: 8px;
      transform-style: preserve-3d;
      transform: translate3d(0, 0, 1px);
      h1{
        color: #1f2029;
        user-select: none;
        padding-top: 5%;
      }
      input{
        background-color: #4E495D;
        width: 70%;
        height: 48px;
        border-radius: 8px;
        margin-bottom: 20px;
        padding: 0 16px;
        font-size: 18px;
        color: #c4c3ca;
        font-weight: 500;
        outline: none;
        border: none;
        box-shadow: 0 4px 8px 0 rgba(78, 73, 79, .5);
      }
      .btn{
        background-color: #981E61;
        border: none;
        width: 80%;
        font-size: 24px;
        font-weight: 600;
        padding: 6px 0;
        color: white;
        border-radius: 8px;
        margin-top: 15px;
        cursor: pointer;
      }
    }
    .sign{
      transform: rotateY(180deg);
    }
  }
  #change:checked ~ .turn .over{
    transform: rotateY(180deg);
  }
}
</style>

```

