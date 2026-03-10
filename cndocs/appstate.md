---
id: appstate
title: AppState
---

`AppState` 能告诉你应用当前是在前台还是在后台，并且能在状态变化的时候通知你。

AppState 通常在处理推送通知的时候用来决定内容和对应的行为。

### App States

- `active` - 应用正在前台运行
- `background` - 应用正在后台运行。用户可能面对以下几种情况：
  - 在别的应用中
  - 停留在桌面
  - [Android] 处在另一个 `Activity` 中（即便是由你的应用拉起的）
- [iOS] `inactive` - 此状态表示应用正在前后台的切换过程中，或是处在系统的多任务视图、通知中心，又或是处在来电状态中。

要了解更多信息，可以阅读 [Apple 的文档](https://developer.apple.com/documentation/uikit/app_and_scenes/managing_your_app_s_life_cycle)。

## 基本用法

要获取当前的状态，你可以使用 `AppState.currentState`，这个变量会一直保持更新。

:::info
如果你使用的是旧架构，`currentState` 在启动时会是 `null`，直到从原生端异步获取到值为止。
:::

```SnackPlayer name=AppState%20Example
import React, {useRef, useState, useEffect} from 'react';
import {AppState, StyleSheet, Text} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text>Current state is: {appStateVisible}</Text>
      </SafeAreaView>
    </SafeAreaProvider>
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

上面的这个例子只会显示"Current state is: active"，这是因为应用只有在 `active` 状态下才能被用户看到。如果你想尝试这段代码，我们建议使用自己的设备而不是内嵌预览。

---

# 文档

## 事件

### `change`

当应用状态发生变化时触发此事件。监听器会收到[当前应用状态值](appstate#app-states)之一作为参数。

### `memoryWarning` <div className="label ios">iOS</div>

当应用收到操作系统的内存警告时触发。

### `focus` <div className="label android">Android</div>

当应用获得焦点时触发（用户正在与应用交互）。

### `blur` <div className="label android">Android</div>

当用户不再与应用主动交互时触发。在用户下拉[通知抽屉](https://developer.android.com/guide/topics/ui/notifiers/notifications#bar-and-drawer)时非常有用。此时 `AppState` 不会变化，但 `blur` 事件会被触发。

## 方法

### `addEventListener()`

```tsx
static addEventListener(
  type: AppStateEvent,
  listener: (state: AppStateStatus) => void,
): NativeEventSubscription;
```

设置一个在 AppState 上发生指定事件类型时调用的函数。`eventType` 的有效值参见[上方列出的事件](#events)。返回 `EventSubscription`。

## 属性

### `currentState`

```tsx
static currentState: AppStateStatus;
```
