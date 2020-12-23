---
id: activityindicator
title: ActivityIndicator
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

显示一个圆形的 loading 提示符号。

## 示例

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=ActivityIndicator%20Function%20Component%20Example
import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

const App = () => (
  <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator />
    <ActivityIndicator size="large" />
    <ActivityIndicator size="small" color="#0000ff" />
    <ActivityIndicator size="large" color="#00ff00" />
  </View>
);

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

</TabItem>
<TabItem value="classical">

```SnackPlayer name=ActivityIndicator%20Class%20Component%20Example
import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

class App extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator />
      <ActivityIndicator size="large" />
      <ActivityIndicator size="small" color="#0000ff" />
      <ActivityIndicator size="large" color="#00ff00" />
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

</TabItem>
</Tabs>

# 文档

## Props

### [View Props](view.md#props)

继承了所有的[View Props](view.md#props).

---

### `animating`

是否要显示指示器动画，默认为 true 表示显示，false 则隐藏。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `color`

滚轮的前景颜色。

| 类型            | 默认值                                                                                                                                                                           |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [color](colors) | `null` (系统默认的强调色)<div class="label android">Android</div><hr/><ins style={{background: '#999'}} className="color-box" />`'#999999'` <div className="label ios">iOS</div> |

---

### `hidesWhenStopped` <div class="label ios">iOS</div>

在`animating`为 false 的时候，是否要隐藏指示器（默认为 true）。如果`animating`和`hidesWhenStopped`都为 false，则显示一个静止的指示器。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |

---

### `size`

指示器的大小，默认为'small'。目前只能在 Android 上设定具体的数值。

| 类型                                                                           | 默认值    |
| ------------------------------------------------------------------------------ | --------- |
| enum(`'small'`, `'large'`)<hr/>number <div class="label android">Android</div> | `'small'` |
