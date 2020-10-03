---
id: version-0.28-tabbarios
title: TabBarIOS
original_id: tabbarios
---

# Reference

## Props

### `barTintColor`

Background color of the tab bar

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `itemPositioning`

Specifies tab bar item positioning. Available values are:

- fill - distributes items across the entire width of the tab bar
- center - centers item in the available tab bar space
- auto (default) - distributes items dynamically according to the user interface idiom. In a horizontally compact environment (e.g. iPhone 5) this value defaults to `fill`, in a horizontally regular one (e.g. iPad) it defaults to center.

| Type                           | Required |
| ------------------------------ | -------- |
| enum('fill', 'center', 'auto') | No       |

---

### `style`

| Type                  | Required |
| --------------------- | -------- |
| [View](view.md#style) | No       |

---

### `tintColor`

Color of the currently selected tab icon

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |

---

### `translucent`

A Boolean value that indicates whether the tab bar is translucent

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `unselectedTintColor`

Color of text on unselected tabs

| Type               | Required |
| ------------------ | -------- |
| [color](colors.md) | No       |
