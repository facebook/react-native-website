---
id: checkbox
title: 🚧 CheckBox
---

> **已过时。** Use [@react-native-community/checkbox](https://github.com/react-native-community/react-native-checkbox) instead.

渲染一个单选框（目前仅 Android 可用）。

This is a controlled component that requires an `onValueChange` callback that updates the `value` prop in order for the component to reflect user actions. If the `value` prop is not updated, the component will continue to render the supplied `value` prop instead of the expected result of any user actions.

## 示例

```SnackPlayer name=CheckBox%20Component%20Example&supportedPlatforms=android,web
import React, { useState } from "react";
import { CheckBox, Text, StyleSheet, View } from "react-native";
const App = () => {
  const [isSelected, setSelection] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Do you like React Native?</Text>
      </View>
      <Text>Is CheckBox selected: {isSelected ? "👍" : "👎"}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
export default App;
```

---

# 文档

## Props

继承所有[View 的 Props](view#props).

### `disabled`

If true the user won't be able to toggle the checkbox. Default value is `false`.

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `onChange`

Used in case the props change removes the component.

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `onValueChange`

Invoked with the new value when the value changes.

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `testID`

用来在端到端测试中定位此视图。

| 类型   | 必需 |
| ------ | ---- |
| string | 否   |

---

### `value`

The value of the checkbox. If true the checkbox will be turned on. Default value is `false`.

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)
