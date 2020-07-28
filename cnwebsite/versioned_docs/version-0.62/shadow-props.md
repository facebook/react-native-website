---
id: version-0.62-shadow-props
title: 阴影样式属性
original_id: shadow-props
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

```SnackPlayer name=Shadow%20Props&supportedPlatforms=ios
import React, { useState } from "react";
import { Text, View, StyleSheet, Slider } from "react-native";

const ShadowPropSlider = ({ label, value, ...props }) => {
  return (
    <>
      <Text>
        {label} ({value.toFixed(2)})
      </Text>
      <Slider step={1} value={value} {...props} />
    </>
  );
}

const App = () => {
  const [shadowOffsetWidth, setShadowOffsetWidth] = useState(0);
  const [shadowOffsetHeight, setShadowOffsetHeight] = useState(0);
  const [shadowRadius, setShadowRadius] = useState(0);
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.square,
          {
            shadowOffset: {
              width: shadowOffsetWidth,
              height: -shadowOffsetHeight
            },
            shadowOpacity,
            shadowRadius
          }
        ]}
      />
      <View style={styles.controls}>
        <ShadowPropSlider
          label="shadowOffset - X"
          minimumValue={-50}
          maximumValue={50}
          value={shadowOffsetWidth}
          onValueChange={val => setShadowOffsetWidth(val)}
        />
        <ShadowPropSlider
          label="shadowOffset - Y"
          minimumValue={-50}
          maximumValue={50}
          value={shadowOffsetHeight}
          onValueChange={val => setShadowOffsetHeight(val)}
        />
        <ShadowPropSlider
          label="shadowRadius"
          minimumValue={0}
          maximumValue={100}
          value={shadowRadius}
          onValueChange={val => setShadowRadius(val)}
        />
        <ShadowPropSlider
          label="shadowOpacity"
          minimumValue={0}
          maximumValue={1}
          step={0.05}
          value={shadowOpacity}
          onValueChange={val => setShadowOpacity(val)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  square: {
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 4,
    height: 150,
    shadowColor: "black",
    width: 150
  },
  controls: {
    paddingHorizontal: 12
  }
});

export default App;
```

# 文档

These properties are iOS only - for similar functionality on Android, use the [`elevation` property](view-style-props#elevation).

## Props

### `shadowColor`

设置阴影色。

| 类型               | 必填 | 平台 |
| ------------------ | ---- | ---- |
| [color](colors.md) | 否   | iOS  |

---

### `shadowOffset`

设置阴影偏移量。

| 类型                                   | 必填 | 平台 |
| -------------------------------------- | ---- | ---- |
| object: {width: number,height: number} | 否   | iOS  |

---

### `shadowOpacity`

设置阴影不透明度 (乘以颜色的 alpha 分量)。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| number | 否   | iOS  |

---

### `shadowRadius`

设置阴影模糊半径。

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| number | 否   | iOS  |
