---
id: version-0.57-imageeditor
title: ImageEditor
original_id: imageeditor
---

### Methods

- [`cropImage`](imageeditor.md#cropimage)

---

# Reference

## Methods

### `cropImage()`

```jsx
static cropImage(uri, cropData, success, failure)
```

Crop the image specified by the URI param. If URI points to a remote image, it will be downloaded automatically. If the image cannot be loaded/downloaded, the `failure` callback will be called.

If the cropping process is successful, the resultant cropped image will be stored in the ImageStore, and the URI returned in the `success` callback will point to the image in the store. Remember to delete the cropped image from the ImageStore when you are done with it.

### cropData

- `offset` - The top-left corner of the cropped image, specified in the original image's coordinate space
- `size` - Size (dimensions) of the cropped image
- `displaySize (optional)` - Size to which you want to scale the cropped image
- `resizeMode (optional)` - Resizing mode to use when scaling the image

```jsx
cropData = {
  offset: {x: number, y: number},
  size: {width: number, height: number},
  displaySize: {width: number, height: number},
  resizeMode: 'contain/cover/stretch',
};
```
