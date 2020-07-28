---
id: version-0.63-imagepickerios
title: 🚧 ImagePickerIOS
original_id: imagepickerios
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

**已过时。** Use [@react-native-community/image-picker-ios](https://github.com/react-native-community/react-native-image-picker-ios) instead.

# 文档

## 方法

### `canRecordVideos()`

```jsx
static canRecordVideos(callback)
```

---

### `canUseCamera()`

```jsx
static canUseCamera(callback)
```

---

### `openCameraDialog()`

```jsx
static openCameraDialog(config, successCallback, cancelCallback)
```

**参数：**

| Name            | Type     | Required | Description |
| --------------- | -------- | -------- | ----------- |
| config          | object   | No       | See below.  |
| successCallback | function | No       | See below.  |
| cancelCallback  | function | No       | See below.  |

`config` is an object containing:

- `videoMode` : An optional boolean value that defaults to false.

`successCallback` is an optional callback function that's invoked when the select dialog is opened successfully. It will include the following data:

- `[string, number, number]`

`cancelCallback` is an optional callback function that's invoked when the camera dialog is canceled.

---

### `openSelectDialog()`

```jsx
static openSelectDialog(config, successCallback, cancelCallback)
```

**参数：**

| Name            | Type     | Required | Description |
| --------------- | -------- | -------- | ----------- |
| config          | object   | No       | See below.  |
| successCallback | function | No       | See below.  |
| cancelCallback  | function | No       | See below.  |

`config` is an object containing:

- `showImages` : An optional boolean value that defaults to false.
- `showVideos`: An optional boolean value that defaults to false.

`successCallback` is an optional callback function that's invoked when the select dialog is opened successfully. It will include the following data:

- `[string, number, number]`

`cancelCallback` is an optional callback function that's invoked when the select dialog is canceled.
