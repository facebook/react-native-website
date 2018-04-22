---
id: progressbarandroid
title: ProgressBarAndroid
---

Android-only React component used to indicate that the app is loading or there is some activity in the app.

Example:

```
import React, { Component } from "react";
import {
  ProgressBarAndroid,
  AppRegistry,
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

### Props

* [View props...](view.md#props)

- [`animating`](progressbarandroid.md#animating)
- [`color`](progressbarandroid.md#color)
- [`indeterminate`](progressbarandroid.md#indeterminate)
- [`progress`](progressbarandroid.md#progress)
- [`styleAttr`](progressbarandroid.md#styleattr)
- [`testID`](progressbarandroid.md#testid)

---

# 文档

## Props

### `animating`

Whether to show the ProgressBar (true, the default) or hide it (false).

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `color`

Color of the progress bar.

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `indeterminate`

If the progress bar will show indeterminate progress. Note that this can only be false if styleAttr is Horizontal.

| 类型              | 必填 |
| ----------------- | ---- |
| indeterminateType | 否   |

---

### `progress`

The progress value (between 0 and 1).

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `styleAttr`

Style of the ProgressBar. One of:

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

Used to locate this view in end-to-end tests.

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |
