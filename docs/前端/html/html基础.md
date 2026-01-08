# html语法

## 注释

```html
<!-- commentary -->
```



## 空格数量

```html
无论多少个空格，都视为一个空格
&nbsp;
```



## 转义字符

| 特殊符号 | 转义字符 |
| -------- | -------- |
| <        | `&lt;`   |
| >        | `&gt;`   |
| "        | `&quot;` |
| '        | `&apos;` |
| &        | `&amp;`  |



## 标签构成

- opening tag；
- closing tag；
- content

![image-20251009103134416](./html%E5%9F%BA%E7%A1%80.assets/image-20251009103134416.png)



## 块级、行内

块级：自动换行且独占一行，如 div/p.hx/li/table/header/main

行内：无法设置宽高，通过文本内容确定，不换行，如 span/a/img/input/button



## 属性

```
<html lang="zh-CN"></html>
如 lang 帮助 ​​屏幕阅读器（Screen Reader）​​ 等辅助工具 ​​正确发音或朗读页面内容
```



## 响应式设计

根据设备环境 使用不同的页面布局和资源

### 媒体查询

```
@media (min-width: 750px) {}  /* PC适配 */
@media (max-width:751px){}   /* 移动端适配 */
```



### 相对尺寸

```
使用百分比/rem/vh 等相对尺寸
使用弹性布局 flex
```



## H5新特性汇总

- 语义化标签；
- 视频和音频标签；
- 表单元素；
- canvas 标签；
- svg 标签；
- web 存储；
- worker；
- WebSocket；
- 拖动 API；
- history API