---
id: version-0.5-alertios
title: AlertIOS
original_id: alertios
---

Use `AlertIOS` to display an alert dialog with a message or to create a prompt for user input on iOS. If you don't need to prompt for user input, we recommend using [`Alert.alert()`](alert.md#alert) for cross-platform support.

### Examples

Creating an iOS alert:

```
AlertIOS.alert(
 'Sync Complete',
 'All your data are belong to us.'
);
```

Creating an iOS prompt:

```
AlertIOS.prompt(
  'Enter a value',
  null,
  text => console.log("You entered "+text)
);
```

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

### Methods

- [`alert`](alertios.md#alert)
- [`prompt`](alertios.md#prompt)

### Type Definitions

- [`AlertType`](alertios.md#alerttype)
- [`AlertButtonStyle`](alertios.md#alertbuttonstyle)
- [`ButtonsArray`](alertios.md#buttonsarray)

---

# Reference

## Methods

### `alert()`

```jsx
AlertIOS.alert(title, [message], [callbackOrButtons]);
```

Create and display a popup alert with a title and an optional message.

If passed a function in the `callbackOrButtons` param, it will be called when the user taps 'OK'. If passed an array of button configurations, each button should include a `text` key, as well as optional `onPress` and `style` keys. `style` should be one of 'default', 'cancel' or 'destructive'. See [ButtonsArray](alertios.md#buttonsarray)

**Parameters:**

| Name              | Type                                               | Required | Description                                                                                                            |
| ----------------- | -------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| title             | string                                             | Yes      | The dialog's title. Passing null or '' will hide the title.                                                            |
| message           | string                                             | No       | An optional message that appears below the dialog's title.                                                             |
| callbackOrButtons | function, [ButtonsArray](alertios.md#buttonsarray) | No       | This optional argument should be either a single-argument function or an [array of buttons](alertios.md#buttonsarray). |

---

### `prompt()`

```jsx
AlertIOS.prompt(
  title,
  [message],
  [callbackOrButtons],
  [type],
  [defaultValue],
  [keyboardType]
);
```

Create and display a prompt to enter some text.

**Parameters:**

| Name              | Type                                               | Required | Description                                                                                                                                                                                                                               |
| ----------------- | -------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| title             | string                                             | Yes      | The dialog's title.                                                                                                                                                                                                                       |
| message           | string                                             | No       | An optional message that appears above the text input.                                                                                                                                                                                    |
| callbackOrButtons | function, [ButtonsArray](alertios.md#buttonsarray) | No       | This optional argument should be either a single-argument function or an [array of buttons](alertios.md#buttonsarray).                                                                                                                    |
| type              | [AlertType](alertios.md#alerttype)                 | No       | This configures the text input.                                                                                                                                                                                                           |
| defaultValue      | string                                             | No       | The default text in text input.                                                                                                                                                                                                           |
| keyboardType      | string                                             | No       | The keyboard type of first text field(if exists). One of 'default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter' or 'web-search'. |

## Type Definitions

### AlertType

An Alert button type.

| Type                                                           |
| -------------------------------------------------------------- |
| enum('default', 'plain-text', 'secure-text', 'login-password') |

**Constants:**

| Value            | Description                  |
| ---------------- | ---------------------------- |
| 'default'        | Default alert with no inputs |
| 'plain-text'     | Plain text input alert       |
| 'secure-text'    | Secure text input alert      |
| 'login-password' | Login and password alert     |

---

### AlertButtonStyle

An Alert button style.

| Type                                     |
| ---------------------------------------- |
| enum('default', 'cancel', 'destructive') |

**Constants:**

| Value         | Description              |
| ------------- | ------------------------ |
| 'default'     | Default button style     |
| 'cancel'      | Cancel button style      |
| 'destructive' | Destructive button style |

---

### ButtonsArray

Array of objects that describe a button.

| Type             |
| ---------------- |
| array of objects |

**Properties:**

| Name      | Type                                             | Description                           |
| --------- | ------------------------------------------------ | ------------------------------------- |
| [text]    | string                                           | Button label                          |
| [onPress] | function                                         | Callback function when button pressed |
| [style]   | [AlertButtonStyle](alertios.md#alertbuttonstyle) | Button style                          |
