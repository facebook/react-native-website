---
id: native-modules-intro
title: 原生模块简介
---

import NativeDeprecated from '../the-new-architecture/\_markdown_native_deprecation.mdx'

<NativeDeprecated />

有时 React Native 应用需要访问 JavaScript 默认未提供的原生平台 API，例如访问 Apple Pay 或 Google Pay 的原生 API。或者你可能希望复用现有的 Objective-C、Swift、Java 或 C++ 库，而不是用 JavaScript 重新实现它们；又或者你需要编写一些高性能、多线程的代码来处理图片等任务。

NativeModule 系统会将 Java/Objective-C/C++（原生）类的实例以 JavaScript（JS）对象的形式暴露给 JS，这样你就可以在 JS 中执行任意原生代码。虽然我们并不期望这会成为日常开发流程的一部分，但具备这种能力是非常重要的。如果 React Native 没有导出你的 JS 应用所需的某个原生 API，你应该能够自己把它导出来。

## 原生模块的设置方式

为 React Native 应用编写原生模块有几种不同方式：

1. 创建一个可在 React Native 应用中导入的本地库。更多信息请参阅[创建本地库](local-library-setup)。
2. 直接在 React Native 应用的 iOS/Android 工程中实现。
3. 作为 NPM 包发布，供你的应用或其他 React Native 应用安装为依赖。

本指南会先带你了解如何直接在 React Native 应用内部实现一个原生模块。不过，接下来指南中构建出的原生模块也可以作为 NPM 包分发。如果你对此感兴趣，请参阅[将原生模块设置为 NPM 包](native-modules-setup)指南。

## 开始上手

在接下来的章节中，我们会带你一步步在 React Native 应用内部直接构建一个原生模块。前提是你需要先有一个 React Native 应用可供操作。如果你还没有，可以按照[这里](../getting-started)的步骤先创建一个 React Native 应用。

假设你想在 React Native 应用的 JavaScript 中访问 iOS/Android 的原生日历 API，以创建日历事件。React Native 并没有暴露一个可直接与原生日历库通信的 JavaScript API。不过，通过原生模块，你可以编写与原生日历 API 通信的原生代码，然后在 React Native 应用的 JavaScript 中调用它。

在接下来的章节中，你将分别为 [Android](native-modules-android) 和 [iOS](native-modules-ios) 创建这样一个 Calendar 原生模块。
