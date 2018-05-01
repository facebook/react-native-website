---
id: version-0.55-tabbarios-item
title: TabBarIOS.Item
original_id: tabbarios-item
---

### Props

* [View props...](view.md#props)

- [`selected`](tabbarios-item.md#selected)
- [`badge`](tabbarios-item.md#badge)
- [`icon`](tabbarios-item.md#icon)
- [`onPress`](tabbarios-item.md#onpress)
- [`renderAsOriginal`](tabbarios-item.md#renderasoriginal)
- [`badgeColor`](tabbarios-item.md#badgecolor)
- [`selectedIcon`](tabbarios-item.md#selectedicon)
- [`style`](tabbarios-item.md#style)
- [`systemIcon`](tabbarios-item.md#systemicon)
- [`title`](tabbarios-item.md#title)
- [`isTVSelectable`](tabbarios-item.md#istvselectable)

---

# 文档

## Props

### `selected`

It specifies whether the children are visible or not. If you see a blank content, you probably forgot to add a selected one.

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `badge`

Little red bubble that sits at the top right of the icon.

| 类型            | 必填 |
| --------------- | -------- |
| string, ,number | 否       |

---

### `icon`

A custom icon for the tab. It is ignored when a system icon is defined.

| 类型                   | 必填 |
| ---------------------- | -------- |
| Image.propTypes.source | 否       |

---

### `onPress`

Callback when this tab is being selected, you should change the state of your component to set selected={true}.

| 类型     | 必填 |
| -------- | -------- |
| function | 否       |

---

### `renderAsOriginal`

If set to true it renders the image as original, it defaults to being displayed as a template

| 类型 | 必填 |
| ---- | -------- |
| bool | 否       |

---

### `badgeColor`

Background color for the badge. Available since iOS 10.

| 类型               | 必填 |
| ------------------ | -------- |
| [color](colors.md) | 否       |

---

### `selectedIcon`

A custom icon when the tab is selected. It is ignored when a system icon is defined. If left empty, the icon will be tinted in blue.

| 类型                   | 必填 |
| ---------------------- | -------- |
| Image.propTypes.source | 否       |

---

### `style`

React style object.

| 类型       | 必填 |
| ---------- | -------- |
| View.style | 否       |

---

### `systemIcon`

Items comes with a few predefined system icons. Note that if you are using them, the title and selectedIcon will be overridden with the system ones.

| 类型                                                                                                                                                   | 必填 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| enum('bookmarks', 'contacts', 'downloads', 'favorites', 'featured', 'history', 'more', 'most-recent', 'most-viewed', 'recents', 'search', 'top-rated') | 否       |

---

### `title`

Text that appears under the icon. It is ignored when a system icon is defined.

| 类型   | 必填 |
| ------ | -------- |
| string | 否       |

---

### `isTVSelectable`

(Apple TV only)\* When set to true, this view will be focusable and navigable using the Apple TV remote.

| 类型 | 必填 | 平台 |
| ---- | -------- | -------- |
| bool | 否       | iOS      |
