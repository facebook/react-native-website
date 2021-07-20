---
id: hermes
title: Using Hermes
---

<a href="https://hermesengine.dev">
<img width={300} height={300} style={{float: 'right', margin: '-30px 4px 0'}} src="/docs/assets/HermesLogo.svg" />
</a>

[Hermes](https://hermesengine.dev) is an open-source JavaScript engine optimized for React Native. For many apps, enabling Hermes will result in improved start-up time, decreased memory usage, and smaller app size. At this time Hermes is an **opt-in** React Native feature, and this guide explains how to enable it.

First, ensure you're using at least version 0.60.4 of React Native.

If you have an existing app based on an earlier version of React Native, you will have to upgrade it first. See [Upgrading to new React Native Versions](/docs/upgrading) for how to do this. After upgrading the app, make sure everything works before trying to switch to Hermes.

> ## Note for RN compatibility.
>
> Each Hermes release is aimed at a specific RN version. The rule of thumb is to always follow [Hermes releases](https://github.com/facebook/hermes/releases) strictly. Version mismatch can result in instant crash of your apps in the worst case scenario.

> ## Note for Windows users.
>
> Hermes requires [Microsoft Visual C++ 2015 Redistributable](https://www.microsoft.com/en-us/download/details.aspx?id=48145)

## Enabling Hermes

### Android

Edit your `android/app/build.gradle` file and make the change illustrated below:

```diff
  project.ext.react = [
      entryFile: "index.js",
-     enableHermes: false  // clean and rebuild if changing
+     enableHermes: true  // clean and rebuild if changing
  ]
```

Also, if you're using ProGuard, you will need to add these rules in `proguard-rules.pro` :

```
-keep class com.facebook.hermes.unicode.** { *; }
-keep class com.facebook.jni.** { *; }
```

Next, if you've already built your app at least once, clean the build:

```shell
$ cd android && ./gradlew clean
```

That's it! You should now be able to develop and deploy your app as usual:

```shell
$ npx react-native run-android
```

> ## Note about Android App Bundles
>
> Android app bundles are supported from react-native 0.62.0 and up.

### iOS

Since React Native 0.64, Hermes also runs on iOS. To enable Hermes for iOS, edit your `ios/Podfile` file and make the change illustrated below:

```diff
   use_react_native!(
     :path => config[:reactNativePath],
     # to enable hermes on iOS, change `false` to `true` and then install pods
-    :hermes_enabled => false
+    :hermes_enabled => true
   )
```

Next, install the Hermes pods:

```shell
$ cd ios && pod install
```

That's it! You should now be able to develop and deploy your app as usual:

```shell
$ npx react-native run-ios
```

## Confirming Hermes is in use

If you've recently created a new app from scratch, you should see if Hermes is enabled in the welcome view:

![Where to find JS engine status in AwesomeProject](/docs/assets/HermesApp.jpg)

A `HermesInternal` global variable will be available in JavaScript that can be used to verify that Hermes is in use:

```jsx
const isHermes = () => !!global.HermesInternal;
```

To see the benefits of Hermes, try making a release build/deployment of your app to compare. For example:

```shell
$ npx react-native run-android --variant release
```

or for iOS:

```shell
$ npx react-native run-ios --configuration Release
```

This will compile JavaScript to bytecode during build time which will improve your app's startup speed on device.

## Debugging JS on Hermes using Google Chrome's DevTools

Hermes supports the Chrome debugger by implementing the Chrome inspector protocol. This means Chrome's tools can be used to directly debug JavaScript running on Hermes, on an emulator or on a real, physical, device.

> Note that this is very different with the "Remote JS Debugging" from the In-App Developer Menu documented in the [Debugging](debugging#debugging-using-a-custom-javascript-debugger) section, which actually runs the JS code on Chrome's V8 on your development machine (laptop or desktop).

Chrome connects to Hermes running on device via Metro, so you'll need to know where Metro is listening. Typically this will be on `localhost:8081`, but this is [configurable](https://facebook.github.io/metro/docs/configuration). When running `yarn start` the address is written to stdout on startup.

Once you know where the Metro server is listening, you can connect with Chrome using the following steps:

1. Navigate to `chrome://inspect` in a Chrome browser instance.

2. Use the `Configure...` button to add the Metro server address (typically `localhost:8081` as described above).

![Configure button in Chrome DevTools devices page](/docs/assets/HermesDebugChromeConfig.png)

![Dialog for adding Chrome DevTools network targets](/docs/assets/HermesDebugChromeMetroAddress.png)

3. You should now see a "Hermes React Native" target with an "inspect" link which can be used to bring up debugger. If you don't see the "inspect" link, make sure the Metro server is running. ![Target inspect link](/docs/assets/HermesDebugChromeInspect.png)

4. You can now use the Chrome debug tools. For example, to breakpoint the next time some JavaScript is run, click on the pause button and trigger an action in your app which would cause JavaScript to execute. ![Pause button in debug tools](/docs/assets/HermesDebugChromePause.png)
