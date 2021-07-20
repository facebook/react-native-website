---
id: cameraroll
title: '🚧 CameraRoll'
---

> **Deprecated.** Use one of the [community packages](https://reactnative.directory/?search=cameraroll) instead.

`CameraRoll` provides access to the local camera roll or photo library.

On iOS, the `CameraRoll` API requires the `RCTCameraRoll` library to be linked. You can refer to [Linking Libraries (iOS)](linking-libraries-ios.md) to learn more.

### Permissions

The user's permission is required in order to access the Camera Roll on devices running iOS 10 or later. Add the `NSPhotoLibraryUsageDescription` key in your `Info.plist` with a string that describes how your app will use this data. This key will appear as `Privacy - Photo Library Usage Description` in Xcode.

If you are targeting devices running iOS 11 or later, you will also need to add the `NSPhotoLibraryAddUsageDescription` key in your `Info.plist`. Use this key to define a string that describes how your app will use this data. By adding this key to your `Info.plist`, you will be able to request write-only access permission from the user. If you try to save to the camera roll without this permission, your app will exit.

---

# Reference

## Methods

### `saveToCameraRoll()`

```jsx
CameraRoll.saveToCameraRoll(tag, [type]);
```

Saves the photo or video to the camera roll or photo library.

On Android, the tag must be a local image or video URI, such as `"file:///sdcard/img.png"`.

On iOS, the tag can be any image URI (including local, remote asset-library and base64 data URIs) or a local video file URI (remote or data URIs are not supported for saving video at this time).

If the tag has a file extension of .mov or .mp4, it will be inferred as a video. Otherwise it will be treated as a photo. To override the automatic choice, you can pass an optional `type` parameter that must be one of 'photo' or 'video'.

Returns a Promise which will resolve with the new URI.

**Parameters:**

| Name | Type                   | Required | Description                                                |
| ---- | ---------------------- | -------- | ---------------------------------------------------------- |
| tag  | string                 | Yes      | See above.                                                 |
| type | enum('photo', 'video') | No       | Overrides automatic detection based on the file extension. |

---

### `getPhotos()`

```jsx
CameraRoll.getPhotos(params);
```

Returns a Promise with photo identifier objects from the local camera roll of the device matching shape defined by `getPhotosReturnChecker`.

**Parameters:**

| Name   | Type   | Required | Description                                      |
| ------ | ------ | -------- | ------------------------------------------------ |
| params | object | Yes      | Expects a params with the shape described below. |

- `first` : {number} : The number of photos wanted in reverse order of the photo application (i.e. most recent first for SavedPhotos).
- `after` : {string} : A cursor that matches `page_info { end_cursor }` returned from a previous call to `getPhotos`.
- `groupTypes` : {string} : Specifies which group types to filter the results to. Valid values are:
  - `Album`
  - `All`
  - `Event`
  - `Faces`
  - `Library`
  - `PhotoStream`
  - `SavedPhotos` // default
- `groupName` : {string} : Specifies filter on group names, like 'Recent Photos' or custom album titles.
- `assetType` : {string} : Specifies filter on asset type. Valid values are:
  - `All`
  - `Videos`
  - `Photos` // default
- `mimeTypes` : {Array} : Filter by mimetype (e.g. image/jpeg).

Returns a Promise which when resolved will be of the following shape:

- `edges` : {Array&lt;node&gt;} An array of node objects
  - `node`: {object} An object with the following shape:
    - `type`: {string}
    - `group_name`: {string}
    - `image`: {object} : An object with the following shape:
      - `uri`: {string}
      - `height`: {number}
      - `width`: {number}
      - `isStored`: {boolean}
      - `playableDuration`: {number}
    - `timestamp`: {number}
    - `location`: {object} : An object with the following shape:
      - `latitude`: {number}
      - `longitude`: {number}
      - `altitude`: {number}
      - `heading`: {number}
      - `speed`: {number}
- `page_info` : {object} : An object with the following shape:
  - `has_next_page`: {boolean}
  - `start_cursor`: {string}
  - `end_cursor`: {string}

#### Example

Loading images:

```jsx
_handleButtonPress = () => {
   CameraRoll.getPhotos({
       first: 20,
       assetType: 'Photos',
     })
     .then(r => {
       this.setState({ photos: r.edges });
     })
     .catch((err) => {
        //Error Loading Images
     });
   };
render() {
 return (
   <View>
     <Button title="Load Images" onPress={this._handleButtonPress} />
     <ScrollView>
       {this.state.photos.map((p, i) => {
       return (
         <Image
           key={i}
           style={{
             width: 300,
             height: 100,
           }}
           source={{ uri: p.node.image.uri }}
         />
       );
     })}
     </ScrollView>
   </View>
 );
}
```
