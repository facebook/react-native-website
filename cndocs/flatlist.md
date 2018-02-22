---
id: flatlist
title: FlatList
---

高性能的简单列表组件，支持下面这些常用的功能：

* 完全跨平台。
* 支持水平布局模式。
* 行组件显示或隐藏时可配置回调事件。
* 支持单独的头部组件。
* 支持单独的尾部组件。
* 支持自定义行间分隔线。
* 支持下拉刷新。
* 支持上拉加载。
* 支持跳转到指定行（ScrollToIndex）。

如果需要分组/类/区（section），请使用[`<SectionList>`](sectionlist.md).

一个最简单的例子：

    <FlatList
      data={[{key: 'a'}, {key: 'b'}]}
      renderItem={({item}) => <Text>{item.key}</Text>}
    />

下面是一个较复杂的例子，其中演示了如何利用`PureComponent`来进一步优化性能和减少 bug 产生的可能（以下这段文字需要你深刻理解 shouldComponentUpdate 的机制，以及 Component 和 PureComponent 的不同，所以如果不了解就先跳过吧）。

* 对于`MyListItem`组件来说，其`onPressItem`属性使用箭头函数而非 bind 的方式进行绑定，使其不会在每次列表重新 render 时生成一个新的函数，从而保证了 props 的不变性（当然前提是 `id`、`selected`和`title`也没变），不会触发自身无谓的重新 render。换句话说，如果你是用 bind 来绑定`onPressItem`，每次都会生成一个新的函数，导致 props 在`===`比较时返回 false，从而触发自身的一次不必要的重新 render。
* 给`FlatList`指定`extraData={this.state}`属性，是为了保证`state.selected`变化时，能够正确触发`FlatList`的更新。如果不指定此属性，则`FlatList`不会触发更新，因为它是一个`PureComponent`，其 props 在`===`比较中没有变化则不会触发更新。
* `keyExtractor`属性指定使用 id 作为列表每一项的 key。


    class MyListItem extends React.PureComponent {
      _onPress = () => {
        this.props.onPressItem(this.props.id);
      };

      render() {
        const textColor = this.props.selected ? "red" : "black";
        return (
          <TouchableOpacity onPress={this._onPress}>
            <View>
              <Text style={{ color: textColor }}>
                {this.props.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }
    }

    class MultiSelectList extends React.PureComponent {
      state = {selected: (new Map(): Map<string, boolean>)};

      _keyExtractor = (item, index) => item.id;

      _onPressItem = (id: string) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
          // copy the map rather than modifying state.
          const selected = new Map(state.selected);
          selected.set(id, !selected.get(id)); // toggle
          return {selected};
        });
      };

      _renderItem = ({item}) => (
        <MyListItem
          id={item.id}
          onPressItem={this._onPressItem}
          selected={!!this.state.selected.get(item.id)}
          title={item.title}
        />
      );

      render() {
        return (
          <FlatList
            data={this.props.data}
            extraData={this.state}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
          />
        );
      }
    }

本组件实质是基于[`<VirtualizedList>`](virtualizedlist.md)组件的封装，继承了其所有 props（也包括所有[`<ScrollView>`](scrollview.md))的 props），但在本文档中没有列出。此外还有下面这些需要注意的事项：

