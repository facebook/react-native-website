---
id: use-app-template
title: Creating a New Architecture App
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';
import RemoveGlobalCLI from '.././\_remove-global-cli.md';
import NewArchitectureWarning from '../\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

This page will help you create a new React Native app that uses the New Architecture.

## Development Environment

Before continuing, make sure you've followed all the steps in the [Setting up the development environment](getting-started.md) section under the **React Native CLI Quickstart** tab.

If following the setup guide, stop when you reach the section **Running your React Native Application**, and resume following this guide.

:::info Note for Expo projects
If you're using Expo, you can enable the New Architecture by the [expo-build-properties](https://docs.expo.dev/versions/latest/sdk/build-properties/) plugin.
:::

## Creating a New Application

<RemoveGlobalCLI />

If you already have your development environment set up, create a new React Native project from the template:

```shell
npx react-native@latest init AwesomeProject
```

:::caution
The New Architecture is available in React Native version 0.68 or later.
:::

## Configuration

Follow the steps below to enable the New Architecture and build the app.

### Enable Hermes

Hermes is an open-source JavaScript engine optimized for React Native. [Hermes will be the default engine in the future](https://github.com/reactwg/react-native-new-architecture/discussions/4), and we highly recommend you use it.

Please [follow the instructions on the React Native website](hermes.md) to enable Hermes in your application.

### Enable the New Architecture

#### Target OS

<Tabs groupId="platform" queryString defaultValue={constants.defaultPlatform} values={constants.platforms} className="pill-tabs">
<TabItem value="ios">

Navigate to the `ios` directory and run the following:

```shell
# from `ios` directory
bundle install && RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

Then build and run the app as usual:

```shell
yarn ios
```

:::note
You will need to run `pod install` each time a dependency with native code changes. Make this command easier to run by adding it to `scripts` to your project's `package.json` file:

```
"scripts": {
  "pod-install": "RCT_NEW_ARCH_ENABLED=1 bundle exec pod install"
}
```

and run it with `yarn pod-install`. Note that `bundle install` does not need to run a second time, as long as the Gemfile has not changed.
:::

#### Troubleshooting

##### `react-native run-ios` fails

If you see a build failure from `react-native run-ios`, there may be cached files from a previous build with the old architecture. Clean the build cache and try again:

1. Open the project `ios/project.xcworkspace` in Xcode
2. In XCode, choose Product > Clean Build Folder
3. In the project directory, remove the `ios/Podfile.lock` file and `ios/Pods` directory: `rm -rf ios/Podfile.lock ios/Pods`
4. Re-run `yarn pod-install` and `yarn ios`

</TabItem>
<TabItem value="android">

Set the `newArchEnabled` property to `true` by **either**:

- Changing the corresponding line in `android/gradle.properties`
- Setting the environment variable `ORG_GRADLE_PROJECT_newArchEnabled=true`

Then build and run the app as usual:

```shell
yarn android
```

:::note
You may notice longer build times with the New Architecture due to additional step of C++ compilation with the Android NDK. To improve your build time, see [Speeding Up Your Build Phase](build-speed.md).
:::

</TabItem>
</Tabs>

### Confirming the New Architecture is in Use

After you build and run the app when Metro serves the JavaScript bundle, you should see `"fabric": true` in the Metro logs:

<img src="/docs/assets/metro-new-arch.png" alt="Metro shows fabric: true" width="600" />

### Want to Know More?

If you'd like to view the code changes relevant to the New Architecture, take a look at the [upgrade helper from version 0.67.4 to 0.68.0](https://react-native-community.github.io/upgrade-helper/?from=0.67.4&to=0.68.0). Files that were added for the New Architecture are marked with a yellow banner.

For further explanations of what each file is doing, check out these guides to walk through the changes step-by-step: [Enabling The New Architecture in Your App](new-architecture-app-intro.md)
