---
id: version-0.19-touchablewithoutfeedback
title: TouchableWithoutFeedback
original_id: touchablewithoutfeedback
---

Do not use unless you have a very good reason. All the elements that respond to press should have a visual feedback when touched. This is one of the primary reason a "web" app doesn't feel "native".

> **NOTE**: TouchableWithoutFeedback supports only one child
>
> If you wish to have several child components, wrap them in a View.

### Props

- [`onLayout`](touchablewithoutfeedback.md#onlayout)
- [`accessibilityComponentType`](touchablewithoutfeedback.md#accessibilitycomponenttype)
- [`accessible`](touchablewithoutfeedback.md#accessible)
- [`delayLongPress`](touchablewithoutfeedback.md#delaylongpress)
- [`delayPressIn`](touchablewithoutfeedback.md#delaypressin)
- [`delayPressOut`](touchablewithoutfeedback.md#delaypressout)
- [`accessibilityTraits`](touchablewithoutfeedback.md#accessibilitytraits)
- [`onLongPress`](touchablewithoutfeedback.md#onlongpress)
- [`onPress`](touchablewithoutfeedback.md#onpress)
- [`onPressIn`](touchablewithoutfeedback.md#onpressin)
- [`onPressOut`](touchablewithoutfeedback.md#onpressout)
- [`pressRetentionOffset`](touchablewithoutfeedback.md#pressretentionoffset)

---

# Reference

## Props

### `onLayout`

Invoked on mount and layout changes with

`{nativeEvent: {layout: {x, y, width, height}}}`

| Type     | Required |
| -------- | -------- |
| function | No       |

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

### `delayPressOut`

Delay in ms, from the release of the touch, before onPressOut is called.

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `accessibilityTraits`

| Type                                                         | Required |
| ------------------------------------------------------------ | -------- |
| View.AccessibilityTraits, ,array of View.AccessibilityTraits | No       |

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

---

### `pressRetentionOffset`

When the scroll view is disabled, this defines how far your touch may move off of the button, before deactivating the button. Once deactivated, try moving it back and you'll see that the button is once again reactivated! Move it back and forth several times while the scroll view is disabled. Ensure you pass in a constant to reduce memory allocations.

| Type                                                               | Required |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | No       |
