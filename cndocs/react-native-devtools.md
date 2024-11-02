---
id: react-native-devtools
title: React Native 开发者工具
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native DevTools 是我们新的调试体验，它对我们的调试堆栈进行了端到端的重新编写。它旨在比以前的调试方法更深入地集成，并且从根本上更可靠。

![React Native DevTools 打开到“欢迎”面板](/docs/assets/debugging-rndt-welcome.jpg)

React Native DevTools 旨在调试 React 应用的问题，而不是取代原生工具。如果你想检查 React Native 的底层平台层（例如，在开发原生模块时），请使用 Android Studio 和 Xcode 中可用的调试工具（请参阅 [调试原生代码](/docs/debugging-native-code)）。

<details>
<summary>**💡 兼容性** — 在 0.76 中发布</summary>

React Native DevTools 支持所有运行 Hermes 的 React Native 应用。它取代了以前的 Flipper、实验性调试器和 Hermes 调试器（Chrome）前端。

无法使用任何旧版本的 React Native 设置 React Native DevTools。

- **Chrome Browser DevTools — 不再支持**
  - 通过 `chrome://inspect` 连接到 React Native 不再受支持。由于最新版本的 Chrome DevTools（这些版本构建为匹配最新浏览器功能和 API）未经过测试，并且此前端缺少我们的自定义设置，因此功能可能无法正常工作。相反，我们与 React Native DevTools 一起提供了一个受支持的版本。
- **Visual Studio Code — 不再支持**
  - 第三方扩展如 [Expo Tools](https://github.com/expo/vscode-expo) 和 [Radon IDE](https://ide.swmansion.com/) 可能具有改进的兼容性，但不受 React 团队的直接支持。

</details>
<details>
<summary>**💡 反馈和常见问题**</summary>

我们希望你使用的调试工具能够可靠、熟悉、简单且连贯。本页描述的所有功能都是基于这些原则构建的，我们还想在未来提供更多功能。

我们正在积极迭代 React Native DevTools 的未来，并创建了一个集中化的 [GitHub 讨论](https://github.com/react-native-community/discussions-and-proposals/discussions/819) 来跟踪问题、常见问题和反馈。

</details>

## 核心功能

React Native DevTools 基于 Chrome DevTools 前端。如果你有 Web 开发背景，其功能应该很熟悉。作为起点，我们建议浏览 [Chrome DevTools 文档](https://developer.chrome.com/docs/devtools)，其中包含完整的指南以及视频资源。

### Console

![A series of logs React Native DevTools Sources view, alongside a device](/docs/assets/debugging-rndt-console.jpg)

Console 面板允许你查看和过滤消息、评估 JavaScript、检查对象属性等。

[Console 功能参考 | Chrome DevTools](https://developer.chrome.com/docs/devtools/console/reference)

#### 实用提示

- 如果你的应用有很多日志，请使用过滤框或更改显示的日志级别。
- 使用 [Live Expressions](https://developer.chrome.com/docs/devtools/console/live-expressions) 实时观察值。
- 使用 [Preserve Logs](https://developer.chrome.com/docs/devtools/console/reference#persist) 在重新加载之间保持消息。
- 使用 <kbd>Ctrl</kbd> + <kbd>L</kbd> 清除控制台视图。

### Sources 和断点

![一个暂停的断点在 React Native DevTools Sources 视图旁边，旁边是一个设备](/docs/assets/debugging-rndt-sources-paused-with-device.jpg)

Sources 面板允许你查看应用的源文件并注册断点。使用断点定义代码行，应用应在其中暂停 — 允许你检查程序的实时状态并逐步执行代码。

[Pause your code with breakpoints | Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript/breakpoints)

:::tip

#### 迷你指南

断点是你的调试工具包中的基本工具！

1. 使用侧边栏或 <kbd>Cmd ⌘</kbd>+<kbd>P</kbd> / <kbd>Ctrl</kbd>+<kbd>P</kbd> 导航到源文件。
2. 点击代码行旁边的行号列以添加断点。
3. 使用右上方的导航控件在暂停时[逐步执行代码](https://developer.chrome.com/docs/devtools/javascript/reference#stepping)。

:::

#### 实用提示

- 当应用暂停时，会出现一个“暂停在调试器中”的覆盖层。点击它以恢复。
- 注意右侧面板，当在断点时，允许你检查当前范围和调用栈，并设置观察表达式。
- 使用 `debugger;` 语句快速从文本编辑器设置断点。这将通过 Fast Refresh 立即到达设备。
- 有多种断点类型！例如，[条件断点和日志点](https://developer.chrome.com/docs/devtools/javascript/breakpoints#overview)。

## 重新连接 DevTools

偶尔，DevTools 可能会与目标设备断开连接。这可能发生在以下情况下：

- 应用已关闭。
- 应用已重建（安装了新的原生构建）。
- 应用在原生侧崩溃。
- 开发服务器（Metro）已关闭。
- 物理设备已断开连接。

断开连接时，将显示一条消息为“调试连接已关闭”的对话框。

![A reconnect dialog shown when a device is disconnected](/docs/assets/debugging-reconnect-menu.jpg)

从这里，你可以：

- **Dismiss**: 选择关闭（`×`）图标或点击对话框外部以返回到断开连接前的 DevTools UI。
- **Reconnect**: 选择“Reconnect DevTools”，并解决断开连接的原因。
