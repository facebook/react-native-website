---
id: version-0.62-activityindicator
title: ActivityIndicator
original_id: activityindicator
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

显示一个圆形的 loading 提示符号。

### 示例

```SnackPlayer name=ActivityIndicator
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

export default App = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#0000ff" />
    <ActivityIndicator size="small" color="#00ff00" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
});
```

# 文档

## Props

继承了所有[View Props](view.md#props).

### `animating`

是否要显示指示器动画，默认为 true 表示显示，false 则隐藏。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `color`

滚轮的前景颜色（iOS上默认为灰色，安卓上默认为深绿色）。

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `size`

指示器的大小，默认为'small'。目前只能在 Android 上设定具体的数值。

| 类型                           | 必填 |
| ------------------------------ | ---- |
| enum('small', 'large'), number | 否   |

---

### `hidesWhenStopped`

在`animating`为 false 的时候，是否要隐藏指示器（默认为 true）。如果`animating`和`hidesWhenStopped`都为 false，则显示一个静止的指示器。

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |
