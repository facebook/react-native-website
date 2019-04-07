---
id: version-0.5-clipboard
title: Clipboard
original_id: clipboard
---

`Clipboard` gives you an interface for setting and getting content from Clipboard on both iOS and Android

### Methods

- [`getString`](clipboard.md#getstring)
- [`setString`](clipboard.md#setstring)

---

# Reference

## Methods

### `getString()`

```javascript
Clipboard.getString();
```

Get content of string type, this method returns a `Promise`, so you can use following code to get clipboard content

```javascript
async _getContent() {
  var content = await Clipboard.getString();
}
```

---

### `setString()`

```javascript
Clipboard.setString(content);
```

Set content of string type. You can use following code to set clipboard content:

```javascript
_setContent() {
  Clipboard.setString('hello world');
}
```

**Parameters:**

| Name    | Type   | Required | Description                                |
| ------- | ------ | -------- | ------------------------------------------ |
| content | string | yes      | The content to be stored in the clipboard. |
