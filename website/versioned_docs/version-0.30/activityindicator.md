---
id: version-0.30-activityindicator
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

Size of the indicator. Small has a height of 20, large has a height of 36. Other sizes can be obtained using a scale transform.

| Type | Required |
| ---- | -------- |


| PropTypes.oneOf([ 'small', 'large', ]) | No |

---

### `hidesWhenStopped`

Whether the indicator should hide when not animating (true by default).

| Type           | Required | Platform |
| -------------- | -------- | -------- |
| PropTypes.bool | No       | iOS      |
