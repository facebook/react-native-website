---
id: version-0.57-navigation
title: 使用导航器跳转页面
original_id: navigation
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(97.92%), [noclip](https://github.com/search?q=noclip%40foxmail.com+in%3Aemail&type=Users)(2.08%)

移动应用基本不会只由一个页面组成。管理多个页面的呈现、跳转的组件就是我们通常所说的导航器（navigator）。

本文档总结对比了 React Native 中现有的几个导航组件。如果你刚开始接触，那么直接选择[React Navigation](navigation.md#react-navigation)就好。 React Navigation 提供了简单易用的跨平台导航方案，在 iOS 和 Android 上都可以进行翻页式、tab 选项卡式和抽屉式的导航布局。

如果你只针对 iOS 平台开发，想和系统原生外观一致，不需要什么自定义的设置，那么可以选择[NavigatorIOS](navigation.md#navigatorios)，因为它提供了一个基于原生 `UINavigationController` 类的封装。然而组件在Android上不会起作用。

如果你想同时在iOS和Android上达到看起来像原生，或者你想把RN整合到一个已经有原生导航管理的APP里, 下面这个库提供了在两个平台都适用的原生导航: [react-native-navigation](https://github.com/wix/react-native-navigation).

## React Navigation

社区今后主推的方案是一个单独的导航库`react-navigation`，它的使用十分简单。React Navigation 中的视图是原生组件，同时用到了运行在原生线程上的`Animated`动画库，因而性能表现十分流畅。此外其动画形式和手势都非常便于定制。

要想详细了解 React Navigation的具体用法，请访问其[官方网站](https://reactnavigation.org/)，网站右上角有中文翻译，但内容可能会有所滞后。

## NavigatorIOS

`NavigatorIOS`是基于 [`UINavigationController`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UINavigationController_Class/)封装的，所以看起来很像。

![](assets/NavigationStack-NavigatorIOS.gif)

```jsx
<NavigatorIOS
  initialRoute={{
    component: MyScene,
    title: "My Initial Scene",
    passProps: { myProp: "foo" }
  }}
/>
```

和其他导航器类似，`NavigatorIOS`也使用路由对象来描述场景，但有一些重要区别。其中要渲染的组件在路由对象的`component`字段中指定，要给目标组件传递的参数则写在`passProps`中。被渲染的 component 都会自动接受到一个名为`navigator`的属性，你可以直接调用此对象(this.props.navigator)的`push`和`pop`方法。

由于`NavigatorIOS`使用的是原生的 UIKit 导航，所以它会自动渲染一个带有返回按钮和标题的导航栏。

```jsx
import React from "react";
import PropTypes from "prop-types";
import { Button, NavigatorIOS, Text, View } from "react-native";

export default class NavigatorIOSApp extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: "My Initial Scene",
          passProps: { index: 1 }
        }}
        style={{ flex: 1 }}
      />
    );
  }
}

class MyScene extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired
    }),
    navigator: PropTypes.object.isRequired
  };

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: MyScene,
      title: "Scene " + nextIndex,
      passProps: { index: nextIndex }
    });
  }

  render() {
    return (
      <View>
        <Text>Current Scene: {this.props.title}</Text>
        <Button
          onPress={this._onForward}
          title="Tap me to load the next scene"
        />
      </View>
    );
  }
}
```

点击这里阅读[NavigatorIOS 的 API 文档](navigatorios.md)。
