---
id: architecture-glossary
title: 术语表
---

## Fabric 渲染器（Fabric Renderer）

React Native 执行的 React 框架代码，和 React 在 Web 中执行代码是同一份。但是，React Native 渲染的是通用平台视图（宿主视图）而不是 DOM 节点（可以认为 DOM 是 Web 的宿主视图）。 Fabric 渲染器使得渲染宿主视图变得可行。Fabric 让 React 与各个平台直接通信并管理其宿主视图实例。 Fabric 渲染器存在于 JavaScript 中，并且它调用的是由 C++ 代码暴露的接口。在这篇文章中有更多关于 React 渲染器的信息。

## 宿主平台（Host platform）

React Native 嵌入的平台，比如 Android、iOS、Windows、macOS。

## 宿主视图树（Host View Tree）

宿主视图树就是一系列的宿主视图。宿主平台有 Android 平台、iOS 平台等等。在 Android 上，宿主视图就是 android.view.ViewGroup实例、 android.widget.TextView实例等等。宿主视图就像积木一样地构成了宿主视图树。每个宿主视图的大小和坐标位置基于的是 LayoutMetrics，而  LayoutMetrics是通过布局引擎 Yoga 计算出来的。宿主视图的样式和内容信息，是从 React 影子树中得到的。

## JavaScript Interfaces (JSI)

一个轻量级的 API，给在 C++ 应用中嵌入的 JavaScript 引擎用的。Fabric 使用它在 Fabric 的 C++ 核心和 React 之间进行通信。

## Java Native Interface (JNI)

Java Native Interface (JNI)：一个用 Java 写的 [API](https://docs.oracle.com/javase/8/docs/technotes/guides/jni/)，用于在 Java 中写 native(译注：指调用 C++) 方法。作用是实现 Fabric 的 C++ 核心和 Android 的通信。

## React 组件（React Component）

React 组件就是 JavaScript 函数或者类，描述如何创建 React 元素。[Read more about React components, elements in this blog post.](https://reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)

## React 复合组件（React Composite Components）

React 组件的 render 方法中，包括其他 React 复合组件和 React 宿主组件。（译注：复合组件就是开发者声明的组件）

## React 宿主组件（React Host Components or Host Components）

React 组件的视图是通过宿主视图，比如 `<View>`、`<Text>`，实现的。在 Web 中，ReactDOM 的宿主组件就是 `<p>`标签、`<div>`标签代表的组件。

## React 元素树（React Element Trees）

React 元素树是通过 JavaScript 中的 React 创建的，该树由一系类 React 元素组成。一个 React 元素就是一个普通的 JavaScript 对象，它描述了应该在屏幕中展示什么。一个元素包括属性 props、样式 styles、子元素 children。React 元素分为两类：React 复合组件实例（React Composite Components）和 React 宿主组件（React Host Components）实例，并且它只存在于 JavaScript 中。

## React 影子树（React Shadow Tree and React Shadow Node)

React 影子树是通过 Fabric 渲染器创建的，树由一系列 React 影子节点组成。一个 React 影子节点是一个对象，代表一个已经挂载的 React 宿主组件，其包含的属性 props 来自 JavaScript。它也包括布局信息，比如坐标系 x、y，宽高 width、height。在新渲染器 Fabric 中，React 影子节点对象只存在于 C++ 中。而在老架构中，它存在于手机运行时的堆栈中，比如 Android 的 JVM。

## Yoga 树（以及 Yoga 节点）

The _Yoga Tree_ is used by [Yoga](https://yogalayout.com/) to calculate layout information for a React Shadow Tree. Each React Shadow Node typically creates a _Yoga Node_ because React Native employs Yoga to calculate layout. However, this is not a hard requirement. Fabric can also create React Shadow Nodes that do not use Yoga; the implementation of each React Shadow Node determines how to calculate layout.
