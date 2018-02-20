---
id: checkbox
title: CheckBox
---

Renders a boolean input (Android only).

This is a controlled component that requires an `onValueChange` callback that updates the `value` prop in order for the component to reflect user actions. If the `value` prop is not updated, the component will continue to render the supplied `value` prop instead of the expected result of any user actions.

@keyword checkbox @keyword toggle

### Props

* [View props...](view.md#props)

- [`disabled`](checkbox.md#disabled)
- [`onChange`](checkbox.md#onchange)
- [`onValueChange`](checkbox.md#onvaluechange)
- [`testID`](checkbox.md#testid)
- [`value`](checkbox.md#value)

---

# 文档

## Props

### `disabled`

If true the user won't be able to toggle the checkbox. Default value is false.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `onChange`

Used in case the props change removes the component.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

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

### `value`

The value of the checkbox. If true the checkbox will be turned on. Default value is false.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |
