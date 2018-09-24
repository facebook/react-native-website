---
id: version-0.57-touchableopacity
title: TouchableOpacity
original_id: touchableopacity
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低。

不透明度的变化是通过把子元素封装在一个`Animated.View`中来实现的，这个动画视图会被添加到视图层级中，少数情况下有可能会影响到布局。（译注：此组件与TouchableHighlight的区别在于并没有额外的颜色变化，更适于一般场景。）

例子：

```
renderButton: function() {
  return (
    <TouchableOpacity onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={require('./myButton.png')}
      />
    </TouchableOpacity>
  );
},
```

### 示例

```ReactNativeWebPlayer
import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
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
       <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
       >
         <Text> Touch Here </Text>
       </TouchableOpacity>
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

### 查看Props

* [TouchableWithoutFeedback props...](touchablewithoutfeedback.md#props)

- [`activeOpacity`](touchableopacity.md#activeopacity)
- [`tvParallaxProperties`](touchableopacity.md#tvparallaxproperties)
- [`hasTVPreferredFocus`](touchableopacity.md#hastvpreferredfocus)

### 查看方法

* [`setOpacityTo`](touchableopacity.md#setopacityto)

---

# 文档

## Props

### `activeOpacity`

指定封装的视图在被触摸操作激活时以多少不透明度显示（0到1之间）。默认值为0.2。

| 类型   | 必填 |
| ------ | ---- |
| number | 否   |

---

### `tvParallaxProperties`

_(Apple TV only)_ Object with properties to control Apple TV parallax effects.

enabled: If true, parallax effects are enabled. Defaults to true. shiftDistanceX: Defaults to 2.0. shiftDistanceY: Defaults to 2.0. tiltAngle: Defaults to 0.05. magnification: Defaults to 1.0. pressMagnification: Defaults to 1.0. pressDuration: Defaults to 0.3. pressDelay: Defaults to 0.0.

| 类型   | 必填 | 平台 |
| ------ | ---- | ---- |
| object | 否   | iOS  |

---

### `hasTVPreferredFocus`

_(Apple TV only)_ TV preferred focus (see documentation for the View component).

| 类型 | 必填 | 平台 |
| ---- | ---- | ---- |
| bool | 否   | iOS  |

## 方法

### `setOpacityTo()`

```javascript
setOpacityTo((value: number), (duration: number));
```

将本组件的不透明度设为指定值（伴有过渡动画）。
