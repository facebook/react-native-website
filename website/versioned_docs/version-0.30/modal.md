---
id: version-0.30-modal
title: Modal
original_id: modal
---

The Modal component is a way to present content above an enclosing view.

_Note: If you need more control over how to present modals over the rest of your app, then consider using a top-level Navigator. Go [here](navigator-comparison.md) to compare navigation options._

```jsx
import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

class ModalExample extends Component {
  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  render() {
    return (
      <View style={{ marginTop: 22 }}>
        <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{ marginTop: 22 }}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
```

### Props

- [`animationType`](modal.md#animationtype)
- [`onRequestClose`](modal.md#onrequestclose)
- [`onShow`](modal.md#onshow)
- [`transparent`](modal.md#transparent)
- [`visible`](modal.md#visible)
- [`animated`](modal.md#animated)

---

# Reference

## Props

### `animationType`

The `animationType` prop controls how the modal animates.

- `slide` slides in from the bottom
- `fade` fades into view
- `none` appears without an animation

| Type                                       | Required |
| ------------------------------------------ | -------- |
| PropTypes.oneOf(['none', 'slide', 'fade']) | No       |

---

### `onRequestClose`

The `onRequestClose` prop allows passing a function that will be called once the modal has been dismissed.

_On the Android platform, this is a required function._

| Type                                                                   | Required |
| ---------------------------------------------------------------------- | -------- |
| Platform.OS === 'android' ? PropTypes.func.isRequired : PropTypes.func | No       |

---

### `onShow`

The `onShow` prop allows passing a function that will be called once the modal has been shown.

| Type           | Required |
| -------------- | -------- |
| PropTypes.func | No       |

---

### `transparent`

The `transparent` prop determines whether your modal will fill the entire view. Setting this to `true` will render the modal over a transparent background.

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `visible`

The `visible` prop determines whether your modal is visible.

| Type           | Required |
| -------------- | -------- |
| PropTypes.bool | No       |

---

### `animated`

**Deprecated.** Use the `animationType` prop instead.

| Type | Required |
| ---- | -------- |
| bool | No       |
