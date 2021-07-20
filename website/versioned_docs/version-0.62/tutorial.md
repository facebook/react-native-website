---
id: tutorial
title: Learn the Basics
---

React Native is like React, but it uses native components instead of web components as building blocks. So to understand the basic structure of a React Native app, you need to understand some of the basic React concepts, like JSX, components, `state`, and `props`. If you already know React, you still need to learn some React-Native-specific stuff, like the native components. This tutorial is aimed at all audiences, whether you have React experience or not.

Let's do this thing.

## Hello World

In accordance with the ancient traditions of our people, we must first build an app that does nothing except say "Hello, world!". Here it is:

```SnackPlayer name=Hello%20World
import React from 'react';
import { Text, View } from 'react-native';

function HelloWorldApp() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>Hello, world!</Text>
    </View>
  )
}
export default HelloWorldApp;
```

If you are feeling curious, you can play around with sample code directly in the web simulators. You can also paste it into your `App.js` file to create a real app on your local machine.

## What's going on here?

1. First of all, we need to import `React` to be able to use `JSX`, which will then be transformed to the native components of each platform.
2. On line 2, we import the `Text` and `View` components from `react-native`

Then we find the `HelloWorldApp` function, which is a [functional component](https://reactjs.org/docs/components-and-props.html#function-and-class-components) and behaves in the same way as in React for the web. This function returns a `View` component with some styles and a`Text` as its child.

The `Text` component allows us to render a text, while the `View` component renders a container. This container has several styles applied, let's analyze what each one is doing.

The first style that we find is `flex: 1`, the [`flex`](layout-props#flex) prop will define how your items are going to "fill" over the available space along your main axis. Since we only have one container, it will take all the available space of the parent component. In this case, it is the only component, so it will take all the available screen space.

The following style is [`justifyContent`](layout-props#justifycontent): "center". This align children of a container in the center of the container's main axis and finally we have [`alignItems`](layout-props#alignitems): "center", which align children of a container in the center of the container's cross axis.

Some of the things in here might not look like JavaScript to you. Don't panic. _This is the future_.

First of all, ES2015 (also known as ES6) is a set of improvements to JavaScript that is now part of the official standard, but not yet supported by all browsers, so often it isn't used yet in web development. React Native ships with ES2015 support, so you can use this stuff without worrying about compatibility. `import`, `from`, `class`, and `extends` in the example above are all ES2015 features. If you aren't familiar with ES2015, you can probably pick it up by reading through sample code like this tutorial has. If you want, [this page](https://babeljs.io/learn-es2015/) has a good overview of ES2015 features.

The other unusual thing in this code example is `<View><Text>Hello world!</Text></View>`. This is JSX - a syntax for embedding XML within JavaScript. Many frameworks use a specialized templating language which lets you embed code inside markup language. In React, this is reversed. JSX lets you write your markup language inside code. It looks like HTML on the web, except instead of web things like `<div>` or `<span>`, you use React components. In this case, `<Text>` is a [Core Component](intro-react-native-components) that displays some text and `View` is like the `<div>` or `<span>`.

## Components

So this code is defining `HelloWorldApp`, a new `Component`. When you're building a React Native app, you'll be making new components a lot. Anything you see on the screen is some sort of component.

## Props

Most components can be customized when they are created, with different parameters. These creation parameters are called props.

Your own components can also use `props`. This lets you make a single component that is used in many different places in your app, with slightly different properties in each place. Refer to `props.{NAME}` in your functional components or `this.props.{NAME}` in your class components. Here's an example:

```SnackPlayer name=Hello%20Props
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center'
  }
})

function Greeting(props) {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
}

function LotsOfGreetings() {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name='Rexxar' />
      <Greeting name='Jaina' />
      <Greeting name='Valeera' />
    </View>
  );
}

export default LotsOfGreetings;
```

Using `name` as a prop lets us customize the `Greeting` component, so we can reuse that component for each of our greetings. This example also uses the `Greeting` component in JSX. The power to do this is what makes React so cool.

The other new thing going on here is the [`View`](view.md) component. A [`View`](view.md) is useful as a container for other components, to help control style and layout.

With `props` and the basic [`Text`](text.md), [`Image`](image.md), and [`View`](view.md) components, you can build a wide variety of static screens. To learn how to make your app change over time, you need to [learn about State](#state).

## State

Unlike props [that are read-only](https://reactjs.org/docs/components-and-props.html#props-are-read-only) and should not be modified, the `state` allows React components to change their output over time in response to user actions, network responses and anything else.

#### What's the difference between state and props in React?

In a React component, the props are the variables that we pass from a parent component to a child component. Similarly, the state are also variables, with the difference that they are not passed as parameters, but rather that the component initializes and manages them internally.

#### Are there differences between React and React Native to handle the state?

![image](https://user-images.githubusercontent.com/20761166/61405629-48270680-a8a8-11e9-906e-aa80d51e51e3.png)

As shown in the image, there is no difference in handling the `state` between [React](https://reactjs.org/docs/state-and-lifecycle.html) and `React Native`. You can use the state of your components both in classes and in functional components using [hooks](https://reactjs.org/docs/hooks-intro.html)!

In the following example we will show the same above counter example using classes.

```SnackPlayer name=Hello%20Classes
import React, { Component } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native'

class App extends Component {
  state = {
    count: 0
  }

  onPress = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

 render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
        >
         <Text>Click me</Text>
        </TouchableOpacity>
        <View style={styles.countContainer}>
          <Text>
            You clicked { this.state.count } times
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginBottom: 10
  }
})

export default App;
```
