---
title: 'Use a framework to build React Native apps'
authors: [cortinico]
tags: [announcement]
date: 2024-06-25
---

At [React Conf](https://www.youtube.com/live/0ckOUBiuxVY?si=pU4qP4eB5iWfY0IG&t=2320), we updated our guidance on the best tool to get started building React Native apps: a **React Native framework** - a toolbox with all the necessary APIs to let you build production-ready apps.

Using React Native frameworks, such as Expo, is now the **recommended** approach to create new apps.

In this blogpost we want to walk you through what they are in detail and what they mean for you as a React Native developer starting a new project.

<!-- truncate  -->

## What is a React Native framework?

If you’ve been building production apps, you probably know that there is a set of common problems you will need to solve sooner or later.

When building any application on either web or native, you probably want your users to navigate through different screens, fetch data, and store the state of your user. But for native apps there is even more to deal with: you need tools to upgrade your native code between React Native versions, manage compatible versions of all of your dependencies, and deal with native build tools.

It takes a village to bring an app from idea to production without the right tools.

We want you to focus on writing beautiful applications and features for your users, and not solving those common problems over and over.

That’s why we believe that the best way for you to experience React Native is through a framework that offers a toolbox with all the necessary tools you need to build production-ready applications.

We’ve found that **you’re either using a framework or you’re building your own framework**.

There is nothing wrong with building your own framework, by crafting your own solutions for routing, navigation, deploying, and so on. Major corporations like Meta and Microsoft build their own frameworks internally to integrate deeply into their brownfield apps. But we believe that most people will be better off by using an existing framework.

If you’ve been using React on web, you’re probably familiar with a similar concept of [production-grade React frameworks](https://react.dev/learn/start-a-new-react-project#production-grade-react-frameworks).

As of today, the only recommended community framework for React Native is [Expo](https://docs.expo.dev/). Folks at Expo have been investing in the React Native ecosystem since the early days of React Native and as of today, we believe the developer experience offered by Expo is best in class.

:::note

Expo, the framework, is and will remain free and open source, while Expo Application Services (EAS) is an optional paid service.

:::

<!--alex ignore he-she retext-equality-->

If you haven’t used Expo recently, make sure you don’t miss [this talk from Kadi @ Expo](https://www.youtube.com/live/0ckOUBiuxVY?si=N-WSfmAJSMfd6wDL&t=3888) where she’s showcasing what you can do with Expo in 2024.

We’ve also updated the [Getting Started page](https://reactnative.dev/docs/environment-setup) on the website to reflect this recommendation.

## How will frameworks affect you?

If you’re already using a recommended framework such as Expo, you’re already good to go!

If you'd like to migrate your existing app to Expo, you can find instructions on [the official Expo website](https://docs.expo.dev/bare/overview/). Expo offers many benefits, such as an easier way to [upgrade your React Native version](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/), a better developer experience, and much more.

However, if you can't or don't want to migrate to Expo, that's fine too. Using React Native without an official framework will continue to be supported. The tools you’ve been using such as React Native Community CLI, Template and [Upgrade Helper](https://react-native-community.github.io/upgrade-helper/) will keep on working as usual.

The `react-native init` command has moved out of core and is now accessible via:

```
npx @react-native-community/cli@latest init
```

and on GitHub at [react-native-community/cli](https://github.com/react-native-community/cli).

If you’re a React Native library developer, we collected a list of recommendations on which APIs to use. [Read more in the RFC](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0759-react-native-frameworks.md#what-do-we-recommend-to-react-native-library-developers).

## Further reading

If you’re interested in learning more about the reasoning behind this decision, we invite you to read the [RFC0759: React Native Frameworks](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0759-react-native-frameworks.md#what-do-we-recommend-to-react-native-library-developers). This RFC is a result of a multi-month effort involving countless discussions and brainstorming among different partners and players of the React Native ecosystem.

While Expo today is the only recommended framework, the RFC also contains [guidelines](https://github.com/react-native-community/discussions-and-proposals/blob/main/proposals/0759-react-native-frameworks.md#becoming-a-react-native-framework) on how to become a recommended framework, as we hope to see more competition and innovation in this space.

Moreover, you should check out the talk [useFrameworks()](https://www.youtube.com/watch?v=lifGTznLBcw) at App.js 2024 where we presented this RFC and the necessary changes in a short format.

We believe that by clarifying the respective responsibilities of React Native Core and the Frameworks, we can foster a healthier ecosystem and drive growth & innovation for React Native.
