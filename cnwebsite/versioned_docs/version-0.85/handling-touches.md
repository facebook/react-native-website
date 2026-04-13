---
id: handling-touches
title: 处理触摸事件
---

移动应用上的用户交互基本靠“摸”。当然，“摸”也是有各种姿势的：在一个按钮上点击，在一个列表上滑动，或是在一个地图上缩放。React Native 提供了可以处理常见触摸手势（例如点击或滑动）的组件， 以及可用于识别更复杂的手势的完整的[手势响应系统](gesture-responder-system.md)。

## 显示一个简单的按钮

[Button](button.md)是一个简单的跨平台的按钮组件。下面是一个最简示例：

```tsx
<Button
  onPress={() => {
    console.log('You tapped the button!');
  }}
  title="Press Me"
/>
```

上面这段代码会在 iOS 上渲染一个蓝色的标签状按钮，在 Android 上则会渲染一个蓝色圆角矩形带白字的按钮。点击这个按钮会调用"onPress"函数，具体作用就是显示一个 alert 弹出框。你还可以指定"color"属性来修改按钮的颜色。

![](/docs/assets/Button.png)

再试试下面这个使用`Button`的例子吧。你可以点击"Tap to Play"来预览真实效果。

```SnackPlayer name=Button%20Basics
import React from 'react';
import {Alert, Button, StyleSheet, View} from 'react-native';

const ButtonBasics = () => {
  const onPress = () => {
    Alert.alert('You tapped the button!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Press Me" />
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={onPress} title="Press Me" color="#841584" />
      </View>
      <View style={styles.alternativeLayoutButtonContainer}>
        <Button onPress={onPress} title="This looks great!" />
        <Button onPress={onPress} title="OK!" color="#841584" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20,
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ButtonBasics;

```

## Touchable 系列组件

这个组件的样式是固定的。所以如果它的外观并不怎么搭配你的设计，那就需要使用`TouchableOpacity`或是`TouchableNativeFeedback`组件来定制自己所需要的按钮，视频教程[如何制作一个按钮](http://v.youku.com/v_show/id_XMTQ5OTE3MjkzNg==.html?f=26822355&from=y1.7-1.3)讲述了完整的过程。或者你也可以在 github.com 网站上搜索 'react native button' 来看看社区其他人的作品。

具体使用哪种组件，取决于你希望给用户什么样的视觉反馈：

- 一般来说，你可以使用[**TouchableHighlight**](touchablehighlight.md)来制作按钮或者链接。注意此组件的背景会在用户手指按下时变暗。

- 在 Android 上还可以使用[**TouchableNativeFeedback**](touchablenativefeedback.md)，它会在用户手指按下时形成类似墨水涟漪的视觉效果。

- [**TouchableOpacity**](touchableopacity.md)会在用户手指按下时降低按钮的透明度，而不会改变背景的颜色。

- 如果你想在处理点击事件的同时不显示任何视觉反馈，则需要使用[**TouchableWithoutFeedback**](touchablewithoutfeedback.md)。

某些场景中你可能需要检测用户是否进行了长按操作。可以在上面列出的任意组件中使用`onLongPress`属性来实现。

我们来看一下示例：

```SnackPlayer name=Touchables
import React from 'react';
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Touchables = () => {
  const onPressButton = () => {
    Alert.alert('You tapped the button!');
  };

  const onLongPressButton = () => {
    Alert.alert('You long-pressed the button!');
  };

  return (
    <View style={styles.container}>
      <TouchableHighlight onPress={onPressButton} underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableHighlight</Text>
        </View>
      </TouchableHighlight>
      <TouchableOpacity onPress={onPressButton}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableOpacity</Text>
        </View>
      </TouchableOpacity>
      <TouchableNativeFeedback
        onPress={onPressButton}
        background={
          Platform.OS === 'android'
            ? TouchableNativeFeedback.SelectableBackground()
            : undefined
        }>
        <View style={styles.button}>
          <Text style={styles.buttonText}>
            TouchableNativeFeedback{' '}
            {Platform.OS !== 'android' ? '(Android only)' : ''}
          </Text>
        </View>
      </TouchableNativeFeedback>
      <TouchableWithoutFeedback onPress={onPressButton}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>TouchableWithoutFeedback</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableHighlight
        onPress={onPressButton}
        onLongPress={onLongPressButton}
        underlayColor="white">
        <View style={styles.button}>
          <Text style={styles.buttonText}>Touchable with Long Press</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center',
  },
  button: {
    marginBottom: 30,
    width: 260,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});

export default Touchables;
```

## 滚动和滑动

触摸屏设备上常用的手势包括滑动和平移。这些手势允许用户在列表中滚动或在页面之间滑动。对于这些操作，请查看 [ScrollView](scrollview.md) 核心组件。

## Known issues

- [react-native#29308](https://github.com/facebook/react-native/issues/29308#issuecomment-792864162): The touch area never extends past the parent view bounds and on Android negative margin is not supported.
