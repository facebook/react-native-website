---
id: version-0.45-running-on-simulator-ios
title: 在模拟器上运行
original_id: running-on-simulator-ios
---

## 启动模拟器

当你完成了初始化React Native新项目后，就可以在项目目录下运行`react-native run-ios`来启动模拟器。如果一切配置都没有问题，应该很快就能看到你的应用在iOS模拟器上运行起来。 

## 指定模拟的设备类型

你可以使用`--simulator`参数，在其后加上要使用的设备名称来指定要模拟的设备类型（目前默认为"iPhone 6"）。如果你要模拟iPhone 4s，那么这样运行命令即可：`react-native run-ios --simulator "iPhone 4s"`。run-ios还有其他参数，可以用于指定设备、根目录路径等，具体请参考[runIOS.js](https://github.com/facebook/react-native/blob/master/local-cli/runIOS/runIOS.js#L228)源代码。

你可以在终端中运行`xcrun simctl list devices`来查看具体可用的设备名称。
