---
layout: slide
date: 2019-05-03, Fri, 15:11:13
author: Chopong
email: weisp.pku@gmail.com

categories: 读书笔记
theme: default
trans: default
img: /img/article/2019-05-03-noname.jpg
visualworkflow: true

title: CN-Input-Dict
subtitle: Chinese input method under fcitx with words dictionary
tags: post note Chinese input dictionary fcitx sunpinyin pinyin sg2fcitx createPYMB sogou
---

{% include slide-b.html %}

# Table of Contents #

{:toc}
[Chinese Version](https://github.com/Chopong/fcitx-dict)

{% include slide-h.html %}

# Background #

Currently, there're varieties of chinese input methods on Linux system. Pinyin, sunpinyin googlepinyin and etc, without chinese dicts. All of them work but not meet chinese input style, although sogou input has issued a linux version with user dict years before. Sogou's dict works amazingly, but not with my emacs. So I am about to use pinyin, sunpinyin with sougo's dict under fcitx.

{% include slide-h.html %}

|------------------------|------------------|-------------|
| methods                | good             | bad         |
|------------------------|------------------|-------------|
| sunpinyin+userdict     | simple, easy     | large dict  |
| pinyin+dicts           | simple           | large dict  |
| pinyin+dicts(selected) | needs converting | complicated |
|------------------------|------------------|-------------|

{% include slide-h.html %}

## sunpinyin+userdict ##

1. download `sunpinyin-userdict.7z` from [`here`][1]

   [1]:https://code.google.com/archive/p/hslinuxextra/downloads

2. extrated the package and move it to `~/.sunpinyin/`

3. reboot and sign in.


{% include slide-h.html %}


## pinyin+dicts ##

The dicts download from here can not use directly, you need a tool named createPYMB to convert it to .mb type, you can install createPYMB by apt or download it.

* download [address][2]

  [2]:https://github.com/Chopong/fcitx-dict

* install command

        sudo apt install fcitx-tools

{% include slide-v.html %}

1. download dicts from here[`fcitx-sougou-phrase-full`][3]

   [3]:https://code.google.com/archive/p/hslinuxextra/downloads

2. convert it to .mb type.

    * with `createPYMB`

            ./createPYMB gbkpy.org pyPhrase.org

    * with `fcitx-tools`

            cd ~/Downloads/fcitx-sougou-phrase-full
            createPYMB gbkpy.org pyPhrase.org

{% include slide-v.html %}

3.wait several minutes until done, then move
   * `pybase.mb`

   * `pyphrase.mb`

   * `pyPhrase.org`

   to

   * `/usr/share/fcitx/data`

   or

   *  `/usr/share/fcitx/pinyin`

4.reboot and sign in.


{% include slide-h.html %}

## pinyin+dicts(selected) ##

1. download **.scel you need from sougou official website

2. convert .scel to .org with scel2org (included in fcitx-tools)

{% include slide-v.html %}

code

    mkdir -p tmp && cd tmp && mkdir -p orgfile
    mv ~/Downloads/*.scel ./
    for dict in *.scel; do scel2org $dict -o orgfile/$dict.org    ; done
    cp ../pyPhrase.org orgfile/
    cat ../orgfile/* | sort | uniq > dicts.org

{% include slide-v.html %}

3. convert .org to .mb with previous method.

> If you are lazy like me, just fork this [repo][5], and run convert.sh

[5]:https://github.com/Chopong/fcitx-dict/tree/master

{% include slide-h.html %}

{% include slide-e.html %}
