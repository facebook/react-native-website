---
id: version-0.18-refreshcontrol
title: RefreshControl
original_id: refreshcontrol
---

This component is used inside a ScrollView to add pull to refresh functionality. When the ScrollView is at `scrollY: 0`, swiping down triggers an `onRefresh` event.

### Props

- [`onRefresh`](refreshcontrol.md#onrefresh)
- [`refreshing`](refreshcontrol.md#refreshing)
- [`colors`](refreshcontrol.md#colors)
- [`enabled`](refreshcontrol.md#enabled)
- [`progressBackgroundColor`](refreshcontrol.md#progressbackgroundcolor)
- [`size`](refreshcontrol.md#size)
- [`tintColor`](refreshcontrol.md#tintcolor)
- [`title`](refreshcontrol.md#title)

---

# Reference

## Props

### `onRefresh`

Called when the view starts refreshing.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `refreshing`

Whether the view should be indicating an active refresh.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `colors`

The colors (at least one) that will be used to draw the refresh indicator.

| Type                        | Required | Platform |
| --------------------------- | -------- | -------- |
| array of [color](colors.md) | No       | Android  |

---

### `enabled`

Whether the pull to refresh functionality is enabled.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `progressBackgroundColor`

The background color of the refresh indicator.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | Android  |

---

### `size`

Size of the refresh indicator, see RefreshControl.SIZE.

| Type                             | Required | Platform |
| -------------------------------- | -------- | -------- |
| RefreshLayoutConsts.SIZE.DEFAULT | No       | Android  |

---

### `tintColor`

The color of the refresh indicator.

| Type               | Required | Platform |
| ------------------ | -------- | -------- |
| [color](colors.md) | No       | iOS      |

---

### `title`

The title displayed under the refresh indicator.

| Type   | Required | Platform |
| ------ | -------- | -------- |
| string | No       | iOS      |
