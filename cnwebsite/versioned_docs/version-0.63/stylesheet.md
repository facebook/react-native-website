---
id: stylesheet
title: StyleSheet
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

StyleSheet 提供了一种类似 CSS 样式表的抽象。

```SnackPlayer name=StyleSheet
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => (
  <View style={styles.container}>
    <Text style={styles.title}>React Native</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});

export default App;
```

从代码质量角度：

- 从渲染函数中移除具体的样式内容，可以使代码更清晰易读。
- 给样式命名也可以对渲染函数中的组件增加语义化的描述。

---

# 文档

## 方法

### `compose()`

```jsx
static compose(style1: object, style2: object): object | array<object>
```

Combines two styles such that `style2` will override any styles in `style1`. If either style is falsy, the other one is returned without allocating an array, saving allocations and maintaining reference equality for PureComponent checks.

```SnackPlayer name=Compose
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => (
  <View style={container}>
    <Text style={text}>React Native</Text>
  </View>
);

const page = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 30,
    color: '#000'
  },
});

const lists = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#61dafb',
  },
  listItem: {
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
});

const container = StyleSheet.compose(page.container, lists.listContainer);
const text = StyleSheet.compose(page.text, lists.listItem);

export default App;
```

---

### `create()`

```jsx
static create(obj: object): object
```

Creates a StyleSheet style reference from the given object.

---

### `flatten()`

```jsx
static flatten(style: array<object>): object
```

Flattens an array of style objects, into one aggregated style object. Alternatively, this method can be used to lookup IDs, returned by `StyleSheet.register`.

> **NOTE:** Exercise caution as abusing this can tax you in terms of optimizations. IDs enable optimizations through the bridge and memory in general. Referring to style objects directly will deprive you of these optimizations.

```SnackPlayer name=Flatten
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => (
  <View style={page.container}>
    <Text style={flattenStyle}>React Native</Text>
    <Text>Flatten Style</Text>
    <Text style={page.code}>
      {JSON.stringify(flattenStyle, null, 2)}
    </Text>
  </View>
);

const page = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center"
  },
  text: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold"
  },
  code: {
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    color: "#666",
    backgroundColor: "#eaeaea"
  }
});

const typography = StyleSheet.create({
  header: {
    color: "#61dafb",
    fontSize: 30,
    marginBottom: 36
  }
});

const flattenStyle = StyleSheet.flatten([
  page.text,
  typography.header
]);

export default App;
```

This method internally uses `StyleSheetRegistry.getStyleByID(style)` to resolve style objects represented by IDs. Thus, an array of style objects (instances of `StyleSheet.create()`), are individually resolved to, their respective objects, merged as one and then returned. This also explains the alternative use.

---

### `setStyleAttributePreprocessor()`

```jsx
static setStyleAttributePreprocessor(property, process)
```

WARNING: EXPERIMENTAL. Breaking changes will probably happen a lot and will not be reliably announced. The whole thing might be deleted, who knows? Use at your own risk.

Sets a function to use to pre-process a style property value. This is used internally to process color and transform values. You should not use this unless you really know what you are doing and have exhausted other options.

## 常量

### `absoluteFill`

A very common pattern is to create overlays with position absolute and zero positioning (`position: 'absolute', left: 0, right: 0, top: 0, bottom: 0`), so `absoluteFill` can be used for convenience and to reduce duplication of these repeated styles. If you want, absoluteFill can be used to create a customized entry in a StyleSheet, e.g.:

```SnackPlayer name=absoluteFill
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <View style={styles.box1}>
      <Text style={styles.text}>1</Text>
    </View>
    <View style={styles.box2}>
      <Text style={styles.text}>2</Text>
    </View>
    <View style={styles.box3}>
      <Text style={styles.text}>3</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  box2: {
    ...StyleSheet.absoluteFill,
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  },
  box3: {
    position: 'absolute',
    top: 120,
    left: 120,
    width: 100,
    height: 100,
    backgroundColor: 'green'
  },
  text: {
    color: '#FFF',
    fontSize: 80
  }
});

export default App;
```

---

### `absoluteFillObject`

Sometimes you may want `absoluteFill` but with a couple tweaks - `absoluteFillObject` can be used to create a customized entry in a `StyleSheet`, e.g.:

```SnackPlayer name=absoluteFillObject
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const App = () => (
  <View style={styles.container}>
    <View style={styles.box1}>
      <Text style={styles.text}>1</Text>
    </View>
    <View style={styles.box2}>
      <Text style={styles.text}>2</Text>
    </View>
    <View style={styles.box3}>
      <Text style={styles.text}>3</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  box1: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 100,
    height: 100,
    backgroundColor: 'red'
  },
  box2: {
    ...StyleSheet.absoluteFill,
    top: 120,
    left: 50,
    width: 100,
    height: 100,
    backgroundColor: 'blue'
  },
  box3: {
    ...StyleSheet.absoluteFillObject,
    top: 120,
    left: 120,
    width: 100,
    height: 100,
    backgroundColor: 'green'
  },
  text: {
    color: '#FFF',
    fontSize: 80
  }
});

export default App;
```

---

### `hairlineWidth`

```SnackPlayer name=hairlineWidth
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const App = () => (
  <View style={styles.container}>
    <Text style={styles.row}>React</Text>
    <Text style={styles.row}>Native</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24
  },
  row: {
    padding: 4,
    borderBottomColor: "red",
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});

export default App;
```

这一常量始终是一个整数的像素值（线看起来会像头发丝一样细），并会尽量符合当前平台最细的线的标准。可以用作边框或是两个元素间的分隔线。然而，你不能把它“视为一个常量”，因为不同的平台和不同的屏幕像素密度会导致不同的结果。

如果模拟器缩放过，可能会看不到这么细的线。

---

## `absoluteFill` vs. `absoluteFillObject`

Currently, there is no difference between using `absoluteFill` vs. `absoluteFillObject`.
