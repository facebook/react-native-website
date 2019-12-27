---
id: version-0.61-clipboard
title: Clipboard
original_id: clipboard
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(80.77%), [not.committed.yet](https://github.com/search?q=not.committed.yet+in%3Aemail&type=Users)(17.31%), [774866545](https://github.com/search?q=774866545%40qq.com+in%3Aemail&type=Users)(1.92%)

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
