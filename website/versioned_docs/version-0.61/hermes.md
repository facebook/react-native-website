---
id: hermes
title: Using Hermes
---

<a href="https://hermesengine.dev">
  <img width="300" height="300" style={{float: "right", margin: "-30px 4px 0"}} src="/docs/assets/HermesLogo.svg"/>
</a>

[Hermes](https://hermesengine.dev) is an open-source JavaScript engine optimized for running React Native apps on Android. For many apps, enabling Hermes will result in improved start-up time, decreased memory usage, and smaller app size. At this time Hermes is an **opt-in** React Native feature, and this guide explains how to enable it.

First, ensure you're using at least version 0.60.4 of React Native.

If you have an existing app based on an earlier version of React Native, you will have to upgrade it first. See [Upgrading to new React Native Versions](/docs/upgrading) for how to do this. Make especially sure that all changes to `android/app/build.gradle` have been applied, as detailed by the [React Native upgrade helper](https://react-native-community.github.io/upgrade-helper/?from=0.59.0). After upgrading the app, make sure everything works before trying to switch to Hermes.

> ## Note for Windows users.
>
> Hermes requires [Microsoft Visual C++ 2015 Redistributable](https://www.microsoft.com/en-us/download/details.aspx?id=48145)

Edit your `android/app/build.gradle` file and make the change illustrated below:

```diff
  project.ext.react = [
      entryFile: "index.js",
-     enableHermes: false  // clean and rebuild if changing
+     enableHermes: true  // clean and rebuild if changing
  ]
```

Also, if you're using ProGuard, you will need to add this rule in `proguard-rules.pro` :

```
-keep class com.facebook.hermes.unicode.** { *; }
```

Next, if you've already built your app at least once, clean the build:

```shellell
$ cd android && ./gradlew clean
```

That's it! You should now be able to develop and deploy your app as normal:

```shellell
$ react-native run-android
```

## Confirming Hermes is in use

If you've recently created a new app from scratch you should see if Hermes is enabled in the welcome view:

![Where to find JS engine status in AwesomeProject](/docs/assets/HermesApp.jpg)

A `HermesInternal` global variable will be available in JavaScript that can be used to verify that Hermes is in use:

```jsx
const isHermes = () => global.HermesInternal != null;
```

To see the benefits of Hermes, try making a release build/deployment of your app to compare. For example:

```shellell
$ react-native run-android --variant release
```

This will compile JavaScript to bytecode during build time which will improve your app's startup speed on device.

## Debugging Hermes using Google Chrome's DevTools

Hermes supports the Chrome debugger by implementing the Chrome inspector protocol. This means Chrome's tools can be used to directly debug JavaScript running on Hermes, on an emulator or device.

Chrome connects to Hermes running on device via Metro, so you'll need to know where Metro is listening. Typically this will be on `localhost:8081`, but this is [configurable](https://facebook.github.io/metro/docs/en/configuration). When running `yarn start` the address is written to stdout on startup.

Once you know where the Metro server is listening, you can connect with Chrome using the following steps:

1. Navigate to `chrome://inspect` in a Chrome browser instance.

2. Use the `Configure...` button to add the Metro server address (typically `localhost:8081` as described above).

![Configure button in Chrome DevTools devices page](/docs/assets/HermesDebugChromeConfig.png)

![Dialog for adding Chrome DevTools network targets](/docs/assets/HermesDebugChromeMetroAddress.png)

3. You should now see a "Hermes React Native" target with an "inspect" link which can be used to bring up debugger. If you don't see the "inspect" link, make sure the Metro server is running. ![Target inspect link](/docs/assets/HermesDebugChromeInspect.png)

4. You can now use the Chrome debug tools. For example, to breakpoint the next time some JavaScript is run, click on the pause button and trigger an action in your app which would cause JavaScript to execute. ![Pause button in debug tools](/docs/assets/HermesDebugChromePause.png)
