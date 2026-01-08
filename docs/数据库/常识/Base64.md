# Base64

> 一种将二进制的01序列转化成ASCII字符的编码方式。

- Base64编码在网络上的常见应用是对二进制数据进行编码，以便将其纳入data:URL中

:bulb: Data URL，即前缀为 `data:` 协议的 URL，其允许内容创建者向文档中嵌入小文件。例如：[`data:text/plain;base64,SGVsbG8sIFdvcmxkIQ%3D%3D`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URLs#datatextplainbase64sgvsbg8sifdvcmxkiq3d3d)



- 在JavaScript 中，有两个函数被分别用来处理解码和编码 Base64 字符串：

  - [`btoa()`](https://developer.mozilla.org/zh-CN/docs/Web/API/btoa)：从二进制数据“字符串”创建一个 Base-64 编码的 ASCII 字符串（“btoa”应读作“binary to ASCII”）

  - [`atob()`](https://developer.mozilla.org/zh-CN/docs/Web/API/atob)：解码通过 Base-64 编码的字符串数据（“atob”应读作“ASCII to binary”）



## 编码尺寸增加

每一个 Base64 字符实际上代表着 6 比特位。因此，3 字节（一字节是 8 比特，3 字节也就是 24 比特）的字符串/二进制文件可以转换成 4 个 Base64 字符（4x6 = 24 比特）。

这意味着 Base64 格式的字符串或文件的尺寸约是原始尺寸的 133%（增加了大约 33%）。如果编码的数据很少，增加的比例可能会更高。例如：长度为 1 的字符串 `"a"` 进行 Base64 编码后是 `"YQ=="`，长度为 4，尺寸增加了 3 倍。



## Unicode问题

具体解决办法详见 https://developer.mozilla.org/zh-CN/docs/Glossary/Base64
