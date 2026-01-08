# OCG

`OGC `全称是开放地理空间信息联盟(Open Geospatial Consortium),是一个非盈利的[国际标准组织](https://baike.baidu.com/item/国际标准组织/6039607)，它制定了数据和服务的一系列标准，GIS厂商按照这个标准进行开发可保证空间数据的互操作。

## WMS

### 简介

Web Map Service（网络地图服务），简称WMS，该规范定义了Web客户端从网络地图服务器获取地图的接口标准。这些地图通常用GIF、JPEG或PNG等图像格式，或者SVG、KML、VML和WebCGM等矢量图形格式来表现。使用者通过指定的参数获取相应的地图图片。

### 服务操作列表

WMS实现规范由三个基础性操作协议(GetCapabilities，GetMap和GetFeatureInfo)组成，这些协议共同构成了利用WMS创建和叠加显示不同来源的远程异构地图服务的基础。

|    **操作**     | **实现要求** |                           **描述**                           |
| :-------------: | ------------ | :----------------------------------------------------------: |
| GetCapabilities | 强制实现     | 获取`WMS`的能力文档（即元数据文档），里面包含服务的所有信息  |
|     GetMap      | 强制实现     | 获取地图图片。该操作根据客户端发出的请求参数在服务端进行检索，服务器端返回一个地图图像，其地理空间参数和大小参数是已经明确定义的，返回的地图图像可以是GIF、JPEG、PNG或SVG格式。 |
| GetFeatureInfo  | 选择实现     | 该操作根据用户所请求的X、Y坐标或感兴趣的图层，返回地图上某些特殊要素的信息，信息以HTML，GML或ASCII的格式表示。 |

#### GetCapabilities参数

| **参数名称**   | **参数个数** | **参数类型和值**                                             |
| -------------- | ------------ | ------------------------------------------------------------ |
| service        | 1个(必选)    | 字符类型，服务类型值为“WMS”                                  |
| request        | 1个(必选)    | 字符类型，请求的操作名称，值为“GetCapabilities”              |
| version        | 0或1个(可选) | 字符类型，值为请求的WMS的版本号                              |
| format         | 0或1个(可选) | MIME（媒体类型）类型，值为服务元数据的输出格式               |
| updateSequence | 0或1个(可选) | 字符类型，可取的值有none、any、equal、lower、higher，用来表示缓存数据更新的方式 |

#### GetMap参数

| **参数名称** | **参数个数** | **参数类型和值**                                             |
| ------------ | ------------ | ------------------------------------------------------------ |
| service      | 1个(必选)    | 字符类型，服务类型标识值为“WMS”                              |
| request      | 1个(必选)    | 字符类型，值为“GetMap”                                       |
| version      | 1个(必选)    | 字符类型，值为请求的WMS的版本号                              |
| layers       | 1个(必选)    | 字符类型，值为一个或多个地图图层列表，多个图层之间用”,”隔开  |
| styles       | 1个(必选)    | 字符类型，值为请求图层的地图渲染样式                         |
| CRS          | 1个(必选)    | 字符类型，值为坐标参照系统                                   |
| BBOX         | 1个(必选)    | Wkt格式，值为某个CRS下的地图边界范围的坐标序列               |
| width        | 1个(必选)    | 整型类型，值为地图图片的像素宽度                             |
| height       | 1个(必选)    | 整型类型，值为地图图片的像素高度                             |
| format       | 1个(必选)    | 字符类型，值为地图的输出格式                                 |
| transparent  | 0或1个(可选) | 字符类型，值为true或者false，用来表示地图图层是否透明(默认情况下是不透明的) |
| bgcolor      | 0或1个(可选) | 值为十六进制的RGB值，表示地图的背景颜色                      |
| exceptions   | 0或1个(可选) | 值为WMS的异常信息报告的格式(默认情况下是XML格式)             |
| time         | 0或1个(可选) | 时间类型，值为时间值，表示需要在图层中有时间信息             |
| elevation    | 0或1个(可选) | 数字类型，值为高程值，表示需要在图层中有高程信息             |

#### GetFeatureInfo参数

| **参数名称**     | **参数个数** | **参数类型和值**                                             |
| ---------------- | ------------ | ------------------------------------------------------------ |
| service          | 1个(必选)    | 字符类型，服务类型标识值为“WMS”                              |
| request          | 1个(必选)    | 字符类型，值为“GetFeatureInfo”                               |
| version          | 1个(必选)    | 字符类型，值为请求的WMS的版本号                              |
| map request part | 1个(必选)    | 字符类型，值为获得地图的部分操作参数                         |
| query_layers     | 1个(必选)    | 字符类型，值为查询的一个或多个地图图层列表，多个图层之间用”,”隔开 |
| info_format      | 1个(必选)    | MIME类型，值为请求信息的返回类型                             |
| I                | 1个(必选)    | 整型类型，值为待查询点的在地图图片上的像素列号               |
| J                | 1个(必选)    | 整型类型，值为待查询点的在地图图片上的像素行号               |
| feature_count    | 0或1个(可选) | 整型类型，值为返回信息中的要素的个数(默认是1)                |
| exceptions       | 0或1个(可选) | 值为WMS的异常信息报告的格式(默认情况下是XML格式)             |

### 实例demo

| **操作**        | **调用示例**                                                 |
| --------------- | ------------------------------------------------------------ |
| GetCapabilities | http://tdt.fuzhou.gov.cn/serviceaccess/WMS/DMDZ?version=1.1.1&request=GetCapabilities&service=WMS |
| GetMap          | http://tdt.fuzhou.gov.cn/serviceaccess/WMS/DMDZ?version=1.1.1&request=GetMap&service=WMS&mapservice=DMDZ&layers=1&styles=default&width=1164&height=371&format=png&transparent=true&srs=EPSG%3A4490&bbox=119.28758165903027,26.090243729688037,119.28914270467693,26.0907412794603 |



## WMTS

### 简介

Web Map Tile Service（网络地图瓦片服务），简称WMTS，是和WMS并列的重要OGC规范之一。WMTS不同于WMS,它最重要的特征是采用缓存技术能够缓解WebGIS服务器端数据处理的压力，提高交互响应速度，大幅改善在线地图应用客户端的用户体验。WMTS是OGC主推的缓存技术规范，是目前各种缓存技术相互兼容的一种方法。

### 服务操作列表

| **操作**        | **操作** | **描述**                                                     |
| --------------- | -------- | ------------------------------------------------------------ |
| GetCapabilities | 强制实现 | 获取`WMTS`的能力文档（即元数据文档），里面包含服务的所有信息 |
| GetTile         | 强制实现 | 获取地图瓦片。该操作根据客户端发出的请求参数在服务端进行检索，服务器端返回地图瓦片图像。 |
| GetFeatureInfo  | 强制实现 | 通过在`WMTS`图层上指定一定的条件，返回指定的地图瓦片内容对应的要素信息 |

#### GetCapabilities参数

| **参数名称**   | **参数个数** | **参数类型和值**                                             |
| -------------- | ------------ | ------------------------------------------------------------ |
| service        | 1个(必选)    | 字符类型，服务类型值为“WMTS”                                 |
| request        | 1个(必选)    | 字符类型，请求的操作名称，值为“GetCapabilities”              |
| acceptVersions | 0或1个(可选) | 字符类型，值为请求的WMTS的版本号                             |
| sections       | 0或1个(可选) | 字符类型，请求元数据文档0或多个节的名称，多个名称之间用“，”隔开，不须按顺序排列。值为空默认返回整个元数据文档 |
| updateSequence | 0或1个(可选) | 字符类型，值为increased，为空时默认返回最新的元数据文档      |
| acceptFormat   | 0或1个(可选) | MIME类型，值为服务元数据的输出格式                           |

#### GetTile参数

| **参数名称**            | **参数个数** | **参数类型和值**                                       |
| ----------------------- | ------------ | ------------------------------------------------------ |
| service                 | 1个(必选)    | 字符类型，服务类型标识值为“WMTS”                       |
| request                 | 1个(必选)    | 字符类型，请求的操作值为“GetTile”                      |
| version                 | 1个(必选)    | 字符类型，值为请求的WMTS的版本号                       |
| layer                   | 1个(必选)    | 字符类型，值为请求的图层名称                           |
| style                   | 1个(必选)    | 字符类型，值为请求图层的渲染样式                       |
| format                  | 1个(必选)    | 字符类型，值为瓦片地图的输出格式                       |
| tileMatrixSet           | 1个(必选)    | 字符类型，瓦片矩阵数据集，其值在服务的元数据文档中指定 |
| tileMatrix              | 1个(必选)    | 字符类型，瓦片矩阵，其值在服务的元数据文档中指定       |
| tileRow                 | 1个(必选)    | 整型类型，值为大于0的整数，表示瓦片矩阵的行号          |
| tileCol                 | 1个(必选)    | 整型类型，值为大于0的整数，表示瓦片矩阵的列号          |
| Other sample dimensions | 0或1个(可选) | 字符类型，其他允许的参数                               |

#### GetFeatureInfo参数

| **参数名称**                                                 | **参数个数** | **参数类型和值**                                        |
| ------------------------------------------------------------ | ------------ | ------------------------------------------------------- |
| service                                                      | 1个(必选)    | 字符类型，服务类型值为“WMTS”                            |
| request                                                      | 1个(必选)    | 字符类型，请求的操作值为“GetFeatureInfo”                |
| version                                                      | 1个(必选)    | 字符类型，值为请求的WMTS的版本号                        |
| J                                                            | 1个(必选)    | 整型类型，值为大于0的整数，表示瓦片上一指定像素点的行号 |
| I                                                            | 1个(必选)    | 整型类型，值为大于0的整数，表示瓦片上一指定像素点的列号 |
| info_forma                                                   | 1个(必选)    | MIME类型，值为请求信息的返回类型                        |
| layer, style, format, Sample dimension, tileMatrixSet, tileMatrix, tileRow, tileCol | 1个(必选)    | 这些参数的值应与请求GetTile的相应参数保持一致           |

### 实例demo

| **实例名称**        | **调用实例**                                                 |
| ------------------- | ------------------------------------------------------------ |
| GetCapabilities操作 | http://tdt.fuzhou.gov.cn/serviceaccess/wmts/Vector2012CGCS2000?service=WMTS&request=GetCapabilities |
| GetTile操作         | http://tdt.fuzhou.gov.cn/serviceaccess/wmts/Vector2012CGCS2000?service=WMTS&request=GetTile&layer=0&style=default&tileMatrixSet=sss&tileMatrix=10&tileRow=93074&tileCol=435872&format=image/png |

## WFS

### 简介

Web Feature Service（网络要素服务），简称WFS。该规范主要对OpenGIS简单要素的数据编辑操作进行规范，从而使服务器端和客户端能够在要素层面进行“通讯”。其返回结果的是XML格式的WFS服务元数据文档，通过该文档用户能够了解：WFS服务器支持的所有操作操作列表，GetFeature操作返回的数据格式，可用的坐标参照系统列表，操作异常信息的列表，WFS服务提供商的相关信息，WFS服务器的可用要素类列表等。

### 服务操作列表

| **操作**            | **实现要求** | **描述**                                                     |
| ------------------- | ------------ | ------------------------------------------------------------ |
| GetCapabilities     | 强制实现     | GetCapabilities请求用于查询WFS服务的能力信息，包括支持的操作、支持的格式、空间坐标、包含的资源等。它主要的目的是使客户端在使用GetFeature请求前可以对WFS服务有一个基本的了解，从而可以设置正确的参数。 |
| DescribeFeatureType | 强制实现     | 用于生成一个 Schema 描述，该 Schema 描述了 WFS 服务提供的要素类型（Feature Type），以及要素类型的结构信息。该 Schema 还定义了 WFS 服务所期望的要素实例在输入时如何编码以及输出时如何生成要素实例。 |
| GetFeature          | 强制实现     | GetFeature用于向WFS的客户端程序提供查询特定地理信息的能力，通过GetFeature操作可以由指定的属性条件、空间条件或者两者叠加的条件进行空间查询。 |
| Transaction         | 选择实现     | 允许Transaction操作，使客户端可对服务器端所提供的地图要素类执插入，更新，删除等命令 |
| GetGmlObject        | 选择实现     | 通过XLink获取GML对象                                         |
| LockFeature         | 选择实现     | 在事务过程中锁定要素                                         |

#### GetCapabilities参数

| **参数名称** | **参数个数** |                **参数类型和值**                 |
| :----------: | ------------ | :---------------------------------------------: |
|   service    | 1个(必选)    |           字符类型，服务类型值为“WFS”           |
|   request    | 1个(必选)    | 字符类型，请求的操作名称，值为“GetCapabilities” |
|   versions   | 0或1个(可选) |         字符类型，值为请求的WFS的版本号         |

#### DescribeFeatureType参数

| **参数名称** | **参数个数** | **参数类型和值**                                             |
| ------------ | ------------ | ------------------------------------------------------------ |
| service      | 1个(必选)    | 字符类型，服务类型值为“WFS”                                  |
| request      | 1个(必选)    | 字符类型，请求的操作名称，值为“DescribeFeatureType”          |
| typeName     | 0或1个(可选) | 字符类型，值为要素类型的列表，多个值之间用“，”隔开，默认解析包括的全部要素类型 |
| outputFormat | 0或1个(可选) | MIME类型，值为输出格式                                       |

#### GetFeature参数

|  **参数名称**  | **参数个数** | **参数类型和值**                                             |
| :------------: | :----------: | ------------------------------------------------------------ |
|    service     |  1个(必选)   | 字符类型，服务类型标识值为“WFS”                              |
|    request     |  1个(必选)   | 字符类型，请求的操作值为“GetFeature”                         |
|    typeName    |  1个(必选)   | 字符类型，值为请求的要素类型的名称，多个名称之间用“，”隔开   |
|    version     | 0或1个(可选) | 字符类型，值为请求的WFS的版本号                              |
|  outputFormat  | 0或1个(可选) | MIME类型，值为输出格式                                       |
|   resultType   | 0或1个(可选) | 字符类型，值为请求的结果类型                                 |
|  propertyName  | 0或1个(可选) | 字符类型，值为请求要素的属性名，多个值之间用“，”隔开         |
| featureVersion | 0或1个(可选) | 字符类型，值为要素的版本，值为ALL返回请求的要素的所有版本，没有值默认为返回请求要素的最新版本 |
|   maxFeature   | 0或1个(可选) | 整型类型，值为请求要素的最大数，默认值为满足查询的所有结果集 |
|     expiry     | 0或1个(可选) | 数字类型，要素被锁定的时间                                   |
|    SRSName     | 0或1个(可选) | 字符类型，值为坐标系统名                                     |
|   featureID    | 0或1个(可选) | 字符类型，值为要素的ID，多个ID之间用“，”隔开                 |
|     filter     | 0或1个(可选) | 请求要素的过滤条件                                           |
|      bBox      | 0或1个(可选) | Wkt格式，请求指定要素查询范围，可以替代featureId和filter参数 |
|     sortby     | 0或1个(可选) | 字符类型，查询结果属性值的排序依据                           |

### 实例demo

| **操作**            | **调用示例**                                                 |
| ------------------- | ------------------------------------------------------------ |
| GetCapabilities     | http://tdt.fuzhou.gov.cn/serviceaccess/WFS/DMDZ_WFS-G?service=WFS&request=GetCapabilities&version=1.0.0 |
| DescribeFeatureType | http://tdt.fuzhou.gov.cn/serviceaccess/WFS/DMDZ_WFS-G?service=WFS&request=DescribeFeatureType&typename=DMDZ:地名&version=1.0.0 |
| GetFeature          | [http://tdt.fuzhou.gov.cn/serviceaccess/WFS/DMDZ_WFS-G?service=WFS&request=GetFeature&typename=DMDZ:地名&version=1.0.0&maxFeature=20](http://tdt.fuzhou.gov.cn/serviceaccess/WFS/DMDZ_WFS-G?service=WFS&request=GetFeature&typename=DMDZ:地名&version=1.0.0) |