* 当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
* 本组件继承自`PureComponent`而非通常的`Component`，这意味着如果其`props`在`浅比较`中是相等的，则不会重新渲染。所以请先检查你的`renderItem`函数所依赖的`props`数据（包括`data`属性以及可能用到的父组件的 state），如果是一个引用类型（Object 或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的 Object 或者数组中），然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下[js 中的基本类型和引用类型](https://segmentfault.com/a/1190000002789651)。）
* 为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，你可以根据自己的需求调整相应的参数，而我们也在设法持续改进。
* 默认情况下每行都需要提供一个不重复的 key 属性。你也可以提供一个`keyExtractor`函数来生成 key。

本组件如果嵌套在其他同滚动方向的 FlatList 中，则不会继承[ScrollView 的 Props](scrollview.md#props)。

### 查看 Props

* [`ScrollView` props...](scrollview.md#props)
* [`VirtualizedList` props...](virtualizedlist.md#props)
* [`renderItem`](flatlist.md#renderitem)
* [`data`](flatlist.md#data)
* [`ItemSeparatorComponent`](flatlist.md#itemseparatorcomponent)
* [`ListEmptyComponent`](flatlist.md#listemptycomponent)
* [`ListFooterComponent`](flatlist.md#listfootercomponent)
* [`ListHeaderComponent`](flatlist.md#listheadercomponent)
* [`columnWrapperStyle`](flatlist.md#columnwrapperstyle)
* [`extraData`](flatlist.md#extradata)
* [`getItemLayout`](flatlist.md#getitemlayout)
* [`horizontal`](flatlist.md#horizontal)
* [`initialNumToRender`](flatlist.md#initialnumtorender)
* [`initialScrollIndex`](flatlist.md#initialscrollindex)
* [`inverted`](flatlist.md#inverted)
* [`keyExtractor`](flatlist.md#keyextractor)
* [`numColumns`](flatlist.md#numcolumns)
* [`onEndReached`](flatlist.md#onendreached)
* [`onEndReachedThreshold`](flatlist.md#onendreachedthreshold)
* [`onRefresh`](flatlist.md#onrefresh)
* [`onViewableItemsChanged`](flatlist.md#onviewableitemschanged)
* [`progressViewOffset`](flatlist.md#progressviewoffset)
* [`legacyImplementation`](flatlist.md#legacyimplementation)
* [`refreshing`](flatlist.md#refreshing)
* [`removeClippedSubviews`](flatlist.md#removeclippedsubviews)
* [`viewabilityConfig`](flatlist.md#viewabilityconfig)
* [`viewabilityConfigCallbackPairs`](flatlist.md#viewabilityconfigcallbackpairs)

### 查看方法

* [`scrollToEnd`](flatlist.md#scrolltoend)
* [`scrollToIndex`](flatlist.md#scrolltoindex)
* [`scrollToItem`](flatlist.md#scrolltoitem)
* [`scrollToOffset`](flatlist.md#scrolltooffset)
* [`recordInteraction`](flatlist.md#recordinteraction)
* [`flashScrollIndicators`](flatlist.md#flashscrollindicators)

---

# 文档

## Props

### `renderItem`

```javascript
renderItem({ item: Object, index: number, separators: { highlight: Function, unhighlight: Function, updateProps: Function(select: string, newProps: Object) } }) => ?React.Element
```

Takes an item from `data` and renders it into the list.

Provides additional metadata like `index` if you need it, as well as a more generic `separators.updateProps` function which let you set whatever props you want to change the rendering of either the leading separator or trailing separator in case the more common `highlight` and `unhighlight` (which set the `highlighted: boolean` prop) are insufficient for your use case.

| 类型     | 必填 |
| -------- | ---- |
| function | 是   |

Example usage:

```javascript
<FlatList
  ItemSeparatorComponent={Platform.OS !== 'android' && ({highlighted}) => (
    <View style={[style.separator, highlighted && {marginLeft: 0}]} />
  )}
  data={[{title: 'Title Text', key: 'item1'}]}
  renderItem={({item, separators}) => (
    <TouchableHighlight
      onPress={() => this._onPress(item)}
      onShowUnderlay={separators.highlight}
      onHideUnderlay={separators.unhighlight}>
      <View style={{backgroundColor: 'white'}}>
        <Text>{item.title}</Text>
      </View>
    </TouchableHighlight>
  )}
/>
```

---

### `data`

为了简化起见，data 属性目前只支持普通数组。如果需要使用其他特殊数据结构，例如 immutable 数组，请直接使用更底层的[`VirtualizedList`](virtualizedlist.md)组件。

| 类型  | 必填 |
| ----- | ---- |
| array | 是   |

---

### `ItemSeparatorComponent`

行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。 By default, `highlighted` and `leadingItem` props are provided. `renderItem` provides `separators.highlight`/`unhighlight` which will update the `highlighted` prop, but you can also add custom props with `separators.updateProps`.

| 类型      | 必填 |
| --------- | ---- |
| component | 否   |

---

### `ListEmptyComponent`

列表为空时渲染该组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element。

| 类型                         | 必填 |
| ---------------------------- | ---- |
| component, function, element | 否   |

---

### `ListFooterComponent`

尾部组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element。

| 类型                         | 必填 |
| ---------------------------- | ---- |
| component, function, element | 否   |

---

### `ListHeaderComponent`

头部组件。可以是 React Component, 也可以是一个 render 函数，或者渲染好的 element。

| 类型                         | 必填 |
| ---------------------------- | ---- |
| component, function, element | 否   |

---

### `columnWrapperStyle`

如果设置了多列布局（即将`numColumns`值设为大于 1 的整数），则可以额外指定此样式作用在每行容器上。

| 类型         | 必填 |
| ------------ | ---- |
| style object | 否   |

---

### `extraData`

如果有除`data`以外的数据用在列表中（不论是用在`renderItem`还是头部或者尾部组件中），请在此属性中指定。同时此数据在修改时也需要先修改其引用地址（比如先复制到一个新的 Object 或者数组中），然后再修改其值，否则界面很可能不会刷新。

| 类型 | 必填 |
| ---- | ---- |
| any  | 否   |

---

### `getItemLayout`

```javascript
(data, index) => {length: number, offset: number, index: number}
```

`getItemLayout`是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，`getItemLayout`用起来就既高效又简单，类似下面这样：

```javascript
  getItemLayout={(data, index) => (
    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  )}
```

对于元素较多的列表（几百行）来说，添加`getItemLayout`可以极大地提高性能。注意如果你指定了`ItemSeparatorComponent`，请把分隔线的尺寸也考虑到 offset 的计算之中。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `horizontal`

设置为 true 则变为水平布局模式。

| 类型    | 必填 |
| ------- | ---- |
| boolean | 否   |

---

### `initialNumToRender`

指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容。注意这第一批次渲染的元素不会在滑动过程中被卸载，这样是为了保证用户执行返回顶部的操作时，不需要重新渲染首批元素。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `initialScrollIndex`

开始时屏幕顶端的元素是列表中的第 `initialScrollIndex`个元素, 而不是第一个元素。如果设置了这个属性，则第一批`initialNumToRender`范围内的元素不会再保留在内存里，而是直接立刻渲染位于 <code>initialScrollIndex</code> 位置的元素。需要先设置 <code>getItemLayout</code> 属性。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `inverted`

翻转滚动方向。实质是将 scale 变换设置为-1。

| 类型    | 必填 |
| ------- | ---- |
| boolean | 否   |

---

### `keyExtractor`

```javascript
(item: object, index: number) => string;
```

此函数用于为给定的 item 生成一个不重复的 key。Key 的作用是使 React 能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取`item.key`作为 key 值。若`item.key`也不存在，则使用数组下标。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `numColumns`

多列布局只能在非水平模式下使用，即必须是`horizontal={false}`。此时组件内元素会从左到右从上到下按 Z 字形排列，类似启用了`flexWrap`的布局。组件内元素必须是等高的——暂时还无法支持瀑布流布局。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `onEndReached`

```javascript
(info: {distanceFromEnd: number}) => void
```

当列表被滚动到距离内容最底部不足`onEndReachedThreshold`的距离时调用。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onEndReachedThreshold`

决定当距离内容最底部还有多远时触发`onEndReached`回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `onRefresh`

```javascript
() => void
```

如果设置了此选项，则会在列表头部添加一个标准的[`RefreshControl`](refreshcontrol.md)控件，以便实现“下拉刷新”的功能。同时你需要正确设置`refreshing`属性。

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

在可见行元素变化时调用。可见范围和变化频率等参数的配置请设置`viewabilityConfig`属性。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `progressViewOffset`

当需要在指定的偏移处显示加载指示器的时候，就可以设置这个值。

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| number | 否   | Android |

---

### `legacyImplementation`

May not have full feature parity and is meant for debugging and performance comparison.

| 类型    | 必填 |
| ------- | ---- |
| boolean | 否   |

---

### `refreshing`

在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的符号。

| 类型    | 必填 |
| ------- | ---- |
| boolean | 否   |

---

### `removeClippedSubviews`

对于大列表启用本属性可能可以提高性能。

> 注意：有些情况下会有 bug（比如内容无法显示）。请谨慎使用。

| 类型    | 必填 |
| ------- | ---- |
| boolean | 否   |

---

### `viewabilityConfig`

请参考[`ViewabilityHelper.js`](https://github.com/facebook/react-native/blob/master/Libraries/Lists/ViewabilityHelper.js)的源码来了解具体的配置。

| 类型              | 必填 |
| ----------------- | ---- |
| ViewabilityConfig | 否   |

---

### `viewabilityConfigCallbackPairs`

List of `ViewabilityConfig`/`onViewableItemsChanged` pairs. A specific `onViewableItemsChanged` will be called when its corresponding `ViewabilityConfig`'s conditions are met. 请参考[`ViewabilityHelper.js`](https://github.com/facebook/react-native/blob/master/Libraries/Lists/ViewabilityHelper.js)的源码来了解具体的配置。

| 类型                                   | 必填 |
| -------------------------------------- | ---- |
| array of ViewabilityConfigCallbackPair | 否   |

## 方法

### `scrollToEnd()`

```javascript
scrollToEnd([params]);
```

滚动到底部。如果不设置`getItemLayout`属性的话，可能会比较卡。

**参数：**

| 名称   | 类型   | 必填 | 说明         |
| ------ | ------ | ---- | ------------ |
| params | object | 否   | 看下面的说明 |

Valid `params` keys are:

* 'animated' (boolean) - Whether the list should do an animation while scrolling. Defaults to `true`.

---

### `scrollToIndex()`

```javascript
scrollToIndex(params);
```

将位于指定位置的元素滚动到可视区的指定位置，当`viewPosition` 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。

> 注意：如果不设置`getItemLayout`属性的话，无法跳转到当前渲染区域以外的位置。

**参数：**

| 名称   | 类型   | 必填 | 说明         |
| ------ | ------ | ---- | ------------ |
| params | object | 是   | 看下面的说明 |

Valid `params` keys are:

* 'animated' (boolean) - Whether the list should do an animation while scrolling. Defaults to `true`.
* 'index' (number) - The index to scroll to. Required.
* 'viewOffset' (number) - A fixed number of pixels to offset the final target position. Required.
* 'viewPosition' (number) - A value of `0` places the item specified by index at the top, `1` at the bottom, and `0.5` centered in the middle.

---

### `scrollToItem()`

```javascript
scrollToItem(params);
```

这个方法会顺序遍历元素。尽可能使用`scrollToIndex`代替。

> 注意：如果不设置`getItemLayout`属性的话，无法跳转到当前渲染区域以外的位置。

**参数：**

| 名称   | 类型   | 必填 | 说明         |
| ------ | ------ | ---- | ------------ |
| params | object | 是   | 看下面的说明 |

Valid `params` keys are:

* 'animated' (boolean) - Whether the list should do an animation while scrolling. Defaults to `true`.
* 'item' (object) - The item to scroll to. Required.
* 'viewPosition' (number)

---

### `scrollToOffset()`

```javascript
scrollToOffset(params);
```

滚动列表到指定的偏移（以像素为单位），等同于`ScrollView`的`scrollTo`方法。

**参数：**

| 名称   | 类型   | 必填 | 说明         |
| ------ | ------ | ---- | ------------ |
| params | object | 是   | 看下面的说明 |

Valid `params` keys are:

* 'offset' (number) - The offset to scroll to. In case of `horizontal` being true, the offset is the x-value, in any other case the offset is the y-value. Required.
* 'animated' (boolean) - Whether the list should do an animation while scrolling. Defaults to `true`.

---

### `recordInteraction()`

```javascript
recordInteraction();
```

主动通知列表发生了一个事件，以使列表重新计算可视区域。比如说当`waitForInteractions`为 true 并且用户没有滚动列表时。一般在用户点击了列表项或发生了导航动作时调用。

---

### `flashScrollIndicators()`

```javascript
flashScrollIndicators();
```

短暂地显示滚动指示器。
