---
id: version-0.60-running-on-simulator-ios
title: 在iOS模拟器上运行
original_id: running-on-simulator-ios
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

## 启动模拟器

当你完成了初始化 React Native 新项目后，就可以在项目目录下运行`react-native run-ios`来启动模拟器。如果一切配置都没有问题，应该很快就能看到你的应用在 iOS 模拟器上运行起来。

## 指定模拟的设备类型

你可以使用`--simulator`参数，在其后加上要使用的设备名称来指定要模拟的设备类型（目前默认为"iPhone X"）。如果你要模拟 iPhone 4s，那么这样运行命令即可：`react-native run-ios --simulator "iPhone 4s"`。

你可以在终端中运行`xcrun simctl list devices`来查看具体可用的设备名称。
