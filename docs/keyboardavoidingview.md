---
id: keyboardavoidingview
title: KeyboardAvoidingView
---

It is a component to solve the common problem of views that need to move out of the way of the virtual keyboard. It can automatically adjust either its height, position, or bottom padding based on the position of the keyboard.

### Example

```SnackPlayer name=keyboardavoidingview
import React from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput } from 'react-native';

export default function App() {
  const [value, onChangeText] = React.useState('');

  return (
    <KeyboardAvoidingView enabled behavior="padding" style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={value}
        placeholder="TextInput Placeholder"
        onChangeText={text => onChangeText(text)}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    padding: 10,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    borderRadius: 10,
  },
});
```

### Props

- [View props...](view.md#props)

* [`behavior`](keyboardavoidingview.md#behavior)
* [`contentContainerStyle`](keyboardavoidingview.md#contentcontainerstyle)
* [`enabled`](keyboardavoidingview.md#enabled)
* [`keyboardVerticalOffset`](keyboardavoidingview.md#keyboardverticaloffset)

---

# Reference

## Props

### `behavior`

Specify how to react to the presence of the keyboard.

_Note: Android and iOS both interact with this prop differently._ _Android may behave better when given no behavior prop at all, whereas iOS is the opposite._

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
