---
id: modal
title: Modal
---

Modal 组件是一种在外层视图之上展示内容的基本方式。

## 示例

```SnackPlayer name=Modal&supportedPlatforms=android,ios
import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App;
```

---

# 参考文档

## Props

### [View Props](view.md#props)

继承 [View Props](view.md#props)。

---

### 🗑️ `animated`

:::warning 已弃用
请改用 [`animationType`](modal.md#animationtype) 属性。
:::

---

### `animationType`

`animationType` 属性控制模态框的动画方式。

可选值：

- `slide` 从底部滑入
- `fade` 淡入显示
- `none` 无动画直接出现

| 类型                                | 默认值 |
| ----------------------------------- | ------ |
| enum(`'none'`, `'slide'`, `'fade'`) | `none` |

---

### `backdropColor`

模态框的背景色（即模态框容器的背景颜色）。如果未提供且 `transparent` 为 `false`，则默认为 `white`。当 `transparent` 为 `true` 时此属性被忽略。

| 类型            | 默认值 |
| --------------- | ------ |
| [color](colors) | white  |

---

### `hardwareAccelerated` <div className="label android">Android</div>

`hardwareAccelerated` 属性控制是否为底层窗口强制启用硬件加速。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `navigationBarTranslucent` <div className="label android">Android</div>

`navigationBarTranslucent` 属性决定模态框是否延伸到系统导航栏下方。但同时需要将 `statusBarTranslucent` 也设置为 `true` 才能使导航栏变为半透明。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `onDismiss` <div className="label ios">iOS</div>

`onDismiss` 属性允许传入一个函数，该函数会在模态框关闭后被调用。

| 类型     |
| -------- |
| function |

---

### `onOrientationChange` <div className="label ios">iOS</div>

`onOrientationChange` 回调会在模态框显示期间设备方向发生变化时被调用。提供的方向值仅为 'portrait' 或 'landscape'。此回调在初次渲染时也会被调用，无论当前的设备方向如何。

| 类型     |
| -------- |
| function |

---

### `allowSwipeDismissal` <div className="label ios">iOS</div>

控制在 iOS 上是否可以通过下滑手势关闭模态框。使用此功能需要同时实现 `onRequestClose` 属性来处理关闭事件。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `ref`

一个 ref 设置器，在组件挂载时会被赋值为一个[元素节点](element-nodes)。

---

### `onRequestClose`

`onRequestClose` 回调会在用户按下 Android 上的硬件返回键或 Apple TV 上的菜单键时被调用。由于这是一个必需的属性，请注意只要模态框处于打开状态，`BackHandler` 事件就不会被触发。
在 iOS 上，当使用 `pageSheet` 或 `formSheet` 的 `presentationStyle` 并通过拖拽手势关闭模态框时，也会调用此回调。当启用了 `allowSwipeDismissal` 时，此回调将在模态框关闭后被调用。

| 类型                                                                                                                                                                                           |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| function <div className="label basic required">必需</div><div className="label android">Android</div><div className="label tv">TV</div><hr />function <div className="label ios">iOS</div> |

---

### `onShow`

`onShow` 属性允许传入一个函数，该函数会在模态框显示后被调用。

| 类型     |
| -------- |
| function |

---

### `presentationStyle` <div className="label ios">iOS</div>

`presentationStyle` 属性控制模态框的显示方式（通常用于较大设备，如 iPad 或大屏 iPhone）。详情请参阅 https://developer.apple.com/reference/uikit/uimodalpresentationstyle 。

可选值：

- `fullScreen` 覆盖整个屏幕
- `pageSheet` 覆盖竖屏宽度的居中视图（仅限大屏设备）
- `formSheet` 覆盖窄宽度的居中视图（仅限大屏设备）
- `overFullScreen` 覆盖整个屏幕，但允许透明

| 类型                                                                   | 默认值                                                                              |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| enum(`'fullScreen'`, `'pageSheet'`, `'formSheet'`, `'overFullScreen'`) | `transparent={false}` 时为 `fullScreen`<hr />`transparent={true}` 时为 `overFullScreen` |

---

### `statusBarTranslucent` <div className="label android">Android</div>

`statusBarTranslucent` 属性决定模态框是否延伸到系统状态栏下方。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `supportedOrientations` <div className="label ios">iOS</div>

`supportedOrientations` 属性允许模态框旋转到指定的任何方向。在 iOS 上，模态框仍受应用 Info.plist 中 UISupportedInterfaceOrientations 字段所指定方向的限制。

:::note
当 `presentationStyle` 设置为 `pageSheet` 或 `formSheet` 时，此属性在 iOS 上会被忽略。
:::

| 类型                                                                                                           | 默认值         |
| -------------------------------------------------------------------------------------------------------------- | -------------- |
| array of enums(`'portrait'`, `'portrait-upside-down'`, `'landscape'`, `'landscape-left'`, `'landscape-right'`) | `['portrait']` |

---

### `transparent`

`transparent` 属性决定模态框是否填充整个视图。将其设置为 `true` 会使模态框在透明背景上渲染。

| 类型 | 默认值  |
| ---- | ------- |
| bool | `false` |

---

### `visible`

`visible` 属性决定模态框是否可见。

| 类型 | 默认值 |
| ---- | ------ |
| bool | `true` |
