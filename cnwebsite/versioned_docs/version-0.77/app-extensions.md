---
id: app-extensions
title: iOS 应用小组件
---

小组件允许您在主要应用程序之外提供自定义功能和内容。iOS上有不同类型的应用小组件，它们都在[App Extension编程指南](https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/index.html#//apple_ref/doc/uid/TP40014214-CH20-SW1)中进行了介绍。在本指南中，我们将简要介绍如何在iOS上利用应用小组件的优势。

## 小组件中的内存使用

由于这些小组件是在常规应用程序沙盒之外加载的，因此很有可能同时加载多个应用程序小组件。正如您所预期的那样，这些小组件具有较小的内存使用限制。在开发应用程序扩展时，请牢记这一点。强烈建议您在实际设备上测试您的应用程序，尤其是在开发应用程序小组件时更为重要：太频繁地，开发人员会发现他们的小组件在 iOS 模拟器中运行良好，但用户报告称它们无法加载到实际设备上。

我们强烈推荐您观看Conrad Kramer关于[小组件中的内存使用](https://cocoaheads.tv/memory-use-in-extensions-by-conrad-kramer/) 的演讲以了解更多相关内容。

### 示例小组件：Today

一个 Today 小组件的内存限制是16 MB。事实上，使用 React Native 实现的 Today 小组件可能会工作不可靠，因为内存使用量往往过高。如果你的 Today 小组件超出了内存限制，它将显示“无法加载”的消息：

![](assets/TodayWidgetUnableToLoad.jpg)

始终确保在真实设备上测试您的应用小组件，但要注意这可能还不足够，特别是在处理 Today 小组件时。调试配置构建更有可能超出内存限制，而发布配置构建则不会立即失败。我们强烈推荐您使用[Xcode 的 Instruments](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/index.html)来分析您的真实世界内存使用情况，因为很可能您的发布配置构建非常接近16 MB 的限制。在这种情况下，通过执行常见操作（例如从 API 获取数据），您可以快速超过 16 MB 的限制。

要尝试扩展 React Native Today 小组件实现的示例项目，请参考[react-native-today-widget](https://github.com/matejkriz/react-native-today-widget/)。

### 其他类型的小组件

其他类型的小组件比 Today 具有更大的内存限制。例如，自定义键盘小组件限制为48 MB，共享小组件限制为120 MB。使用React Native实现此类应用程序小组件更可行。一个概念验证示例是[react-native-ios-share-extension](https://github.com/andrewsardone/react-native-ios-share-extension)。


