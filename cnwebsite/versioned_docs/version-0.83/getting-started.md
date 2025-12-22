---
id: environment-setup
title: 搭建开发环境
hide_table_of_contents: true
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

import GuideLinuxAndroid from './\_getting-started-linux-android.md'; import GuideMacOSAndroid from './\_getting-started-macos-android.md'; import GuideWindowsAndroid from './\_getting-started-windows-android.md'; import GuideMacOSIOS from './\_getting-started-macos-ios.md';

欢迎使用 React Native！这篇文档会帮助你搭建基本的 React Native 开发环境。

<Tabs groupId="guide" defaultValue={constants.defaultGuide} values={constants.guides}>
<TabItem value="quickstart">

> 译注：沙盒环境大量依赖于国外网络环境，也不能直接安装第三方原生组件。不建议国内用户使用

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

<center><img src="https://cdn.jsdelivr.net/gh/reactnativecn/react-native-website@gh-pages/docs/assets/GettingStartedCongratulations.png" width="150"></img></center>

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

根据你所使用的操作系统、针对的目标平台不同，具体步骤有所不同。如果想同时开发 iOS 和 Android 也没问题，你只需要先选一个平台开始，另一个平台的环境搭建只是稍有不同。

如果`阅读完本文档`后还碰到很多环境搭建的问题，我们建议你还可以再看看[求助讨论区](https://github.com/reactnativecn/react-native-website/issues)。注意！视频教程或者其他网络上的博客和文章可能和本文档有所出入，请以最新版本的本文档所述为准！

#### 开发平台

<Tabs groupId="os" defaultValue={constants.defaultOs} values={constants.oses} className="pill-tabs">
<TabItem value="macos">

#### 目标平台

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

#### 目标平台

<Tabs groupId="platform" defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Windows, Android'

<GuideWindowsAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Windows, iOS'

## 暂不支持

> 苹果公司目前只允许在 Mac 电脑上开发 iOS 应用。如果你没有 Mac 电脑，那么只能考虑使用`沙盒环境`，或者先开发 Android 应用了。

</TabItem>
</Tabs>

</TabItem>
<TabItem value="linux">

#### 目标平台

<Tabs groupId="platform" defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="android">

[//]: # 'Linux, Android'

<GuideLinuxAndroid/>

</TabItem>
<TabItem value="ios">

[//]: # 'Linux, iOS'

## 暂不支持

> 苹果公司目前只允许在 Mac 电脑上开发 iOS 应用。如果你没有 Mac 电脑，那么只能考虑使用`沙盒环境`，或者先开发 Android 应用了。

</TabItem>
</Tabs>

</TabItem>
</Tabs>

</TabItem>
</Tabs>
