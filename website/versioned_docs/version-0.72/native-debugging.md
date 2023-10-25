---
id: native-debugging
title: Native Debugging
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<div className="banner-native-code-required">
  <h3>Projects with Native Code Only</h3>
  <p>
    The following section only applies to projects with native code exposed. If you are using the managed Expo workflow, see the guide on <a href="https://docs.expo.dev/workflow/prebuild/" target="_blank">prebuild</a> to use this API.
  </p>
</div>

## Accessing native logs

You can display the console logs for an iOS or Android app by using the following commands in a terminal while the app is running:

```shell
# For Android:
npx react-native log-android
# Or, for iOS:
npx react-native log-ios
```

You may also access these through Debug > Open System Log… in the iOS Simulator or by running `adb logcat "*:S" ReactNative:V ReactNativeJS:V` in a terminal while an Android app is running on a device or emulator.

:::info
If you're using Expo CLI, console logs already appear in the same terminal output as the bundler.
:::

## Debugging native code

When working with native code, such as when writing native modules, you can launch the app from Android Studio or Xcode and take advantage of the native debugging features (setting up breakpoints, etc.) as you would in case of building a standard native app.

Another option is to run your application using the React Native CLI and attach the native debugger of the native IDE (Android Studio or Xcode) to the process.

### Android Studio

On Android Studio you can do this by going on the "Run" option on the menu bar, clicking on "Attach to Process..." and selecting the running React Native app.

### Xcode

On Xcode click on "Debug" on the top menu bar, select the "Attach to process" option, and select the application in the list of "Likely Targets".
