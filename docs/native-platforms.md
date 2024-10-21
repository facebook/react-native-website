---
id: native-platform
title: Native Platform
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Your application may need access to platform features that aren’t directly available from React Native or one of the hundreds of [third-party libraries](https://reactnative.directory/) maintained by the community. Maybe you want to reuse some existing Objective-C, Swift, Java, Kotlin or C++ code from the JavaScript runtime. Whatever your reason, React Native exposes a powerful set of API to connect your native code to your JavaScript application code.

This guide introduces:

- **Turbo Native Modules:** native libraries that have no User Interface (UI) for the user. Examples would be persistent storage, notifications, network events. These are accessible to your user as JavaScript functions and objects.
- **Fabric Native Component:** native platform views, widgets and controllers that are available to your application's JavaScript code through React Components.

:::note
You might have previously been familiar with:

- [Legacy Native Modules](./legacy/native-modules-intro);
- [Legacy Native Components](./legacy/native-components-android);

These are our deprecated native module and component API. You can still use many of these legacy libraries with the New Architecture thanks to our interop layers. You should consider:

- using alternative libraries,
- upgrading to newer library versions that have first-class support for the New Architecture, or
- port these libraries yourself to Turbo Native Modules or Fabric Native Components.
  :::

1. Turbo Native Modules
   - [Introduction](turbo-native-modules.md)
   - [Android](turbo-native-modules-android.md)
   - [iOS](turbo-native-modules-ios.md)
2. Fabric Native Components
   - [Introduction](fabric-native-modules.md)
   - [Android](fabric-native-modules-android.md)
   - [iOS](fabric-native-modules-ios.md)
