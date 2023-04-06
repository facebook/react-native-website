---
id: running-on-simulator-ios
title: Running On Simulator
---

## Starting the Simulator

Once you have your React Native project initialized, you can run `npx react-native run-ios` inside the newly created project directory. If everything is set up correctly, you should see your new app running in the iOS Simulator shortly.

## Selecting a device

The easiest way to specify a device is by passing the `--list-devices` flag. This will provide an interactive list of all simulated and physical devices available.

For example, if you wish to run on your connected iPhone, you can run `npx react native run-ios --list-devices` and then select your iPhone from the list. This works for both simulated and connected physical devices.

## Manually specifying a device

You can also manually specify the device the iOS Simulator should run with the `--simulator` flag, followed by the device name as a string. The default is `"iPhone 14"`.

For example, if you wish to run your app on an iPhone SE (3rd generation), run `npx react-native run-ios --simulator='iPhone SE (3rd generation)'`.

:::note
The device names correspond to the list of devices available in Xcode. You can check your available devices by running `xcrun simctl list devices` from the console.
:::note

### Specifying a version of device

If you have multiple iOS versions installed, you also need to specify the device with a version. For example, you can run `npx react-native run-ios --simulator='iPhone 14 Pro (16.0)'` in order to specify the iOS version.

### Specifying a UDID

You can specify the device to run with by its UDID ([Unique Device Identifier](https://en.wikipedia.org/wiki/UDID)) returned from `xcrun simctl list devices` command. For example, you can run `npx react-native run-ios --udid='AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA'`.
