---
id: version-0.63-activityindicator
title: ActivityIndicator
original_id: activityindicator
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

显示一个圆形的 loading 提示符号。

## 示例

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      函数组件示例
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class组件示例
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=ActivityIndicator%20Function%20Component%20Example
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const App = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
      <ActivityIndicator size="small" color="#00ff00" />
      <ActivityIndicator size="large" color="#0000ff" />
      <ActivityIndicator size="small" color="#00ff00" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default App;
```

<block class="classical syntax" />

```SnackPlayer name=ActivityIndicator%20Class%20Component%20Example
import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

class App extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default App;
```

<block class="endBlock syntax" />

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

滚轮的前景颜色（iOS 上默认为灰色，安卓上默认为深绿色）。

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
