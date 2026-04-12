---
id: getting-started
title: 简介
description: 本指南将帮助你了解学习 React Native 的前置知识、如何使用本文档，以及如何搭建开发环境。
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="content-banner">
  欢迎开启 React Native 学习之旅！如果你在寻找入门说明，它们已经移到了<a href="environment-setup">单独的章节</a>。继续阅读，了解文档结构、原生组件、React 等内容！
  <img className="content-banner-img" src="/docs/assets/p_android-ios-devices.svg" alt=" " />
</div>

许多不同类型的人都在使用 React Native：从高级 iOS 开发者，到 React 初学者，再到职业生涯中第一次开始编程的人。这些文档是为所有学习者编写的，无论他们的经验水平或背景如何。

## 如何使用本站文档

你可以从这里开始，像看书一样线性阅读这些文档；也可以阅读你需要的特定部分。已经熟悉 React 了吗？你可以跳过[该部分](intro-react)--或者阅读它来进行简单的复习。

## 预备知识

要使用 React Native，你需要对 JavaScript 基础知识有所了解。如果你是 JavaScript 新手或需要复习，你可以在 MDN 上[深入学习](https://developer.mozilla.org/en-US/docs/Web/JavaScript)或[复习一下](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript)。

:::info
虽然我们尽力假设你此前没有 React、Android 或 iOS 开发经验，但对于希望深入学习 React Native 的开发者来说，这些主题都很有价值。在合适的地方，我们也提供了更深入的参考资料和文章链接。
:::

## 交互示例

本简介会通过像下面这样的交互示例，让你立刻在浏览器中上手：

```SnackPlayer name=Hello%20World
import React from 'react';
import {Text, View} from 'react-native';

const YourApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Try editing me! 🎉</Text>
    </View>
  );
};

export default YourApp;
```

上面的是一个 Snack Player。这是 Expo 提供的一个便捷工具，用来嵌入并运行 React Native 项目，并展示它们在 Android 和 iOS 等平台上的渲染效果。代码是实时可编辑的，因此你可以直接在浏览器中动手试试。现在就把上面的 “Try editing me!” 改成 “Hello, world!” 吧。

:::tip
如果你想在本地搭建开发环境，也可以按照我们的指南[在本机上配置开发环境](set-up-your-environment)，然后把这些代码示例粘贴到你的项目中运行。（如果你是 Web 开发者，你可能已经为移动端浏览器调试配置好了本地环境！）
:::

## 开发者提示

许多具有不同开发背景的人都在学习 React Native。你可能有各种技术经验，包括 Web、Android、iOS 等。我们尽量为不同背景的开发者编写文档。有时我们会像下面这样，针对某个平台提供特定说明：

<Tabs groupId="guide" queryString defaultValue="web" values={constants.getDevNotesTabs(["android","ios","web"])}>

<TabItem value="android">

:::info
Android 开发者可能会对这个概念比较熟悉。
:::

</TabItem>
<TabItem value="ios">

:::info
iOS 开发者可能会对这个概念比较熟悉。
:::

</TabItem>
<TabItem value="web">

:::info
Web 开发者可能会对这个概念比较熟悉。
:::

</TabItem>
</Tabs>

## 特殊格式

菜单路径会使用粗体书写，并使用尖括号分隔子菜单。例如：**Android Studio > Preferences**

---

现在你已经了解了本指南的使用方式，接下来该认识 React Native 的基础了：[原生组件](intro-react-native-components.md)。
