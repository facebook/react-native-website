---
id: version-0.59-imagepickerios
title: ImagePickerIOS
original_id: imagepickerios
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

### 查看方法

* [`canRecordVideos`](imagepickerios.md#canrecordvideos)
* [`canUseCamera`](imagepickerios.md#canusecamera)
* [`openCameraDialog`](imagepickerios.md#opencameradialog)
* [`openSelectDialog`](imagepickerios.md#openselectdialog)

---

# 文档

## 方法

### `canRecordVideos()`

```javascript
static canRecordVideos(callback)
```

---

### `canUseCamera()`

```javascript
static canUseCamera(callback)
```

---

### `openCameraDialog()`

```javascript
static openCameraDialog(config, successCallback, cancelCallback)
```

**Parameters:**

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

```javascript
static openSelectDialog(config, successCallback, cancelCallback)
```

**Parameters:**

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