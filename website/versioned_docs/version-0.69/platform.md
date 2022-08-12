---
id: platform
title: Platform
---

## Example

```SnackPlayer name=Platform%20API%20Example&supportedPlatforms=ios,android
import React from 'react';
import { Platform, StyleSheet, Text, ScrollView } from 'react-native';

const App = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>OS</Text>
      <Text style={styles.value}>{Platform.OS}</Text>
      <Text>OS Version</Text>
      <Text style={styles.value}>{Platform.Version}</Text>
      <Text>isTV</Text>
      <Text style={styles.value}>{Platform.isTV.toString()}</Text>
      {Platform.OS === 'ios' && <>
        <Text>isPad</Text>
        <Text style={styles.value}>{Platform.isPad.toString()}</Text>
      </>}
      <Text>Constants</Text>
      <Text style={styles.value}>
        {JSON.stringify(Platform.constants, null, 2)}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontWeight: '600',
    padding: 4,
    marginBottom: 8
  }
});

export default App;
```

---

# Reference

## Properties

### `constants`

```jsx
Platform.constants;
```

Returns an object which contains all available common and specific constants related to the platform.

**Properties:**

| <div className="widerColumn">Name</div>                   | Type    | Optional | Description                                                                                                                                                                                       |
| --------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isTesting                                                 | boolean | No       |                                                                                                                                                                                                   |
| reactNativeVersion                                        | object  | No       | Information about React Native version. Keys are `major`, `minor`, `patch` with optional `prerelease` and values are `number`s.                                                                   |
| Version <div className="label android">Android</div>      | number  | No       | OS version constant specific to Android.                                                                                                                                                          |
| Release <div className="label android">Android</div>      | string  | No       |                                                                                                                                                                                                   |
| Serial <div className="label android">Android</div>       | string  | No       | Hardware serial number of an Android device.                                                                                                                                                      |
| Fingerprint <div className="label android">Android</div>  | string  | No       | A string that uniquely identifies the build.                                                                                                                                                      |
| Model <div className="label android">Android</div>        | string  | No       | The end-user-visible name for the Android device.                                                                                                                                                 |
| Brand <div className="label android">Android</div>        | string  | No       | The consumer-visible brand with which the product/hardware will be associated.                                                                                                                    |
| Manufacturer <div className="label android">Android</div> | string  | No       | The manufacturer of the Android device.                                                                                                                                                           |
| ServerHost <div className="label android">Android</div>   | string  | Yes      |                                                                                                                                                                                                   |
| uiMode <div className="label android">Android</div>       | string  | No       | Possible values are: `'car'`, `'desk'`, `'normal'`,`'tv'`, `'watch'` and `'unknown'`. Read more about [Android ModeType](https://developer.android.com/reference/android/app/UiModeManager.html). |
| forceTouchAvailable <div className="label ios">iOS</div>  | boolean | No       | Indicate the availability of 3D Touch on a device.                                                                                                                                                |
| interfaceIdiom <div className="label ios">iOS</div>       | string  | No       | The interface type for the device. Read more about [UIUserInterfaceIdiom](https://developer.apple.com/documentation/uikit/uiuserinterfaceidiom).                                                  |
| osVersion <div className="label ios">iOS</div>            | string  | No       | OS version constant specific to iOS.                                                                                                                                                              |
| systemName <div className="label ios">iOS</div>           | string  | No       | OS name constant specific to iOS.                                                                                                                                                                 |

---

### `isPad` <div class="label ios">iOS</div>

```jsx
Platform.isPad;
```

Returns a boolean which defines if device is an iPad.

| Type    |
| ------- |
| boolean |

---

### `isTV`

```jsx
Platform.isTV;
```

Returns a boolean which defines if device is a TV.

| Type    |
| ------- |
| boolean |

---

### `isTesting`

```jsx
Platform.isTesting;
```

Returns a boolean which defines if application is running in Developer Mode with testing flag set.

| Type    |
| ------- |
| boolean |

---

### `OS`

```jsx
static Platform.OS
```

Returns string value representing the current OS.

| Type                       |
| -------------------------- |
| enum(`'android'`, `'ios'`) |

---

### `Version`

```jsx
Platform.Version;
```

Returns the version of the OS.

| Type                                                                                                 |
| ---------------------------------------------------------------------------------------------------- |
| number <div className="label android">Android</div><hr />string <div className="label ios">iOS</div> |

## Methods

### `select()`

```jsx
static select(config: object): any
```

Returns the most fitting value for the platform you are currently running on.

#### Parameters:

| Name   | Type   | Required | Description                   |
| ------ | ------ | -------- | ----------------------------- |
| config | object | Yes      | See config description below. |

Select method returns the most fitting value for the platform you are currently running on. That is, if you're running on a phone, `android` and `ios` keys will take preference. If those are not specified, `native` key will be used and then the `default` key.

The `config` parameter is an object with the following keys:

- `android` (any)
- `ios` (any)
- `native` (any)
- `default` (any)

**Example usage:**

```jsx
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        backgroundColor: 'green'
      },
      ios: {
        backgroundColor: 'red'
      },
      default: {
        // other platforms, web for example
        backgroundColor: 'blue'
      }
    })
  }
});
```

This will result in a container having `flex: 1` on all platforms, a green background color on Android, a red background color on iOS, and a blue background color on other platforms.

Since the value of the corresponding platform key can be of type `any`, [`select`](platform.md#select) method can also be used to return platform-specific components, like below:

```jsx
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid')
})();

<Component />;
```

```jsx
const Component = Platform.select({
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb')
})();

<Component />;
```
