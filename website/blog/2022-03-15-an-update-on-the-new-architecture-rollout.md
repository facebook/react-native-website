---
title: An update on the New Architecture Rollout
authors: [cortinico]
tags: [announcement]
date: 2022-03-15
---

# An update on the New Architecture Rollout

Hi everyone,
[As previously announced](/blog/2022/01/21/react-native-h2-2021-recap#the-new-architecture-rollout-and-releases):

> 2022 is going to be the year of the New Architecture in open source

If you still haven’t had the time to look into the New React Native Architecture (the Fabric Renderer and the TurboModule system), there is no better time to do it **than now**!

We would like to share with the community some initiatives and material we prepared to make sure everyone is onboard on this endeavor.

<!--truncate-->

### The Working Group

Recently, we launched the [React Native New Architecture Working Group](https://github.com/reactwg/react-native-new-architecture) on GitHub, a _discussion only_ repository to coordinate and support the rollout of the New Architecture across the ecosystem.

We envision this working group as a space where the community can **meet**, share **ideas**, and **discuss** challenges during the adoption of the New Architecture. Moreover, we're going to use this working group to **share** information and updates with the wider community for the sake of transparency.

To keep the discussion focused, we decided to have this working group **open to read** publicly and **restricted to write** only for approved users.

If you wish to join the conversation, you can [fill in this form](https://forms.gle/8emgdwFZXuzEpyyn9) to either **apply or nominate** someone that you think would be a valuable addition to the discussion.

**Everyone is welcome** to apply to join the conversation.

As every discussion forum, we would like to stress once more the importance of being **respectful** and welcoming towards others’ opinions. Please take the chance to read our [**code of conduct**](https://github.com/reactwg/react-native-new-architecture/blob/main/CODE_OF_CONDUCT.md) if you haven’t yet done it.

### The Migration Guide

After several rounds of review & feedback, we finally merged **the Migration Guide** (f.k.a. _the Playbook_). You can find it [on the website in the Guides section.](/docs/next/new-architecture-intro)

This Migration Guide will show you **how to create a custom Fabric component or a TurboModule** with a step-by-step approach. The guide will also show you how to **adapt your existing app or library** to use the New Architecture.

Moreover, we would like to remind you the brand-new [Architecture section](/architecture/overview) of our website. There you can find several in-depth articles and explanation of the React Native internals. Specifically, [the Fabric section](/architecture/fabric-renderer) can help you understand the rendering pipeline in the New Architecture world.

Finally, please consider **sharing your feedback** to this documentation material [on the working group](https://github.com/reactwg/react-native-new-architecture/discussions/7). We’re constantly looking for developer’s opinion, and we want to make sure we’re delivering the content that you find most useful.

Over the next months, we will look into refining and adding more documentation to help you further.

### The New Architecture Template

React Native **0.68.0** is close to release. This version of React Native marks a crucial milestone in the New Architecture Rollout as it’s the first version to include an **opt-in switch** in the **new app template.**

This means that you will be able to try the New Architecture **by changing one line** in the template. We also added extensive **comments and documentation** to the template to make sure you don’t need extra reading to use it out of the box. We hope this will help you adopt the New Architecture by **reducing the amount of code** your have to write.

<!-- alex ignore simple -->

In the next releases, we will keep on updating the template to make it even more streamlined and simple to use.

To enable the New Architecture on either platform, you can:

- On iOS, run `RCT_NEW_ARCH_ENABLED=1 bundle exec pod install` inside the `ios` folder.
- On Android, set the `newArchEnabled` property to `true` by **either**:
  - Changing the corresponding line inside the `android/gradle.properties` file.
  - Set an environment variable `ORG_GRADLE_PROJECT_newArchEnabled=true`
  - Invoke Gradle with `-PnewArchEnabled=true`

Then you can **run your app** with `yarn react-native run-android` or `run-ios` and you’ll be running using Fabric and TurboModules enabled.

Please consider trying this new template, and [report any bug or unexpected behavior](https://github.com/reactwg/react-native-new-architecture/discussions/5) that you might face. Over the last months we worked hard to fix bugs and build failures that would have been **hard to catch** without the constant community feedback and testing.

### The 3rd-party Libraries Ecosystem

The community won't be able to migrate to the New Architecture without the full support of **3rd-party libraries author & maintainers**.

We understand how this can be a tedious process, and we understand the importance of supporting users on **both** old and New Architecture. Over the next months, we will focus on supporting our library developers to help them migrate over.

If you’re a **library developer**, [we invite you to post an update](https://github.com/reactwg/react-native-new-architecture/discussions/categories/libraries) in the New Architecture working group with the **status of your libraries**. This will help you attract early adopters and us to understand if any library is facing a blocker.

If instead you’re a **library user**, you can [post a message here](https://github.com/reactwg/react-native-new-architecture/discussions/6) to request a migration of a library. If we identify a library that becomes a blocker for a number of users, we will try to reach out to the maintainer and understand why they haven’t migrated yet.

Finally, we would like to give a shout out to Software Mansion for releasing a new version of [`react-native-screens`](https://github.com/software-mansion/react-native-screens), which has support for both architectures. Moreover, they published a blog-post ([Introducing Fabric to react-native-screens](https://blog.swmansion.com/introducing-fabric-to-react-native-screens-fd17bf18858e)) where they **tell their migration story**. We hope you will find this story inspiring and useful to tackle your migration.

### Releases

Work on the 0.68 pre-release has realized much of [the improved release process we had defined last half](/blog/2022/01/19/version-067#improvements-to-release-process).

We’re happy to share that with 0.68 we were able to:

- Successfully onboard release work to an internal rotation. Much of this is supported by [improved documentation](/contributing/how-to-contribute) on the release process which will reduce the bus factor of the release process.
- Initiated discussions with partners to support a [Copilot rotation](/contributing/release-roles-responsibilities#release-role-2--release-copilot). We hope this effort will improve transparency of the process and inform our partners where to invest to support React Native releases and eco-system.
- [Onboarded several Release Supporters and Testers from the community](https://github.com/reactwg/react-native-releases/discussions/11). We had put a call-out for help last half and so many folks stepped up! The feedback from our testers and supporters have **helped us fix crucial bugs** and regressions, especially around the new architecture, for the upcoming release. Thank you to everyone who signed up and tested out the release!

With React Native 0.69 we will continue refining this process, ideally getting partners to provide earlier release signal and onboarding co-pilots. As always, [any feedback is more than welcome](https://github.com/reactwg/react-native-releases/discussions). If you’d like to join as a release tester or supporter, [please sign up here](https://forms.gle/fPuPE1MZRDGWNqpd6).

### Towards Hermes as Default engine

One of the crucial point of the New Architecture Rollout is the adoption of the new JavaScript engine: **Hermes.**

With the New React Native Architecture, we’re going to **set Hermes as default engine**. This means that all the new documentation and templates will have Hermes enabled.

Please note that we'll continue working with the community to make sure **other engines**, such as JSC (JavaScript Core), **are supported**. You can still use the engine you wish, but you’ll have to **explicitly disable Hermes**.

To improve the stability of Hermes, we’re working towards changing the **distribution model** of Hermes. Specifically, we envision the Hermes release process **to be closer** to the React Native release process.

This will allow us to ship a version of React Native, with a bundled JS engine that is **fully compatible**. You won’t have to deal with run-time crashes and Hermes incompatibilities that are really hard to debug and understand.

Moreover, this will **shorten the cycle** for picking up **improvements** and bug fixes in Hermes, which will allow us to be more **responsive** to the needs of React Native users.

We will be sharing more on this matter in the coming months. In the meanwhile, feel free to [join the discussion](https://github.com/reactwg/react-native-new-architecture/discussions/4) about it on the Working Group.

If you haven’t tried Hermes yet, now is the time to give it a go. And please make sure to flag any issues or blockers you might face.

With this, that’s a wrap.

I’d like to thank Andrei, Aleksandar, Dmitry, Eli, Luna, Héctor & Neil for reviewing this blog-post and providing valuable contributions to those efforts.

And looking forward to **reading your migration stories**.
