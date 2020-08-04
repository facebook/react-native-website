---
id: navigation
title: Navigating Between Screens
---

Mobile apps are rarely made up of a single screen. Managing the presentation of, and transition between, multiple screens is typically handled by what is known as a navigator.

This guide covers the various navigation components available in React Native. If you are getting started with navigation, you will probably want to use [React Navigation](navigation.md#react-navigation). React Navigation provides a straightforward navigation solution, with the ability to present common stack navigation and tabbed navigation patterns on both Android and iOS.

If you'd like to achieve a native look and feel on both Android and iOS, or you're integrating React Native into an app that already manages navigation natively, the following library provides native navigation on both platforms: [react-native-navigation](https://github.com/wix/react-native-navigation).

## React Navigation

The community solution to navigation is a standalone library that allows developers to set up the screens of an app with a few lines of code.

### Installation and setup

First, you need to install them in your project:

```sh
npm install @react-navigation/native @react-navigation/stack
```

Next, install the required peer dependencies. You need to run different commands depending on whether your project is an Expo managed project or a bare React Native project.

- If you have an Expo managed project, install the dependencies with `expo`:

  ```sh
  expo install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
  ```

- If you have a bare React Native project, install the dependencies with `npm`:

  ```sh
  npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
  ```

  For iOS with bare React Native project, make sure you have [Cocoapods](https://cocoapods.org/) installed. Then install the pods to complete the installation:

  ```sh
  cd ios
  pod install
  cd ..
  ```

> Note: You might get warnings related to peer dependencies after installation. They are usually caused by incorrect version ranges specified in some packages. You can safely ignore most warnings as long as your app builds.

To finalize installation of `react-native-gesture-handler`, add the following at the **top** (make sure it's at the top and there's nothing else before it) of your entry file, such as `index.js` or `App.js`:

```js
import 'react-native-gesture-handler';
```

Now, you need to wrap the whole app in `NavigationContainer`. Usually you'd do this in your entry file, such as `index.js` or `App.js`:

```jsx
import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      {/* Rest of your app code */}
    </NavigationContainer>
  );
};

export default App;
```

Now you are ready to build and run your app on the device/simulator.

### Usage

Now you can create an app with a home screen and a profile screen:

```jsx
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
```

In this example, there are 2 screens (`Home` and `Profile`) defined using the `Stack.Screen` component. Similarly, you can define as many screens as you like.

You can set options such as the screen title for each screen in the `options` prop of `Stack.Screen`.

Each screen takes a `component` prop that is a React component. Those components receive a prop called `navigation` which has various methods to link to other screens. For example, you can use `navigation.navigate` to go to the `Profile` screen:

```jsx
const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
  );
};
const ProfileScreen = () => {
  return <Text>This is Jane's profile</Text>;
};
```

The views in the stack navigator use native components and the [`Animated`](animated.md) library to deliver 60fps animations that are run on the native thread. Plus, the animations and gestures can be customized.

React Navigation also has packages for different kind of navigators such as tabs and drawer. You can use them to implement various patterns in your app.

For a complete intro to React Navigation, follow the [React Navigation Getting Started Guide](https://reactnavigation.org/docs/getting-started.html).
