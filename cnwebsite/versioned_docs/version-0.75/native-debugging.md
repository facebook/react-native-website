---
id: native-debugging
title: 调试原生代码
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="banner-native-code-required">
  <h3>Projects with Native Code Only</h3>
  <p>
    The following section only applies to projects with native code exposed. If you are using the managed Expo workflow, see the guide on <a href="https://docs.expo.dev/workflow/prebuild/" target="_blank">prebuild</a> to use this API.
  </p>
</div>

## 访问控制台日志

在运行 RN 应用时，可以在终端中运行如下命令来查看控制台的日志：

```sh
$ npx react-native log-ios
$ npx react-native log-android
```

此外，你也可以在 iOS 模拟器的菜单中选择`Debug → Open System Log...`来查看。如果是 Android 应用，无论是运行在模拟器或是真机上，都可以通过在终端命令行里运行`adb logcat *:S ReactNative:V ReactNativeJS:V`命令来查看。

:::info
If you're using Expo CLI, console logs already appear in the same terminal output as the bundler.
:::

## 调试原生代码

在和原生代码打交道时（比如编写原生模块），可以直接从 Android Studio 或是 Xcode 中启动应用，并利用这些 IDE 的内置功能来调试（比如设置断点）。这一方面和开发原生应用并无二致。
