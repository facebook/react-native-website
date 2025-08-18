---
id: threading-model
title: 线程模型
---

> 文档介绍了即将发布的新渲染器 Fabric 的架构。

#### React Native 渲染器在多个线程之间分配渲染流水线（render pipeline）任务。

接下来我们会给线程模型下定义，并提供一些示例来说明渲染流水线的线程用法。

React Native 渲染器是线程安全的。从更高的视角看，在框架内部线程安全是通过不可变的数据结果保障的，其使用的是 C++ 的 const correctness 特性。这意味着，在渲染器中 React 的每次更新都会重新创建或复制新对象，而不是更新原有的数据结构。这是框架把线程安全和同步 API 暴露给 React 的前提。

渲染器使用三个不同的线程：

- UI 线程（主线程）：唯一可以操作宿主视图的线程。
- JavaScript 线程：这是执行 React 渲染阶段的地方。
- 后台线程：专门用于布局的线程。

让我们回顾一下每个阶段支持的执行场景：

![Threading model symbols](https://reactnative.dev/docs/assets/Architecture/threading-model/symbols.png)

## 渲染场景

### 在后台线程中渲染

这是最常见的场景，大多数的渲染流水线发生在 JavaScript 线程和后台线程。

![Threading model use case one](https://reactnative.dev/docs/assets/Architecture/threading-model/case-1.jpg)

### 在主线程中渲染

当 UI 线程上有高优先级事件时，渲染器能够在 UI 线程上同步执行所有渲染流水线。

![Threading model use case two](https://reactnative.dev/docs/assets/Architecture/threading-model/case-2.jpg)

### 默认或连续事件中断

在这个场景中，UI 线程的低优先级事件中断了渲染步骤。React 和 React Native 渲染器能够中断渲染步骤，并把它的状态和一个在 UI 线程执行的低优先级事件合并。在这个例子中渲染过程会继续在后台线程中执行。

![Threading model use case three](https://reactnative.dev/docs/assets/Architecture/threading-model/case-3.jpg)

### 不相干的事件中断

渲染步骤是可中断的。在这个场景中， UI 线程的高优先级事件中断了渲染步骤。React 和渲染器是能够打断渲染步骤的，并把它的状态和 UI 线程执行的高优先级事件合并。在 UI 线程渲染步骤是同步执行的。

![Threading model use case four](https://reactnative.dev/docs/assets/Architecture/threading-model/case-4.jpg)

**来自 JavaScript 线程的后台线程批量更新**

在后台线程将更新分派给 UI 线程之前，它会检查是否有新的更新来自 JavaScript。 这样，当渲染器知道新的状态要到来时，它就不会直接渲染旧的状态。

![Threading model use case five](https://reactnative.dev/docs/assets/Architecture/threading-model/case-5.jpg)



### C++ 状态更新

更新来自 UI 线程，并会跳过渲染步骤。更多细节请参考 React Native 渲染器状态更新。

![Threading model use case six](https://reactnative.dev/docs/assets/Architecture/threading-model/case-6.jpg)


