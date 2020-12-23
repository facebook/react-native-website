---
id: version-0.62-backhandler
title: BackHandler
original_id: backhandler
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

BackHandler API 用于监听设备上的后退按钮事件，可以调用你自己的函数来处理后退行为。此 API 仅能在 Android 上使用。

回调函数是倒序执行的（即后添加的函数先执行）。

- **如果某一个函数返回 true**，则后续的函数都不会被调用。
- **如果没有添加任何监听函数，或者所有的监听函数都返回 false**，则会执行默认行为，退出应用。

> 注意：如果 app 当前打开了一个`Modal`窗口，则 BackHandler 不会触发事件。([查看`Modal`的文档](modal.md#onrequestclose)).

## 用法

```jsx
BackHandler.addEventListener('hardwareBackPress', function() {
  /**
   * this.onMainScreen()和this.goBack()两个方法都只是伪方法，需要你自己去实现
   * 一般来说都要配合导航器组件使用
   */

  if (!this.onMainScreen()) {
    this.goBack();
    /**
     * 返回true时会阻止事件冒泡传递，因而不会执行默认的后退行为
     */
    return true;
  }
  /**
   * 返回false时会使事件继续传递，触发其他注册的监听函数，或是系统默认的后退行为
   */
  return false;
});
```

## 示例

The following example implements a scenario where you confirm if the user wants to exit the app:

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      函数组件示例
    </li>
    <lClass组件示例"button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class Component Example
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=BackHandler&supportedPlatforms=android
import React, { useEffect } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";

const App = () => {
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
};

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

export default App;
```

<block class="classical syntax" />

```SnackPlayer name=BackHandler&supportedPlatforms=android
import React, { Component } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";

class App extends Component {
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
    this.backHandler.remove();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Click Back button!</Text>
      </View>
    );
  }
};

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

export default App;
```

<block class="endBlock syntax" />

`BackHandler.addEventListener` creates an event listener & returns a `NativeEventSubscription` object which should be cleared using `NativeEventSubscription.remove` method.

Additionally `BackHandler.removeEventListener` can also be used to clear the event listener. Ensure the callback has the reference to the same function used in the `addEventListener` call as shown the following example ﹣

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      函数组件示例
    </li>
    <lClass组件示例"button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class Component Example
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=BackHandler&supportedPlatforms=android
import React, { useEffect } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";

const App = () => {
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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Click Back button!</Text>
    </View>
  );
};

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

export default App;
```

<block class="classical syntax" />

```SnackPlayer name=BackHandler&supportedPlatforms=android
import React, { Component } from "react";
import { Text, View, StyleSheet, BackHandler, Alert } from "react-native";

class App extends Component {
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
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Click Back button!</Text>
      </View>
    );
  }
};

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

export default App;
```

<block class="endBlock syntax" />

## Usage with React Navigation

If you are using React Navigation to navigate across different screens, you can follow their guide on [Custom Android back button behaviour](https://reactnavigation.org/docs/custom-android-back-button-handling/)

## Backhandler hook

[React Native Hooks](https://github.com/react-native-community/hooks#usebackhandler) has a nice `useBackHandler` hook which will simplify the process of setting up event listeners.

---

# 文档

## 方法

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
