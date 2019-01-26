---
id: version-0.5-navigation
title: Navigating Between Screens
original_id: navigation
---

Mobile apps are rarely made up of a single screen. Managing the presentation of, and transition between, multiple screens is typically handled by what is known as a navigator.

This guide covers the various navigation components available in React Native. If you are just getting started with navigation, you will probably want to use [React Navigation](navigation.md#react-navigation). React Navigation provides an easy to use navigation solution, with the ability to present common stack navigation and tabbed navigation patterns on both iOS and Android.

If you're only targeting iOS, you may want to also check out [NavigatorIOS](navigation.md#navigatorios) as a way of providing a native look and feel with minimal configuration, as it provides a wrapper around the native `UINavigationController` class. This component will not work on Android, however.

If you'd like to achieve a native look and feel on both iOS and Android, or you're integrating React Native into an app that already manages navigation natively, the following library provides native navigation on both platforms: [react-native-navigation](https://github.com/wix/react-native-navigation).

## React Navigation

The community solution to navigation is a standalone library that allows developers to set up the screens of an app with just a few lines of code.

The first step is to install in your project:

```
npm install --save react-navigation
```

Then you can quickly create an app with a home screen and a profile screen:

```javascript
import {createStackNavigator, createAppNavigator} from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
});

const App = createAppNavigator(MainNavigator);

export default App;
```

Each screen component can set navigation options such as the header title. It can use action creators on the `navigation` prop to link to other screens:

```javascript
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Go to Jane's profile"
        onPress={() => navigate('Profile', {name: 'Jane'})}
      />
    );
  }
}
```

React Navigation routers make it easy to override navigation logic. Because routers can be nested inside each other, developers can override navigation logic for one area of the app without making widespread changes.

The views in React Navigation use native components and the [`Animated`](animated.md) library to deliver 60fps animations that are run on the native thread. Plus, the animations and gestures can be easily customized.

For a complete intro to React Navigation, follow the [React Navigation Getting Started Guide](https://reactnavigation.org/docs/getting-started.html), or browse other docs such as the [Intro to Navigators](https://expo.io/@react-navigation/NavigationPlayground).

## NavigatorIOS

`NavigatorIOS` looks and feels just like [`UINavigationController`](https://developer.apple.com/library/ios/documentation/UIKit/Reference/UINavigationController_Class/), because it is actually built on top of it.

![](/react-native/docs/assets/NavigationStack-NavigatorIOS.gif)

```javascript
<NavigatorIOS
  initialRoute={{
    component: MyScene,
    title: 'My Initial Scene',
    passProps: {myProp: 'foo'},
  }}
/>
```

Like other navigation systems, `NavigatorIOS` uses routes to represent screens, with some important differences. The actual component that will be rendered can be specified using the `component` key in the route, and any props that should be passed to this component can be specified in `passProps`. A "navigator" object is automatically passed as a prop to the component, allowing you to call `push` and `pop` as needed.

As `NavigatorIOS` leverages native UIKit navigation, it will automatically render a navigation bar with a back button and title.

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import {Button, NavigatorIOS, Text, View} from 'react-native';

export default class NavigatorIOSApp extends React.Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: 'My Initial Scene',
          passProps: {index: 1},
        }}
        style={{flex: 1}}
      />
    );
  }
}

class MyScene extends React.Component {
  static propTypes = {
    route: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }),
    navigator: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
  }

  _onForward() {
    let nextIndex = ++this.props.index;
    this.props.navigator.push({
      component: MyScene,
      title: 'Scene ' + nextIndex,
      passProps: {index: nextIndex},
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

Check out the [`NavigatorIOS` reference docs](navigatorios.md) to learn more about this component.
