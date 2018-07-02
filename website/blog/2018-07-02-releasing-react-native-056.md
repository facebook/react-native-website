---
title: Releasing 0.56
author: Lorenzo Sciandra
authorTitle: React Native developer and core maintainer
authorURL: https://github.com/kelset
authorImageURL: https://avatars2.githubusercontent.com/u/16104054?s=460&v=4
authorTwitter: kelset
category: engineering
---

If you are reading this, it means that the long-awaited 0.56 version of React Native is, officially, released 🎉

This blog post highlights some of the [changes](https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md#highlights) that this massive new version introduces and explains what we've been busy with since May.

React Native changes go through a multi-step process to keep up with the internal Facebook team (read about it in the [How To Contribute Guide](https://facebook.github.io/react-native/docs/contributing#our-development-process)). It is also composed of [many different tools](https://github.com/facebook/react-native-website/issues/370) which require coordination and constant support to keep the framework working properly. Add the broad, vibrant community of developers in the open source world who contribute to make it better, and you will see the awesome scale of it all (It takes incredible effort to produce monthly stable versions!).

With React Native's impressive adoption, breaking changes must be made with great care. Sometimes this process isn't as quick as desired. Couple that with an inconvenient timing for many contributors, and a decision was forced to skip the April and May monthly releases. Instead, the team bundled the first 0.56 rc with the intent of simplifying the BC handling, and extra testing took place. [Dedicated community communication](https://github.com/react-native-community/react-native-releases/issues/14) channels were used along the way to ensure that 0.56.0 will be as hassle-free as possible to adopt by those who patiently waited for the stable release.

Hopefully, these few paragraphs helped explain what we've been so busy with. Thanks to all the 62 contributors who worked on the massive 803 commits that will make your apps even better 👏
(and remember, every pull request is appreciated 😊)

Without further ado...

## The Big Changes

### Babel 7

As you may know, the transpiler tool that allows us all to use the latest & greatest features of JS, Babel, is moving to [v7 soon](https://babeljs.io/blog/2017/12/27/nearing-the-7.0-release). Since this new version brings along some important changes, we felt that now it would be a good time to upgrade to it, allowing [Metro](https://github.com/facebook/metro) to leverage on its improvements (you can find the original issue discussing it [here](https://github.com/facebook/metro/issues/92)).

If you find yourself in trouble with upgrading, please refer to the [documentation section related to it](https://new.babeljs.io/docs/en/next/v7-migration.html).

### Modernizing Android support

On Android, much of the surrounding tooling has changed. We've updated to [Gradle 3.5](https://github.com/facebook/react-native/commit/699e5eebe807d1ced660d2d2f39b5679d26925da), [Android SDK 26](https://github.com/facebook/react-native/commit/065c5b6590de18281a8c592a04240751c655c03c), [Fresco to 1.9.0, and OkHttp to 3.10.0](https://github.com/facebook/react-native/commit/6b07602915157f54c39adbf0f9746ac056ad2d13) and even the [NDK to v16](https://github.com/facebook/react-native/commit/5ae97990418db613cd67b1fb9070ece976d17dc7). These changes should go without issue, and they lead to faster builds, fewer crashes, and be compliant with [Google new requirements](https://android-developers.googleblog.com/2017/12/improving-app-security-and-performance.html).
Related to this, we'd like to particularly thank [Dulmandakh](https://github.com/dulmandakh) for the many PRs to make it possible 👏

You can follow along with the future planning and discussion of updating the Android support in the [dedicated issue](https://github.com/facebook/react-native/issues/19297) (and the side one for [JSC](https://github.com/facebook/react-native/issues/19737)).

### New Node, XCode, and React – oh my!

Node 8 is now the standard for React Native. It was actually already being tested already, but we've put both feet forward with Node 6 entering maintenance mode. So, please expect that Node 8 is now required. React was also updated to 16.4, which brings a ton of fixes with it.

[iOS 9 is now the target](https://github.com/facebook/react-native/commit/f50df4f5eca4b4324ff18a49dcf8be3694482b51), and the CI build toolchain has been updated [to use XCode 9.4](https://github.com/facebook/react-native/commit/c55bcd6ea729cdf57fc14a5478b7c2e3f6b2a94d). These changes are most likely less impact than Android's, but still noteworthy nonetheless.

### And a lot of other things

For instance, YellowBox was ~~updated~~ [replaced](https://github.com/facebook/react-native/commit/d0219a0301e59e8b0ef75dbd786318d4b4619f4c) with a new implementation that makes debugging a lot better. For the complete release notes, please reference the full [changelog here](https://github.com/react-native-community/react-native-releases/blob/master/CHANGELOG.md).

And remember to keep an eye on the [upgrading guide](https://facebook.github.io/react-native/docs/upgrading.html) to avoid issues moving to this new version.

---

A final note: starting this week, the React Native core team will resume holding monthly meetings. We'll make sure to keep everyone up-to-date with what's covered, and ensure to keep your feedback at hand for future meetings.

Happy coding everyone!

[Lorenzo](https://twitter.com/Kelset),
[Ryan](https://github.com/turnrye),
and the whole [React Native core team](https://twitter.com/reactnative)

PS: as always, we'd like to remind everyone that React Native is still in 0.x versioning because of the many changes still undergoing - so remember when upgrading that yes, probably, something may still crash or be broken. Be helpful towards each other in the issues and when submitting PRs - and remember to follow the [CoC](https://code.fb.com/codeofconduct/) enforced: there's always a human on the other side of the screen.
