---
title: React Native Core Contributor Summit 2022
authors: [thymikee, cortinico]
tags: [announcement]
date: 2022-11-22
---

# React Native Core Contributor Summit 2022

After years of pandemic and online-only events, we really felt it was time to bring the Core Contributors of React Native together!

That’s why at the beginning of September, we gathered some of the active core contributors of React Native, library maintainers, and the Meta’s React Native and Metro teams to the **Core Contributor Summit 2022**. [Callstack](https://www.callstack.com/) hosted the Summit in their HQ in Wrocław, Poland, as a part of the [React Native EU](https://www.react-native.eu/) conference happening at the same time.

Together with the React Native core team, we devised a series of **workshops** in which the attendees could participate. The topics were:

- ​​React Native Codegen & TypeScript Support
- ​​React Native New Architecture Library Migration
- ​​React Native Monorepo
- Metro Web and Ecosystem Alignment
- Metro Simplified Release Workflow

We were impressed by the amount of knowledge-sharing and collaboration over those two days. In this blog post, we’d like to give you a sneak peek of the results of this gathering.

<!--truncate-->

### React Native Codegen & TypeScript Support

[React Native’s Codegen](https://github.com/reactwg/react-native-new-architecture/blob/main/docs/codegen.md) is a fundamental part of the New Architecture of React Native. Supporting and improving it is among our top priorities for the future of React Native. For instance, earlier this year, we added support for generic code starting from TypeScript specs rather than Flow.

In this session, we took the opportunity to onboard new contributors to Codegen, by explaining its core concept and describing how it works. We then focused on two major areas:

#### 1. Supporting **new types** that are currently unsupported by Codegen. One of the highly requested ones was the [string union types in TypeScript](https://github.com/Titozzz/react-native/tree/codegen-string-union).

A team of a few people moved into a meeting room to tackle this task. They encountered and overcame some difficulties along the way, like how to run unit tests for Codegen. They spent quite some time understanding the code execution flow before starting to deal with the code. After some hours of collaborative work, they ended up with the first prototype that was able to recognize string unions. This experience was extremely useful in discussing design patterns and the ideal architecture we may want in the future.

#### 2. Improving **[auto-linking for iOS](https://github.com/facebook/react-native/pull/34580)**, which was missing a use case.

Specifically, auto-linking could not work well in scenarios where libraries and the app were living together in a monorepo. Android already supported this use case but it was missing for iOS.

Working with the contributors on Codegen helped us realize that it wasn’t trivial to work in its codebase. For example, adding the support for one type required to copy-and-paste the same code in four different places: modules with specs written in Flow, modules with specs written in TypeScript, components with specs written in Flow, and components with specs written in TypeScript.

This realization pushed us to create an [umbrella task](https://github.com/facebook/react-native/issues/34872) to reach out for help to the community in order to improve the status of the codebase toward a more maintainable one.

The participation was outstanding: we managed to quickly assign the first **40 tasks in 5 days**. At the end of October, the community completed **47 tasks** and many others are ready and waiting to be merged.

This initiative also contributed to the [Hacktoberfest](https://hacktoberfest.com/) for all the people who contributed to these improvements!

### ​​React Native New Architecture Library Migration

The hot topic in the React Native space is the New Architecture. Having **libraries** that support the New Architecture is a crucial point in the [migration for the whole ecosystem](/blog/2022/06/16/resources-migrating-your-react-native-library-to-the-new-architecture). Therefore, we want to support library maintainers in migrating to the New Architectures.

Initially, this session started as a brainstorming, where the core contributors had the opportunity to ask the React Native team all the questions they had related to the New Architecture. This in-person feedback loop was crucial for both the core contributors to bring clarity and for the React Native team to collect feedback. Some of the shared feedback and concerns will end up being implemented in React Native 0.71.

We then moved to practically migrating as many libraries to the new architecture as possible. During this session, we kicked off the migration process for several community packages, such as `react-native-document-picker`, `react-native-store-review`, and `react-native-orientation`.

As a reminder, if you’re also migrating a library and need support in doing so, please reach out to our [New Architecture Working Group](https://github.com/reactwg/react-native-new-architecture) on GitHub.

### ​​React Native Monorepo

Releasing a new version of React Native is not trivial today. React Native is one of the most downloaded packages on NPM, and we want to make sure that our release process is smooth.

That’s why we want to refactor the `react-native` repository and implement the **Monorepo RFC** ([#480](https://github.com/react-native-community/discussions-and-proposals/pull/480)).

In this session, we initially brainstormed and collected opinions from every contributor, as it’s crucial that we evolve our repository to reduce the breaking changes for our downstream dependencies.

We then started working on two fronts. First, we had to expand our Continuous Integration infrastructure to support our monorepo, adding [Verdaccio](https://verdaccio.org/) to our testing infrastructure. We then started renaming & adding scopes to several of our packages, resulting in 6 distinct contributions.

You can track the status of this effort under this [umbrella issue](https://github.com/facebook/react-native/issues/34692) and we hope to share more on this effort in the near future.

### Metro Web and Ecosystem Alignment

[Metro](https://github.com/facebook/metro), our JavaScript Bundler, is a foundational and integrated part of the React Native development experience and we want to make sure it works with the latest standards in the JS ecosystem.

The focus of this session was to discuss improving Metro's feature set to work better for web use cases and with the npm and bundler ecosystem. Two major areas of discussion:

#### 1. Adopting the `"exports"` ([package entry points](https://nodejs.org/api/packages.html#package-entry-points)) specification

From the [Node.js documentation](https://nodejs.org/api/packages.html#package-entry-points):

<!-- alex ignore clearly -->

:::info
The ["exports"](https://nodejs.org/api/packages.html#exports) provides a modern alternative to ["main"](https://nodejs.org/api/packages.html#main) allowing multiple entry points to be defined, conditional entry resolution support between environments, and **preventing any other entry points besides those defined in ["exports"](https://nodejs.org/api/packages.html#exports)**. This encapsulation allows module authors to define the public interface for their package clearly.
:::

Adopting the `"exports"` specification has a lot of potential. In this session, we debated on how to handle [Platform Specific Code](/docs/platform-specific-code#platform-specific-extensions) with `"exports"`. Considering many factors, we came up with a fairly non-breaking rollout plan for `"exports"`, by adding a `"strict"` and `"non-strict"` mode to Metro resolver. We discussed how leveraging [builder-bob](https://github.com/callstack/react-native-builder-bob) would help library creators adopt the strict mode without friction.

This discussion resulted in:

1. An [RFC](https://github.com/react-native-community/discussions-and-proposals/pull/534) for Metro on how package exports would work with React Native.
2. An [RFC](https://github.com/nodejs/node/pull/45367) for Node.js to include “react-native” as a Community Condition.

#### 2. Web and bundler ecosystem

The Metro team shared progress from their partnership with Expo and the intent to continue this working model for upcoming bundle splitting and tree-shaking support. We touched again on ES module support and considered potential future features such as Yarn PnP and output optimization on the web. We discussed how Metro’s core shares logic and data structures with Jest and opportunities for more reuse.

Developers surfaced insightful use cases for bundle splitting and interoperability with third-party tooling. This led us to discuss potential extension points in Metro and improving current documentation.

This discussion provided us with good grounding for the next day's session on simplifying the release workflow.

### Metro Simplified Release Workflow

As mentioned, releasing React Native is not trivial.

Things get harder as we need to release React Native, the React Native CLI, and Metro. Those tools are connected to each other as React Native and the CLI both depend on Metro. This creates some friction when any of the packages releases a new version.

Currently, we manage this through direct communication and synchronized releases, but there is space for improvement.

In this session, we reconsidered the **dependencies** between React Native, Metro, and the CLI. We uncovered how some design decisions during the [“Lean Core” effort](https://github.com/react-native-community/discussions-and-proposals/issues/6), when we extracted the CLI from React Native, made these two projects codependent with some functionalities duplicated among efforts. The decisions back then made sense and allowed the CLI team to iterate faster than ever.

It was about time to revisit them and take the experience of both teams to figure out the way through. As a result, the Metro team will take over the [`@react-native-community/cli-plugin-metro`](https://github.com/react-native-community/cli/tree/main/packages/cli-plugin-metro) development, temporarily moving it back to the core of React Native, and then most likely to the Metro monorepo.

![](/blog/assets/core-contributor-summit-2022.jpg)

The biggest takeaway, apart from three hours of drawing dependencies between the packages on the whiteboard, was for the CLI and Metro team to exchange their issues, experiences, and plans, resulting in a better understanding of each other.

We wouldn’t be able to achieve this level of cooperation without actually meeting each other.

---

We’re still impressed by how spending several hours together for a couple of days resulted in so much knowledge-sharing and cross-pollination of ideas. During this summit, we planted the seeds for initiatives that will help us improve and re-shape the React Native ecosystem.

We want to say thank you again to [Callstack](https://www.callstack.com/) for hosting us and to all the participants for joining us at the Core Contributor Summit 2022.

If you’re interested in joining the development of React Native, make sure you join our open initiatives and read the [contribution guide](https://reactnative.dev/contributing/overview) we have on our website. We hope to meet you in person as well in the future!
