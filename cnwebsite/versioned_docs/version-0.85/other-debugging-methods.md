---
id: other-debugging-methods
title: 其他调试方法
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

此页面介绍了传统的 JavaScript 调试方法。如果你正在使用新创建的 React Native 或 Expo 应用，我们建议使用 [React Native DevTools](./react-native-devtools)。

## Safari 开发者工具（直接调试 JSC）

当你的应用使用 [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore)（JSC）作为运行时环境时，可以使用 Safari 来调试应用的 iOS 版本。

1. **仅适用于物理设备**：打开"设置"应用，导航到 Safari > 高级，确保"Web 检查器"已打开。
2. 在 Mac 上，打开 Safari 并启用"开发"菜单。可以在 Safari > 设置... 下找到，然后选择"高级"选项卡，再勾选"显示面向 Web 开发者的功能"。
3. 在"开发"菜单下找到你的设备，并从子菜单中选择"JSContext"项。这将打开 Safari 的 Web 检查器，其中包括类似于 Chrome 开发者工具的控制台和源代码面板。

![Opening Safari Web Inspector](/docs/assets/debugging-safari-developer-tools.jpg)

:::tip
虽然默认情况下可能没有启用 Source Map，但你可以参考[这篇指南](https://blog.nparashuram.com/2019/10/debugging-react-native-ios-apps-with.html)或者[视频](https://www.youtube.com/watch?v=GrGqIIz51k4)，了解如何启用它们，并在源代码的正确位置设置断点。
:::

:::tip
每次应用重新加载时，都会创建一个新的 JSContext。勾选"Automatically Show Web Inspectors for JSContexts"可以省去你手动选择最新 JSContext 的麻烦。
:::

## 远程 JavaScript 调试（已移除）

:::warning 重要
远程 JavaScript 调试功能已在 React Native 0.79 版本中移除。请查看原始的[弃用公告](https://github.com/react-native-community/discussions-and-proposals/discussions/734)。

如果你使用的是较旧版本的 React Native，请查阅[对应版本的文档](/versions)。
:::

![The remote debugger window in Chrome](/docs/assets/debugging-chrome-remote-debugger.jpg)
