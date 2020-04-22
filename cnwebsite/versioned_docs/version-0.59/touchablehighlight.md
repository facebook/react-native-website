---
id: version-0.59-touchablehighlight
title: TouchableHighlight
original_id: touchablehighlight
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低，同时会有一个底层的颜色透过而被用户看到，使得视图变暗或变亮。

在底层实现上，实际会创建一个新的视图到视图层级中，如果使用的方法不正确，有时候会导致一些不希望出现的视觉效果。譬如没有给视图的 backgroundColor 显式声明一个不透明的颜色。

注意`TouchableHighlight`只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个 View 来包装它们。

例子：

```
renderButton: function() {
  return (
    <TouchableHighlight onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={require('./myButton.png')}
      />
    </TouchableHighlight>
  );
},
```

### 示例

```SnackPlayer
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  onPress = () => {
    this.setState({
      count: this.state.count+1
    })
  }

 render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
         style={styles.button}
         onPress={this.onPress}
        >
         <Text> Touch Here </Text>
        </TouchableHighlight>
        <View style={[styles.countContainer]}>
          <Text style={[styles.countText]}>
            { this.state.count !== 0 ? this.state.count: null}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})

AppRegistry.registerComponent('App', () => App)
```

### 查看 Props

- [TouchableWithoutFeedback props...](touchablewithoutfeedback.md#props)

* [`activeOpacity`](touchablehighlight.md#activeopacity)
* [`onHideUnderlay`](touchablehighlight.md#onhideunderlay)
* [`onShowUnderlay`](touchablehighlight.md#onshowunderlay)
* [`style`](touchablehighlight.md#style)
* [`underlayColor`](touchablehighlight.md#underlaycolor)
* [`hasTVPreferredFocus`](touchablehighlight.md#hastvpreferredfocus)
* [`tvParallaxProperties`](touchablehighlight.md#tvparallaxproperties)

---

# 文档

## Props

### `activeOpacity`

指定封装的视图在被触摸操作激活时以多少不透明度显示（0 到 1 之间，默认值为 0.85）。需要设置`underlayColor`。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `onHideUnderlay`

底层的颜色被隐藏的时候调用。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `onShowUnderlay`

当底层的颜色被显示的时候调用。

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `style`

| 类型       | 必填 |
| ---------- | ---- |
| View.style | 否   |

---

### `underlayColor`

有触摸操作时显示出来的底层的颜色。

| 类型               | 必填 |
| ------------------ | ---- |
| [color](colors.md) | 否   |

---

### `hasTVPreferredFocus`

_(Apple TV only)_ TV preferred focus (see documentation for the View component).

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

---

### `tvParallaxProperties`

_(Apple TV only)_ Object with properties to control Apple TV parallax effects.

enabled: If true, parallax effects are enabled. Defaults to true. shiftDistanceX: Defaults to 2.0. shiftDistanceY: Defaults to 2.0. tiltAngle: Defaults to 0.05. magnification: Defaults to 1.0. pressMagnification: Defaults to 1.0. pressDuration: Defaults to 0.3. pressDelay: Defaults to 0.0.

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| object | 否   | iOS  |
