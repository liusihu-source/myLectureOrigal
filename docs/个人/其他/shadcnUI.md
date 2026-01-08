# shadcnUi

> https://github.com/shadcn-ui/ui
>
> https://mp.weixin.qq.com/s/oRW61QCTTowKdAQkfEl2tw

## 一、概述

Shadcn UI 与其他 UI 和组件库如 Material UI、Ant Design、Element UI 的设计理念截然不同。这些库一般通过 npm 包提供对组件的访问，而 **Shadcn UI 允许用户将单个 UI 组件的源代码直接下载到项目中**

:bulb: **Shadcn UI 实际上并不是一个组件库**，**而是可以复制并粘贴到应用中的可重用组件的集合。**



## 二、使用

### 2.1 初始化

运行以下命令创建一个新的 Next.js 应用：

```shell
npx create-next-app@latest my-app --typescript --tailwind --eslint
```

运行 init 命令来初始化新项目的依赖项：

```shell
npx shadcn-ui@latest init
```

CLI 将提示进行一些配置。以下是配置问题的示例：

```shell
Would you like to use TypeScript (recommended)? no / yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › app/globals.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes
```

### 2.2 添加按钮

运行以下命令以使用 CLI 添加一个按钮：

```shell
npx shadcn-ui@latest add button
```

:bulb: `像elementui直接引入整个UI库。当然也支持按需引入，但在本地开发中也需要将全部资源库下载，只是不需要将所有资源用于项目中，只是打包过程会减少项目体积`

CLI 会自动创建一个组件文件夹，只需要从文件夹中导出它：

```typescript
import { Button } from "@/components/ui/button"

<Button variant="outline">Button</Button>
```



