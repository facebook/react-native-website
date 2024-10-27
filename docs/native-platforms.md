---
id: native-platform
title: Native Platform
---

import BoxLink from '@site/src/theme/BoxLink';

Your application may need access to platform features that aren’t directly available from react-native or one of the hundreds of [third-party libraries](https://reactnative.directory/) maintained by the community. Maybe you want to reuse some existing Objective-C, Swift, Java, Kotlin or C++ code from the JavaScript runtime. Whatever your reason, React Native exposes a powerful set of API to connect your native code to your JavaScript application code.

This guide introduces:

- **Native Modules:** native libraries that have no User Interface (UI) for the user. Examples would be persistent storage, notifications, network events. These are accessible to your user as JavaScript functions and objects.
- **Native Component:** native platform views, widgets and controllers that are available to your application's JavaScript code through React Components.

:::note
You might have previously been familiar with:

- [Legacy Native Modules](./legacy/native-modules-intro);
- [Legacy Native Components](./legacy/native-components-android);

These are our deprecated native module and component API. You can still use many of these legacy libraries with the New Architecture thanks to our interop layers. You should consider:

- using alternative libraries,
- upgrading to newer library versions that have first-class support for the New Architecture, or
- port these libraries yourself to Turbo Native Modules or Fabric Native Components.

:::

1. Native Modules
   - [Android & iOS](turbo-native-modules.md)
   - [Cross-Platform with C++](the-new-architecture/pure-cxx-modules.md)
   - [Advanced: Custom C++ Types](the-new-architecture/custom-cxx-types.md)
2. Fabric Native Components
   - [Android & iOS](fabric-native-components.md)

## Native development with Expo

Expo provides **Expo Modules API** to write platform and renderer agnostic native modules and views. The API takes advantage of modern native language features from Swift and Kotlin, has built-in type conversion and safety, and provides a similar developer experience between each platform, so it's effortless to jump between Android and iOS modules. It also has similar performance characteristics to Turbo Modules API because it's built with React Native's JavaScript Interface (JSI).

Expo provides a large set of modules in its libraries and uses the Expo Modules API to create and manage native modules for each. This API only requires a minimal boilerplate when creating a new module.

<BoxLink href="https://docs.expo.dev/modules/get-started/">Continue with Expo Modules API</BoxLink>
