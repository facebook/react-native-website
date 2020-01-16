---
id: introduction
title: Introduction
description: This helpful guide lays out the prerequisites for learning React Native, using these docs, and setting up your environment.
---

Many different kinds of people use React Native: from advanced iOS developers to React beginners, to people getting started programming for the first time in their career. These docs were written for all learners, no matter their experience level or background.

## How to use these docs

You can start here and read through these docs linearly like a book; or you can read the specific sections you need. Already familiar with React? You can skip [that section](intro-react)—or read it for a light refresher.

## Prerequisites

To work with React Native, you will need to have an understanding of JavaScript fundamentals. If you’re new to JavaScript or need a refresher, you can [dive in](https://developer.mozilla.org/en-US/docs/Web/JavaScript) or [brush up](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) at Mozilla Developer Network.

> While we do our best to assume no prior knowledge of React, iOS, or Android development, these are valuable topics of study for the aspiring React Native developer. Where sensible, we have linked to resources and articles that go more in depth.

## Interactive examples

This introduction lets you get started immediately in your browser with interactive examples like this one:

```SnackPlayer name=Hello%20World
import React from 'react';
import { Text, View } from 'react-native';

export default function YourApp() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        // Try editing me! 🎉
      </Text>
    </View>
  );
}
```

The above is a Snack Player. It’s [a handy tool created by Expo](https://expo.io/tools#snack) to embed and run React Native projects and share how they render in platforms like Android and iOS. The code is live and editable, so you can play directly with the code. Go ahead and try changing the text commented out with `//` above to "Hello, world!"

> Optionally, if you want to setup a local development environment, [you can follow our guide to setting up your environment on your local machine](getting-started) and paste the code examples into your `App.js` file there. (If you are a web developer, you may already have a local environment set up for mobile browser testing!)

## Function Components and Class Components

With React, you can make components using either classes or functions. Originally, class components were the only components that could have state. However, [React 16.8 introduced an API called “Hooks” for adding state and more to function components](https://reactjs.org/docs/hooks-intro.html). In March 2019, [React Native 0.58 adopted Hooks as well](https://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059).

Because Hooks are the future-facing way to write your React components, we wrote this introduction using function component examples. Where useful, we also cover class components under a toggle:

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      Function Component Example
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class Component Example
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=Hello%20World%20Function%20Component
import React from 'react';
import { Text, View } from 'react-native';

export default function HelloWorldApp() {
  return (
    <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
}
```

<block class="classical syntax" />

```SnackPlayer name=Hello%20World%20Class%20Component
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

```

<block class="endBlock syntax" />

You can find more examples of class components in [previous versions of this documentation](/react-native/versions).

## Developer Notes

People from many different development backgrounds are learning React Native. You may have experience with a range of technologies, from web to Android to iOS and more. We try to write for developers from all backgrounds. Sometimes we provide explanations specific to one platform or another like so:

<div class="toggler">
  <span>Developer Notes</span>
  <span role="tablist" class="toggle-devNotes">
    <button role="tab" class="button-webNote" onclick="displayTabs('devNotes', 'webNote')">Web</button>
    <button role="tab" class="button-androidNote" onclick="displayTabs('devNotes', 'androidNote')">Android</button>
    <button role="tab" class="button-iosNote" onclick="displayTabs('devNotes', 'iosNote')">iOS</button>
  </span>
</div>

<block class="webNote devNotes" />

> Web developers may be familiar with this concept.

<block class="androidNote devNotes" />

> Android developers may be familiar with this concept.

<block class="iosNote devNotes" />

> iOS developers may be familiar with this concept.

<block class="endBlock devNotes" />

## Formatting

Menu paths are written in bold and use carets to navigate submenus. Example: **Android Studio > Preferences**

---

Now that you know how this guide works, it's time to get to know the foundation of React Native: [Native Components](intro-react-native-components.md).
