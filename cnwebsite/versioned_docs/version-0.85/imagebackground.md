---
id: imagebackground
title: ImageBackground
---

对于熟悉 Web 开发的开发人员来说，`background-image`是一个常见的功能请求。为了处理这种情况，您可以使用`<ImageBackground>`组件，它具有与`<Image>`相同的属性，并且可以添加任何子元素以覆盖在其上面。

在某些情况下，您可能不想使用`<ImageBackground>`，因为其实现比较基础。请参考`<ImageBackground>`的[源代码](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Image/ImageBackground.js)以获取更多信息，并在需要时创建自己的自定义组件。

请注意，您必须指定一些宽度和高度样式属性。

## 示例

```SnackPlayer name=ImageBackground&dependencies=react-native-safe-area-context
import React from 'react';
import {ImageBackground, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Inside</Text>
      </ImageBackground>
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;
```

---

# 文档

## Props

### [Image Props](image.md#props)

继承 [Image Props](image.md#props).

---

### `imageStyle`

| 类型                                |
| ----------------------------------- |
| [Image Style](image-style-props.md) |

---

### `imageRef`

一个 ref 设置函数，在内部 `Image` 组件挂载时会被赋值为其 [元素节点](element-nodes)。

---

### `style`

| 类型                              |
| --------------------------------- |
| [View Style](view-style-props.md) |
