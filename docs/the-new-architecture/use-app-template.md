---
id: use-app-template
title: Creating a New Architecture App
---

This page will help you create a new React Native app that uses the new architecture.

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

## Configuring iOS

To configure iOS to use the new architecture, navigate to the `ios` directory and run the following:

```shell
# from `ios` directory
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

Then build and run the app as usual:

```shell
npx react-native run-ios
```

### Troubleshooting

If you see a build failure, there may be cached files from a previous build with the old architecture. Clean the build cache and try again:

```shell
# from `ios` directory
xcodebuild clean
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

## Configuring Android

In `android/gradle.properties`, enable the new architecture:

```
newArchEnabled=true
```

Then build and run the app as usual:

```shell
npx react-native run-android
```
