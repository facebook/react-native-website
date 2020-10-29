---
id: clipboard
title: '🚧 Clipboard'
---

> **Deprecated.** Use [@react-native-community/clipboard](https://github.com/react-native-clipboard/clipboard) instead.

`Clipboard` gives you an interface for setting and getting content from Clipboard on both Android and iOS

---

# Reference

## Methods

### `getString()`

```jsx
static getString()
```

Get content of string type, this method returns a `Promise`, so you can use following code to get clipboard content

```jsx
async _getContent() {
  var content = await Clipboard.getString();
}
```

---

### `setString()`

```jsx
static setString(content)
```

Set content of string type. You can use following code to set clipboard content

```jsx
_setContent() {
  Clipboard.setString('hello world');
}
```

@param the content to be stored in the clipboard.
