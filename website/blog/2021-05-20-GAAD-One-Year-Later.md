---
title: The GAAD Pledge - One Year Later
author: Alexandra Marlette
authorTitle: GAAD Pledge Open Source Accessibility Community Manager for React Native
authorURL: 'https://twitter.com/alexmarlette'
authorImageURL: 'https://avatars.githubusercontent.com/u/10052470?s=460&u=7f2304cb929d1de703856717af86324c66728f3a&v=4'
authorTwitter: alexmarlette
tags: [announcement]
---

It has been one year since Facebook took the [GAAD Pledge](https://diamond.la/GAADPledge/) to make React Native accessible and the project has exceeded our expectations. We are excited to announce that this project will continue throughout 2021 and want to update everyone on our progress so far. Following a thorough analysis of the accessibility gaps in React Native last year, work began on filling these gaps.

We started with 90 outstanding gap analysis issues and from March 2021, when the project launched on Github, until now:

- 11 issues have been closed by the community.

- 19 issues were evaluated and closed by the React Native team.

- 9 pull requests were merged.

- 1 pull request was merged into the React Native docs.

We want to recognize and thank the React Native community for the significant progress towards a more accessible React Native over the past year. Every contributor's effort has counted in making progress on improving React Native Accessibility.

<!--truncate-->

## Fixes

Two types of issues have been fixed in multiple components and one new functionality has been added to the API by the 9 pull requests.

- An issue with Disabled state has been addressed in seven components

- An issue with Selected state was addressed in two components

- A new addition to the React Native API added the ability to query AccessibilityManager.getRecommendedTimeoutMillis().

### Disabled State Announcement and Disable function

One of the most prevalent issues found during the gap analysis was that some components do not announce or disable functionality. Now seven components announce their disabled state or disable click functionality.

Announces when Disabled

- `Button` - [#31001](https://github.com/facebook/react-native/pull/31001)

- `Images` - [#31252](https://github.com/facebook/react-native/pull/31252)

- `ImageBackground` - [#31252](https://github.com/facebook/react-native/pull/31252)

Disables click functionality when the component has a disabled prop

- `Button` - [#31001](https://github.com/facebook/react-native/pull/31001)

- `Text` - [React Native Team commit](https://github.com/facebook/react-native/commit/33ff4445dcf858cd5e6ba899163fd2a76774b641)

- `Pressable` - [React Native Team commit](https://github.com/facebook/react-native/commit/1c7d9c8046099eab8db4a460bedc0b2c07ed06df)

- `TouchableHighlight` - [#31135](https://github.com/facebook/react-native/pull/31135)

- `TouchableOpacity` - [#31108](https://github.com/facebook/react-native/pull/31108)

- `TouchableNativeFeedback` - [#31224](https://github.com/facebook/react-native/pull/31224)

- `TouchableWithoutFeedback` - [#31297](https://github.com/facebook/react-native/pull/31297)

### Selected State Announcement

There were some components that did not announce their selection when in focus. This behavior has now been fixed when the component is in focus and the AccessibilityState is set to selected or the component is changed to selected.

Announces when Selected

- `Button` - [#31001](https://github.com/facebook/react-native/pull/31001)

- `TextInput` - [#31144](https://github.com/facebook/react-native/pull/31144)

### Accessibility Timeout Setting

There was previously no way to query the accessibility timeout setting on Android. The fix added the ability to query `AccessibilityManager.getRecommendedTimeoutMillis()`. This queries the "Time to take action" before the UI elements auto-dismisses or auto-progresses.

## Documentation Additions

The React Native documentation must be updated to reflect each addition or change to the available APIs. The [new addition to the React Native documentation](https://reactnative.dev/docs/next/accessibilityinfo#getrecommendedtimeoutmillis-android) covered the addition of `getRecommendedTimeoutMillis()` to AccessibilityInfo.

## Community Involvement

We want to thank all the contributors mentioned below who have submitted and merged pull requests as well as those who have reviewed and commented on issues.

### Merged Pull Requests

- [@huzaifaaak](https://twitter.com/huzaifaaak) closed 3 issues with:
  - [Added talkback support for button accessibility: disabled prop #31001](https://github.com/facebook/react-native/pull/31001)
  - [Accessibility/button test #31189](https://github.com/facebook/react-native/pull/31189)
- [@natural_clar](https://twitter.com/natural_clar) closed 1 issue with:
  - [feat: set disabled accessibilityState when `TouchableHighlight` is disabled #31135](https://github.com/facebook/react-native/pull/31135)
- [fabriziobertoglio1987](https://github.com/fabriziobertoglio1987) closed 2 issues with:
  - [[Android] Selected State does not annonce when `TextInput` Component selected #31144](https://github.com/facebook/react-native/pull/31144)
  - [Accessibility Fix Image does not announce "disabled" #31252](https://github.com/facebook/react-native/pull/31252)
- [@kyamashiro73](https://twitter.com/kyamashiro73) closed 1 issue with:
  - [Added talkback support for `TouchableNativeFeedback` accessibility: disabled prop #31224](https://github.com/facebook/react-native/pull/31224)
- [@grgr-dkrk](https://twitter.com/dkrk0901) closed 1 issue and added to the React Native documentation with:
  - [add `getRecommendedTimeoutMillis` to AccessibilityInfo #31063](https://github.com/facebook/react-native/pull/31063)
  - [feat: add `getRecommendedTimeoutMillis` section on accessibilityInfo #2581](https://github.com/facebook/react-native-website/pull/2581)
- [@crloscuesta](https://twitter.com/crloscuesta) closed 1 issue with:
  - [Disable accessibilityState when `TouchableWithoutFeedback` is disabled #31297](https://github.com/facebook/react-native/pull/31297)
- [@chakrihacker](https://twitter.com/chakrihacker) closed 1 issue with:
  - [Disable `TouchableOpacity` when accessibility disabled is set #31108](https://github.com/facebook/react-native/pull/31108)

Thank you to the community members who gave their time in other ways!

[Simek](https://github.com/Simek), [saurabhkacholiya](https://github.com/saurabhkacholiya), [meehawk](https://github.com/meehawk), [intergalacticspacehighway](https://github.com/intergalacticspacehighway), [chrisglein](https://github.com/chrisglein), [jychiao](https://github.com/jychiao) and [Waltari10](https://github.com/Waltari10)

## Get Involved!

We've come a long way but we're not done yet. We need your support to reach the finish line. Facebook's React Native team has committed to supporting contributors working on gap analysis issues. They will continue to respond to comments on Accessibility issues and triage pull requests. The React Native team is also tackling some of the toughest gap analysis issues. This work includes the correct translation of accessibilityRoles to other languages and specifying error text for specific components.

Join us in tackling the rest. There are still open accessibility issues on the [Improved React Native Accessibility project board](https://github.com/facebook/react-native/projects/15). Issues with [Checked/Unchecked State](https://github.com/facebook/react-native/issues/30843), [Entrance/exit from Collection](https://github.com/facebook/react-native/issues/30861), and [Position in Collection](https://github.com/facebook/react-native/issues/30977) are great opportunities for current and new contributors to contribute to a more accessible React Native.

### Learn More

Read about how the gap analysis was conducted on the [Facebook Tech blog](https://tech.fb.com/react-native-accessibility/) or about the launch of the Github issues on the [React Native Blog](https://reactnative.dev/blog/2021/03/08/GAAD-React-Native-Accessibility).
