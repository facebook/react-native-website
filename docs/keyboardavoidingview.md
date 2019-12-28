---
id: keyboardavoidingview
title: KeyboardAvoidingView
---

It is a component to solve the common problem of views that need to move out of the way of the virtual keyboard. It can automatically adjust either its height, position, or bottom padding based on the position of the keyboard.

![](/react-native/docs/assets/KeyboardAvoidingView/example.gif)

### Example

```SnackPlayer name=KeyboardAvoidingView
import React from 'react';
import {
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  View,
  Platform
} from 'react-native';

export default () => (
  <KeyboardAvoidingView style={styles.container} behavior='padding'>
    <TextInput
      style={styles.input}
      placeholder='Name'
      placeholderTextColor='black'
    />
    <TextInput
      style={styles.input}
      placeholder='Email'
      placeholderTextColor='black'
    />
    <TextInput
      style={styles.input}
      placeholder='Address'
      placeholderTextColor='black'
    />
  </KeyboardAvoidingView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
input: {
    borderColor: "black",
    borderWidth: 1,
    height: 40,
    color: "black"
  }
});
```

---

# Reference

## Props

Inherits [View Props](view.md#props).

### `behavior`

Specify how to react to the presence of the keyboard.

_Note: Android and iOS both interact with this prop differently._ _on both iOS and Android, setting the prop is recommended._

| Type                                  | Required |
| ------------------------------------- | -------- |
| enum('height', 'position', 'padding') | No       |

---

### `contentContainerStyle`

The style of the content container(View) when behavior is 'position'.

| Type       | Required |
| ---------- | -------- |
| View.style | No       |

---

### `enabled`

Enabled or disabled KeyboardAvoidingView. The default is `true`.

| Type    | Required |
| ------- | -------- |
| boolean | No       |

---

### `keyboardVerticalOffset`

This is the distance between the top of the user screen and the react native view, may be non-zero in some use cases. Defaults to 0.

| Type   | Required |
| ------ | -------- |
| number | No       |
