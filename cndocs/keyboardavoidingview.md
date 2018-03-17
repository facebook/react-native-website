---
id: keyboardavoidingview
title: KeyboardAvoidingView
---

It is a component to solve the common problem of views that need to move out of the way of the virtual keyboard. It can automatically adjust either its position or bottom padding based on the position of the keyboard.

Example usage:

```
import { KeyboardAvoidingView } from 'react-native';

<KeyboardAvoidingView style={styles.container} behavior="padding">
  ... your UI ...
</KeyboardAvoidingView>
```

### Example

![](assets/KeyboardAvoidingView/example.gif)

### Props

* [View props...](view.md#props)

- [`keyboardVerticalOffset`](keyboardavoidingview.md#keyboardverticaloffset)
- [`behavior`](keyboardavoidingview.md#behavior)
- [`contentContainerStyle`](keyboardavoidingview.md#contentcontainerstyle)

### Methods

* [`relativeKeyboardHeight`](keyboardavoidingview.md#relativekeyboardheight)
* [`onKeyboardChange`](keyboardavoidingview.md#onkeyboardchange)
* [`onLayout`](keyboardavoidingview.md#onlayout)

---

# 文档

## Props

### `keyboardVerticalOffset`

This is the distance between the top of the user screen and the react native view, may be non-zero in some use cases.

| 类型   | 必填 |
| ------ | ---- |
| number | 是   |

---

### `behavior`

_Note: Android and iOS both interact with this prop differently._ _Android may behave better when given no behavior prop at all, whereas iOS is the opposite._

| 类型                                  | 必填 |
| ------------------------------------- | ---- |
| enum('height', 'position', 'padding') | 否   |

---

### `contentContainerStyle`

The style of the content container(View) when behavior is 'position'.

| 类型       | 必填 |
| ---------- | ---- |
| View.style | 否   |

## Methods

### `relativeKeyboardHeight()`

```javascript
relativeKeyboardHeight(keyboardFrame: object):
```

---

### `onKeyboardChange()`

```javascript
onKeyboardChange((event: object));
```

---

### `onLayout()`

```javascript
onLayout((event: ViewLayoutEvent));
```
