---
id: debugging
title: 调试基础
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

:::note
调试功能（例如开发者菜单、LogBox 和 React Native DevTools）在 release（生产）构建中会被禁用。
:::

## 打开开发者菜单

React Native 提供了一个应用内开发者菜单，可用于访问调试功能。你可以通过摇动设备或使用键盘快捷键打开开发者菜单：

- iOS 模拟器：<kbd>Ctrl</kbd> + <kbd>Cmd ⌘</kbd> + <kbd>Z</kbd>（或选择 Device > Shake）
- Android 模拟器：<kbd>Cmd ⌘</kbd> + <kbd>M</kbd>（macOS）或 <kbd>Ctrl</kbd> + <kbd>M</kbd>（Windows 和 Linux）

其他方式（Android）：`adb shell input keyevent 82`。

![React Native 开发者菜单](/docs/assets/debugging-dev-menu-083.jpg)

## 打开 DevTools

[React Native DevTools](./react-native-devtools) 是 React Native 内置的调试器。它可以帮助你检查并理解 JavaScript 代码的运行方式，类似于网页浏览器中的调试工具。

你可以通过以下任一方式打开 DevTools：

- 在开发者菜单中选择 “Open DevTools”
- 在 CLI 中按下 <kbd>j</kbd>

![打开到“Welcome”面板的 React Native DevTools](/docs/assets/debugging-rndt-welcome-083.jpg)

首次启动时，DevTools 会打开欢迎面板，同时展开控制台抽屉，你可以在其中查看日志并与 JavaScript 运行时交互。你还可以通过窗口顶部导航到其他面板，包括集成的 React Components Inspector 和 Profiler。

更多信息请参阅 [React Native DevTools 指南](./react-native-devtools)。

## LogBox

LogBox 是一个应用内工具，会在应用记录警告或错误时显示出来。

![LogBox 警告以及展开后的 LogBox 语法错误](/docs/assets/debugging-logbox-076.jpg)

### 致命错误

当发生不可恢复的错误时，例如 JavaScript 语法错误，LogBox 会打开并显示错误位置。在这种状态下，LogBox 无法关闭，因为你的代码无法执行。修复语法错误后，LogBox 会自动关闭——无论是通过 Fast Refresh 还是手动重新加载。

### 控制台错误和警告

控制台错误和警告会以带有红色或黄色标记的屏幕通知形式显示。

- **错误** 会显示通知计数。点击通知可查看展开视图，并分页浏览其他日志。
- **警告** 会显示不含详情的通知横幅，提示你打开 React Native DevTools。

当 React Native DevTools 处于打开状态时，除致命错误外，其他所有错误都不会再显示在 LogBox 中。由于 LogBox 的多种选项可能会隐藏某些日志或调整其级别，我们建议以 React Native DevTools 中的 Console 面板作为日志的主要依据。

<details>
<summary>**💡 忽略日志**</summary>

可以通过 `LogBox` API 配置 LogBox。

```js
import {LogBox} from 'react-native';
```

#### 忽略所有日志

可以使用 `LogBox.ignoreAllLogs()` 禁用 LogBox 通知。这在例如进行产品演示时会很有帮助。

```js
LogBox.ignoreAllLogs();
```

#### 忽略特定日志

可以通过 `LogBox.ignoreLogs()` 按日志逐条禁用通知。这对于噪声较大的警告，或者无法修复的警告（例如来自第三方依赖）很有帮助。

```js
LogBox.ignoreLogs([
  // 精确匹配消息
  'Warning: componentWillReceiveProps has been renamed',

  // 子字符串或正则匹配
  /GraphQL error: .*/,
]);
```

:::note

LogBox 会将来自 React 的某些错误视为警告，这意味着它们不会显示为应用内错误通知。高级用户可以通过自定义 LogBox 的 warning filter，使用 [`LogBoxData.setWarningFilter()`](https://github.com/facebook/react-native/blob/d334f4d77eea538dff87fdcf2ebc090246cfdbb0/packages/react-native/Libraries/LogBox/Data/LogBoxData.js#L338) 来更改此行为。

:::

</details>

## 性能监视器

在 Android 和 iOS 上，开发期间可以通过在开发者菜单中选择 **"Perf Monitor"** 来切换应用内性能叠加层。有关此功能的更多信息，请参阅[这里](/docs/performance)。

![iOS 和 Android 上的性能监视器叠加层](/docs/assets/debugging-performance-monitor.jpg)

:::info
性能监视器运行在应用内，只能作为参考。要获得准确的性能测量结果，我们建议使用 Android Studio 和 Xcode 中的原生工具。
:::
