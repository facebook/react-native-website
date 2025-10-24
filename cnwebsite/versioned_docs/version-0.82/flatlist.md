---
id: flatlist
title: FlatList
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

高性能的简单列表组件，支持下面这些常用的功能：

- 完全跨平台。
- 支持水平布局模式。
- 行组件显示或隐藏时可配置回调事件。
- 支持单独的头部组件。
- 支持单独的尾部组件。
- 支持自定义行间分隔线。
- 支持下拉刷新。
- 支持上拉加载。
- 支持跳转到指定行（ScrollToIndex）。
- 支持多列布局。

如果需要分组/类/区（section），请使用[`<SectionList>`](sectionlist.md).

## 示例

<Tabs groupId="language" queryString defaultValue={constants.dewfaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=flatlist-simple&ext=js
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=flatlist-simple&ext=tsx
import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
</Tabs>

要呈现多列，请使用 [`numColumns`](flatlist.md#numcolumns) 属性。使用这种方法而不是 `flexWrap` 布局可以防止与项目高度逻辑发生冲突。

下面是一个较复杂的例子，其中演示了如何利用`PureComponent`来进一步优化性能和减少 bug 产生的可能（以下这段文字需要你深刻理解 `shouldComponentUpdate`, `memo` 的机制，以及 `Component` 和 `PureComponent` 的不同，如果不了解就先跳过吧）。

- 对于`MyListItem`组件来说，其`onPressItem`属性使用箭头函数而非 bind 的方式进行绑定，使其不会在每次列表重新 render 时生成一个新的函数，从而保证了 props 的不变性（当然前提是 `id`、`selected`和`title`也没变），不会触发自身无谓的重新 render。换句话说，如果你是用 bind 来绑定`onPressItem`，每次都会生成一个新的函数，导致 props 在`===`比较时返回 false，从而触发自身的一次不必要的重新 render。
- 给`FlatList`指定`extraData={this.state}`属性，是为了保证`state.selected`变化时，能够正确触发`FlatList`的更新。如果不指定此属性，则`FlatList`不会触发更新，因为它是一个`PureComponent`，其 props 在`===`比较中没有变化则不会触发更新。
- `keyExtractor`属性指定使用 id 作为列表每一项的 key。

<Tabs groupId="language" queryString defaultValue={constants.dewfaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=flatlist-selectable&ext=js
import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Item = ({item, onPress, backgroundColor, textColor}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState();

  const renderItem = ({item}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=flatlist-selectable&ext=tsx
import React, {useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

type ItemData = {
  id: string;
  title: string;
};

const DATA: ItemData[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({item, onPress, backgroundColor, textColor}: ItemProps) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor}]}>
    <Text style={[styles.title, {color: textColor}]}>{item.title}</Text>
  </TouchableOpacity>
);

const App = () => {
  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({item}: {item: ItemData}) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'black';

    return (
      <Item
        item={item}
        onPress={() => setSelectedId(item.id)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;
```

</TabItem>
</Tabs>

本组件实质是基于[`<VirtualizedList>`](virtualizedlist.md)组件的封装，继承了其所有 props（也包括所有[`<ScrollView>`](scrollview.md))的 props），但在本文档中没有列出。此外还有下面这些需要注意的事项：

- 当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
- 本组件继承自`PureComponent`而非通常的`Component`，这意味着如果其`props`在`浅比较`中是相等的，则不会重新渲染。所以请先检查你的`renderItem`函数所依赖的`props`数据（包括`data`属性以及可能用到的父组件的 state），如果是一个引用类型（Object 或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的 Object 或者数组中），然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下[js 中的基本类型和引用类型](https://segmentfault.com/a/1190000002789651)。）
- 为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，你可以根据自己的需求调整相应的参数，而我们也在设法持续改进。
- 默认情况下每行都需要提供一个不重复的 key 属性。你也可以提供一个`keyExtractor`函数来生成 key。

---

# 文档

## Props

### [ScrollView Props](scrollview.md#props)

继承所有[ScrollView 的 Props](scrollview.md#props)。但如果嵌套在其他同滚动方向的 FlatList 中则无效。

---

### <div class="label required basic">必需</div> **`renderItem`**

```tsx
renderItem({
  item: ItemT,
  index: number,
  separators: {
    highlight: () => void;
    unhighlight: () => void;
    updateProps: (select: 'leading' | 'trailing', newProps: any) => void;
  }
}): JSX.Element;
```

从`data`中获取一个项目并将其渲染到列表中。

如果需要，提供附加的元数据，如`index`，以及一个更通用的`separators.updateProps`函数，该函数允许您设置要更改前导分隔符或尾随分隔符的渲染的任何属性，以防常见的`highlight`和`unhighlight`（设置`highlighted: boolean`属性）对您的用例不足够。

| 类型 |
| ---- |
| 函数 |

- `item`（对象）：要渲染的来自`data`的项目。
- `index`（数字）：在`data`数组中对应于此项目的索引。
- `separators`（对象）
  - `highlight`（函数）
  - `unhighlight`（函数）
  - `updateProps`（函数）
    - `select`（枚举('leading', 'trailing')）
    - `newProps`（对象）

示例用法：

```tsx
<FlatList
  ItemSeparatorComponent={
    Platform.OS !== 'android' &&
    (({highlighted}) => (
      <View
        style={[style.separator, highlighted && {marginLeft: 0}]}
      />
    ))
  }
  data={[{title: 'Title Text', key: 'item1'}]}
  renderItem={({item, index, separators}) => (
    <TouchableHighlight
      key={item.key}
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

### <div class="label required basic">必需</div> **`data`**

为了简化起见，data 属性目前只支持普通数组或类数组。如果需要使用其他特殊数据结构，例如 immutable 数组，请直接使用更底层的[`VirtualizedList`](virtualizedlist.md)组件。

| 类型  |
| ----- |
| array |

---

### `ItemSeparatorComponent`

在每个项目之间进行渲染，但不在顶部或底部。默认情况下，提供`highlighted`和`leadingItem`属性。`renderItem`提供`separators.highlight`/`unhighlight`，将更新`highlighted`属性，但您还可以使用`separators.updateProps`添加自定义属性。可以是 React 组件（例如`SomeComponent`），也可以是 React 元素（例如`<SomeComponent />`）。

| 类型                         |
| ---------------------------- |
| component, function, element |

---

### `ListEmptyComponent`

列表为空时渲染该组件。可以是 React 组件, 也可以是一个 render 函数，或者是 React 元素。

| 类型                         |
| ---------------------------- |
| component, function, element |

---

### `ListFooterComponent`

尾部组件。可以是 React 组件, 也可以是一个 render 函数，或者是 React 元素。

| 类型                         |
| ---------------------------- |
| component, function, element |

---

### `ListFooterComponentStyle`

`ListFooterComponent` 内部视图的样式。

| 类型                         |
| ---------------------------- |
| [视图样式](view-style-props) |

---

### `ListHeaderComponent`

头部组件。可以是 React 组件, 也可以是一个 render 函数，或者是 React 元素。

| 类型                         |
| ---------------------------- |
| component, function, element |

---

### `ListHeaderComponentStyle`

`ListHeaderComponent` 内部视图的样式。

| 类型                         |
| ---------------------------- |
| [视图样式](view-style-props) |

---

### `columnWrapperStyle`

如果设置了多列布局（即将`numColumns`值设为大于 1 的整数），则可以额外指定此样式作用在每行容器上。

| 类型         |
| ------------ |
| style object |

---

### `extraData`

如果有除`data`以外的数据用在列表中（不论是用在`renderItem`还是头部或者尾部组件中），请在此属性中指定。同时此数据在修改时也需要先修改其引用地址（比如先复制到一个新的 Object 或者数组中），然后再修改其值，否则界面很可能不会刷新。

| 类型 |
| ---- |
| any  |

---

### `getItemLayout`

```tsx
(data, index) => {length: number, offset: number, index: number}
```

`getItemLayout`是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，`getItemLayout`用起来就既高效又简单，类似下面这样：

```jsx
  getItemLayout={(data, index) => (
    {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
  )}
```

对于元素较多的列表（几百行）来说，添加`getItemLayout`可以极大地提高性能。注意如果你指定了`ItemSeparatorComponent`，请把分隔线的尺寸也考虑到 offset 的计算之中。

| 类型     |
| -------- |
| function |

---

### `horizontal`

设置为 true 则变为水平布局模式。

| 类型    |
| ------- |
| boolean |

---

### `initialNumToRender`

指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容。注意这第一批次渲染的元素不会在滑动过程中被卸载，这样是为了保证用户执行返回顶部的操作时，不需要重新渲染首批元素。

| 类型   |
| ------ |
| number |

---

### `initialScrollIndex`

开始时屏幕顶端的元素是列表中的第 `initialScrollIndex`个元素, 而不是第一个元素。如果设置了这个属性，则第一批`initialNumToRender`范围内的元素不会再保留在内存里，而是直接立刻渲染位于 <code>initialScrollIndex</code> 位置的元素。需要先设置 <code>getItemLayout</code> 属性。

| 类型   |
| ------ |
| number |

---

### `inverted`

翻转滚动方向。实质是将 scale 变换设置为-1。

| 类型    |
| ------- |
| boolean |

---

### `keyExtractor`

```jsx
(item: object, index: number) => string;
```

此函数用于为给定的 item 生成一个不重复的 key。Key 的作用是使 React 能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取`item.key`作为 key 值。若`item.key`也不存在，则使用数组下标。

| 类型     |
| -------- |
| function |

---

### `numColumns`

多列布局只能在非水平模式下使用，即必须是`horizontal={false}`。此时组件内元素会从左到右从上到下按 Z 字形排列，类似启用了`flexWrap`的布局。组件内元素必须是等高的——暂时还无法支持瀑布流布局。

| 类型   |
| ------ |
| number |

---

### `onEndReached`

```jsx
(info: {distanceFromEnd: number}) => void
```

当列表被滚动到距离内容最底部不足`onEndReachedThreshold`的距离时调用。

| 类型     |
| -------- |
| function |

---

### `onEndReachedThreshold`

决定当距离内容最底部还有多远时触发`onEndReached`回调。注意此参数是一个比值而非像素单位。比如，0.5 表示距离内容最底部的距离为当前列表可见长度的一半时触发。

| 类型   |
| ------ |
| number |

---

### `onRefresh`

```jsx
() => void
```

如果设置了此选项，则会在列表头部添加一个标准的[`RefreshControl`](refreshcontrol.md)控件，以便实现“下拉刷新”的功能。同时你需要正确设置`refreshing`属性。

| 类型     |
| -------- |
| function |

---

### `onViewableItemsChanged`

```jsx
(info: {
    viewableItems: array,
    changed: array,
  }) => void
```

在可见行元素变化时调用。可见范围和变化频率等参数的配置请设置`viewabilityConfig`属性。

| 类型                                                                                                  |
| ----------------------------------------------------------------------------------------------------- |
| `md (callback: {changed: [ViewToken](viewtoken)[], viewableItems: [ViewToken](viewtoken)[]} => void;` |

---

### `progressViewOffset`

当需要在指定的偏移处显示加载指示器的时候，就可以设置这个值。

| 类型   |
| ------ |
| number |

---

### `refreshing`

在等待加载新数据时将此属性设为 true，列表就会显示出一个正在加载的符号。

| 类型    |
| ------- |
| boolean |

---

### `removeClippedSubviews`

对于大列表启用本属性可能可以提高性能。在 android 上此项默认启用。

> 注意：有些情况下会有 bug（比如内容无法显示）。请谨慎使用。

| 类型    |
| ------- |
| boolean |

---

### `viewabilityConfig`

请参考[`ViewabilityHelper.js`](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Lists/ViewabilityHelper.js)的源码来了解具体的配置。

| 类型              |
| ----------------- |
| ViewabilityConfig |

`viewabilityConfig` 接受类型为 `ViewabilityConfig` 的对象，具有以下属性

| 属性                             | 类型    |
| -------------------------------- | ------- |
| minimumViewTime                  | number  |
| viewAreaCoveragePercentThreshold | number  |
| itemVisiblePercentThreshold      | number  |
| waitForInteraction               | boolean |

`viewAreaCoveragePercentThreshold` 或 `itemVisiblePercentThreshold` 至少需要其中之一。这需要在 `constructor` 中完成，以避免以下错误（[参考链接](https://github.com/facebook/react-native/issues/17408)）：

```
  Error: Changing viewabilityConfig on the fly is not supported
```

```jsx
constructor (props) {
  super(props)

  this.viewabilityConfig = {
      waitForInteraction: true,
      viewAreaCoveragePercentThreshold: 95
  }
}
```

```jsx
<FlatList
  viewabilityConfig={this.viewabilityConfig}
  //...
/>
```

#### minimumViewTime

在物品被视为可见之前，物品必须在视觉回调触发之前实际可视的最短时间（以毫秒为单位）。较高的数字意味着滚动内容而不停下不会将内容标记为可见。

#### viewAreaCoveragePercentThreshold

视口的百分比，必须覆盖部分遮挡的物品才能算作“可见”，范围为 0-100。始终将完全可见的物品视为可见。值为 0 意味着视口中的单个像素使物品可见，而值为 100 意味着物品必须完全可见或覆盖整个视口才能算作可见。

#### itemVisiblePercentThreshold

与 `viewAreaCoveragePercentThreshold` 类似，但考虑的是物品可见的百分比，而不是它覆盖的可视区域的分数。

#### waitForInteraction

在用户滚动或在渲染后调用 `recordInteraction` 之前，不认为任何内容是可见的。

---

### `viewabilityConfigCallbackPairs`

`ViewabilityConfig`/`onViewableItemsChanged` 对的列表。当满足其相应的 `ViewabilityConfig` 条件时，将调用特定的 `onViewableItemsChanged`。有关流程类型和进一步文档，请参阅 `ViewabilityHelper.js`。

| 类型                                 |
| ------------------------------------ |
| `ViewabilityConfigCallbackPair` 数组 |

## 方法

### `scrollToEnd()`

```jsx
scrollToEnd([params]);
```

滚动到底部。如果不设置`getItemLayout`属性的话，可能会比较卡。

**参数：**

| 名称   | 类型   |
| ------ | ------ |
| params | object |

有效的 `params` 键包括：

- 'animated'（布尔值）- 列表在滚动时是否应执行动画。默认为 `true`。

---

### `scrollToIndex()`

```tsx
scrollToIndex: (params: {
  index: number;
  animated?: boolean;
  viewOffset?: number;
  viewPosition?: number;
});
```

将位于指定位置的元素滚动到可视区的指定位置，当`viewPosition` 为 0 时将它滚动到屏幕顶部，为 1 时将它滚动到屏幕底部，为 0.5 时将它滚动到屏幕中央。

> 注意：如果不设置`getItemLayout`属性的话，无法跳转到当前渲染区域以外的位置。

**参数：**

| 名称                                                        | 类型   |
| ----------------------------------------------------------- | ------ |
| params <div className="label basic required">Required</div> | object |

有效的 `params` 键包括：

- 'animated'（布尔值） - 列表在滚动时是否应执行动画。默认为 `true`。
- 'index'（数字） - 要滚动到的索引。必填项。
- 'viewOffset'（数字） - 最终目标位置的固定像素偏移量。
- 'viewPosition'（数字） - 值为 `0` 将索引指定的项放置在顶部，`1` 放置在底部，`0.5` 在中间居中。

---

### `scrollToItem()`

```tsx
scrollToItem(params: {
  animated?: ?boolean,
  item: Item,
  viewPosition?: number,
});
```

这个方法会顺序遍历元素。请尽可能使用`scrollToIndex`代替。

> 注意：如果不设置`getItemLayout`属性的话，无法跳转到当前渲染区域以外的位置。

**参数：**

| Name                                                        | Type   |
| ----------------------------------------------------------- | ------ |
| params <div className="label basic required">Required</div> | object |

有效的 `params` 键包括：

- 'animated'（布尔值）- 列表在滚动时是否应执行动画。默认为 `true`。
- 'item'（对象）- 要滚动到的项目。必需。
- 'viewPosition'（数字）

---

### `scrollToOffset()`

```tsx
scrollToOffset(params: {
  offset: number;
  animated?: boolean;
});
```

滚动列表到指定的偏移（以像素为单位），等同于`ScrollView`的`scrollTo`方法。

**参数：**

| Name                                                        | Type   |
| ----------------------------------------------------------- | ------ |
| params <div className="label basic required">Required</div> | object |

有效的 `params` 键包括：

- 'offset'（数字）- 要滚动到的偏移量。如果 `horizontal` 为 true，则偏移量为 x 值；在其他任何情况下，偏移量为 y 值。必填。
- 'animated'（布尔值）- 列表在滚动时是否应执行动画。默认为 `true`。

---

### `flashScrollIndicators()`

```jsx
flashScrollIndicators();
```

短暂地显示滚动指示器。

---

### `getNativeScrollRef()`

```tsx
getNativeScrollRef(): React.ElementRef<typeof ScrollViewComponent>;
```

提供对底层滚动组件的 ref 引用。

---

### `getScrollResponder()`

```tsx
getScrollResponder(): ScrollResponderMixin;
```

提供对底层滚动响应器的引用。

---

### `getScrollableNode()`

```tsx
getScrollableNode(): any;
```

提供对底层滚动节点的引用。
