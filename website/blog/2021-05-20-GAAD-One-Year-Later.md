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

-   11 issues have been closed by the community

-   19 issues were evaluated and closed by the React Native team

-   9 Pull request were merged

-   1 Pull request has been committed to the React Native docs.

We want to recognize and thank the React Native community for the significant progress towards a more accessible React Native over the past year. Contributors have advanced this work by writing pull requests and commenting on issues, along with highlighting missing information on issues and contributing input on difficult problems. Every contributor's effort has counted in making progress on improving React Native Accessibility.

<!--truncate-->

Community Involvement
---------------------

To recognize the work of all contributors who have helped the Improved React Native Accessibility project. Any contributors who have submitted and merged PRs or those who have helped in comments or reviews are highlighted below.

### Closed Pull Request

-   [Added talkback support for button accessibility: disabled prop #31001](https://github.com/facebook/react-native/pull/31001) - closed by [@huzaifaaak](https://twitter.com/huzaifaaak)

-   [feat: set disabled accessibilityState when TouchableHighlight is disabled #31135](https://github.com/facebook/react-native/pull/31135) closed by[@natural_clar](https://twitter.com/natural_clar)

-   [[Android] Selected State does not annonce when TextInput Component selected #31144](https://github.com/facebook/react-native/pull/31144) closed by[fabriziobertoglio1987](http://fabriziobertoglio1987)

-   [Added talkback support for TouchableNativeFeedback accessibility: disabled prop #31224](https://github.com/facebook/react-native/pull/31224) closed by[@kyamashiro73](https://twitter.com/kyamashiro73)

-   [Accessibility/button test #31189](https://github.com/facebook/react-native/pull/31189) closed by[ @huzaifaaak](https://twitter.com/huzaifaaak)

-   [Added talkback support for TouchableNativeFeedback accessibility: disabled prop #31224](https://github.com/facebook/react-native/pull/31224) closed by [grgr-dkrk](https://twitter.com/dkrk0901)

-   [feat: add getRecommendedTimeoutMillis section on accessibilityInfo #2581](https://reactnative.dev/docs/next/accessibilityinfo#getrecommendedtimeoutmillis-android) closed by [grgr-dkrk](https://twitter.com/dkrk0901)

-   [Disable accessibilityState when TouchableWithoutFeedback is disabled #31297](https://github.com/facebook/react-native/pull/31297) by [@crloscuesta](https://twitter.com/crloscuesta)

-   [[Accessibility] Fix Image does not announce "disabled" #31252](https://github.com/facebook/react-native/pull/31252) closed by [fabriziobertoglio1987](http://fabriziobertoglio1987)

Community members who gave their time in other ways:

Simek, saurabhkacholiya, meehawk, intergalacticspacehighway, chrisglein, jychiao, Waltari10

Fixes
-----

Two types of issues have been fixed in multiple components and one new functionality has been added to the API by the [# of closed/merged PRs].

-   An issue with Disabled state has been addressed in seven components

-   An issue with Selected state was addressed in two components

-   A new addition to the React Native API added the ability to query AccessibilityManager.getRecommendedTimeoutMillis().

### Disabled State Announcement and Disable function

One of the most prevalent issues found during the gap analysis was that some components do not announce or disable functionality. Now seven components announce their disabled state or disable click functionality.

Announces when Disabled

-   Button

-   Images

-   ImageBackground

Disables click functionality when the component has a disabled prop

-   Button

-   Text

-   Pressable

-   TouchableHighlight

-   TouchableOpacity

-   TouchableNativeFeedback

-   TouchableWithoutFeedback

### Selected State Announcement

Another multi-component issue, Selected State would not announce when focused on. Now upon focus if the AccessibilityState is set to selected or if the component is changed to selected, it will announce selected.

Announces when Disabled

-   Button

-   TextInput

### Accessibility Timeout Setting

This issue added the ability to query AccessibilityManager.getRecommendedTimeoutMillis(). This queries the "Time to take action" before the UI elements auto-dismisses or auto-progresses. Prior to this there was no way to query this with the AccessibilityInfo API on Android.

Documentation Additions
-----------------------

With every new addition to React Native the documentation must be updated to reflect those additions or changes. New additions to the React Native website as part of this initiative are listed below.

-   [AccessibilityInfo: getRecommendedTimeoutMillis()](https://reactnative.dev/docs/next/accessibilityinfo#getrecommendedtimeoutmillis-android)

Get Involved!
-------------

We're not done yet!  We've come far, but work still remains to reach the finish line, and React Native needs the continuing support of its community. Facebook's React Native team has committed to supporting contributors working on gap analysis issues and they will continue to respond to comments on Accessibility issues and triage new RN Accessibility pull requests. In addition, the React Native team is tackling some of the toughest gap analysis issues. Such as the correct translation of accessibilityRoles to other languages and specifying error text for specific components.

Join us in tackling the rest. There are still open accessibility issues on the [Improved React Native Accessibility Initiative Project board](https://github.com/facebook/react-native/projects/15). Issues with [Checked/Unchecked State](https://github.com/facebook/react-native/issues/30843), [Entrance/exit from Collection](https://github.com/facebook/react-native/issues/30861), and [Position in Collection](https://github.com/facebook/react-native/issues/30977) are great opportunities for current and new contributors to contribute to a more accessible React Native.

