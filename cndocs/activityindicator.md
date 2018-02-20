---
id: activityindicator
title: ActivityIndicator
---

显示一个圆形的 loading 提示符号。

### Example

```ReactNativeWebPlayer
import React, { Component } from 'react'
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native'

export default class App extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  }
})

AppRegistry.registerComponent('App', () => App)
```

### 查看属性

* [View props...](view.md#props)

- [`animating`](activityindicator.md#animating)
- [`color`](activityindicator.md#color)
- [`size`](activityindicator.md#size)
- [`hidesWhenStopped`](activityindicator.md#hideswhenstopped)

---

# 文档

## Props

### `animating`

是否要显示指示器动画，默认为 true 表示显示，false 则隐藏。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `color`

滚轮的前景颜色（默认为灰色）。

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
