---
id: alert
title: Alert
---

启动一个提示对话框，包含指定的标题和信息。

你还可以指定一系列按钮，点击任一按钮会调用对应的 onPress 回调并关闭提示框。默认情况下，对话框只有一个"确定"按钮。

本接口可以在 iOS 和 Android 上显示静态提示框。只有 iOS 系统支持在提示框中加入文本输入框。

## 示例

```SnackPlayer name=Alert%20Example&supportedPlatforms=ios,android
import React from 'react';
import {StyleSheet, Button, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const createTwoButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  const createThreeButtonAlert = () =>
    Alert.alert('Alert Title', 'My Alert Msg', [
      {
        text: 'Ask me later',
        onPress: () => console.log('Ask me later pressed'),
      },
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Button title={'2-Button Alert'} onPress={createTwoButtonAlert} />
        <Button title={'3-Button Alert'} onPress={createThreeButtonAlert} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default App;
```

## iOS

在 iOS 上你可以指定任意数量的按钮。每个按钮还可以指定样式或设为强调按钮，具体选项请参阅 [AlertButtonStyle](#alertbuttonstyle-ios) 枚举和 [AlertButton](alert#alertbutton) 中的 `isPreferred` 字段。

## Android

在 Android 上最多能指定三个按钮，这三个按钮分别对应"中间态"、"消极态"和"积极态"的概念：

- 如果只指定一个按钮，则它具有"积极态"属性（比如"确定"）
- 两个按钮分别对应"消极态"和"积极态"（比如"取消"和"确定"）
- 三个按钮则依次对应"中间态"、"消极态"和"积极态"（比如"稍后再说"、"取消"、"确定"）

在 Android 上可以通过点击提示框外部区域来关闭提示框，但此行为默认未启用。可以通过提供一个可选的 [AlertOptions](alert#alertoptions) 参数并设置 `cancelable` 属性为 `true` 来启用，即：<br/>`{cancelable: true}`。

取消事件可以通过在 `options` 参数中提供 `onDismiss` 回调属性来处理。

### 示例 <div className="label android">Android</div>

```SnackPlayer name=Alert%20Android%20Dissmissable%20Example&supportedPlatforms=android
import React from 'react';
import {StyleSheet, Button, Alert} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const showAlert = () =>
  Alert.alert(
    'Alert Title',
    'My Alert Msg',
    [
      {
        text: 'Cancel',
        onPress: () => Alert.alert('Cancel Pressed'),
        style: 'cancel',
      },
    ],
    {
      cancelable: true,
      onDismiss: () =>
        Alert.alert(
          'This alert was dismissed by tapping outside of the alert dialog.',
        ),
    },
  );

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <Button title="Show alert" onPress={showAlert} />
    </SafeAreaView>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
```

---

# 文档

## 方法

### `alert()`

```tsx
static alert (
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
);
```

**参数：**

| 名称                                                       | 类型                               | 说明                                             |
| ---------------------------------------------------------- | ---------------------------------- | ------------------------------------------------ |
| title <div className="label basic required">Required</div> | string                             | 对话框标题。传入 `null` 或空字符串将隐藏标题。   |
| message                                                    | string                             | 可选消息，显示在标题下方。                       |
| buttons                                                    | [AlertButton](alert#alertbutton)[] | 可选的按钮配置数组。                             |
| options                                                    | [AlertOptions](alert#alertoptions) | 可选的 Alert 配置。                              |

---

### `prompt()` <div className="label ios">iOS</div>

```tsx
static prompt: (
  title: string,
  message?: string,
  callbackOrButtons?: ((text: string) => void) | AlertButton[],
  type?: AlertType,
  defaultValue?: string,
  keyboardType?: string,
);
```

创建并显示一个带有文本输入框的提示对话框。

**参数：**

| 名称                                                       | 类型                                            | 说明                                                                                                                                             |
| ---------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| title <div className="label basic required">Required</div> | string                                          | 对话框标题。                                                                                                                                     |
| message                                                    | string                                          | 可选消息，显示在文本输入框上方。                                                                                                                 |
| callbackOrButtons                                          | function<hr/>[AlertButton](alert#alertButton)[] | 如果传入函数，用户点击"确定"时将以输入值为参数调用该函数<br/>`(text: string) => void`。<hr/>如果传入数组，则按照数组内容配置按钮。               |
| type                                                       | [AlertType](alert#alerttype-ios)                | 配置文本输入框的类型。                                                                                                                           |
| defaultValue                                               | string                                          | 文本输入框中的默认文本。                                                                                                                         |
| keyboardType                                               | string                                          | 第一个文本输入框（如果存在）的键盘类型。参见 TextInput 的 [keyboardTypes](textinput#keyboardtype)。                                              |
| options                                                    | [AlertOptions](alert#alertoptions)              | 可选的 Alert 配置。                                                                                                                              |

---

## 类型定义

### AlertButtonStyle <div className="label ios">iOS</div>

iOS Alert 的按钮样式。

| 类型 |
| ---- |
| enum |

**常量：**

| 值              | 说明           |
| --------------- | -------------- |
| `'default'`     | 默认按钮样式。 |
| `'cancel'`      | 取消按钮样式。 |
| `'destructive'` | 破坏性按钮样式。 |

---

### AlertType <div className="label ios">iOS</div>

iOS Alert 的类型。

| 类型 |
| ---- |
| enum |

**常量：**

| 值                 | 说明                   |
| ------------------ | ---------------------- |
| `'default'`        | 不带输入框的默认提示框 |
| `'plain-text'`     | 带纯文本输入框的提示框 |
| `'secure-text'`    | 带密文输入框的提示框   |
| `'login-password'` | 带用户名密码输入框的提示框 |

---

### AlertButton

描述提示框中按钮配置的对象。

| 类型             |
| ---------------- |
| array of objects |

**对象属性：**

| 名称                                             | 类型                                           | 说明                                                     |
| ------------------------------------------------ | ---------------------------------------------- | -------------------------------------------------------- |
| text                                             | string                                         | 按钮标签。                                               |
| onPress                                          | function                                       | 按钮被点击时的回调函数。                                 |
| style <div className="label ios">iOS</div>       | [AlertButtonStyle](alert#alertbuttonstyle-ios) | 按钮样式，在 Android 上此属性将被忽略。                  |
| isPreferred <div className="label ios">iOS</div> | boolean                                        | 是否为强调按钮，在 Android 上此属性将被忽略。            |

---

### AlertOptions

| 类型   |
| ------ |
| object |

**属性：**

| 名称                                                    | 类型     | 说明                                                                               |
| ------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------- |
| cancelable <div className="label android">Android</div> | boolean  | 是否允许通过点击提示框外部区域来关闭提示框。                                       |
| userInterfaceStyle <div className="label ios">iOS</div> | string   | 提示框的界面样式，可以设置为 `light` 或 `dark`，否则将使用默认的系统样式。         |
| onDismiss <div className="label android">Android</div>  | function | 提示框被关闭时触发的回调函数。                                                     |
