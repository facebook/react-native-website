---
id: version-0.5-running-on-simulator-ios
title: Running On Simulator
original_id: running-on-simulator-ios
---

## Starting the simulator

Once you have your React Native project initialized, you can run `react-native run-ios` inside the newly created project directory. If everything is set up correctly, you should see your new app running in the iOS Simulator shortly.

## Specifying a device

You can specify the device the simulator should run with the `--simulator` flag, followed by the device name as a string. The default is `"iPhone X"`. If you wish to run your app on an iPhone 5s, run `react-native run-ios --simulator="iPhone 5s"`.

The device names correspond to the list of devices available in Xcode. You can check your available devices by running `xcrun simctl list devices` from the console.
