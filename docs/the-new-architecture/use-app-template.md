---
id: use-app-template
title: Creating a New Architecture App
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

This page will help you create a new React Native app that uses the New Architecture.

## Installing dependencies

Start by setting up your development environment as described in [Getting Started](getting-started.md), under "React Native CLI Quickstart". Stop when you reach "React Native Command Line Interface", and resume here.

<h3>React Native Command Line Interface</h3>

React Native has a built-in command line interface. Rather than install and manage a specific version of the CLI globally, we recommend you access the current version at runtime using `npx`, which ships with Node.js. With `npx react-native <command>`, the current stable version of the CLI will be downloaded and executed at the time the command is run.

<h2>Creating a new application</h2>

> If you previously installed a global `react-native-cli` package, please remove it as it may cause unexpected issues.

React Native has a built-in command line interface, which you can use to generate a new project. You can access it without installing anything globally using `npx`, which ships with Node.js. Let's create a new React Native project called "AwesomeProject":

```shell
npx react-native init AwesomeProject
```

## Configuration

Follow the steps below to enable the New Architecture and build the app you just created.

### Enable Hermes

Hermes is an open-source JavaScript engine optimized for React Native. [Hermes will be the default engine in the future](https://github.com/reactwg/react-native-new-architecture/discussions/4), and we highly recommend you use it.

Please [follow the instructions on the React Native website](hermes.md) in order to enable Hermes in your application.

### Platform configuration

#### Target OS

<Tabs groupId="platform" defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="ios">

### iOS

Navigate to the `ios` directory and run the following:

```shell
# from `ios` directory
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

Then build and run the app as usual:

```shell
npx react-native run-ios
```

#### Troubleshooting

If you see a build failure, there may be cached files from a previous build with the old architecture. Clean the build cache and try again:

```shell
# from `ios` directory
xcodebuild clean
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

</TabItem>
<TabItem value="android">

### Android

Edit `android/gradle.properties`, and set `newArchEnabled` to `true`:

```
newArchEnabled=true
```

Then build and run the app as usual:

```shell
npx react-native run-android
```

</TabItem>
</Tabs>
