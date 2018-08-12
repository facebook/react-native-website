---
id: version-0.55-maskedviewios
title: MaskedViewIOS
original_id: maskedviewios
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

渲染一个带蒙版的视图。蒙版元素在`maskElement`这个 prop 中指定。

## 示例

```
import React from 'react';
import { MaskedViewIOS, Text, View } from 'react-native';

class MyMaskedView extends React.Component {
  render() {
    return (
      // 决定蒙版的形状
      <MaskedViewIOS
        style={{ flex: 1, flexDirection: 'row', height: '100%' }}
        maskElement={
          <View style={{
            // 蒙版的效果与其本身透明度相反。先设置整个背景透明，表示完全盖住蒙版底下的元素，不显示出来。
            backgroundColor: 'transparent',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              fontSize: 60,
              // 文字不透明，表示文字部分盖住的元素会显示出来。
              color: 'black',
              fontWeight: 'bold',
            }}>
              Basic Mask
            </Text>
          </View>
        }
      >
        { /* 被盖在蒙版之下的元素。可以放置任意元素，例如图片等。 */ }
        <View style={{ flex: 1, height: '100%', backgroundColor: '#324376' }} />
        <View style={{ flex: 1, height: '100%', backgroundColor: '#F5DD90' }} />
        <View style={{ flex: 1, height: '100%', backgroundColor: '#F76C5E' }} />
      </MaskedViewIOS>
    );
  }
}
```

下面的截图分别演示了把`<View>`，`<Text>`以及`<Image>`放在蒙版下的效果。所以基本上你可以把任何组件放在蒙版下。

<center><img src="/docs/assets/MaskedViewIOS/example.png" width="200"></img></center>

**由`maskElement`所指定的视图的 alpha 通道值（透明度）决定了被盖住的视图可以透出的程度。** 完全不透明或部分透明的像素会使得蒙版下的内容显示出来，而完全透明的像素则会盖住蒙版下的内容。

### 查看 Props

* [View props...](view.md#props)

- [`maskElement`](maskedviewios.md#maskelement)

---

# 文档

## Props

### `maskElement`

| 类型    | 必填 |
| ------- | ---- |
| element | 是   |
