---
id: version-0.32-activityindicator
title: ActivityIndicator
original_id: activityindicator
---

Displays a circular loading indicator.

### Props

- [View props...](view.md#props)

* [`animating`](activityindicator.md#animating)
* [`color`](activityindicator.md#color)
* [`size`](activityindicator.md#size)
* [`hidesWhenStopped`](activityindicator.md#hideswhenstopped)

---

# Reference

## Props

### `animating`

Whether to show the indicator (true, the default) or hide it (false).

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `color`

The foreground color of the spinner (default is gray).

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `size`

Size of the indicator (default is 'small'). Passing a number to the size prop is only supported on Android.

| Type | Required |
| ---- | -------- |


| PropTypes.oneOfType([ PropTypes.oneOf([ 'small', 'large' ]), PropTypes.number, ]) | No |

---

### `hidesWhenStopped`

Whether the indicator should hide when not animating (true by default).

| Type           | Required | Platform |
| -------------- | -------- | -------- |
| PropTypes.bool | No       | iOS      |
