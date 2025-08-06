---
id: backhandler
title: BackHandler
---

BackHandler API 用于监听设备上的后退按钮事件，可以调用你自己的函数来处理后退行为。此 API 仅能在 Android 上使用。

回调函数是倒序执行的（即后添加的函数先执行）。

- **如果某一个函数返回 true**，则后续的函数都不会被调用。
- **如果没有添加任何监听函数，或者所有的监听函数都返回 false**，则会执行默认行为，退出应用。

> 注意：如果 app 当前打开了一个`Modal`窗口，则 BackHandler 不会触发事件。([查看`Modal`的文档](modal.md#onrequestclose)).

## 用法

```jsx
BackHandler.addEventListener('hardwareBackPress', function () {
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

以下示例实现了一个场景，您可以确认用户是否要退出应用程序：

```SnackPlayer name=BackHandler&supportedPlatforms=android
import React, {useEffect} from 'react';
import {Text, View, StyleSheet, BackHandler, Alert} from 'react-native';

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
    <View style={styles.container}>
      <Text style={styles.text}>Click Back button!</Text>
    </View>
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

`BackHandler.addEventListener` 创建一个事件监听器，并返回一个 `NativeEventSubscription` 对象，应该使用 `NativeEventSubscription.remove` 方法来清除它。

## 在 React Navigation 中使用

如果您正在使用React Navigation在不同的屏幕之间导航，您可以按照他们的指南[自定义Android返回按钮行为](https://reactnavigation.org/docs/custom-android-back-button-handling/)。

## Backhandler Hook

[React Native Hooks](https://github.com/react-native-community/hooks#usebackhandler)有一个很好的`useBackHandler`钩子，它将简化设置事件监听器的过程。

---

# 文档

## 方法

### `addEventListener()`

```tsx
static addEventListener(
  eventName: BackPressEventName,
  handler: () => boolean | null | undefined,
): NativeEventSubscription;
```

---

### `exitApp()`

```jsx
static exitApp()
```

---

### `removeEventListener()`

```tsx
static removeEventListener(
  eventName: BackPressEventName,
  handler: () => boolean | null | undefined,
);
```
