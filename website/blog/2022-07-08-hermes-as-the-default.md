---
title: Hermes as the Default
authors: [micleo]
tags: [announcement, release]
---

# Hermes As the Default Blogpost

Last October, we [announced](https://engineering.fb.com/2019/07/12/android/hermes/) that we had started work towards **making** **Hermes the default engine for all React Native apps**.

Hermes has provided a lot of value to React Native inside of Meta, and we believe the open-source community will benefit as well. Hermes is designed for resource constrained devices and optimizes for start up, app size, and memory consumption. One key difference between Hermes and other JS engines is its ability to compile JavaScript source code to bytecode ahead of time. This precompiled bytecode is bundled inside the binary, and saves the interpreter from having to perform this expensive step during app startup.

Since the announcement, a lot of work has gone into making Hermes better, and today, we are excited to share that **React Native 0.70 will ship with Hermes as the default engine.** This means that all new projects starting on v0.70 will have Hermes enabled by default. With the rollout coming up in July, we want to work closely with the community and make sure the transition is smooth and brings value to all users. This blogpost will go over what you can expect from the change, performance benchmarks, new features, and more. Note that you don’t need to wait for React Native 0.70 to start using Hermes - you can **follow [these instructions](/docs/hermes#enabling-hermes) to enable Hermes on your existing React Native app**.

Note that while Hermes will be enabled by default in new React Native projects, support for other engines will continue.

<!--truncate-->

## Benchmarking

We measured three different metrics important to app developers: TTI, binary size, and memory consumption. We used the React Native app [Mattermost](https://github.com/mattermost/mattermost-mobile) for testing. We ran these experiments for both Android and iOS on high end hardware from 2020.

- TTI, or time to interactive, is the duration of time from the app being launched to the user being able to interact with it. For this benchmark, we define it as the time from pressing the app icon to the first screen being rendered. We also show screen recordings of starting up Mattermost.
- The binary size was measured as APK size on android and IPA size on iOS.
- The memory consumption data was collected by using the Mattermost app over the span of a couple minutes. The same actions were performed in the app on both engines.

## Android Benchmarking Data

All the android tests were performed on a Samsung Galaxy S20.

<figure>
  <img src="/blog/assets/hermes-default-android-data.png" alt="Android Benchmarking Data" />
</figure>

### TTI Video

<figure>
  <img src="/blog/assets/hermes-default-android-video.gif" alt="Android TTI Video" />
</figure>

## iOS Benchmarking Data

All the iOS tests were performed on an iPhone 12 Pro.

<figure>
  <img src="/blog/assets/hermes-default-ios-data.png" alt="iOS Benchmarking Data" />
</figure>

### TTI Video

<figure>
  <img src="/blog/assets/hermes-default-ios-video.gif" alt="iOS TTI Video" />
</figure>

### Slowed Down TTI Video, to better show the difference in startup time.

<figure>
  <img src="/blog/assets/hermes-default-ios-slow-video.gif" alt="iOS Slowed Down TTI Video" />
</figure>

## React Native/Hermes Integration

We addressed a long-standing problem that has caused compatibility issues and is a recurrent problem when releasing new React Native versions: React Native depended on Hermes via prebuilt binaries distributed through CocoaPods and npm, which makes it possible to have API or [ABI incompatibilities](https://github.com/react-native-community/discussions-and-proposals/issues/257). To solve this problem, starting on React Native 0.69, Hermes is built alongside every version of React Native. This ensures full compatibility with each version React Native. This also creates a much tighter integration. It unlocks a more rapid iteration time to develop features or deploy bug fixes, and will give us greater confidence in making sure big changes to Hermes are done correctly. There is more in-depth information on the new integration change [here](https://github.com/facebook/react-native-website/pull/3159/files).

## iOS Intl

We finished the iOS counterpart implementation for [`Intl`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl), the ECMAScript Internationalization API that provides a broad range of language sensitive functionality. This was a long-standing [gap](https://github.com/facebook/hermes/issues/23) that prevented some developers from using Hermes. The Android implementation, done in partnership with Microsoft, was shipped in React Native 0.65. With React Native 0.70, developers will have native support on both platforms.

Typical implementations for `Intl` require importing large lookup tables or data like [Unicode CLDR](https://cldr.unicode.org/index). However, that can come with an expensive size increase of up to 6MB, so in order to avoid bloating the binary size of Hermes, we implemented `Intl` by calling into APIs exposed by iOS itself. This means we can take advantage of all the locale and internationalization data that comes with iOS already.

## Ongoing Work

As we continue evolving Hermes, we want to give the community a sense of our immediate priorities: improving developer experience and ensuring nobody avoids using Hermes due to lack of JavaScript language features. More specifically, we're:

- Enabling developers to run the sampling profiler directly from the Chrome devtools UI.
- Adding support for [`BigInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt), a long-standing request from the community that may block some developers from using Hermes as it can’t be polyfilled.
- Adding support for [`WeakRef`](https://github.com/facebook/hermes/issues/658), which will expose new memory management controls to developers.

## Wrap Up

Hermes becoming the default marks the beginning of a long-term journey. We are working on new features that will enable the community to write efficient apps for many years to come. We also encourage the community to reach out on our [GitHub Repo](https://github.com/facebook/react-native) to post any bugs, questions, feedback or ideas! We have created a `hermes` label that can be used for any Hermes-specific posts.
