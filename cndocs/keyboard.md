---
id: keyboard
title: Keyboard
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`Keyboard`模块用来控制键盘相关的事件。

### 用法示例

`Keyboard`模块可以监听原生键盘事件以做出相应回应，比如收回键盘。


<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Keyboard%20Function%20Component%20Example

import React, { useEffect } from "react";
import { Keyboard, TextInput, StyleSheet } from "react-native";

const Example = () => {

  useEffect(() => {
    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    alert("Keyboard Shown");
  };

  const _keyboardDidHide = () => {
    alert("Keyboard Hidden");
  };

  return <TextInput style={s.input} placeholder='Click here ...' onSubmitEditing={Keyboard.dismiss} />;
}

const s = StyleSheet.create({
   input:{
    margin:60,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff"
   }
})

export default Example;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Keyboard%20Class%20Component%20Example
import React, {Component} from 'react';
import {Keyboard, TextInput , StyleSheet} from 'react-native';

class Example extends Component {
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow() {
    alert('Keyboard Shown');
  }

  _keyboardDidHide() {
    alert('Keyboard Hidden');
  }

  render() {
    return <TextInput style={s.input} placeholder='Click here ...' onSubmitEditing={Keyboard.dismiss} />;
  }
}

const s = StyleSheet.create({
   input:{
    margin:60,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 4,
    backgroundColor: "#fff"
   }
})

export default Example;
```

</TabItem>
</Tabs>

---

# 文档

## 方法

### `addListener()`

```jsx
static addListener(eventName, callback)
```

`addListener`用于注册一个 JavaScript 函数来监听处理原生键盘通知事件。

此方法会返回监听函数的引用。

**参数：**

| 名称      | 类型     | Required | 说明                                                   |
| --------- | -------- | -------- | ------------------------------------------------------ |
| eventName | string   | Yes      | `nativeEvent`参数用来指明要监听的事件，具体有以下几种: |
| callback  | function | Yes      | 事件触发时调用的 js 函数                               |

**nativeEvent**

This can be any of the following

- `keyboardWillShow`
- `keyboardDidShow`
- `keyboardWillHide`
- `keyboardDidHide`
- `keyboardWillChangeFrame`
- `keyboardDidChangeFrame`

注意如果你把`android:windowSoftInputMode`设置为`adjustResize`或是`adjustPan`，则在 Android 上只有`keyboardDidShow`和`keyboardDidHide`事件有效。如果`android:windowSoftInputMode`设置为`adjustNothing`，则没有任何事件有效。`keyboardWillShow` as well as `keyboardWillHide` are generally not available on Android since there is no native corresponding event.

---

### `removeListener()`

```jsx
static removeListener(eventName, callback)
```

移除某个类型事件的监听函数。

**参数：**

| 名称      | 类型     | Required | 说明                             |
| --------- | -------- | -------- | -------------------------------- |
| eventName | string   | Yes      | 要移除监听函数的原生事件类型名称 |
| callback  | function | Yes      | 要移除的监听函数                 |

---

### `removeAllListeners()`

```jsx
static removeAllListeners(eventName)
```

移除某个类型事件的所有监听函数。

---

### `dismiss()`

```jsx
static dismiss()
```

把弹出的键盘收回去，同时使当前的文本框失去焦点。

---

### `scheduleLayoutAnimation`

```jsx
static scheduleLayoutAnimation(event)
```

Useful for syncing TextInput (or other keyboard accessory view) size of position changes with keyboard movements.
