---
id: progressbarandroid
title: 🚧 ProgressBarAndroid
---

> **Deprecated.** Use [@react-native-community/progress-bar-android](https://github.com/react-native-community/react-native-progress-bar-android) instead.

封装了Android平台上的`ProgressBar`的React组件。这个组件可以用来表示应用正在加载或者有些事情正在进行中。

例子：

```
import React, { Component } from "react";
import {
  ProgressBarAndroid,
  StyleSheet,
  View
} from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ProgressBarAndroid />
        <ProgressBarAndroid styleAttr="Horizontal" />
        <ProgressBarAndroid styleAttr="Horizontal" color="#2196F3" />
        <ProgressBarAndroid
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    padding: 10
  }
});
```

---

# 文档

## Props

### `animating`

是否显示进度条（默认为true显示）。

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

决定进度条是否要显示一个不确定的进度。注意这个在styleAttr是Horizontal的时候必须是false，并且需要设置`progress`值。

| 类型              | 必填 |
| ----------------- | ---- |
| indeterminateType | 否   |

---

### `progress`

当前的进度值（在0到1之间）。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `styleAttr`

进度条的样式。可取值有：

* Horizontal
* Normal (default)
* Small
* Large
* Inverse
* SmallInverse
* LargeInverse

| 类型                                                                                      | 必填 |
| ----------------------------------------------------------------------------------------- | ---- |
| enum('Horizontal', 'Normal', 'Small', 'Large', 'Inverse', 'SmallInverse', 'LargeInverse') | 否   |

---

### `testID`

用来在端到端测试中定位这个视图。

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |
