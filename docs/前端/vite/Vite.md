# Vite

## 一、打包 allowJS

如果项目需要js文件，在tsconfig.js的compilerOptions对象添加属性：“allowJs”: true,

```javascript
 "compilerOptions": {
    "allowJs": true,
}
```



## 二、isolatedModules

在vue中使用ts定义变量的时候报如下错误：

cannot be compiled under '--isolatedModules' because it is considered a global script file. Add an import, export, or an empty 'export {}' statement to make it a module.



#### 解决办法

找到tsconfig.json配置文件，把isolatedModules字段改为false



## 三、src配置全局路径@

### 1.安装path依赖

```shell
yarn add path -D
```

### 2.配置vite.config.ts

> 在resolve选项中配置一个alias别名

```typescript
export default defineConfig({
    plugins: [vue()],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, './src'),
            }
        ]
    }
})

```

- 此时已经可以通过 @ 符号引入vue组件和图片等如下

  - route路径对象可以使用

  - 组件中ts代码加载图片可使用

    ```typescript
    import firePng from '@/assets/fire.png'
    
    export default {
        setup(){
            window.viewer.scene.primitives.add(new Cesium.ParticleSystem({
              //此处可使用上面引用的图片地址  
              image: firePng,
            })
        }
    }
    ```

### 3.配置tsconfig.json

> 在 `compilerOptions` 选择中增加 `baseUrl` 及 `paths` 配置

```json
{
    "compilerOptions": {
        // ...省略其它配置项
        "baseUrl": ".",
        "paths": {
            "@/*": [ "src/*" ]
        }
    }
}

```



