---
id: version-0.37-cameraroll
title: CameraRoll
original_id: cameraroll
---

`CameraRoll` provides access to the local camera roll / gallery. Before using this you must link the `RCTCameraRoll` library. You can refer to [Linking](https://facebook.github.io/react-native/linking-libraries-ios.md) for help.

### Methods

- [`saveImageWithTag`](cameraroll.md#saveimagewithtag)
- [`saveToCameraRoll`](cameraroll.md#savetocameraroll)
- [`getPhotos`](cameraroll.md#getphotos)

---

# Reference

## Methods

### `saveImageWithTag()`

```jsx
static saveImageWithTag(tag)
```

---

### `saveToCameraRoll()`

```jsx
static saveToCameraRoll(tag, type?)
```

Saves the photo or video to the camera roll / gallery.

On Android, the tag must be a local image or video URI, such as `"file:///sdcard/img.png"`.

On iOS, the tag can be any image URI (including local, remote asset-library and base64 data URIs) or a local video file URI (remote or data URIs are not supported for saving video at this time).

If the tag has a file extension of .mov or .mp4, it will be inferred as a video. Otherwise it will be treated as a photo. To override the automatic choice, you can pass an optional `type` parameter that must be one of 'photo' or 'video'.

Returns a Promise which will resolve with the new URI.

---

### `getPhotos()`

```jsx
static getPhotos(params)
```

Returns a Promise with photo identifier objects from the local camera roll of the device matching shape defined by `getPhotosReturnChecker`.

@param {object} params See `getPhotosParamChecker`.

Returns a Promise which when resolved will be of shape `getPhotosReturnChecker`.
