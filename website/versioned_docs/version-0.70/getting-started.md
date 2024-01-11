---
id: environment-setup
title: Setting up the development environment
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

import GuideLinuxAndroid from './\_getting-started-linux-android.md'; import GuideMacOSAndroid from './\_getting-started-macos-android.md'; import GuideWindowsAndroid from './\_getting-started-windows-android.md'; import GuideMacOSIOS from './\_getting-started-macos-ios.md';

This page will help you install and build your first React Native app.

**If you are new to mobile development**, the easiest way to get started is with Expo Go. Expo is a set of tools and services built around React Native and, while it has many [features](https://docs.expo.dev), the most relevant feature for us right now is that it can get you writing a React Native app within minutes. You will only need a recent version of Node.js and a phone or emulator. If you'd like to try out React Native directly in your web browser before installing any tools, you can try out [Snack](https://snack.expo.dev/).

**If you are already familiar with mobile development**, you may want to use React Native CLI. It requires Xcode or Android Studio to get started. If you already have one of these tools installed, you should be able to get up and running within a few minutes. If they are not installed, you should expect to spend about an hour installing and configuring them.

<Tabs groupId="guide" queryString defaultValue={constants.defaultGuide} values={constants.guides}>
<TabItem value="quickstart">

Run the following command to create a new React Native project called "AwesomeProject":

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npx create-expo-app AwesomeProject

cd AwesomeProject
npm start # you can also use: npx expo start
```

</TabItem>
<TabItem value="yarn">

```shell
yarn create expo-app AwesomeProject

cd AwesomeProject
yarn start # you can also use: yarn expo start
```

</TabItem>
</Tabs>

This will start a development server for you.

<h2>Running your React Native application</h2>

Install the [Expo Go](https://expo.dev/client) app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the Expo Go app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code scanner of the default iOS Camera app.

<h3>Modifying your app</h3>

Now that you have successfully run the app, let's modify it. Open `App.js` in your text editor of choice and edit some lines. The application should reload automatically once you save your changes.

<h3>That's it!</h3>

Congratulations! You've successfully run and modified your first React Native app.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<h2>Now what?</h2>

Expo also has [docs](https://docs.expo.dev) you can reference if you have questions specific to the tool. You can also ask for help on the [Expo Discord](https://chat.expo.dev).

If you have a problem with Expo, before creating a new issue, please see if there's an existing issue about it in the [Expo issues](https://github.com/expo/expo/issues).

If you're curious to learn more about React Native, check out the [Introduction to React Native](getting-started).

<h3>Running your app on a simulator or virtual device</h3>

Expo Go allows you to run your React Native app on a physical device without installing iOS and Android native SDKs. If you want to run your app on the iOS Simulator or an Android Virtual Device, please refer to the instructions for "React Native CLI Quickstart" to learn how to install Xcode or set up your Android development environment.

Once you've set these up, you can launch your app on an Android Virtual Device by running `npm run android`, or on the iOS Simulator by running `npm run ios` (macOS only).

<h3>Caveats</h3>

The Expo Go app is a great tool to get started — it exists to help developers quickly get projects off the ground, to experiment with ideas (such as on [Snack](https://snack.expo.dev/)) and share their work with minimal friction. Expo Go makes this possible by including a feature-rich native runtime made up of every module in the [Expo SDK](https://docs.expo.dev/versions/latest/), so all you need to do to use a module is install the package with `npx expo install` and reload your app.

The tradeoff is that the Expo Go app does not allow you to add custom native code — you can only use native modules built into the Expo SDK. There are many great libraries available outside of the Expo SDK, and you may even want to build your own native library. You can leverage these libraries with [development builds](https://docs.expo.dev/develop/development-builds/introduction/), or by using ["prebuild"](https://docs.expo.dev/workflow/prebuild/) to generate the native projects, or both. [Learn more about adding native code to projects created with `create-expo-app`](https://docs.expo.dev/workflow/customizing/).

`create-expo-app` configures your project to use the most recent React Native version that is supported by the Expo SDK. The Expo Go app usually gains support for a given React Native version with new SDK versions (released quarterly). You can check [this document](https://docs.expo.dev/versions/latest/#each-expo-sdk-version-depends-on-a) to find out what versions are supported.

If you're integrating React Native into an existing project, [you can use the Expo SDK](https://docs.expo.dev/bare/installing-expo-modules/) and [development builds](https://docs.expo.dev/develop/development-builds/introduction/), but you will need to set up a native development environment. Select "React Native CLI Quickstart" above for instructions on configuring a native build environment for React Native.

</TabItem>
<TabItem value="native">

<p>Follow these instructions if you need to build native code in your project. For example, if you are integrating React Native into an existing application, or if you ran "prebuild" from Expo to generate your project's native code, you'll need this section.</p>

The instructions are a bit different depending on your development operating system, and whether you want to start developing for iOS or Android. If you want to develop for both Android and iOS, that's fine - you can pick one to start with, since the setup is a bit different.

#### Development OS

<Tabs groupId="os" queryString defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

#### Target OS

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'macOS, Android'

<GuideMacOSAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'macOS, iOS'

<GuideMacOSIOS/>

</TabItem>
</Tabs>

</TabItem>
<TabItem value="windows">

#### Target OS

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Windows, Android'

<GuideWindowsAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Windows, iOS'

## Unsupported

> A Mac is required to build projects with native code for iOS. You can follow the **Expo Go Quickstart** to learn how to build your app using Expo instead.

</TabItem>
</Tabs>

</TabItem>
<TabItem value="linux">

#### Target OS

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Linux, Android'

<GuideLinuxAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Linux, iOS'

## Unsupported

> A Mac is required to build projects with native code for iOS. You can follow the **Expo Go Quickstart** to learn how to build your app using Expo instead.

</TabItem>
</Tabs>

</TabItem>
</Tabs>

</TabItem>
</Tabs>
