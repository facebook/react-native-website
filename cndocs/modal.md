---
id: modal
title: Modal
---

Modal 组件是一种简单的在其他视图之上显示内容的方式。

```javascript
import React, { Component } from "react";
import { Modal, Text, TouchableHighlight, View } from "react-native";

class ModalExample extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert("Modal has been closed.");
          }}
        >
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              >
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
```

### 查看 Props

* [`visible`](modal.md#visible)
* [`supportedOrientations`](modal.md#supportedorientations)
* [`onRequestClose`](modal.md#onrequestclose)
* [`onShow`](modal.md#onshow)
* [`transparent`](modal.md#transparent)
* [`animationType`](modal.md#animationtype)
* [`hardwareAccelerated`](modal.md#hardwareaccelerated)
* [`onDismiss`](modal.md#ondismiss)
* [`onOrientationChange`](modal.md#onorientationchange)
* [`presentationStyle`](modal.md#presentationstyle)
* [`animated`](modal.md#animated)

---

# 文档

## Props

### `visible`

`visible`属性决定 modal 是否显示。

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `supportedOrientations`

The `supportedOrientations` prop allows the modal to be rotated to any of the specified orientations. On iOS, the modal is still restricted by what's specified in your app's Info.plist's UISupportedInterfaceOrientations field. When using `presentationStyle` of `pageSheet` or `formSheet`, this property will be ignored by iOS.

| 类型                                                                                                | 必填 | 平台 |
| --------------------------------------------------------------------------------------------------- | ---- | ---- |
| array of enum('portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right') | 否   | iOS  |

---

### `onRequestClose`

The `onRequestClose` callback is called when the user taps the hardware back button on Android or the menu button on Apple TV.

| 类型     | 必填 | 平台                     |
| -------- | ---- | ------------------------ |
| function | 是   | Android, Platform.isTVOS |
| function | 否   | (Others)                 |

---

### `onShow`

The `onShow` prop allows passing a function that will be called once the modal has been shown.

| 类型     | 必填 |
| -------- | ---- |
| function | 否   |

---

### `transparent`

The `transparent` prop determines whether your modal will fill the entire view. Setting this to `true` will render the modal over a transparent background.

| 类型 | 必填 |
| ---- | ---- |
| bool | 否   |

---

### `animationType`

`animationType`指定了 modal 的动画类型。

* `slide` 从底部滑入滑出。
* `fade` 淡入淡出。
* `none` 没有动画，直接蹦出来。

默认值为`none`。

| 类型                          | 必填 |
| ----------------------------- | ---- |
| enum('none', 'slide', 'fade') | 否   |

---

### `hardwareAccelerated`

`hardwareAccelerated` prop controls whether to force hardware acceleration for the underlying window.

| 类型 | 必填 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `onDismiss`

The `onDismiss` prop allows passing a function that will be called once the modal has been dismissed.

| 类型     | 必填 | 平台 |
| -------- | ---- | ---- |
| function | 否   | iOS  |

---

### `onOrientationChange`

The `onOrientationChange` callback is called when the orientation changes while the modal is being displayed. The orientation provided is only 'portrait' or 'landscape'. This callback is also called on initial render, regardless of the current orientation.

| 类型     | 必填 | 平台 |
| -------- | ---- | ---- |
| function | 否   | iOS  |

---

### `presentationStyle`

The `presentationStyle` prop controls how the modal appears (generally on larger devices such as iPad or plus-sized iPhones). See https://developer.apple.com/reference/uikit/uimodalpresentationstyle for details.

* `fullScreen` covers the screen completely
* `pageSheet` covers portrait-width view centered (only on larger devices)
* `formSheet` covers narrow-width view centered (only on larger devices)
* `overFullScreen` covers the screen completely, but allows transparency

Default is set to `overFullScreen` or `fullScreen` depending on `transparent` property.

| 类型                                                           | 必填 | 平台 |
| -------------------------------------------------------------- | ---- | ---- |
| enum('fullScreen', 'pageSheet', 'formSheet', 'overFullScreen') | 否   | iOS  |
