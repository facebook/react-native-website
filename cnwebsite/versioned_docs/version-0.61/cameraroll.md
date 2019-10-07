---
id: version-0.61-cameraroll
title: CameraRoll
original_id: cameraroll
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

`CameraRoll`模块提供了访问本地相册的功能。在 iOS 上使用这个模块之前，你需要先链接`RCTCameraRoll`库，具体做法请参考[链接原生库](linking-libraries-ios.md)文档。

**译注**：本模块只提供了基本的访问图片的功能，并没有提供相册界面。对于多数开发者来说，可能第三方的[react-native-image-crop-picker](https://github.com/ivpusic/react-native-image-crop-picker)的功能更为完整易用（可多选、压缩、裁剪等）。

### 权限

从 iOS 10 开始，访问相册需要用户授权。你需要在`Info.plist`中添加一条名为`NSPhotoLibraryUsageDescription`的键，然后在其值中填写向用户请求权限的具体描述。编辑完成后这个键在 Xcode 中实际会显示为`Privacy - Photo Library Usage Description`。

从 iOS 11 开始，如果需要保存图片，则需要额外申请用户授权。你需要在`Info.plist`中添加一条名为`NSPhotoLibraryAddUsageDescription`的键，然后在其值中填写向用户请求权限的具体描述。编辑完成后这个键在 Xcode 中实际会显示为`Privacy - Photo Library Additions Usage Description`。而名为`NSPhotoLibraryUsageDescription`的键此时仅控制相册的读取。具体说明请翻阅[官方文档](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html)搜索相关键值。

### 查看方法

* [`saveToCameraRoll`](cameraroll.md#savetocameraroll)
* [`getPhotos`](cameraroll.md#getphotos)

---

# 文档

## 方法

### `saveToCameraRoll()`

```jsx
CameraRoll.saveToCameraRoll(tag, [type]);
```

保存一个图片或视频到相册或图库。

在 Android 上，tag 是一个本地 URI，例如`"file:///sdcard/img.png"`.

在 iOS， tag 可以是任意图片 URI（本地或是远程 asset-library、base64），也可以是本地视频文件的 URI（远程和 base64 目前还不支持）。

If the tag has a file extension of .mov or .mp4, it will be inferred as a video. Otherwise it will be treated as a photo. To override the automatic choice, you can pass an optional `type` parameter that must be one of 'photo' or 'video'.

返回一个 Promise，操作成功时解析出新的 URI。

**参数：**

| 名称 | 类型                   | 必填 | 说明                                                       |
| ---- | ---------------------- | ---- | ---------------------------------------------------------- |
| tag  | string                 | 是   | 看上面的说明                                               |
| type | enum('photo', 'video') | 否   | Overrides automatic detection based on the file extension. |

---

### `getPhotos()`

```jsx
CameraRoll.getPhotos(params);
```

Returns a Promise with photo identifier objects from the local camera roll of the device matching shape defined by `getPhotosReturnChecker`.

**参数：**

| 名称   | 类型   | 必填 | 说明                                             |
| ------ | ------ | ---- | ------------------------------------------------ |
| params | object | 是   | Expects a params with the shape described below. |

* `first` : {number} : The number of photos wanted in reverse order of the photo application (i.e. most recent first for SavedPhotos).
* `after` : {string} : A cursor that matches `page_info { end_cursor }` returned from a previous call to `getPhotos`.
* `groupTypes` : {string} : Specifies which group types to filter the results to. Valid values are:
  * `Album`
  * `All`
  * `Event`
  * `Faces`
  * `Library`
  * `PhotoStream`
  * `SavedPhotos` // default
* `groupName` : {string} : Specifies filter on group names, like 'Recent Photos' or custom album titles.
* `assetType` : {string} : Specifies filter on asset type. Valid values are:
  * `All`
  * `Videos`
  * `Photos` // default
* `mimeTypes` : {Array} : Filter by mimetype (e.g. image/jpeg).

Returns a Promise which when resolved will be of the following shape:

* `edges` : {Array<node>} An array of node objects
  * `node`: {object} An object with the following shape:
    * `type`: {string}
    * `group_name`: {string}
    * `image`: {object} : An object with the following shape:
      * `uri`: {string}
      * `height`: {number}
      * `width`: {number}
      * `isStored`: {boolean}
      * `playableDuration`: {number}
    * `timestamp`: {number}
    * `location`: {object} : An object with the following shape:
      * `latitude`: {number}
      * `longitude`: {number}
      * `altitude`: {number}
      * `heading`: {number}
      * `speed`: {number}
* `page_info` : {object} : An object with the following shape:
  * `has_next_page`: {boolean}
  * `start_cursor`: {string}
  * `end_cursor`: {string}

#### 示例

读取图片：

```
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
