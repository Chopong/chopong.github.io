---
layout: post
date: 2019-08-28, Wed, 16:22:17
author: Chopong
email: weisp.pku@gmail.com
categories: 读书笔记

title: Linux下安装 Sublime
subtitle: Install Sublime on Linux manually.
tags: post note linux sublime editor
---

# Table of Contents #

{:toc}


# Liunx 下安装并破解sublime text 3 #

## 1. 下载解压安装包 ##

​	从官网上下载最新的安装包, 并解压

```bash
tar -xvvf sublime_text_3_build_3207_x64.tar.bz2
[sudo] mv sublime_text_3 /opt/
```

## 2. 修改图标文件 ##

​	修改  `sublime_text.desktop`

```bash
[sudo] vim /opt/sublime_text_3/sublime_text.desktop
```

```
	Exec=/opt/sublime_text_3/sublime_text %F
	Icon=/opt/sublime_text_3/Icon/256x256/sublime-text.png
```

## 3. 修改执行文件 ##

在终端编辑 sublime_text 执行文件

```bash
vim sublime_text
```

将文件转成十六进制

```bash
:%!xxd
```

然后查找 97 94 0D

```
/9794
```

把9794 0D替换成0000 00

```
:%!xxd -r
```

最后保存退出，然后就可以使用注册码了。

```
:wq!
```

## 4. 注册码 ##

```
    —– BEGIN LICENSE —–
    TwitterInc
    200 User License
    EA7E-890007
    1D77F72E 390CDD93 4DCBA022 FAF60790
    61AA12C0 A37081C5 D0316412 4584D136
    94D7F7D4 95BC8C1C 527DA828 560BB037
    D1EDDD8C AE7B379F 50C9D69D B35179EF
    2FE898C4 8E4277A8 555CE714 E1FB0E43
    D5D52613 C3D12E98 BC49967F 7652EED2
    9D2D2E61 67610860 6D338B72 5CF95C69
    E36B85CC 84991F19 7575D828 470A92AB
    —— END LICENSE ——
```

##  5. 修改host文件 ##

```
	127.0.0.1 www.sublimetext.com
	127.0.0.1 sublimetext.com
	127.0.0.1 sublimehq.com
	127.0.0.1 telemetry.sublimehq.com
	127.0.0.1 license.sublimehq.com
	127.0.0.1 45.55.255.55
	127.0.0.1 45.55.41.223
```

## 6. 创建快捷方式 ##

如果你想在应用程序中能搜索到, 就把 sublime_text.desktop 复制到 /usr/share/applications 中 

```bash
[sudo] cp /opt/sublime_text_3/sublime_text.desktop /usr/share/applications
```