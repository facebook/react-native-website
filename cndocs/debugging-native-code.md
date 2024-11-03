---
id: debugging-native-code
title: 调试原生代码
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="banner-native-code-required">
  <h3>仅限包含原生代码的项目</h3>
  <p>以下部分仅适用于包含原生代码的项目。如果你使用的是托管型 Expo 工作流，请参阅 <a href="https://docs.expo.dev/workflow/prebuild/" target="_blank">prebuild</a> 指南以使用此 API。</p>
</div>

## 打印日志

当应用正在运行时，你可以在终端中使用以下命令打印 iOS 或 Android 应用的日志：

```shell
# For Android:
npx react-native log-android
# Or, for iOS:
npx react-native log-ios
```

你也可以通过 iOS 模拟器中的 "Debug > Open System Log..." 菜单，或者在运行 Android 应用的设备或模拟器中运行 `adb logcat "*:S" ReactNative:V ReactNativeJS:V` 来访问这些日志。

## 在原生 IDE 中调试

当你编写原生模块时，你可以使用 Android Studio 或 Xcode 来启动应用，并使用其原生调试功能（设置断点等），就像在构建标准原生应用时一样。

另一种选择是使用 React Native CLI 运行应用，并从原生 IDE（Android Studio 或 Xcode）中附加到进程。

### Android Studio

在 Android Studio 中，你可以通过点击菜单栏中的 "Run" 选项，然后选择 "Attach to Process..."，并选择正在运行的 React Native 应用。

### Xcode

在 Xcode 中，点击菜单栏中的 "Debug"，选择 "Attach to Process..."，然后从 "Likely Targets" 列表中选择正在运行的应用。
