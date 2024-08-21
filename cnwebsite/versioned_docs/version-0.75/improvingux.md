---
id: improvingux
title: 改进用户体验
---


## 配置文本输入

由于触屏手机的小屏幕和软键盘，使得在手机中输入文本成为一件具有挑战的事情。 但是你可以基于你需要的数据配置文本输入让这个过程变得简单。

- 自动对焦( focus )第一个文本域
- 使用placeholder 作为预想的输入格式
- 启用 或者 禁用 自动大写、自动校正
- 选择键盘类型 【例如 email, 数字(numeric)】
- 确保回车按钮对焦到下一个域或者提交表单 
- 查看 [`TextInput` 文档](textinput.md) 了解更多配置信息

<video src="/react-native/img/textinput.mp4" muted autoplay loop width="320" height="430"></video>
[Try it on your phone](https://snack.expo.io/H1iGt2vSW)



## 键盘隐藏时的布局管理

软键盘几乎占用将近一半的手机屏幕。 如果你有会被软键盘覆盖的交互式组件，请使用[`KeyboardAvoidingView` 组件]以确保他们可以在打开键盘时可以被访问。
<video src="/react-native/img/keyboardavoidingview.mp4" muted autoplay loop width="320" height="448"></video>
[Try it on your phone](https://snack.expo.io/ryxRkwnrW)


## 放大可触控区域

在手机上精准的点击一个按钮是很困难的一件事。 确保所有交互式元素大于等于44x44。 常见的撑大尺寸的做法有：使用 `padding`, `minWidth` 和 `minHeight` 样式。 
或者， 可以使用 [`hitSlop` 属性](touchablewithoutfeedback.md#hitslop)  无需影响布局来增加可交互区域。 这是一个演示：
<video src="/react-native/img/hitslop.mp4" muted autoplay loop width="320" height="120"></video>

[Try it on your phone](https://snack.expo.io/rJPwCt4HZ)


## 使用 Android 水波纹效果

安卓 API 21+ 使用 material design Ripple 在用户点击屏幕上可交互区域的时候为用户提供反馈。 React Native 利用[`TouchableNativeFeedback` 组件](touchablenativefeedback.md) 实现了这个功能。 使用这个触摸效果取代 opacity 或者 highlight 通常会让您的应用程序更加切合平台。 尽管如此， 还是需要注意这个组件在 IOS 平台上 或者在 Android API 小于21下无法工作的情况，所以你需要退而求其次，在IOS上使用其他的可触控组件，可以使用诸如 [react-native-platform-touchable](https://github.com/react-community/react-native-platform-touchable) 的组件解决平台差异。


## 屏幕的旋转锁定

一般情况下 多屏幕(指的是横向和纵向) 会正常显示，除非你使用`Dimensions` API 并且 不处理 方向改变事件 (orientation changes)。 如果你不想做多屏幕方向支持，你可以锁定屏幕方向为 横向 或者纵向。

On iOS, in the General tab and Deployment Info section of Xcode enable the Device Orientation you want to support (ensure you have selected iPhone from the Devices menu when making the changes)。

对于安卓， 打开 AndroidManifest.xml 文件 并且在 Activity 元素中添加 `'android:screenOrientation="portrait"'` 以锁定屏幕为纵向， 或者使用`'android:screenOrientation="landscape"'`锁定屏幕为横向。


# 了解更多

[Material Design](https://material.io/) 和 [Human Interface Guidelines](https://developer.apple.com/ios/human-interface-guidelines/overview/design-principles/) 是学习移动设计的非常优秀的资源。


