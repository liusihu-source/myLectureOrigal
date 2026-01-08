# CentOS7

## 一、VMware软件安装

秘钥许可证：ZF71R-DMX85-08DQY-8YMNC-PPHV8

Vmware 和 centos 软件下载目录：链接：https://pan.baidu.com/s/16w7hRbafE8Hssy-nN8WySA 
提取码：w3i7

## 二、创建虚拟机 和 CentOS

### 2.1 安装虚拟机

![image-20231026104620207](Centos7笔记.assets/image-20231026104620207.png)

![image-20231026104629813](Centos7笔记.assets/image-20231026104629813.png)

![image-20231026104654722](Centos7笔记.assets/image-20231026104654722.png)

![image-20231026104707737](Centos7笔记.assets/image-20231026104707737.png)

![image-20231026104721886](Centos7笔记.assets/image-20231026104721886.png)

![image-20231026104747460](Centos7笔记.assets/image-20231026104747460.png)

![image-20231026104855714](Centos7笔记.assets/image-20231026104855714.png)

![image-20231026104914753](Centos7笔记.assets/image-20231026104914753.png)

![image-20231026105105102](Centos7笔记.assets/image-20231026105105102.png)

:bulb: 其中的 `使用网络地址转换NAT`，类似将本实体机作为虚拟路由器，而内部的虚拟机作为平常我们使用的电脑

![image-20231026105206067](Centos7笔记.assets/image-20231026105206067.png)

![image-20231026105220475](Centos7笔记.assets/image-20231026105220475.png)

![image-20231026105236648](Centos7笔记.assets/image-20231026105236648.png)

![image-20231026105305340](Centos7笔记.assets/image-20231026105305340.png)

![image-20231026105319287](Centos7笔记.assets/image-20231026105319287.png)

![image-20231026105328969](Centos7笔记.assets/image-20231026105328969.png)

![image-20231026105501998](Centos7笔记.assets/image-20231026105501998.png)

:warning: 确保本机开启虚拟化

![image-20231026105557450](Centos7笔记.assets/image-20231026105557450.png)

![image-20231026105623681](Centos7笔记.assets/image-20231026105623681.png)

![image-20231026105649385](Centos7笔记.assets/image-20231026105649385.png)

### 2.2 安装CentOS7

:bulb: 图标变白了，表示当前选中的是哪个选项，然后敲回车，表示执行所选选项。

![image-20231027111852237](Centos7笔记.assets/image-20231027111852237.png)

![image-20231027111927486](Centos7笔记.assets/image-20231027111927486.png)

![image-20231027111936771](Centos7笔记.assets/image-20231027111936771.png)

![image-20231027112021730](Centos7笔记.assets/image-20231027112021730.png)

调整时间差 后 安装GHOME（图形化界面的方式）

![image-20231027112133686](Centos7笔记.assets/image-20231027112133686.png)

配置磁盘分区

![image-20231027112149294](Centos7笔记.assets/image-20231027112149294.png)

手动添加分区

![image-20231027112220679](Centos7笔记.assets/image-20231027112220679.png)

添加boot区，1G容量后添加挂载点
![image-20231027112308248](Centos7笔记.assets/image-20231027112308248.png)

![image-20231027112316046](Centos7笔记.assets/image-20231027112316046.png)

添加swap交换分区

![image-20231027112342703](Centos7笔记.assets/image-20231027112342703.png)

![image-20231027112348669](Centos7笔记.assets/image-20231027112348669.png)

![image-20231027112355698](Centos7笔记.assets/image-20231027112355698.png)

配置根目录，把剩下的空间都放至此 50 - 4 - 1 = 45

![image-20231027132829591](Centos7笔记.assets/image-20231027132829591.png)

![image-20231027132924522](Centos7笔记.assets/image-20231027132924522.png)

3 个分区都配置完毕过后可以点击完成。

![image-20231027132943044](Centos7笔记.assets/image-20231027132943044.png)

分区配置完成，点击接收更改。

![image-20231027133009905](Centos7笔记.assets/image-20231027133009905.png)

关闭kdump，否则会占用部分内存（用于记录系统崩溃时候的日志信息）

![image-20231027133133924](Centos7笔记.assets/image-20231027133133924.png)

修改主机名

![image-20231027133150960](Centos7笔记.assets/image-20231027133150960.png)

是否开启安全协议，这里开启与否都可以

![image-20231027133222692](Centos7笔记.assets/image-20231027133222692.png)

开始安装

![image-20231027133238490](Centos7笔记.assets/image-20231027133238490.png)

安装时间较长，后设置ROOT密码

![image-20231027133305367](Centos7笔记.assets/image-20231027133305367.png)

![image-20231027133324332](Centos7笔记.assets/image-20231027133324332.png)

### 2.3 重启虚拟机

安装后重启虚拟机

![image-20231027133401109](Centos7笔记.assets/image-20231027133401109.png)

进入引导界面，点击接收许可

