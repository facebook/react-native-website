---
id: version-0.62-refreshcontrol
title: RefreshControl
original_id: refreshcontrol
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

这一组件可以用在 ScrollView 或 FlatList 内部，为其添加下拉刷新的功能。当 ScrollView 处于竖直方向的起点位置（scrollY: 0），此时下拉会触发一个`onRefresh`事件。

## 示例

```SnackPlayer name=RefreshControl&supportedPlatforms=ios,android
import React from 'react';
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  Text,
  SafeAreaView,
} from 'react-native';
import Constants from 'expo-constants';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text>Pull down to see RefreshControl indicator</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
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

**注意：** `refreshing`是一个受控属性， 所以必须在`onRefresh`函数中设置为 true，否则 loading 指示器会立即停止。

---

# 文档

## Props

### `refreshing`

视图是否应该在刷新时显示指示器。

| 类型 | 必填 |
| ---- | ---- |
| bool | 是   |

---

### `onRefresh`

在视图开始刷新时调用。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `colors`

指定至少一种颜色用来绘制刷新指示器。

| 类型                        | 必填 | 平台    |
| --------------------------- | ---- | ------- |
| array of [color](colors.md) | 否   | Android |

---

### `enabled`

指定是否要启用刷新指示器。

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `progressBackgroundColor`

指定刷新指示器的背景色。

| 类型               | 必填 | 平台    |
| ------------------ | ---- | ------- |
| [color](colors.md) | 否   | Android |

---

### `progressViewOffset`

指定刷新指示器的垂直起始位置(top offset)。

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| number | 否   | Android |

---

### `size`

指定刷新指示器的大小，具体数值可参阅 RefreshControl.SIZE.

| 类型                                                                   | 必填 | 平台    |
| ---------------------------------------------------------------------- | ---- | ------- |
| enum(RefreshLayoutConsts.SIZE.DEFAULT, RefreshLayoutConsts.SIZE.LARGE) | 否   | Android |

---

### `tintColor`

指定刷新指示器的颜色。

| 类型               | 必填 | 平台 |
| ------------------ | ---- | ---- |
| [color](colors.md) | 否   | iOS  |

---

### `title`

指定刷新指示器下显示的文字。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| string | 否   | iOS  |

---

### `titleColor`

指定刷新指示器下显示的文字的颜色。

| 类型               | 必填 | 平台 |
| ------------------ | ---- | ---- |
| [color](colors.md) | 否   | iOS  |
