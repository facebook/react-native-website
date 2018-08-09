---
id: imageeditor
title: ImageEditor
---

### Methods

* [`cropImage`](imageeditor.md#cropimage)

---

# Reference

## Methods

### `cropImage()`

```javascript
static cropImage(uri, cropData, success, failure)
```

Crop the image specified by the URI param. If URI points to a remote image, it will be downloaded automatically. If the image cannot be loaded/downloaded, the failure callback will be called.

If the cropping process is successful, the resultant cropped image will be stored in the ImageStore, and the URI returned in the success callback will point to the image in the store. Remember to delete the cropped image from the ImageStore when you are done with it.

The cropData keys:

* #### offset: { x: number, y: number }
  The top-left corner of the cropped image, specified in the original image's coordinate space
* #### size: { width: number, height: number }
  Size (dimensions) of the cropped image
displaySize (optional): { width: number, height: number }
 Size to which you want to scale the cropped image
* #### resizeMode (optional): 'contain/cover/stretch' 
  Resizing mode to use when scaling the imageWhen ImageEditor succeeds in cropping the image, it will store it automatically    into ImageStore and execute successCallback, passing the URI that points to ImageStore.
