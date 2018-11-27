---
id: appstate
title: AppState
---

`AppState`能告诉你应用当前是在前台还是在后台，并且能在状态变化的时候通知你。

AppState 通常在处理推送通知的时候用来决定内容和对应的行为。

### App States

* `active` - 应用正在前台运行
* `background` - 应用正在后台运行。用户可能面对以下几种情况：
  * 在别的应用中
  * 停留在桌面
  * 对 Android 来说还可能处在另一个`Activity`中（即便是由你的应用拉起的）
* `inactive` - 此状态表示应用正在前后台的切换过程中，或是处在系统的多任务视图，又或是处在来电状态中。

要了解更多信息，可以阅读[Apple 的文档](https://developer.apple.com/library/ios/documentation/iPhone/Conceptual/iPhoneOSProgrammingGuide/TheAppLifeCycle/TheAppLifeCycle.html)。

### 基本用法

要获取当前的状态，你可以使用`AppState.currentState`，这个变量会一直保持更新。不过在启动的过程中，`currentState`可能为 null，直到`AppState`从原生代码得到通知为止。

```
import React, {Component} from 'react'
import {AppState, Text} from 'react-native'

class AppStateExample extends Component {

  state = {
    appState: AppState.currentState
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    }
    this.setState({appState: nextAppState});
  }

  render() {
    return (
      <Text>Current state is: {this.state.appState}</Text>
    );
  }

}
```

上面的这个例子只会显示"Current state is: active"，这是因为应用只有在`active`状态下才能被用户看到。并且 null 状态只会在一开始的一瞬间出现。

### 查看方法

* [`addEventListener`](appstate.md#addeventlistener)
* [`removeEventListener`](appstate.md#removeeventlistener)

### 查看属性

* [`currentState`](appstate.md#currentState)

---

# 文档

## 方法

### `addEventListener()`

```javascript
addEventListener(type, handler);
```

添加一个监听函数，用于监听应用状态的变化。type 参数应填`change`。

TODO: now that AppState is a subclass of NativeEventEmitter, we could deprecate `addEventListener` and `removeEventListener` and just use `addListener` and `listener.remove()` directly. That will be a breaking change though, as both the method and event names are different (addListener events are currently required to be globally unique).

---

### `removeEventListener()`

```javascript
removeEventListener(type, handler);
```

移除一个监听函数。type 参数应填`change`。

## Properties

### `currentState`

```javascript
AppState.currentState;
```
