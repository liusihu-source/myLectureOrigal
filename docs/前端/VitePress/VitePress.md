# VitePress

## 一、创建项目初始化

```shell
mkdir vitepress-starter && cd vitepress-starter

```

- 初始化

```shell
yarn init
```

## 二、安装依赖

```shell
yarn add --dev vitepress vue

```

- 创建入口文档

```shell
mkdir docs && echo '# Hello VitePress' > docs/index.md

```

## 三、启动本地服务

- 配置package.json

```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  },
  ...
}

```

- 本地运行

```shell
yarn docs:dev
```

- 项目打包

```
yarn docs:build
```

- 生产环境运行（需要已经打包结束），支持部署的静态资源平台如下
  - GitHub
  - GitLab
  - Azure Static Web Apps
  - Firebase
  - Surge
  - Heroku
  - Layer0

```
yarn docs:serve
```



## 四、其他

### 1、常用配置

1. siteTitle： 配置标题值站点的标题
2. logo：配置图片路径，绝对路径（docs >> public >> Tom.jpg）
3. NAV: 配置右上角顶部的各个导航菜单，使用方式如上Demo
4. Sidebar：配置文档左侧侧边栏，使用方式如上Demo
   - 可通过添加collapsible属性来增加一个折叠选项，用于显示隐藏每个部分
5. Prev Next Link
   - 用于自定义上一个和下一个链接的文本内容，一般是侧边栏的文件名，一般不需要
6. Edit Link 配置用于编辑此页面的链接，如果自己定期维护更新，一般不需要
7. Last Updated   Documentatino Coming soon...
8. Layout  
9. Home Page
10. Team Page
11. Footer
12. Search
13. Carbon Ads



### 2、常用小表情

:yum: yum;  :rofl: rofl; :sweat_smile: sweat_smile

