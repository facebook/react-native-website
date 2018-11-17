---
id: version-0.57-touchablewithoutfeedback
title: TouchableWithoutFeedback
original_id: touchablewithoutfeedback
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

除非你有一个很好的理由，否则不要用这个组件。所有能够响应触屏操作的元素在触屏后都应该有一个视觉上的反馈（然而本组件没有任何视觉反馈），这也是为什么一个"web"应用总是显得不够"原生"的主要原因之一。

注意`TouchableWithoutFeedback`只支持一个子节点（不能没有子节点也不能多于一个）。如果你希望包含多个子组件，可以用一个View来包装它们。

> 译注：常见的使用场景比如想实现点击空白处触发某个操作，那么就可以把空白部分用`TouchableWithoutFeedback`包起来，或者绝对定位覆盖住。

### 查看Props

* [`accessibilityComponentType`](touchablewithoutfeedback.md#accessibilitycomponenttype)
* [`accessibilityHint`](touchablewithoutfeedback.md#accessibilityhint)
* [`accessibilityLabel`](touchablewithoutfeedback.md#accessibilitylabel)
* [`accessibilityRole`](view.md#accessibilityrole)
* [`accessibilityStates`](view.md#accessibilitystates)
* [`accessibilityTraits`](touchablewithoutfeedback.md#accessibilitytraits)
* [`accessible`](touchablewithoutfeedback.md#accessible)
* [`delayLongPress`](touchablewithoutfeedback.md#delaylongpress)
* [`delayPressIn`](touchablewithoutfeedback.md#delaypressin)
* [`delayPressOut`](touchablewithoutfeedback.md#delaypressout)
* [`disabled`](touchablewithoutfeedback.md#disabled)
* [`hitSlop`](touchablewithoutfeedback.md#hitslop)
* [`onBlur`](touchablewithoutfeedback.md#onblur)
* [`onFocus`](touchablewithoutfeedback.md#onfocus)
* [`onLayout`](touchablewithoutfeedback.md#onlayout)
* [`onLongPress`](touchablewithoutfeedback.md#onlongpress)
* [`onPress`](touchablewithoutfeedback.md#onpress)
* [`onPressIn`](touchablewithoutfeedback.md#onpressin)
* [`onPressOut`](touchablewithoutfeedback.md#onpressout)
* [`pressRetentionOffset`](touchablewithoutfeedback.md#pressretentionoffset)
* [`testID`](touchablewithoutfeedback.md#testid)

### 查看类型定义

* [`Event`](touchablewithoutfeedback.md#event)

---

# 文档

## Props

### `accessibilityComponentType`

_> Note: `accessibilityComponentType`will soon be deprecated. When possible, use `accessibilityRole` and `accessibilityStates` instead._

| 类型                        | 必填 |
| --------------------------- | -------- |
| AccessibilityComponentTypes | 否       |

---

### `accessibilityHint`

An accessibility hint helps users understand what will happen when they perform an action on the accessibility element when that result is not obvious from the accessibility label.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `accessibilityLabel`

Overrides the text that's read by the screen reader when the user interacts with the element. By default, the label is constructed by traversing all the children and accumulating all the `Text` nodes separated by space.

| 类型 | 必填 |
| ---- | -------- |
| node | 否       |

---

### `accessibilityRole`

| 类型                        | 必填 |
| --------------------------- | -------- |
| AccessibilityRoles          | 否       |

---

### `accessibilityStates`

| 类型                         | 必填 |
| ---------------------------- | -------- |
| array of AccessibilityStates | 否       |

---

### `accessibilityTraits`

| 类型                                               | 必填 |
| -------------------------------------------------- | -------- |
| AccessibilityTraits, ,array of AccessibilityTraits | 否       |

---

### `accessible`

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `delayLongPress`

从onPressIn开始，到onLongPress被调用的延迟。单位是毫秒.

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `delayPressIn`

从触摸操作开始到onPressIn被调用的延迟。单位是毫秒。

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `delayPressOut`

从触摸操作结束开始到onPressOut被调用的延迟。单位是毫秒。

| 类型   | 必填 |
| ------ | -------- |
| number | 否       |

---

### `disabled`

如果设为true，则禁止此组件的一切交互。

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `hitSlop`

这一属性定义了按钮的外延范围。这一范围也会使`pressRetentionOffset`变得更大。
**注意：** 触摸范围不会超过父视图的边界，也不会影响原先和本组件层叠的视图（保留原先的触摸优先级）。

| 类型                                                               | 必填 |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | 否       |

---

### `onBlur`

Invoked when the item loses focus.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onFocus`

Invoked when the item receives focus.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `onLayout`

当加载或者布局改变的时候被调用，参数为：

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

当触摸操作结束时调用，但如果被取消了则不调用（譬如响应者被一个滚动操作取代）。

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

在当前视图不能滚动的前提下指定这个属性，可以决定当手指移开多远距离之后，会不再激活按钮。但如果手指再次移回范围内，按钮会被再次激活。只要视图不能滚动，你可以来回多次这样的操作。确保你传入一个常量来减少内存分配。

| 类型                                                               | 必填 |
| ------------------------------------------------------------------ | -------- |
| object: {top: number, left: number, bottom: number, right: number} | 否       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

## 类型定义

### Event

| 类型   |
| ------ |
| Object |
