---
id: version-0.5-touchablewithoutfeedback
title: TouchableWithoutFeedback
original_id: touchablewithoutfeedback
---

Do not use unless you have a very good reason. All the elements that respond to press should have a visual feedback when touched. This is one of the primary reason a "web" app doesn't feel "native".

### Props

- [`onLongPress`](touchablewithoutfeedback.md#onlongpress)
- [`onPress`](touchablewithoutfeedback.md#onpress)
- [`onPressIn`](touchablewithoutfeedback.md#onpressin)
- [`onPressOut`](touchablewithoutfeedback.md#onpressout)

---

# Reference

## Props

### `onLongPress`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onPress`

Called when the touch is released, but not if cancelled (e.g. by a scroll that steals the responder lock).

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onPressIn`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onPressOut`

| Type     | Required |
| -------- | -------- |
| function | No       |
