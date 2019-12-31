---
id: introduction
title: Introduction
---

These docs were written to take any learner at any expertise level with any background from zero to 360. So many different kinds of people use React Native: from master iOS developers to React JS dabblers, to people getting started programming for the first time in their career!

## How to use these docs

You can start here and read through these docs linearly like a book; or you can read skip around to the specific sections you need. Already familiar with React JS? You can skip that section—or read it for a light refresher.

## Prerequisites

To work with React Native, you will need to have an understanding of JavaScript fundamentals. If you’re new to JavaScript or need a refresher, you can [dive in](https://developer.mozilla.org/en-US/docs/Web/JavaScript) or [brush up](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) at Mozilla Developer Network.

> While we do our best to assume no prior knowledge of React, iOS, or Android development, these are valuable topics of study for the aspiring React Native developer. Where sensible, we have linked to resources and articles that go more in depth.

## Formatting

Menu paths are written in bold and use carats to navigate submenus. Example: **Android Studio > Preferences**

## Interactive examples

<div class="toggler">
  <ul role="tablist" id="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTab('syntax', 'functional')">
      Functional Syntax
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTab('syntax', 'classical')">
      Class Syntax
    </li>
  </ul>
</div>

<block class="functional webNote iosNote androidNote" />

```SnackPlayer name=Hello%20World
import React from 'react';
import { Text, View } from 'react-native';

export default function YourApp() {
  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
      </View>
  );
}
```

<block class="classical webNote iosNote androidNote" />

```SnackPlayer name=Hello%20World
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class HelloWorldApp extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
      </View>
    );
  }
}

```

<block class="classical functional webNote iosNote androidNote" />

The above is a Snack Player. It’s [a handy tool created by Expo](https://expo.io/tools#snack) to embed and run React Native projects on and share how they render in platforms like Android and iOS. We will be using them a lot to demonstrate code samples throughout these docs. You can play around with sample code provided in the Snack, or you can [set up an environment on your local machine](http://localhost:3000/react-native/docs/next/getting-started) and paste the code into your `App.js` file there.

## Functional and Class Syntaxes

You may have noticed the two tabs for “Functional Syntax” and “Class Syntax” in the Snack above. We thought it would be useful for you to have both syntaxes to study, though we will only go into depth with the Hooks syntax. React used a class-based syntax until [React 16.8 introduced a functional syntax called “Hooks”](https://reactjs.org/docs/hooks-intro.html). In March 2019, [React Native 0.58 adopted Hooks as well](https://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059). While Hooks are the future-facing way to write your React-based components, you might be working in a codebase that still uses classes.

With the functional syntax you export a JavaScript function that returns your component(s):

```
export default function YourApp() {
  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Hello, world!</Text>
      </View>
  );
}
```

> The sample code in this documentation uses [JavaScript version ES2015](https://babeljs.io/learn-es2015/) (also known as ES6). Since ES2015 is not yet supported by all browsers, React Native ships with ES2015 support out of the box thanks to [Babel](https://babeljs.io/) (which also handles your JSX!). This means you can use ES2015 without worrying about backwards compatibility.

## Developer Notes

People with many different developer experiences are learning React Native. You may have experience with a range of technologies, from web to Android to iOS and more. We try to write for developers from all backgrounds. Sometimes we provide explanations specifc to one platform or another like so:

<div class="toggler">
  <span>Developer Notes</span>
  <span role="tablist" id="toggle-devNotes">
    <button role="tab" class="button-webNote" onclick="displayTab('devNotes', 'webNote')">Web</button>
    <button role="tab" class="button-androidNote" onclick="displayTab('devNotes', 'androidNote')">Android</button>
    <button role="tab" class="button-iosNote" onclick="displayTab('devNotes', 'iosNote')">iOS</button>
  </span>
</div>

<block class="webNote classical functional" />

> Web developers may be familiar with this concept.

<block class="androidNote classical functional" />

> Android developers may be familiar with this concept.

<block class="iosNote classical functional" />

> iOS developers may be familiar with this concept.

<block class="webNote androidNote iosNote  classical functional" />

---

Now that you know how this guide works, it's time to get to know the foundation of React Native: [Native Components](intro-react-native-components.md).
