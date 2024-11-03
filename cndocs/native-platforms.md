---
id: native-platform
title: 桥接原生平台能力
---

你的应用可能需要访问 React Native 或社区维护的数百个 [第三方库](https://reactnative.directory/) 中未直接提供的平台功能。也许你想要重用一些现有的 Objective-C、Swift、Java、Kotlin 或 C++ 代码。无论你的原因是什么，React Native 都提供了一组强大的 API 来连接你的原生代码和 JavaScript 应用代码。

本指南介绍：

- **原生模块:** 没有用户界面的原生库。例如：持久存储、通知、网络事件。这些可以通过 JavaScript 函数和对象访问。
- **原生组件:** 原生平台视图、小部件和控制器，通过 React 组件可供你的应用的 JavaScript 代码使用。

:::note
你可能曾经用过：

- [传统原生模块](./legacy/native-modules-intro);
- [传统原生 UI 组件](./legacy/native-components-android);

这些是我们即将弃用的原生模块和组件 API。由于我们引入了向后兼容的互操作层，所以你仍然可以继续使用许多这些遗留库。但即便如此，你还是应该考虑：

- 使用替代库，
- 升级到支持新架构的库，或者
- 将这些库移植到 Turbo 原生模块或 Fabric 原生组件。

:::

1. Turbo 原生模块
   - [Android 与 iOS 的原生模块](turbo-native-modules.md)
   - [使用 C++ 实现跨平台的原生模块](the-new-architecture/pure-cxx-modules.md)
   - [高级：自定义 C++ 类型](the-new-architecture/custom-cxx-types.md)
2. Fabric 原生组件
   - [Android 与 iOS 的原生 UI 组件](fabric-native-components.md)
