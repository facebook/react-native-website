---
id: version-0.44-navigation
title: 导航器对比
original_id: navigation
---

本文档总结对比了React Native中现有的几个导航组件。如果你刚开始接触，那么直接选择`React Navigation`就好。如果你只针对iOS平台开发，并且想和系统原生外观一致，那么可以选择`NavigatorIOS`。你还可能在很多地方听说过`Navigator`，这个老组件会逐步被`React Navigation`替代，但是它经历了长期的实践，较为稳定。过去还有一个实验性的导航器组件`NavigationExperimental`，这个组件已经完全弃用。

> 译注：从0.44版本开始，`Navigator`被从react native的核心组件库中剥离到了一个名为`react-native-deprecated-custom-components`的单独模块中。如果你需要继续使用`Navigator`，则需要先`yarn add react-native-deprecated-custom-components`安装，然后从这个模块中import，即`import { Navigator } from 'react-native-deprecated-custom-components'`.

## React Navigation

社区今后主推的方案是一个单独的导航库`react-navigation`，它的使用十分简单。

首先是在你的应用中安装此库：

```
yarn add react-navigation
```

然后你就可以快速创建一个有两个页面（Main和Profile）的应用了：

```
import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  Main: {screen: MainScreen},
  Profile: {screen: ProfileScreen},
});
```

其中每一个screen组件都可以单独设置导航选项，例如导航头的标题。还可以使用`navigation`属性中的方法去跳转到别的页面：

```
class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() =>
          navigate('Profile', { name: 'Jane' });
        }
      />
    );
  }
}
```

React Navigation的路由写法使其非常容易扩展导航逻辑，或是整合到redux中。由于路由可以嵌套使用，因而开发者可以根据不同页面编写不同的导航逻辑，且彼此互不影响。

React Navigation中的视图是原生组件，同时用到了运行在原生线程上的`Animated`动画库，因而性能表现十分流畅。此外其动画形式和手势都非常便于定制。

要想详细了解React Navigation，可以阅读这一篇英文的[入门文档](https://reactnavigation.org/docs/intro/)。


## NavigatorIOS

如果你只针对iOS平台开发，那么可以考虑使用[NavigatorIOS](navigatorios.html)。它是基于 [`UINavigationController`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UINavigationController_Class/)封装的，所以看起来很像。

![](img/NavigationStack-NavigatorIOS.gif)

```javascript
<NavigatorIOS
  initialRoute={{
    component: MyScene,
    title: 'My Initial Scene',
    passProps: { myProp: 'foo' },
  }}
/>
```

用法类似`Navigator`，`NavigatorIOS`也使用路由对象来描述场景，但有一些重要区别。其中要渲染的组件在路由对象的`component`字段中指定，要给目标组件传递的参数则写在`passProps`中。被渲染的component都会自动接受到一个名为`navigator`的属性，你可以直接调用此对象(this.props.navigator)的`push`和`pop`方法。

由于`NavigatorIOS`使用的是原生的UIKit导航，所以它会自动渲染一个带有返回按钮和标题的导航栏。

```javascript
import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, Text, TouchableHighlight, View } from 'react-native';

export default class NavigatorIOSApp extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: 'My Initial Scene',
        }}
        style={{flex: 1}}
      />
    )
  }
}

class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    this.props.navigator.push({
      title: 'Scene ' + nextIndex,
    });
  }

  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this._onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
```

点击这里阅读[NavigatorIOS的API文档](navigatorios.html)。