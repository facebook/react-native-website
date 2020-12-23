---
id: version-0.61-tutorial
title: 示例教程：Hello World
original_id: tutorial
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

React Native 看起来很像 React，只不过其基础组件是原生组件而非 web 组件。要理解 React Native 应用的基本结构，首先需要了解一些基本的 React 的概念，比如 JSX 语法、组件、`state`状态以及`props`属性。如果你已经了解了 React，那么还需要掌握一些 React Native 特有的知识，比如原生组件的使用。这篇教程可以供任何基础的读者学习，不管你是否有 React 方面的经验。

让我们开始吧！

## Hello World

根据历史悠久的“传统”，我们也来写一个“Hello, world!”：

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text>Hello, world!</Text>
        </View>
    );
  }
}
```

你可以新建一个项目，然后用上面的代码覆盖你的`App.js`文件，然后运行看看。

## 那这段代码是什么意思呢？

初看这段代码，可能觉得并不像 JavaScript——没错，这是“未来”的 JavaScript.

首先你需要了解 ES2015 （也叫作 ES6）——这是一套对 JavaScript 的语法改进的官方标准。但是这套标准目前还没有在所有的浏览器上完整实现，所以目前而言 web 开发中还很少使用。React Native 内置了对 ES2015 标准的支持，你可以放心使用而无需担心兼容性问题。上面的示例代码中的`import`、`from`、`class`、`extends`、以及`() =>`箭头函数等新语法都是 ES2015 中的特性。如果你不熟悉 ES2015 的话，可以看看[阮一峰老师的书](http://es6.ruanyifeng.com/)。

示例中的这一行`<View><Text>Hello world!</Text></View>`恐怕很多人看起来也觉得陌生。这叫做 JSX——是一种在 JavaScript 中嵌入 XML 结构的语法。很多传统的应用框架会设计自有的模板语法，让你在结构标记中嵌入代码。React 反其道而行之，设计的 JSX 语法却是让你在代码中嵌入结构标记。初看起来，这种写法很像 web 上的 HTML，只不过使用的并不是 web 上常见的标签如`<div>`或是`<span>`等，这里我们使用的是 React Native 的组件。上面的示例代码中，使用的是内置的`<Text>`组件，它专门用来显示文本，而`<View>`就类似 html 中的`div`或是`span`这样的容器。

## 组件

上面的代码定义了一个名为`HelloWorldApp`的新的`组件（Component）`。你在编写 React Native 应用时，肯定会写出很多新的组件。而一个 App 的最终界面，其实也就是各式各样的组件的组合。组件本身结构可以非常简单——唯一必须的就是在`render`方法中返回一些用于渲染结构的 JSX 语句。

## 这个示例弱爆了！

……是的。如果想做些更有意思的东西，请[接着学习 Props 属性](props.md)。或者可以看看一个[稍微复杂些的“电影列表”例子](sample-application-movies.md)。
