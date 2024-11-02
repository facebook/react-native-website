---
id: debugging
title: 调试
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## 访问 App 内的开发菜单

React Native 提供了一个内置的开发者菜单，其中包含多个调试选项。您可以通过摇动设备或使用键盘快捷键访问开发者菜单：

- iOS 模拟器：按下 <kbd>Cmd ⌘</kbd> + <kbd>D</kbd>（或选择 设备 > 摇动）
- Android 模拟器：按下 <kbd>Cmd ⌘</kbd> + <kbd>M</kbd>（macOS）或 <kbd>Ctrl</kbd> + <kbd>M</kbd>（Windows 和 Linux）

或者，对于 Android 设备和模拟器，您可以在终端中运行 `adb shell input keyevent 82`。

![React Native开发者菜单](/docs/assets/debugging-dev-menu.jpg)

:::note
在发布（release）版本中开发者菜单将无法使用。
:::

## 打开调试器

调试器允许你了解和调试你的 JavaScript 代码的运行方式，类似于一个网页浏览器。

:::info
**在 Expo 项目中**，在命令行界面中按下 <kbd>j</kbd> 键直接打开 Hermes 调试器。
:::

<Tabs groupId="js-debugger" queryString defaultValue={constants.defaultJsDebugger} values={constants.jsDebuggers}>
<TabItem value="hermes">

Hermes 通过实现 Chrome DevTools 协议来支持 Chrome 调试器。这意味着可以使用 Chrome 的工具直接调试在 Hermes 上运行的 JavaScript，无论是在模拟器还是在物理设备上。

1. 在 Chrome 浏览器窗口中，导航到 `chrome://inspect`。
2. 使用 "Configure..." 按钮添加开发服务器地址（通常是 `localhost:8081`）。
3. 现在应该能看到一个带有 **"inspect"** 链接的 "Hermes React Native" 目标。点击这个链接打开调试器。

![Chrome 检查界面的概述和连接的 Hermes 调试器窗口](/docs/assets/debugging-hermes-debugger-instructions.jpg)

</TabItem>
<TabItem value="flipper">

[Flipper](https://fbflipper.com/) 是一个本地调试工具，通过嵌入的 Chrome DevTools 面板为 React Native 提供 JavaScript 调试功能。

要在 Flipper 中调试 JavaScript 代码，请从 Dev 菜单中选择 **"Open Debugger"**。了解有关 Flipper 的[更多信息](https://fbflipper.com/docs/features/react-native/)。

:::info
要使用 Flipper 进行调试，必须在您的系统上[安装 Flipper 应用](https://fbflipper.com/docs/getting-started/)。
:::

![Flipper 桌面应用打开的 Hermes 调试器面板](/docs/assets/debugging-flipper-console.jpg)

:::warning
使用 Flipper 调试 React Native 应用在 React Native 0.73 版本中[已弃用](https://github.com/react-native-community/discussions-and-proposals/pull/641)。我们最终将删除通过 Flipper 进行 JS 调试的内置集成（但你仍然可以手动添加集成）。
:::

</TabItem>
<TabItem value="new-debugger">

:::note
**这是一个实验性功能**，目前可能有一些功能无法可靠运行。当这个功能在将来启用时，我们希望它能比当前的调试方法更完善。
:::

React Native 团队正在致力于改进 JavaScript 调试器体验，旨在取代 Flipper，预览版本已在 React Native 0.73 中可用。

可以通过 React Native CLI 启用新的调试器。这也将启用<kbd>j</kbd>以进行调试。

```sh
npx react-native start --experimental-debugger
```

在开发菜单中选择**"打开调试器"**，将使用 Google Chrome 或 Microsoft Edge 启动新的调试器。

![新调试器前端打开到“欢迎”窗格](/docs/assets/debugging-debugger-welcome.jpg)

</TabItem>
</Tabs>

## React DevTools

您可以使用 React DevTools 来检查 React 元素树、属性和状态。

```sh
npx react-devtools
```

![一个 React 开发工具窗口](/docs/assets/debugging-react-devtools-blank.jpg)

:::tip

**学习如何使用 React 开发工具！**

- [React 开发工具指南](/docs/next/react-devtools)
- [在 react.dev 上的 React 开发者工具](https://zh-hans.react.dev/learn/react-developer-tools)

:::

## LogBox

开发版本中的错误和警告会在您的应用程序内部的 LogBox 中显示。

![A LogBox warning and an expanded LogBox syntax error](/docs/assets/debugging-logbox.jpg)

:::note 注意
LogBox 在发布版本（release）中是自动禁用的。
:::

## 控制台的错误与警告提示

控制台错误和警告以红色或黄色徽章的形式显示为屏幕通知，并分别显示控制台中的错误或警告数量。要查看控制台中的错误或警告，点击通知以查看有关日志的完整信息，并在控制台中浏览所有日志。

可以使用`LogBox.ignoreAllLogs()`来隐藏这些通知。例如，在进行产品演示时非常有用。此外，还可以通过`LogBox.ignoreLogs()`来针对特定的日志隐藏通知。当存在无法修复的嘈杂警告（比如第三方依赖项）时，这非常有用。

:::info
忽略日志只应作为最后的手段。请记得给自己创建任务或者注释，提醒自己修复任何被忽略的日志。
:::

```jsx
import {LogBox} from 'react-native';

// 根据字符串匹配来忽略日志信息
LogBox.ignoreLogs(['Warning: ...']);

// 忽略所有日志信息
LogBox.ignoreAllLogs();
```

### 语法错误

当发生 JavaScript 语法错误时，LogBox 将显示错误的位置。在这种状态下，LogBox 无法关闭，因为无法执行您的代码。一旦语法错误被修复，LogBox 将自动关闭 - 无论是通过快速刷新还是手动重新加载。

## 性能监视器

在 Android 和 iOS 上，在开发过程中可以通过在开发菜单中选择 **"Perf Monitor"** 来切换应用内性能叠加。有关此功能的更多信息，请参阅[此处](/docs/performance)。

![iOS和Android上的性能监视器叠加](/docs/assets/debugging-performance-monitor.jpg)

:::info
性能监视器在应用中运行，仅作参考。我们建议使用 Android Studio 和 Xcode 中的本地性能工具来获得更准确的性能测量。
:::
