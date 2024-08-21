---
id: native-modules-intro
title: 原生模块简介
---

import NativeDeprecated from './the-new-architecture/\_markdown_native_deprecation.mdx'

<NativeDeprecated />

有时候 App 需要访问平台 API，但 React Native 可能还没有相应的模块包装；或者你需要复用一些 Java 代码，而不是用 Javascript 重新实现一遍；又或者你需要实现某些高性能的、多线程的代码，譬如图片处理、数据库、或者各种高级扩展等等。

我们把 React Native 设计为可以在其基础上编写真正的原生代码，并且可以访问平台所有的能力。这是一个相对高级的特性，我们并不认为它应当在日常开发的过程中经常出现，但具备这样的能力是很重要的。如果 React Native 还不支持某个你需要的原生特性，你应当可以自己实现该特性的封装。

## 创建原生模块

有多种方法可以为您的 React Native 应用程序编写原生模块：

1. 创建一个可在您的 React Native 应用程序中导入的原生库。阅读[创建原生库]（local-library-setup）指南以了解更多信息。
2. 直接在您的 React Native 应用程序的 iOS / Android 项目中
3. 作为一个 NPM 包，可以被您/其他 React Native 应用程序作为依赖项安装。

本指南将首先介绍如何直接在 React Native 应用程序内实现原生模块。但是，在以下指南中构建的原生模块可以作为 NPM 包进行分发。如果您有兴趣这样做，请查看[设置为 NPM 包的原生模块]（native-modules-setup）指南。

## 教程

在接下来的部分中，我们将带您了解如何在 React Native 应用程序内直接构建一个原生模块的指南。作为一个先决条件，您需要一个 React Native 应用程序来工作。如果您还没有，可以按照[这里](getting-started)的步骤设置一个 React Native 应用程序。

想象一下，您想在 React Native 应用程序内的 JavaScript 中访问 iOS/Android 原生日历 API，以创建日历事件。React Native 没有公开与原生日历库通信的 JavaScript API。然而，通过原生模块，您可以编写与原生日历 API 通信的原生代码。然后您可以在 React Native 应用程序中的 JavaScript 里调用该原生代码。

在接下来的部分中，您将为[Android](native-modules-android)和[iOS](native-modules-ios)创建这样一个 Calendar 原生模块。
