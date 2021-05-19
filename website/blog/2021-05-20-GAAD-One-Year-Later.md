---
title: The GAAD Pledge - One Year Later
author: Alexandra Marlette
authorTitle: GAAD Pledge Open Source Accessibility Community Manager for React Native
authorURL: 'https://twitter.com/alexmarlette'
authorImageURL: 'https://avatars.githubusercontent.com/u/10052470?s=460&u=7f2304cb929d1de703856717af86324c66728f3a&v=4'
authorTwitter: alexmarlette
tags: [announcement]
---
It has been one year since Facebook took the [GAAD Pledge](https://diamond.la/GAADPledge/) to make React Native accessible and the project has exceeded our expectations. We are excited to announce that this project will continue throughout 2021 and want  to update everyone on our progress so far.  Following a thorough analysis of the accessibility gaps in React Native last year, work began on filling these gaps.

When we started there were 90 issues identified, since March when the gap analysis issues launched on Github:

-   11 issues have been closed by the community.

-   19 issues were evaluated and closed by the React Native team.

-   9 pull requests were merged.

-   1 pull request was merged into the React Native docs.

We want to recognize and thank the React Native community for the significant progress towards a more accessible React Native over the past year.Every contributor's effort has counted in making progress on improving React Native Accessibility.

Fixes
-----
Two types of issues have been fixed in multiple components and one new functionality has been added to the API by the [# of closed/merged PRs].

- An issue with Disabled state has been addressed in seven components

- An issue with Selected state was addressed in two components

- A new addition to the React Native API added the ability to query AccessibilityManager.getRecommendedTimeoutMillis().

### Disabled State Announcement and Disable function

One of the most prevalent issues found during the gap analysis was that some components do not announce or disable functionality. Now seven components announce their disabled state or disable click functionality.

Announces when Disabled

- Button

- Images

- ImageBackground

Disables click functionality when the component has a disabled prop

- Button

- Text

- Pressable

- TouchableHighlight

- TouchableOpacity

- TouchableNativeFeedback

- TouchableWithoutFeedback

### Selected State Announcement

There were some components that did not announce their selection when in focus. This behavior has now been fixed when the component is in focus and the AccessibilityState is set to selected or the component is changed to selected.

Announces when Selected

- Button

- TextInput

### Accessibility Timeout Setting

There was previously no way to query the accessibility timeout setting on Android. The fix added the ability to query AccessibilityManager.getRecommendedTimeoutMillis(). This queries the "Time to take action" before the UI elements auto-dismisses or auto-progresses. 

## Documentation Additions
The React Native documentation must be updated to reflect each addition or change to the available APIs. The new addition to the React Native documentation covered the addition of [getRecommendedTimeoutMillis()](https://reactnative.dev/docs/next/accessibilityinfo#getrecommendedtimeoutmillis-android) to AccessibilityInfo.

## Community Involvement
We want to thank all the contributors mentioned below who have submitted and merged pull requests as well as those who have reviewed and commented on issues. 

### Merged Pull Request
- [Added talkback support for button accessibility: disabled prop #31001](https://github.com/facebook/react-native/pull/31001) - closed by[ @huzaifaaak](https://twitter.com/huzaifaaak)

- [feat: set disabled accessibilityState when TouchableHighlight is disabled #31135](https://github.com/facebook/react-native/pull/31135) closed by[ @natural_clar](https://twitter.com/natural_clar)

- [[Android] Selected State does not annonce when TextInput Component selected #31144](https://github.com/facebook/react-native/pull/31144) closed by[ fabriziobertoglio1987](http://fabriziobertoglio1987)

- [Added talkback support for TouchableNativeFeedback accessibility: disabled prop #31224](https://github.com/facebook/react-native/pull/31224) closed by[ @kyamashiro73](https://twitter.com/kyamashiro73)

- [Accessibility/button test #31189](https://github.com/facebook/react-native/pull/31189) closed by[ @huzaifaaak](https://twitter.com/huzaifaaak)

- [Added talkback support for TouchableNativeFeedback accessibility: disabled prop #31224](https://github.com/facebook/react-native/pull/31224) closed by[  grgr-dkrk](https://twitter.com/dkrk0901)

- [feat: add getRecommendedTimeoutMillis section on accessibilityInfo #2581](https://github.com/facebook/react-native-website/pull/2581) closed by[  grgr-dkrk](https://twitter.com/dkrk0901)

- [Disable accessibilityState when TouchableWithoutFeedback is disabled #31297](https://github.com/facebook/react-native/pull/31297) by[  @crloscuesta](https://twitter.com/crloscuesta)

- [[Accessibility] Fix Image does not announce "disabled" #31252](https://github.com/facebook/react-native/pull/31252) closed by[ fabriziobertoglio1987](http://fabriziobertoglio1987)

- [Disable TouchableOpacity when accessibility disabled is set #31108](https://github.com/facebook/react-native/pull/31108) closed by [chakrihacker](https://github.com/chakrihacker)

Community members who gave their time in other ways:

Simek, saurabhkacholiya, meehawk, intergalacticspacehighway, chrisglein, jychiao, Waltari10

## Get Involved!
We've come a long way but we're not done yet. We need your support to reach the finish line.  Facebook's React Native team has committed to supporting contributors working on gap analysis issues. They will continue to respond to comments on Accessibility issues and triage pull requests. The React Native team is also tackling some of the toughest gap analysis issues. This work includes the correct translation of accessibilityRoles to other languages and specifying error text for specific components.

Join us in tackling the rest. There are still open accessibility issues on the [Improved React Native Accessibility project board](https://github.com/facebook/react-native/projects/15). Issues with [Checked/Unchecked State](https://github.com/facebook/react-native/issues/30843), [Entrance/exit from Collection](https://github.com/facebook/react-native/issues/30861), and [Position in Collection](https://github.com/facebook/react-native/issues/30977) are great opportunities for current and new contributors to contribute to a more accessible React Native.
