---
id: version-0.24-actionsheetios
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

Display an iOS action sheet. The `options` object must contain one or more of:

- `options` (array of strings) - a list of button titles (required)
- `cancelButtonIndex` (int) - index of cancel button in `options`
- `destructiveButtonIndex` (int) - index of destructive button in `options`
- `title` (string) - a title to show above the action sheet
- `message` (string) - a message to show below the title

---

### `showShareActionSheetWithOptions()`

```jsx
static showShareActionSheetWithOptions(options, failureCallback, successCallback)
```

Display the iOS share sheet. The `options` object should contain one or both of:

- `message` (string) - a message to share
- `url` (string) - a URL to share

NOTE: if `url` points to a local file, or is a base64-encoded uri, the file it points to will be loaded and shared directly. In this way, you can share images, videos, PDF files, etc.
