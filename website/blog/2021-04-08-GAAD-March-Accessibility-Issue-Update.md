---
title: The GAAD Pledge - March Accessibility Issues Update
author: Alexandra Marlette
authorTitle: GAAD Pledge Open Source Accessibility Community Manager for React Native
authorURL: 'https://twitter.com/alexmarlette'
authorImageURL: 'https://avatars.githubusercontent.com/u/10052470?s=460&u=7f2304cb929d1de703856717af86324c66728f3a&v=4'
authorTwitter: alexmarlette
tags: [announcement]
---

It has been four weeks since we reached out to the GitHub community with a thoroughly reviewed gap analysis and list of issues to improve React Native's accessibility. With the help of the React Native community, we are already making great progress on improving accessibility. Community members have been helping contributors, reviewing tests, and bringing attention to prior accessibility issues. Since March 8th the community has closed six issues with four pull requests and seven other pull requests are in the pipeline for review.

While this work continues, the React Native and Accessibility teams at Facebook are evaluating accessibility bugs and issues that were submitted prior to this initiative, to determine if they are already covered by our current gap analysis or if there are additional issues that need to be brought into the project. One new issue has already been discovered and moved into the project, four others directly mapped to existing issues and two others are expected to be closed by addressing existing issues that address the root cause of their issue.

Thank you to all the community members who have participated. You are truly moving the needle in making React Native more accessible for everyone!

<!--truncate-->

## Closed Pull Requests 🎉

- [Added talkback support for button accessibility: disabled prop #31001](https://github.com/facebook/react-native/pull/31001) - closed by [@huzaifaaak ](https://twitter.com/huzaifaaak)

- [feat: set disabled accessibilityState when TouchableHighlight is disabled #31135](https://github.com/facebook/react-native/pull/31135) closed by [@natural_clar](https://twitter.com/natural_clar)

- [[Android] Selected State does not annonce when TextInput Component selected #31144](https://github.com/facebook/react-native/pull/31144) closed by [fabriziobertoglio1987](http://fabriziobertoglio1987)

- [Added talkback support for TouchableNativeFeedback accessibility: disabled prop #31224](https://github.com/facebook/react-native/pull/31224) closed by [@kyamashiro73](https://twitter.com/kyamashiro73)

- [Accessibility/button test #31189](https://github.com/facebook/react-native/pull/31189) closed by [@huzaifaaak ](https://twitter.com/huzaifaaak)

  - Adds a test for accessibilityState for button

## Fixes

- `Button` component (fixed by [#31001](https://github.com/facebook/react-native/pull/31001)):

  - Now announces when it is disabled

  - Disables click functionality for screen readers when the button is disabled

  - Announces the selected state of the button

- `TextInput` component (fixed by [#31144](https://github.com/facebook/react-native/pull/31144)):

  - Announces "selected" when the "selected" accessibilityState is set to true and the element is focused

- `TouchableHighlight` component (fixed by [#31135](https://github.com/facebook/react-native/pull/31135)):

  - Disables click functionality for screen readers when the component is disabled

- `TouchableNativeFeedback` component (fixed by [#31224](https://github.com/facebook/react-native/pull/31224)):

  - Disables click functionality for screen readers when the component is disabled

## Other Progress

| Status                                  | Number of Issues |
| --------------------------------------- | :--------------: |
| Issues To Do                            |        53        |
| In Progress Issues by the Community     |        8         |
| In Progress Issues by React Native Team |        5         |
| Pull Request in Progress                |        3         |
| Pull Request in Reviews                 |        4         |

## Get involved!

- New contributors should read the [contribution guide](https://github.com/facebook/react-native/blob/master/CONTRIBUTING.md) and browse the list of 37 [good first issues](https://github.com/facebook/react-native/issues?q=is%3Aopen+is%3Aissue+label%3A%22Good+first+issue%22+label%3AAccessibility) in the React Native GitHub.

- Contributors interested in issues requiring a bit more effort should visit [the project page for Improved React Native Accessibility](https://github.com/facebook/react-native/projects/15) to see the GitHub issues that need their knowledge of React Native.

- Technical writers interested in updating React Native's documentation to reflect the accessibility gaps being closed should visit the [React Native Docs](https://github.com/facebook/react-native-website#-overview).

- Share this initiative with anyone who may be able to help!

- Follow the GAAD Pledge Open Source Accessibility Community Manager for React Native on [Twitter](https://twitter.com/alexmarlette) or [Facebook](https://www.facebook.com/React-Native-Open-Source-Accessibility-Community-Manager-102732258549941) to keep up to date on progress.
