---
title: Preparing Your App for iOS 15 and Android 12
author: Samuel Susla
authorTitle: Software Engineer on React Native
authorURL: https://twitter.com/SamuelSusla
authorImageURL: https://avatars.githubusercontent.com/u/1733610?v=4
authorTwitter: SamuelSusla
tags: [engineering]
date: 2021-09-01
---

# Preparing Your App for iOS 15 and Android 12

Hello everyone!

With new mobile OS versions releasing late this year, we recommend preparing your React Native apps beforehand to avoid regressions when the releases become generally available.

## iOS 15

The release date of iOS 15 hasn’t been announced yet, but based on previous iOS releases, it will likely be around September 16th. Please also account for App Store review time if any changes are required to prepare your app for iOS 15.

### What to watch out for

<h4>QuickType Bar</h4>

The way to disable _QuickType_ bar in _[TextInput](/docs/textinput)_ has changed. _QuickType_ bar is the bar above keyboard with three suggested words. In case your UI needs to have the bar hidden, setting [autoCorrect](/docs/textinput#autocorrect) to `false` no longer disables _QuickType_ bar in iOS 15 like earlier versions. In order to hide the _QuickType_ bar, you need to also set [spellCheck](/docs/textinput#spellcheck-ios) to `false`. This will disable spell check, the red underlines, in your _TextInput_. Disabling QuickType bar with spell check enabled is no longer an option.

<div class="text--center text--italic margin-bottom--lg">
	<img src="/blog/assets/ios-15-quicktype-bar.png" alt="Screenshot of QuickType bar" />
	<p>QuickType bar with three suggested words</p>
</div>

To disable QuickType bar in iOS 15, set prop [spellCheck](/docs/textinput#spellcheck-ios) and [autoCorrect](/docs/textinput#autocorrect) to `false`.

```jsx
<TextInput
  placeholder="something"
  autoCorrect={false}
  spellCheck={false}
/>
```

<h4>Transparent Navigation Bar</h4>

iOS 15 changes the default behaviour of the navigation bar. Unlike in iOS 14, the navigation bar becomes transparent when the content is scrolled all the way up. Make sure to watch out for this as it can make content difficult to read. For tips on how to work around this issue, check out [this thread](https://developer.apple.com/forums/thread/682420).

![Screenshot of navigation bar on iOS 14 and iOS 15](/blog/assets/ios-15-navigation-bar.jpg)

### How to install iOS 15

<h4>Device</h4>

If you have a spare device, you can join the [beta program](https://beta.apple.com/sp/betaprogram/) and install iOS 15. At this point, beta releases are generally stable, but keep in mind that **the upgrade to iOS 15 is irreversible**.

<h4>Simulator</h4>

To test your app on a simulator with iOS 15, you will need to download Xcode 13. You can find Xcode 13 [here](https://developer.apple.com/xcode/).

## Android 12

Android 12 will be released this autumn and it introduces some changes which can potentially affect your app experience. Traditionally, Google Play requires target SDK of your app to be upgraded before November of the following year. (see requirements for previous release [here](https://developer.android.com/distribute/best-practices/develop/target-sdk)).

### What to watch out for

<h4>Overscroll Effect</h4>

Android 12 introduces new [overscroll effect](https://developer.android.com/about/versions/12/overscroll) which affects all scroll containers. As React Native scroll views are based on the native views, we recommend to check your scrollable containers to ensure the effect is applied correctly. You can opt-out from it by setting [`overScrollMode`](/docs/scrollview#overscrollmode-android) prop to `never`.

<h4>Permission Updates</h4>

Android 12 allows users of your app to only provide access to the approximate location if you request it with **`ACCESS_FINE_LOCATION`** permission**.** Learn more about it [here](https://developer.android.com/about/versions/12/approximate-location).

Check out Google’s [detailed behavior changes](https://developer.android.com/about/versions/12/behavior-changes-all) for all apps running on Android 12.

### How to install Android 12

<h4>Device</h4>

If you have a spare Android device, check if you’re able to install Android 12 Beta via [instructions here.](https://developer.android.com/about/versions/12/get)

<h4>Emulator</h4>

If you don’t have a device available, you can set up an emulator following [instructions here](https://developer.android.com/about/versions/12/get#on_emulator).
