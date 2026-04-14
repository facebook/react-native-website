---
id: refreshcontrol
title: RefreshControl
---

这一组件可以用在 ScrollView 或 FlatList 内部，为其添加下拉刷新的功能。当 ScrollView 处于竖直方向的起点位置（scrollY: 0），此时下拉会触发一个`onRefresh`事件。

## 示例

```SnackPlayer name=RefreshControl&supportedPlatforms=ios,android
import React from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <Text>Pull down to see RefreshControl indicator</Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
```

:::note
`refreshing`是一个受控属性，所以必须在`onRefresh`函数中设置为 true，否则 loading 指示器会立即停止。
:::

---

# 参考

## Props

### [View Props](view.md#props)

继承了所有的 [View Props](view.md#props).

---

### <div className="label required basic">必需</div>**`refreshing`**

视图是否应该在刷新时显示指示器。

| 类型    |
| ------- |
| boolean |

---

### `onRefresh`

在视图开始刷新时调用。

| 类型     |
| -------- |
| function |

---

### `colors` <div className="label android">Android</div>

指定至少一种颜色用来绘制刷新指示器。

| 类型                         |
| ---------------------------- |
| array of [colors](colors.md) |

---

### `enabled` <div className="label android">Android</div>

指定是否要启用刷新指示器。

| 类型    | 默认值 |
| ------- | ------ |
| boolean | `true` |

---

### `progressBackgroundColor` <div className="label android">Android</div>

指定刷新指示器的背景色。

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `progressViewOffset`

指定刷新指示器的垂直起始位置(top offset)。

| 类型   | 默认值 |
| ------ | ------ |
| number | `0`    |

---

### `size` <div className="label android">Android</div>

指定刷新指示器的大小。

| 类型                         | 默认值      |
| ---------------------------- | ----------- |
| enum(`'default'`, `'large'`) | `'default'` |

---

### `tintColor` <div className="label ios">iOS</div>

指定刷新指示器的颜色。

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `title` <div className="label ios">iOS</div>

指定刷新指示器下显示的文字。

| 类型   |
| ------ |
| string |

---

### `titleColor` <div className="label ios">iOS</div>

指定刷新指示器下显示的文字的颜色。

| 类型               |
| ------------------ |
| [color](colors.md) |
