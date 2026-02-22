---
id: image-style-props
title: Image Style Props
---

## 示例

### 图片缩放模式

```SnackPlayer name=Image%20Resize%20Modes%20Example
import React from 'react';
import {View, Image, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const asset = require('@expo/snack-static/react-native-logo.png');

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Image style={[styles.image, {resizeMode: 'cover'}]} source={asset} />
          <Text style={styles.text}>resizeMode : cover</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'contain'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : contain</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'stretch'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : stretch</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'repeat'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : repeat</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {resizeMode: 'center'}]}
            source={asset}
          />
          <Text style={styles.text}>resizeMode : center</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 12,
    alignItems: 'center',
    gap: 16,
  },
  image: {
    borderWidth: 1,
    borderColor: 'red',
    height: 100,
    width: 200,
  },
  text: {
    textAlign: 'center',
    marginBottom: 12,
  },
});

export default DisplayAnImageWithStyle;
```

### 图片边框

```SnackPlayer name=Style%20BorderWidth%20and%20BorderColor%20Example
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          borderColor: 'red',
          borderWidth: 5,
          height: 100,
          width: 200,
        }}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Text>borderColor & borderWidth</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

### 图片圆角

```SnackPlayer name=Style%20Border%20Radius%20Example
import React from 'react';
import {View, Image, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const asset = require('@expo/snack-static/react-native-logo.png');

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View>
          <Image
            style={[styles.image, {borderTopRightRadius: 20}]}
            source={asset}
          />
          <Text>borderTopRightRadius</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {borderBottomRightRadius: 20}]}
            source={asset}
          />
          <Text>borderBottomRightRadius</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {borderBottomLeftRadius: 20}]}
            source={asset}
          />
          <Text>borderBottomLeftRadius</Text>
        </View>
        <View>
          <Image
            style={[styles.image, {borderTopLeftRadius: 20}]}
            source={asset}
          />
          <Text>borderTopLeftRadius</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderWidth: 1,
    borderColor: 'red',
    height: 100,
    width: 200,
  },
});

export default DisplayAnImageWithStyle;
```

### 图片着色

```SnackPlayer name=Style%20tintColor%20Function%20Component
import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const DisplayAnImageWithStyle = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          tintColor: '#000000',
          resizeMode: 'contain',
          height: 100,
          width: 200,
        }}
        source={require('@expo/snack-static/react-native-logo.png')}
      />
      <Text>tintColor</Text>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DisplayAnImageWithStyle;
```

# 参考文档

## Props

### `backfaceVisibility`

该属性定义旋转后的图片背面是否可见。

| 类型                          | 默认值      |
| ----------------------------- | ----------- |
| enum(`'visible'`, `'hidden'`) | `'visible'` |

---

### `backgroundColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderBottomLeftRadius`

| 类型   |
| ------ |
| number |

---

### `borderBottomRightRadius`

| 类型   |
| ------ |
| number |

---

### `borderColor`

| 类型               |
| ------------------ |
| [color](colors.md) |

---

### `borderRadius`

| 类型   |
| ------ |
| number |

---

### `borderTopLeftRadius`

| 类型   |
| ------ |
| number |

---

### `borderTopRightRadius`

| 类型   |
| ------ |
| number |

---

### `borderWidth`

| 类型   |
| ------ |
| number |

---

### `opacity`

设置图片的不透明度。数值应在 `0.0` 到 `1.0` 的范围内。

| 类型   | 默认值 |
| ------ | ------ |
| number | `1.0`  |

---

### `overflow`

| 类型                          | 默认值      |
| ----------------------------- | ----------- |
| enum(`'visible'`, `'hidden'`) | `'visible'` |

---

### `overlayColor` <div className="label android">Android</div>

当图片有圆角时，指定 `overlayColor` 会使圆角处的剩余空间填充为纯色。这在 Android 圆角实现不支持的场景中很有用：

- 某些缩放模式，如 `'contain'`
- 动画 GIF

此属性的典型用法是在纯色背景上显示图片，并将 `overlayColor` 设置为与背景相同的颜色。

有关底层工作原理的详细信息，请参阅 [Fresco 文档](https://frescolib.org/docs/rounded-corners-and-circles.html)。

| 类型   |
| ------ |
| string |

---

### `resizeMode`

决定当图片框架与原始图片尺寸不匹配时如何调整图片大小。默认为 `cover`。

- `cover`：等比缩放图片（保持图片宽高比），使得：
  - 图片的两个维度（宽和高）都等于或大于视图对应维度（减去内边距）
  - 缩放后图片的至少一个维度等于视图的对应维度（减去内边距）

- `contain`：等比缩放图片（保持图片宽高比），使得图片的两个维度（宽和高）都等于或小于视图对应维度（减去内边距）。

- `stretch`：独立缩放宽度和高度，这可能会改变图片的宽高比。

- `repeat`：重复图片以覆盖视图的整个框架。图片会保持其原始大小和宽高比，除非图片大于视图，此时会等比缩小以适应视图。

- `center`：在两个方向上将图片居中于视图。如果图片大于视图，则等比缩小以适应视图。

| 类型                                                              | 默认值    |
| ----------------------------------------------------------------- | --------- |
| enum(`'cover'`, `'contain'`, `'stretch'`, `'repeat'`, `'center'`) | `'cover'` |

---

### `objectFit`

决定当图片框架与原始图片尺寸不匹配时如何调整图片大小。

| 类型                                                   | 默认值    |
| ------------------------------------------------------ | --------- |
| enum(`'cover'`, `'contain'`, `'fill'`, `'scale-down'`) | `'cover'` |

---

### `tintColor`

将所有非透明像素的颜色更改为 tintColor。

| 类型               |
| ------------------ |
| [color](colors.md) |
