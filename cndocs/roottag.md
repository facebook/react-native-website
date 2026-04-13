---
id: roottag
title: RootTag
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`RootTag` 是用于标记 React Native 原生根视图层的不透明标识符（opaque identifier）。具体来说就是 `ReactRootView`(android) 或是 `RCTRootView`(iOS) 的实例 ID.

## 什么时候使用 RootTag?

对于绝大多数 React Native 开发者来说，一般你并不需要用到`RootTag`。

`RootTag`在应用程序渲染**多个 React Native 根视图**且需要根据不同表面处理原生 API 调用时非常有用。一个例子是当应用程序使用原生导航，每个屏幕都是一个独立的 React Native 根视图。

在原生导航中，每个 React Native 根视图都在平台的导航视图中渲染（例如，Android 的`Activity`，iOS 的`UINavigationViewController`）。通过这种方式，你可以利用平台的导航范式，如原生外观和导航转场。与原生导航 API 交互的功能可以通过[原生模块](https://reactnative.dev/docs/next/native-modules-intro)暴露给 React Native。

例如，要更新屏幕的标题栏，你需要调用导航模块的 API `setTitle("更新的标题")`，但它需要知道要更新堆栈中的哪个屏幕。这里需要`RootTag`来识别根视图及其宿主容器。

`RootTag`的另一个用例是当你的应用程序需要根据 JavaScript 调用的原始根视图来归属某个原生调用时。`RootTag`在这里是必要的，用于区分来自不同表面的调用源。

## 如何使用 RootTag （如果你确实要用的话）

在 0.65 及以下版本中，RootTag 通过[旧版上下文](https://github.com/facebook/react-native/blob/v0.64.1/Libraries/ReactNative/AppContainer.js#L56)访问。为了让 React Native 为 React 18 及以后版本中的并发特性做准备，我们正在迁移到最新的[Context API](https://react.dev/reference/react/createContext)，通过 0.66 版本中的`RootTagContext`实现。0.65 版本同时支持旧版上下文和推荐的`RootTagContext`，以便开发者有时间迁移他们的调用点。请参阅重大变更摘要。

如何通过`RootTagContext`访问`RootTag`。

```js
import {RootTagContext} from 'react-native';
import NativeAnalytics from 'native-analytics';
import NativeNavigation from 'native-navigation';

function ScreenA() {
  const rootTag = useContext(RootTagContext);

  const updateTitle = title => {
    NativeNavigation.setTitle(rootTag, title);
  };

  const handleOneEvent = () => {
    NativeAnalytics.logEvent(rootTag, 'one_event');
  };

  // ...
}

class ScreenB extends React.Component {
  static contextType: typeof RootTagContext = RootTagContext;

  updateTitle(title) {
    NativeNavigation.setTitle(this.context, title);
  }

  handleOneEvent() {
    NativeAnalytics.logEvent(this.context, 'one_event');
  }

  // ...
}
```

从 React 文档中了解更多关于[class](https://react.dev/reference/react/Component#static-contexttype)和[hooks](https://react.dev/reference/react/useContext)的 Context API。

### 0.65 版本中的不兼容变更

`RootTagContext` 之前被命名为 `unstable_RootTagContext`，并在 0.65 版本中更改为 `RootTagContext`。请更新您代码库中所有使用 `unstable_RootTagContext` 的地方。

### 0.66 版本中的不兼容变更

对`RootTag`的传统上下文访问将被移除，并由`RootTagContext`替代。从 0.65 版本开始，我们鼓励开发者主动将`RootTag`访问迁移到`RootTagContext`。

## 未来的计划

随着新的 React Native 架构的推进，`RootTag`将会有未来的迭代，目的是保持`RootTag`类型的不透明性，并防止 React Native 代码库中的频繁变动。请不要依赖于 RootTag 目前是数字类型的别名这一事实！如果您的应用依赖于 RootTags，请密切关注我们的版本变更日志，您可以在[这里](https://github.com/facebook/react-native/blob/main/CHANGELOG.md)找到。