![image-20231027133424604](Centos7笔记.assets/image-20231027133424604.png)

![image-20231027133438711](Centos7笔记.assets/image-20231027133438711.png)

![image-20231027133447903](Centos7笔记.assets/image-20231027133447903.png)

![image-20231027133454990](Centos7笔记.assets/image-20231027133454990.png)

![image-20231027133502367](Centos7笔记.assets/image-20231027133502367.png)

![image-20231027133518553](Centos7笔记.assets/image-20231027133518553.png)

![image-20231027133526131](Centos7笔记.assets/image-20231027133526131.png)

![image-20231027133544916](Centos7笔记.assets/image-20231027133544916.png)

> 其他详细配置链接（如XFTP链接）
>
> 链接：https://pan.baidu.com/s/1ItcWv9odtUWpei2EaprfRg 
> 提取码：7qhe

## 三、文件系统目录

![image-20231023150604975](Centos7笔记.assets/image-20231023150604975.png)

> 根目录下的bin、lib、lib64 和 sbin是快捷方式，都是在usr下

1. bin
   - Binary的缩写，存放最经常使用的命令
2. boot
   - 存放启动linux时使用的核心文件，包括连接文件及镜像文件
3. dev
   - 类似于windows的设备管理器，把所有的硬件用文件的形式存储
4. `etc`
   - 所有系统管理需要的配置文件 和 子目录
5. home
   - 存放用户的主目录，每个用户都有一个独立的子目录
6. lib & lib64
   - 系统开机需要最基本的动态链接库，类似windowsdll
7. lost+found
   - 一般是空的，当系统非法关机后，存放一些文件
8. media
   - linux系统会自动识别一些设备，如U盘，光驱等，识别后，会把识别的设备挂在到这个目录下
9. mnt
   - 给用户临时挂载别的文件系统的，如NFS
10. `opt`
    - 给主机额外安装软件拜访的目录，如用户可以安装第三方应用程序的目录
11. proc
    - 虚拟目录，存放系统内核 和 进程的信息，可通过直接访问这个目录来获取系统信息
12. root
    - 系统管理员 / 超级权限者的用户主目录
13. run
    - 存放系统运行时的临时文件，如进程ID文件
14. sbin
    - 系统管理员 / 超级权限者 可使用的系统管理程序
15. srv
    - service的缩写，存放一些服务启动后需要提取的数据
16. sys
    - 存放系统硬件设备的信息，与proc类似，但sys下针对硬件设备
17. `tmp`
    - 用来存放临时文件，这些文件在系统重启时会被清空
18. `usr`
    - 用户的应用程序 和 文件 都放在这个目录下，类似于Windows 下的 program files
19. `var`
    - 存放不断扩充的内容，如各种日志文件，特别是/var/log/wtmp为登录日志纪录所有到系统的登录和注销的用户，/var/log/messages 为系统日志纪录存储所有核心和系统程序信息

以上的etc、opt、tmp、usr 和 var等目录一般可被用户修改，其他尽量不要修改

## 四、常用指令

### 4.1 帮助命令

#### 4.1.1 man 

**查看ls命令的帮助信息** 

```shell
[root@hecs-354629 ~]# man ls
```

![image-20231027190238442](Centos7笔记.assets/image-20231027190238442.png)

#### 4.1.2 help

> 一部分基础功能的系统命令是直接内嵌在 shell 中的，系统加载启动之后会随着 shell
> 一起加载，常驻系统内存中。这部分命令被称为“内置（built-in）命令”；相应的其它命令
> 被称为“外部命令”

**查看cd命令的帮助信息**

```shell
[root@hecs-354629 ~]# help cd
```

![image-20231027191218579](Centos7笔记.assets/image-20231027191218579.png)

### 4.2 文件目录类

#### 4.2.1 pwd 显示当前工作目录的绝对路径

> pwd:print working directory 打印工作目录

显示当前目录的绝对路径

```shell
[root@hecs-354629 ~]# pwd
```

![image-20231027192139946](Centos7笔记.assets/image-20231027192139946.png)

#### 4.2.2 ls列出目录内容

> ls:list 列出目录内容

选项说明

![image-20231027192349639](Centos7笔记.assets/image-20231027192349639.png)

查看当前目录的所有内容信息

```shell
[root@hecs-354629 ~]# ls -al
total 44
dr-xr-x---.  5 root root 4096 Oct  8 23:35 .
dr-xr-xr-x. 20 root root 4096 Oct  9 11:04 ..
-rw-r--r--   1 root root  847 Oct  9 11:12 .bash_history
-rw-r--r--.  1 root root   18 Dec 29  2013 .bash_logout
-rw-r--r--.  1 root root  176 Dec 29  2013 .bash_profile
-rw-r--r--.  1 root root  176 Dec 29  2013 .bashrc
drwx------   3 root root 4096 Jul 12 18:25 .cache
-rw-r--r--.  1 root root  100 Dec 29  2013 .cshrc
-rw-------   1 root root    0 Jul 12 18:26 .history
drwxr-----   3 root root 4096 Jul 12 18:09 .pki
drwx------   2 root root 4096 Oct  8 23:35 .ssh
-rw-r--r--.  1 root root  129 Dec 29  2013 .tcshrc

```

