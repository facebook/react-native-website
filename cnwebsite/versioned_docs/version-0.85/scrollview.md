---
id: scrollview
title: ScrollView
---

一个封装了平台的 ScrollView（滚动视图）的组件，同时还集成了触摸锁定的“响应者”系统。

记住 ScrollView 必须有一个确定的高度才能正常工作，因为它实际上所做的就是将一系列不确定高度的子组件装进一个确定高度的容器（通过滚动操作）。要给 ScrollView 一个确定的高度的话，要么直接给它设置高度（不建议），要么确定所有的父容器都有确定的高度。一般来说我们会给 ScrollView 设置`flex: 1`以使其自动填充父容器的空余空间，但前提条件是所有的父容器本身也设置了 flex 或者指定了高度，否则就会导致无法正常滚动，你可以使用元素查看器来查找具体哪一层高度不正确。

ScrollView 内部的其他响应者尚无法阻止 ScrollView 本身成为响应者。

`ScrollView`和`FlatList`应该如何选择？ScrollView 会简单粗暴地把所有子元素一次性全部渲染出来。其原理浅显易懂，使用上自然也最简单。然而这样简单的渲染逻辑自然带来了性能上的不足。想象一下你有一个特别长的列表需要显示，可能有好几屏的高度。创建和渲染那些屏幕以外的 JS 组件和原生视图，显然对于渲染性能和内存占用都是一种极大的拖累和浪费。

这就是为什么我们还有专门的`FlatList`组件。`FlatList`会惰性渲染子元素，只在它们将要出现在屏幕中时开始渲染。这种惰性渲染逻辑要复杂很多，因而 API 在使用上也更为繁琐。除非你要渲染的数据特别少，否则你都应该尽量使用`FlatList`，哪怕它们用起来更麻烦。

此外`FlatList`还可以方便地渲染行间分隔线，支持多列布局，无限滚动加载等等。

## 示例

```SnackPlayer name=ScrollView%20Example
import React from 'react';
import {StyleSheet, Text, ScrollView, StatusBar} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
  },
  text: {
    fontSize: 42,
    padding: 12,
  },
});

export default App;
```

---

# 文档

## Props

### [View Props](view.md#props)

