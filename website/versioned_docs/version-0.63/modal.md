---
id: modal
title: Modal
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

The Modal component is a basic way to present content above an enclosing view.

## Example

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Modal&supportedPlatforms=android,ios
import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

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
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
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
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";

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
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
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
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
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

# Reference

## Props

### `animated`

> **Deprecated.** Use the [`animationType`](modal.md#animationtype) prop instead.

---

### `animationType`

The `animationType` prop controls how the modal animates.

- `slide` slides in from the bottom
- `fade` fades into view
- `none` appears without an animation

Default is set to `none`.

| Type                          | Required |
| ----------------------------- | -------- |
| enum('none', 'slide', 'fade') | No       |

---

### `hardwareAccelerated`

The `hardwareAccelerated` prop controls whether to force hardware acceleration for the underlying window.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `onDismiss`

The `onDismiss` prop allows passing a function that will be called once the modal has been dismissed.

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |

---

### `onOrientationChange`

The `onOrientationChange` callback is called when the orientation changes while the modal is being displayed. The orientation provided is only 'portrait' or 'landscape'. This callback is also called on initial render, regardless of the current orientation.

| Type     | Required | Platform |
| -------- | -------- | -------- |
| function | No       | iOS      |

---

### `onRequestClose`

The `onRequestClose` callback is called when the user taps the hardware back button on Android or the menu button on Apple TV. Because of this required prop, be aware that `BackHandler` events will not be emitted as long as the modal is open.

| Type     | Required | Platform                 |
| -------- | -------- | ------------------------ |
| function | Yes      | Android, Platform.isTVOS |
| function | No       | (Others)                 |

---

### `onShow`

The `onShow` prop allows passing a function that will be called once the modal has been shown.

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `presentationStyle`

The `presentationStyle` prop controls how the modal appears (generally on larger devices such as iPad or plus-sized iPhones). See https://developer.apple.com/reference/uikit/uimodalpresentationstyle for details.

- `fullScreen` covers the screen completely
- `pageSheet` covers portrait-width view centered (only on larger devices)
- `formSheet` covers narrow-width view centered (only on larger devices)
- `overFullScreen` covers the screen completely, but allows transparency

Default is set to `overFullScreen` or `fullScreen` depending on `transparent` property.

| Type                                                           | Required | Platform |
| -------------------------------------------------------------- | -------- | -------- |
| enum('fullScreen', 'pageSheet', 'formSheet', 'overFullScreen') | No       | iOS      |

---

### `statusBarTranslucent`

The `statusBarTranslucent` prop determines whether your modal should go under the system statusbar.

| Type | Required | Platform |
| ---- | -------- | -------- |
| bool | No       | Android  |

---

### `supportedOrientations`

The `supportedOrientations` prop allows the modal to be rotated to any of the specified orientations. On iOS, the modal is still restricted by what's specified in your app's Info.plist's UISupportedInterfaceOrientations field. When using `presentationStyle` of `pageSheet` or `formSheet`, this property will be ignored by iOS.

| Type                                                                                                | Required | Platform |
| --------------------------------------------------------------------------------------------------- | -------- | -------- |
| array of enum('portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right') | No       | iOS      |

---

### `transparent`

The `transparent` prop determines whether your modal will fill the entire view. Setting this to `true` will render the modal over a transparent background.

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `visible`

The `visible` prop determines whether your modal is visible.

| Type | Required |
| ---- | -------- |
| bool | No       |
