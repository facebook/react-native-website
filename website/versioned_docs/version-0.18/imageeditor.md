---
id: version-0.18-imageeditor
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

Crop the image specified by the URI param. If URI points to a remote image, it will be downloaded automatically. If the image cannot be loaded/downloaded, the failure callback will be called.

If the cropping process is successful, the resultant cropped image will be stored in the ImageStore, and the URI returned in the success callback will point to the image in the store. Remember to delete the cropped image from the ImageStore when you are done with it.
