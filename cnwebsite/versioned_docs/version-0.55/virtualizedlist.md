---
id: version-0.55-virtualizedlist
title: VirtualizedList
original_id: virtualizedlist
---

[`FlatList`](flatlist.md)和[`SectionList`](sectionlist.md)的底层实现。FlatList 和 SectionList 使用起来更方便，同时也有相对更详细的文档。一般来说，仅当想获得比 FlatList 更高的灵活性（比如说在使用 immutable data 而不是 普通数组）的时候，你才应该考虑使用 VirtualizedList。

Vritualization 通过维护一个有限的渲染窗口（其中包含可见的元素），并将渲染窗口之外的元素全部用合适的定长空白空间代替的方式，极大的改善了内存消耗以及在有大量数据情况下的使用性能。这个渲染窗口能响应滚动行为。当一个元素离可视区太远时，它就有一个较低优先级；否则就获得一个较高的优先级。渲染窗口通过这种方式逐步渲染其中的元素（在进行了任何交互之后），以尽量减少出现空白区域的可能性。

注意事项：

* 当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
* 本组件继承自 PureComponent 而非通常的 Component，这意味着如果其 props 在浅比较中是相等的，则不会重新渲染。所以请先检查你的 renderItem 函数所依赖的 props 数据（包括 data 属性以及可能用到的父组件的 state），如果是一个引用类型（Object 或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的 Object 或者数组中），然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下 js 中的基本类型和引用类型。）
* 为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，而我们也在设法持续改进。
* 默认情况下每行都需要提供一个不重复的 key 属性。你也可以提供一个 keyExtractor 函数来生成 key。

### 查看 Props

