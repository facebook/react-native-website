---
id: version-0.5-platform-specific-code
title: Platform Specific Code
original_id: platform-specific-code
---

When building a cross-platform app, you'll want to re-use as much code as possible. Scenarios may arise where it makes sense for the code to be different, for example you may want to implement separate visual components for iOS and Android.

React Native provides two ways to easily organize your code and separate it by platform:

* Using the [`Platform` module](platform-specific-code.md#platform-module).
* Using [platform-specific file extensions](platform-specific-code.md#platform-specific-extensions).

Certain components may have properties that work on one platform only. All of these props are annotated with `@platform` and have a small badge next to them on the website.

## Platform module

React Native provides a module that detects the platform in which the app is running. You can use the detection logic to implement platform-specific code. Use this option when only small parts of a component are platform-specific.

```javascript
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  height: Platform.OS === 'ios' ? 200 : 100,
});
```

`Platform.OS` will be `ios` when running on iOS and `android` when running on Android.

There is also a `Platform.select` method available, that given an object containing Platform.OS as keys, returns the value for the platform you are currently running on.

```javascript
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      ios: {
        backgroundColor: 'red',
      },
      android: {
        backgroundColor: 'blue',
      },
    }),
  },
});
```

This will result in a container having `flex: 1` on both platforms, a red background color on iOS, and a blue background color on Android.

Since it accepts `any` value, you can also use it to return platform specific component, like below:

```javascript
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

<Component />;
```

### Detecting the Android version

On Android, the `Platform` module can also be used to detect the version of the Android Platform in which the app is running:

```javascript
import {Platform} from 'react-native';

if (Platform.Version === 25) {
  console.log('Running on Nougat!');
}
```

### Detecting the iOS version

On iOS, the `Version` is a result of `-[UIDevice systemVersion]`, which is a string with the current version of the operating system. An example of the system version is "10.3". For example, to detect the major version number on iOS:

```javascript
import {Platform} from 'react-native';

const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log('Work around a change in behavior');
}
```

## Platform-specific extensions

When your platform-specific code is more complex, you should consider splitting the code out into separate files. React Native will detect when a file has a `.ios.` or `.android.` extension and load the relevant platform file when required from other components.

For example, say you have the following files in your project:

```sh
BigButton.ios.js
BigButton.android.js
```

You can then require the component as follows:

```javascript
const BigButton = require('./BigButton');
```

React Native will automatically pick up the right file based on the running platform.

If you share your React Native code with a website, you might as well use the `BigButton.native.js` so that both iOS and Android will use this file, while the website will use `BigButton.js`.
