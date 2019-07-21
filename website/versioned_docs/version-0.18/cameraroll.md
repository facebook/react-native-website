---
id: version-0.18-cameraroll
title: CameraRoll
original_id: cameraroll
---

`CameraRoll` provides access to the local camera roll / gallery.

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

Saves the image to the camera roll / gallery.

The CameraRoll API is not yet implemented for Android.

@param {string} tag On Android, this is a local URI, such as `"file:///sdcard/img.png"`.

On iOS, the tag can be one of the following:

- local URI
- assets-library tag
- a tag not matching any of the above, which means the image data will be stored in memory (and consume memory as long as the process is alive)

@param successCallback Invoked with the value of `tag` on success. @param errorCallback Invoked with error message on error.

---

### `getPhotos()`

```jsx
static getPhotos(params, callback, errorCallback)
```

Invokes `callback` with photo identifier objects from the local camera roll of the device matching shape defined by `getPhotosReturnChecker`.

@param {object} params See `getPhotosParamChecker`. @param {function} callback Invoked with arg of shape defined by `getPhotosReturnChecker` on success. @param {function} errorCallback Invoked with error message on error.
