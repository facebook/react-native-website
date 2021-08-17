---
id: environment-setup
title: Setting up the development environment
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

import GuideLinuxAndroid from './\_getting-started-linux-android.md'; import GuideMacOSAndroid from './\_getting-started-macos-android.md'; import GuideWindowsAndroid from './\_getting-started-windows-android.md'; import GuideMacOSIOS from './\_getting-started-macos-ios.md';

This page will help you install and build your first React Native app.

**If you are new to mobile development**, the easiest way to get started is with Expo CLI. Expo is a set of tools built around React Native and, while it has many [features](https://expo.io/features), the most relevant feature for us right now is that it can get you writing a React Native app within minutes. You will only need a recent version of Node.js and a phone or emulator. If you'd like to try out React Native directly in your web browser before installing any tools, you can try out [Snack](https://snack.expo.dev/).

**If you are already familiar with mobile development**, you may want to use React Native CLI. It requires Xcode or Android Studio to get started. If you already have one of these tools installed, you should be able to get up and running within a few minutes. If they are not installed, you should expect to spend about an hour installing and configuring them.

<Tabs groupId="guide" defaultValue={constants.defaultGuide} values={constants.guides}>
<TabItem value="quickstart">

Assuming that you have [Node 12 LTS](https://nodejs.org/en/download/) or greater installed, you can use npm to install the Expo CLI command line utility:

<Tabs groupId="package-manager" defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm install -g expo-cli
```

</TabItem>
<TabItem value="yarn">

```shell
yarn global add expo-cli
```

</TabItem>
</Tabs>

Then run the following commands to create a new React Native project called "AwesomeProject":

<Tabs groupId="package-manager" defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
expo init AwesomeProject

cd AwesomeProject
npm start # you can also use: expo start
```

</TabItem>
<TabItem value="yarn">

```shell
expo init AwesomeProject

cd AwesomeProject
yarn start # you can also use: expo start
```

</TabItem>
</Tabs>

This will start a development server for you.

<h2>Running your React Native application</h2>

Install the [Expo](https://expo.io) client app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the Expo app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code scanner of the Camera app.

<h3>Modifying your app</h3>

Now that you have successfully run the app, let's modify it. Open `App.js` in your text editor of choice and edit some lines. The application should reload automatically once you save your changes.

<h3>That's it!</h3>

Congratulations! You've successfully run and modified your first React Native app.

<center><img src="/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

<h2>Now what?</h2>

Expo also has [docs](https://docs.expo.io) you can reference if you have questions specific to the tool. You can also ask for help at [Expo forums](https://forums.expo.io).

These tools help you get started quickly, but before committing to building your app with Expo CLI, [read about the limitations](https://docs.expo.io/versions/latest/introduction/why-not-expo/).

If you have a problem with Expo, before creating a new issue, please see if there's an existing issue about it:

- in the [Expo CLI issues](https://github.com/expo/expo-cli/issues) (for issues related to Expo CLI), or
- in the [Expo issues](https://github.com/expo/expo/issues) (for issues about the Expo client or SDK).

If you're curious to learn more about React Native, check out the [Introduction to React Native](getting-started).

<h3>Running your app on a simulator or virtual device</h3>

Expo CLI allows you to run your React Native app on a physical device without setting up a development environment. If you want to run your app on the iOS Simulator or an Android Virtual Device, please refer to the instructions for "React Native CLI Quickstart" to learn how to install Xcode or set up your Android development environment.

Once you've set these up, you can launch your app on an Android Virtual Device by running `npm run android`, or on the iOS Simulator by running `npm run ios` (macOS only).

<h3>Caveats</h3>

Because you don't build any native code when using Expo to create a project, it's not possible to include custom native modules beyond the React Native APIs and components that are available in the Expo client app.

If you know that you'll eventually need to include your own native code, Expo is still a good way to get started. In that case you'll need to "[eject](https://docs.expo.io/versions/latest/workflow/customizing/)" eventually to create your own native builds. If you do eject, the "React Native CLI Quickstart" instructions will be required to continue working on your project.

Expo CLI configures your project to use the most recent React Native version that is supported by the Expo client app. The Expo client app usually gains support for a given React Native version about a week after the React Native version is released as stable. You can check [this document](https://docs.expo.io/versions/latest/sdk/overview/#sdk-version) to find out what versions are supported.

If you're integrating React Native into an existing project, you'll want to skip Expo CLI and go directly to setting up the native build environment. Select "React Native CLI Quickstart" above for instructions on configuring a native build environment for React Native.

</TabItem>
<TabItem value="native">

<p>Follow these instructions if you need to build native code in your project. For example, if you are integrating React Native into an existing application, or if you "ejected" from Expo, you'll need this section.</p>

The instructions are a bit different depending on your development operating system, and whether you want to start developing for iOS or Android. If you want to develop for both Android and iOS, that's fine - you can pick one to start with, since the setup is a bit different.

#### Development OS

<Tabs groupId="os" defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

#### Target OS

<Tabs groupId="platform" defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
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

<Tabs groupId="platform" defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Windows, Android'

<GuideWindowsAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Windows, iOS'

## Unsupported

> A Mac is required to build projects with native code for iOS. You can follow the **Expo CLI Quickstart** to learn how to build your app using Expo instead.

</TabItem>
</Tabs>

</TabItem>
<TabItem value="linux">

#### Target OS

<Tabs groupId="platform" defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Linux, Android'

<GuideLinuxAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Linux, iOS'

## Unsupported

> A Mac is required to build projects with native code for iOS. You can follow the **Expo CLI Quickstart** to learn how to build your app using Expo instead.

</TabItem>
</Tabs>

</TabItem>
</Tabs>

</TabItem>
</Tabs>
