---
id: version-0.22-actionsheetios
title: ActionSheetIOS
original_id: actionsheetios
---

### Methods

- [`showActionSheetWithOptions`](actionsheetios.md#showactionsheetwithoptions)
- [`showShareActionSheetWithOptions`](actionsheetios.md#showshareactionsheetwithoptions)

---

# Reference

## Methods

### `showActionSheetWithOptions()`

```jsx
static showActionSheetWithOptions(options, callback)
```

---

### `showShareActionSheetWithOptions()`

```jsx
static showShareActionSheetWithOptions(options, failureCallback, successCallback)
```

Display the iOS share sheet. The `options` object should contain one or both of:

- `message` (string) - a message to share
- `url` (string) - a URL to share

NOTE: if `url` points to a local file, or is a base64-encoded uri, the file it points to will be loaded and shared directly. In this way, you can share images, videos, PDF files, etc.
