---
id: fabric-renderer
title: Fabric 渲染器
---

Fabric 是 React Native 新架构的渲染系统，是从老架构的渲染系统演变而来的。核心原理是在 C++ 层统一更多的渲染逻辑，提升与宿主平台（host platforms）互操作性，并为 React Native 解锁更多能力。其研发始于 2018 年。从 2021 年开始， Facebook App 中的 React Native 启用了新的渲染器。

该文档简介了新渲染器（new renderer）及其核心概念，它不包括平台细节和任何代码细节，它介绍了核心概念、初衷、收益和不同场景的渲染流程。

> 名词解释：
>
> 宿主平台（Host platform）：React Native 嵌入的平台，比如 Android、iOS、Windows、macOS。
>
> Fabric 渲染器（Fabric Renderer）：React Native 执行的 React 框架代码，和 React 在 Web 中执行代码是同一份。但是，React Native 渲染的是通用平台视图（宿主视图）而不是 DOM 节点（可以认为 DOM 是 Web 的宿主视图）。Fabric 渲染器使得渲染宿主视图变得可行。Fabric 让 React 与各个平台直接通信并管理其宿主视图实例。Fabric 渲染器存在于 JavaScript 中，并且它调用的是由 C++ 代码暴露的接口。在这篇文章中有更多关于 React 渲染器的信息。


## 新渲染器的初衷和收益

开发新的渲染架构的初衷是为了更好的用户体验，而这种新体验是在老架构上是不可能实现的。比如：

- 为了提升宿主视图（host views）和 React 视图（React views）的互操作性，渲染器必须有能力同步地测量和渲染 React 界面。在老架构中，React Native 布局是异步的，这导致在宿主视图中渲染嵌套的 React Native 视图，会有布局“抖动”的问题。
- 借助多优先级和同步事件的能力，渲染器可以提高用户交互的优先级，来确保他们的操作得到及时的处理。
- React Suspense 的集成，允许你在 React 中更符合直觉地写请求数据代码。
- 允许你在 React Native 使用 React Concurrent 可中断渲染功能。
- 更容易实现 React Native 的服务端渲染。

新架构的收益还包括，代码质量、性能、可扩展性。

- 类型安全：代码生成工具（code generation）确保了 JS 和宿主平台两方面的类型安全。代码生成工具使用 JavaScript 组件声明作为唯一事实源，生成 C++ 结构体来持有 props 属性。不会因为 JavaScript 和宿主组件 props 属性不匹配而出现构建错误。
- 共享 C++ core：渲染器是用 C++ 实现的，其核心 core 在平台之间是共享的。这增加了一致性并且使得新的平台能够更容易采用 React Native。（译注：例如 VR 新平台）
- 更好的宿主平台互操作性：当宿主组件集成到 React Native 时，同步和线程安全的布局计算提升了用户体验（译注：没有异步的抖动）。这意味着那些需要同步 API 的宿主平台库，变得更容易集成了。
- 性能提升：新的渲染系统的实现是跨平台的，每个平台都从那些原本只在某个特定平台的实现的性能优化中，得到了收益。比如拍平视图层级，原本只是 Android 上的性能优化方案，现在 Android 和 iOS 都直接有了。
- 一致性：新的渲染系统的实现是跨平台的，不同平台之间更容易保持一致。
- 更快的启动速度：默认情况下，宿主组件的初始化是懒执行的。
- JS 和宿主平台之间的数据序列化更少：React 使用序列化 JSON 在 JavaScript 和宿主平台之间传递数据。新的渲染器用 JSI（JavaScript Interface）直接获取 JavaScript 数据。


> 名词解释
>
> JavaScript Interfaces (JSI)：一个轻量级的 API，给在 C++ 应用中嵌入的 JavaScript 引擎用的。Fabric 使用它在 Fabric 的 C++ 核心和 React 之间进行通信。
