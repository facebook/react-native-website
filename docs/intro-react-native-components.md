---
id: intro-react-native-components
title: Core Components and Native Components
---

React Native is an open source framework for building Android and iOS applications using [React](https://reactjs.org/) and the app platform’s native capabilities. With React Native, you use JavaScript to access your platform’s APIs as well as to describe the appearance and behaviour of your UI using React components, bundles of reusable, nestable code. You can learn more about React in the next section. But first, let's cover how components work in React Native.

## Views and mobile development

In Android and iOS development, a **view** is the basic building block of UI: a small rectangular element on the screen which can be used to display text, images, or respond to user input. Even the smallest visual elements of an app, like a line of text or a button, are kinds of views. Some kinds of views can nest other views. It’s views all the way down!

## Native Components

In Android development, you write views in Java or Kotlin; in iOS development, you use Objective-C or Swift. With React Native, you can invoke these views with JavaScript using React components. At runtime, React Native creates the corresponding Android and iOS views for those components. Because React Native components are backed by the same views as Android and iOS, React Native apps look, feel, and perform like any other apps. We call these platform-backed components Native Components.

## Core Components

React Native comes with a suite of built-in components ready for you to use. These Core Components include:

| React Native UI Component | Android View   | iOS View         | Web Analog               | Description                                                                                           |
| ------------------------- | -------------- | ---------------- | ------------------------ | ----------------------------------------------------------------------------------------------------- |
| `<View>`                  | `<ViewGroup>`  | `<UIView>`       | A non-scrollling `<div>` | A container that supports layout with flexbox, style, some touch handling, and accessibility controls |
| `<Text>`                  | `<TextView>`   | `<UITextView>`   | `<p>`                    | Displays, styles, and nests strings of text and even handles touch events                             |
| `<Image>`                 | `<ImageView>`  | `<UIImageView>`  | `<img>`                  | Displays different types of images                                                                    |
| `<ScrollView>`            | `<ScrollView>` | `<UIScrollView>` | `<div>`                  | A generic scrolling container that can contain multiple components and views                          |
| `<TextInput>`             | `<EditText>`   | `<UITextField>`  | `<input type="text">`    | Allows the user to enter text                                                                         |

React Native has many more Core Components for everything from form controls to activity indicators. You can find them [documented in the APIs section](components-and-apis). For now, we’re going to work with these five Core Components. In the next section you will start combining them. Have a play with them here now!

```SnackPlayer name=Hello%20World
import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';

export default function App() {
    return (
      <ScrollView>
        <Text>ScrollViews scroll!</Text>
        <View>
          <Text>Some text</Text>
          <Image source="https://placekitten.com/g/200/300" style={{width: 200, height: 200}}/>
        </View>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          defaultValue="You can type in me"
        />
      </ScrollView>
    );
}
```

## Make your own Native Components

As you continue developing with React Native, you may want to use a kind of view on Android or iOS that isn’t in the Core Components. For this reason, React Native lets you to build your own Native Components for [Android](native-components-android.md) and [iOS](native-components-ios.md) to suit your app's unique needs. We also have a thriving ecosystem of these community-contributed components and modules. Check [Native Directory](https://www.native.directory/) to find what the community has been creating.

---

Because React Native uses the same API structure as React components, you’ll need to understand React component APIs to get started. The [next section](intro-react) makes for a quick introduction or refresher on the topic. However, if you’re already familiar with React, feel free to [skip ahead](handling-text-input).

<img src="/react-native/docs/assets/react-native-components.png" srcset="/react-native/docs/assets/react-native-components2x.png 2x" width="1000" alt="A diagram showing React Native's Core Components are a subset of React Components that ship with React Native.">
