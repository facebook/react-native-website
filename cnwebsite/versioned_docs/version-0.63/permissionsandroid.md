---
id: version-0.63-permissionsandroid
title: PermissionsAndroid
original_id: permissionsandroid
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm&type=Users)(100.00%)

<div class="banner-crna-ejected">
  <h3>Project with Native Code Required</h3>
  <p>
    This API only works in projects made with <code>react-native init</code>
    or in those made with <code>expo init</code> or Create React Native App which have since ejected. For
    more information about ejecting, please see
    the <a href="https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md" target="_blank">guide</a> on
    the Create React Native App repository.
  </p>
</div>

`PermissionsAndroid` 可以访问 Android M(也就是 6.0)开始提供的权限模型。有一些权限写在`AndroidManifest.xml`就可以在安装时自动获得，但有一些“危险”的权限则需要弹出提示框供用户选择。本 API 即用于后一种情形。

在低于 Android 6.0 的设备上，权限只要写在`AndroidManifest.xml`里就会自动获得，此情形下`check`会始终返回`true`和而`request`方法将始终解析为`PermissionsAndroid.RESULTS.GRANTED`。

如果用户之前拒绝过你的某项权限请求，那么系统会建议你显示一个为什么需要这个权限的“详细解释”（`rationale`参数）。如果用户之前拒绝过，那么当你再次申请的时候，弹出的就可能不是原先的申请信息，而是`rationale`参数里提供的进一步解释。

### 示例

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      函数组件示例
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class组件示例
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=PermissionsAndroid%20Example&supportedPlatforms=android
import React from "react";
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Button } from "react-native";
import Constants from "expo-constants";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const App = () => (
  <View style={styles.container}>
    <Text style={styles.item}>Try permissions</Text>
    <Button title="request permissions" onPress={requestCameraPermission} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default App;
```

<block class="classical syntax" />

```SnackPlayer name=PermissionsAndroid%20Example&supportedPlatforms=android
import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, PermissionsAndroid, Button } from "react-native";
import Constants from "expo-constants";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Cool Photo App Camera Permission",
        message:
          "Cool Photo App needs access to your camera " +
          "so you can take awesome pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.item}>Try permissions</Text>
        <Button title="request permissions" onPress={requestCameraPermission} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default App;
```

<block class="endBlock syntax" />

### 需要提示用户的权限列表

需要提示用户的权限都以常量形式列在`PermissionsAndroid.PERMISSIONS`中：

- `READ_CALENDAR`: 'android.permission.READ_CALENDAR'
- `WRITE_CALENDAR`: 'android.permission.WRITE_CALENDAR'
- `CAMERA`: 'android.permission.CAMERA'
- `READ_CONTACTS`: 'android.permission.READ_CONTACTS'
- `WRITE_CONTACTS`: 'android.permission.WRITE_CONTACTS'
- `GET_ACCOUNTS`: 'android.permission.GET_ACCOUNTS'
- `ACCESS_FINE_LOCATION`: 'android.permission.ACCESS_FINE_LOCATION'
- `ACCESS_COARSE_LOCATION`: 'android.permission.ACCESS_COARSE_LOCATION'
- `RECORD_AUDIO`: 'android.permission.RECORD_AUDIO'
- `READ_PHONE_STATE`: 'android.permission.READ_PHONE_STATE'
- `CALL_PHONE`: 'android.permission.CALL_PHONE'
- `READ_CALL_LOG`: 'android.permission.READ_CALL_LOG'
- `WRITE_CALL_LOG`: 'android.permission.WRITE_CALL_LOG'
- `ADD_VOICEMAIL`: 'com.android.voicemail.permission.ADD_VOICEMAIL'
- `USE_SIP`: 'android.permission.USE_SIP'
- `PROCESS_OUTGOING_CALLS`: 'android.permission.PROCESS_OUTGOING_CALLS'
- `BODY_SENSORS`: 'android.permission.BODY_SENSORS'
- `SEND_SMS`: 'android.permission.SEND_SMS'
- `RECEIVE_SMS`: 'android.permission.RECEIVE_SMS'
- `READ_SMS`: 'android.permission.READ_SMS'
- `RECEIVE_WAP_PUSH`: 'android.permission.RECEIVE_WAP_PUSH'
- `RECEIVE_MMS`: 'android.permission.RECEIVE_MMS'
- `READ_EXTERNAL_STORAGE`: 'android.permission.READ_EXTERNAL_STORAGE'
- `WRITE_EXTERNAL_STORAGE`: 'android.permission.WRITE_EXTERNAL_STORAGE'

### 请求权限的返回值

返回值都以常量形式记录在`PermissionsAndroid.RESULTS`中：

- `GRANTED`: 'granted'， 表示用户已授权
- `DENIED`: 'denied'， 表示用户已拒绝
- `NEVER_ASK_AGAIN`: 'never_ask_again'，表示用户已拒绝，且不愿被再次询问。

---

# 文档

## 方法

### `constructor()`

```jsx
constructor();
```

---

### `check()`

```jsx
check(permission);
```

检查某项权限是否经过用户授权。返回一个 promise，解析为布尔值。

**参数:**

| 名称       | 类型   | 必填 | 说明         |
| ---------- | ------ | ---- | ------------ |
| permission | string | 是   | 要检查的权限 |

---

### `request()`

```jsx
request(permission, [rationale]);
```

弹出提示框向用户请求某项权限。返回一个 promise，最终值为上文所说的`PermissionsAndroid.RESULTS`。

如果提供了`rationale`参数，则此方法会和系统协商，是弹出系统内置的权限申请对话框，还是显示`rationale`中的信息以向用户进行解释。具体原理请参阅 android 官方文档(https://developer.android.com/training/permissions/requesting.html#explain)。

**参数:**

| 名称       | 类型   | 必填 | 说明                |
| ---------- | ------ | ---- | ------------------- |
| permission | string | 是   | 要请求的权限        |
| rationale  | object | 否   | 见下面的`rationale` |

**Rationale:**

| 名称           | 类型   | 必填 | 说明             |
| -------------- | ------ | ---- | ---------------- |
| title          | string | 是   | 对话框的标题。   |
| message        | string | 是   | 对话框的正文。   |
| buttonPositive | string | 是   | 同意按钮的文本。 |
| buttonNegative | string | 否   | 拒绝按钮的文本。 |
| buttonNeutral  | string | 否   | 跳过按钮的文本。 |

---

### `requestMultiple()`

```jsx
requestMultiple(permissions);
```

在一个弹出框中向用户请求多个权限。返回值为一个 object，key 为各权限名称，值为`PermissionsAndroid.RESULTS`。

**参数:**

| 名称        | 类型  | 必填 | 说明               |
| ----------- | ----- | ---- | ------------------ |
| permissions | array | Yes  | 要申请的权限的数组 |
