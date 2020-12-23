---
id: getting-started
title: 简介
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(79.86%), [sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(20.14%)

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="content-banner">
  <p>
    欢迎开启 React Native 的旅程！如果你在找如何搭建环境的文档，请移步<a href="environment-setup">搭建开发环境</a>。 继续往下阅读可了解关于文档结构、原生组件、React等相关的一些介绍。
  </p>
  <img className="content-banner-img" src="/docs/assets/p_android-ios-devices.svg" alt=" " />
</div>

许多不同类型的人都在使用 React Native：从高级 iOS 开发人员到 React 初学者，再到职业生涯中第一次开始编程的人。这些文档是为所有学习者编写的，无论他们的经验水平或背景如何。

## 如何使用本站文档

你可以从这里开始，像看书一样线性阅读这些文档；也可以阅读你需要的特定部分。已经熟悉 React 了吗？你可以跳过[该部分](intro-react)--或者阅读它来进行简单的复习。

## 预备知识

要使用 React Native，你需要对 JavaScript 基础知识有所了解。如果你是 JavaScript 新手或需要复习，你可以在 MDN 上[深入学习](https://developer.mozilla.org/en-US/docs/Web/JavaScript)或[复习一下](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)。

> 虽然我们尽最大努力假设读者在这之前没有太多 React、Android 或 iOS 开发的知识，但对于有抱负的 React Native 开发者来说，这些都是有价值的学习主题。我们会尽可能地提供深入了解的相关文章链接。

## 交互示例

文档中时常会附有一些可以直接在浏览器中运行的交互示例，例如：

```SnackPlayer name=Hello%20World
import React from 'react';
import { Text, View } from 'react-native';

const YourApp = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        Try editing me! 🎉
      </Text>
    </View>
  );
}

export default YourApp;
```

上面的示例使用了一个叫做 Snack Player 的工具（我们也会用“沙盒环境”代指）。这是由 Expo 公司提供的专门用于演示、学习 React Native 的交互工具。它集成了 react-native-web 兼容层，会尽可能把 React Native 的代码转化为兼容的网页来运行（当然会有无法转化的情况，那种情况下则必须使用模拟器或者手机来运行）。上面的代码可以直接修改和运行，所以你可以在里面直接练习。试着改下上面示例中的文字看看效果吧！

> 沙盒环境通常只用于简单的演示、学习项目，它无法添加新的原生模块。所以对于正式的项目，我们建议[搭建完整的原生环境](environment-setup) 。上面的代码你也可以直接复制粘贴到完整项目的`App.js`文件中来运行。

## 函数式组件与 Class 组件

With React, you can make components using either classes or functions. Originally, class components were the only components that could have state. But since the introduction of React's Hooks API, you can add state and more to function components.

[Hooks were introduced in React Native 0.59.](/blog/2019/03/12/releasing-react-native-059), and because Hooks are the future-facing way to write your React components, we wrote this introduction using function component examples. Where useful, we also cover class components under a toggle like so:

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Hello%20World%20Function%20Component
import React from 'react';
import { Text, View } from 'react-native';

const HelloWorldApp = () => {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
}

export default HelloWorldApp;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Hello%20World%20Class%20Component
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

export default HelloWorldApp;
```

</TabItem>
</Tabs>

You can find more examples of class components in [previous versions of this documentation](/versions).

## 给开发者的提示

People from many different development backgrounds are learning React Native. You may have experience with a range of technologies, from web to Android to iOS and more. We try to write for developers from all backgrounds. Sometimes we provide explanations specific to one platform or another like so:

<Tabs groupId="guide" defaultValue="web" values={constants.getDevNotesTabs(["android", "ios", "web"])}>

<TabItem value="web">

> Web developers may be familiar with this concept.

</TabItem>
<TabItem value="android">

> Android developers may be familiar with this concept.

</TabItem>
<TabItem value="ios">

> iOS developers may be familiar with this concept.

</TabItem>
</Tabs>

## 特殊格式

Menu paths are written in bold and use carets to navigate submenus. Example: **Android Studio > Preferences**

---

Now that you know how this guide works, it's time to get to know the foundation of React Native: [Native Components](intro-react-native-components.md).
