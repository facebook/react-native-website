---
id: native-platform
title: Native Platform
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Your application may need access to platform features that aren’t directly available from react-native or one of the hundreds of [third-party libraries](https://reactnative.directory/) maintained by the community. Maybe you want to reuse some existing Objective-C, Swift, Java, Kotlin or C++ code without having to reproduce it in JavaScript. Whatever your reason, React Native exposes a powerful set of API to connect your native code to your JavaScript application code.

This guide introduces:

- **Turbo Native Modules:** native libraries that have no “view” for the user. Examples would be persistent storage, notifications, network events. These are accessible to your user as JavaScript functions and objects.
- **Fabric Native Component:** native platform views that are available to your application JavaScript code through React Components.

:::note
You might have previously been familiar with:

- Legacy Native Modules
- Legacy Native Components

These are our deprecated native module and component API. You can still use many of these legacy libraries with the New Architecture thanks to our interop layer. You should consider alternative libraries, upgrade to versions that have 1st class support for the New Architecture or port these libraries yourself to Turbo Native Modules or Fabric Native Components.
:::

The recommended order to read these are:

1. Turbo Native Modules
   - [Introduction](/docs/turbo-native-modules)
   - [Android](/docs/turbo-native-modules-android)
   - [iOS](/docs/turbo-native-modules-ios)
2. [Fabric Native Components: introduction]
   - [Introduction](/docs/fabric-native-modules)
   - [Android](/docs/fabric-native-modules-android)
   - [iOS](/docs/fabric-native-modules-ios)
