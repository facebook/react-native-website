---
id: version-0.57-keyboard
title: Keyboard
original_id: keyboard
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

`Keyboard`模块用来控制键盘相关的事件。

### 用法示例

`Keyboard`模块可以监听原生键盘事件以做出相应回应，比如收回键盘。

```
import React, { Component } from 'react';
import { Keyboard, TextInput } from 'react-native';

class Example extends Component {
  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    alert('Keyboard Shown');
  }

  _keyboardDidHide () {
    alert('Keyboard Hidden');
  }

  render() {
    return (
      <TextInput
        onSubmitEditing={Keyboard.dismiss}
      />
    );
  }
}
```

### 查看方法

* [`addListener`](keyboard.md#addlistener)
* [`removeListener`](keyboard.md#removelistener)
* [`removeAllListeners`](keyboard.md#removealllisteners)
* [`dismiss`](keyboard.md#dismiss)

---

# 文档

## 方法

### `addListener()`

```javascript
static addListener(eventName, callback)
```

`addListener`用于注册一个 JavaScript 函数来监听处理原生键盘通知事件。

此方法会返回监听函数的引用。

@param {string} eventName `nativeEvent`参数用来指明要监听的事件，具体有以下几种:

* `keyboardWillShow`
* `keyboardDidShow`
* `keyboardWillHide`
* `keyboardDidHide`
* `keyboardWillChangeFrame`
* `keyboardDidChangeFrame`

注意如果你把`android:windowSoftInputMode`设置为`adjustResize`或是`adjustNothing`，则在 Android 上只有`keyboardDidShow`和`keyboardDidHide`事件有效。

@param {function} callback 事件触发时调用的 js 函数。

---

### `removeListener()`

```javascript
static removeListener(eventName, callback)
```

移除某个类型事件的监听函数。

@param {string} eventName `nativeEvent`即要移除的原生事件类型。
@param {function} callback 要移除的监听函数。

---

### `removeAllListeners()`

```javascript
static removeAllListeners(eventName)
```

移除某个类型事件的所有监听函数。

@param {string} eventType 要移除所有监听函数的原生事件类型。

---

### `dismiss()`

```javascript
static dismiss()
```

把弹出的键盘收回去，同时使当前的文本框失去焦点。
