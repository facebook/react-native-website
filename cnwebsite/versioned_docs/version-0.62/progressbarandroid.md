---
id: version-0.62-progressbarandroid
title: 🚧 ProgressBarAndroid
original_id: progressbarandroid
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

> **Deprecated.** Use [@react-native-community/progress-bar-android](https://github.com/react-native-community/progress-bar-android) instead.

封装了 Android 平台上的`ProgressBar`的 React 组件。这个组件可以用来表示应用正在加载或者有些事情正在进行中。

### 示例

```SnackPlayer name=ProgressBarAndroid&supportedPlatforms=android
import React from 'react';
import {View, StyleSheet, ProgressBarAndroid, Text} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.example}>
        <Text>Circle Progress Indicator</Text>
        <ProgressBarAndroid />
      </View>
      <View style={styles.example}>
        <Text>Horizontal Progress Indicator</Text>
        <ProgressBarAndroid styleAttr="Horizontal" />
      </View>
      <View style={styles.example}>
        <Text>Colored Progress Indicator</Text>
        <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
      </View>
      <View style={styles.example}>
        <Text>Fixed Progress Value</Text>
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  example: {
    marginVertical: 24,
  },
});

export default App;
```

---

# 文档

## Props

### `animating`

是否显示进度条（默认为 true 显示）。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `color`

进度条的颜色。

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `indeterminate`

决定进度条是否要显示一个不确定的进度。注意这个在 styleAttr 是 Horizontal 的时候必须是 false，并且需要设置`progress`值。

| 类型              | 必填 |
| ----------------- | ---- |
| indeterminateType | 否   |

---

### `progress`

当前的进度值（在 0 到 1 之间）。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `styleAttr`

进度条的样式。可取值有：

- Horizontal
- Normal (default)
- Small
- Large
- Inverse
- SmallInverse
- LargeInverse

| 类型                                                                                      | 必填 |
| ----------------------------------------------------------------------------------------- | ---- |
| enum('Horizontal', 'Normal', 'Small', 'Large', 'Inverse', 'SmallInverse', 'LargeInverse') | 否   |

---

### `testID`

用来在端到端测试中定位这个视图。

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |
