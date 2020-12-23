---
id: optimizing-flatlist-configuration
title: 列表配置优化
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(96.40%), [sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(3.60%)

## 术语定义

- **VirtualizedList:** `FlatList`背后的基础支撑组件（是 React Native 对[`虚拟列表 Virtual List`](https://bvaughn.github.io/react-virtualized/#/components/List)概念的实现）。

- **内存开销 Memory consumption:** 列表在内存中存放多少数据。开销过大可能导致应用崩溃。

- **响应度 Responsiveness:** 应用对于用户操作的响应速度。比如低响应度就是你在操作时，应用要卡一会儿才响应。

- **空白区 Blank areas:** 当`VirtualizedList`渲染的速度跟不上你滑动的速度时，你可能会在列表中看到一些尚未完成渲染的空白占位元素。

- **视口 Viewport:** The visible area of content that is rendered to pixels.

- **滑动窗口 Window:** The area in which items should be mounted, which is generally much larger than the viewport.

## Props

Here are a list of props that can help to improve `FlatList` performance:

### removeClippedSubviews

| 类型    | Default |
| ------- | ------- |
| Boolean | False   |

If `true`, views that are outside of the viewport are detached from the native view hierarchy.

**好处：** 启用此选项可减少花在主线程上的时间，从而降低丢帧的风险。原理是对视口之外的视图不进行本地渲染和绘图遍历。

**坏处：** 请注意，这种实现可能会有 bug，比如丢失内容（主要是在 iOS 上观察到的），特别是当你使用变换和/或绝对定位做复杂的事情时。另外，请注意这并不会节省大量的内存，因为视图并没有被销毁，只是被分离了。

### maxToRenderPerBatch

| 类型   | Default |
| ------ | ------- |
| Number | 10      |

It is a `VirtualizedList` prop that can be passed through `FlatList`. This controls the amount of items rendered per batch, which is the next chunk of items rendered on every scroll.

**好处：** Setting a bigger number means less visual blank areas when scrolling (increases the fill rate).

**坏处：** More items per batch means longer periods of JavaScript execution potentially blocking other event processing, like presses, hurting responsiveness.

### updateCellsBatchingPeriod

| 类型   | Default |
| ------ | ------- |
| Number | 50      |

While `maxToRenderPerBatch` tells the amount of items rendered per batch, setting `updateCellsBatchingPeriod` tells your `VirtualizedList` the delay in milliseconds between batch renders (how frequently your component will be rendering the windowed items).

**好处：** Combining this prop with `maxToRenderPerBatch` gives you the power to, for example, render more items in a less frequent batch, or less items in a more frequent batch.

**坏处：** Less frequent batches may cause blank areas, More frequent batches may cause responsiveness issues.

### initialNumToRender

| 类型   | Default |
| ------ | ------- |
| Number | 10      |

The initial amount of items to render.

**好处：** 为每个设备定义精确的（刚好可以）覆盖屏幕的项目数量。这可以大大提升初始渲染的性能。

**坏处：** Setting a low `initialNumToRender` may cause blank areas, especially if it's too small to cover the viewport on initial render.

### windowSize

| 类型   | Default |
| ------ | ------- |
| Number | 21      |

The number passed here is a measurement unit where 1 is equivalent to your viewport height. The default value is 21 (10 viewports above, 10 below, and one in between).

**好处：** Bigger `windowSize` will result in less chance of seeing blank space while scrolling. On the other hand, smaller `windowSize` will result in fewer items mounted simultaneously, saving memory.

**坏处：** For a bigger `windowSize`, you will have more memory consumption. For a lower `windowSize`, you will have a bigger chance of seeing blank areas.

## List items

Below are some tips about list item components. They are the core of your list, so they need to be fast.

### Use simple components

The more complex your components are, the slower they will render. Try to avoid a lot of logic and nesting in your list items. If you are reusing this list item component a lot in your app, create a component just for your big lists and make them with as little logic and nesting as possible.

### Use light components

The heavier your components are, the slower they render. Avoid heavy images (use a cropped version or thumbnail for list items, as small as possible). Talk to your design team, use as little effects and interactions and information as possible in your list. Show them in your item's detail.

### Use shouldComponentUpdate

Implement update verification to your components. React's `PureComponent` implement a [`shouldComponentUpdate`](https://zh-hans.reactjs.org/docs/react-component.html#shouldcomponentupdate) with shallow comparison. This is expensive here because it need to check all your props. If you want a good bit-level performance, create the strictest rules for your list item components, checking only props that could potentially change. If your list is simple enough, you could even use

```jsx
shouldComponentUpdate() {
  return false
}
```

### Use cached optimized images

You can use the community packages (such as [react-native-fast-image](https://github.com/DylanVann/react-native-fast-image) from [@DylanVann](https://github.com/DylanVann)) for more performant images. Every image in your list is a `new Image()` instance. The faster it reaches the `loaded` hook, the faster your Javascript thread will be free again.

### Use getItemLayout

If all your list item components have the same height (or width, for a horizontal list), providing the [getItemLayout](flatlist#getitemlayout) prop removes the need for your `FlatList` to manage async layout calculations. This is a very desirable optimization technique.

If your components have dynamic size and you really need performance, consider asking your design team if they may think of a redesign in order to perform better.

### Use keyExtractor or key

You can set the [`keyExtractor`](flatlist#keyextractor) to your `FlatList` component. This prop is used for caching and as the React `key` to track item re-ordering.

You can also use a `key` prop in you item component.

### 避免在 renderItem 中使用匿名函数

Move out the `renderItem` function to the outside of render function, so it won't recreate itself each time render function called.

```jsx
renderItem = ({ item }) => (<View key={item.key}><Text>{item.title}</Text></View>);

render(){
  // ...

  <FlatList
    data={items}
    renderItem={renderItem}
  />

  // ...
}
```
