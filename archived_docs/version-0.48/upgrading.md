---
id: version-0.48-upgrading
title: 升级
original_id: upgrading
---

时刻将React Native更新到最新的版本，可以获得更多API、视图、开发者工具以及其他一些好东西（译注：官方开发任务繁重，人手紧缺，几乎不会对旧版本提供维护支持，所以即便更新可能带来一些兼容上的变更，但建议开发者还是尽一切可能第一时间更新）。由于一个完整的React Native项目是由Android项目、iOS项目和JavaScript项目组成的，且都打包在一个npm包中，所以升级可能会有一些麻烦。我们会尽量简化这一流程。你可以在项目目录下使用`react-native -v`命令查看当前的版本。以下是目前所需的升级步骤：

__译注__：[更新日志点这里查看](http://bbs.reactnative.cn/category/1)


## 基于Git的自动合并更新

**重要提示:** 现在你不需要运行npm install去下载新版本的React Native了，按照下面的步骤即可自动进行更新。

### 1. 安装Git
你需要安装Git，但这并不要求你自己使用Git去管理项目。只是我们的更新过程会使用到Git罢了。你可以在[这里](https://git-scm.com/downloads)下载安装Git，注意要把git的路径添加到`PATH`变量中。

### 2. 安装`react-native-git-upgrade`工具模块

```sh
$ npm install -g react-native-git-upgrade
```

`react-native-git-upgrade`提供了豪华的一条龙自动合并更新流程，主要包含两个服务：

* 首先它会利用Git工具计算新旧版本文件间的差异并生成补丁
* 然后在用户的项目文件上应用补丁

### 3. 运行更新命令

```sh
$ react-native-git-upgrade
# 这样会直接把react native升级到最新版本

# 或者是：

$ react-native-git-upgrade X.Y.Z
# 这样把react native升级到指定的X.Y.Z版本
```

升级过程会如丝般顺滑。当然在少数情况下，取决于具体的版本和你修改的程度，Git的合并算法也可能遭遇失败产生一些冲突，需要你人工介入。

### 4. 解决冲突

文件中的冲突会以分隔线隔开，并清楚的标记出处，例如下面这样：

```
13B07F951A680F5B00A75B9A /* Release */ = {
  isa = XCBuildConfiguration;
  buildSettings = {
    ASSETCATALOG_COMPILER_APPICON_NAME = AppIcon;
<<<<<<< ours
    CODE_SIGN_IDENTITY = "iPhone Developer";
    FRAMEWORK_SEARCH_PATHS = (
      "$(inherited)",
      "$(PROJECT_DIR)/HockeySDK.embeddedframework",
      "$(PROJECT_DIR)/HockeySDK-iOS/HockeySDK.embeddedframework",
    );
=======
    CURRENT_PROJECT_VERSION = 1;
>>>>>>> theirs
    HEADER_SEARCH_PATHS = (
      "$(inherited)",
      /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include,
      "$(SRCROOT)/../node_modules/react-native/React/**",
      "$(SRCROOT)/../node_modules/react-native-code-push/ios/CodePush/**",
    );
```

上面代码中的"ours"表示你自己的代码，而"theirs"表示React Native的官方代码。然后你可以根据实际情况判断，选择某一方晋级，另一方出局（

## 老式升级方案

如果上面的自动升级流程有问题，那么你可以尝试一下下面的老的升级方案。

## 1. 更新`react-native`的node依赖包

请去下面的网址查看`react-native`的npm包的最新版本，或使用`npm info react-native`命令查看。

* [https://www.npmjs.com/package/react-native](https://www.npmjs.com/package/react-native)

打开项目目录下的`package.json`文件，然后在`dependencies`模块下找到`react-native`，将当前版本号改到最新，然后在命令行中运行（译注：如果提示权限错误，就在命令前加上sudo）： 

```sh
$ npm install
```

译注：从0.24版本开始，react-native还需要额外安装react模块，且对react的版本有严格要求，高于或低于某个范围都不可以。本文无法在这里列出所有react native和对应的react模块版本要求，只能提醒读者先尝试执行npm install，然后注意观察安装过程中的报错信息，例如`require react@某.某.某版本, but none was installed`，然后根据这样的提示，执行`npm install react@某.某.某版本 --save`。

## 2. 升级项目模板文件

新版本的npm包通常还会包含一些动态生成的文件，这些文件是在运行`react-native init`创建新项目时生成的，比如iOS和Android的项目文件。为了使老项目的项目文件也能得到更新（不重新init），你需要在命令行中运行：

```sh
$ react-native upgrade
```

这一命令会检查最新的项目模板，然后进行如下操作：

* 如果是新添加的文件，则直接创建。
* 如果文件和当前版本的文件相同，则跳过。
* 如果文件和当前版本的文件不同，则会提示你一些选项：查看两者的不同，选择保留你的版本或是用新的模板覆盖。你可以按下`h`键来查看所有可以使用的命令。

__译注__：如果你有修改原生代码，那么在使用upgrade升级前，`先备份，再覆盖`。覆盖完成后，使用比对工具找出差异，将你之前修改的代码逐步搬运到新文件中。

# 手动升级

有时候React Native的项目结构改动较大，此时还需要手动做一些修改，例如从0.13到0.14版本，或是0.28到0.29版本。所以在升级时请先阅读一下[更新日志](http://bbs.reactnative.cn/category/1/)，以确定是否需要做一些额外的手动修改。