#### 4.2.3 cd 切换目录

> cd:Change Directory 切换路径

参数说明

![image-20231027192710509](Centos7笔记.assets/image-20231027192710509.png)

1、使用绝对路径切换到root目录

```shell
[root@hecs-354629 ~]# cd /root/
[root@hecs-354629 ~]# 
```

2、使用根目录，即/root目录

```shell
[root@hecs-354629 /]# cd ~
[root@hecs-354629 ~]# ls
[root@hecs-354629 ~]# 
```

3、回到当前目录的上一级目录

```shell
[root@hecs-354629 /]# cd opt
[root@hecs-354629 opt]# cd ..
[root@hecs-354629 /]# ls
bin   CloudrResetPwdAgent  etc   lib    lost+found  mnt           opt   root  sbin  sys  usr
boot  dev                  home  lib64  media       nginx-1.19.9  proc  run   srv   tmp  var
[root@hecs-354629 /]# 

```

#### 4.2.4 mkdir 创建新的目录

> mkdir:Make directory 建立目录

创建一个目录

```shell
[root@hecs-354629 /]# mkdir xiyou
[root@hecs-354629 /]# mkdir xiyou/mingjie
```

![image-20231027200355940](Centos7笔记.assets/image-20231027200355940.png)

创建一个多级目录

```shell
[root@hecs-354629 /]# mkdir -p xiyou/dssz/meihouwang

```

![image-20231027200459448](Centos7笔记.assets/image-20231027200459448.png)

#### 4.2.5rmdir 删除一个空的目录

> rmdir:Remove directory 移除目录

```shell
[root@hecs-354629 /]# rmdir xiyou/dssz/meihouwang
[root@hecs-354629 /]# 

```

![image-20231027200652712](Centos7笔记.assets/image-20231027200652712.png)

#### 4.2.6 touch创建空文件

```shell
[root@hecs-354629 /]# touch xiyou/dssz/sunwukong.txt
[root@hecs-354629 /]# 

```

![image-20231027201804625](Centos7笔记.assets/image-20231027201804625.png)

#### 4.2.7 cp复制文件或目录

:warning: 记得操作前要到对应的目录下

复制文件

```shell
[root@hecs-354629 ~]# cp xiyou/dssz/sunwukong.txt xiyou/mingjie/

```

![image-20231028100424358](Centos7笔记.assets/image-20231028100424358.png)

复制整个文件夹

```shell
[root@hecs-354629 ~]# cp -r xiyou/dssz/ ./
```

![image-20231028100457551](Centos7笔记.assets/image-20231028100457551.png)



#### 4.2.8 rm删除文件或目录

选项说明

![image-20231028100634624](Centos7笔记.assets/image-20231028100634624.png)

删除目录中的内容

```shell
[root@hecs-354629 /]# rm xiyou/mingjie/sunwukong.txt
rm: remove regular empty file ‘xiyou/mingjie/sunwukong.txt’? y
[root@hecs-354629 /]# 

```

![image-20231028100924107](Centos7笔记.assets/image-20231028100924107.png)

删除目录中所有内容（包括子目录）

```shell
[root@hecs-354629 /]# rm -rf dssz/
[root@hecs-354629 /]# 

```

![image-20231028101157543](Centos7笔记.assets/image-20231028101157543.png)



#### 4.2.9 mv移动文件与目录或重命名

重命名

```shell
[root@hecs-354629 /]# mv xiyou/dssz/suwukong.txt xiyou/dssz/houge.txt
[root@hecs-354629 /]# 

```

![image-20231028101422742](Centos7笔记.assets/image-20231028101422742.png)

移动文件

```shell
[root@hecs-354629 /]# mv xiyou/dssz/houge.txt ./
[root@hecs-354629 /]# 

```

![image-20231028101543970](Centos7笔记.assets/image-20231028101543970.png)



#### 4.2.10 cat查看文件内容

选项说明

![image-20231028103455722](Centos7笔记.assets/image-20231028103455722.png)

查看文件内容并显示行号

```shell
[root@hecs-354629 dssz]# cat -n houge.txt
     1	1111[root@hecs-354629 dssz]# 
```



#### 4.2.11 more文件内容分屏查看器

more指令是一个基于VI编辑器的文本过滤器，以全屏幕的方式按页显示文本文件的内容。指令中内置了若干快捷键，详见操作如下

![image-20231028105535267](Centos7笔记.assets/image-20231028105535267.png)



#### 4.2.12 less分屏显示文件内容

less 指令用来分屏查看文件内容，它的功能与 more 指令类似，但是比 more 指令更加强大，支持各种显示终端。less 指令在显示文件内容时，并不是一次将整个文件加载之后才显示，而是根据显示需要加载内容，对于显示大型文件具有较高的效率。

