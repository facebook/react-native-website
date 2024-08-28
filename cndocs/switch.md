---
id: switch
title: Switch
---

跨平台通用的“开关”组件。

注意这是一个“受控组件”（controlled component）。你必须使用`onValueChange`回调来更新`value`属性以响应用户的操作。如果不更新`value`属性，组件只会按一开始给定的`value`值来渲染且保持不变，看上去就像完全点不动。

## 示例

```SnackPlayer name=Switch
import React, { useState } from "react";
import { View, Switch, StyleSheet } from "react-native";

const App = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
```

---

# 文档

## Props

### [View Props](view.md#props)

继承了所有的[View Props](view.md#props).

---

### `disabled`

如果为`true`则禁用此组件的交互。

| 类型 | Default |
| ---- | ------- |
| bool | `false` |

---

### `ios_backgroundColor` <div class="label ios">iOS</div>

在 iOS 上，自定义背景颜色。这种背景颜色可以在开关值为`false`时或开关被禁用（且开关呈半透明状态）时看到。

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `onChange`

当值改变的时候调用此回调函数，参数为事件。如果你只想接收新值，请改用 `onValueChange`。

| 类型     |
| -------- |
| function |

---

### `onValueChange`

当值改变的时候调用此回调函数，参数为新的值。如果你想接收一个完整事件，请使用 `onChange`。

| 类型     |
| -------- |
| function |

---

### `thumbColor`

开关上圆形按钮的背景颜色。在 iOS 上设置此颜色会丢失按钮的投影效果。

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `trackColor`

关闭状态时的边框颜色(iOS)或背景颜色(Android)。

_iOS_: 当开关值为 `false` 时，轨道会收缩到边框内。如果你想改变收缩后轨道露出的背景颜色，请使用 [`ios_backgroundColor`](switch.md#ios_backgroundColor)。

| Type                                                         |
| ------------------------------------------------------------ |
| `md object: {false: [color](colors), true: [color](colors)}` |

---

### `value`

表示此开关是否打开。默认为 false（关闭状态）。

| 类型 |
| ---- |
| bool |
