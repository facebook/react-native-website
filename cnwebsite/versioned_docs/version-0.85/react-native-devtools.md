---
id: react-native-devtools
title: React Native DevTools
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native DevTools 是我们为 React Native 打造的现代调试体验。它从零开始专门构建，旨在比以前的调试方法更加集成、准确和可靠。

![React Native DevTools 打开到"欢迎"面板](/docs/assets/debugging-rndt-welcome-083.jpg)

React Native DevTools 旨在调试 React 应用层面的问题，而不是取代原生工具。如果你需要检查 React Native 的底层平台层（例如，在开发原生模块时），请使用 Android Studio 和 Xcode 中可用的调试工具（请参阅[调试原生代码](/docs/debugging-native-code)）。

<details>
<summary>**💡 兼容性** — 在 0.76 中发布</summary>

React Native DevTools 支持所有运行 Hermes 的 React Native 应用。它取代了以前的 Flipper、实验性调试器和 Hermes 调试器（Chrome）前端。

无法在任何旧版本的 React Native 上使用 React Native DevTools。

- **Chrome Browser DevTools — 不再支持**
  - 通过 `chrome://inspect` 连接到 React Native 不再受支持。由于最新版本的 Chrome DevTools（构建用于匹配最新浏览器功能和 API）未经过测试，并且此前端缺少我们的定制内容，因此功能可能无法正常工作。我们会随 React Native DevTools 一起提供受支持的版本。
