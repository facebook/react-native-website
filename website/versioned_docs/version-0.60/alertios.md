---
id: alertios
title: AlertIOS
---

> **Deprecated.** `AlertIOS` has been moved to [`Alert`](alert.md)

`AlertIOS` provides functionality to create an iOS alert dialog with a message or create a prompt for user input.

Creating an iOS alert:

```jsx
AlertIOS.alert(
  'Sync Complete',
  'All your data are belong to us.'
);
```

Creating an iOS prompt:

```jsx
AlertIOS.prompt('Enter a value', null, (text) =>
  console.log('You entered ' + text)
);
```

We recommend using the [`Alert.alert`](alert.md) method for cross-platform support if you don't need to create iOS-only prompts.

---

# Reference

## Methods

### `alert()`

```jsx
static alert(title: string, [message]: string, [callbackOrButtons]: ?(() => void), ButtonsArray, [type]: AlertType): [object Object]
```

Create and display a popup alert.

**Parameters:**

| Name              | Type                                                   | Required | Description                                                                                                                                                                                                                                                                                                                                                      |
| ----------------- | ------------------------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title             | string                                                 | Yes      | The dialog's title. Passing null or '' will hide the title.                                                                                                                                                                                                                                                                                                      |
| message           | string                                                 | No       | An optional message that appears below the dialog's title.                                                                                                                                                                                                                                                                                                       |
| callbackOrButtons | ?(() => void),[ButtonsArray](alertios.md#buttonsarray) | No       | This optional argument should be either a single-argument function or an array of buttons. If passed a function, it will be called when the user taps 'OK'. If passed an array of button configurations, each button should include a `text` key, as well as optional `onPress` and `style` keys. `style` should be one of 'default', 'cancel' or 'destructive'. |
| type              | [AlertType](alertios.md#alerttype)                     | No       | Deprecated, do not use.                                                                                                                                                                                                                                                                                                                                          |

Example with custom buttons:

```jsx
AlertIOS.alert(
  'Update available',
  'Keep your app up to date to enjoy the latest features',
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel'
    },
    {
      text: 'Install',
      onPress: () => console.log('Install Pressed')
    }
  ]
);
```

---

### `prompt()`

```jsx
static prompt(title: string, [message]: string, [callbackOrButtons]: ?((text: string) => void), ButtonsArray, [type]: AlertType, [defaultValue]: string, [keyboardType]: string): [object Object]
```

Create and display a prompt to enter some text.

**Parameters:**

| Name              | Type                                                               | Required | Description                                                                                                                                                                                                                                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| title             | string                                                             | Yes      | The dialog's title.                                                                                                                                                                                                                                                                                                                                                                                    |
| message           | string                                                             | No       | An optional message that appears above the text input.                                                                                                                                                                                                                                                                                                                                                 |
| callbackOrButtons | ?((text: string) => void),[ButtonsArray](alertios.md#buttonsarray) | No       | This optional argument should be either a single-argument function or an array of buttons. If passed a function, it will be called with the prompt's value when the user taps 'OK'. If passed an array of button configurations, each button should include a `text` key, as well as optional `onPress` and `style` keys (see example). `style` should be one of 'default', 'cancel' or 'destructive'. |
| type              | [AlertType](alertios.md#alerttype)                                 | No       | This configures the text input. One of 'plain-text', 'secure-text' or 'login-password'.                                                                                                                                                                                                                                                                                                                |
| defaultValue      | string                                                             | No       | The default text in text input.                                                                                                                                                                                                                                                                                                                                                                        |
| keyboardType      | string                                                             | No       | The keyboard type of first text field(if exists). One of 'default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter' or 'web-search'.                                                                                                                                                              |

Example with custom buttons:

```jsx
AlertIOS.prompt(
  'Enter password',
  'Enter your password to claim your $1.5B in lottery winnings',
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel'
    },
    {
      text: 'OK',
      onPress: (password) =>
        console.log('OK Pressed, password: ' + password)
    }
  ],
  'secure-text'
);
```

,

Example with the default button and a custom callback:

```jsx
AlertIOS.prompt(
  'Update username',
  null,
  (text) => console.log('Your username is ' + text),
  null,
  'default'
);
```

## Type Definitions

### AlertType

An Alert button type

| Type   |
| ------ |
| \$Enum |

**Constants:**

| Value          | Description                  |
| -------------- | ---------------------------- |
| default        | Default alert with no inputs |
| plain-text     | Plain text input alert       |
| secure-text    | Secure text input alert      |
| login-password | Login and password alert     |

---

### AlertButtonStyle

An Alert button style

| Type   |
| ------ |
| \$Enum |

**Constants:**

| Value       | Description              |
| ----------- | ------------------------ |
| default     | Default button style     |
| cancel      | Cancel button style      |
| destructive | Destructive button style |

---

### ButtonsArray

Array or buttons

| Type  |
| ----- |
| Array |

**Properties:**

| Name      | Type                                             | Description                           |
| --------- | ------------------------------------------------ | ------------------------------------- |
| [text]    | string                                           | Button label                          |
| [onPress] | function                                         | Callback function when button pressed |
| [style]   | [AlertButtonStyle](alertios.md#alertbuttonstyle) | Button style                          |

**Constants:**

| Value   | Description                           |
| ------- | ------------------------------------- |
| text    | Button label                          |
| onPress | Callback function when button pressed |
| style   | Button style                          |
