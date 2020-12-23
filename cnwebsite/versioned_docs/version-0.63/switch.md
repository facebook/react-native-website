---
id: switch
title: Switch
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

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

Inherits [View Props](view#props).

### `disabled`

如果为`true`则禁用此组件的交互。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `trackColor`

开启状态时的背景颜色。

_iOS_: when the switch value is false, the track shrinks into the border. If you want to change the color of the background exposed by the shrunken track, use [`ios_backgroundColor`](switch.md#ios_backgroundColor).

| 类型                                                          | 必填 |
| ------------------------------------------------------------- | ---- |
| object: {false: [color](colors.md), true: [color](colors.md)} | 否   |

---

### `ios_backgroundColor`

On iOS, custom color for the background. This background color can be seen either when the switch value is false or when the switch is disabled (and the switch is translucent).

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `onValueChange`

当值改变的时候调用此回调函数，参数为新的值。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `testID`

用来在端到端测试中定位此视图。

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `thumbColor`

开关上圆形按钮的背景颜色。在 iOS 上设置此颜色会丢失按钮的投影。

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `tintColor`

`tintColor` is deprecated, use `trackColor` instead.

关闭状态时的边框颜色(iOS)或背景颜色(Android)。

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `value`

表示此开关是否打开。默认为 false（关闭状态）。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |
