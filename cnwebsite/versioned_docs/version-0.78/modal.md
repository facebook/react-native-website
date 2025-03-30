---
id: modal
title: Modal
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Modal 组件是一种简单的覆盖在其他视图之上显示内容的方式。

## 示例

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Modal&supportedPlatforms=android,ios
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>

            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>

      <TouchableHighlight
        style={styles.openButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Modal&supportedPlatforms=android,ios
import React, { Component } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from "react-native";

class App extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  this.setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            this.setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default App;
```

</TabItem>
</Tabs>

---

# 文档

## Props

### `visible`

`visible`属性决定 modal 是否显示。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `supportedOrientations`

`supportedOrientations`用于指定在设备切换横竖屏方向时，modal 会在哪些屏幕朝向下跟随旋转。在 iOS 上，除了本属性外，还会受到应用的 Info.plist 文件中`UISupportedInterfaceOrientations`的限制。如果还设置了`presentationStyle`属性为`pageSheet`或`formSheet`，则在 iOS 上本属性将被忽略。

| 类型                                                                                                | 必需 | 平台 |
| --------------------------------------------------------------------------------------------------- | ---- | ---- |
| array of enum('portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right') | 否   | iOS  |

---

### `onRequestClose`

`onRequestClose`回调会在用户按下 Android 设备上的后退按键或是 Apple TV 上的菜单键时触发。请务必注意本属性在 Android 平台上为必需，且会在 modal 处于开启状态时阻止`BackHandler`事件。

| 类型     | 必需 | 平台                     |
| -------- | ---- | ------------------------ |
| function | 是   | Android, Platform.isTVOS |
| function | 否   | (Others)                 |

---

### `onShow`

`onShow`回调函数会在 modal 显示时调用。

| 类型     | 必需 |
| -------- | ---- |
| function | 否   |

---

### `transparent`

`transparent` 属性是指背景是否透明，默认为白色，将这个属性设为：true 的时候弹出一个透明背景层的 modal。

| 类型 | 必需 |
| ---- | ---- |
| bool | 否   |

---

### `animationType`

`animationType`指定了 modal 的动画类型。

- `slide` 从底部滑入滑出。
- `fade` 淡入淡出。
- `none` 没有动画，直接蹦出来。

默认值为`none`。

| 类型                          | 必需 |
| ----------------------------- | ---- |
| enum('none', 'slide', 'fade') | 否   |

---

### `hardwareAccelerated`

`hardwareAccelerated`属性决定是否强制启用硬件加速来绘制弹出层。

| 类型 | 必需 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `statusBarTranslucent`

The `statusBarTranslucent` prop determines whether your modal should go under the system statusbar.

| 类型 | 必需 | 平台    |
| ---- | ---- | ------- |
| bool | 否   | Android |

---

### `onDismiss`

`onDismiss`回调会在 modal 被关闭时调用。

| 类型     | 必需 | 平台 |
| -------- | ---- | ---- |
| function | 否   | iOS  |

---

### `onOrientationChange`

模态窗显示的时候，当设备方向发生更改时，将调用`onOrientationChange`回调方法。 提供的设备方向仅为“竖屏”或“横屏”。 无论当前方向如何，也会在初始渲染时调用此回调方法。

| 类型     | 必需 | 平台 |
| -------- | ---- | ---- |
| function | 否   | iOS  |

---

### `presentationStyle`

`presentationStyle`决定 modal（在较大屏幕的设备比如 iPad 或是 Plus 机型）如何展现。更多细节请参阅 https://developer.apple.com/reference/uikit/uimodalpresentationstyle

- `fullScreen`完全盖满屏幕。
- `pageSheet`竖直方向几乎盖满，水平居中，左右留出一定空白（仅用于大屏设备）。
- `formSheet`竖直和水平都居中，四周都留出一定空白（仅用于大屏设备）。
- `overFullScreen`完全盖满屏幕，同时允许透明。

默认会根据`transparent`属性而设置为`overFullScreen`或是`fullScreen`。

| 类型                                                           | 必需 | 平台 |
| -------------------------------------------------------------- | ---- | ---- |
| enum('fullScreen', 'pageSheet', 'formSheet', 'overFullScreen') | 否   | iOS  |
