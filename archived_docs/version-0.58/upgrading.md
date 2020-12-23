---
id: version-0.58-upgrading
title: 更新
original_id: upgrading
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

时刻将 React Native 更新到最新的版本，可以获得更多 API、视图、开发者工具以及其他一些好东西（译注：官方开发任务繁重，人手紧缺，几乎不会对旧版本提供维护支持，所以即便更新可能带来一些兼容上的变更，但建议开发者还是尽一切可能第一时间更新）。由于一个完整的 React Native 项目是由 Android 项目、iOS 项目和 JavaScript 项目组成的，且都打包在一个 npm 包中，所以升级可能会有一些麻烦。我们会尽量简化这一流程。你可以在项目目录下使用`react-native info`命令查看当前的版本。以下是目前所需的升级步骤：

> 译注：[英文更新日志点这里查看](https://github.com/facebook/react-native/releases)，[中文更新日志点这里查看](http://bbs.reactnative.cn/category/1)

#### 1. 更新`react-native`的 node 依赖包

请使用`npm info react-native`命令查看其当前最新版本。

打开项目目录下的`package.json`文件，然后在`dependencies`模块下找到`react-native`，将当前版本号改到你所需要的已经发布的版本，然后在命令行中运行：

```sh
$ npm install
```

> 注意：react-native 依赖于特定版本的，高于或低于某个范围都不可以。本文无法在这里列出所有 react native 和对应的 react 模块版本要求，只能提醒读者先尝试执行 npm install，然后注意观察安装过程中的报错信息，例如`require react@某.某.某版本, but none was installed`，然后根据这样的提示，执行`npm install react@某.某.某版本`。

#### 2. 升级项目模板文件

新版本的 npm 包通常还会包含一些动态生成的文件，这些文件是在运行`react-native init`创建新项目时生成的，比如 iOS 和 Android 的项目文件。为了使老项目的项目文件也能得到更新（不重新 init），你需要在命令行中运行：

```sh
$ react-native upgrade
```

> 译注：如果你有修改原生代码，那么在使用 upgrade 升级前，`先备份，再覆盖`。覆盖完成后，使用比对工具找出差异，将你之前修改的代码逐步搬运到新文件中。

这一命令会检查最新的项目模板，然后进行如下操作：

- 如果是新添加的文件，则直接创建。
- 如果文件和当前版本的文件相同，则跳过。
- 如果文件和当前版本的文件不同，则会提示你一些选项：查看两者的不同，选择保留你的版本或是用新的模板覆盖。你可以按下`h`键来查看所有可以使用的命令。

## 手动升级

升级过程往往会碰到很多问题，尤其涉及到众多第三方时，处理起来尤为费时费力。此时建议可以尝试直接 init 一个新的项目，然后把现有项目的 JS 代码进行手动迁移。
