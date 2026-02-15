---
id: app-extensions
title: App Extensions
---

App Extensions 允许你在主应用之外提供自定义功能和内容。iOS 上有多种类型的 App Extensions，均在 [App Extension Programming Guide](https://developer.apple.com/library/content/documentation/General/Conceptual/ExtensibilityPG/index.html#//apple_ref/doc/uid/TP40014214-CH20-SW1) 中有所介绍。本指南将简要介绍如何在 iOS 上利用 App Extensions 的优势。

## 扩展中的内存使用

由于这些扩展是在常规应用沙盒之外加载的，因此很可能会同时加载多个扩展。正如你所预期的那样，这些扩展的内存用量限制较低。在开发 App Extensions 时请牢记这一点。我们始终强烈建议你在真实设备上测试应用，在开发 App Extensions 时更是如此：开发者往往发现扩展在 iOS 模拟器中运行良好，但用户反馈称扩展在真实设备上无法加载。

### Today 小组件

Today 小组件的内存限制为 16 MB。事实上，使用 React Native 实现的 Today 小组件可能会运行不稳定，因为内存使用量往往偏高。如果你的 Today 小组件超出了内存限制，它将显示"Unable to Load"（无法加载）的消息：

![](/docs/assets/TodayWidgetUnableToLoad.jpg)

务必在真实设备上测试你的 App Extensions，但请注意这可能仍不够充分，特别是 Today 小组件。Debug 配置的构建更容易超出内存限制，而 Release 配置的构建则不会立即崩溃。我们强烈建议你使用 [Xcode Instruments](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/index.html) 来分析实际内存使用情况，因为你的 Release 构建很可能已经非常接近 16 MB 的限制。在这种情况下，执行一些常规操作（如从 API 获取数据）就可能使内存迅速超过 16 MB。

要体验 React Native Today 小组件实现的极限，可以尝试扩展 [react-native-today-widget](https://github.com/matejkriz/react-native-today-widget/) 中的示例项目。

### 其他 App Extensions

其他类型的 App Extensions 拥有比 Today 小组件更大的内存限制。例如，自定义键盘扩展限制为 48 MB，分享扩展限制为 120 MB。使用 React Native 实现这类 App Extensions 更为可行。一个概念验证示例是 [react-native-ios-share-extension](https://github.com/andrewsardone/react-native-ios-share-extension)。
