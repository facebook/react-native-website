---
id: version-0.55-clipboard
title: Clipboard
original_id: clipboard
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

`Clipboard`组件可以在 iOS 和 Android 的剪贴板中读写内容。

### 查看方法

* [`getString`](clipboard.md#getstring)
* [`setString`](clipboard.md#setstring)

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
  var content = await Clipboard.getString();
}
```

---

### `setString()`

```jsx
static setString(content)
```

设置剪贴板的文本内容。返回一个`Promise`，然后你可以用下面的方式来设置剪贴板内容。

```jsx
_setContent() {
  Clipboard.setString('hello world');
}
```

@param 要写入剪贴板的内容
