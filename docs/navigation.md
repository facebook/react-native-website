---
id: navigation
title: Navigating Between Screens
---

By default, React Native renders your components onto a single screen. To create multiple screens and navigate between them you need a navigation library. The following table helps you choose the one that's right for you. Each column identifies a different feature and each row represents a different navigation library (React Router Native isn't included because it doesn't have stack navigation). These features aren't the be-all and end-all of what makes a good navigation library but they are important. Keep reading to find out why.

|                                                                                                           | Uses native API | Has one React root | Runs in Expo | Runs on the Web |
| --------------------------------------------------------------------------------------------------------- | --------------- | ------------------ | ------------ | --------------- |
| [React Navigation](https://reactnavigation.org/docs/en/getting-started.html)                              | No              | Yes                | Yes          | No              |
| [React Native Navigation](https://wix.github.io/react-native-navigation/)                                 | Yes             | No                 | No           | No              |
| [The Navigation router](https://grahammendick.github.io/navigation/documentation/native/hello-world.html) | Yes             | Yes                | No           | Yes             |

## Uses native API

React Native uses the same fundamental UI building blocks as regular apps. Both iOS and Android have fundamental navigation building blocks Android has `Activities` or `Fragments` and iOS has `UIViewControllers`. If your navigation library doesn't use them then you can end up with an app that doesn't have a native look and feel. You'll also miss out on iOS navigation bar features like large titles and search bars.

## Has one React root

If your navigation library renders all screens under a single React root then they share the React `Context`. That means you can use any state management library, or none, to pass data between them. If screens don't share the React `Context` then you have to hold the shared data in a global store outside of the React tree. That rules out state management solutions like Relay and Apollo and only rules in Redux.

## Runs in Expo

Expo provides a shared native runtime so you don't write native code. You focus on writing your React app in JavaScript. You don't have to worry about iOS or Android specific settings, or even opening up Xcode. Managed Expo projects have their own workflow including Expo CLI (a command line interface) and Expo Dev Tools (a web UI) to simplify the development and deployment process.

## Runs on the Web

React Native for Web runs your native app on the Web. You don't have to change any code because React Native for Web renders your React Native components as DOM elements. For example, it converts Views into divs. But this only works if your navigation library supports React Native for Web. To avoid compromising the Web experience, make sure that your navigation library can generate Hyoerlinks and render on the server-side (SSR).
