---
id: version-0.47-tutorial
title: 编写Hello World
original_id: tutorial
---

React Native看起来很像React，只不过其基础组件是原生组件而非web组件。要理解React Native应用的基本结构，首先需要了解一些基本的React的概念，比如JSX语法、组件、`state`状态以及`props`属性。如果你已经了解了React，那么还需要掌握一些React Native特有的知识，比如原生组件的使用。这篇教程可以供任何基础的读者学习，不管你是否有React方面的经验。

让我们开始吧！

## Hello World

根据历史悠久的“传统”，我们也来写一个“Hello World”：

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';

class HelloWorldApp extends Component {
  render() {
    return (
      <Text>Hello world!</Text>
    );
  }
}

// 注意，这里用引号括起来的'HelloWorldApp'必须和你init创建的项目名一致
AppRegistry.registerComponent('HelloWorldApp', () => HelloWorldApp);
```

你可以新建一个项目，然后用上面的代码覆盖你的`index.ios.js`或是`index.android.js` 文件，然后运行看看。

## 那这段代码是什么意思呢？

初看这段代码，可能觉得并不像JavaScript——没错，这是“未来”的JavaScript.           

首先你需要了解ES2015 （也叫作ES6）——这是一套对JavaScript的语法改进的官方标准。但是这套标准目前还没有在所有的浏览器上完整实现，所以目前而言web开发中还很少使用。React Native内置了对ES2015标准的支持，你可以放心使用而无需担心兼容性问题。上面的示例代码中的`import`、`from`、`class`、`extends`、以及`() =>`箭头函数等新语法都是ES2015中的特性。如果你不熟悉ES2015的话，可以看看[阮一峰老师的书](http://es6.ruanyifeng.com/)，还有论坛的这篇[总结](http://bbs.reactnative.cn/topic/15)。

示例中的这一行`<Text>Hello world!</Text>`恐怕很多人看起来也觉得陌生。这叫做JSX——是一种在JavaScript中嵌入XML结构的语法。很多传统的应用框架会设计自有的模板语法，让你在结构标记中嵌入代码。React反其道而行之，设计的JSX语法却是让你在代码中嵌入结构标记。初看起来，这种写法很像web上的HTML，只不过使用的并不是web上常见的标签如`<div>`或是`<span>`等，这里我们使用的是React Native的组件。上面的示例代码中，使用的是内置的`<Text>`组件，它专门用来显示文本。

## 组件与AppRegistry

上面的代码定义了一个名为`HelloWorldApp`的新的`组件（Component）`，并且使用了名为`AppRegistry`的内置模块进行了“注册”操作。你在编写React Native应用时，肯定会写出很多新的组件。而一个App的最终界面，其实也就是各式各样的组件的组合。组件本身结构可以非常简单——唯一必须的就是在`render`方法中返回一些用于渲染结构的JSX语句。

`AppRegistry`模块则是用来告知React Native哪一个组件被注册为整个应用的根容器。你无需在此深究，因为一般在整个应用里`AppRegistry.registerComponent`这个方法只会调用一次。上面的代码里已经包含了具体的用法，你只需整个复制到`index.ios.js`或是`index.android.js`文件中即可运行。

## 这个示例弱爆了！

……是的。如果想做些更有意思的东西，请[接着学习Props属性](props.html)。或者可以看看一个[稍微复杂些的“电影列表”例子](sample-application-movies.html)。
