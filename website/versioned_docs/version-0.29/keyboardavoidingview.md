---
id: version-0.29-keyboardavoidingview
title: KeyboardAvoidingView
original_id: keyboardavoidingview
---

### Props

- [View props...](view.md#props)

* [`keyboardVerticalOffset`](keyboardavoidingview.md#keyboardverticaloffset)
* [`behavior`](keyboardavoidingview.md#behavior)

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
| number | Yes      |

---

### `behavior`

| Type                                  | Required |
| ------------------------------------- | -------- |
| enum('height', 'position', 'padding') | No       |

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