* [`ScrollView` props...](scrollview.md#props)
* [`renderItem`](virtualizedlist.md#renderitem)
* [`data`](virtualizedlist.md#data)
* [`getItem`](virtualizedlist.md#getitem)
* [`getItemCount`](virtualizedlist.md#getitemcount)
* [`debug`](virtualizedlist.md#debug)
* [`extraData`](virtualizedlist.md#extradata)
* [`getItemLayout`](virtualizedlist.md#getitemlayout)
* [`initialScrollIndex`](virtualizedlist.md#initialscrollindex)
* [`inverted`](virtualizedlist.md#inverted)
* [`CellRendererComponent`](virtualizedlist.md#cellrenderercomponent)
* [`ListEmptyComponent`](virtualizedlist.md#listemptycomponent)
* [`ListFooterComponent`](virtualizedlist.md#listfootercomponent)
* [`ListHeaderComponent`](virtualizedlist.md#listheadercomponent)
* [`onEndReached`](virtualizedlist.md#onendreached)
* [`onLayout`](virtualizedlist.md#onlayout)
* [`onRefresh`](virtualizedlist.md#onrefresh)
* [`onScrollToIndexFailed`](virtualizedlist.md#onscrolltoindexfailed)
* [`onViewableItemsChanged`](virtualizedlist.md#onviewableitemschanged)
* [`refreshing`](virtualizedlist.md#refreshing)
* [`removeClippedSubviews`](virtualizedlist.md#removeclippedsubviews)
* [`renderScrollComponent`](virtualizedlist.md#renderscrollcomponent)
* [`viewabilityConfig`](virtualizedlist.md#viewabilityconfig)
* [`viewabilityConfigCallbackPairs`](virtualizedlist.md#viewabilityconfigcallbackpairs)
* [`horizontal`](virtualizedlist.md#horizontal)
* [`initialNumToRender`](virtualizedlist.md#initialnumtorender)
* [`keyExtractor`](virtualizedlist.md#keyextractor)
* [`maxToRenderPerBatch`](virtualizedlist.md#maxtorenderperbatch)
* [`onEndReachedThreshold`](virtualizedlist.md#onendreachedthreshold)
* [`updateCellsBatchingPeriod`](virtualizedlist.md#updatecellsbatchingperiod)
* [`windowSize`](virtualizedlist.md#windowsize)
* [`disableVirtualization`](virtualizedlist.md#disablevirtualization)
* [`progressViewOffset`](virtualizedlist.md#progressviewoffset)

### 查看方法

* [`scrollToEnd`](virtualizedlist.md#scrolltoend)
* [`scrollToIndex`](virtualizedlist.md#scrolltoindex)
* [`scrollToItem`](virtualizedlist.md#scrolltoitem)
* [`scrollToOffset`](virtualizedlist.md#scrolltooffset)
* [`recordInteraction`](virtualizedlist.md#recordinteraction)
* [`flashScrollIndicators`](virtualizedlist.md#flashscrollindicators)

---

# 文档

## Props

### `renderItem`

```javascript
(info: any) => ?React.Element<any>
```

根据行数据 data 渲染每一行的组件

| 类型     | 必填 |
| -------- | ---- |
| function | 是   |

---

### `data`

默认的获取器函数假设它是一个数组（Array<{key: string}>），但是你能重写 getItem, getItemCount, keyExtractor 来处理任何类型的可索引数据。

| 类型 | 必填 |
| ---- | ---- |
| any  | 是   |

---

### `getItem`

```javascript
(data: any, index: number) => object;
```

通用的获取器，用来从任意类型的数据块中获取一个元素。

| 类型     | 必填 |
| -------- | ---- |
| function | 是   |

---

### `getItemCount`

```javascript
(data: any) => number;
```

用来决定数据块中一共有多少元素。

| 类型     | 必填 |
| -------- | ---- |
| function | 是   |

---

### `debug`

开启额外的日志和视觉覆盖功能，来协助对使用和实现的调试。但是会严重地影响性能。

| 类型    | 必填 |
| ------- | ---- |
| boolean | 否   |

---

### `extraData`

这是一个标记属性，用来告诉列表重新渲染（由于它实现了 PureComponent)。如果有 data 属性之外的数据引用，就把它列在这里，并把它当成不可变的。

| 类型 | 必填 |
| ---- | ---- |
| any  | 否   |

---

### `getItemLayout`

```javascript
(
    data: any,
    index: number,
  ) => {length: number, offset: number, index: number}
```

getItemLayout 是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，getItemLayout 用起来就既高效又简单。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `initialScrollIndex`

设置初始化渲染开始的索引，这样会禁用掉直接滚动到顶部操作优化，第一批渲染的元素从 initialScrollIndex 开始，保证初始化渲染的性能。这个方法要求 getItemLayout 必须实现。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `inverted`

反转滑动方向。（等价于）使用缩放转化的值为-1。

| 类型    | 必填 |
| ------- | ---- |
| boolean | 否   |

---

### `CellRendererComponent`

每个子项渲染使用的元素。可以是一个 react 组件类，或者一个渲染函数。默认使用[`View`](view.md)

| 类型                | 必填 |
| ------------------- | ---- |
| component, function | 否   |

---

### `ListEmptyComponent`

当列表为空时渲染。可以是一个 React 类，或者一个渲染函数，或者一个已渲染的元素。

| 类型                         | 必填 |
| ---------------------------- | ---- |
| component, function, element | 否   |

---

### `ListFooterComponent`

在所有子项最下面渲染的组件（列表底部）。可以是一个 React 类，或者一个渲染函数，或者一个已渲染的元素。

| 类型                         | 必填 |
| ---------------------------- | ---- |
| component, function, element | 否   |

---

### `ListHeaderComponent`

在所有子项最上面渲染的组件（列表头部）.可以是一个 React 类，或者一个渲染函数，或者一个已渲染的元素。

| 类型                         | 必填 |
| ---------------------------- | ---- |
| component, function, element | 否   |

---

### `onLayout`

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onRefresh`

```javascript
() => void
```

如果设置了此选项，则会在列表头部添加一个标准的 RefreshControl 控件，以便实现“下拉刷新”的功能。同时你需要正确设置 refreshing 属性。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onScrollToIndexFailed`

```javascript
(info: {
    index: number,
    highestMeasuredFrameIndex: number,
    averageItemLength: number,
  }) => void
```

用来处理滚动到尚未渲染的索引导致滚动失败时的回调。推荐的做法是自己计算偏移量，然后滚动到相应位置，或者滚动到更远的距离当更多的子元素已经渲染后再进行尝试。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onViewableItemsChanged`

```javascript
(info: {
    viewableItems: array,
    changed: array,
  }) => void
```

当列表中行的可见性发生变化时，就会调用这个函数。可见性设置见 viewabilityConfig。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `refreshing`

当等待数据进行更新时，将这个属性设置为 true

| 类型    | 必填 |
| ------- | ---- |
| boolean | 否   |

---

### `removeClippedSubviews`

一个将“剪裁子视图”(clipped subviews)（指的是那些在父视图之外的视图）从视图层级中删除的本地优化，为的是减轻渲染系统的工作负担。但是这些被剪裁掉的子视图依然保留在内存中，所以它们所占的储存空间没有被释放，内部状态也都保留了下来。

这可能会极大的改善长列表的滑动性能。

> 注意：某些情况下可能有 bug(丢失内容)-自己斟酌

| 类型    | 必填 |
| ------- | ---- |
| boolean | 否   |

---

### `renderScrollComponent`

```javascript
(props: object) => element;
```

渲染一个定制的滚动组件。例如不同风格的 `RefreshControl`。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `viewabilityConfig`

参见 `ViewabilityHelper.js`获取更多的文档

| 类型              | 必填 |
| ----------------- | ---- |
| ViewabilityConfig | 否   |

---

### `viewabilityConfigCallbackPairs`

`viewabilityConfigCallbackPairs`属性对列表，特定的 ViewabilityConfig 配置条件触发时，会调用对应的 onViewableItemsChanged 方法。 详见 ViewabilityHelper.js 中的 flow 类型定义，未来会补充文档。

| 类型                                   | 必填 |
| -------------------------------------- | ---- |
| array of ViewabilityConfigCallbackPair | 否   |

---

### `horizontal`

| 类型    | 必填 |
| ------- | ---- |
| boolean | 否   |

---

### `initialNumToRender`

首批应该渲染的元素数量。这些元素应该能够覆盖住屏幕，但再多就不好了。注意：为了响应“滚动到顶部”这个事件并最优化其性能，这些元素将作为窗口渲染的一部分，永远不会被卸载。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `keyExtractor`

```javascript
(item: object, index: number) => string;
```

此函数用于为给定的 item 生成一个不重复的 key。Key 的作用是使 React 能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取 item.key 作为 key 值。若 item.key 也不存在，则使用数组下标。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `maxToRenderPerBatch`

每批增量渲染可渲染的最大数量。能立即渲染出的元素数量越多，填充速率就越快，但是响应性可能会有一些损失，因为每个被渲染的元素都可能参与或干扰对按钮点击事件或其他事件的响应。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `onEndReached`

```javascript
(info: {distanceFromEnd: number}) => void
```

当列表被滚动到距离内容最底部不足 onEndReachedThreshold 的距离时调用。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onEndReachedThreshold`

决定当距离内容最底部还有多远时触发 onEndReached 回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `updateCellsBatchingPeriod`

具有较低渲染优先级的元素（比如那些离屏幕相当远的元素）的渲染批次之间的时间间隔。与 maxToRenderPerBatch 具有相同的目的，都是为了在渲染速率和响应性之间获得一个平衡。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `windowSize`

设置可视区外最大能被渲染的元素的数量，以可视区的长度为单位。比如说，如果列表占满了整个屏幕，而 windowSize 属性被设置为 21 的话，那渲染的长度为包括当前可见屏幕区域在内，往上 10 个屏幕的长度和往下 10 个屏幕的长度。将 windowSize 设置为一个较小值，能有减小内存消耗并提高性能，但是当你快速滚动列表时，遇到尚未渲染的内容的几率会增大，而这些尚未渲染的内容会暂时性地被空白区块所替代。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `disableVirtualization`

**已过时.** : Virtualization 提供了显著的性能和内存优化，并且完全卸载了位于可视区之外的 react 实例。当且仅当为了调试，你才可以关闭这个特性。

| 类型 | 必填 |
| ---- | ---- |
|      | 否   |

---

### `progressViewOffset`

设置加载指示器的偏移量

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| number | 否   | Android |

## 方法

### `scrollToEnd()`

```javascript
scrollToEnd(([params]: object));
```

---

### `scrollToIndex()`

```javascript
scrollToIndex((params: object));
```

---

### `scrollToItem()`

```javascript
scrollToItem((params: object));
```

---

### `scrollToOffset()`

```javascript
scrollToOffset((params: object));
```

滚动列表到指定的偏移（以像素为单位），等同于 ScrollView 的 scrollTo 方法。

参数`offset`表示滚动的偏移量。当`horizontal`为 true 时，offset 表示水平的偏移量，其他情况下均为垂直的偏移量。

参数`animated`（默认为`true`）控制列表是否在滑动时附带动画。

---

### `recordInteraction()`

```javascript
recordInteraction();
```

---

### `flashScrollIndicators()`

```javascript
flashScrollIndicators();
```
