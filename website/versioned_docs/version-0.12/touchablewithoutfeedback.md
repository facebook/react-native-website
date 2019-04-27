---
id: version-0.12-touchablewithoutfeedback
title: TouchableWithoutFeedback
original_id: touchablewithoutfeedback
---

Do not use unless you have a very good reason. All the elements that respond to press should have a visual feedback when touched. This is one of the primary reason a "web" app doesn't feel "native".

### Props

- [`delayPressOut`](touchablewithoutfeedback.md#delaypressout)
- [`accessibilityComponentType`](touchablewithoutfeedback.md#accessibilitycomponenttype)
- [`accessible`](touchablewithoutfeedback.md#accessible)
- [`delayLongPress`](touchablewithoutfeedback.md#delaylongpress)
- [`delayPressIn`](touchablewithoutfeedback.md#delaypressin)
- [`accessibilityTraits`](touchablewithoutfeedback.md#accessibilitytraits)
- [`onLayout`](touchablewithoutfeedback.md#onlayout)
- [`onLongPress`](touchablewithoutfeedback.md#onlongpress)
- [`onPress`](touchablewithoutfeedback.md#onpress)
- [`onPressIn`](touchablewithoutfeedback.md#onpressin)
- [`onPressOut`](touchablewithoutfeedback.md#onpressout)

---

# Reference

## Props

### `delayPressOut`

Delay in ms, from the release of the touch, before onPressOut is called.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `accessibilityComponentType`

| Type                            | Required |
| ------------------------------- | -------- |
| View.AccessibilityComponentType | No       |

---

### `accessible`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `delayLongPress`

Delay in ms, from onPressIn, before onLongPress is called.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `delayPressIn`

Delay in ms, from the start of the touch, before onPressIn is called.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `accessibilityTraits`

| Type                                                         | Required |
| ------------------------------------------------------------ | -------- |
| View.AccessibilityTraits, ,array of View.AccessibilityTraits | No       |

---

### `onLayout`

Invoked on mount and layout changes with

`{nativeEvent: {layout: {x, y, width, height}}}`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

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
