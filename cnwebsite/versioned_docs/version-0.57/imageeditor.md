---
id: version-0.57-imageeditor
title: ImageEditor
original_id: imageeditor
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

### 查看方法

* [`cropImage`](imageeditor.md#cropimage)

---

# 文档

## 方法

### `cropImage()`

```jsx
static cropImage(uri, cropData, success, failure)
```

根据指定的 URI 参数剪裁对应的图片。如果 URI 指向一个远程图片，则首先会自动下载该图片。如果图片无法下载或读取，则调用`failure`回调函数。

如果剪裁成功完成，则剪裁好的图片会被存放在[`ImageStore`](imagestore.md)中，同时`success`回调函数中返回的 URI 参数会指向 ImageStore 中的此图片。请记得在完成处理逻辑后删除 ImageStore 中的图片。

### cropData

* `offset` - The top-left corner of the cropped image, specified in the original image's coordinate space
* `size` - Size (dimensions) of the cropped image
* `displaySize (optional)` - Size to which you want to scale the cropped image
* `resizeMode (optional)` - Resizing mode to use when scaling the image

```jsx
cropData = {
  offset: {x: number, y: number},
  size: {width: number, height: number},
  displaySize: {width: number, height: number},
  resizeMode: 'contain/cover/stretch',
};
```