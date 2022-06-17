---
title: Helping migrate React Native libraries to the New Architecture
authors: [cipolleschi]
tags: [announcement]
date: 2022-06-16
---

**tl; dr**: We are working on improving the resources supporting the React Native New Architecture. We have already released a repository to help migrate your app ([RNNewArchitectureApp](https://github.com/react-native-community/RNNewArchitectureApp)) and one for your libraries ([RNNewArchitectureLibraries](https://github.com/react-native-community/RNNewArchitectureLibraries)). We are also revamping the [New Architecture guide](https://github.com/facebook/react-native-website/pull/3037) on the Website and we created a [GitHub Working Group](https://github.com/reactwg/react-native-new-architecture/discussions) to answer questions related to the New Architecture.

<!--truncate-->

## Introduction

In this post we are sharing an update on tools and resources to help you migrate your **Native Modules** and **Native Components** to their **New Architecture** equivalents, **TurboModule** and **Fabric Components**.

React Native users leverage vast number of open source libraries for building apps. For a complete and consistent ecosystem, it is necessary that these libraries migrate such that everyone can benefit from the unlocked capabilities and performance improvements of the New Architecture.

Here is what we’re working on to support library developers in migrating to the New Architecture:

- **Documentation:** We are expanding the [New Architecture guide](https://github.com/facebook/react-native-website/pull/3037) on the website to cover more concepts of the New Architecture and how to develop your components.
- **Example Migrations:** We’ve set up two repositories to demonstrate how to migrate a React Native app to the New Architecture ([RNNewArchitectureApp](https://github.com/react-native-community/RNNewArchitectureApp)) and how to create a **Fabric Component** and a **TurboModule** that work with both architectures ([RNNewArchitectureLibraries](https://github.com/react-native-community/RNNewArchitectureLibraries)).
- **Support:** Earlier this year, we created a [GitHub Working Group](https://github.com/reactwg/react-native-new-architecture/discussions) dedicated to discussion and questions around the New Architecture.

In this post, we will dig deeper into these resources and explain in more detail how you can use them most efficiently. Finally, we will provide a snapshot of the current migration state for the most used React Native libraries.

### Documentation

In the past 6 months, we’ve added a [guide on adopting the New Architecture](/docs/new-architecture-intro) and an [architecture deep-dive](/architecture/overview) on Fabric. We plan to expand this to include more guides and documentation around creating TurboModules, understanding CodeGen, and more. We plan to have updates to share by the 0.70 release.

Currently, the **New Architecture** guide covers how to [migrate your app](/docs/new-architecture-app-intro) and [your libraries](/docs/new-architecture-library-intro) to support the New Architecture properly.

If you are interested in the evolution of this guide, or have feedback, you can follow along on [this](https://github.com/facebook/react-native-website/pull/3037) pull request.

### Example Migrations

For developers who may want to follow along in code, we’ve prepared two example repositories.

#### RNNewArchitectureApp

[This repo](https://github.com/react-native-community/RNNewArchitectureApp) was created to demonstrate how to migrate an app, the native modules and the native components from the legacy architecture on the React Native version 0.67 to the New Architecture and the most recent version of React Native. Each commit corresponds to an isolated migration step.

<figure>
    <img src="/blog/assets/new-arch-example-steps-to-migrate-an-app.png" alt="Example steps to migrate an app" />
    <figcaption>Commit list for a migration in the RNNewArchitectureApp repository</figcaption>
</figure>

The repo is organized as follows:

- A **main** branch has no code but a README.md which advertises other branches.
- Several migration branches which show a migration from a specific version of RN to another.

Some of the migration branches also have a **RUN.md** file which describes in a more human-readable fashion the exact steps that have been applied in every commit.

We plan to keep this example up to date with the most recent stable releases, adding migrations to any minor release of React Native we are going to release. If you notice issue with any of the steps, please file an issue in the repository. This will hold until we have the reasonable feeling that most of the React Native users have migrated to the New Architecture.

#### RNNewArchitectureLibraries

Similarly, [this repo](https://github.com/react-native-community/RNNewArchitectureLibraries) provides a step-by-step guide on how to create a **TurboModule** and a **Fabric Component**. It has a focus on ensuring backward compatibility between the New Architecture and the legacy one.

The repository is organized in a similar way to the previous one:

- A **main** branch has no code but a README.md which advertises other branches.
- Other branches to show how to develop **TurboModules** and **Fabric Components**.

We plan to keep this example updated onto new releases of React Native, especially releases that affect library development, as well as add more examples on how to use advanced features (for example: implementing commands, event emitters, custom state). If you notice errors, please file an issue in the example repository.

### Support

We’ve created a dedicated [working group](https://github.com/reactwg/react-native-new-architecture) to give the community space to ask questions and get updates on the New Architecture. If you are a library maintainer, this is a valuable resource to find answers to your questions, and for us to know about your requirements. To join, please follow [these instructions](https://github.com/reactwg/react-native-new-architecture#how-to-join-the-working-group). Everyone is welcome.

The working group is organized into several sections:

- [Announcements](https://github.com/reactwg/react-native-new-architecture/discussions/categories/announcements): A place to share milestones and significant updates on the RN New Architecture Rollout
- [Deep Dive](https://github.com/reactwg/react-native-new-architecture/discussions/categories/deep-dive): A place to chat about deep dives and technical-specific topics
- [Documentation](https://github.com/reactwg/react-native-new-architecture/discussions/categories/documentation): A place to chat about the New Architecture documentation and migration material
- [Libraries](https://github.com/reactwg/react-native-new-architecture/discussions/categories/libraries): A place to chat about 3rd party libraries and their migration story to the New Architecture
- [Q&A](https://github.com/reactwg/react-native-new-architecture/discussions/categories/q-a): A place to ask the community for help on the New Architecture topics
- [Releases](https://github.com/reactwg/react-native-new-architecture/discussions/categories/releases): A place to chat about release specific bugs & build problems

To use this group effectively:

- **Make sure your library is listed inside the [Libraries](https://github.com/reactwg/react-native-new-architecture/discussions/categories/libraries) section**. This will help us share a status update on the migration of your library and will help us understand which struggles library authors are facing to support you better.
- **Leverage the Q&A [section](https://github.com/reactwg/react-native-new-architecture/discussions/categories/q-a) if you face a blocker and need support**. Our team and community experts are monitoring and will support at our best effort.
- **Keep an eye on the other sections for topics that may affect you**. A new release may introduce exactly the API that you were looking for. You can subscribe to particular discussions via GitHub.

We plan to support this group until the **New Architecture** is enabled by default and all the major libraries have been migrated to it.

### Migration Status of Popular Libraries

Libraries maintainers have been sharing with us [in the working group](https://github.com/reactwg/react-native-new-architecture/discussions/categories/libraries) the status of their migration effort, and we wanted to provide you with a quick overview:

- [react-native-gesture-handler](https://github.com/reactwg/react-native-new-architecture/discussions/15): ✅ Migrated
- [react-native-navigation](https://github.com/reactwg/react-native-new-architecture/discussions/17): 🏃‍♂️ Ongoing
- [react-native-pager-view](https://github.com/reactwg/react-native-new-architecture/discussions/16): 🏃‍♂️ Ongoing
- [react-native-reanimated](https://github.com/reactwg/react-native-new-architecture/discussions/14): ✅ Migrated. In the process of testing and profiling for performances
- [react-native-screens](https://github.com/reactwg/react-native-new-architecture/discussions/13): 🏃‍♂️ Ongoing
- [react-native-slider](https://github.com/reactwg/react-native-new-architecture/discussions/38): 🎬 Started
- [react-native-template-new-architecture](https://github.com/reactwg/react-native-new-architecture/discussions/21): ✅ Migrated. Gradually adopting/testing more companion Libraries
- [react-native-template-typescript](https://github.com/reactwg/react-native-new-architecture/discussions/22): ✅ Migrated
- [react-native-webview](https://github.com/reactwg/react-native-new-architecture/discussions/19): 🎬 Started

## Next Steps

We are invested in supporting the React Native community’s adoption of the New Architecture. Concretely, we will continue to:

- Offer best-effort support in the **Working Group.**
- Provide more examples about how to achieve amazing results with the New Architecture in the **RNNewArchitecture** repositories.
- Provide clear and up-to-date documentation on the **New Architecture**.
- Track the migration status of essential React Native libraries in the **Working Group**.
- Simplify the migration path for developers

In addition, React Native 0.69 will ship with improved devX for app and library developers for New Architecture adoption. You can find more information about the 0.69.0 release [here](https://github.com/reactwg/react-native-releases/discussions/21).

We are excited about what we will build together with the **New Architecture**!