继承了所有的[View Props](view#props).

---

### `StickyHeaderComponent`

一个 React 组件，用于渲染粘性头部，应与`stickyHeaderIndices`一起使用。如果你的粘性头部使用了自定义变换（例如，当你希望列表具有可动画隐藏的头部时），你可能需要设置此组件。如果未提供组件，则将使用默认的 [`ScrollViewStickyHeader`](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Components/ScrollView/ScrollViewStickyHeader.js) 组件。

| 类型               |
| ------------------ |
| component, element |

---

### `alwaysBounceHorizontal` <div className="label ios">iOS</div>

当此属性为 true 时，水平方向即使内容比滚动视图本身还要小，也可以弹性地拉动一截。当`horizontal={true}`时默认值为 true，否则为 false。

| 类型 | 默认值                                                |
| ---- | ----------------------------------------------------- |
| bool | `true` when `horizontal={true}`<hr/>`false` otherwise |

---

### `alwaysBounceVertical` <div className="label ios">iOS</div>

当此属性为 true 时，垂直方向即使内容比滚动视图本身还要小，也可以弹性地拉动一截。当`horizontal={true}`时默认值为 false，否则为 true。

| 类型 | 默认值                                              |
| ---- | --------------------------------------------------- |
| bool | `false` when `vertical={true}`<hr/>`true` otherwise |

---

### `automaticallyAdjustContentInsets` <div className="label ios">iOS</div>

当滚动视图放在一个导航条或者工具条后面的时候，iOS 系统是否要自动调整内容的范围。默认值为 true。（译注：如果你的 ScrollView 或 FlatList 的头部出现莫名其妙的空白，尝试将此属性置为 false）

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `automaticallyAdjustKeyboardInsets` <div className="label ios">iOS</div>

当键盘尺寸变化时，ScrollView 是否自动调整其 `contentInset` 和 `scrollViewInsets`。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `automaticallyAdjustsScrollIndicatorInsets` <div className="label ios">iOS</div>

控制 iOS 是否自动调整滚动指示器内边距。请参阅 Apple 的[文档](https://developer.apple.com/documentation/uikit/uiscrollview/3198043-automaticallyadjustsscrollindica)。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `bounces` <div className="label ios">iOS</div>

当值为 true 时，如果内容范围比滚动视图本身大，在到达内容末尾的时候，可以弹性地拉动一截。如果为 false，尾部的所有弹性都会被禁用，即使`alwaysBounce`属性为 true。默认值为 true。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `bouncesZoom` <div className="label ios">iOS</div>

当值为 true 时，使用手势缩放内容可以超过 min/max 的限制，然后在手指抬起之后弹回 min/max 的缩放比例。否则的话，缩放不能超过限制。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `canCancelContentTouches` <div className="label ios">iOS</div>

当值为 false 时，一旦有子节点响应触摸操作，即使手指开始移动也不会拖动滚动视图。默认值为 true（在以上情况下可以拖动滚动视图）。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `centerContent` <div className="label ios">iOS</div>

当值为 true 时，如果滚动视图的内容比视图本身小，则会自动把内容居中放置。当内容比滚动视图大的时候，此属性没有作用。默认值为 false。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `contentContainerStyle`

这些样式会应用到一个内层的内容容器上，所有的子视图都会包裹在内容容器内。示例：

```
return (
  <ScrollView contentContainerStyle={styles.contentContainer}>
  </ScrollView>
);
...
const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 20
  }
});
```

| 类型                           |
| ------------------------------ |
| [View Style](view-style-props) |

---

### `contentInset` <div className="label ios">iOS</div>

内容范围相对滚动视图边缘的坐标。默认为`{top: 0, left: 0, bottom: 0, right: 0}`。

| 类型                                                                 | 默认值                                   |
| -------------------------------------------------------------------- | ---------------------------------------- |
| object: `{top: number, left: number, bottom: number, right: number}` | `{top: 0, left: 0, bottom: 0, right: 0}` |

---

### `contentInsetAdjustmentBehavior` <div className="label ios">iOS</div>

本属性用于指定安全区域内边距如何修改滚动视图的内容区域。

| 类型                                                           | 默认值    |
| -------------------------------------------------------------- | --------- |
| enum(`'automatic'`, `'scrollableAxes'`, `'never'`, `'always'`) | `'never'` |

---

### `contentOffset`

用来手动设置初始的滚动坐标。

| 类型  | 默认值         |
| ----- | -------------- |
| Point | `{x: 0, y: 0}` |

---

### `decelerationRate`

一个浮点数，用于决定当用户抬起手指之后，滚动视图减速停下的速度。你也可以设置为`"normal"`或者`"fast"`，分别对应的是 iOS 上的`UIScrollViewDecelerationRateNormal`和 `UIScrollViewDecelerationRateFast`。

- `'normal'`: iOS 上是 0.998，Android 上是 0.985（默认值）
- `'fast'`: iOS 上是 0.99，Android 上是 0.9

| 类型                               | 默认值     |
| ---------------------------------- | ---------- |
| enum(`'fast'`, `'normal'`), number | `'normal'` |

---

### `directionalLockEnabled` <div className="label ios">iOS</div>

当值为真时，滚动视图在拖拽的时候会锁定只有垂直或水平方向可以滚动。默认值为 false

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `disableIntervalMomentum`

当值为 true 时，滚动视图在拖拽的时候会停止在下一个索引（相对于释放时的滚动位置），无论手势有多快。这可以用于分页，当页面小于水平滚动视图的宽度或垂直滚动视图的高度时。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `disableScrollViewPanResponder`

当值为 true 时，滚动视图的默认 JS 手势响应器会被禁用，并且滚动视图内部的触摸操作完全由其子组件控制。这在启用 `snapToInterval` 时特别有用，因为它不遵循典型的触摸模式。不要在常规的滚动视图使用场景中使用此属性，除非你启用了 `snapToInterval`，否则可能会导致意外的触摸操作。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `endFillColor` <div class="label android">Android</div>

有时候滚动视图会占据比实际内容更多的空间。这种情况下可以使用此属性，指定以某种颜色来填充多余的空间，以避免设置背景和创建不必要的绘制开销。一般情况下并不需要这种高级优化技巧。

| 类型            |
| --------------- |
| [color](colors) |

---

### `fadingEdgeLength` <div class="label android">Android</div>

滚动内容的边缘会逐渐淡出。

如果值大于 `0`，则会根据当前的滚动方向和位置设置淡出边缘，指示是否有更多内容可显示。

| 类型   | 默认值 |
| ------ | ------ |
| number | `0`    |

---

### `horizontal`

当此属性为 true 的时候，滚动视图的子视图会在水平方向上排成一行，而不是默认的在垂直方向上排成一列。默认值为 false。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `indicatorStyle` <div className="label ios">iOS</div>

设置滚动条的样式。

- `'default'` 默认值，等同`black`。
- `'black'`，黑色滚动条。
- `'white'`，白色滚动条。

| 类型                                    | 默认值      |
| --------------------------------------- | ----------- |
| enum(`'default'`, `'black'`, `'white'`) | `'default'` |

---

### `invertStickyHeaders`

如果粘性头部应该固定在滚动视图的底部而不是顶部。通常用于反转的滚动视图中。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `keyboardDismissMode`

用户拖拽滚动视图的时候，是否要隐藏软键盘。

_跨平台可用的值_

- `'none'` （默认值），拖拽时不隐藏软键盘。
- `'on-drag'`，当拖拽开始的时候隐藏软键盘。

_仅 iOS 可用的值_

- `'interactive'`，软键盘伴随拖拽操作同步地消失，并且如果往上滑动会恢复键盘。安卓设备上不支持这个选项，会表现的和`none`一样。

| 类型                                                                                                                                                            | 默认值   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| enum(`'none'`, `'on-drag'`) <div className="label android">Android</div><hr />enum(`'none'`, `'on-drag'`, `'interactive'`) <div className="label ios">iOS</div> | `'none'` |

---

### `keyboardShouldPersistTaps`

如果当前界面有软键盘，那么点击 scrollview 后是否收起键盘，取决于本属性的设置。（译注：很多人反应 TextInput 无法自动失去焦点/需要点击多次切换到其他组件等等问题，其关键都是需要将 TextInput 放到 ScrollView 中再设置本属性）

- `'never'` （默认值），点击 TextInput 以外的子组件会使当前的软键盘收起。此时子元素不会收到点击事件。
- `'always'`，键盘不会自动收起，ScrollView 也不会捕捉点击事件，但子组件可以捕获。
- `'handled'`，当点击事件被子组件捕获时，键盘不会自动收起。这样切换 TextInput 时键盘可以保持状态。多数带有 TextInput 的情况下你应该选择此项。
- `false`，已过时，请使用`'never'`代替。
- `true`，已过时，请使用`'always'`代替。

| 类型                                                      | 默认值    |
| --------------------------------------------------------- | --------- |
| enum(`'always'`, `'never'`, `'handled'`, `false`, `true`) | `'never'` |

---

### `maintainVisibleContentPosition`

当设置时，滚动视图将调整滚动位置，以便当前可见的第一个子元素在或超过 `minIndexForVisible` 时不会改变位置。这对于在两个方向上加载内容的列表非常有用，例如聊天线程，其中新消息可能会导致滚动位置跳跃。一个常见的值是 0，但其他值如 1 可以用于跳过加载指示器或其他不应保持位置的内容。

可选的 `autoscrollToTopThreshold` 可以用于在调整后自动将内容滚动到顶部，如果用户在调整之前位于顶部阈值内。这对于聊天应用程序非常有用，其中您希望看到新消息滚动到位，但不会在用户已经向上滚动一段距离并且滚动一堆内容会变得混乱的情况下。

注意事项一: 在启用此功能时重新排序滚动视图中的元素可能会导致跳跃和卡顿。可以修复，但目前没有计划这样做。目前，不要重新排序任何使用此功能的 ScrollViews 或 Lists。

注意事项二: 此功能使用 `contentOffset` 和 `frame.origin` 在原生代码中计算可见性。遮挡、变换和其他复杂性不会被考虑在内，以确定内容是否“可见”。

| 类型                                                                     |
| ------------------------------------------------------------------------ |
| object: `{minIndexForVisible: number, autoscrollToTopThreshold: number}` |

---

### `maximumZoomScale` <div className="label ios">iOS</div>

允许的最大缩放比例。默认值为 1.0。

| 类型   | 默认值 |
| ------ | ------ |
| number | `1.0`  |

---

### `minimumZoomScale` <div className="label ios">iOS</div>

允许的最小缩放比例。默认值为 1.0。

| 类型   | 默认值 |
| ------ | ------ |
| number | `1.0`  |

---

### `nestedScrollEnabled` <div class="label android">Android</div>

在 Android API level 21（5.0）以上启用嵌套滚动。iOS 上默认支持嵌套滚动。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `onContentSizeChange`

此函数会在 ScrollView 内部可滚动内容的视图发生变化时调用。

调用参数为内容视图的宽和高: `(contentWidth, contentHeight)`。

此方法是通过绑定在内容容器上的 onLayout 来实现的。

| 类型     |
| -------- |
| function |

---

### `onMomentumScrollBegin`

滚动动画开始时调用此函数。

| 类型     |
| -------- |
| function |

---

### `onMomentumScrollEnd`

滚动动画结束时调用此函数。

| 类型     |
| -------- |
| function |

---

### `onScroll`

在滚动的过程中，每帧最多调用一次此回调函数。调用的频率可以用`scrollEventThrottle`属性来控制。事件的构型如下（所有值都是数字）：

```js
{
  nativeEvent: {
    contentInset: {bottom, left, right, top},
    contentOffset: {x, y},
    contentSize: {height, width},
    layoutMeasurement: {height, width},
    zoomScale
  }
}
```

| 类型     |
| -------- |
| function |

---

### `onScrollBeginDrag`

当用户开始拖动此视图时调用此函数。

| 类型     |
| -------- |
| function |

---

### `onScrollEndDrag`

当用户停止拖动此视图时调用此函数。

| 类型     |
| -------- |
| function |

---

### `onScrollToTop` <div className="label ios">iOS</div>

当用户点击状态栏后，滚动视图滚动到顶部时调用此函数。

| 类型     |
| -------- |
| function |

---

### `overScrollMode`

覆盖默认的 overScroll 模式

可选的值有：

- `'auto'` - 默认值，允许用户在内容超出视图高度之后可以滚动视图。
- `'always'` - 无论内容尺寸，用户始终可以滚动视图。
- `'never'` - 始终不允许用户滚动视图。

| 类型                                  | 默认值   |
| ------------------------------------- | -------- |
| enum(`'auto'`, `'always'`, `'never'`) | `'auto'` |

---

### `pagingEnabled`

当值为 true 时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上。默认值为 false。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `persistentScrollbar` <div class="label android">Android</div>

当滚动条不使用时，滚动条不会变透明。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `pinchGestureEnabled` <div className="label ios">iOS</div>

设置为 true 时，ScrollView 会允许用户使用双指缩放操作。默认值为 true。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `refreshControl`

指定[RefreshControl](refreshcontrol.md)组件，用于为 ScrollView 提供下拉刷新功能。只能用于垂直视图，即`horizontal`不能为`true`。

| 类型    |
| ------- |
| element |

---

### `removeClippedSubviews`

（实验特性）：当此属性为 true 时，屏幕之外的子视图（子视图的`overflow`样式需要设为`hidden`）会被移除。这个可以提升大列表的滚动性能。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `scrollEnabled`

当值为 false 的时候，内容不能滚动，默认值为 true。

注意即便禁止用户滚动，你也仍然可以调用`scrollTo`来滚动。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `scrollEventThrottle`

限制滚动事件的触发频率，指定为毫秒时间间隔。这在响应滚动时执行昂贵操作时非常有用。值 &le; `16` 将禁用节流，无论设备的刷新率如何。

| 类型   | 默认值 |
| ------ | ------ |
| number | `0`    |

---

### `scrollIndicatorInsets` <div className="label ios">iOS</div>

滚动视图指示器距离视图边缘的距离。通常应设置为与 `contentInset` 相同的值。

| 类型                                                                 | 默认值                                   |
| -------------------------------------------------------------------- | ---------------------------------------- |
| object: `{top: number, left: number, bottom: number, right: number}` | `{top: 0, left: 0, bottom: 0, right: 0}` |

---

### `scrollPerfTag` <div class="label android">Android</div>

用于记录此滚动视图的滚动性能。会强制开启动量事件（见 sendMomentumEvents）。这不会在默认情况下做任何事情，你需要实现一个自定义的 native FpsListener 才能使其有用。

| 类型   |
| ------ |
| string |

---

### `scrollToOverflowEnabled` <div className="label ios">iOS</div>

当值为 true 时，滚动视图可以被编程地滚动超过其内容大小。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `scrollsToTop` <div className="label ios">iOS</div>

当值为 true 时，点击状态栏的时候视图会滚动到顶部。默认值为 true。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `showsHorizontalScrollIndicator`

当此属性为 `true` 的时候，显示一个水平方向的滚动条。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `showsVerticalScrollIndicator`

当此属性为 `true` 的时候，显示一个垂直方向的滚动条。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `snapToAlignment` <div className="label ios">iOS</div>

当设置了 `snapToInterval` 时，`snapToAlignment` 会定义停驻点与滚动视图之间的关系。

可能的值有：

- `'start'` 会将停驻点对齐在左侧（水平）或顶部（垂直）。
- `'center'` 会将停驻点对齐到中间。
- `'end'` 会将停驻点对齐到右侧（水平）或底部（垂直）。

| 类型                                 | 默认值    |
| ------------------------------------ | --------- |
| enum(`'start'`, `'center'`, `'end'`) | `'start'` |

---

### `snapToEnd`

当设置了 `snapToOffsets` 时，默认情况下，列表的末尾被视为一个停驻点。设置 `snapToEnd` 为 `false` 以禁用此行为并允许列表在它的末尾和最后一个 `snapToOffsets` 偏移量之间自由滚动。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `snapToInterval`

当设置时，会让滚动视图停止在 `snapToInterval` 的倍数的位置。这可以在一些子视图比滚动视图本身小的时候用于实现分页显示。需要与 `snapToAlignment` 组合使用。通常与 `decelerationRate="fast"` 一起使用。覆盖较不配置的 `pagingEnabled` 属性。

| 类型   |
| ------ |
| number |

---

### `snapToOffsets`

当设置时，会让滚动视图停止在定义的偏移量处。这可以在一些子视图比滚动视图本身小的时候用于实现分页显示。通常与 `decelerationRate="fast"` 一起使用。覆盖较不配置的 `pagingEnabled` 和 `snapToInterval` 属性。

| 类型               |
| ------------------ |
| 以数字为元素的数组 |

---

### `snapToStart`

当设置了 `snapToOffsets` 时，默认情况下，列表的开始被视为一个停驻点。设置 `snapToStart` 为 `false` 以禁用此行为并允许列表在它的开始和第一个 `snapToOffsets` 偏移量之间自由滚动。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `StickyHeaderComponent`

一个 React 组件，用于渲染粘性头部，应与 `stickyHeaderIndices` 一起使用。如果粘性头部使用自定义变换，例如，当您希望列表具有可动画化和可隐藏的头部时，可能需要设置此组件。如果未提供组件，将使用默认的 [`ScrollViewStickyHeader`](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Components/ScrollView/ScrollViewStickyHeader.js) 组件。

| 类型               |
| ------------------ |
| component, element |

---

### `stickyHeaderHiddenOnScroll`

当设置为 `true` 时，粘性头部将在向下滚动列表时隐藏，当向上滚动时，它将固定在列表顶部。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `stickyHeaderIndices`

一个子视图下标的数组，用于决定哪些成员会在滚动之后固定在屏幕顶端。举个例子，传递`stickyHeaderIndices={[0]}`会让第一个成员固定在滚动视图顶端。这个属性不能和`horizontal={true}`一起使用。

| 类型               |
| ------------------ |
| 以数字为元素的数组 |

---

### `zoomScale` <div className="label ios">iOS</div>

当前滚动视图内容的缩放比例。

| 类型   | 默认值 |
| ------ | ------ |
| number | `1.0`  |

---

## 方法

### `flashScrollIndicators()`

```tsx
flashScrollIndicators();
```

短暂地显示滚动指示器。

---

### `scrollTo()`

```tsx
scrollTo(
  options?: {x?: number, y?: number, animated?: boolean} | number,
  deprecatedX?: number,
  deprecatedAnimated?: boolean,
);
```

滚动到指定的 x, y 偏移处。第三个参数为是否启用平滑滚动动画。

示例：

`scrollTo({x: 0, y: 0, animated: true})`

---

### `scrollToEnd()`

```tsx
scrollToEnd(options?: {animated?: boolean});
```

滚动到视图底部（水平方向的视图则滚动到最右边）。

加上动画参数`scrollToEnd({animated: true})`则启用平滑滚动动画，或是调用`scrollToEnd({animated: false})`来立即跳转。如果不使用参数，则`animated`选项默认启用。

---
