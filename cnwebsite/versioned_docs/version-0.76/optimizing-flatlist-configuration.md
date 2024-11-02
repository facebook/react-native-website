---
id: optimizing-flatlist-configuration
title: 列表配置优化
---

## 术语定义

- **VirtualizedList:** `FlatList`背后的基础支撑组件（是 React Native 对[`虚拟列表 Virtual List`](https://bvaughn.github.io/react-virtualized/#/components/List)概念的实现）。

- **内存开销 Memory consumption:** 列表在内存中存放多少数据。开销过大可能导致应用崩溃。

- **响应度 Responsiveness:** 应用对于用户操作的响应速度。比如低响应度就是你在操作时，应用要卡一会儿才响应。

- **空白区 Blank areas:** 当`VirtualizedList`渲染的速度跟不上你滑动的速度时，你可能会在列表中看到一些尚未完成渲染的空白占位元素。

- **视口 Viewport:** 已渲染内容的可视区域。

- **滑动窗口 Window:** 内容组件应该被挂载的区域，通常比视口（viewport）大得多。

## Props

下面列出了一些可以提升`FlatList`性能的重要技巧:

### removeClippedSubviews

| 类型    | 默认值 |
| ------- | ------- |
| Boolean | False   |

如果设为 `true`，那些超出视口范围的视图会从原生视图层级结构中分离。

**好处：** 启用此选项可减少花在主线程上的时间，从而降低丢帧的风险。原理是对视口之外的视图不进行本地渲染和绘图遍历。

**坏处：** 请注意，这种实现可能会有 bug，比如丢失内容（主要是在 iOS 上观察到的），特别是当你使用变换和/或绝对定位做复杂的事情时。另外，请注意这并不会节省大量的内存，因为视图并没有被销毁，只是被分离了。

### maxToRenderPerBatch

| 类型   | 默认值 |
| ------ | ------- |
| Number | 10      |

 
这是一个可以通过 `FlatList` 传递的 `VirtualizedList` 属性。它控制每批渲染的元素数量,也就是每次滚动时渲染的下一组元素。

**好处：** 设置较大的数值意味着在滚动时会减少视觉上的空白区域(提高填充率)。

**坏处：** 每批处理更多元素意味着更长的 JavaScript 执行时间,可能会阻塞其他事件处理,例如按键操作,从而影响响应速度。

### updateCellsBatchingPeriod

| 类型   | 默认值 |
| ------ | ------- |
| Number | 50      |

`maxToRenderPerBatch` 告诉 `VirtualizedList` 每批次渲染的元素数量，而 `updateCellsBatchingPeriod` 则用于设置两次批量渲染之间的延迟毫秒数（也就是组件渲染可见区域内元素的频率）。

**好处：** 将这个属性与 `maxToRenderPerBatch` 结合使用，你就可以灵活控制渲染的节奏，比如在频率较低时渲染更多元素，或者在频率较高时渲染较少元素。

**坏处：** 频率过低可能会导致出现空白区域，而频率过高则可能影响组件的响应速度。

### initialNumToRender

| 类型   | Default |
| ------ | ------- |
| Number | 10      |

初始渲染的元素数量。

**好处：** 为每个设备定义精确的（刚好可以）覆盖屏幕的项目数量。这可以大大提升初始渲染的性能。

**坏处：** 如果设置的 `initialNumToRender` 值过低，尤其是小到不足以覆盖初始渲染时的可视区域，就可能会出现空白区域。

### windowSize

| 类型   | 默认值 |
| ------ | ------- |
| Number | 21      |

这里传递的数字是一个度量单位，其中 1 相当于视口高度。默认值为 21（上方 10 个视口，下方 10 个视口，中间一个视口）。

**好处：** `windowSize` 值越大，滚动时看到空白区域的概率就越小。另一方面，`windowSize` 值越小，同时加载的元素就越少，从而节省内存。

**坏处：** 对于较大的 `windowSize`，内存消耗会更多。对于较小的 `windowSize`，看到空白区域的概率会更大。

## 列表组件的优化要点

接下来是展示列表项组件的一些小技巧。列表项组件是列表的核心，所以它们的性能要足够好。

### 使用简单组件

组件越复杂一般渲染就越慢。 
在列表项中尽量避免过多的逻辑和嵌套。如果你在应用中经常复用这个列表项组件，那就专门为这些大型列表创建一个组件，尽可能减少其中的逻辑和嵌套。

### 使用轻量组件

组件太重自然也会拖慢渲染。尽量避免使用大图片（优先使用裁剪过的版本或是缩略图，总之越小越好）。和负责设计的同事协商，在列表中尽可能简化特效和交互，精简要展示的信息，把长内容移到详情页中。

### 使用`memo()`

`React.memo()` 会创建一个带有记忆化功能的组件，只有当传递给组件的 props 发生变化时，该组件才会重新渲染。我们可以利用这个函数来优化 FlatList 中的组件。

```tsx
import React, {memo} from 'react';
import {View, Text} from 'react-native';

const MyListItem = memo(
  ({title}: {title: string}) => (
    <View>
      <Text>{title}</Text>
    </View>
  ),
  (prevProps, nextProps) => {
    return prevProps.title === nextProps.title;
  },
);

export default MyListItem;
```

在这个例子中，我们决定只有在标题发生变化时才重新渲染`MyListItem`组件。我们将比较函数作为第二个参数传递给`React.memo()`，以便只在指定的属性发生变化时才重新渲染组件。如果比较函数返回`true`，则组件将不会被重新渲染。

### 使用优化缓存的图片库

 
你可以使用社区的扩展包（例如 @DylanVann 提供的 [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image) ）来获得更高性能的图片加载体验。列表中的每张图片都是一个`new Image()`实例。它触发 loaded 钩子的速度越快，你的 Javascript 线程就能越快再次空闲下来。

### 使用 getItemLayout

如果您的列表项组件都具有相同的高度（或宽度，对于水平列表），则提供 [getItemLayout](flatlist#getitemlayout)属性可以消除您的 `FlatList` 管理异步布局计算的需要。这是一种非常理想的优化技术。

如果您的组件具有动态大小并且确实需要性能，请考虑询问设计团队是否可以重新设计以获得更好的性能。

### 使用 keyExtractor 或 key

你可以为 `FlatList` 组件设置 [`keyExtractor`](flatlist#keyextractor) 属性。这个属性用于缓存,同时作为 React 的 `key` 来跟踪列表项的重新排序。
你也可以在列表项组件中使用 `key` 属性。

### 避免在 renderItem 中使用匿名函数

 
对于函数式组件，把 `renderItem` 函数移到返回的 JSX 之外。另外，确保把它包裹在 `useCallback` 钩子里，防止每次渲染时都重新创建。
对于类组件，把 `renderItem` 函数移到 render 函数之外，这样每次调用`render`函数时它就不会重新创建自己了。

```tsx
const renderItem = useCallback(({item}) => (
   <View key={item.key}>
      <Text>{item.title}</Text>
   </View>
 ), []);

return (
  // ...

  <FlatList data={items} renderItem={renderItem} />;
  // ...
);
```
