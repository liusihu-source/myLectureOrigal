# MIME类型

## 一、MIME type

### 1.1 概念

- MIME（Multipurpose Internet Mail Extensions）多用途互联网邮件扩展类型
- 一种标准，用来表示文档、文件或一组数据的性质和格式



### 1.2 结构

两个部分：*类型*（type）和*子类型*（subtype），中间由斜杠 `/` 分割，中间没有空白字符：

```shell
type/subtype
```

**类型\**代表数据类型所属的大致分类，例如 `video` 或 `text`。

**子类型\**标识了 MIME 类型所代表的指定类型的确切数据类型。以 `text` 类型为例，它的子类型包括：`plain`（纯文本）、`html`（[HTML](https://developer.mozilla.org/zh-CN/docs/Glossary/HTML) 源代码）、`calender`（iCalendar/`.ics` 文件）。



每种类型都有自己的一组可能的子类型。一个 MIME 类型总是包含类型与子类型这两部分，且二者必需成对出现。

有一个可选的**参数**，能够提供额外的信息：

```
type/subtype;parameter=value
```



例如，对于主类型为 `text` 的任何 MIME 类型，可以添加可选的 `charset` 参数，以指定数据中的字符所使用的字符集。如果没有指定 `charset`，默认值为 [ASCII](https://developer.mozilla.org/zh-CN/docs/Glossary/ASCII)（`US-ASCII`），除非被[用户代理的](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent)设置覆盖。要指定 UTF-8 文本文件，则使用 MIME 类型 `text/plain;charset=UTF-8`。

MIME 类型对大小写不敏感，但是传统写法都是小写。参数值可以是大小写敏感的。



## 二、常见的MIME type

文本

| MIME types       | 说明              |
| ---------------- | ----------------- |
| text/plain       | 普通文本, 默认值  |
| text/csv         | csv 文件          |
| text/css         | css 文件          |
| text/html        | html 文件         |
| text/javascript  | JavaScript 文件   |
| text/xml         | xml 文件 (可读)   |
| application/xml  | xml 文件 (不可读) |
| application/rtf  | 富文本            |
| application/pdf  | pdf 文件          |
| application/json | json 文件         |



图片

| MIME types    | 说明      |
| ------------- | --------- |
| image/gif     | gif 图片  |
| image/jpeg    | jpeg 图片 |
| image/png     | png 图片  |
| image/svg+xml | svg 图片  |
| image/webp    | web 图片  |
| image/tiff    | tiff 图片 |
| image/x-icon  | ico 图标  |



音视频

| MIME types | 说明      |
| ---------- | --------- |
| audio/acc  | acc 音频  |
| audio/mp3  | mp3 音频  |
| audio/wav  | wav 音频  |
| audio/webm | webm 音频 |
| video/webm | webm 视频 |



表单

| MIME types          | 说明 |
| ------------------- | ---- |
| multipart/form-data | 表单 |



字体

| MIME types | 说明       |
| ---------- | ---------- |
| font/otf   | otf 格式   |
| font/ttf   | ttf 格式   |
| font/woff  | woff 格式  |
| font/woff2 | woff2 格式 |



压缩包

| MIME types      | 说明     |
| --------------- | -------- |
| application/zip | zip 格式 |



[MIME 类型大全](https://www.iana.org/assignments/media-types/media-types.xhtml)