import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "LSH_NOTES",
  head: [
      ['link', { rel: 'icon', href: '/tiger.svg' }]
  ],
  lastUpdated: true,
  themeConfig: {
    logo: { light: '/hinataLight.png', dark: '/hinataMoon.png' },
    siteTitle: 'Small Tiger Notes',
    nav: [
      {
        text: 'GIS',
        link: '/GIS/GeoJson/GeoJson格式解读.md',
        activeMatch: '/GIS/'
      },
      {
        text: 'GIT',
        link: '/GIT/lecture.md',
        activeMatch: '/GIT/'
      },
      {
        text: '前端',
        link: '/前端/个人前端概论/个人前端概论.md',
        activeMatch: '/前端/'
      },
      {
        text: '后端',
        link: '/后端/java/基础2023.md',
        activeMatch: '/后端/'
      },
      {
        text: '数据库',
        link: '/数据库/常识/MIME.md',
        activeMatch: '/数据库/'
      },
      {
        text: '服务器',
        link: '/服务器/WEBGIS服务.md',
        activeMatch: '/服务器/'
      },
      {
        text: '计算机',
        link: '/计算机/规范标准/规范标准.md',
        activeMatch: '/计算机/'
      },
      {
        text: '建模',
        link: '/建模/Revit2019/lecture.md',
        activeMatch: '/建模/'
      },
      {
        text: '工具',
        link: '/工具/catalogue.md',
        activeMatch: '/工具/'
      },
      {
        text: '学习',
        link: '/学习/数学/Typora常见数学公式.md',
        activeMatch: '/学习/'
      },
      {
        text: '个人',
        link: '/个人/常识/地统计相关.md',
        activeMatch: '/个人/'
      }
    ],
    sidebar: {
      '/GIS/': [
        {
          text: 'GeoJson',
          collapsed: true,
          items: [
            { text: '格式解读', link: '/GIS/GeoJson/GeoJson格式解读.md' }
          ]
        },
        {
          text: 'OGC服务',
          collapsed: true,
          items: [
            { text: 'ArcgisServer', link: '/GIS/OGC服务/ArcgisServer.md' },
            { text: '天地图', link: '/GIS/OGC服务/天地图.md' },
            { text: 'GeoserverWFS', link: '/GIS/OGC服务/GeoserverWFS.md' },
            { text: 'GeoserverWMS', link: '/GIS/OGC服务/GeoserverWMS.md' },
            { text: 'GeoserverWMTS', link: '/GIS/OGC服务/GeoserverWMTS.md' }
          ]
        },
        {
          text: 'Cesium',
          collapsed: true,
          items: [
            { text: '3DTiling支持哪些数据', link: '/GIS/Cesium/3DTiling支持哪些数据.md' },
            { text: '3DTiles规范解读', link: '/GIS/Cesium/3DTiles规范解读.md' },
            { text: 'CesiumIon', link: '/GIS/Cesium/CesiumIon/CesiumIon.md' },
            {
              text: 'CesiumJS',
              collapsed: true,
              items: [
                { text: '一、CesiumJS', link: '/GIS/Cesium/CesiumJS/一、CesiumJS.md' },
                { text: '二、CreateEntities', link: '/GIS/Cesium/CesiumJS/二、CreateEntities.md' },
                { text: '三、Visualize3DTerrain', link: '/GIS/Cesium/CesiumJS/三、Visualize3DTerrain.md' },
                { text: '四、VisualizeImagery', link: '/GIS/Cesium/CesiumJS/四、VisualizeImagery.md' },
                { text: '五、particleSystem', link: '/GIS/Cesium/CesiumJS/五、particleSystem.md' },
                { text: '六、Cesium动画', link: '/GIS/Cesium/CesiumJS/六、Cesium动画.md' },
                { text: '七、CesiumApi图', link: '/GIS/Cesium/CesiumJS/七、CesiumApi.md' },
                { text: '八、初始化', link: '/GIS/Cesium/CesiumJS/八、初始化.md' },
                { text: '九、坐标', link: '/GIS/Cesium/CesiumJS/九、坐标.md' },
                { text: '十、模型管理', link: '/GIS/Cesium/CesiumJS/十、模型管理.md' },
                { text: '十一、虎虎Cesium', link: '/GIS/Cesium/CesiumJS/十一、sihuCesiumMap.md' },
                { text: '十二、常见功能效果图', link: '/GIS/Cesium/CesiumJS/十二、常见功能效果图.md' },
                { text: '十三、常见问题', link: '/GIS/Cesium/CesiumJS/十三、常见问题.md' },
                { text: '十四、collection', link: '/GIS/Cesium/CesiumJS/十四、Collection.md' },
                { text: '十五、GLB设置贴图', link: '/GIS/Cesium/CesiumJS/十五、GLB设置贴图.md' },
                { text: '十六、callback&postProcessStages', link: '/GIS/Cesium/CesiumJS/十六、callback&postProcessStages.md' },
                { text: '细致分析_Camera', link: '/GIS/Cesium/CesiumJS/细致分析_Camera.md' },
                { text: '细致分析_矩阵到空间变换', link: '/GIS/Cesium/CesiumJS/细致分析_矩阵到空间变换' }
              ]
            },
            { text: 'Cesium For Unreal', link: '/GIS/Cesium/CesiumForUnreal/CesiumForUnreal.md' },
            { text: 'Cesium For Omniverse', link: '/GIS/Cesium/CesiumForOmniverse/CesiumForOmniverse.md' },
            { text: 'Cesium For O3DE', link: '/GIS/Cesium/CesiumForO3DE/CesiumForO3DE.md' },
            { text: 'Cesium For Unity', link: '/GIS/Cesium/CesiumForUnity/CesiumForUnity.md' },
            { text: 'Cesium新特性总结', link: '/GIS/Cesium/Cesium新特性总结/Cesium新特性总结.md' },
          ]
        },
        {
          text: 'CesiumLab',
          collapsed: true,
          items: [
            { text: 'CesiumLab功能总结', link: '/GIS/CesiumLab/CesiumLab.md' }
          ]
        },
        {
          text: 'OpenGL',
          collapsed: true,
          items: [
            { text: 'OpenGL', link: '/GIS/OpenGL/OpenGL.md' }
          ]
        },
        {
          text: 'GIS常用坐标系及空间分析',
          collapsed: true,
          items: [
            { text: 'GIS常用坐标系', link: '/GIS/GIS常用坐标系及空间分析/常用坐标系及EPSG.md' },
            { text: 'GIS常用空间分析', link: '/GIS/GIS常用坐标系及空间分析/GIS常用空间分析.md' }
          ]
        },
        {
          text: 'GIS数学相关',
          collapsed: true,
          items: [
            { text: 'ArcMap数学相关', link: '/GIS/GIS数学相关/ArcMap数学相关.md' },
            { text: 'ArcMap加载天地图', link: '/GIS/GIS数学相关/加载天地图.md' },
            { text: 'ArcMap鹰眼图', link: '/GIS/GIS数学相关/鹰眼图.md' }
          ]
        },
        {
          text: 'Turf',
          collapsed: true,
          items: [
            { text: 'Turf', link: '/GIS/Turf/Turf.md' }
          ]
        },
        {
          text: '遥感',
          collapsed: true,
          items: [
            { text: '基础概论', link: '/GIS/遥感/基础概论.md' },
            { text: '常见遥感影像', link: '/GIS/遥感/常见遥感影像.md' },
            { text: '影像处理', link: '/GIS/遥感/影像处理.md' }
          ]
        }
      ],
      '/GIT/': [
        {
          text: 'GIT',
          collapsed: true,
          items: [
            { text: '笔记', link: '/GIT/lecture.md' },
            { text: 'CICD', link: '/GIT/CICD.md' }
          ]
        }
      ],
      '/前端/': [
        {
          text: '个人前端概论',
          collapsed: true,
          items: [
            { text: '笔记', link: '/前端/个人前端概论/个人前端概论.md' }
          ]
        },
        {
          text: 'html',
          collapsed: true,
          items: [
            { text: 'html基础', link: '/前端/html/html基础.md' },
            { text: 'H5', link: '/前端/html/H5.md' },
            { text: '表单标签', link: '/前端/html/表单标签.md' },
            { text: '超链接和嵌入标签', link: '/前端/html/超链接和嵌入标签.md' },
            { text: '多媒体标签', link: '/前端/html/多媒体标签.md' }
          ]
        },
        {
          text: '层叠样式表',
          collapsed: true,
          items: [
            {
              text: 'Css',
              items: [
                { text: 'css基础', link: '/前端/样式布局/css基础.md' },
                { text: '选择器', link: '/前端/样式布局/选择器.md' },
                { text: '单位类型变量', link: '/前端/样式布局/单位类型变量.md' },
                { text: '文本字体', link: '/前端/样式布局/文本字体.md' },
                { text: '盒子模型', link: '/前端/样式布局/盒子模型.md' },
                { text: '背景', link: '/前端/样式布局/背景.md' },
                { text: '定位', link: '/前端/样式布局/定位.md' },
                { text: 'Flex布局', link: '/前端/样式布局/flex.md' },
                { text: '其他布局', link: '/前端/样式布局/其他布局.md' },
                { text: '表格', link: '/前端/样式布局/表格.md' },
                { text: '过渡动画', link: '/前端/样式布局/过渡动画.md' },
                { text: '媒体查询', link: '/前端/样式布局/媒体查询.md' }
              ]
            },
            {
              text: 'ElementUI',
              items: [
                { text: '笔记', link: '/前端/样式布局/ElementUI/lecture.md' }
              ]
            },
            {
              text: 'Naive',
              items: [
                { text: '笔记', link: '/前端/样式布局/Naive/lecture.md' }
              ]
            },
            {
              text: '常用样式库',
              items: [
                { text: '笔记', link: '/前端/样式布局/常用样式库.md' }
              ]
            },
          ]
        },
        {
          text: 'JS',
          collapsed: true,
          items: [
            {
              text: '基础',
              collapsed: true,
              items: [
                { text: '基础', link: '/前端/JS/基础/JS基础.md' }
              ]
            },
            {
              text: '进阶',
              collapsed: true,
              items: [
                { text: '对象', link: '/前端/JS/进阶/对象.md' },
                { text: 'Class', link: '/前端/JS/进阶/Class类.md' },
                { text: '函数', link: '/前端/JS/进阶/函数.md' },
                { text: '箭头函数', link: '/前端/JS/进阶/箭头函数.md' },
                { text: '异步', link: '/前端/JS/进阶/异步.md' },
                { text: 'BOM', link: '/前端/JS/进阶/BOM.md' },
                { text: 'call&apply&bind', link: '/前端/JS/进阶/call&apply&bind.md' },
                { text: 'Promise', link: '/前端/JS/进阶/Promise.md' },
                { text: '对象原型和原型函数', link: '/前端/JS/进阶/JavaScript对象原型和函数原型.md' },
                { text: '展开运算符', link: '/前端/JS/进阶/展开运算符.md' },
                { text: '正则表达式', link: '/前端/JS/进阶/正则表达式.md' },
                { text: 'JS执行顺序', link: '/前端/JS/进阶/JS执行顺序.md' }
              ]
            },
            {
              text: 'JSBridge',
              collapsed: true,
              items: [
                { text: 'JSBridge', link: '/前端/JS/JSBridge/JSBridge.md' },
              ]
            },
            {
              text: '工具软件',
              collapsed: true,
              items: [
                { text: 'postman', link: '/前端/JS/工具软件/postman.md' },
                { text: '常用方法库', link: '/前端/JS/工具软件/常用方法库.md' }
              ]
            },
          ]
        },
        {
          text: 'TS',
          collapsed: true,
          items: [
            { text: '基础', link: '/前端/typescript/基础.md' }
          ]
        },
        {
          text: 'WEBGL',
          collapsed: true,
          items: [
            { text: 'WEBGL基础', link: '/前端/WEBGL/WEBGL.md' },
            { text: 'SVG', link: '/前端/WEBGL/svg.md' },
            { text: 'JSPlumb', link: '/前端/WEBGL/JSplumb.md' }
          ]
        },
        {
          text: 'Vite',
          collapsed: true,
          items: [
            { text: 'Vite', link: '/前端/vite/Vite.md' },
            { text: 'ViteSvg', link: '/前端/vite/ViteSvg.md' },
            { text: '项目结构', link: '/前端/vite/项目结构.md' }
          ]
        },
        {
          text: 'VitePress',
          collapsed: true,
          items: [
            { text: 'VitePress', link: '/前端/VitePress/VitePress.md' },
            { text: '修改本地域名映射', link: '/前端/VitePress/修改本地域名映射.md' }
          ]
        },
        {
          text: 'axios',
          collapsed: true,
          items: [
            { text: '笔记', link: '/前端/axios/lecture.md' }
          ]
        },
        {
          text: 'vue',
          collapsed: true,
          items: [
            {
              text: 'uni-app',
              items: [
                { text: '笔记', link: '/前端/vue/uni-app/lecture.md' }
              ]
            },
            {
              text: 'Vue2',
              items: [
                { text: '生命周期', link: '/前端/vue/Vue2/生命周期.md' }
              ]
            },
            {
              text: 'Vue3',
              items: [
                { text: '笔记', link: '/前端/vue/Vue3/vue3快速上手.md' },
                { text: 'Setup', link: '/前端/vue/Vue3/Vue3Setup.md' },
                { text: '生命周期', link: '/前端/vue/Vue3/生命周期.md' }
              ]
            },
            {
              text: '共用',
              items: [
                { text: '目录结构', link: '/前端/vue/共用/目录结构.md' },
                { text: '指令', link: '/前端/vue/共用/指令.md' },
                { text: '路由', link: '/前端/vue/共用/vue-router.md' },
                { text: '数据管理', link: '/前端/vue/共用/数据管理.md' },
                { text: '计算属性', link: '/前端/vue/共用/computed.md' },
                { text: '组件', link: '/前端/vue/共用/component.md' },
                { text: '插槽slot', link: '/前端/vue/共用/slot.md' },
                { text: '缓存keepAlive', link: '/前端/vue/共用/keepAlive.md' },
                { text: 'VNode及Diff', link: '/前端/vue/共用/VNode及Diff.md' },
                { text: 'watch', link: '/前端/vue/共用/watch.md' },
                { text: 'teleport', link: '/前端/vue/共用/Teleport.md' },
                { text: 'nextTick', link: '/前端/vue/共用/nextTick.md' },
                { text: 'sass', link: '/前端/vue/共用/sass.md' },
                { text: 'babel', link: '/前端/vue/共用/babel.md' },
                { text: 'service', link: '/前端/vue/共用/service.md' },
                { text: 'editorconfig', link: '/前端/vue/共用/editorconfig.md' },
                { text: '移动端测试', link: '/前端/vue/共用/移动端测试.md' }
              ]
            }
          ]
        },
        {
          text: 'react',
          collapsed: true,
          items: [
            { text: '初识react', link: '/前端/react/初识react.md' },
            { text: 'nextjs', link: '/前端/react/nextjs.md' }
          ]
        },
        {
          text: '开发规范',
          collapsed: true,
          items: [
            { text: '开发注意事项', link: '/前端/开发规范/开发项目注意事项.md' }
          ]
        },
        {
          text: '设计模式',
          collapsed: true,
          items: [
            { text: '设计模式', link: '/前端/设计模式/设计模式.md' }
          ]
        },
        {
          text: '浏览器',
          collapsed: true,
          items: [
            { text: 'chrome120版本', link: '/前端/浏览器/chrome/chrome120版本.md' },
            { text: '调试技巧', link: '/前端/浏览器/调试技巧/调试技巧.md' },
            { text: '原生Window', link: '/前端/浏览器/Window/Window.md' },
            { text: '浏览器进程', link: '/前端/浏览器/浏览器进程/浏览器进程.md' },
            { text: 'History', link: '/前端/浏览器/Window/History.md' }
          ]
        },
        {
          text: '网络通信',
          collapsed: true,
          items: [
            { text: '网络通信', link: '/前端/网络通信/网络通信.md' }
          ]
        }
      ],
      '/后端/': [
        {
          text: 'Java',
          collapsed: true,
          items: [
            { text: '基础2023', link: '/后端/java/基础2023.md' },
            { text: 'IDEA配置', link: '/后端/java/IDEA配置.md' },
            { text: '面向对象基础', link: '/后端/java/面向对象基础.md' },
            { text: '面向对象进阶', link: '/后端/java/面向对象进阶.md' },
            { text: '面向对象高级', link: '/后端/java/面向对象高级.md' },
            { text: 'Java异常', link: '/后端/java/Java异常.md' },
            { text: '多线程', link: '/后端/java/多线程.md' },
            { text: 'Java常用类和基础API', link: '/后端/java/常用类和基础API.md' },
            { text: '集合框架', link: '/后端/java/集合框架.md' },
            { text: '泛型', link: '/后端/java/泛型.md' },
            { text: '数据结构与集合', link: '/后端/java/数据结构与集合.md' },
            { text: 'File类与IO流', link: '/后端/java/File类与IO流.md' },
            { text: '网络编程', link: '/后端/java/网络编程.md' },
            { text: '反射机制', link: '/后端/java/反射机制.md' },
            { text: '数组', link: '/后端/java/数组.md' },
            { text: '常见算法', link: '/后端/java/常见算法.md' },
            { text: 'swagger', link: '/后端/java/swagger.md' }
          ]
        },
        {
          text: 'Node',
          collapsed: true,
          items: [
            { text: 'NodeJS简介', link: '/后端/Node/NodeJS简介.md' },
            { text: 'NodeJS实用总结', link: '/后端/Node/NodeJS实用总结.md' },
            { text: '后端简单案例', link: '/后端/Node/后端简单案例.md' },
            { text: 'Nest', link: '/后端/Node/Nest.md' },
            { text: 'JWT', link: '/后端/Node/JWT.md' },
            { text: '异步工作', link: '/后端/Node/异步工作.md' }
          ]
        }
      ],
      '/数据库/': [
        {
          text: '数据库',
          collapsed: true,
          items: [
            {
              text: '常识',
              collapsed: true,
              items: [
                { text: 'Base64' ,link: '/数据库/常识/Base64.md' },
                { text: 'Blob' ,link: '/数据库/常识/Blob.md' },
                { text: 'MIME' ,link: '/数据库/常识/MIME.md' }
              ]
            },
            {
              text: 'PostGre',
              items: [
                { text: 'postgre' ,link: '/数据库/postgre.md' },
                { text: 'postgis' ,link: '/数据库/postgis.md' }
              ]
            },
            {
              text: 'Redis',
              items:[
                { text: '笔记', link: '/数据库/redis/lecture.md'}
              ]
            },
            {
              text: '3DCityDB',
              items: [
                { text: '3DCityDB简介' ,link: '/数据库/3DCityDB简介.md' },
                { text: '3DCityDB用户手册' ,link: '/数据库/3DCityDB用户手册.md' }
              ]
            },
            {
              text: 'Neo4j',
              items: [
                { text: 'Neo4j' ,link: '/数据库/Neo4j.md' }
              ]
            }
          ]
        }
      ],
      '/服务器/': [
        {
          text: '服务器',
          collapsed: true,
          items: [
            { text: 'OGC标准', link: '/服务器/WEBGIS服务.md' },
            { text: 'GeoServer',
              collapsed: true,
              items: [
                { text: 'GeoServer入门', link: '/服务器/geoserver/geoserver入门.md'},
                { text: 'GeoServer User Manual', link: '/服务器/geoserver/UserManual.md'},
                { text: 'GeoServer路径导航使用案例', link: '/服务器/geoserver/geoserver其他.md'}
              ]
            },
            { text: 'gitee常见问题', link: '/服务器/gitee.md' },
            { text: 'linux配置nginx', link: '/服务器/linux配置nginx.md' },
            { text: 'Centos7笔记', link: '/服务器/Centos7笔记.md' },
            { text: '阿里云', link: '/服务器/阿里云.md' },
            { text: '腾讯云', link: '/服务器/腾讯云.md' }
          ]
        }
      ],
      '/计算机/': [
        {
          text: '计算机',
          collapsed: true,
          items: [
            { text: '计算机系统', link: '/计算机/计算机系统/计算机系统.md' },
            { text: '编程思想', link: '/计算机/编程思想/编程思想.md' },
            { text: '规范标准', link: '/计算机/规范标准/规范标准.md' },
            { text: '数据结构与算法',
              collapsed: true,
              items: [
                {
                  text: '常用算法',
                  collapsed: true,
                  items: [
                    { text: '基础阅读', link: '/计算机/数据结构与算法/常用算法/202411拓展阅读.md' },
                    { text: '数组', link: '/计算机/数据结构与算法/常用算法/数组/202411数组.md' },
                    { text: '链表', link: '/计算机/数据结构与算法/常用算法/链表/202411链表.md' },
                    { text: '哈希表', link: '/计算机/数据结构与算法/常用算法/哈希表/202411哈希表.md' },
                    { text: '字符串', link: '/计算机/数据结构与算法/常用算法/字符串/202411字符串.md' },
                    { text: '栈与队列', link: '/计算机/数据结构与算法/常用算法/栈与队列/202411栈与队列.md' },
                    { text: '二叉树', link: '/计算机/数据结构与算法/常用算法/二叉树/202411二叉树.md' },
                    { text: '回溯算法', link: '/计算机/数据结构与算法/常用算法/回溯算法/202411回溯算法.md' },
                    { text: '贪心算法', link: '/计算机/数据结构与算法/常用算法/贪心算法/202411贪心算法.md' },
                    { text: '动态规划', link: '/计算机/数据结构与算法/常用算法/动态规划/202411动态规划.md' },
                    { text: '单调栈', link: '/计算机/数据结构与算法/常用算法/单调栈/202411单调栈.md' },
                    { text: '图论', link: '/计算机/数据结构与算法/常用算法/图论/202411图论.md' }
                  ]
                },
                {
                  text: '自然语言处理',
                  collapsed: true,
                  items: [
                    {
                      text: '数据清洗',
                      collapsed: true,
                      items: [
                        { text: 'LTP' ,link: '/计算机/数据结构与算法/数据清洗/LTP.md' },
                        { text: 'jieba' ,link: '/计算机/数据结构与算法/数据清洗/jieba.md' }
                      ]
                    },
                    {
                      text: '主题分类',
                      collapsed: true,
                      items: [
                        { text: 'LDA' ,link: '/计算机/数据结构与算法/主题分类/LDA.md' }
                      ]
                    },
                    {
                      text: '词向量',
                      collapsed: true,
                      items: [
                        { text: 'word2Vec' ,link: '/计算机/数据结构与算法/词向量/word2Vec.md' }
                      ]
                    },
                    {
                      text: '关键词排序',
                      collapsed: true,
                      items: [
                        { text: 'pageRank' ,link: '/计算机/数据结构与算法/关键词排序/pageRank.md' }
                      ]
                    },
                    {
                      text: '命名实体识别',
                      collapsed: true,
                      items: [
                        { text: 'Bilstm_CRF' ,link: '/计算机/数据结构与算法/命名实体识别/Bilstm_CRF.md' }
                      ]
                    },
                    {
                      text: '情感分析',
                      collapsed: true,
                      items: [
                        { text: 'snowNLP' ,link: '/计算机/数据结构与算法/情感分析/snowNLP情感分析.md' }
                      ]
                    }
                  ]
                }
              ]
            },
            { text: '设计模式', link: '/计算机/设计模式/设计模式.md' },
            { text: '编程语言',  
              collapsed: true, 
              items: [
                {
                  text: 'Python',
                  collapsed: true,
                  items: [
                    { text: '基本用法',
                      collapsed: true,
                      items: [
                        { text: '基础', link: '/计算机/编程语言/python/基本用法/基本用法.md' },
                        { text: 'Conda', link: '/计算机/编程语言/python/基本用法/Conda.md' },
                        { text: '装包', link: '/计算机/编程语言/python/基本用法/装包.md' }
                      ]
                    },
                    { text: 'excel&txt',
                      collapsed: true,
                      items: [
                        { text: 'Excel&Txt', link: '/计算机/编程语言/python/excel&txt/excelTxt.md' }
                      ]
                    },
                    { text: '爬虫',
                      collapsed: true,
                      items: [
                        { text: '爬虫基础知识', link: '/计算机/编程语言/python/python爬虫/爬虫基础知识.md' },
                        { text: '爬虫常用模块', link: '/计算机/编程语言/python/python爬虫/爬虫常用模块.md' },
                        { text: 'BeautifulSoup', link: '/计算机/编程语言/python/python爬虫/BeautifulSoup.md' },
                        { text: 'BeautifulSoup案例', link: '/计算机/编程语言/python/python爬虫/BeautifulSoup案例.md' },
                        { text: 'PyQuery', link: '/计算机/编程语言/python/python爬虫/PyQuery.md' },
                        { text: 'PySpider', link: '/计算机/编程语言/python/python爬虫/PySpider.md' },
                        { text: 'Scrapy', link: '/计算机/编程语言/python/python爬虫/Scrapy.md' },
                        { text: 'Selenium', link: '/计算机/编程语言/python/python爬虫/Selenium.md' }
                      ]
                    },
                    { text: 'Geo相关',
                      collapsed: true,
                      items: [
                        { text: 'Osgeo', link: '/计算机/编程语言/python/Geo相关/Osgeo.md' },
                        { text: 'GeoPandas', link: '/计算机/编程语言/python/Geo相关/GeoPandas.md' }
                      ]
                    },
                    { text: '机器学习',
                      collapsed: true,
                      items: [
                        { text: '机器学习', link: '/计算机/编程语言/python/机器学习/sklearn.md' }
                      ]
                    },
                    { text: 'Conda',
                      collapsed: true,
                      items: [
                        { text: 'Conda', link: '/计算机/编程语言/python/Conda/Conda.md' }
                      ]
                    },
                    { text: 'JupyterNotebook',
                      collapsed: true,
                      items: [
                        { text: 'JupyterNotebook', link: '/计算机/编程语言/python/JupyterNotebook/JupyterNotebook.md' }
                      ]
                    }
                  ]
                }
              ]
            },
            { text: '分布式', link: '/计算机/分布式/Docker.md' },
            { text: 'AI', 
              collapsed: true,
              items: [
                { text: 'prompt', link: '/计算机/AI/prompt.md' },
                { text: '常用', link: '/计算机/AI/常用生成.md' }
              ]
            }
          ]
        }
      ],
      '/建模/': [
        {
          text: '建模',
          collapsed: true,
          items: [
            { text: 'Revit', link: '/建模/Revit2019/lecture.md' }
          ]
        }
      ],
      '/工具/': [
        {
          text: '工具',
          collapsed: true,
          items: [
            { text: 'catalogue', link: '/工具/catalogue.md' },
            { text: 'ArcMap', link: '/工具/arcmap.md' },
            { text: 'ArcGISPro', link: '/工具/arcgisPro.md' },
            { text: 'CoreLdraw', link: '/工具/CorelDraw.md' },
            { text: 'WebStorm', link: '/工具/WebStorm.md' },
            { text: 'protege', link: '/工具/protege.md' }
          ]
        }
      ],
      '/学习/': [
        {
          text: '数学',
          collapsed: true,
          items: [
            { text: 'Typora常见数学公式', link: '/学习/数学/Typora常见数学公式.md' },
            { text: '常见数学符号及计算', link: '/学习/数学/一、常见数学符号及计算.md' },
            { text: '一、常见坐标系.md', link: '/学习/数学/一、常见坐标系.md' },
            { text: '二、向量', link: '/学习/数学/二、向量.md' },
            { text: '三、矩阵', link: '/学习/数学/三、矩阵.md' },
            { text: '地学建模', link: '/学习/数学/地学建模/地学建模.md' },
            { text: '高等数学', link: '/学习/数学/高等数学.md' }
          ]
        },
        {
          text: '英语',
          collapsed: true,
          items: [
            { text: '笔记', link: '/学习/英语/lecture.md' }
          ]
        }
      ],
      '/个人/': [
        {
          text: '个人',
          collapsed: true,
          items: [
            { text: '常识',
              items: [
                { text: '地统计相关', link: '/个人/常识/地统计相关.md'},
                { text: '图形学', link: '/个人/常识/图形学.md'},
                { text: 'UML图', link: '/个人/常识/UML图.md'},
                { text: '机器学习', link: '/个人/常识/机器学习.md'},
                { text: '计算机硬件', link: '/个人/常识/计算机硬件.md'},
                { text: '计算机实用小技巧', link: '/个人/常识/计算机实用小技巧.md'}
              ]
            },
            { text: '其他',
              items: [
                { text: 'JEECGLearn', link: '/个人/其他/jeecgVue.md'},
                { text: 'WEBGIS随心笔记', link: '/个人/其他/WEBGIS随心笔记.md'},
                { text: '2023前端生态', link: '/个人/其他/2023前端生态.md'},
                { text: 'consoleLog玩法', link: '/个人/其他/consoleLog玩法.md'},
                { text: 'mysql-JavaScript', link: '/个人/其他/mysql-JavaScript.md'},
                { text: 'shadcnUI', link: '/个人/其他/shadcnUI.md'},
                { text: '三维场景可视化网站架构设计', link: '/个人/其他/三维场景可视化网站架构设计.md'},
                { text: '局域网文件共享', link: '/个人/其他/局域网文件共享.md'}
              ]
            }
          ]
        },
        {
          text: '面试题',
          collapsed: true,
          items: [
            {
              text: '2022面试题',
              collapsed: true,
              items: [
                { text: '20221216', link: '/个人/面试题/2022/lecture.md' },
              ]
            },
            {
              text: '2023面试题',
              collapsed: true,
              items: [
                { text: '20230101', link: '/个人/面试题/2023/20230101.md' },
                { text: '20230116', link: '/个人/面试题/2023/20230116.md' },
                { text: '20230201', link: '/个人/面试题/2023/20230201.md' }
              ]
            },
            {
              text: '面试题-HTML',
              collapsed: true,
              items: [
                { text: '202310', link: '/个人/面试题/面试题-HTML/202310HTML.md' },
                { text: '202412', link: '/个人/面试题/面试题-HTML/202412.md' },
              ]
            },
            {
              text: '面试题-CSS',
              collapsed: true,
              items: [
                { text: '202408', link: '/个人/面试题/面试题-CSS/202408.md' },
                { text: '202310', link: '/个人/面试题/面试题-CSS/202310CSS.md' },
                { text: '202410', link: '/个人/面试题/面试题-CSS/202410.md' },
                { text: '202411', link: '/个人/面试题/面试题-CSS/202411.md' },
                { text: '202412', link: '/个人/面试题/面试题-CSS/202412.md' },
                { text: '202601', link: '/个人/面试题/面试题-CSS/202601.md' }
              ]
            },
            {
              text: '面试题-JavaScript',
              collapsed: true,
              items: [
                { text: '202310', link: '/个人/面试题/面试题-JavaScript/202310JavaScript.md' },
                { text: '202311', link: '/个人/面试题/面试题-JavaScript/202311JavaScript.md' },
                { text: '202312', link: '/个人/面试题/面试题-JavaScript/202312JavaScript.md' },
                { text: '202403', link: '/个人/面试题/面试题-JavaScript/202403.md' },
                { text: '202403正则表达式', link: '/个人/面试题/面试题-JavaScript/正则表达式.md' },
                { text: '202408', link: '/个人/面试题/面试题-JavaScript/202408.md' },
                { text: '202409', link: '/个人/面试题/面试题-JavaScript/202409.md' },
                { text: '202410', link: '/个人/面试题/面试题-JavaScript/202410.md' },
                { text: '202411', link: '/个人/面试题/面试题-JavaScript/202411.md' },
                { text: '202412', link: '/个人/面试题/面试题-JavaScript/202412.md' },
                { text: '202601', link: '/个人/面试题/面试题-JavaScript/202601.md' }
              ]
            },
            {
              text: '面试题-力扣',
              collapsed: true,
              items: [
                { text: '202410', link: '/个人/面试题/面试题-力扣/202410.md' },
                { text: '202411', link: '/个人/面试题/面试题-力扣/202411.md' }
              ]
            },
            {
              text: '面试题-手写原生',
              collapsed: true,
              items: [
                { text: '202410', link: '/个人/面试题/面试题-手写原生/202410.md' },
              ]
            },
            {
              text: '面试题-VUE',
              collapsed: true,
              items: [
                { text: '202403', link: '/个人/面试题/面试题-VUE/202403.md' },
                { text: '202410', link: '/个人/面试题/面试题-VUE/202410.md' },
                { text: '202412', link: '/个人/面试题/面试题-VUE/202412.md' },
                { text: '202502', link: '/个人/面试题/面试题-VUE/202502.md' },
                { text: '202503', link: '/个人/面试题/面试题-VUE/202503.md' }
              ]
            },
            {
              text: '华图在线-图形推断',
              collapsed: true,
              items: [
                { text: '202403', link: '/个人/面试题/华图在线/202403.md' },
                { text: '202404', link: '/个人/面试题/华图在线/202404.md' }
              ]
            }
          ]
        }
      ],
    },
    outline: {
      level: 'deep',
      label: '页面导航'
    },
    footer: {
      message: '个人B站账号：<a style="color: red" href="https://www.bilibili.com/video/BV1Bv4y1R7Qu/?spm_id_from=333.999.0.0&vd_source=c3aed98126d5ffa7b2c72cf011d9383c">小STiger</a>，欢迎访问(*^▽^*)',
      copyright: 'Copyright © 2026 小Tiger Powered by VitePress'
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/liusihu-source' }
    ],
    search: {
      provider: 'local'
    }
  }
})
