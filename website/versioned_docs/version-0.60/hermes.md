---
id: version-0.60-hermes
title: Enabling Hermes
original_id: hermes
---

<a href="https://hermesvm.io">
  <img width="300" height="300" style="float: right; margin: -30px 4px 0;" src="/react-native/docs/assets/HermesLogo.svg"/>
</a>

[Hermes](https://hermesvm.io) is an open-source JavaScript engine optimized for running React Native apps on Android. For many apps, simply enabling Hermes will result in improved start-up time, decreased memory usage and smaller app size. At this time Hermes is an **opt-in** React Native feature, and this guide explains how to enable it.

First, ensure you're using at least version 0.60.2 of React Native. If you're upgrading an existing app ensure everything works before trying to switch to Hermes.

Edit your `android/app/build.gradle` file and make the change illustrated below:

```diff
  project.ext.react = [
      entryFile: "index.js",
-     enableHermes: false  // clean and rebuild if changing
+     enableHermes: true  // clean and rebuild if changing
  ]
```

Next, if you've already built your app at least once, clean the build:

```shell
$ cd android && ./gradlew clean
```

That's it! You should now be able to develop and deploy your app as normal:

```shell
$ react-native run-android
```

## Confirming Hermes is in use

If you've just created a new app from scratch you should see if Hermes is enabled in the welcome view:

![Where to find JS engine status in AwesomeProject](/react-native/docs/assets/HermesApp.jpg)

A `HermesInternal` global variable will be available in JavaScript that can be used to verify that Hermes is in use:

```javascript
const isHermes = () => global.HermesInternal != null;
```

To see the benefits of Hermes, try making a release build/deployment of your app to compare. For example:

```shell
$ react-native run-android --variant release
```

This will compile JavaScript to bytecode during build time which will improve your app's startup speed on device.
