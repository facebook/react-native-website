---
id: keyboard
title: Keyboard
---

`Keyboard` module to control keyboard events.

### Usage

The Keyboard module allows you to listen for native events and react to them, as well as make changes to the keyboard, like dismissing it.

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      Function Component Example
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class Component Example
    </li>
  </ul>
</div>

<block class="functional syntax" />

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

<block class="classical syntax" />

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

<block class="endBlock syntax" />

---

# Reference

## Methods

### `addListener()`

```jsx
static addListener(eventName, callback)
```

The `addListener` function connects a JavaScript function to an identified native keyboard notification event.

This function then returns the reference to the listener.

**Parameters:**

| Name      | Type     | Required | Description                                                                               |
| --------- | -------- | -------- | ----------------------------------------------------------------------------------------- |
| eventName | string   | Yes      | The `nativeEvent` is the string that identifies the event you're listening for. See below |
| callback  | function | Yes      | The function to be called when the event fires                                            |

**nativeEvent**

This can be any of the following

- `keyboardWillShow`
- `keyboardDidShow`
- `keyboardWillHide`
- `keyboardDidHide`
- `keyboardWillChangeFrame`
- `keyboardDidChangeFrame`

Note that if you set `android:windowSoftInputMode` to `adjustResize` or `adjustPan`, only `keyboardDidShow` and `keyboardDidHide` events will be available on Android. If you set `android:windowSoftInputMode` to `adjustNothing`, no events will be available on Android. `keyboardWillShow` as well as `keyboardWillHide` are generally not available on Android since there is no native corresponding event.

---

### `removeListener()`

```jsx
static removeListener(eventName, callback)
```

Removes a specific listener.

**Parameters:**

| Name      | Type     | Required | Description                                                                    |
| --------- | -------- | -------- | ------------------------------------------------------------------------------ |
| eventName | string   | Yes      | The `nativeEvent` is the string that identifies the event you're listening for |
| callback  | function | Yes      | The function to be called when the event fires                                 |

---

### `removeAllListeners()`

```jsx
static removeAllListeners(eventName)
```

Removes all listeners for a specific event type.

**Parameters:**

| Name      | Type   | Required | Description                                                          |
| --------- | ------ | -------- | -------------------------------------------------------------------- |
| eventType | string | Yes      | The native event string listeners are watching which will be removed |

---

### `dismiss()`

```jsx
static dismiss()
```

Dismisses the active keyboard and removes focus.

---

### `scheduleLayoutAnimation`

```jsx
static scheduleLayoutAnimation(event)
```

Useful for syncing TextInput (or other keyboard accessory view) size of position changes with keyboard movements.
