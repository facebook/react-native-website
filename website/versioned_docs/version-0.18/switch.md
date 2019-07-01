---
id: version-0.18-switch
title: Switch
original_id: switch
---

Universal two-state toggle component.

### Props

- [View props...](view.md#props)

* [`disabled`](switch.md#disabled)
* [`onValueChange`](switch.md#onvaluechange)
* [`testID`](switch.md#testid)
* [`value`](switch.md#value)
* [`onTintColor`](switch.md#ontintcolor)
* [`thumbTintColor`](switch.md#thumbtintcolor)
* [`tintColor`](switch.md#tintcolor)

---

# Reference

## Props

### `disabled`

If true the user won't be able to toggle the switch. Default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `onValueChange`

Invoked with the new value when the value changes.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `testID`

Used to locate this view in end-to-end tests.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `value`

The value of the switch. If true the switch will be turned on. Default value is false.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `onTintColor`

Background color when the switch is turned on.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | iOS      |

---

### `thumbTintColor`

Color of the foreground switch grip.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | iOS      |

---

### `tintColor`

Background color when the switch is turned off.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | iOS      |
