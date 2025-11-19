---
id: virtualview
title: VirtualView 🧪
---

import ExperimentalAPIWarning from './\_experimental-api-warning.mdx';

<ExperimentalAPIWarning />

`VirtualView` 是一个核心组件，其行为类似于 [`View`](view)。

当它是 [`ScrollView`](scrollview) 的子组件时，它会获得额外的虚拟化能力，以减少在被滚动视口遮挡时的内存占用。

```tsx
<ScrollView>
  <VirtualView>
    <Text>Hello world!</Text>
  </VirtualView>
</ScrollView>
```

没有父组件 [`ScrollView`](scrollview) 的 `VirtualView` 不具有任何虚拟化能力。

## 虚拟化

当 `VirtualView` 离开 [`ScrollView`](scrollview) 的可见区域时，它会变为隐藏状态。当隐藏时，`VirtualView` 会缓存其最近的布局，并可能卸载其子元素 —— 这个过程称为虚拟化。

当 `VirtualView` 返回到 [`ScrollView`](scrollview) 的可见区域时，它会变为可见状态。当可见时，其子元素*保证*会被渲染。这种保证是通过阻塞主线程来维持的，防止在 `VirtualView` 的子元素可以渲染之前渲染下一帧，从而显示 `VirtualView`。

<img src="/docs/assets/d_virtualview_modes.svg" width="700" alt="VirtualView 模式和阈值图表。" />

:::note
在未来的开发中，隐藏的 `VirtualView` 可能会在 [`<Activity mode="hidden">`](https://react.dev/reference/react/Activity) 中渲染其子元素，以在平衡内存开销的同时尽可能长时间地保留状态。
:::

### 阻塞主线程

这是 React Native 功能集中首次出现渲染 React 组件可能会阻塞主线程的情况。这是由[新架构](/architecture/landing-page)启用的新功能！

阻塞主线程可以通过防止有时在使用类似 [`FlatList`](flatlist) 的组件时出现的空白帧闪烁来提供更好的用户体验。它还可以通过使用主线程优先级来实现更好的性能，这通常也运行在更高性能的核心上。

然而，阻塞主线程也有权衡。如果更新操作（例如挂载 `VirtualView` 的子元素）花费太长时间才能完成，现在可能会丢帧。丢失超过几帧可能会导致更糟糕的用户体验，使应用感觉迟钝和无响应。丢失太多帧可能会导致操作系统显示一个模态框，指示应用无响应，甚至可能终止您的应用！

:::warning
DevTools 目前不支持在主线程上调试 JavaScript。这意味着如果您使用断点来调试从 `onModeChange` 调用的代码（该代码在主线程上执行），您的调试器可能会冻结。

调试 JavaScript 代码的所有其他部分应该可以正常工作。在将 `VirtualView` 发布到 React Native 的稳定频道之前，我们正在努力缩小这一差距。
:::

### 预渲染

`VirtualView` 使您能够在需要之前更早地渲染，从而受益于主线程渲染，同时减轻丢帧的缺点。这称为"预渲染"。

默认情况下，当每个 `VirtualView` 接近 [`ScrollView`](scrollview) 的可见区域时，会预渲染其子元素。当这种情况发生时，其子元素将在后台线程以较低优先级渲染（使用[过渡](https://react.dev/reference/react/startTransition)）。这确保主线程和 React 可以以更高的优先级处理其他关键的用户交互。

:::note
`VirtualView` 的预渲染逻辑目前不可配置。确定此行为的算法正在进行积极的设计迭代，并可能在未来版本中发生变化。
:::

---

## 属性

### `children`

要在此 `VirtualView` 内渲染的内容。

| 类型                     |
| ------------------------ |
| [React 节点](react-node) |

---

### `onModeChange`

当 `VirtualView` 改变其渲染子元素的方式时调用。

如果提供了回调，它可能会根据内部状态变化从不同的线程和优先级调用。这可以通过检查事件上的 `mode` 属性来检测：

- 如果 `mode` 是 [`VirtualViewMode.Visible`](#virtualviewmode)，则回调正在以立即优先级从主线程调用。
- 如果 `mode` 是 [`VirtualViewMode.Prerender`](#virtualviewmode) 或 [`VirtualViewMode.Hidden`](#virtualviewmode)，则回调正在以过渡优先级从后台线程调用。

回调永远不会连续使用相同的 `mode` 值调用。但是，关于事件的顺序几乎没有保证。此外，即使它变为可见，如果子元素已成功预渲染，回调也可能永远不会使用 [`VirtualViewMode.Visible`](#virtualviewmode) 调用。

| 类型                                               |
| -------------------------------------------------- |
| `md ([ModeChangeEvent](#modechangeevent)) => void` |

---

### `nativeID`

用于从原生类定位此视图的标识符。

| 类型   |
| ------ |
| string |

---

### `style`

| 类型                          |
| ----------------------------- |
| [View 样式](view-style-props) |

---

## 类型定义

### `ModeChangeEvent`

提供给 [`onModeChange`](#onmodechange) 的参数。

| 类型   |
| ------ |
| object |

**属性：**

| 名称          | 类型                                | 描述                                                    |
| ------------- | ----------------------------------- | ------------------------------------------------------- |
| mode          | [VirtualViewMode](#virtualviewmode) | `VirtualView` 的新模式。                                |
| target        | element                             | 发出此事件的 `VirtualView`。                            |
| targetRect    | [Rect](rect)                        | `target` 相对于最近的祖先 `ScrollView` 的布局。         |
| thresholdRect | [Rect](rect)                        | 触发此事件的阈值的布局，相对于最近的祖先 `ScrollView`。 |

:::note
例如，如果 `VirtualView` 进入 [`ScrollView`](scrollview) 的可见区域...

- `mode` 将是 [`VirtualViewMode.Visible`](#virtualviewmode)
- `thresholdRect` 将描述最近的祖先 [`ScrollView`](scrollview) 的可见视口
- `targetRect` 将是与 `thresholdRect` 重叠的 `target` 的布局（即，它在 [`ScrollView`](scrollview) 的可见区域内）

:::

### `VirtualViewMode`

`VirtualView` 的可能模式。

| 名称      | 值  | 描述                         |
| --------- | --- | ---------------------------- |
| Visible   | `0` | 目标视图可见。               |
| Prerender | `1` | 目标视图隐藏，但可以预渲染。 |
| Hidden    | `2` | 目标视图隐藏。               |

---

## 静态方法

### `createHiddenVirtualView()`

```tsx
static createHiddenVirtualView(height: number): typeof VirtualView;
```

`VirtualView` 最初将其子元素渲染为可见，即使它最初被祖先 [`ScrollView`](scrollview) 遮挡。这是因为当组件最初渲染时，祖先 [`ScrollView`](scrollview) 的存在 —— 更不用说它的大小和滚动位置 —— 是未知的。

对于高级用例，`createHiddenVirtualView()` 创建一个组件，该组件使用提供的估计布局渲染一个最初隐藏的 `VirtualView`。

```tsx
const HiddenVirtualView = createHiddenVirtualView(100);

<ScrollView>
  <HiddenVirtualView>
    <Text>Hello world!</Text>
  </HiddenVirtualView>
</ScrollView>;
```

**参数：**

| 名称                                                    | 类型   | 描述                                |
| ------------------------------------------------------- | ------ | ----------------------------------- |
| height <div className="label basic required">必需</div> | number | 初始渲染 `VirtualView` 的估计高度。 |
