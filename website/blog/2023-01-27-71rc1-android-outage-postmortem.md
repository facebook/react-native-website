---
title: 'React Native 0.71-RC0 Android outage postmortem'
authors: [cortinico, kelset]
tags: [engineering]
date: 2023-01-27
---

Now that 0.71 is [available](/blog/2023/01/12/version-071), we want to share some key information about the incident that broke Android builds for all React Native versions while releasing the first 0.71 release candidate for React Native & Expo Android builds on November 4th, 2022.

The contributors who helped tackle the incident recently attended a post-mortem meeting to discuss in detail what happened, what we all learned from it, and what actions we are going to take to avoid similar outages in the future.

<!--truncate-->

# What happened

On November 4th 2022, we published the version `0.71.0-rc0` of React Native, the first release candidate for 0.71, on several public repositories.

A major change made in this release candidate helped to improve build times by publishing artifacts to Maven Central, instead of building them from source. More details on how this was done are available in [RFC#508](https://github.com/react-native-community/discussions-and-proposals/pull/508) and [related discussions](https://github.com/reactwg/react-native-new-architecture/discussions/105).

Unfortunately, because of the way we scaffolded new projects from the template, this caused build failures for any Android user on older versions because they would start downloading new artifacts for `0.71.0-rc0` instead of the version they were using in their project (like `0.68.0`).

# Why this happened

The React Native template provides a `build.gradle` file to build Android apps. This file contains a dependency on the React Native Android library as follows:
`implementation("com.facebook.react:react-native:+")`.

Importantly, the `+` part of this dependency (a [Gradle Dynamic version](https://docs.gradle.org/current/userguide/dynamic_versions.html)) tells Gradle to pick the highest available version of React Native. Using Gradle Dynamic versions is considered an antipattern as it exposes users to less-reproducible builds.

We were aware of the issues dynamic versions could cause, so in `0.71` we cleaned up the new app template and removed all the `+` dependencies. However, users on older versions of React Native were still using a `+` version.

This caused builds with React Native versions before `0.71.0-rc.0` to query all the repositories for the highest available versions of the React Native. Because the newly pushed 0.71.0-rc.0 on Maven Central became the highest version available, builds with React Native versions before 0.71.0-rc.0 started using artifacts from 0.71.0-rc.0. The React Native version mismatch between the local build (e.g `0.68.0`) and artifacts from Maven Central (`0.71.0-rc.0`) caused these builds to fail.

Further technical details on this event area are also available [on this GitHub issue](https://github.com/facebook/react-native/issues/35210).

# How we mitigated & resolved

As soon as we identified the issue on November 4th, the community found and shared a manual workaround to fix the issue which would pin React Native to a specific, correcting the mistake.

Then, over the weekend of November 5th and 6th, the release crew shipped patch releases for all previous React Native versions down to 0.63 which automatically applied the patch, so that users could update to a fixed version of React Native.

At the same time, we [reached out to Sonatype](https://issues.sonatype.org/browse/OSSRH-86006) to ask for the removal of the offending artifacts.

The issue was fully resolved on November 8th when the artifacts were fully removed from Maven Central.

# Timeline of events

_This section contains a brief timeline of the events. All times are GMT/UTC +0_

- Nov 4th - 5:06 PM: [0.71-RC0 is released](https://github.com/facebook/react-native/releases/tag/v0.71.0-rc.0).
- Nov 4th - 6:20 PM: [First report of build issue is opened](https://github.com/facebook/react-native/issues/35204).
- Nov 4th - 7:45 PM: [Issue is identified by community](https://github.com/facebook/react-native/issues/35204#issuecomment-1304090948).
- Nov 4th - 9:39 PM: [Workarounds are communicated, Expo ](https://github.com/facebook/react-native/issues/35204#issuecomment-1304281740)deploys fix to all their users.
- Nov 5th - 03:04 AM: [New issue is open to communicate status and workarounds](https://github.com/facebook/react-native/issues/35210).
- Nov 6th - 04:11 PM: [Ticket to SonaType](https://issues.sonatype.org/browse/OSSRH-86006?focusedCommentId=1216303&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-1216303) asking for removal of the artifacts is open.
- Nov 6th - 04:40 PM: [First tweet](https://twitter.com/reactnative/status/1589296764678705155) from @reactnative with ack + link to issue.
- Nov 6th - 07:05 PM: Decision to patch React Native versions back to 0.63.
- Nov 7th - 12:47 AM: Last patched release is released: [0.63.5](https://github.com/facebook/react-native/releases/tag/v0.63.5).
- Nov 8th - 08:04 PM: Artifacts on Maven Central are [fully removed](https://issues.sonatype.org/browse/OSSRH-86006?focusedCommentId=1216303&page=com.atlassian.jira.plugin.system.issuetabpanels%3Acomment-tabpanel#comment-1216303).
- Nov 10th - 11:51 AM: Issue about the [incident is closed](https://github.com/facebook/react-native/issues/35210#issuecomment-1310170361).

# Lessons Learned

While in many ways the conditions to trigger this incident has existed since React Native 0.12.0, we want to ensure that the foundations on which we develop and release React Native moving forward are stronger. Here are some of the lessons learned and the actionables on how we’ll adapt our processes and infrastructure to respond faster and stronger in the future.

### Incident response strategy

This incident highlighted gaps in our incident response strategy for open-source issues related to React Native.

The community quickly found a workaround in less than 2 hours. Due to our lack of visibility on the scope of the impact of this issue, as well as the complexity required to fix it for old versions, we relied on impacted people discovering the workaround on the GitHub issue.

It took us 48 hours to recognize the larger scope of this issue and that we couldn’t rely on everyone finding the GitHub issue. We needed to prioritize more complex active mitigations to automatically fix people’s projects.

We will be revisiting our processes for when to rely on developer-applied-workarounds vs fixes that we can deploy automatically. We will also take a look at our options for getting a better live pulse on the health of our ecosystem.

### Release Support Policy

As visualized in the [rn-versions tool](https://rn-versions.github.io/), to cover more than 90% of the developer base of React Native at the time of the incident, we had to release patches all the way down to version 0.63.

We believe this is caused by the React Native upgrade experience which has historically been full of frictions. We are currently looking into ways to improve the upgrade experience to make it smoother and faster to mitigate this fragmentation of the ecosystem.

Releasing a newer version of React Native should never have an impact on users on older versions, and we want to apologize for the disruption we caused to your workflow.

Similarly, we want to also stress the importance of being up to date with the latest version of your dependencies and React Native to benefit from the improvements and the safeguards we introduced. This incident happened during a time in which an official [release support policy](https://github.com/reactwg/react-native-releases#releases-support-policy) was getting defined and wasn’t broadcasted or enforced yet.

In the future, we will communicate our support policy over our communication channels and we will consider [deprecating older versions of React Native on npm](https://docs.npmjs.com/deprecating-and-undeprecating-packages-or-package-versions).

### Improved testing and best practices for 3rd party libraries

This incident highlighted the importance of having better release testing and better guidance to 3rd party libraries.

On the testing side, releasing versions down to `0.63.x` proved to be challenging due to the lack of automation and testing we now have in place for stable releases. We recognize the importance of our release and testing infrastructure and we’re going to invest further in it in the future.

Specifically, we are now encouraging and supporting 3rd party library testing as part of the [release of react native](https://github.com/reactwg/react-native-releases/discussions/41). We’re also adding some new channels and roles in the [Core Contributors Discord Server](https://github.com/facebook/react-native/blob/main/ECOSYSTEM.md#core-contributors).

On top of this, we started a closer collaboration with Callstack, the maintainers of [create-react-native-library](https://github.com/callstack/react-native-builder-bob/tree/main/packages/create-react-native-library), to improve the library template and make sure it follows all the necessary best practices to integrate with React Native projects. The newer version of `create-react-native-library` is now fully compatible with 0.71 projects while still offering backward compatibility.

# Conclusions

We want to apologize for the disruption this caused to the workflows of developers all around the world. As highlighted above, we have already started taking action to strengthen our foundation - and more work is due.

We hope that sharing these insights will help you all better understand this incident, and that you can leverage our learnings to apply better practices in your own tools and projects.

In closing, we want once again to thank Sonatype for helping us remove the artifacts, our community, and the release crew that worked tirelessly to address this as soon as possible.
