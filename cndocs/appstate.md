---
id: appstate
title: AppState
---

`AppState`能告诉你应用当前是在前台还是在后台，并且能在状态变化的时候通知你。

AppState 通常在处理推送通知的时候用来决定内容和对应的行为。

### App States

- `active` - 应用正在前台运行
- `background` - 应用正在后台运行。用户可能面对以下几种情况：
  - 在别的应用中
  - 停留在桌面
  - 对 Android 来说还可能处在另一个`Activity`中（即便是由你的应用拉起的）
- [iOS] `inactive` - 此状态表示应用正在前后台的切换过程中，或是处在系统的多任务视图，又或是处在来电状态中。

要了解更多信息，可以阅读[Apple 的文档](https://developer.apple.com/documentation/uikit/app_and_scenes/managing_your_app_s_life_cycle)。

## 基本用法

要获取当前的状态，你可以使用`AppState.currentState`，这个变量会一直保持更新。不过在启动的过程中，`currentState`可能为 null，直到`AppState`从原生代码得到通知为止。

```SnackPlayer name=AppState%20Example
import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text, View} from 'react-native';

const AppStateExample = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>Current state is: {appStateVisible}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppStateExample;
```

上面的这个例子只会显示"Current state is: active"，这是因为应用只有在`active`状态下才能被用户看到。并且 null 状态只会在一开始的一瞬间出现。如果你想尝试这段代码，我们建议使用自己的设备而不是在上面网页中的嵌入式预览。

---

# 文档

## 事件

### `blur` <div class="label android">Android</div>

当用户没有主动与应用程序进行交互时收到。在用户下拉[通知抽屉](https://developer.android.com/guide/topics/ui/notifiers/notifications#bar-and-drawer)的情况下非常有用。`AppState`不会改变，但是`blur`事件将被触发。

### `change`

当应用程序状态发生变化时，将接收到此事件。监听器会使用[当前应用程序状态值之一](appstate.md#app-states)来调用。

### `focus` <div class="label android">Android</div>

当应用程序获得焦点时收到（用户正在与应用程序进行交互）。

### `memoryWarning`

这个事件用于在需要时触发内存警告或释放内存。

## 方法

### `addEventListener()`

```tsx
static addEventListener(
  type: AppStateEvent,
  listener: (state: AppStateStatus) => void,
): NativeEventSubscription;
```

设置一个函数，每当AppState上发生指定的事件类型时将被调用。`eventType` 的有效值为[上面列出的事件](#events)。返回 `EventSubscription`。


## 属性

### `currentState`

```tsx
static currentState: AppStateStatus;
```
