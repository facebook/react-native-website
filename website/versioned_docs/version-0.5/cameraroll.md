---
id: version-0.5-cameraroll
title: CameraRoll
original_id: cameraroll
---

### Methods

- [`saveImageWithTag`](cameraroll.md#saveimagewithtag)
- [`getPhotos`](cameraroll.md#getphotos)

---

# Reference

## Methods

### `saveImageWithTag()`

```jsx
static saveImageWithTag(tag, successCallback, errorCallback)
```

Saves the image with tag `tag` to the camera roll.

@param {string} tag - Can be any of the three kinds of tags we accept: 1. URL 2. assets-library tag 3. tag returned from storing an image in memory

---

### `getPhotos()`

```jsx
static getPhotos(params, callback, errorCallback)
```

Invokes `callback` with photo identifier objects from the local camera roll of the device matching shape defined by `getPhotosReturnChecker`.

@param {object} params - See `getPhotosParamChecker`. @param {function} callback - Invoked with arg of shape defined by `getPhotosReturnChecker` on success. @param {function} errorCallback - Invoked with error message on error.
