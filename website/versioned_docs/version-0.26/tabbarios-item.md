---
id: version-0.26-tabbarios-item
title: TabBarIOS.Item
original_id: tabbarios-item
---

### Props

- [View props...](view.md#props)

* [`badge`](tabbarios-item.md#badge)
* [`icon`](tabbarios-item.md#icon)
* [`onPress`](tabbarios-item.md#onpress)
* [`renderAsOriginal`](tabbarios-item.md#renderasoriginal)
* [`selected`](tabbarios-item.md#selected)
* [`selectedIcon`](tabbarios-item.md#selectedicon)
* [`style`](tabbarios-item.md#style)
* [`systemIcon`](tabbarios-item.md#systemicon)
* [`title`](tabbarios-item.md#title)

---

# Reference

## Props

### `badge`

Little red bubble that sits at the top right of the icon.

| Type            | Required |
| --------------- | -------- |
| string, ,number | No       |

---

### `icon`

A custom icon for the tab. It is ignored when a system icon is defined.

| Type                   | Required |
| ---------------------- | -------- |
| Image.propTypes.source | No       |

---

### `onPress`

Callback when this tab is being selected, you should change the state of your component to set selected={true}.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `renderAsOriginal`

If set to true it renders the image as original, it defaults to being displayed as a template

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `selected`

It specifies whether the children are visible or not. If you see a blank content, you probably forgot to add a selected one.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `selectedIcon`

A custom icon when the tab is selected. It is ignored when a system icon is defined. If left empty, the icon will be tinted in blue.

| Type                   | Required |
| ---------------------- | -------- |
| Image.propTypes.source | No       |

---

### `style`

React style object.

| Type                  | Required |
| --------------------- | -------- |
| [View](view.md#style) | No       |

---

### `systemIcon`

Items comes with a few predefined system icons. Note that if you are using them, the title and selectedIcon will be overridden with the system ones.

| Type                                                                                                                                                   | Required |
| ------------------------------------------------------------------------------------------------------------------------------------------------------ | -------- |
| enum('bookmarks', 'contacts', 'downloads', 'favorites', 'featured', 'history', 'more', 'most-recent', 'most-viewed', 'recents', 'search', 'top-rated') | No       |

---

### `title`

Text that appears under the icon. It is ignored when a system icon is defined.

| Type   | Required |
| ------ | -------- |
| string | No       |
