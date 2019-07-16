---
id: version-0.56-keyboardavoidingview
title: KeyboardAvoidingView
original_id: keyboardavoidingview
---

It is a component to solve the common problem of views that need to move out of the way of the virtual keyboard. It can automatically adjust either its position or bottom padding based on the position of the keyboard.

Example usage:

```
import { KeyboardAvoidingView } from 'react-native';

<KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
  ... your UI ...
</KeyboardAvoidingView>
```

### Example

![](/react-native/docs/assets/KeyboardAvoidingView/example.gif)

### Props

- [View props...](view.md#props)

* [`keyboardVerticalOffset`](keyboardavoidingview.md#keyboardverticaloffset)
* [`behavior`](keyboardavoidingview.md#behavior)
* [`contentContainerStyle`](keyboardavoidingview.md#contentcontainerstyle)
* [`enabled`](keyboardavoidingview.md#enabled)

### Methods

- [`relativeKeyboardHeight`](keyboardavoidingview.md#relativekeyboardheight)
- [`onKeyboardChange`](keyboardavoidingview.md#onkeyboardchange)
- [`onLayout`](keyboardavoidingview.md#onlayout)

---

# Reference

## Props

### `keyboardVerticalOffset`

This is the distance between the top of the user screen and the react native view, may be non-zero in some use cases.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `behavior`

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

Enabled or disabled KeyboardAvoidingView.

| Type    | Required |
| ------- | -------- |
| boolean | Yes      |

## Methods

### `relativeKeyboardHeight()`

```jsx
relativeKeyboardHeight(keyboardFrame: object):
```

---

### `onKeyboardChange()`

```jsx
onKeyboardChange((event: object));
```

---

### `onLayout()`

```jsx
onLayout((event: ViewLayoutEvent));
```
