---
id: version-0.55-touchablewithoutfeedback
title: TouchableWithoutFeedback
original_id: touchablewithoutfeedback
---

Do not use unless you have a very good reason. All elements that respond to press should have a visual feedback when touched.

TouchableWithoutFeedback supports only one child. If you wish to have several child components, wrap them in a View.

### Props

* [`hitSlop`](touchablewithoutfeedback.md#hitslop)
* [`accessibilityComponentType`](touchablewithoutfeedback.md#accessibilitycomponenttype)
* [`accessible`](touchablewithoutfeedback.md#accessible)
* [`delayLongPress`](touchablewithoutfeedback.md#delaylongpress)
* [`delayPressIn`](touchablewithoutfeedback.md#delaypressin)
* [`delayPressOut`](touchablewithoutfeedback.md#delaypressout)
* [`disabled`](touchablewithoutfeedback.md#disabled)
* [`accessibilityTraits`](touchablewithoutfeedback.md#accessibilitytraits)
* [`onLayout`](touchablewithoutfeedback.md#onlayout)
* [`onLongPress`](touchablewithoutfeedback.md#onlongpress)
* [`onPress`](touchablewithoutfeedback.md#onpress)
* [`onPressIn`](touchablewithoutfeedback.md#onpressin)
* [`onPressOut`](touchablewithoutfeedback.md#onpressout)
* [`pressRetentionOffset`](touchablewithoutfeedback.md#pressretentionoffset)

### Type Definitions

* [`Event`](touchablewithoutfeedback.md#event)

---

# 文档

## Props

### `hitSlop`

This defines how far your touch can start away from the button. This is added to `pressRetentionOffset` when moving off of the button. ** NOTE ** The touch area never extends past the parent view bounds and the Z-index of sibling views always takes precedence if a touch hits two overlapping views.

| 类型                                                               | 必填 |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | 否       |

---

### `accessibilityComponentType`

| 类型                        | 必填 |
| --------------------------- | -------- |
| AccessibilityComponentTypes | 否       |

---

### `accessible`

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `delayLongPress`

Delay in ms, from onPressIn, before onLongPress is called.

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `delayPressIn`

Delay in ms, from the start of the touch, before onPressIn is called.

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `delayPressOut`

Delay in ms, from the release of the touch, before onPressOut is called.

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `disabled`

If true, disable all interactions for this component.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `accessibilityTraits`

| 类型                                               | 必填 |
| -------------------------------------------------- | -------- |
| AccessibilityTraits, ,array of AccessibilityTraits | 否       |

---

### `onLayout`

Invoked on mount and layout changes with

`{nativeEvent: {layout: {x, y, width, height}}}`

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onLongPress`

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onPress`

Called when the touch is released, but not if cancelled (e.g. by a scroll that steals the responder lock).

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onPressIn`

Called as soon as the touchable element is pressed and invoked even before onPress. This can be useful when making network requests.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `onPressOut`

Called as soon as the touch is released even before onPress.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `pressRetentionOffset`

When the scroll view is disabled, this defines how far your touch may move off of the button, before deactivating the button. Once deactivated, try moving it back and you'll see that the button is once again reactivated! Move it back and forth several times while the scroll view is disabled. Ensure you pass in a constant to reduce memory allocations.

| 类型                                                               | 必填 |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | 否       |

## Type Definitions

### Event

| 类型   |
| ------ |
| Object |
