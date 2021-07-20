---
title: Meet Doctor, a new React Native command
author: Lucas Bento
authorTitle: React Native Community
authorURL: 'https://twitter.com/lbentosilva'
authorImageURL: 'https://avatars3.githubusercontent.com/u/6207220?s=460&v=4'
authorTwitter: lbentosilva
tags: [announcement]
---

After over 20 pull requests from 6 contributors in the React Native Community, we're excited to launch `react-native doctor`, a new command to help you out with getting started, troubleshooting and automatically fixing errors with your development environment. The `doctor` command is heavily inspired by [Expo](https://expo.io/) and [Homebrew](https://brew.sh/)'s own doctor command with a pinch of UI inspired by [Jest](https://jestjs.io/).

<!--truncate-->

Here it is in action:

<p style={{textAlign: 'center'}}>
  <video width={700} controls="controls" autoPlay style={{borderRadius: 5}}>
    <source type="video/mp4" src="/img/homepage/DoctorCommand.mp4" />
  </video>
</p>

## How it works

The `doctor` command currently supports most of the software and libraries that React Native relies on, such as CocoaPods, Xcode and Android SDK. With `doctor` we'll find issues with your development environment and give you the option to automatically fix them. If `doctor` is not able to fix an issue, it will display a message and a helpful link explaining how to fix it manually as the following:

<p style={{textAlign: 'center'}}>
  <img width={700} src="/img/DoctorManualInstallationMessage.png" alt="Doctor command with a link to help on Android SDK's installation" title="Doctor command with a link to help on Android SDK's installation" />
</p>

## Try it now

The `doctor` command is available as a part of React Native 0.62. However, you can try it without upgrading yet:

```sh
npx @react-native-community/cli doctor
```

## What checks are currently supported

`doctor` currently supports the following checks:

- Node.js (>= 8.3)
- yarn (>= 1.10)
- npm (>= 4)
- Watchman (>= 4), used for watching changes in the filesystem when in development mode.

Specific to the Android environment:

- Android SDK (>= 26), the software runtime for Android.
- Android NDK (>= 19), the native development toolkit for Android.
- `ANDROID_HOME`, environment variable required by the Android SDK setup.

And to the iOS environment:

- Xcode (>= 10), IDE for developing, building and shipping iOS applications.
- CocoaPods, library dependency management tool for iOS applications.
- ios-deploy (optional), library used internally by the CLI to install applications on a physical iOS device.

## Thanks

Huge thanks for the React Native Community for working on this, in particular [@thymikee](https://github.com/thymikee), [@thib92](https://github.com/thib92), [@jmeistrich](https://github.com/jmeistrich), [@tido64](https://github.com/tido64) and [@rickhanlonii](https://github.com/rickhanlonii).
