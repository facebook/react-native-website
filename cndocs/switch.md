---
id: switch
title: Switch
---

Renders a boolean input.

This is a controlled component that requires an `onValueChange` callback that updates the `value` prop in order for the component to reflect user actions. If the `value` prop is not updated, the component will continue to render the supplied `value` prop instead of the expected result of any user actions.

@keyword checkbox @keyword toggle

### Props

* [View props...](view.md#props)

- [`disabled`](switch.md#disabled)
- [`onTintColor`](switch.md#ontintcolor)
- [`onValueChange`](switch.md#onvaluechange)
- [`testID`](switch.md#testid)
- [`thumbTintColor`](switch.md#thumbtintcolor)
- [`tintColor`](switch.md#tintcolor)
- [`value`](switch.md#value)

---

# 文档

## Props

### `disabled`

If true the user won't be able to toggle the switch. Default value is false.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `onTintColor`

Background color when the switch is turned on.

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `onValueChange`

Invoked with the new value when the value changes.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `testID`

Used to locate this view in end-to-end tests.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `thumbTintColor`

Color of the foreground switch grip. If this is set on iOS, the switch grip will lose its drop shadow.

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `tintColor`

Border color on iOS and background color on Android when the switch is turned off.

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `value`

The value of the switch. If true the switch will be turned on. Default value is false.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |
