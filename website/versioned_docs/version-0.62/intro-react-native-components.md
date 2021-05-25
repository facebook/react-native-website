---
id: intro-react-native-components
title: Core Components and Native Components
description: 'React Native lets you compose app interfaces using Native Components. Conveniently, it comes with a set of these components for you to get started with right now—the Core Components!'
---

React Native is an open source framework for building Android and iOS applications using [React](https://reactjs.org/) and the app platform’s native capabilities. With React Native, you use JavaScript to access your platform’s APIs as well as to describe the appearance and behavior of your UI using React components: bundles of reusable, nestable code. You can learn more about React in the next section. But first, let’s cover how components work in React Native.

## Views and mobile development

In Android and iOS development, a **view** is the basic building block of UI: a small rectangular element on the screen which can be used to display text, images, or respond to user input. Even the smallest visual elements of an app, like a line of text or a button, are kinds of views. Some kinds of views can contain other views. It’s views all the way down!

<figure>
  <img src="/docs/assets/diagram_ios-android-views.svg" width="1000" alt="Diagram of Android and iOS app showing them both built on top of atomic elements called views." />
  <figcaption>Just a sampling of the many views used in Android and iOS apps.</figcaption>
</figure>

## Native Components

In Android development, you write views in Kotlin or Java; in iOS development, you use Swift or Objective-C. With React Native, you can invoke these views with JavaScript using React components. At runtime, React Native creates the corresponding Android and iOS views for those components. Because React Native components are backed by the same views as Android and iOS, React Native apps look, feel, and perform like any other apps. We call these platform-backed components **Native Components.**

React Native lets you to build your own Native Components for [Android](native-components-android.md) and [iOS](native-components-ios.md) to suit your app’s unique needs. We also have a thriving ecosystem of these **community-contributed components.** Check out [React Native Directory](https://reactnative.directory) to find what the community has been creating.

React Native also includes a set of essential, ready-to-use Native Components you can use to start building your app today. These are React Native's **Core Components**.

## Core Components

React Native has many Core Components for everything from form controls to activity indicators. You can find them all [documented in the API section](components-and-apis). You will mostly work with the following Core Components:

| React Native UI Component | Android View   | iOS View         | Web Analog               | Description                                                                                           |
| ------------------------- | -------------- | ---------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `<View>`                  | `<ViewGroup>`  | `<UIView>`       | A non-scrollling `<div>` | A container that supports layout with flexbox, style, some touch handling, and accessibility controls |
| `<Text>`                  | `<TextView>`   | `<UITextView>`   | `<p>`                    | Displays, styles, and nests strings of text and even handles touch events                             |
| `<Image>`                 | `<ImageView>`  | `<UIImageView>`  | `<img>`                  | Displays different types of images                                                                    |
| `<ScrollView>`            | `<ScrollView>` | `<UIScrollView>` | `<div>`                  | A generic scrolling container that can contain multiple components and views                          |
| `<TextInput>`             | `<EditText>`   | `<UITextField>`  | `<input type="text">`    | Allows the user to enter text                                                                         |

In the next section, you will start combining these Core Components to learn about how React works. Have a play with them here now!

```SnackPlayer name=Hello%20World
import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';

export default function App() {
  return (
    <ScrollView>
      <Text>Some text</Text>
      <View>
        <Text>Some more text</Text>
        <Image source={{uri: "https://reactnative.dev/docs/assets/p_cat2.png"}} style={{width: 200, height: 200}}/>
      </View>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        defaultValue="You can type in me"
      />
    </ScrollView>
  );
}
```

---

Because React Native uses the same API structure as React components, you’ll need to understand React component APIs to get started. The [next section](intro-react) makes for a quick introduction or refresher on the topic. However, if you’re already familiar with React, feel free to [skip ahead](handling-text-input).

<img src="/docs/assets/diagram_react-native-components.svg" width="1000" alt="A diagram showing React Native's Core Components are a subset of React Components that ship with React Native." />
