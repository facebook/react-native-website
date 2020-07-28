---
id: version-0.63-view-style-props
title: View样式属性
original_id: view-style-props
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(99.62%), [yahoo.007](https://github.com/search?q=yahoo.007%40163.com&type=Users)(0.38%)

### 示例

```SnackPlayer name=ViewStyleProps
import React from "react";
import { View, StyleSheet } from "react-native";
const ViewStyleProps = () => {
    return (
      <View style={styles.container}>
        <View style={styles.top} />
        <View style={styles.middle} />
        <View style={styles.bottom} />
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
  },
  top: {
    flex: 0.3,
    backgroundColor: "grey",
    borderWidth: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  middle: {
    flex: 0.3,
    backgroundColor: "beige",
    borderWidth: 5,
  },
  bottom: {
    flex: 0.3,
    backgroundColor: "pink",
    borderWidth: 5,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});
export default ViewStyleProps;
```

# 文档

## Props

### `borderRightColor`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `backfaceVisibility`

| 类型                      | 必填 |
| ------------------------- | ---- |
| enum('visible', 'hidden') | 否   |

---

### `borderBottomColor`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `borderBottomEndRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderBottomLeftRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderBottomRightRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderBottomStartRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderBottomWidth`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderColor`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `borderEndColor`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `borderLeftColor`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `borderLeftWidth`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `backgroundColor`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `borderRightWidth`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderStartColor`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `borderStyle`

| 类型                              | 必填 |
| --------------------------------- | ---- |
| enum('solid', 'dotted', 'dashed') | 否   |

---

### `borderTopColor`

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `borderTopEndRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderTopLeftRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderTopRightRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderTopStartRadius`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderTopWidth`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `borderWidth`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `opacity`

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `elevation`

(限 Android)使用 Android 原生的 elevation API 来设置视图的高度（ [elevation API](https://developer.android.com/training/material/shadows-clipping.html#Elevation)）。这样可以为视图添加一个投影，并且会影响视图层叠的顺序。此属性仅支持 Android5.0 及以上版本。

| 类型   | 必填 | 平台    |
| ------ | ---- | ------- |
| number | 否   | Android |
