---
id: native-platform
title: Native Platform
---

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

## Turbo Native Modules

If you want your React Native application code to interact with native platform API, you should use a Turbo Native Module. This guide will show you how to write one.

The basic steps are:

1. Define a typed JavaScript specification using one of the most popular JavaScript type annotation languages: Flow or TypeScript;
2. Configure your dependency management system to run codegen, which converts the specification into native language interfaces;
3. Use the interfaces to write and hook your native code into the React Native runtime environment
4. Add your new code to your application

Using example, lets work through each of these steps.

### Persistent Storage Example

This guide will show you how to write a simple implementation of part of the [Web Storage API](https://html.spec.whatwg.org/multipage/webstorage.html#dom-localstorage-dev): `localStorage`. The API is simple and relatable to a React developer who might be writing application code on your project.

To make this work on mobile, we need to use 2 platform APIS: [NSUserDefaults](https://developer.apple.com/documentation/foundation/nsuserdefaults) for iOS and [SharedPreferences](https://developer.android.com/reference/android/content/SharedPreferences) for Android.

#### 1. Declare your typed specification

React Native provides tooling called codegen, which will take a specification written in a TypeScript or Flow file and generate platform code for iOS and Android. The specification declares the methods and data types that will pass back and forth between your native code and the React Native JavaScript runtime. We call your specification and the native code you write to work with the codegen interfaces a Turbo Native Module.

You can see all of the type you can use in your specification and the native types in the [Appendix](/appendix):
