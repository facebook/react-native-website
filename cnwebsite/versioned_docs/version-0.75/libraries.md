---
id: libraries
title: 使用第三方库
author: Brent Vatne
authorURL: 'https://twitter.com/notbrent'
description: This guide introduces React Native developers to finding, installing, and using third-party libraries in their apps.
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native 提供了一系列内置的[核心组件和 API](components-and-apis)，但并不局限于此。React Native 有一个庞大的社区，如果核心组件和 API 不能满足你的需求，你完全可以去社区的广阔天地中寻求合适的第三方库。

## 选择一个包管理器

React Native libraries are typically installed from the [npm registry](https://www.npmjs.com/) using a Node.js package manager such as [npm CLI](https://docs.npmjs.com/cli/npm) or [Yarn 经典版(v1)](https://classic.yarnpkg.com/en/).

通常，React Native 库是从 [npm 源](https://www.npmjs.com/) 安装的，使用诸如 [npm CLI](https://docs.npmjs.com/cli/npm) 或 [Yarn 经典版(v1)](https://classic.yarnpkg.com/en/) 的 Node.js 包管理器。

如果你的电脑上安装了 Node.js，那么你已经有了 npm CLI。一些开发者更喜欢使用 Yarn v1，因为它具有略快的安装时间和额外的高级功能，如 workspace。这两种工具都可以很好地支持 React Native。为了简化解释，在本指南的其余部分我们将假设使用 npm。

> 💡 在 JavaScript 社区，“库（library）”和“包（package）”这两个术语一直是混用的，可视为等同。

## 安装第三方库

要在你的项目中安装一个库，你需要在终端里进入你的项目目录然后运行 `npm install <库的名字>`。我们来用 `react-native-webview` 试试：

```bash
npm install react-native-webview
```

我们刚刚安装的这个库包含了原生代码，我们需要在应用中链接它才能使用。

## 链接 iOS 原生代码

React Native 使用 CocoaPods 来管理 iOS 项目的依赖项，大多数 React Native 库都遵循这个约定。如果您使用的库不是这样的，请参考它们的 README 获取额外的指导。在大多数情况下以下说明都适用。

在 `ios` 目录下运行 `pod install` 将其链接到我们的原生 iOS 项目。一个不需要切换到 `ios` 目录就可以做到这一点的快捷方式是运行 `npx pod-install`。

```bash
npx pod-install
```

完成后，重新构建应用程序二进制文件以开始使用您的新库：

```bash
npx react-native run-ios
```

## 链接 Android 原生代码

React Native 使用 Gradle 来管理 Android 项目的依赖关系。在安装了带有原生依赖项的库之后，您需要重新构建应用程序二进制文件以使用您的新库：

```bash
npx react-native run-android
```

## 搜索第三方库

[React Native 目录](https://reactnative.directory) 是一个可搜索的数据库，收录了专门为 React Native 构建的库。这是寻找适用于你的 React Native 应用的库的第一个地方。

你在目录中找到的许多库来自 [React Native 社区](https://github.com/react-native-community/) 或者 [Expo](https://docs.expo.io/versions/latest/)。

由 React Native 社区构建的库是由志愿者和依赖 React Native 的公司的个人推动的。它们通常支持 iOS、tvOS、Android、Windows，但这在各个项目之间有所不同。这个组织中的许多库曾经是 React Native 的核心组件和 API。

由 Expo 构建的库都用 TypeScript 编写，并尽可能支持 iOS、Android 和 react-native-web。使用这些库之前，你通常需要先在你的 React Native 应用中安装 [react-native-unimodules](https://github.com/expo/expo/tree/master/packages/react-native-unimodules)。

如果在 React Native 目录找不到专门针对 React Native 的库，[npm 源](https://www.npmjs.com/) 是下一个最佳选择。npm 源仓库是 JavaScript 库的权威来源，但它列出的库可能并非都与 React Native 兼容。React Native 是众多 JavaScript 的运行环境之一，类似 Node.js、Web 浏览器、Electron 等，而 npm 中存放了适用于所有这些环境的库。

## 判断第三方库的兼容性

### 它支持 React Native 吗？

通常为其他平台特别构建的库与 React Native 不兼容。例如，`react-select`是为 Web 构建的，专门针对`react-dom`，而`rimraf`是为 Node.js 构建的，并与您的计算机文件系统交互。像`lodash`这样的其他库仅使用 JavaScript 语言特性，在任何环境中都可以工作。随着时间的推移，您将对此有所了解，但在那之前，最简单的方法是自己尝试。如果发现它在 React Native 中不起作用，您可以使用`npm uninstall`来移除包。

### 它支持某个系统平台吗？

[React Native 目录](https://reactnative.directory/) 允许您根据平台兼容性进行筛选，例如 iOS、Android、Web 和 Windows。如果您想要使用的库目前在其中没有列出，请参考库的 README 了解更多信息。

### 它支持我的 React Native 的版本吗?

一个库的最新版本通常与最新版本的 React Native 兼容。如果您使用的是旧版本,您应当查阅 README 文件了解应该安装该库的哪个版本。您可以通过运行 `npm install <library-name>@<version-number>`命令来安装特定版本的库,例如:`npm install @react-native-community/netinfo@^2.0.0`。