![image-20231028105754720](Centos7笔记.assets/image-20231028105754720.png)



#### 4.2.13 echo 输出内容到控制台

略

#### 4.2.14 head 显示文件头部内容

略

#### 4.2.15 tail 输出文件尾部内容

略

#### 4.2.16 >输出重定向和 >> 追加

略

#### 4.2.17 ln 软链接

略

#### 4.2.18 history 查看已经执行过历史命令

略

### 4.3 时间日期类

略

## 五、软件包管理

### 5.1 RPM

#### 5.1.1 RPM 概述

RPM（RedHat Package Manager），RedHat软件包管理工具，类似windows里面的setup.exe是Linux这系列操作系统里面的打包安装工具，它虽然是RedHat的标志，但理念是通用的。RPM包的名称格式
Apache-1.3.23-11.i386.rpm

- “apache” 软件名称
- “1.3.23-11”软件的版本号，主版本和此版本
- “i386”是软件所运行的硬件平台，Intel 32位处理器的统称
- “rpm”文件扩展名，代表RPM包

#### 5.1.2 RPM命令

rpm -qa（RedHat Package Manager query all）  用于查询安装的所有rpm软件包

:bulb: 如果软件安装比较多，可以采用过滤手段 rpm -qa | grep rpm软件包  （grep是文本搜索工具，用于文本中查看特定的字符串）

