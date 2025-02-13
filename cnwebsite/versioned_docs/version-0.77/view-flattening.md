---
id: view-flattening
title: 视图拍平
---

> This document refers to the architecture of the new renderer, [Fabric](fabric-renderer), that is in active roll-out.

#### 视图拍平（View Flattening）是 React Native 渲染器避免布局嵌套太深的优化手段。

React API 在设计上希望通过组合的方式，实现组件声明和重用，这为更简单的开发提供了一个很好的模型。但是在实现中，API 的这些特性会导致一些 React 元素会嵌套地很深，而其中大部分 React 元素节点只会影响视图布局，并不会在屏幕中渲染任何内容。这就是所谓的**“只参与布局”**类型节点。

从概念上讲，React 元素树的节点数量和屏幕上的视图数量应该是 1:1 的关系。但是，渲染一个很深的“只参与布局”的 React 元素会导致性能变慢。

举个很常见的例子，例子中“只参与布局”视图导致了性能损耗。

想象一下，你要渲染一个标题。你有一个应用，应用中拥有外边距 `ContainerComponent`的容器组件，容器组件的子组件是 `TitleComponent` 标题组件，标题组件包括一个图片和一行文字。React 代码示例如下：

```jsx
function MyComponent() {
  return (
    <View>                          // ReactAppComponent
      <View style={{margin: 10}} /> // ContainerComponent
        <View style={{margin: 10}}> // TitleComponent
          <Image {...} />
          <Text {...}>This is a title</Text>
        </View>
      </View>
    </View>
  );
}
```

React Native 在渲染时，会生成以下三棵树：

![Diagram one](https://reactnative.dev/assets/images/diagram-one-3f2f9d7a2fa9d97b6b86fa3bd9b886d1.png)

注意视图 2 和视图 3 是“只参与布局”的视图，因为它们在屏幕上渲染只是为了提供 10 像素的外边距。

为了提升 React 元素树中“只参与布局”类型的性能，渲染器实现了一种视图拍平的机制来合并或拍平这类节点，减少屏幕中宿主视图的层级深度。该算法考虑到了如下属性，比如  `margin`, `padding`, `backgroundColor`, `opacity`等等。

视图拍平算法是渲染器的对比（diffing）阶段的一部分，这样设计的好处是我们不需要额外的 CPU 耗时，来拍平 React 元素树中“只参与布局”的视图。此外，作为 C++ 核心的一部分，视图拍平算法默认是全平台共用的。

在前面的例子中，视图 2 和视图 3 会作为“对比算法”（diffing algorithm）的一部分被拍平，而它们的样式结果会被合并到视图 1 中。

![Diagram two](https://reactnative.dev/assets/images/diagram-two-b87959980d29e4a303465a3d0ac82c73.png)

虽然，这种优化让渲染器少创建和渲染两个宿主视图，但从用户的角度看屏幕内容没有任何区别。
