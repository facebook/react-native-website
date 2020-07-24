---
id: intro-react-native-components
title: 核心组件与原生组件
description: React Native lets you compose app interfaces using Native Components. Conveniently, it comes with a set of these components for you to get started with right now—the Core Components!
---

React Native 是一个使用[React](https://zh-hans.reactjs.org/)和应用平台的原生功能来构建 Android 和 iOS 应用的开源框架。通过 React Native，您可以使用 JavaScript 来访问移动平台的 API，以及使用 React 组件来描述 UI 的外观和行为：一系列可重用、可嵌套的代码。你可以在下一节了解更多关于 React 的信息。但首先，让我们介绍一下组件在 React Native 中是如何工作的。

## 视图（Views）与移动开发

在 Android 和 iOS 开发中，一个**视图**是UI的基本组成部分：屏幕上的一个小矩形元素、可用于显示文本、图像或响应用户输入。甚至应用程序最小的视觉元素（例如一行文本或一个按钮）也都是各种视图。某些类型的视图可以包含其他视图。全部都是视图。

<figure>
  <img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/diagram_ios-android-views.svg" width="1000" alt="Diagram of Android and iOS app showing them both built on top of atomic elements called views.">
  <figcaption>Android和iOS应用中多种视图的一些示例。</figcaption>
</figure>

## 原生组件

在Android开发中是使用Kotlin或Java来编写视图；在iOS开发中是使用Swift或Objective-C来编写视图。在React Native中，则使用React组件通过JavaScript来调用这些视图。在运行时，React Native为这些组件创建相应的Android和iOS视图。由于React Native组件就是对原生视图的封装，因此使用React Native编写的应用外观、感觉和性能与其他任何原生应用一样。我们将这些平台支持的组件称为**原生组件**。

React Native允许您为Android和iOS构建自己的Native Components（原生组件），以满足您开发应用程序的独特需求。我们还有一个由社区贡献的繁荣生态系统，您可以到[Native Directory](https://www.native.directory/)来查找社区已创建的内容。

React Native还包括一组基本的，随时可用的原生组件，您可以使用它们来构建您的应用程序。这些是React Native的**核心组件**。

## 核心组件

React Native具有许多核心组件，从表单控件到活动指示器，应有尽有。你可以在[API章节](components-and-apis)找到它们。您将主要使用以下核心组件：

| React Native UI Component | Android View   | iOS View         | Web Analog               | Description                                                                                           |
| ------------------------- | -------------- | ---------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `<View>`                  | `<ViewGroup>`  | `<UIView>`       | A non-scrollling `<div>` | A container that supports layout with flexbox, style, some touch handling, and accessibility controls |
| `<Text>`                  | `<TextView>`   | `<UITextView>`   | `<p>`                    | Displays, styles, and nests strings of text and even handles touch events                             |
| `<Image>`                 | `<ImageView>`  | `<UIImageView>`  | `<img>`                  | Displays different types of images                                                                    |
| `<ScrollView>`            | `<ScrollView>` | `<UIScrollView>` | `<div>`                  | A generic scrolling container that can contain multiple components and views                          |
| `<TextInput>`             | `<EditText>`   | `<UITextField>`  | `<input type="text">`    | Allows the user to enter text                                                                         |

在接下来的章节，您将开始组合这些核心组件，来了解React的工作方式。来让我们现在做一些热身吧！

```SnackPlayer name=Hello%20World
import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';

const App = () => {
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
}

export default App;
```

---

由于React Native使用与React组件相同的API结构，因此您需要了解React组件API才能上手。您可以在[下一章节学习](intro-react)到关于此的简单介绍或复习相关内容。如果您已经熟悉React，请您[随时跳过](handling-text-input)。

<img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/diagram_react-native-components.svg" width="1000" alt="A diagram showing React Native's Core Components are a subset of React Components that ship with React Native.">
