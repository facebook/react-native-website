---
id: progressviewios
title: 🚧 ProgressViewIOS
---

> **已过时。** Use [@react-native-community/progress-view](https://github.com/react-native-community/progress-view) instead.

使用`ProgressViewIOS`来在 iOS 上渲染一个 UIProgressView。

### 示例

```SnackPlayer name=ProgressViewIOS&supportedPlatforms=ios
import React from 'react';
import {View, StyleSheet, ProgressViewIOS, Text} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.example}>
        <Text>Progress Bar - 0%</Text>
        <ProgressViewIOS style={styles.progress} />
      </View>
      <View style={styles.example}>
        <Text>Colored Progress Bar - 50%</Text>
        <ProgressViewIOS
          style={styles.progress}
          progressTintColor=""
          progress={0.5}
        />
      </View>
      <View>
        <Text>Progress Bar - 100%</Text>
        <ProgressViewIOS
          style={styles.progress}
          progressTintColor="black"
          progress={1}
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
    marginVertical: 20,
  },
  progress: {
    width: 200,
  },
});

export default App;
```

---

# 文档

## Props

### `progress`

当前的进度值（0 到 1 之间）。

| 类型   | 必需 |
| ------ | ---- |
| number | 否   |

---

### `progressImage`

一个可以拉伸的图片，用于显示进度条。

| 类型                   | 必需 |
| ---------------------- | ---- |
| Image.propTypes.source | 否   |

---

### `progressTintColor`

进度条本身染上的颜色。

| 类型   | 必需 |
| ------ | ---- |
| string | 否   |

---

### `progressViewStyle`

进度条的样式。

| 类型                   | 必需 |
| ---------------------- | ---- |
| enum('default', 'bar') | 否   |

---

### `trackImage`

一个可拉伸的图片，用于显示进度条后面的轨道。

| 类型                   | 必需 |
| ---------------------- | ---- |
| Image.propTypes.source | 否   |

---

### `trackTintColor`

进度条轨道染上的颜色。

| 类型   | 必需 |
| ------ | ---- |
| string | 否   |
