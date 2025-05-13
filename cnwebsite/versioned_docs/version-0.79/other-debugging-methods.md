---
id: other-debugging-methods
title: 其他调试方法
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

此页面介绍了除 [打开调试器](./debugging#opening-the-debugger) 中描述的方法之外的其他 JavaScript 调试方法。如果你正在使用新创建的 React Native 或 Expo 应用，我们建议从那里开始。

## Safari 开发者工具（直接调试 JSC）

当你的应用使用 [JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore)（JSC）作为运行时环境时，可以使用 Safari 来调试应用的 iOS 版本。

1. **仅适用于物理设备**：打开"设置"应用，导航到 Safari > 高级，确保"Web 检查器"已打开。
2. 在 Mac 上，打开 Safari 并启用"开发"菜单。可以在 Safari > 设置... 下找到，然后选择"高级"选项卡，再勾选"显示开发者功能"。
3. 在"开发"菜单下找到你的设备，并从子菜单中选择"JSContext"项。这将打开 Safari 的 Web 检查器，其中包括类似于 Chrome 开发者工具的控制台和源代码面板。

![Opening Safari Web Inspector](/docs/assets/debugging-safari-developer-tools.jpg)

:::tip
虽然默认情况下可能没有启用 Source Map,但是你可以参考这篇指南或者视频,了解如何启用它们,并在源代码的正确位置设置断点。
:::

:::tip
每次应用重新加载时,都会创建一个新的 JSContext。勾选"Automatically Show Web Inspectors for JSContexts"可以省去你手动选择最新 JSContext 的麻烦。
:::

## 远程 JavaScript 调试（已弃用）

:::warning
在 React Native 0.73 版本中，远程 JavaScript 调试功能已被弃用，未来版本将彻底移除。
:::

远程 JavaScript 调试可以将外部网页浏览器（Chrome）连接到你的应用，并在网页中运行你的 JavaScript 代码。这使得你可以像调试普通网页应用一样，使用 Chrome 的调试器来调试 React Native 应用。不过需要注意的是，浏览器环境与应用环境可能存在很大差异，并非所有的 React Native 模块都能在这种调试方式下正常工作。

### 设置

从 React Native 0.73 开始，必须使用 `NativeDevSettings` 模块**手动启用**远程 JavaScript 调试功能。

```js
import NativeDevSettings from 'react-native/Libraries/NativeModules/specs/NativeDevSettings';

function MyApp() {
  // 将此操作分配给只在开发模式下显示的按钮或 useEffect 调用。
  const connectToRemoteDebugger = () => {
    NativeDevSettings.setIsDebuggingRemotely(true);
  };
}
```

当调用`NativeDevSettings.setIsDebuggingRemotely(true)`时,系统会打开新的标签页[http://localhost:8081/debugger-ui](http://localhost:8081/debugger-ui)。

从该页面,你可以通过以下方式打开 Chrome 开发者工具:

- View > Developer > Developer Tools
- <kbd>⌥ Option</kbd> + <kbd>Cmd ⌘</kbd> + <kbd>I</kbd> (macOS) / <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>I</kbd> (Windows 和 Linux 系统)。

你可以在控制台和源代码面板中查看 React Native 代码。

![The remote debugger window in Chrome](/docs/assets/debugging-chrome-remote-debugger.jpg)

:::info 信息
在 Chrome 远程 JavaScript 调试器下,React DevTools 的网页版本将无法与 React Native 一起使用。请参阅 [React DevTools](./react-devtools) 指南,了解如何使用独立版本的 React DevTools。
:::

:::note 注意
在 Android 上,如果调试器与设备之间的时间发生偏移,可能会导致动画和事件行为异常。可以通过运行 `adb shell "date `date +%m%d%H%M%Y.%S%3N`"` 命令来修复这个问题。如果使用物理设备,则需要 root 权限。
:::

### 在实体设备上调试

:::info
如果您使用的是 Expo CLI，则已为您配置好了。
:::

<Tabs groupId="platform" defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="ios">

在 iOS 设备上,打开文件[`RCTWebSocketExecutor.mm`](https://github.com/facebook/react-native/blob/master/packages/react-native/React/CoreModules/RCTWebSocketExecutor.mm),将"localhost"替换为你电脑的 IP 地址。

</TabItem>
<TabItem value="android">

对于通过 USB 连接的 Android 5.0+设备,您可以使用[`adb`命令行工具](http://developer.android.com/tools/help/adb.html)在设备和电脑之间建立端口映射:

```sh
adb reverse tcp:8081 tcp:8081
```

</TabItem>
</Tabs>

:::note 注意
如果您遇到任何问题,可能是某个 Chrome 扩展程序与调试器有了意外的互动。请尝试禁用所有扩展程序，然后一个个重新启用，直到找到有问题的扩展程序。
:::