```shell
rpm -qa
mariadb-libs-5.5.68-1.el7.x86_64
initscripts-9.49.49-1.el7.x86_64
setup-2.8.71-11.el7.noarch
kernel-devel-3.10.0-1160.92.1.el7.x86_64
libpcap-1.5.3-13.el7_9.x86_64
iwl3945-firmware-15.32.2.9-80.el7_9.noarch
iwl105-firmware-18.168.6.1-80.el7_9.noarch
ncurses-libs-5.9-14.20130511.el7_4.x86_64
iwl4965-firmware-228.61.2.24-80.el7_9.noarch
libselinux-2.5-15.el7.x86_64
iwl100-firmware-39.31.5.1-80.el7_9.noarch
alsa-firmware-1.0.28-2.el7.noarch
gcc-c++-4.8.5-44.el7.x86_64
dbus-python-1.1.1-9.el7.x86_64
popt-1.13-16.el7.x86_64
libsepol-devel-2.5-10.el7.x86_64
python-pyudev-0.15-9.el7.noarch
readline-6.2-11.el7.x86_64
keyutils-libs-devel-1.5.8-3.el7.x86_64
libcap-2.22-11.el7.x86_64
libgcrypt-1.5.3-14.el7.x86_64
gmp-6.0.0-15.el7.x86_64
aic94xx-firmware-30-6.el7.noarch
gdbm-1.10-8.el7.x86_64
irqbalance-1.0.7-12.el7.x86_64
perl-Pod-Perldoc-3.20-4.el7.noarch
tcpdump-4.9.2-4.el7_7.1.x86_64
perl-Pod-Usage-1.63-3.el7.noarch
btrfs-progs-4.9.1-1.el7.x86_64
perl-Storable-2.45-3.el7.x86_64
perl-Time-Local-1.2300-2.el7.noarch
lsof-4.87-6.el7.x86_64
perl-Carp-1.26-244.el7.noarch
perl-PathTools-3.40-5.el7.x86_64
sysvinit-tools-2.88-14.dsf.el7.x86_64
libnl3-cli-3.2.28-4.el7.x86_64
tar-1.26-35.el7.x86_64
gpg-pubkey-f4a80eb5-53a7ff4b
make-3.82-24.el7.x86_64
python3-setuptools-39.2.0-10.el7.noarch
newt-0.52.15-4.el7.x86_64
iftop-1.0-0.21.pre4.el7.x86_64
lzo-2.06-8.el7.x86_64
libxml2-2.9.1-6.el7_9.6.x86_64
libnetfilter_conntrack-1.0.6-1.el7_3.x86_64
libgcc-4.8.5-44.el7.x86_64
firewalld-filesystem-0.6.3-13.el7_9.noarch
bash-4.2.46-35.el7_9.x86_64
bc-1.06.95-13.el7.x86_64
nspr-4.34.0-3.1.el7_9.x86_64
ed-1.9-4.el7.x86_64
xz-libs-5.2.2-2.el7_9.x86_64
perl-macros-5.16.3-299.el7_9.x86_64
file-libs-5.11-37.el7.x86_64
mozjs17-17.0.0-20.el7.x86_64
cpio-2.11-28.el7.x86_64
hardlink-1.0-19.el7.x86_64
iptables-1.4.21-35.el7.x86_64
libss-1.42.9-19.el7.x86_64
numactl-libs-2.0.12-5.el7.x86_64
libteam-1.29-3.el7.x86_64
p11-kit-trust-0.23.5-3.el7.x86_64
libsmartcols-2.23.2-65.el7_9.1.x86_64
ca-certificates-2022.2.54-74.el7_9.noarch
libblkid-2.23.2-65.el7_9.1.x86_64
shared-mime-info-1.8-5.el7.x86_64
python-2.7.5-93.el7_9.x86_64
cracklib-dicts-2.9.0-11.el7.x86_64
bind-export-libs-9.11.4-26.P2.el7_9.13.x86_64
gettext-libs-0.19.8.1-3.el7.x86_64
binutils-2.27-44.base.el7_9.1.x86_64
yum-metadata-parser-1.1.4-10.el7.x86_64
nss-tools-3.79.0-5.el7_9.x86_64
python-configobj-4.7.2-7.el7.noarch
rpm-libs-4.11.3-48.el7_9.x86_64
python-iniparse-0.4-9.el7.noarch
systemd-libs-219-78.el7_9.7.x86_64
python-schedutils-0.4-6.el7.x86_64
elfutils-default-yama-scope-0.176-5.el7.noarch
fipscheck-lib-1.4.1-6.el7.x86_64
NetworkManager-libnm-1.18.8-2.el7_9.x86_64
centos-logos-70.0.6-3.el7.centos.noarch
device-mapper-1.02.170-6.el7_9.5.x86_64
redhat-lsb-submod-security-4.1-27.el7.centos.1.x86_64
virt-what-1.18-4.el7_9.1.x86_64
systemd-sysv-219-78.el7_9.7.x86_64
gnupg2-2.0.22-5.el7_5.x86_64
plymouth-core-libs-0.8.9-0.34.20140113.el7.centos.x86_64
grub2-tools-extra-2.02-0.87.0.2.el7.centos.11.x86_64
plymouth-0.8.9-0.34.20140113.el7.centos.x86_64
libpipeline-1.2.3-3.el7.x86_64
yum-3.4.3-168.el7.centos.noarch
libsemanage-2.5-14.el7.x86_64
gcc-4.8.5-44.el7.x86_64
qrencode-libs-3.4.1-3.el7.x86_64
dracut-config-rescue-033-572.el7.x86_64
tuned-2.11.0-12.el7_9.noarch
cryptsetup-libs-2.0.3-6.el7.x86_64
microcode_ctl-2.1-73.15.el7_9.x86_64
sudo-1.8.23-10.el7_9.3.x86_64
polkit-pkla-compat-0.1-4.el7.x86_64
e2fsprogs-1.42.9-19.el7.x86_64
iputils-20160308-10.el7.x86_64
centos-release-7-8.2003.0.el7.centos.x86_64
filesystem-3.2-25.el7.x86_64
os-prober-1.58-9.el7.x86_64
avahi-libs-0.6.31-20.el7.x86_64
libpciaccess-0.14-1.el7.x86_64
postfix-2.10.1-9.el7.x86_64
pcre-8.32-17.el7.x86_64
fxload-2002_04_11-16.el7.x86_64
alsa-tools-firmware-1.1.0-1.el7.x86_64
libstdc++-devel-4.8.5-44.el7.x86_64
dbus-glib-0.100-7.el7.x86_64
bzip2-libs-1.0.6-13.el7.x86_64
zlib-devel-1.2.7-21.el7_9.x86_64
python-slip-dbus-0.4.0-4.el7.noarch
pcre-devel-8.32-17.el7.x86_64
grep-2.20-3.el7.x86_64
libselinux-devel-2.5-15.el7.x86_64
gawk-4.0.2-4.el7_3.1.x86_64
libverto-devel-0.2.5-4.el7.x86_64
libacl-2.2.51-15.el7.x86_64
krb5-devel-1.15.1-55.el7_9.x86_64
libestr-0.1.9-2.el7.x86_64
audit-libs-2.8.5-4.el7.x86_64
sg3_utils-1.37-19.el7.x86_64
findutils-4.5.11-6.el7.x86_64
libffi-3.0.13-19.el7.x86_64
which-2.20-7.el7.x86_64
sqlite-3.7.17-8.el7_7.1.x86_64
libnl3-3.2.28-4.el7.x86_64
authconfig-6.2.8-30.el7.x86_64
mpfr-3.1.1-4.el7.x86_64
pciutils-3.5.1-3.el7.x86_64
libidn-1.28-4.el7.x86_64
audit-2.8.5-4.el7.x86_64
hostname-3.13-3.el7_7.1.x86_64
net-tools-2.0-0.25.20131004git.el7.x86_64
perl-parent-0.225-244.el7.noarch
biosdevname-0.7.3-2.el7.x86_64
perl-podlators-2.5.1-3.el7.noarch
perl-Encode-2.51-7.el7.x86_64
perl-threads-1.87-4.el7.x86_64
perl-Filter-1.49-3.el7.x86_64
perl-Time-HiRes-1.9725-3.el7.x86_64
perl-constant-1.27-2.el7.noarch
perl-Scalar-List-Utils-1.27-248.el7.x86_64
libsysfs-2.1.0-16.el7.x86_64
perl-File-Temp-0.23.01-3.el7.noarch
perl-Pod-Simple-3.28-4.el7.noarch
perl-Socket-2.010-5.el7.x86_64
pciutils-libs-3.5.1-3.el7.x86_64
ivtv-firmware-20080701-26.el7.noarch
libmpc-1.0.1-3.el7.x86_64
libassuan-2.1.0-3.el7.x86_64
libunistring-0.9.3-9.el7.x86_64
python3-pip-9.0.3-8.el7.noarch
slang-2.2.4-11.el7.x86_64
python3-3.6.8-19.el7_9.x86_64
jansson-2.10-1.el7.x86_64
gpg-pubkey-352c64e5-52ae6884
tcp_wrappers-libs-7.6-77.el7.x86_64
cloud-utils-growpart-0.29-5.el7.noarch
ethtool-4.8-10.el7.x86_64
python2-futures-3.1.1-5.el7.noarch
libxml2-python-2.9.1-6.el7_9.6.x86_64
sos-3.9-5.el7.centos.11.noarch
grub2-common-2.02-0.87.0.2.el7.centos.11.noarch
ipset-libs-7.1-1.el7.x86_64
vim-filesystem-7.4.629-8.el7_9.x86_64
less-458-9.el7.x86_64
kbd-misc-1.15.5-16.el7_9.noarch
acl-2.2.51-15.el7.x86_64
tzdata-2023c-1.el7.noarch
patch-2.7.1-12.el7_7.x86_64
glibc-common-2.17-326.el7_9.x86_64
libdb-utils-5.3.21-25.el7.x86_64
glibc-2.17-326.el7_9.x86_64
time-1.7-45.el7.x86_64
libselinux-utils-2.5-15.el7.x86_64
ncurses-5.9-14.20130511.el7_4.x86_64
snappy-1.1.0-3.el7.x86_64
libverto-0.2.5-4.el7.x86_64
pth-2.0.7-23.el7.x86_64
libndp-1.2-9.el7.x86_64
lsscsi-0.27-6.el7.x86_64
libtasn1-4.10-1.el7.x86_64
cracklib-2.9.0-11.el7.x86_64
python-decorator-3.4.0-3.el7.noarch
libpwquality-1.2.3-5.el7.x86_64
gettext-0.19.8.1-3.el7.x86_64
python-gobject-base-3.22.0-1.el7_4.1.x86_64
pkgconfig-0.27.1-4.el7.x86_64
pyliblzma-0.5.3-11.el7.x86_64
pyxattr-0.5.1-5.el7.x86_64
newt-python-0.52.15-4.el7.x86_64
python-slip-0.4.0-4.el7.noarch
fipscheck-1.4.1-6.el7.x86_64
logrotate-3.8.6-19.el7.x86_64
libuser-0.60-9.el7.x86_64
gpgme-1.3.2-5.el7.x86_64
passwd-0.79-6.el7.x86_64
python-urlgrabber-3.10-10.el7.noarch
alsa-lib-1.1.8-1.el7.x86_64
man-db-2.6.3-11.el7.x86_64
ustr-1.0.4-16.el7.x86_64
shadow-utils-4.6-5.el7.x86_64
libdaemon-0.14-7.el7.x86_64
crontabs-1.11-6.20121102git.el7.noarch
openssl-1.0.2k-26.el7_9.x86_64
kernel-tools-3.10.0-1160.92.1.el7.x86_64
perl-Pod-Escapes-1.04-299.el7_9.noarch
iprutils-2.4.17.1-3.el7_7.x86_64
unzip-6.0-24.el7_9.x86_64
psmisc-22.20-17.el7.x86_64
iwl135-firmware-18.168.6.1-80.el7_9.noarch
iwl3160-firmware-25.30.13.0-80.el7_9.noarch
iwl7260-firmware-25.30.13.0-80.el7_9.noarch
iwl1000-firmware-39.31.5.1-80.el7_9.noarch
epel-release-7-14.noarch
iwl5000-firmware-8.83.5.1_1-80.el7_9.noarch
iwl6050-firmware-41.28.5.1-80.el7_9.noarch
iwl5150-firmware-8.24.2.2-80.el7_9.noarch
nss-util-3.79.0-1.el7_9.x86_64
libcom_err-1.42.9-19.el7.x86_64
libuuid-2.23.2-65.el7_9.1.x86_64
sed-4.2.2-7.el7.x86_64
perl-libs-5.16.3-299.el7_9.x86_64
chkconfig-1.7.6-1.el7.x86_64
file-5.11-37.el7.x86_64
libstdc++-4.8.5-44.el7.x86_64
nss-softokn-3.79.0-4.el7_9.x86_64
diffutils-3.3-6.el7_9.x86_64
iproute-4.11.0-30.el7.x86_64
e2fsprogs-libs-1.42.9-19.el7.x86_64
cpp-4.8.5-44.el7.x86_64
freetype-2.8-14.el7_9.1.x86_64
dmidecode-3.2-5.el7_9.1.x86_64
vim-common-7.4.629-8.el7_9.x86_64
kernel-tools-libs-3.10.0-1160.92.1.el7.x86_64
linux-firmware-20200421-80.git78c0348.el7_9.noarch
openssl-libs-1.0.2k-26.el7_9.x86_64
krb5-libs-1.15.1-55.el7_9.x86_64
libmount-2.23.2-65.el7_9.1.x86_64
python-libs-2.7.5-93.el7_9.x86_64
gzip-1.5-11.el7_9.x86_64
python-firewall-0.6.3-13.el7_9.noarch
cups-libs-1.6.3-51.el7.x86_64
selinux-policy-3.13.1-268.el7_9.2.noarch
nss-pem-1.0.3-7.el7_9.1.x86_64
nss-3.79.0-5.el7_9.x86_64
libssh2-1.8.0-4.el7.x86_64
curl-7.29.0-59.el7_9.1.x86_64
rpm-4.11.3-48.el7_9.x86_64
elfutils-libs-0.176-5.el7.x86_64
dbus-libs-1.10.24-15.el7.x86_64
dbus-1.10.24-15.el7.x86_64
util-linux-2.23.2-65.el7_9.1.x86_64
polkit-0.112-26.el7_9.1.x86_64
dhcp-libs-4.2.5-83.el7.centos.1.x86_64
dhclient-4.2.5-83.el7.centos.1.x86_64
device-mapper-libs-1.02.170-6.el7_9.5.x86_64
kpartx-0.4.9-136.el7_9.x86_64
cronie-anacron-1.4.11-25.el7_9.x86_64
hwdata-0.252-9.7.el7.x86_64
wpa_supplicant-2.6-12.el7_9.2.x86_64
teamd-1.29-3.el7.x86_64
procps-ng-3.3.10-28.el7.x86_64
grub2-tools-2.02-0.87.0.2.el7.centos.11.x86_64
grub2-pc-2.02-0.87.0.2.el7.centos.11.x86_64
plymouth-scripts-0.8.9-0.34.20140113.el7.centos.x86_64
rpm-build-libs-4.11.3-48.el7_9.x86_64
yum-plugin-fastestmirror-1.1.31-54.el7_8.noarch
kernel-headers-3.10.0-1160.92.1.el7.x86_64
glibc-devel-2.17-326.el7_9.x86_f64
kexec-tools-2.0.15-51.el7_9.3.x86_64
kernel-3.10.0-1160.92.1.el7.x86_64
NetworkManager-team-1.18.8-2.el7_9.x86_64
lshw-B.02.18-17.el7.x86_64
openssh-server-7.4p1-22.el7_9.x86_64
firewalld-0.6.3-13.el7_9.noarch
at-3.1.13-25.el7_9.x86_64
strace-4.24-6.el7.x86_64
selinux-policy-targeted-3.13.1-268.el7_9.2.noarch
libcroco-0.6.12-6.el7_9.x86_64
xfsprogs-4.5.0-22.el7.x86_64
vim-enhanced-7.4.629-8.el7_9.x86_64
policycoreutils-2.5-34.el7.x86_64
basesystem-10.0-7.el7.centos.noarch
kbd-1.15.5-16.el7_9.x86_64
ncurses-base-5.9-14.20130511.el7_4.noarch
iwl2000-firmware-18.168.6.1-80.el7_9.noarch
iwl2030-firmware-18.168.6.1-80.el7_9.noarch
iwl6000g2b-firmware-18.168.6.1-80.el7_9.noarch
libdrm-2.4.97-2.el7.x86_64
libsepol-2.5-10.el7.x86_64
iwl6000g2a-firmware-18.168.6.1-80.el7_9.noarch
ebtables-2.0.10-16.el7.x86_64
info-5.1-5.el7.x86_64
iwl6000-firmware-9.221.4.1-80.el7_9.noarch
libcom_err-devel-1.42.9-19.el7.x86_64
libdb-5.3.21-25.el7.x86_64
libkadm5-1.15.1-55.el7_9.x86_64
libattr-2.4.46-13.el7.x86_64
openssl-devel-1.0.2k-26.el7_9.x86_64
sg3_utils-libs-1.37-19.el7.x86_64
libcap-ng-0.7.5-4.el7.x86_64
libgpg-error-1.12-3.el7.x86_64
redhat-lsb-core-4.1-27.el7.centos.1.x86_64
lua-5.1.4-15.el7.x86_64
kernel-3.10.0-1127.el7.x86_64
groff-base-1.22.2-8.el7.x86_64
chrony-3.4-1.el7.x86_64
perl-HTTP-Tiny-0.033-3.el7.noarch
parted-3.1-32.el7.x86_64
perl-Text-ParseWords-3.29-4.el7.noarch
wget-1.14-18.el7_6.1.x86_64
perl-Exporter-5.68-3.el7.noarch
kernel-devel-3.10.0-1127.el7.x86_64
perl-threads-shared-1.43-6.el7.x86_64
perl-File-Path-2.09-2.el7.noarch
rootfiles-8.1-11.el7.noarch
perl-Getopt-Long-2.40-3.el7.noarch
libmnl-1.0.3-7.el7.x86_64
p11-kit-0.23.5-3.el7.x86_64
kmod-libs-20-28.el7.x86_64
libtirpc-0.2.4-0.16.el7.x86_64
libedit-3.0-12.20121213cvs.el7.x86_64
python3-libs-3.6.8-19.el7_9.x86_64
libnfnetlink-1.0.1-4.el7.x86_64
python-six-1.9.0-2.el7.noarch
keyutils-libs-1.5.8-3.el7.x86_64
bzip2-1.0.6-13.el7.x86_64
grub2-pc-modules-2.02-0.87.0.2.el7.centos.11.noarch
ipset-7.1-1.el7.x86_64
kbd-legacy-1.15.5-16.el7_9.noarch
spax-1.5.2-13.el7.x86_64
nss-softokn-freebl-3.79.0-4.el7_9.x86_64
pinentry-0.8.1-17.el7.x86_64
zlib-1.2.7-21.el7_9.x86_64
m4-1.4.16-10.el7.x86_64
elfutils-libelf-0.176-5.el7.x86_64
perl-5.16.3-299.el7_9.x86_64
expat-2.1.0-15.el7_9.x86_64
gpm-libs-1.20.7-6.el7.x86_64
lz4-1.8.3-1.el7.x86_64
libseccomp-2.3.1-4.el7.x86_64
xz-5.2.2-2.el7_9.x86_64
libfastjson-0.99.4-3.el7.x86_64
libpng-1.5.13-8.el7.x86_64
vim-minimal-7.4.629-8.el7_9.x86_64
libgomp-4.8.5-44.el7.x86_64
coreutils-8.22-24.el7_9.2.x86_64
glib2-2.56.1-9.el7_9.x86_64
python-perf-3.10.0-1160.92.1.el7.x86_64
pam-1.1.8-23.el7.x86_64
cyrus-sasl-lib-2.1.26-24.el7_9.x86_64
gobject-introspection-1.56.1-1.el7.x86_64
nss-sysinit-3.79.0-5.el7_9.x86_64
grubby-8.28-26.el7.x86_64
libcurl-7.29.0-59.el7_9.1.x86_64
python-linux-procfs-0.4.11-4.el7.noarch
openldap-2.4.44-25.el7_9.x86_64
libselinux-python-2.5-15.el7.x86_64
systemd-219-78.el7_9.7.x86_64
openssh-7.4p1-22.el7_9.x86_64
dhcp-common-4.2.5-83.el7.centos.1.x86_64
grub2-tools-minimal-2.02-0.87.0.2.el7.centos.11.x86_64
cronie-1.4.11-25.el7_9.x86_64
NetworkManager-1.18.8-2.el7_9.x86_64
pygpgme-0.3-9.el7.x86_64
dracut-033-572.el7.x86_64
python-pycurl-7.19.0-19.el7.x86_64
dracut-network-033-572.el7.x86_64
mailx-12.5-19.el7.x86_64
rpm-python-4.11.3-48.el7_9.x86_64
json-c-0.11-4.el7_0.x86_64
glibc-headers-2.17-326.el7_9.x86_64
libutempter-1.1.6-4.el7.x86_64
grub2-2.02-0.87.0.2.el7.centos.11.x86_64
NetworkManager-tui-1.18.8-2.el7_9.x86_64
kmod-20-28.el7.x86_64
openssh-clients-7.4p1-22.el7_9.x86_64
rsyslog-8.24.0-57.el7_9.3.x86_64
cups-client-1.6.3-51.el7.x86_64
[root@hecs-354629 dssz]# 

```

#### 5.1.3 RPM 卸载命令

![image-20231028111623398](Centos7笔记.assets/image-20231028111623398.png)

```shell
[root@hadoop101 Packages]# rpm -e firefox
```

:bulb: 其中的e 是erase



### 5.2 YUM

YUM（全称为 Yellow dog Updater, Modified）是一个在 Fedora 和 RedHat 以及 CentOS中的 Shell 前端软件包管理器。基于 RPM 包管理，能够从指定的服务器自动下载 RPM 包并且安装，可以自动处理依赖性关系，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装

![image-20231028111840423](Centos7笔记.assets/image-20231028111840423.png)

#### 5.2.1 基本语法

yum [选项] [参数]

![image-20231028112432396](Centos7笔记.assets/image-20231028112432396.png)

![image-20231028112439127](Centos7笔记.assets/image-20231028112439127.png)

```shell
[root@hadoop101 ~]#yum -y install firefox
```

