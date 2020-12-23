---
id: version-0.55-button
title: Button
original_id: button
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

一个简单的跨平台的按钮组件。可以进行一些简单的定制。

<center><img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/buttonExample.png"></img></center>

这个组件的样式是固定的。所以如果它的外观并不怎么搭配你的设计，那你需要使用`TouchableOpacity`或是`TouchableNativeFeedback`组件来定制自己所需要的按钮，视频教程[如何制作一个按钮](http://v.youku.com/v_show/id_XMTQ5OTE3MjkzNg==.html?f=26822355&from=y1.7-1.3)讲述了完整的过程。或者你也可以在 github.com 网站上搜索 'react native button' 来看看社区其他人的作品。

示例：

```
import { Button } from 'react-native';
...

<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

### 查看 Props

- [`onPress`](button.md#onpress)
- [`title`](button.md#title)
- [`accessibilityLabel`](button.md#accessibilitylabel)
- [`color`](button.md#color)
- [`disabled`](button.md#disabled)
- [`testID`](button.md#testid)
- [`hasTVPreferredFocus`](button.md#hastvpreferredfocus)

---

# 文档

## Props

### `onPress`

用户点击此按钮时所调用的处理函数

| 类型     | 必填 |
| -------- | ---- |
| function | 是   |

---

### `title`

按钮内显示的文本

| 类型   | 必填 |
| ------ | ---- |
| string | 是   |

---

### `accessibilityLabel`

用于给残障人士显示的文本（比如读屏应用可能会读取这一内容）

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `color`

文本的颜色(iOS)，或是按钮的背景色(Android)

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `disabled`

设置为 true 时此按钮将不可点击。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `testID`

用来在端到端测试中定位此视图。

| 类型   | 必填 |
| ------ | ---- |
| string | 否   |

---

### `hasTVPreferredFocus`

_(Apple TV only)_ TV preferred focus (see documentation for the View component).

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |
