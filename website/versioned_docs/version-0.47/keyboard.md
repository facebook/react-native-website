---
id: version-0.47-keyboard
title: Keyboard
original_id: keyboard
---

`Keyboard` module to control keyboard events.

### Usage

The Keyboard module allows you to listen for native events and react to them, as well as make changes to the keyboard, like dismissing it.

```
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

### Methods

- [`addListener`](keyboard.md#addlistener)
- [`removeListener`](keyboard.md#removelistener)
- [`removeAllListeners`](keyboard.md#removealllisteners)
- [`dismiss`](keyboard.md#dismiss)

---

# Reference

## Methods

### `addListener()`

```javascript
static addListener(eventName, callback)
```

The `addListener` function connects a JavaScript function to an identified native keyboard notification event.

This function then returns the reference to the listener.

@param {string} eventName The `nativeEvent` is the string that identifies the event you're listening for. This can be any of the following:

- `keyboardWillShow`
- `keyboardDidShow`
- `keyboardWillHide`
- `keyboardDidHide`
- `keyboardWillChangeFrame`
- `keyboardDidChangeFrame`

Note that if you set `android:windowSoftInputMode` to `adjustResize` or `adjustNothing`, only `keyboardDidShow` and `keyboardDidHide` events will be available on Android. `keyboardWillShow` as well as `keyboardWillHide` are generally not available on Android since there is no native corresponding event.

@param {function} callback function to be called when the event fires.

---

### `removeListener()`

```javascript
static removeListener(eventName, callback)
```

Removes a specific listener.

@param {string} eventName The `nativeEvent` is the string that identifies the event you're listening for. @param {function} callback function to be called when the event fires.

---

### `removeAllListeners()`

```javascript
static removeAllListeners(eventName)
```

Removes all listeners for a specific event type.

@param {string} eventType The native event string listeners are watching which will be removed.

---

### `dismiss()`

```javascript
static dismiss()
```

Dismisses the active keyboard and removes focus.