- **Visual Studio Code — 不再支持**（已有限制）
  - 第三方扩展如 [Expo Tools](https://github.com/expo/vscode-expo) 和 [Radon IDE](https://ide.swmansion.com/) 可能具有改进的兼容性，但不受 React 团队的直接支持。

</details>
<details>
<summary>**💡 反馈和常见问题**</summary>

我们希望你在所有平台上用来调试 React 的工具是可靠的、熟悉的、简单的和一致的。本页描述的所有功能都是基于这些原则构建的，我们还计划在未来提供更多能力。

我们正在积极迭代 React Native DevTools 的未来，并创建了一个集中的 [GitHub 讨论](https://github.com/react-native-community/discussions-and-proposals/discussions/819)来跟踪问题、常见问题和反馈。

</details>

## 核心功能

React Native DevTools 基于 Chrome DevTools 前端。如果你有 Web 开发背景，其功能应该很熟悉。作为起点，我们建议浏览 [Chrome DevTools 文档](https://developer.chrome.com/docs/devtools)，其中包含完整的指南以及视频资源。

### Console

![React Native DevTools Sources 视图中的一系列日志，旁边是一台设备](/docs/assets/debugging-rndt-console.jpg)

Console 面板允许你查看和过滤消息、执行 JavaScript、检查对象属性等。

[Console 功能参考 | Chrome DevTools](https://developer.chrome.com/docs/devtools/console/reference)

#### 实用提示

- 如果你的应用有很多日志，请使用过滤框或更改显示的日志级别。
- 使用 [Live Expressions](https://developer.chrome.com/docs/devtools/console/live-expressions) 实时观察值的变化。
- 使用 [Preserve Logs](https://developer.chrome.com/docs/devtools/console/reference#persist) 在重新加载后保持消息。
- 使用 <kbd>Ctrl</kbd> + <kbd>L</kbd> 清除控制台视图。

### Sources 和断点

![React Native DevTools Sources 视图中暂停的断点，旁边是一台设备](/docs/assets/debugging-rndt-sources-paused-with-device.jpg)

Sources 面板允许你查看应用的源文件并注册断点。使用断点定义一行代码，让应用在此暂停——允许你检查程序的实时状态并逐步执行代码。

[使用断点暂停代码 | Chrome DevTools](https://developer.chrome.com/docs/devtools/javascript/breakpoints)

:::tip

#### 迷你指南

断点是你调试工具箱中的基础工具！

1. 使用侧边栏或 <kbd>Cmd ⌘</kbd>+<kbd>P</kbd> / <kbd>Ctrl</kbd>+<kbd>P</kbd> 导航到源文件。
2. 点击代码行旁边的行号列以添加断点。
3. 暂停时使用右上角的导航控件[逐步执行代码](https://developer.chrome.com/docs/devtools/javascript/reference#stepping)。

:::

#### 实用提示

- 当应用暂停时，会出现"Paused in Debugger"覆盖层。点击它即可恢复。
- 注意断点处的右侧面板，它允许你检查当前作用域和调用栈，并设置监视表达式。
- 使用 `debugger;` 语句可以从文本编辑器快速设置断点。它会通过 Fast Refresh 立即到达设备。
- 有多种断点类型！例如，[条件断点和日志点](https://developer.chrome.com/docs/devtools/javascript/breakpoints#overview)。

### Network <div className="label primary">自 0.83 起</div>

![React Native DevTools Network 面板中的网络请求](/docs/assets/debugging-rndt-network.jpg)

Network 面板允许你查看和检查应用发出的网络请求。记录的请求提供详细的元数据，如时间信息和发送/接收的请求头，以及响应预览。

打开 DevTools 时网络请求会自动记录。我们支持 Chrome 的大部分功能，但有一些例外。详见下文。

<details>
<summary><strong>💡 网络事件覆盖范围、Expo 支持</strong></summary>

**哪些网络事件会被捕获？**

目前，我们记录所有通过 `fetch()`、`XMLHttpRequest` 和 `<Image>` 发起的网络调用——对自定义网络库（如 Expo Fetch）的支持将在后续添加。

**Expo Network 差异**

因此，使用 Expo 的应用将继续看到"Expo Network"面板——这是 Expo 框架的单独实现，它会记录这些额外的请求来源，但功能稍有减少。

- 覆盖 Expo 特定的网络事件。
- 不支持请求发起者信息。
- 不集成 Performance 面板。

我们正在与 Expo 合作，计划在未来版本中将 Expo Fetch 和第三方网络库集成到我们新的 Network 检查管道中。

**尚未实现的功能**

在发布时，以下功能在 React Native 中尚不支持：

- WebSocket 事件
- 网络响应模拟
- 模拟网络限速

</details>

<details>
<summary><strong>💡 响应预览缓冲区大小</strong></summary>

如果你正在检查大量响应数据，请注意响应预览缓存在设备上的缓冲区中，最大大小为 100MB。这意味着如果缓存变得过大，我们可能会清除响应预览（但不会清除元数据），最旧的请求最先被清除。

</details>

#### 实用提示

- 使用 Initiator 标签页查看应用中网络请求发起的调用栈。
- 网络事件也会显示在 Performance 面板的 Network 轨道中。

### Performance <div className="label primary">自 0.83 起</div>

![React Native DevTools Performance 面板中的性能追踪](/docs/assets/debugging-rndt-performance.jpg)

性能追踪允许你在应用中录制性能会话，以了解 JavaScript 代码的运行情况以及哪些操作耗时最多。在 React Native 中，我们在单个性能时间线中展示 JavaScript 执行、React 性能轨道、网络事件和自定义 [User Timings](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/User_timing)。

#### 实用提示

- 使用[注释](https://developer.chrome.com/docs/devtools/performance/annotations)（Shift+拖拽）来标记性能追踪——在[下载和分享](https://developer.chrome.com/docs/devtools/performance/save-trace)追踪记录给同事之前非常有用。注释还提供了一种快速估算时间跨度（以**秒**为单位）的方式。
- 使用应用中的 [`PerformanceObserver` API](./global-PerformanceObserver.md) 在运行时观察性能事件——如果你想捕获性能遥测数据，这非常有用。

#### 了解更多

- [React 性能轨道](https://react.dev/reference/dev-tools/react-performance-tracks)
- [Performance API > User Timings | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/User_timing)
- ["像高级开发者一样调试 — React Native Performance 面板" | Software Mansion](https://blog.swmansion.com/react-native-debugging-new-performance-panel-in-react-native-0-83-21ca90871f6d)

### Memory

![在 Memory 面板中检查堆快照](/docs/assets/debugging-rndt-memory.jpg)

Memory 面板允许你拍摄堆快照，并查看 JavaScript 代码随时间推移的内存使用情况。

[录制堆快照 | Chrome DevTools](https://developer.chrome.com/docs/devtools/memory-problems/heap-snapshots)

#### 实用提示

- 使用 <kbd>Cmd ⌘</kbd>+<kbd>F</kbd> / <kbd>Ctrl</kbd>+<kbd>F</kbd> 在堆中过滤特定对象。
- 拍摄[分配时间线报告](https://developer.chrome.com/docs/devtools/memory-problems/allocation-profiler)可以以图形方式查看随时间推移的内存使用情况，有助于识别可能的内存泄漏。

## React DevTools 功能

在集成的 Components 和 Profiler 面板中，你可以找到 [React DevTools](https://react.dev/learn/react-developer-tools) 浏览器扩展的所有功能。它们在 React Native DevTools 中可以无缝使用。

### React Components

![使用 React Components 面板选择和定位元素](/docs/assets/debugging-rndt-react-components.gif)

React Components 面板允许你检查和更新渲染的 React 组件树。

- 在 DevTools 中悬停或选择元素，设备上的对应元素会被高亮显示。
- 要在 DevTools 中定位元素，请点击左上角的"选择元素"按钮，然后点击应用中的任意元素。

#### 实用提示

- 可以使用右侧面板在运行时查看和修改组件的 props 和 state。
- 使用 [React Compiler](https://react.dev/learn/react-compiler) 优化的组件会标注"Memo ✨"徽章。

:::tip

#### 进阶提示：高亮重新渲染

重新渲染可能是 React 应用中性能问题的重要原因。DevTools 可以在组件重新渲染时实时高亮显示。

- 要启用此功能，请点击 View Settings（`⚙︎`）图标，勾选"Highlight updates when components render"。

![高亮重新渲染设置的位置，旁边是实时渲染覆盖层的录制](/docs/assets/debugging-rndt-highlight-renders.gif)

:::

### React Profiler

![以火焰图形式渲染的性能分析](/docs/assets/debugging-rndt-react-profiler.jpg)

React Profiler 面板允许你录制性能分析报告，以了解组件渲染和 React commit 的耗时情况。

更多信息请参阅[原始的 2018 年指南](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html#reading-performance-data)（注意部分内容可能已过时）。

## 重新连接 DevTools

有时 DevTools 可能会与目标设备断开连接。这可能发生在以下情况下：

- 应用已关闭。
- 应用已重新构建（安装了新的原生构建版本）。
- 应用在原生侧崩溃。
- 开发服务器（Metro）已退出。
- 物理设备已断开连接。

断开连接时，将显示一个消息为"Debugging connection was closed"的对话框。

![设备断开连接时显示的重新连接对话框](/docs/assets/debugging-reconnect-menu.jpg)

从这里，你可以：

- **关闭**：选择关闭（`×`）图标或点击对话框外部，返回到断开连接前最后状态的 DevTools UI。
- **重新连接**：选择"Reconnect DevTools"，并解决断开连接的原因后重试。
