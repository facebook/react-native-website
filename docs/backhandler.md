---
id: backhandler
title: BackHandler
---

Detect hardware button presses for back navigation.

Backhandler lets you register event listeners for the system's back action and helps you control how your application should respond.

The event subscriptions are called in reverse order (i.e. last registered subscription first), and if one subscription returns true then subscriptions registered earlier will not be called. Beware: If your app shows an opened `Modal`, BackHandler will not publish any events ([see `Modal` docs](modal#onrequestclose)).

Android: Detect hardware back button presses, and programmatically invoke the default back button functionality to exit the app if there are no listeners or if none of the listeners return true.

tvOS: Detect presses of the menu button on the TV remote. (Still to be implemented: programmatically disable menu button handling functionality to exit the app if there are no listeners or if none of the listeners return true.)

iOS: Not applicable.

Example:

```jsx
BackHandler.addEventListener('hardwareBackPress', function() {
  /**
   * this.onMainScreen and this.goBack are just examples,
   * you need to use your own implementation here.
   *
   * Typically you would use the navigator here to go to the last state.
   */

  if (!this.onMainScreen()) {
    this.goBack();
    /**
     * When true is returned the event will not be bubbled up
     * & no other back action will execute
     */
    return true;
  }
  /**
   * Returning false will let the event to bubble up & let other event listeners
   * or the system's default back action to be executed.
   */
  return false;
});
```

The following example implements a classic scenario where you can get confirmation from the user if they want to exit the app

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      Function Component Example
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class Component Example
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=BackHandler&supportedPlatforms=android
import React, { useEffect } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";

export default function App() {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Click Back button!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
```

<block class="classical syntax" />

```SnackPlayer name=BackHandler&supportedPlatforms=android
import React, { Component } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";

export default class App extends Component {
  backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }

  componentWillUnmount() {
    backHandler.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Click Back button!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  }
});
```

<block class="endBlock syntax" />

## Usage with React Navigation

If you are using React Navigation to navigate across different screens, you can follow their guide on [Custom Android back button behaviour](https://reactnavigation.org/docs/custom-android-back-button-handling/)

## Backhandler hook

[React Native Hooks](https://github.com/react-native-community/hooks#usebackhandler) has a nice `useBackHandler` hook which will simplify the process of setting up event listeners.

---

# Reference

## Methods

### `addEventListener()`

```jsx
static addEventListener(eventName, handler)
```

---

### `exitApp()`

```jsx
static exitApp()
```

---

### `removeEventListener()`

```jsx
static removeEventListener(eventName, handler)
```
