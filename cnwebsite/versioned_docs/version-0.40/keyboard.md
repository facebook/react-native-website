---
id: version-0.40-keyboard
title: Keyboard
original_id: keyboard
---

`Keyboard`组件可以用来控制键盘相关的事件。

### 用法
`Keyboard`组件可以监听原生键盘事件以做出相应回应，比如收回键盘。

```js
import React, { Component } from 'react';
import { Keyboard, TextInput } from 'react-native';

class Example extends Component {
  componentWillMount () {
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
### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="addlistener"></a><span
            class="methodType">static </span>addListener<span class="methodType">(nativeEvent, jsFunction)</span> <a
            class="hash-link" href="keyboard.html#addlistener">#</a></h4>
        <div><p><code>addListener</code>用于注册一个JavaScript函数来监听处理原生键盘通知事件。</p>
            <p>此方法会返回监听函数的引用。</p>
            <p>@param {string} nativeEvent <code>nativeEvent</code>参数用来指明要监听的事件，具体有以下几种:
                - <code>keyboardWillShow</code>
                - <code>keyboardDidShow</code>
                - <code>keyboardWillHide</code>
                - <code>keyboardDidHide</code>
                - <code>keyboardWillChangeFrame</code>
                - <code>keyboardDidChangeFrame</code></p>
            <p>@param {function} jsFunction 事件触发时调用的js函数。</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="removealllisteners"></a><span class="methodType">static </span>removeAllListeners<span
            class="methodType">(eventType)</span> <a class="hash-link"
                                                     href="keyboard.html#removealllisteners">#</a></h4>
        <div><p>移除某个类型事件的所有监听函数.</p>
            <p>@param {string} eventType 要移除的原生事件类型</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="removesubscription"></a><span class="methodType">static </span>removeSubscription<span
            class="methodType">(subscription)</span> <a class="hash-link"
                                                        href="keyboard.html#removesubscription">#</a></h4>
        <div><p移除某个监听函数。</p>
            <p>@param {EmitterSubscription} subscription 要移除的监听函数</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="dismiss"></a><span
            class="methodType">static </span>dismiss<span class="methodType">()</span> <a class="hash-link"
                                                                                           href="keyboard.html#dismiss">#</a>
    </h4>
        <div><p>把弹出的键盘收回去。</p></div>
    </div>
</div>