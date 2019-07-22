---
id: version-0.34-keyboardavoidingview
title: KeyboardAvoidingView
original_id: keyboardavoidingview
---

It is a component to solve the common problem of views that need to move out of the way of the virtual keyboard. It can automatically adjust either its position or bottom padding based on the position of the keyboard.

### Props

- [View props...](view.md#props)

* [`behavior`](keyboardavoidingview.md#behavior)
* [`contentContainerStyle`](keyboardavoidingview.md#contentcontainerstyle)
* [`keyboardVerticalOffset`](keyboardavoidingview.md#keyboardverticaloffset)

### Methods

- [`relativeKeyboardHeight`](keyboardavoidingview.md#relativekeyboardheight)
- [`onKeyboardChange`](keyboardavoidingview.md#onkeyboardchange)
- [`onLayout`](keyboardavoidingview.md#onlayout)

---

# Reference

## Props

### `behavior`

| Type                                               | Required |
| -------------------------------------------------- | -------- |
| PropTypes.oneOf(['height', 'position', 'padding']) | No       |

---

### `contentContainerStyle`

The style of the content container(View) when behavior is 'position'.

| Type                  | Required |
| --------------------- | -------- |
| [View](view.md#style) | No       |

---

### `keyboardVerticalOffset`

This is the distance between the top of the user screen and the react native view, may be non-zero in some use cases.

| Type                        | Required |
| --------------------------- | -------- |
| PropTypes.number.isRequired | No       |

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
onLayout((event: object));
```
