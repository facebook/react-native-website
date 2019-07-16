---
id: version-0.20-cameraroll
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
static saveImageWithTag(tag)
```

Saves the image to the camera roll / gallery.

On Android, the tag is a local URI, such as `"file:///sdcard/img.png"`.

On iOS, the tag can be one of the following:

- local URI
- assets-library tag
- a tag not matching any of the above, which means the image data will be stored in memory (and consume memory as long as the process is alive)

Returns a Promise which when resolved will be passed the new URI.

---

### `getPhotos()`

```jsx
static getPhotos(params)
```

Returns a Promise with photo identifier objects from the local camera roll of the device matching shape defined by `getPhotosReturnChecker`.

@param {object} params See `getPhotosParamChecker`.

Returns a Promise which when resolved will be of shape `getPhotosReturnChecker`.
