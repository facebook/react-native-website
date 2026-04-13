---
id: virtualizedlist
title: VirtualizedList
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

[`FlatList`](flatlist.md)和[`SectionList`](sectionlist.md)的底层实现，这两个组件使用起来更方便，同时也有相对更详细的文档。一般来说，仅当你需要比 [`FlatList`](flatlist.md) 更高的灵活性（比如说在使用 immutable data 而不是普通数组）的时候，你才应该考虑使用 VirtualizedList。

虚拟化通过维护一个有限的渲染窗口（其中包含可见的元素），并将渲染窗口之外的元素全部用合适的定长空白空间代替的方式，极大的改善了内存消耗以及在有大量数据情况下的使用性能。这个渲染窗口能响应滚动行为。当一个元素离可视区太远时，它就有一个较低优先级；否则就获得一个较高的优先级。渲染窗口通过这种方式逐步渲染其中的元素（在进行了任何交互之后），以尽量减少出现空白区域的可能性。

## 示例

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=VirtualizedListExample&ext=js
import React from 'react';
import {View, VirtualizedList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const getItem = (_data, index) => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = _data => 50;

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=VirtualizedListExample&ext=tsx
import React from 'react';
import {View, VirtualizedList, StyleSheet, Text, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

type ItemData = {
  id: string;
  title: string;
};

const getItem = (_data: unknown, index: number): ItemData => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = (_data: unknown) => 50;

type ItemProps = {
  title: string;
};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <VirtualizedList
        initialNumToRender={4}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
</Tabs>

---

注意事项：

- 当内容滚动出渲染窗口外时，内部状态不会被保留。请确保你的所有数据都在项目数据或外部存储（如 Flux、Redux 或 Relay）中捕获。
- 这是一个 `PureComponent`，这意味着如果 `props` 在浅比较中相等，它就不会重新渲染。请确保你的 `renderItem` 函数依赖的所有内容都作为在更新后不为 `===` 的 prop（例如 `extraData`）传递，否则你的 UI 可能不会在更改时更新。这包括 `data` prop 和父组件状态。
- 为了限制内存并实现流畅滚动，内容会在屏幕外异步渲染。这意味着可能滚动得比填充速度更快，并短暂地看到空白内容。这是一个可以调整以适应每个应用需求的权衡，我们正在幕后努力改进它。
- 默认情况下，列表会在每个项目上查找 `key` prop 并将其用作 React key。或者，你可以提供一个自定义的 `keyExtractor` prop。

---

# 文档

## Props

### [ScrollView Props](scrollview.md#props)

继承 [ScrollView Props](scrollview.md#props)。

---

### <div class="label required basic">Required</div> **`renderItem`**

```tsx
(info: any) => ?React.Element<any>
```

根据行数据 data 渲染每一行的组件

| 类型     | 必需 |
| -------- | ---- |
| function | 是   |

---

### `data`

传递给 `getItem` 和 `getItemCount` 来检索项目的不透明数据类型。

| 类型 |
| ---- |
| any  |

---

### <div class="label required basic">Required</div> **`getItem`**

```tsx
(data: any, index: number) => any;
```

通用的获取器，用来从任意类型的数据块中获取一个元素。

| 类型     |
| -------- |
| function |

---

### <div class="label required basic">Required</div> **`getItemCount`**

```tsx
(data: any) => number;
```

确定数据块中有多少项目。

| 类型     |
| -------- |
| function |

---

### `debug`

开启额外的日志和视觉覆盖功能，来协助对使用和实现的调试。但是会严重地影响性能。

| 类型    | 必需 |
| ------- | ---- |
| boolean | 否   |

---

### `extraData`

这是一个标记属性，用来告诉列表重新渲染（由于它实现了 PureComponent)。如果有 data 属性之外的数据引用，就把它列在这里，并把它当成不可变的。

| 类型 | 必需 |
| ---- | ---- |
| any  | 否   |

---

### `getItemLayout`

```tsx
(
    data: any,
    index: number,
  ) => {length: number, offset: number, index: number}
```

getItemLayout 是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，getItemLayout 用起来就既高效又简单。

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `initialScrollIndex`

设置初始化渲染开始的索引，这样会禁用掉直接滚动到顶部操作优化，第一批渲染的元素从 initialScrollIndex 开始，保证初始化渲染的性能。这个方法要求 getItemLayout 必须实现。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `inverted`

反转滑动方向。（等价于）使用缩放转化的值为-1。

| 类型    | 必需 |
| ------- | ---- |
| boolean | 否   |

---

### `CellRendererComponent`

CellRendererComponent 允许自定义由 `renderItem`/`ListItemComponent` 渲染的单元格在放置到底层 ScrollView 中时的包装方式。该组件必须接受事件处理程序，这些处理程序会通知 VirtualizedList 单元格内的更改。

| 类型                                     |
| ---------------------------------------- |
| `React.ComponentType<CellRendererProps>` |

---

### `ItemSeparatorComponent`

在每个项目之间渲染，但不在顶部或底部。默认情况下，会提供 `highlighted` 和 `leadingItem` props。`renderItem` 提供 `separators.highlight`/`unhighlight` 来更新 `highlighted` prop，但你也可以通过 `separators.updateProps` 添加自定义 props。可以是一个 React 组件（例如 `SomeComponent`），或者一个 React 元素（例如 `<SomeComponent />`）。

| 类型                         |
| ---------------------------- |
| component, function, element |

---

### `ListEmptyComponent`

当列表为空时渲染。可以是一个 React 类，或者一个渲染函数，或者一个已渲染的元素。

| 类型                         | 必需 |
| ---------------------------- | ---- |
| component, function, element | 否   |

---

### `ListItemComponent`

每个数据项都使用此元素渲染。可以是一个 React 组件类，或者一个渲染函数。

| 类型                |
| ------------------- |
| component, function |

---

### `ListFooterComponent`

在所有子项最下面渲染的组件（列表底部）。可以是一个 React 类，或者一个渲染函数，或者一个已渲染的元素。

| 类型                         | 必需 |
| ---------------------------- | ---- |
| component, function, element | 否   |

---

### `ListFooterComponentStyle`

`ListFooterComponent` 内部 View 的样式。

| 类型          | 必需 |
| ------------- | ---- |
| ViewStyleProp | 否   |

---

### `ListHeaderComponent`

在所有项目最上面渲染的组件（列表头部）。可以是一个 React 组件（例如 `SomeComponent`），或者一个 React 元素（例如 `<SomeComponent />`）。

| 类型               |
| ------------------ |
| component, element |

---

### `ListHeaderComponentStyle`

`ListHeaderComponent` 内部 View 的样式。

| 类型                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `onRefresh`

```tsx
() => void;
```

如果设置了此选项，则会在列表头部添加一个标准的 RefreshControl 控件，以便实现“下拉刷新”的功能。同时你需要正确设置 refreshing 属性。

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `onScrollToIndexFailed`

```tsx
(info: {
  index: number,
  highestMeasuredFrameIndex: number,
  averageItemLength: number,
}) => void;
```

用来处理滚动到尚未渲染的索引导致滚动失败时的回调。推荐的做法是自己计算偏移量，然后滚动到相应位置，或者滚动到更远的距离当更多的子元素已经渲染后再进行尝试。

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `onStartReached`

当滚动位置距离列表的逻辑起始点在`onStartReachedThreshold`范围内时调用一次。

| 类型                                          |
| --------------------------------------------- |
| `(info: {distanceFromStart: number}) => void` |

---

### `onStartReachedThreshold`

从内容开始到列表前沿（以可见长度单位计算）必须有多远，才能触发`onStartReached`回调。因此，当内容的起始点位于列表可见长度的一半之内时，值为 0.5 将会触发`onStartReached`。

| 类型   | 默认值 |
| ------ | ------ |
| number | `2`    |

---

### `onViewableItemsChanged`

当行的可见性发生变化时调用，根据`viewabilityConfig`属性定义。

| 类型                                                                                                  |
| ----------------------------------------------------------------------------------------------------- |
| `md (callback: {changed: [ViewToken](viewtoken)[], viewableItems: [ViewToken](viewtoken)[]}) => void` |

---

### `refreshing`

当等待数据进行更新时，将这个属性设置为 true

| 类型    | 必需 |
| ------- | ---- |
| boolean | 否   |

---

### `refreshControl`

自定义的下拉刷新组件。设置后将覆盖默认的内置`<RefreshControl>`组件，`onRefresh`和`refreshing`属性也将一并忽略。只对纵向布局的`VirtualizedList`有效。

| 类型    | 必需 |
| ------- | ---- |
| element | 否   |

---

### `removeClippedSubviews`

一个将“剪裁子视图”(clipped subviews)（指的是那些在父视图之外的视图）从视图层级中删除的本地优化，为的是减轻渲染系统的工作负担。但是这些被剪裁掉的子视图依然保留在内存中，所以它们所占的储存空间没有被释放，内部状态也都保留了下来。

这可能会极大的改善长列表的滑动性能。

> 注意：某些情况下可能有 bug(丢失内容)-自己斟酌

| 类型    | 必需 |
| ------- | ---- |
| boolean | 否   |

---

### `renderScrollComponent`

```tsx
(props: object) => element;
```

渲染一个定制的滚动组件。例如不同风格的 `RefreshControl`。

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `viewabilityConfig`

参见 `ViewabilityHelper.js`获取更多的文档

| 类型              | 必需 |
| ----------------- | ---- |
| ViewabilityConfig | 否   |

---

### `viewabilityConfigCallbackPairs`

`viewabilityConfigCallbackPairs`属性对列表，特定的 ViewabilityConfig 配置条件触发时，会调用对应的 onViewableItemsChanged 方法。 详见 ViewabilityHelper.js 中的 flow 类型定义，未来会补充文档。

| 类型                                   | 必需 |
| -------------------------------------- | ---- |
| array of ViewabilityConfigCallbackPair | 否   |

---

### `horizontal`

| 类型    | 必需 |
| ------- | ---- |
| boolean | 否   |

---

### `initialNumToRender`

首批应该渲染的元素数量。这些元素应该能够覆盖住屏幕，但再多就不好了。注意：为了响应“滚动到顶部”这个事件并最优化其性能，这些元素将作为窗口渲染的一部分，永远不会被卸载。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `keyExtractor`

```tsx
(item: object, index: number) => string;
```

此函数用于为给定的 item 生成一个不重复的 key。Key 的作用是使 React 能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取 item.key 作为 key 值。若 item.key 也不存在，则使用数组下标。

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `maxToRenderPerBatch`

每批增量渲染可渲染的最大数量。能立即渲染出的元素数量越多，填充速率就越快，但是响应性可能会有一些损失，因为每个被渲染的元素都可能参与或干扰对按钮点击事件或其他事件的响应。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `onEndReached`

当滚动位置距离列表逻辑末尾的`onEndReachedThreshold`之内时，调用一次。

| 类型                                        |
| ------------------------------------------- |
| `(info: {distanceFromEnd: number}) => void` |

---

### `onEndReachedThreshold`

决定当距离内容最底部还有多远时触发 onEndReached 回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `updateCellsBatchingPeriod`

具有较低渲染优先级的元素（比如那些离屏幕相当远的元素）的渲染批次之间的时间间隔。与 maxToRenderPerBatch 具有相同的目的，都是为了在渲染速率和响应性之间获得一个平衡。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `windowSize`

设置可视区外最大能被渲染的元素的数量，以可视区的长度为单位。比如说，如果列表占满了整个屏幕，而 windowSize 属性被设置为 21 的话，那渲染的长度为包括当前可见屏幕区域在内，往上 10 个屏幕的长度和往下 10 个屏幕的长度。将 windowSize 设置为一个较小值，能有减小内存消耗并提高性能，但是当你快速滚动列表时，遇到尚未渲染的内容的几率会增大，而这些尚未渲染的内容会暂时性地被空白区块所替代。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### 🗑️ `disableVirtualization`

**已过时** : Virtualization 提供了显著的性能和内存优化，并且完全卸载了位于可视区之外的 react 实例。当且仅当为了调试，你才可以关闭这个特性。

| 类型 | 必需 |
| ---- | ---- |
|      | 否   |

---

### `persistentScrollbar`

| 类型 | Required |
| ---- | -------- |
| bool | No       |

---

### `progressViewOffset`

设置加载指示器的偏移量

| 类型   | 必需 | 平台    |
| ------ | ---- | ------- |
| number | 否   | Android |

## 方法

### `scrollToEnd()`

```tsx
scrollToEnd(([params]: object));
```

Valid `params` consist of:

- 'animated' (boolean). Optional default is true.

---

### `scrollToIndex()`

```tsx
scrollToIndex((params: object));
```

Valid `params` consist of:

- 'animated' (boolean). Optional.
- 'index' (number). Required.
- 'viewOffset' (number). Optional.
- 'viewPosition' (number). Optional.

---

### `scrollToItem()`

```tsx
scrollToItem((params: object));
```

Valid `params` consist of:

- 'animated' (boolean). Optional.
- 'item' (Item). Required.
- 'viewPosition' (number). Optional.

---

### `scrollToOffset()`

```tsx
scrollToOffset((params: object));
```

滚动列表到指定的偏移（以像素为单位），等同于 ScrollView 的 scrollTo 方法。

参数`offset`表示滚动的偏移量。当`horizontal`为 true 时，offset 表示水平的偏移量，其他情况下均为垂直的偏移量。

参数`animated`（默认为`true`）控制列表是否在滑动时附带动画。

---

### `recordInteraction()`

```tsx
recordInteraction();
```

---

### `flashScrollIndicators()`

```tsx
flashScrollIndicators();
```

---

### `getScrollResponder()`

```tsx
getScrollResponder () => ?ScrollResponderType;
```

Provides a handle to the underlying scroll responder. Note that `this._scrollRef` might not be a `ScrollView`, so we need to check that it responds to `getScrollResponder` before calling it.

---

### `getScrollableNode()`

```tsx
getScrollableNode () => ?number;
```

---

### `getScrollRef()`

```tsx
getScrollRef () => | ?React.ElementRef<typeof ScrollView>
    | ?React.ElementRef<typeof View>;
```

---

### `setNativeProps()`

```tsx
setNativeProps((props: Object));
```

---

### `getChildContext()`

```tsx
getChildContext () => Object;
```

The `Object` returned consist of:

- 'virtualizedList' (Object). This object consist of the following
  - getScrollMetrics' (Function). Returns an object with following properties: `{ contentLength: number, dOffset: number, dt: number, offset: number, timestamp: number, velocity: number, visibleLength: number }`.
  - 'horizontal' (boolean) - Optional.
  - 'getOutermostParentListRef' (Function).
  - 'getNestedChildState' (Function) - Returns ChildListState .
  - 'registerAsNestedChild' (Function). This accept an object with following properties `{ cellKey: string, key: string, ref: VirtualizedList, parentDebugInfo: ListDebugInfo }`. It returns a ChildListState
  - 'unregisterAsNestedChild' (Function). This takes an object with following properties, `{ key: string, state: ChildListState }`
  - 'debugInfo' (ListDebugInfo).

---

### `hasMore()`

```tsx
hasMore () => boolean;
```
