---
id: debugging-native-code
title: 调试原生代码
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="banner-native-code-required">
  <h3>仅限包含原生代码的项目</h3>
  <p>以下部分仅适用于包含原生代码的项目。如果你使用的是托管型 Expo 工作流，请参阅 <a href="https://docs.expo.dev/workflow/prebuild/" target="_blank">prebuild</a> 指南以使用此 API。</p>
</div>

## 查看日志

当应用正在运行时，你可以在终端中使用以下命令查看 iOS 或 Android 应用的原生日志：

```shell
# Android：
npx react-native log-android
# iOS：
npx react-native log-ios
```

你也可以通过 iOS 模拟器中的 Debug > Open System Log… 菜单，或者在运行 Android 应用的设备或模拟器中执行 `adb logcat "*:S" ReactNative:V ReactNativeJS:V` 来查看这些日志。

<details>
<summary>**💡 自定义原生日志**</summary>

如果你正在编写原生模块，并且想为你的模块添加自定义日志用于调试，可以使用以下方法：

#### Android（Java/Kotlin）

在原生模块中，使用 `Log` 类添加可在 Logcat 中查看的日志：

```java
import android.util.Log;

private void log(String message) {
    Log.d("YourModuleName", message);
}
```

要在 Logcat 中查看这些日志，请使用以下命令，将 `YourModuleName` 替换为你的自定义标签：

```shell
adb logcat "*:S" ReactNative:V ReactNativeJS:V YourModuleName:D
```

#### iOS（Objective-C/Swift）

在原生模块中，使用 `NSLog` 添加自定义日志：

```objective-c
NSLog(@"YourModuleName: %@", message);
```

或者在 Swift 中：

```swift
print("YourModuleName: \(message)")
```

运行应用时，这些日志将出现在 Xcode 控制台中。

</details>

## 在原生 IDE 中调试

当你编写原生代码（如原生模块）时，可以从 Android Studio 或 Xcode 启动应用，并利用其原生调试功能（设置断点等），就像构建标准原生应用一样。

另一种选择是使用 React Native CLI 运行应用，然后将原生 IDE（Android Studio 或 Xcode）的原生调试器附加到进程上。

### Android Studio

在 Android Studio 中，点击菜单栏上的"Run"选项，选择"Attach to Process..."，然后选择正在运行的 React Native 应用。

### Xcode

在 Xcode 中，点击顶部菜单栏的"Debug"，选择"Attach to process"选项，然后从"Likely Targets"列表中选择你的应用。
