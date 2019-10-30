---
title: Announcing React Native Doctor
author: Lucas Bento
authorTitle: React Native Community
authorURL: https://twitter.com/lbentosilva
authorImageURL: https://avatars3.githubusercontent.com/u/6207220?s=460&v=4
authorTwitter: lbentosilva
category: announcements
---

After 166 commits from 6 contributors, the React Native Community is excited to launch `react-native doctor`, a brand-new CLI command to help you out on getting started with React Native and automatically fix errors with your installation, heavily inspired by [Expo](https://expo.io/) an d [Homebrew](https://brew.sh/)'s own doctor command as well as [Jest](https://jestjs.io/)'s fluid interface.

Here it is in action:

[VIDEO WITH DOCTOR]

## How it works

The `doctor` command currently supports most of the software and libraries that React Native relies on, such as CocoaPods, Xcode and Android SDK. With `doctor` we'll find issues with your development environment and give you the option to automatically fix them. If `doctor` is not able to fix an issue, it will display a message and a helpful link explaining how to fix it manually.

## Try it now

To give it a try, run a healthcheck with `npx @react-native-community/cli doctor`!

## Thanks

Huge thanks for the React Native Community for working on this, in particular [@thymikee](https://github.com/thymikee), [@thib92](https://github.com/thib92), [@jmeistrich](https://github.com/jmeistrich), [@tido64](https://github.com/tido64) and [@rickhanlonii](https://github.com/rickhanlonii).
