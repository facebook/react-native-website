---
id: clipboard
title: Clipboard
---

`Clipboard`组件可以在 iOS 和 Android 的剪贴板中读写内容。

---

# 文档

## 方法

### `getString()`

```jsx
static getString()
```

获取剪贴板的文本内容。返回一个`Promise`，然后你可以用下面的方式来读取剪贴板内容。

```jsx
async _getContent() {
  const content = await Clipboard.getString();
}
```

---

### `setString()`

```jsx
static setString(content)
```

设置剪贴板的文本内容，然后你可以用下面的方式来设置剪贴板内容。

```jsx
_setContent() {
  Clipboard.setString('hello world');
}
```

**Parameters:**

| Name      | Type     | Required | Description                                |
| ------    | ------   | -------- | -------------------------------------------|
| content   | string   | Yes      | The content to be stored in the clipboard  | 

_Notice_

Be careful when you're trying to copy to clipboard any data except `string` and `number`, some data need additional stringification. For example, if you will try to copy array - Android will raise an exception, but iOS will not.
