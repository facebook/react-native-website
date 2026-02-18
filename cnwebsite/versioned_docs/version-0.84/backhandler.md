---
id: backhandler
title: BackHandler
---

Backhandler API 检测用于后退导航的硬件按钮按下情况，允许您注册系统后退操作的事件侦听器，并允许您控制应用程序的响应方式。它仅适用于 Android。

事件订阅以相反的顺序调用（即首先调用最后注册的订阅）。

- **如果一个订阅返回true，**那么之前注册的订阅将不会被调用。
- **如果没有订阅返回 true 或没有注册，** 它会以编程方式调用默认后退按钮功能以退出应用程序。

:::warning 对模式用户的警告
如果您的应用程序显示打开的“Modal”，则“BackHandler”将不会发布任何事件（[请参阅“Modal”文档](modal#onrequestclose)）。
:::

＃＃ 图案

```tsx
const subscription = BackHandler.addEventListener(
  'hardwareBackPress',
  function () {
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
  },
);

// Unsubscribe the listener on unmount
subscription.remove();
```

＃＃ 例子

以下示例实现了您确认用户是否要退出应用程序的场景：

```SnackPlayer name=BackHandler&supportedPlatforms=android
import React, {useEffect} from 'react';
import {Text, StyleSheet, BackHandler, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Click Back button!</Text>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
```

`BackHandler.addEventListener` 创建一个事件监听器并返回一个 `NativeEventSubscription` 对象，应使用 `NativeEventSubscription.remove` 方法清除该对象。

## 与 React 导航一起使用

如果您使用 React Navigation 在不同屏幕之间导航，您可以按照他们的[自定义 Android 后退按钮行为](https://reactnavigation.org/docs/custom-android-back-button-handling/) 指南进行操作

## 后处理程序钩子

[React Native Hooks](https://github.com/react-native-community/hooks#usebackhandler) 有一个很好的 `useBackHandler` 钩子，它将简化设置事件监听器的过程。

---

＃ 参考

＃＃ 方法

### `addEventListener()`

```tsx
static addEventListener(
  eventName: BackPressEventName,
  handler: () => boolean | null | undefined,
): NativeEventSubscription;
```

---

### `exitApp()`

```tsx
static exitApp();
```
