---
id: more-resources
title: 其他参考资源
---

如果你想继续深入学习，还有很多内容值得探索：开发工作流、发布到应用商店、国际化、安全性等等。

## 接下来可以看什么

- [搭建开发环境](environment-setup)
- [搭建开发工作流](running-on-device)
- [设计和布局你的应用](flexbox)
- [调试你的应用](debugging)
- [让你的应用支持跨平台](platform-specific-code)
- [参与 React Native 社区](/community/overview)

## 深入学习

- [React 官方文档](https://react.dev/learn)
- [MDN 的 JavaScript 教程、参考资料与指南](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Android](https://developer.android.com/docs) 和 [iOS](https://developer.apple.com/documentation/uikit) 平台文档

## IDE

我们推荐使用 [VS Code](https://code.visualstudio.com/) 编辑器，以及它方便好用的 [React Native 工具](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native)。

## 可尝试的平台

[Expo](https://docs.expo.dev/) 是一套面向 React Native 的工具与服务框架，重点帮助你构建、发布并持续迭代应用，支持类似 Web 开发中常见的预览部署工作流，并能够自动化你的开发流程。Expo 还使你可以在完全不接触 Xcode 或 Android Studio 的情况下构建 React Native 应用；如果你想使用这些工具，它也不会造成阻碍。

[Ignite](https://github.com/infinitered/ignite) 是一个包含多套 React Native 样板工程的入门 CLI。最新版本 Ignite Maverick 使用 MobX-State-Tree 进行状态管理，并集成了 React Navigation 及其他常用库。它内置用于生成 screen、model 等内容的生成器，并且开箱即支持 Expo。Ignite 还附带一个适合自定义设计、主题支持和测试的组件库。如果你正在寻找一套预先配置好的技术栈，Ignite 可能会非常适合你。

## 示例应用

你可以试试 [Showcase](https://reactnative.dev/showcase) 里的应用，看看 React Native 能做到什么！如果你想更亲自动手一些，也可以看看 GitHub 上这组[示例应用](https://github.com/ReactNativeNews/React-Native-Apps)。你可以直接阅读它们的源码——也可以尝试在模拟器或真机上运行其中一个。

## 查找、创建并分享你自己的 Native Components 和 TurboModules

React Native 拥有一个由成千上万像你一样的开发者组成的社区，他们在持续创作内容、工具、教程——以及 Native Components！

如果你在 Core Components 中找不到自己需要的内容，可以访问 [React Native Directory](https://reactnative.directory) 看看社区已经创建了哪些内容。

:::caution
本文档引用的是一套旧版 API，目前需要更新以反映新架构（New Architecture）。
:::

想自己创建 Native Component 或 Module 吗？为自己的使用场景编写模块，并通过 NPM 和 GitHub 与他人分享，有助于壮大 React Native 的生态与社区！可以阅读以下指南来创建你自己的 Native Modules（[Android](legacy/native-modules-android)、[iOS](legacy/native-modules-ios)）以及 Native Components（[Android](legacy/native-components-android)、[iOS](legacy/native-components-ios)）。
