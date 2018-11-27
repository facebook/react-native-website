---
id: version-0.57-alertios
title: AlertIOS
original_id: alertios
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

`AlertIOS`用于弹出一个 iOS 提示对话框，可以通知用户一些信息或是提示用户输入一些文字。

弹出一个 iOS 提示框：

```
AlertIOS.alert(
 'Sync Complete',
 'All your data are belong to us.'
);
```

弹出一个带输入框的 iOS 提示框：

```
AlertIOS.prompt(
  'Enter a value',
  null,
  text => console.log("You entered "+text)
);
```

其他情况下，尤其是仅仅显示一个静态的提示框时，应该使用跨平台的[`Alert`](alert.md)。

### 查看方法

* [`alert`](alertios.md#alert)
* [`prompt`](alertios.md#prompt)

### 查看类型定义

* [`AlertType`](alertios.md#alerttype)
* [`AlertButtonStyle`](alertios.md#alertbuttonstyle)
* [`ButtonsArray`](alertios.md#buttonsarray)

---

# 文档

## 方法

### `alert()`

```javascript
static alert(title: string, [message]: string, [callbackOrButtons]: ?(() => void), ButtonsArray, [type]: AlertType): [object Object]
```

创建并显示一个提示框。

**参数：**

| 名称              | 类型                                                   | 必填 | 说明                                                                                                                                                                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------ | ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title             | string                                                 | 是   | The dialog's title. Passing null or '' will hide the title.                                                                                                                                                                                                                                                                                                      |
| message           | string                                                 | 否   | An optional message that appears below the dialog's title.                                                                                                                                                                                                                                                                                                       |
| callbackOrButtons | ?(() => void),[ButtonsArray](alertios.md#buttonsarray) | 否   | This optional argument should be either a single-argument function or an array of buttons. If passed a function, it will be called when the user taps 'OK'. If passed an array of button configurations, each button should include a `text` key, as well as optional `onPress` and `style` keys. `style` should be one of 'default', 'cancel' or 'destructive'. |
| type              | [AlertType](alertios.md#alerttype)                     | 否   | Deprecated, do not use.                                                                                                                                                                                                                                                                                                                                          |

Example with custom buttons:

```javascript
AlertIOS.alert(
  "Update available",
  "Keep your app up to date to enjoy the latest features",
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    {
      text: "Install",
      onPress: () => console.log("Install Pressed")
    }
  ]
);
```

---

### `prompt()`

```javascript
static prompt(title: string, [message]: string, [callbackOrButtons]: ?((text: string) => void), ButtonsArray, [type]: AlertType, [defaultValue]: string, [keyboardType]: string): [object Object]
```

Create and display a prompt to enter some text.

**参数：**

| 名称              | 类型                                                               | 必填 | 说明                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title             | string                                                             | 是   | The dialog's title.                                                                                                                                                                                                                                                                                                                                                                                    |
| message           | string                                                             | 否   | An optional message that appears above the text input.                                                                                                                                                                                                                                                                                                                                                 |
| callbackOrButtons | ?((text: string) => void),[ButtonsArray](alertios.md#buttonsarray) | 否   | This optional argument should be either a single-argument function or an array of buttons. If passed a function, it will be called with the prompt's value when the user taps 'OK'. If passed an array of button configurations, each button should include a `text` key, as well as optional `onPress` and `style` keys (see example). `style` should be one of 'default', 'cancel' or 'destructive'. |
| type              | [AlertType](alertios.md#alerttype)                                 | 否   | This configures the text input. One of 'plain-text', 'secure-text' or 'login-password'.                                                                                                                                                                                                                                                                                                                |
| defaultValue      | string                                                             | 否   | The default text in text input.                                                                                                                                                                                                                                                                                                                                                                        |
| keyboardType      | string                                                             | 否   | The keyboard type of first text field(if exists). One of 'default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter' or 'web-search'.                                                                                                                                                              |

Example with custom buttons:

```javascript
AlertIOS.prompt(
  "Enter password",
  "Enter your password to claim your $1.5B in lottery winnings",
  [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel"
    },
    {
      text: "OK",
      onPress: password => console.log("OK Pressed, password: " + password)
    }
  ],
  "secure-text"
);
```

,

Example with the default button and a custom callback:

```javascript
AlertIOS.prompt(
  "Update username",
  null,
  text => console.log("Your username is " + text),
  null,
  "default"
);
```

## 类型定义

### AlertType

An Alert button type

| 类型  |
| ----- |
| $Enum |

**常量：**

| Value          | 说明                         |
| -------------- | ---------------------------- |
| default        | Default alert with no inputs |
| plain-text     | Plain text input alert       |
| secure-text    | Secure text input alert      |
| login-password | Login and password alert     |

---

### AlertButtonStyle

An Alert button style

| 类型  |
| ----- |
| $Enum |

**常量：**

| Value       | 说明                     |
| ----------- | ------------------------ |
| default     | Default button style     |
| cancel      | Cancel button style      |
| destructive | Destructive button style |

---

### ButtonsArray

Array or buttons

| 类型  |
| ----- |
| Array |

**属性：**

| 名称      | 类型                                             | 说明                                  |
| --------- | ------------------------------------------------ | ------------------------------------- |
| [text]    | string                                           | Button label                          |
| [onPress] | function                                         | Callback function when button pressed |
| [style]   | [AlertButtonStyle](alertios.md#alertbuttonstyle) | Button style                          |

**常量：**

| Value   | 说明                                  |
| ------- | ------------------------------------- |
| text    | Button label                          |
| onPress | Callback function when button pressed |
| style   | Button style                          |
