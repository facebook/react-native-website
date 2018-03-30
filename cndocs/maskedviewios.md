---
id: maskedviewios
title: MaskedViewIOS
---

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

The following image demonstrates that you can put almost anything behind the mask. The three examples shown are masked `<View>`, `<Text>`, and `<Image>`.

<center><img src="assets/MaskedViewIOS/example.png" width="200"></img></center>

**The alpha channel of the view rendered by the `maskElement` prop determines how much of the view's content and background shows through.** Fully or partially opaque pixels allow the underlying content to show through but fully transparent pixels block that content.

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
