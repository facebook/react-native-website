---
id: upgrading
title: Upgrading to new versions
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Upgrading to new versions of React Native will give you access to more APIs, views, developer tools and other goodies. Upgrading requires a small amount of effort, but we try to make it straightforward for you.

## Expo projects

Upgrading your Expo project to a new version of React Native requires updating the `react-native`, `react`, and `expo` package versions in your `package.json` file. Expo provides an `upgrade` command to handle upgrading these and any other known dependencies for you. See the [Upgrading Expo SDK Walkthrough](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) for up-to-date information about upgrading your project.

## React Native projects

Because typical React Native projects are essentially made up of an Android project, an iOS project, and a JavaScript project, upgrading can be rather tricky. The [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) is a web tool to help you out when upgrading your apps by providing the full set of changes happening between any two versions. It also shows comments on specific files to help understanding why that change is needed.

### 1. Select the versions

You first need to select from and to which version you wish to upgrade, by default the latest major versions are selected. After selecting you can click the button "Show me how to upgrade".

💡 Major updates will show an "useful content" section on the top with links to help you out when upgrading.

:::tip
Or you can run the `npx react-native upgrade`, which will automatically check your current version and the latest version available and will show you the link to the Upgrade Helper page with the versions already selected.
:::

### 2. Upgrade dependencies

The first file that is shown is the `package.json`, it's good to update the dependencies that are showing in there. For example, if `react-native` and `react` appears as changes then you can install it in your project by running following commands:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
# {{VERSION}} and {{REACT_VERSION}} are the release versions showing in the diff
npm install react-native@{{VERSION}}
npm install react@{{REACT_VERSION}}
```

</TabItem>
<TabItem value="yarn">

```shell
# {{VERSION}} and {{REACT_VERSION}} are the release versions showing in the diff
yarn add react-native@{{VERSION}}
yarn add react@{{REACT_VERSION}}
```

</TabItem>
</Tabs>

### 3. Upgrade your project files

The new release may contain updates to other files that are generated when you run `npx react-native init`, those files are listed after the `package.json` in the Upgrade Helper page. If there aren't other changes then you only need to rebuild the project to continue developing.

In case there are changes then you can either update them manually by copying and pasting from the changes in the page or you can do it with the React Native CLI upgrade command by running:

```shell
npx react-native upgrade
```

This will check your files against the latest template and perform the following:

- If there is a new file in the template, it is created.
- If a file in the template is identical to your file, it is skipped.
- If a file is different in your project than the template, you will be prompted; you have options to keep your file or overwrite it with the template version.

> Some upgrades won't be done automatically with the React Native CLI and require manual work, e.g. `0.28` to `0.29`, or `0.56` to `0.57`. Make sure to check the [release notes](https://github.com/facebook/react-native/releases) when upgrading so that you can identify any manual changes your particular project may require.

### Troubleshooting

#### I have done all the changes but my app is still using an old version

These sort of errors are usually related to caching, it's recommended to install [react-native-clean-project](https://github.com/pmadruga/react-native-clean-project) to clear all your project's cache and then you can run it again.
