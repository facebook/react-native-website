---
id: version-0.5-navigation
title: Navigating Between Screens
original_id: navigation
---

Mobile apps are rarely made up of a single screen. Managing the presentation of, and transition between, multiple screens is typically handled by what is known as a navigator.

This guide covers the various navigation components available in React Native. If you are getting started with navigation, you will probably want to use [React Navigation](navigation.md#react-navigation). React Navigation provides a straightforward navigation solution, with the ability to present common stack navigation and tabbed navigation patterns on both Android and iOS.

If you'd like to achieve a native look and feel on both Android and iOS, or you're integrating React Native into an app that already manages navigation natively, the following library provides native navigation on both platforms: [react-native-navigation](https://github.com/wix/react-native-navigation).

## React Navigation

The community solution to navigation is a standalone library that allows developers to set up the screens of an app with a few lines of code.

The first step is to install in your project:

```
npm install --save react-navigation
```

The second step is to install react-native-gesture-handler

```
yarn add react-native-gesture-handler
# or with npm
# npm install --save react-native-gesture-handler
```

The third step is to install react-navigation-stack

```
yarn add react-navigation-stack
# or with npm
# npm install --save react-navigation-stack
```

Then you can quickly create an app with a home screen and a profile screen:

```jsx
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
});

const App = createAppContainer(MainNavigator);

export default App;
```

Each screen component can set navigation options such as the header title. It can use action creators on the `navigation` prop to link to other screens:

```jsx
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

React Navigation routers make it quick to override navigation logic. Because routers can be nested inside each other, developers can override navigation logic for one area of the app without making widespread changes.

The views in React Navigation use native components and the [`Animated`](animated.md) library to deliver 60fps animations that are run on the native thread. Plus, the animations and gestures can be customized.

For a complete intro to React Navigation, follow the [React Navigation Getting Started Guide](https://reactnavigation.org/docs/getting-started.html), or browse other docs such as the [Intro to Navigators](https://expo.io/@react-navigation/NavigationPlayground).
