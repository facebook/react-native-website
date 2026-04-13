---
id: release-levels
title: 发布级别
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native 为社区提供了在单个新功能的设计和实现几乎完成后就立即采用它们的能力，甚至在它们被包含在稳定版本之前。这种方法称为**发布级别**。

您可以配置 React Native 的发布级别，使您的 React Native 实例在初始化时将功能标志设置为 `EXPERIMENTAL`、`CANARY` 或 `STABLE` 模式。

:::note
这种方法类似于 [React 中的 Canary 和 Experimental 版本](https://react.dev/blog/2023/05/03/react-canaries)，但有一个关键区别：无论发布级别如何，都使用相同版本的 React JS 和 React Native 代码。  
React Native 也不使用 `@canary` 或 `@experimental` NPM 标签，因为发布级别可用于 React Native 的稳定版本和每夜构建版本。
:::

此外，将发布级别设置为 `EXPERIMENTAL` 或 `CANARY` **不会**导致使用 `react@nightly` 或 `react@canary`，这是由于 react-native 使用 React 版本的方式（[您可以在这里阅读更多信息](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Renderer/README.md#react--react-native-versions)）。

## 何时使用每个发布级别

- **`STABLE`**：
  - 用于所有生产应用和不需要提前访问未发布功能的库。
  - 这是稳定版本和每夜构建版本的默认级别。
- **`CANARY`：**
  - 如果您是框架作者、高级应用开发人员，或需要在功能在稳定版本中发布之前测试或采用新功能，请使用此级别。
  - 不建议用于生产或面向用户的应用程序。
- **`EXPERIMENTAL`：**
  - 仅用于测试和为开发早期阶段的新功能提供反馈
  - 不建议用于生产或面向用户的应用程序。

## 如何使用 Canary 和 Experimental 初始化 React Native

### Android

`DefaultNewArchitectureEntryPoint` 类现在有一个 `releaseLevel` 属性（默认值：`STABLE`）。  
功能标志系统使用此属性为所选的发布级别选择适当的功能标志集。

```kotlin title="示例用法"
DefaultNewArchitectureEntryPoint.releaseLevel = ReleaseLevel.CANARY
DefaultNewArchitectureEntryPoint.load()
```

构建系统为每个发布级别生成不同的功能标志覆盖类，确保为每个阶段启用正确的功能。

### iOS

`RCTReactNativeFactory` 类现在有一个接受 `releaseLevel` 参数的初始化器。功能标志设置使用此参数来选择正确的功能标志覆盖。

<Tabs groupId="ios-language" queryString defaultValue={constants.defaultAppleLanguage} values={constants.appleLanguages}>
<TabItem value="objc">
  
```objc title="AppDelegate.mm"
[[RCTReactNativeFactory alloc] initWithDelegate:delegate releaseLevel:Canary];
```

</TabItem>
<TabItem value="swift">
  
```swift title="AppDelegate.swift"
let factory = RCTReactNativeFactory(delegate: delegate, releaseLevel: RCTReleaseLevel.Canary)
```

</TabItem>
</Tabs>

系统确保每个应用实例只有一个发布级别处于活动状态，如果创建具有不同发布级别的多个工厂，将会崩溃。
