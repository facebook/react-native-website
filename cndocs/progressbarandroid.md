---
id: progressbarandroid
title: '🗑️ ProgressBarAndroid'
---

:::warning Deprecated
Use one of the [community packages](https://reactnative.directory/?search=progressbar) instead.
:::

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
};

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

继承 [View Props](view.md#props).

### `animating`

是否显示进度条（默认为 true 显示）。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `color`

进度条的颜色。

| 类型               | 必需 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `indeterminate`

决定进度条是否要显示一个不确定的进度。注意这个在 styleAttr 是 Horizontal 的时候必须是 false，并且需要设置`progress`值。

| 类型              | 必需 |
| ----------------- | ---- |
| indeterminateType | 否   |

---

### `progress`

当前的进度值（在 0 到 1 之间）。

| 类型   | 必需 |
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

| 类型                                                                                      | 必需 |
| ----------------------------------------------------------------------------------------- | ---- |
| enum('Horizontal', 'Normal', 'Small', 'Large', 'Inverse', 'SmallInverse', 'LargeInverse') | 否   |

---

### `testID`

用来在端到端测试中定位这个视图。

| 类型   | 必需 |
| ------ | ---- |
| string | 否   |
