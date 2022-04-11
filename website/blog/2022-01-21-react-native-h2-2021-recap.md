---
title: React Native - H2 2021 Recap
authors: [cortinico]
tags: [announcement]
---

# React Native - H2 2021 Recap

While we're all still excited for the [release of React Native 0.67](/blog/2022/01/19/version-067), we want to take a moment to **celebrate** what the community achieved in the last half and share what we have on the **horizon** for the future of React Native.

<!--truncate-->

Specifically, H2 2021 was an [exciting half for both us and the community](/blog/2021/08/19/h2-2021#pushing-the-technology-forward) where we had the opportunity to invest more in our open-source ecosystem. We revamped some of our processes and created new ones from scratch that will help you, us, and the community to enjoy a **better** React Native experience.

## Repository Health

In H2 2021, we invested in tackling some of the _OSS debt_ that our repository built up over the years. Specifically, most of our focus was around **pull requests**. We built an internal process to make sure all the new pull requests are addressed in a timely manner.

Although this is not a complete list, we would like to highlight some **impactful** PRs we received from our contributors:

- **Accessibility**
  - [#31630](https://github.com/facebook/react-native/pull/31630) `Added Support for Entrance/exit from collection by Flatlist` by [@anaskhraza](https://github.com/anaskhraza)
- **Crash**
  - [#29452](https://github.com/facebook/react-native/pull/29452) `Fix - TextInput Drawable to avoid Null Pointer Exception RuntimeError` by [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
- **Display**
  - [#31777](https://github.com/facebook/react-native/pull/31777) `fix: TouchableNativeFeedback ripple starts on previous touch location` by [@intergalacticspacehighway](https://github.com/intergalacticspacehighway)
  - [#31789](https://github.com/facebook/react-native/pull/31789) `Fix support for blobs larger than 64 KB on Android` by [@tomekzaw](https://github.com/tomekzaw)
  - [#31007](https://github.com/facebook/react-native/pull/31007) `Fix selectionColor doesn't style Android TextInput selection handles` by [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
  - [#32398](https://github.com/facebook/react-native/pull/32398) `Fix Android border positioning regression` by [@oblador](https://github.com/oblador)
  - [#29099](https://github.com/facebook/react-native/pull/29099) `[Android] Allows to set individual (left,top,right,bottom) dotted/dashed` by [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
  - [#29117](https://github.com/facebook/react-native/pull/29117) `[Android] Fix font weight numeric values` by [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
- **Interaction**
  - [#28995](https://github.com/facebook/react-native/pull/28995) `[Android] Fix TextInput Cursor jumping to the right when placeholder null` by [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
  - [#28952](https://github.com/facebook/react-native/pull/28952) `[Android] Fix non selectable Text in FlatList` by [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
  - [#29046](https://github.com/facebook/react-native/pull/29046) `[Android] onKeyPress event not fired with numeric keys` by [@fabriziobertoglio1987](https://github.com/fabriziobertoglio1987)
  - [#31500](https://github.com/facebook/react-native/pull/31500) `fix#29319 - ios dismiss modal` by [@intergalacticspacehighway](https://github.com/intergalacticspacehighway)
  - [#32179](https://github.com/facebook/react-native/pull/32179) `Fix: multiline textinput start "jerking" when trying to move cursor.` by [@xiankuncheng](https://github.com/xiankuncheng)
  - [#29039](https://github.com/facebook/react-native/pull/29039) `Fix to make taps on views outside parent bounds work on Android` by [@hsource](https://github.com/hsource)
- **Performance**
  - [#31764](https://github.com/facebook/react-native/pull/31764) `Optimize font handling on iOS` by [@Adlai-Holler](https://github.com/Adlai-Holler)
  - [#32536](https://github.com/facebook/react-native/pull/32536) `Don't reconstruct app component on split-screen` by [@Somena1](https://github.com/Somena1)
- **Testing**
  - [#31401](https://github.com/facebook/react-native/pull/31401) `Add unit tests for VirtualizedList render quirks` by [@NickGerleman](https://github.com/NickGerleman)

Some of those PRs addressed issues that were impacting both Meta and the overall OSS community, given the number of reactions on the corresponding issue they closed.

There are so many more PRs we would like to call out, and we want to **thank** again all the people that are spending their time to help us address bugs and improve React Native.

## Community Engagement

At the beginning of the half we set a goal to **communicate** with our community more and set process for the behavior to continue. Here were some of our engagements in H2 2021:

<!--alex ignore gross-->

- We had the opportunity to participate in [React Native EU](https://www.react-native.eu/) with a talk from [Joshua Gross](https://twitter.com/joshuaisgross) - [Bringing the Fabric renderer to the “Facebook” app](https://www.youtube.com/watch?v=xKOkILSLs0Q&t=3987s)
- We hosted an [“Ask Us Anything“ (AUA) on Reddit](https://www.reddit.com/r/reactnative/comments/pzdo1r/react_native_team_aua_thursday_oct_14_9am_pt/) and received over 100 questions! AUAs are a great opportunity for both us, to get a sense of the community engagement, and you all, to ask any kind of questions. If you haven’t yet, make sure you check the answers as some of them are extremely insightful
- We shared our [Many Platform Vision](https://reactnative.dev/blog/2021/08/26/many-platform-vision), a guide for gotchas for [Android 12 and iOS 15](https://reactnative.dev/blog/2021/09/01/preparing-your-app-for-iOS-15-and-android-12), and the progress and [vision for Hermes to become the default JS engine](https://reactnative.dev/blog/2021/10/26/toward-hermes-being-the-default) for React Native!
- Our own [Kevin Gozali](https://twitter.com/fkgozali) appeared on [an episode of React Native Radio podcast](https://reactnativeradio.com/episodes/rnr-222-the-new-architecture-with-kevin-gozali-from-the-rn-core-team) to talk about the new architecture.
- At [ReactConf 2021](https://conf.reactjs.org/), ReactConf [Rick Hanlon](https://twitter.com/rickhanlonii) shared the unified many-platform vision for React and React Native. Moreover, [Eric Rozell](https://twitter.com/EricRozell) and [Steven Moyes](https://twitter.com/moyessa) got to share the amazing progress React Native Desktop has made in supporting both Meta and Microsoft apps and showcasing the Many Platform Vision in practice.

Beyond sharing more updates in H2 2021, we also **leaned** on our community more than ever. We relied on critical feedback from contributors as they dogfooded early drafts of the New Architecture material. As well, we were heavily supported by the expertise of our community in debugging critical release issues and improvements.

There is a wealth of knowledge that our community brings into React Native, and we need to continue to nurture it.

## The New Architecture Rollout and Releases

2022 is going to be the year of the **New Architecture in open source**.

We’ve been working hard to deliver the infrastructure needed to rollout the New Architecture to apps and libraries. We involved some of our partners and core contributors/library maintainers to refine our support for the new architecture to get early stage feedback.

We are now preparing to release a new guide on our website: [Getting Started with the New Architecture](https://github.com/facebook/react-native-website/pull/2879). That will be the entry point to a collection of material that we’re going to release in 2022 and will help you migrate/start your project with the new architecture.

Moreover, we would like to stress the [importance of **giving feedback**](https://github.com/facebook/react-native-website/pull/2879) on the New Architecture material. We’re still in the process of finalizing the last details and your input will help everyone adopt the new architecture more seamlessly.

**Releases** play a critical role in the New Architecture rollout. Our goal last half was to ensure any release blocking issues did not stagnate. We approached the problem by [clarifying and improving process and responsibilities](https://github.com/facebook/react-native/wiki/Releases) for better accountability. Our release coordination now occurs in a [dedicated discussions repository](https://github.com/reactwg/react-native-releases/discussions) with [clearer release issue reporting](https://github.com/facebook/react-native/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2CType%3A+Upgrade+Issue&template=upgrade-regression-form.yml).

In H1 2022, we will continue to iterate on release responsibilities to support new architecture rollout. If you’d like to help out testing release candidates or [working on improvements](https://github.com/facebook/react-native/projects/18), feel free to [join the discussion](https://github.com/reactwg/react-native-releases/discussions/categories/improvements)!

## To Mobile and beyond

As you can see from [the ReactConf talk lineup](https://conf.reactjs.org/), React Native is not only Android & iOS.

Earlier in 2021, we shared our [Many Platform Vision](https://reactnative.dev/blog/2021/08/26/many-platform-vision), and we had a successful time rolling out React Native on both Desktop and VR.

We’re looking forward to **converging patterns** that are platform-specific into the React Native experience.

Finally, we want to thank again the community for the enormous support in H2 2021. It’s always amazing to see how contributors come together and support each other on GitHub, fixing bugs, sharing their and helping us deliver React Native to millions of users.

Stay tuned and looking forward to an **even more amazing 2022** 🎉!
