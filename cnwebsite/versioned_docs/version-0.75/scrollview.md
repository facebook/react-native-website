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

```SnackPlayer name=ScrollView
import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: 'pink',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});

export default App;
```

---

# 文档

## Props

### [View Props](view.md#props)

继承了所有的[View Props](view.md#props).

---

### `alwaysBounceHorizontal` <div class="label ios">iOS</div>

当此属性为 true 时，水平方向即使内容比滚动视图本身还要小，也可以弹性地拉动一截。当`horizontal={true}`时默认值为 true，否则为 false。

| Type | Default                                               |
| ---- | ----------------------------------------------------- |
| bool | `true` when `horizontal={true}`<hr/>`false` otherwise |

---

### `alwaysBounceVertical` <div class="label ios">iOS</div>

当此属性为 true 时，垂直方向即使内容比滚动视图本身还要小，也可以弹性地拉动一截。当`horizontal={true}`时默认值为 false，否则为 true。

| Type | Default                                             |
| ---- | --------------------------------------------------- |
| bool | `false` when `vertical={true}`<hr/>`true` otherwise |

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

| 类型                                 | 必需 |
| ------------------------------------ | ---- |
| StyleSheetPropType(View Style props) | 否   |

---

### `disableScrollViewPanResponder`

When true, the default JS pan responder on the ScrollView is disabled, and full control over touches inside the ScrollView is left to its child components. This is particularly useful if `snapToInterval` is enabled, since it does not follow typical touch patterns. Do not use this on regular ScrollView use cases without `snapToInterval` as it may cause unexpected touches to occur while scrolling. The default value is false.

| 类型 | Required |
| ---- | -------- |
| bool | No       |

---

### `endFillColor` <div class="label android">Android</div>

有时候滚动视图会占据比实际内容更多的空间。这种情况下可以使用此属性，指定以某种颜色来填充多余的空间，以避免设置背景和创建不必要的绘制开销。一般情况下并不需要这种高级优化技巧。

| 类型            |
| --------------- |
| [color](colors) |

---

### `fadingEdgeLength` <div class="label android">Android</div>

Fades out the edges of the the scroll content.

If the value is greater than `0`, the fading edges will be set accordingly to the current scroll direction and position, indicating if there is more content to show.

| Type   | Default |
| ------ | ------- |
| number | `0`     |

---

### `keyboardDismissMode`

用户拖拽滚动视图的时候，是否要隐藏软键盘。

_跨平台可用的值_

- `'none'` （默认值），拖拽时不隐藏软键盘。
- `'on-drag'`，当拖拽开始的时候隐藏软键盘。

_仅 iOS 可用的值_

- `'interactive'`，软键盘伴随拖拽操作同步地消失，并且如果往上滑动会恢复键盘。安卓设备上不支持这个选项，会表现的和`none`一样。

| 类型                                   | 必需 |
| -------------------------------------- | ---- |
| enum('none', 'on-drag', 'interactive') | 否   |

---

### `keyboardShouldPersistTaps`

如果当前界面有软键盘，那么点击 scrollview 后是否收起键盘，取决于本属性的设置。（译注：很多人反应 TextInput 无法自动失去焦点/需要点击多次切换到其他组件等等问题，其关键都是需要将 TextInput 放到 ScrollView 中再设置本属性）

- `'never'` （默认值），点击 TextInput 以外的子组件会使当前的软键盘收起。此时子元素不会收到点击事件。
- `'always'`，键盘不会自动收起，ScrollView 也不会捕捉点击事件，但子组件可以捕获。
- `'handled'`，当点击事件被子组件捕获时，键盘不会自动收起。这样切换 TextInput 时键盘可以保持状态。多数带有 TextInput 的情况下你应该选择此项。
- `false`，已过时，请使用'never'代替。
- `true`，已过时，请使用'always'代替。

| 类型                                            | 必需 |
| ----------------------------------------------- | ---- |
| enum('always', 'never', 'handled', false, true) | 否   |

---

### `maintainVisibleContentPosition` <div class="label ios">iOS</div>

When set, the scroll view will adjust the scroll position so that the first child that is currently visible and at or beyond `minIndexForVisible` will not change position. This is useful for lists that are loading content in both directions, e.g. a chat thread, where new messages coming in might otherwise cause the scroll position to jump. A value of 0 is common, but other values such as 1 can be used to skip loading spinners or other content that should not maintain position.

The optional `autoscrollToTopThreshold` can be used to make the content automatically scroll to the top after making the adjustment if the user was within the threshold of the top before the adjustment was made. This is also useful for chat-like applications where you want to see new messages scroll into place, but not if the user has scrolled up a ways and it would be disruptive to scroll a bunch.

Caveat 1: Reordering elements in the scrollview with this enabled will probably cause jumpiness and jank. It can be fixed, but there are currently no plans to do so. For now, don't re-order the content of any ScrollViews or Lists that use this feature.

Caveat 2: This uses `contentOffset` and `frame.origin` in native code to compute visibility. Occlusion, transforms, and other complexity won't be taken into account as to whether content is "visible" or not.

| Type                                                                       |
| -------------------------------------------------------------------------- |
| object: `{ minIndexForVisible: number, autoscrollToTopThreshold: number }` |

---

### `maximumZoomScale` <div class="label ios">iOS</div>

允许的最大缩放比例。默认值为 1.0。

| Type   | Default |
| ------ | ------- |
| number | `1.0`   |

---

### `minimumZoomScale` <div class="label ios">iOS</div>

允许的最小缩放比例。默认值为 1.0。

| Type   | Default |
| ------ | ------- |
| number | `1.0`   |

---

### `nestedScrollEnabled` <div class="label android">Android</div>

在 Android API level 21（5.0）以上启用嵌套滚动。iOS 上默认支持嵌套滚动。

| Type | Default |
| ---- | ------- |
| bool | `true`  |

---

### `onContentSizeChange`

此函数会在 ScrollView 内部可滚动内容的视图发生变化时调用。

调用参数为内容视图的宽和高: `(contentWidth, contentHeight)`。

此方法是通过绑定在内容容器上的 onLayout 来实现的。

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `onMomentumScrollBegin`

滚动动画开始时调用此函数。

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `onMomentumScrollEnd`

滚动动画结束时调用此函数。

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `onScroll`

在滚动的过程中，每帧最多调用一次此回调函数。调用的频率可以用`scrollEventThrottle`属性来控制。The event has the following shape (all values are numbers):

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

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `onScrollBeginDrag`

当用户开始拖动此视图时调用此函数。

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `onScrollEndDrag`

当用户停止拖动此视图时调用此函数。

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `onScrollToTop` <div class="label ios">iOS</div>

Fires when the scroll view scrolls to top after the status bar has been tapped.

| Type     |
| -------- |
| function |

---

### `overScrollMode`

覆盖默认的 overScroll 模式

可选的值有：

- `'auto'` - 默认值，允许用户在内容超出视图高度之后可以滚动视图。
- `'always'` - 无论内容尺寸，用户始终可以滚动视图。
- `'never'` - 始终不允许用户滚动视图。

| 类型                            | 必需 | 平台    |
| ------------------------------- | ---- | ------- |
| enum('auto', 'always', 'never') | 否   | Android |

---

### `pagingEnabled`

当值为 true 时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上。默认值为 false。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `refreshControl`

指定[RefreshControl](refreshcontrol.md)组件，用于为 ScrollView 提供下拉刷新功能。只能用于垂直视图，即`horizontal`不能为`true`。

| 类型    | 必需 |
| ------- | ---- |
| element | 否   |

---

### `removeClippedSubviews`

（实验特性）：当此属性为 true 时，屏幕之外的子视图（子视图的`overflow`样式需要设为`hidden`）会被移除。这个可以提升大列表的滚动性能。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `scrollEnabled`

当值为 false 的时候，内容不能滚动，默认值为 true。

注意即便禁止用户滚动，你也仍然可以调用`scrollTo`来滚动。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `showsHorizontalScrollIndicator`

当此属性为 true 的时候，显示一个水平方向的滚动条。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `showsVerticalScrollIndicator`

当此属性为 true 的时候，显示一个垂直方向的滚动条。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `stickyHeaderHiddenOnScroll`

When set to `true`, sticky header will be hidden when scrolling down the list, and it will dock at the top of the list when scrolling up.

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `stickyHeaderIndices`

一个子视图下标的数组，用于决定哪些成员会在滚动之后固定在屏幕顶端。举个例子，传递`stickyHeaderIndices={[0]}`会让第一个成员固定在滚动视图顶端。这个属性不能和`horizontal={true}`一起使用。

| 类型            | 必需 |
| --------------- | ---- |
| array of number | 否   |

---

### `scrollPerfTag`

Tag used to log scroll performance on this scroll view. Will force momentum events to be turned on (see sendMomentumEvents). This doesn't do anything out of the box and you need to implement a custom native FpsListener for it to be useful.

| 类型   | 必需 | 平台    |
| ------ | ---- | ------- |
| string | 否   | Android |

---

### `horizontal`

当此属性为 true 的时候，所有的子视图会在水平方向上排成一行，而不是默认的在垂直方向上排成一列。默认值为 false。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `automaticallyAdjustContentInsets`

当滚动视图放在一个导航条或者工具条后面的时候，iOS 系统是否要自动调整内容的范围。默认值为 true。（译注：如果你的 ScrollView 或 FlatList 的头部出现莫名其妙的空白，尝试将此属性置为 false）

| 类型 | 必需 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `bounces`

当值为 true 时，如果内容范围比滚动视图本身大，在到达内容末尾的时候，可以弹性地拉动一截。如果为 false，尾部的所有弹性都会被禁用，即使`alwaysBounce`属性为 true。默认值为 true。

| 类型 | 必需 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `bouncesZoom`

当值为 true 时，使用手势缩放内容可以超过 min/max 的限制，然后在手指抬起之后弹回 min/max 的缩放比例。否则的话，缩放不能超过限制。

| 类型 | 必需 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `canCancelContentTouches`

当值为 false 时，一旦有子节点响应触摸操作，即使手指开始移动也不会拖动滚动视图。默认值为 true（在以上情况下可以拖动滚动视图）。

| 类型 | 必需 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `centerContent`

当值为 true 时，如果滚动视图的内容比视图本身小，则会自动把内容居中放置。当内容比滚动视图大的时候，此属性没有作用。默认值为 false。

| 类型 | 必需 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `contentInset`

内容范围相对滚动视图边缘的坐标。默认为`{top: 0, left: 0, bottom: 0, right: 0}`。

| 类型                                                                 | 必需 | 平台 |
| -------------------------------------------------------------------- | ---- | ---- |
| object: `{top: number, left: number, bottom: number, right: number}` | 否   | iOS  |

---

### `contentInsetAdjustmentBehavior`

This property specifies how the safe area insets are used to modify the content area of the scroll view. The default value of this property is "never". Available on iOS 11 and later.

| 类型                                                   | 必需 | 平台 |
| ------------------------------------------------------ | ---- | ---- |
| enum('automatic', 'scrollableAxes', 'never', 'always') | 否   | iOS  |

---

### `contentOffset`

用来手动设置初始的滚动坐标。默认值为`{x: 0, y: 0}`。

| 类型          | 必需 | 平台 |
| ------------- | ---- | ---- |
| PointPropType | 否   | iOS  |

---

### `decelerationRate`

一个浮点数，用于决定当用户抬起手指之后，滚动视图减速停下的速度。你也可以设置为`"normal"`或者`"fast"`，分别对应的是 iOS 上的`UIScrollViewDecelerationRateNormal`和 `UIScrollViewDecelerationRateFast`。

- `'normal'`: iOS 上是 0.998，Android 上是 0.985（默认值）
- `'fast'`: 0.99

| 类型                            | 必需 |
| ------------------------------- | ---- |
| enum('fast', 'normal'), ,number | 否   |

---

### `directionalLockEnabled`

当值为真时，滚动视图在拖拽的时候会锁定只有垂直或水平方向可以滚动。默认值为 false

| 类型 | 必需 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `indicatorStyle` <div class="label ios">iOS</div>

设置滚动条的样式。

- `'default'` 默认值，等同`black`。
- `'black'`，黑色滚动条。
- `'white'`，白色滚动条。

| 类型                                    | 默认值      |
| --------------------------------------- | ----------- |
| enum(`'default'`, `'black'`, `'white'`) | `'default'` |

---

### `pinchGestureEnabled`

设置为 true 时，ScrollView 会允许用户使用双指缩放操作。默认值为 true。

| 类型 | 必需 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `scrollEventThrottle`

这个属性控制在滚动过程中，scroll 事件被调用的频率（单位是 ms，事件触发的间隔时间）。更小的间隔时间能够更及时的跟踪滚动位置，不过可能会带来性能问题，因为更多的信息会通过 bridge 传递。由于 JS 事件循环需要和屏幕刷新率同步，因此设置为 1-16 之间的数值不太可能有实质区别（一般屏幕刷新率为 60 帧，即每帧间隔不低于 16 ms）。默认值为 0，意味着每次视图被滚动，scroll 事件都会被调用。

| 类型   | 必需 | 平台 |
| ------ | ---- | ---- |
| number | 否   | iOS  |

---

### `scrollIndicatorInsets`

决定滚动条距离视图边缘的坐标。这个值应该和`contentInset`一样。默认值为`{0, 0, 0, 0}`。

| 类型                                                                 | 必需 | 平台 |
| -------------------------------------------------------------------- | ---- | ---- |
| object: `{top: number, left: number, bottom: number, right: number}` | 否   | iOS  |

---

### `scrollsToTop`

当此值为 true 时，点击状态栏的时候视图会滚动到顶部。默认值为 true。

| 类型 | 必需 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `snapToAlignment`

当设置了`snapToInterval`，`snapToAlignment`会定义停驻点与滚动视图之间的关系。

- `'start'` (默认) 会将停驻点对齐在左侧（水平）或顶部（垂直）
- `'center'` 会将停驻点对齐到中间
- `'end'` 会将停驻点对齐到右侧（水平）或底部（垂直）

| 类型                           | 必需 |
| ------------------------------ | ---- |
| enum('start', 'center', 'end') | 否   |

---

### `snapToInterval`

当设置了此属性时，会让滚动视图滚动停止后，停止在`snapToInterval`的倍数的位置。这可以在一些子视图比滚动视图本身小的时候用于实现分页显示。需要与`snapToAlignment`组合使用。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `snapToOffsets`

When set, causes the scroll view to stop at the defined offsets. This can be used for paginating through variously sized children that have lengths smaller than the scroll view. Typically used in combination with `decelerationRate="fast"`. Overrides less configurable `pagingEnabled` and `snapToInterval` props.

| 类型               | 必需 |
| ------------------ | ---- |
| 以数字为元素的数组 | 否   |

---

### `snapToStart`

Use in conjuction with `snapToOffsets`. By default, the beginning of the list counts as a snap offset. Set `snapToStart` to false to disable this behavior and allow the list to scroll freely between its start and the first `snapToOffsets` offset. The default value is true.

| 类型    | 必需 |
| ------- | ---- |
| boolean | 否   |

---

### `snapToEnd`

Use in conjuction with `snapToOffsets`. By default, the end of the list counts as a snap offset. Set `snapToEnd` to false to disable this behavior and allow the list to scroll freely between its end and the last `snapToOffsets` offset. The default value is true.

| 类型    | 必需 |
| ------- | ---- |
| boolean | 否   |

---

### `zoomScale`

滚动视图内容当前的缩放比例。默认值为 1.0。

| 类型   | 必需 | 平台 |
| ------ | ---- | ---- |
| number | 否   | iOS  |

---

## 方法

### `scrollTo()`

```tsx
scrollTo(
  options?: {x?: number, y?: number, animated?: boolean} | number,
  deprecatedX?: number,
  deprecatedAnimated?: boolean,
);
```

滚动到指定的 x, y 偏移处。第三个参数为是否启用平滑滚动动画。还有一个 duration 参数则是仅限 android 可以使用的滚动持续时间。

示例：

`scrollTo({x: 0, y: 0, animated: true})`

指定滚动持续时间的示例(仅限 Android):

`scrollTo({x: 0, y: 0, duration: 500})`

---

### `scrollToEnd()`

```jsx
scrollToEnd(([options]: {animated: boolean, duration: number}));
```

滚动到视图底部（水平方向的视图则滚动到最右边）。

加上动画参数`scrollToEnd({animated: true})`则启用平滑滚动动画，或是调用`scrollToEnd({animated: false})`来立即跳转。For Android, you may specify a duration, e.g. `scrollToEnd({duration: 500})` for a controlled duration scroll。如果不使用参数，则`animated`选项默认启用。

---

### `scrollWithoutAnimationTo()`

```jsx
scrollWithoutAnimationTo(y, x);
```

Deprecated, use `scrollTo` instead.

---

### `flashScrollIndicators()`

```jsx
flashScrollIndicators();
```

短暂地显示滚动指示器。
