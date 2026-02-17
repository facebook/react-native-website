---
id: activityindicator
title: ActivityIndicator
---

显示一个圆形的加载指示器。

## 示例

```SnackPlayer name=ActivityIndicator%20Example
import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
      <ActivityIndicator size="large" />
      <ActivityIndicator size="small" color="#0000ff" />
      <ActivityIndicator size="large" color="#00ff00" />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default App;
```

# 文档

## Props

### [View Props](view#props)

继承了所有 [View Props](view#props)。

---

### `animating`

是否显示指示器动画。`true` 表示显示，`false` 表示隐藏。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `color`

滚轮的前景颜色。

| 类型            | 默认值                                                                                                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [color](colors) | `null`（系统默认强调色）<div className="label android">Android</div><hr/><ins style={{background: '#999'}} className="color-box" />`'#999999'` <div className="label ios">iOS</div> |

---

### `hidesWhenStopped` <div className="label ios">iOS</div>

在 `animating` 为 false 的时候，是否隐藏指示器（默认为 true）。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `ref`

一个 ref 设置函数，在挂载时会被赋值为一个[元素节点](element-nodes)。

---

### `size`

指示器的大小，默认为 `'small'`。目前只能在 Android 上设定具体的数值。

| 类型                                                                               | 默认值    |
| ---------------------------------------------------------------------------------- | --------- |
| enum(`'small'`, `'large'`)<hr/>number <div className="label android">Android</div> | `'small'` |
