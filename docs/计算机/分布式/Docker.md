# Docker

## 一、概述

> 打包项目带上环境（镜像） --> Docker仓库 --> 其他操作系统 **下载对应的环境** 并 **运行**即可。【每个项目集中单箱子管理】

- 补充：在window中装一个**Vmware**，通过这个软件可以虚拟一台或多台电脑【虚拟机】
- Docker
  - 开发语言： Go
  - Docker官网：https://www.docker.com/
  - DockerHub： https://hub.docker.com/
  - 容器化技术：不是完整的操作系统，

```shell
vm: 
虚拟出一套硬件，运行一个完整的操作系统，并在该系统上安装 和 运行软件
linux centos原生镜像，大小GB级别,开启分钟级别

docker: 
容器内的应用直接运行在宿主机的内容，容器没有内核 和 虚拟硬件，每个容器间有自己的环境，互不影响
核心镜像，大小M/KB, 秒级启动
```



## 二、安装

### 1.Docker组成

- 仓库：repository
  - 存放镜像的地方
  - 公有仓库 / 私有仓库
    - 公有仓库：Docker HUB
    - 阿里云等（可配置镜像加速下载）

- 镜像：image，通过镜像来创建服务，如tomcat镜像 => run => tomcat01容器（提供服务器的角色）
  - 该镜像可以创建多个容器

- 容器：container（简化版的linux）
  - Docker利用容器技术，可运行一个或者一组应用
  - 容器支持启动、停止、删除等基本命令

### 2.安装

#### linux

```shell
cat /etc/os-release  #获取系统信息
```

```
[root@VM-0-3-centos ~]# cat /etc/os-release
NAME="CentOS Linux"
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
ANSI_COLOR="0;31"
CPE_NAME="cpe:/o:centos:centos:7"
HOME_URL="https://www.centos.org/"
BUG_REPORT_URL="https://bugs.centos.org/"

CENTOS_MANTISBT_PROJECT="CentOS-7"
CENTOS_MANTISBT_PROJECT_VERSION="7"
REDHAT_SUPPORT_PRODUCT="centos"
REDHAT_SUPPORT_PRODUCT_VERSION="7"

```

P6



#### windows









## 三、命令

- 镜像命令
- 容器命令
- 操作命令



## 四、镜像





## 五、容器数据卷





## 六、DockerFile





## 七、Docker网络原理





## 八、IDEA整合Docker







## 九、Docker Compose / Docker Swarm 集群管理