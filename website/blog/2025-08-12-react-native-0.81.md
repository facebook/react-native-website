---
title: 'React Native 0.81 - Android 16 support, faster iOS builds, and more'
authors: [motiz88, vzaidman, gabrieldonadel, chrfalch]
tags: [engineering]
date: 2025-08-12
---

# React Native 0.81 - Android 16 support, faster iOS builds, and more

Today we are excited to release React Native 0.81!

This release increases the target Android version to Android 16 (API level 36) and includes a variety of other stability improvements and bugfixes, as well as **experimental** support for faster iOS builds using precompilation.

### Highlights

- [Android 16 support](#android-16-support)
- [SafeAreaView deprecation](#safeareaview-deprecation)
- [Community-maintained JavaScriptCore support](#community-maintained-javascriptcore-support)
- [[Experimental] Precompiled iOS builds](#experimental-precompiled-ios-builds)

<!--truncate-->

## Highlights

### Android 16 support

Android apps built with React Native 0.81 will now default to targeting Android 16 (API level 36). Android 16 mandates that [apps are displayed edge-to-edge](https://developer.android.com/develop/ui/views/layout/edge-to-edge) with no support for opting out. To this end, we are also deprecating the `<SafeAreaView>` component ([see below](#safeareaview-deprecation)) in favor of alternatives that provide better edge-to-edge support.

Another big change for apps targeting Android 16 is that the [predictive back gesture](https://developer.android.com/guide/navigation/custom-back/predictive-back-gesture) is enabled by default. With this change, [`onBackPressed()`](<https://developer.android.com/reference/androidx/activity/ComponentActivity#onBackPressed()>) is not called and [`KeyEvent.KEYCODE_BACK`](https://developer.android.com/reference/android/view/KeyEvent#KEYCODE_BACK) is not dispatched anymore. So existing apps updating to `targetSdk` 36 may not behave as expected unless the code is migrated properly. You can opt-out for now but this option will likely be removed in the next major Android release. Refer to [this post in the discussions-and-proposal repository](TODO: add link) for additional information around handling predictive back in React Native apps.

To learn more about the edge-to-edge requirements, predictive back and other changes to expect when migrating, read the official guidance for Android developers on [behavior changes in Android 16](https://developer.android.com/about/versions/16/behavior-changes-16).

Here is also a [video from Google I/O 2025](https://youtu.be/IaNpcrCSDiI?si=K0N9Qm21oBE0Z8_k&t=2333) announcing the changes.

### SafeAreaView deprecation

<!--alex ignore simple retext-equality-->

The built-in `<SafeAreaView>` component was originally designed to provide **limited, iOS-only support** for keeping content in the "safe areas" of the screen (away from camera notches, rounded corners, etc). It is not compatible with edge-to-edge rendering on Android, and does not permit customization beyond simple padding. As a result, many apps have opted for more portable and flexible solutions, such as [`react-native-safe-area-context`](https://appandflow.github.io/react-native-safe-area-context/).

In React Native 0.81, the legacy `<SafeAreaView>` component is deprecated, and you will see warnings in React Native DevTools if your app uses it. It will be removed in a future version of React Native. We recommend that you migrate to `react-native-safe-area-context` or a similar library now to ensure your app looks its best across all platforms.

### Community-maintained JavaScriptCore support

[As we announced last year](./2025-04-08-react-native-0.79.md#jsc-moving-to-community-package), support for the JavaScriptCore (JSC) engine has moved to a [community-maintained package](https://github.com/react-native-community/javascriptcore) that is released separately from React Native itself. In React Native 0.81, we're removing the built-in version of JavaScriptCore. All apps that require JavaScriptCore should now use the community package in order to upgrade to 0.81. [Read the installation instructions](https://github.com/react-native-community/javascriptcore#installation) for the details.

This change does not affect apps that are using Hermes.

### [Experimental] Precompiled iOS builds

React Native 0.81 introduces precompiled iOS builds, cutting compile times by up to 10x in projects where React Native is the primary dependency. This is the result of a collaboration between Expo and Meta, and expands on [work we previously shipped in 0.80](./2025-06-12-react-native-0.80.md#experimental---react-native-ios-dependencies-are-now-prebuilt).

This feature is still experimental, but we are hoping to enable it for all apps in a future release. If you'd like to try precompiled builds in your own app, you can enable them by specifying the following environment variables when you run `pod install`:

```bash
RCT_USE_RN_DEP=1 RCT_USE_PREBUILT_RNCORE=1 bundle exec pod install
```

Please provide feedback in [this GitHub discussion](https://github.com/react-native-community/discussions-and-proposals/discussions/923).

There are two limitations we are already aware of, and are working to resolve:

- In precompiled builds, you cannot debug and step into React Native's internals like you can when building from source. You can, however, still debug your own native code while using a precompiled version of React Native.
- Precompiled builds are not supported in Xcode 26 Beta out of the box, since it builds all targets with [Swift explicit modules](https://developer.apple.com/documentation/xcode-release-notes/xcode-26-release-notes#Resolved-Issues-in-Xcode-26-Beta:~:text=Starting%20from%20Xcode%2026%2C%20Swift%20explicit%20modules%20will%20be%20the%20default%20mode%20for%20building%20all%20Swift%20targets)). You can use precompiled React Native builds with Xcode 26 by setting `SWIFT_ENABLE_EXPLICIT_MODULES` to `NO` in your Xcode project. We will address this limitation in an upcoming React Native 0.81 patch release.

You can read more about this feature in Expo's full blog post, [Precompiled React Native for iOS: Faster builds are coming in 0.81](https://expo.dev/blog/precompiled-react-native-for-ios).

## Breaking Changes

### Minimum Node.js bumped to 20

React Native now requires [Node.js](http://Node.js) version 20.19.4 (the latest [Maintenance LTS](https://nodejs.org/en/about/previous-releases) version at the time of writing) or higher. You may need to upgrade Node.js in your development or CI environment when you upgrade to React Native 0.81.

### Minimum Xcode bumped to 16.1

React Native now requires [Xcode 16.1](https://developer.apple.com/documentation/xcode-release-notes/xcode-16_1-release-notes) or higher to build iOS projects. You may need to upgrade Xcode in your development or CI environment when you upgrade to React Native 0.81.

### Metro: Better support for advanced configuration in Community CLI projects

Metro now respects the [`resolveRequest`](https://metrobundler.dev/docs/configuration#resolverequest) and [`getModulesRunBeforeMainModule`](getModulesRunBeforeMainModule) options if specified in the `metro.config.js` file of a React Native Community CLI project. Previously, setting them would have no effect. If you have custom values for these options in your [`metro.config.js`](metro.config.js) file, you may need to delete them in order to restore the previous behavior.

### Improved reporting of uncaught JavaScript errors

React Native DevTools now shows the original message and stack trace of uncaught JavaScript errors, as well as the error's [cause](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause) if any, and an Owner Stack for errors thrown by components. This makes errors easier to debug and fix.

![Example error including a cause and Owner Stack](../static/blog/assets/0.81-improved-uncaught-error.png)

If you are logging JavaScript errors to your backend or to a third-party error reporting service, this may affect the logs you see after upgrading to React Native 0.81 (for example: you might see more thrown errors that used to be reported via `console.error`), and you may need to update some backend logic accordingly.

### Miscellaneous API changes

You may be affected by these changes if your app (or a library you use) relies on the old or private version of a particular API. For most apps, we don't anticipate any changes other than upgrading some libraries to their latest versions.

- Android: MountingManager is now Kotlin `internal`.
- Android: Cleaned up measurements path and ReactTextViewManagerCallback injection.

Read the full list of breaking changes [in the CHANGELOG for 0.81](https://github.com/facebook/react-native/blob/main/CHANGELOG.md#v0810).

## Acknowledgements

React Native 0.81 contains over 1110 commits from 110 contributors. Thanks for all your hard work!

<!--alex ignore special retext-equality-->

We want to send a special thank you to those community members that shipped significant contributions in this release:

- [Christian Falch](<[https://github.com/chrfalch](https://github.com/chrfalch)>) for the amazing work on precompiled iOS builds.
<!-- // @case-police-ignore Mathieu -->
- [Mathieu Acthernoene](https://github.com/zoontek) for crucial contributions to Android edge-to-edge support
- &lt;TODO> for helping test Android 16 and the SafeAreaView deprecation.

Moreover, we also want to thank the additional authors that worked on documenting features in this release post:

- &lt;TODO>

## Upgrade to 0.81

Please use the [React Native Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) to view code changes between React Native versions for existing projects, in addition to the Upgrading docs.

To create a new project:

If you use Expo, React Native 0.81 will be supported in the upcoming Expo SDK 54 as the default version of React Native.

::: info

0.81 is now the latest stable version of React Native and 0.78.x moves to unsupported. For more information see React Native's support policy. We aim to publish a final end-of-life update of 0.78 in the near future.

:::
