---
id: version-0.57-imagestore
title: ImageStore
original_id: imagestore
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

### 方法

* [`hasImageForTag`](imagestore.md#hasimagefortag)
* [`removeImageForTag`](imagestore.md#removeimagefortag)
* [`addImageFromBase64`](imagestore.md#addimagefrombase64)
* [`getBase64ForTag`](imagestore.md#getbase64fortag)

---

# 文档

## 查看方法

### `hasImageForTag()`

```javascript
static hasImageForTag(uri, callback)
```

检查 ImageStore 中是否包含了指定 URI 的图片数据。目前仅限 iOS。

---

### `removeImageForTag()`

```javascript
static removeImageForTag(uri)
```

从 ImageStore 中删除指定图片。存储在 ImageStore 中的图标必须手动删除，否则在应用退出之前将会一直占用内存。调用此删除方法并不需要先调用`hasImageForTag()`方法来检查，此方法会自动处理异常情况。目前仅限 iOS。

---

### `addImageFromBase64()`

```javascript
static addImageFromBase64(base64ImageData, success, failure)
```

在 ImageStore 中以 base64 编码格式存储一幅图片，并返回一个 URI 以便访问或显示此图片。图片数据仅仅保存在内存中，在使用完毕后请调用`removeImageForTag()`方法来手动删除。

注意在 JS 和原生代码间传递大量二进制数据是非常低效的，所以若非必要，请尽量少用此方法。目前仅限 iOS。

---

### `getBase64ForTag()`

```javascript
static getBase64ForTag(uri, success, failure)
```

将 ImageStore 中的指定 URI 图片以 base64 编码格式的数据返回。如果找不到指定的 URI，则会调用 failure 回调函数。

注意在 JS 和原生代码间传递大量二进制数据是非常低效的，所以若非必要，请尽量少用此方法。如果只是为了显示图片，可以直接把 URI 传递给`<Image/>`组件，并不需要额外取 base64 数据。
