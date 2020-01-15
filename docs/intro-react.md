---
id: intro-react
title: Key React Concepts
---

React Native runs on [React](https://reactjs.org/), a popular open source library for building user interfaces with JavaScript. To make the most of React Native, it helps to understand React itself. This section can get you started or can serve as a refresher course.

We’re going to cover the core concepts behind React:

- components
- JSX
- custom components
- props
- state

If you want to dig deeper, we encourage you to check out [React's official documentation](https://reactjs.org/docs/getting-started.html).

## Your first component

The rest of this introduction to React uses cats in its examples: friendly, approachable creatures that need names and a cafe to work in. Here is your very first Cat component:

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

```SnackPlayer name=Your%20Cat
import React from 'react';
import { Text } from 'react-native';

export default function Cat() {
  return (
    <Text>Hello, I am your cat!</Text>
  );
}
```

Here is how you do it: To define your `Cat` component, first use JavaScript’s [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to import React and React Native’s [`Text`](/react-native/docs/next/text) Core Component:

```jsx
import React from 'react';
import {Text} from 'react-native';
```

Your component starts as a function:

```jsx
function Cat() {}
```

Whatever a function component returns is rendered as a React element. `Cat` will render a `<Text>` element:

```jsx
function Cat() {
  return <Text>Hello, I am your cat!</Text>;
}
```

You can export your function component with JavaScript’s [`export default`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) for use throughout your app like so:

```jsx
export default function Cat() {
  return <Text>Hello, I am your cat!</Text>;
}
```

<block class="classical syntax" />

Class components tend to be a bit more verbose than function components.

```SnackPlayer name=Your%20Cat
import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Cat extends Component {
  render() {
    return (
      <Text>Hello, I am your cat!</Text>
    );
  }
}
```

You additionally import `Component` from React:

```jsx
import React, {Component} from 'react';
```

Your component starts as a class extending `Component` instead of as a function:

```jsx
class Cat extends Component {}
```

Class components have a `render()` function. Whatever is returned inside it is rendered as a React element:

```jsx
class Cat extends Component {
  render() {
    return <Text>Hello, I am your cat!</Text>;
  }
}
```

And as with function components, you can export your class component:

```jsx
export default class Cat extends Component {
  render() {
    return <Text>Hello, I am your cat!</Text>;
  }
}
```

<block class="endBlock syntax" />

> This is one of many ways to export your component. This kind of export works well with the Snack Player. However, depending on your app’s file structure, you might need to use a different convention. This [handy cheatsheet on JavaScript imports and exports](https://medium.com/dailyjs/javascript-module-cheatsheet-7bd474f1d829) can help.

Now take a closer look at that `return` statement. `<Text>Hello, I am your cat!</Text>` is using a kind of JavaScript syntax that makes writing elements convenient: JSX.

## JSX

React and React Native use JSX, a syntax that lets you write elements inside JavaScript like so: `<Text>Hello, I am your cat!</Text>`. The React docs have [a comprehensive guide to JSX](https://reactjs.org/docs/jsx-in-depth.html) you can reference to learn even more. Because JSX is JavaScript, you can use variables inside it. Here you are declaring a name for the cat, `name`, and embedding it with curly braces inside `<Text>`.

```SnackPlayer name=Curly%20Braces
import React from 'react';
import { Text } from 'react-native';

export default function Cat() {
  const name = "Maru";
  return (
    <Text>Hello, I am {name}!</Text>
  );
}
```

Any JavaScript will work between curly braces, including functions like `{fullName("Rum", Tum", "Tugger")}`:

```SnackPlayer name=Curly%20Braces
import React from 'react';
import { Text } from 'react-native';

export default function Cat() {
  function fullName(firstName, secondName, thirdName) {
    return firstName + " " + secondName + " " + thirdName;
  }
  return (
    <Text>Hello, I am {fullName("Rum", "Tum", "Tugger")}!</Text>
  );
}
```

You can think of curly braces as creating a portal into JS functionality in your JSX!

> Because JSX is included in the React library, it won’t work if you don’t have `import React from 'react'` at the top of your file!

## Custom Components

You’ve already met [React Native’s Core Components](intro-react-native-components). React lets you nest these components inside each other to create new components. These nestable, reusable components are at the heart of the React paradigm.

For example, you can nest [`Text`](text) and [`TextInput`](textinput) inside a [`View`](view) below, and React Native will render them together:

```SnackPlayer name=Custom%20Components
import React from 'react';
import { Text, TextInput, View } from 'react-native';

export default function Cat() {
  return (
    <View>
      <Text>Hello, I am...</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        defaultValue="Name me!"
      />
    </View>
  );
}
```

<div class="toggler">
  <span>Developer Notes</span>
  <span role="tablist" class="toggle-devNotes">
    <button role="tab" class="button-webNote" onclick="displayTabs('devNotes', 'webNote')">Web</button>
    <button role="tab" class="button-androidNote" onclick="displayTabs('devNotes', 'androidNote')">Android</button>
  </span>
</div>

<block class="webNote devNotes" />

> If you’re familiar with web development, `<View>` and `<Text>` might remind you of HTML! You can think of them as the `<div>` and `<p>` tags of application development.

<block class="androidNote devNotes" />

> On Android, you usually put your views inside LinearLayout, FrameLayout, RelativeLayout, etc. to define how the view’s children will be arranged on the screen. In React Native, `View` uses Flexbox for its children’s layout. You can learn more in [our guide to layout with Flexbox](flexbox).

<block class="endBlock devNotes" />

You can render this component multiple times and multiple places without repeating your code by using `<Cat>`:

```SnackPlayer name=Multiple%20Components
import React from 'react';
import { Text, TextInput, View } from 'react-native';

function Cat() {
  return (
    <View>
      <Text>I am a also cat!</Text>
    </View>
  );
}

export default function Cafe() {
  return (
    <View>
      <Cat />
      <Cat />
      <Cat />
    </View>
  );
}
```

You can put as many cats in your cafe as you like. Each `<Cat>` renders a unique element that can have its own data—which you pass via props.

## Props

**Props** is short for “properties.” Props let you customize React components. For example, here each `<Cat>` passes a different `name` for the `Cat` function to render:

```SnackPlayer name=Multiple%20Props
import React from 'react';
import { Text, View } from 'react-native';

function Cat(props) {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
}

export default function Cafe() {
  return (
    <View>
      <Cat name="Maru" />
      <Cat name="Jellylorum" />
      <Cat name="Spot" />
    </View>
  );
}
```

Most of React Native’s Core Components can be customized with props, too. For example, when using [`Image`](image), you pass it a prop named [`source`](image#source) to define what image it shows:

```SnackPlayer name=Props
import React from 'react';
import { Text, View, Image } from 'react-native';

export default function CatApp() {
  return (
    <View>
      <Image
        source='https://placekitten.com/g/193/110'
        style={{width: 193, height: 110}}
      />
      <Text>Hello, I am your cat!</Text>
    </View>
  );
}
```

`Image` has [many different props](image#props), including [`style`](image#style), which accepts a JS object of design and layout related property-value pairs.

> Notice the double curly braces `{{ }}` surrounding `style`‘s width and height. In JSX, JavaScript values are referenced with `{}`. This is handy if you are passing something other than a string as props, like an array or number (`<Cat food={["fish", "kibble"]} /> age={2}`). However, JS object are **_also_** denoted with curly braces: `{width: 193, height: 110}`. Therefore, to pass a JS object in JSX, you must wrap the object in **another pair** of curly braces: `{{width: 193, height: 110}}`

You can add custom cat pictures to your component by:

- adding an `Image` component to your `Cat` component
- setting `Image`‘s `source` via `Cat`‘s props with `{props.picURI}`
- then passing `picURI` values in each `Cat`

```SnackPlayer name=Custom%20Pictures
import React from 'react';
import { Text, View, Image } from 'react-native';

function Cat(props) {
  return (
    <View>
      <Image
        source={props.picURI}
        style={{width: 200, height: 200}}
      />
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
}

export default function Cafe() {
  return (
    <View>
      <Cat name="Maru" picURI="https://placekitten.com/g/200/200" />
      <Cat name="Jellylorum" picURI="https://placekitten.com/g/200/200" />
      <Cat name="Spot" picURI="https://placekitten.com/g/200/200" />
    </View>
  );
}
```

You can build many things with props and the Core Components [`Text`](text), [`Image`](image), and [`View`](view)! But to build something interactive, you’ll need state.

## State

Props are set by the parent component and can only be changed by the parent component passing down new values. But for individual components to change according to human interactions, they need to be able to accept and store their own data. Fortunately, React components can have their own state you can get and set data from.

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      State with Function Components
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      State with Class Components
    </li>
  </ul>
</div>

<block class="functional syntax" />

You can add state to a component by calling [React’s `useState` Hook](https://reactjs.org/docs/hooks-state.html).

> A Hook is a kind of function that lets you “hook into” React features. For example, `useState` is a Hook that lets you add state to function components. You can learn more about [other kinds of Hooks in the React documentation.](https://reactjs.org/docs/hooks-intro.html)

You can declare a component’s state by calling `useState` inside its function like this:

```JS
function demonstrationComponent() {
  const [currentValue, setValue] = useState("Initial value.");
  // ...
}
```

You can use `useState` to track any kind of data, including numbers:

```JS
const [quantity, pickQuantity] = useState(0);
```

Calling `useState` does two things:

- it creates a “state variable” with an initial value
- it creates a function to set that state variable’s value

Let’s break `[a, b] = useState(c)` down:

- `a` is the “state variable”—it refers to the current value of the component’s state
- `b` is the name of the function you use to update the state variable
- `c` is the value you initialize the state variable with

```SnackPlayer name=State
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

function Cat() {

  const [name, setName] = useState("What's my name again?");

  return (
    <View>
      <Text>Hello, I am...{name}!</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1
        }}
        onChangeText={
          (text) => setName(text)
        }
      />
    </View>
  );
}

export default function Cafe() {
  return (
    <>
      <Cat />
      <Cat />
    </>
  );
}
```

> See the `<>` and `</>` above? These bits of JSX are [fragments](https://reactjs.org/docs/fragments.html). Adjacent JSX elements must be wrapped in an enclosing tag. Fragments let you do that without nesting an extra, unnecessary wrapping element like `View`.

First, you will want to import `useState` from React like so:

```jsx
import React, {useState} from 'react';
```

In this example, inside your `Cat` function, `useState` creates a `name` state variable:

```jsx
const [name, setName] = useState("What's my name again?");
```

Then you add `onChangeText` to the `<TextInput>`. This fires every time the `<TextInput>`‘s value changes (every time a user adds a character of text).

```jsx
onChangeText={(text) => setName(text)}
```

This uses the `setName` you defined with the `useState` Hook above to update your state variable `name` every time `onChangeText` fires. You might set state when you have new data from the server, or from user input, or even from a timer.

> You might’ve noticed that although `name` is a [const](https://developer.mozilla.org/Web/JavaScript/Reference/Statements/const), it is seemingly reassignable! What is happening is that every time a user inputs a letter into `<TextInput>`, `setName()` fires to update the state const `name`. When a state-setting function like `setName` is called, its component will re-render, running its function again. In this case `Cat` will re-render its `<Cat>`—discarding the old state const `name` in the process!

<block class="classical syntax" />
The older class components approach is a little different when it comes to state.

```SnackPlayer name=State%20and%20Class%20Components
import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

export class Cat extends Component {
  state = {name: "What's my name again?!"}

  render(){
    return (
      <View>
        <Text>Hello, I am...{this.state.name}!</Text>
        <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1
          }}
          onChangeText={
            (text) => this.setState({name: text})
          }
        />
      </View>
    );
  }
}

export default class Cafe extends Component {
  render(){
    return (
      <>
        <Cat />
        <Cat />
      </>
    );
  }
}
```

In class components, state is stored in a state object:

```jsx
state = {name: "What's my name again?!"};
```

You access this object inside your component with `this.state`:

```jsx
<Text>Hello, I am...{this.state.name}!</Text>
```

And you set individual values inside the state object with `this.setState()`:

```jsx
this.setState({name: text});
```

> Do not change your component's state directly by assigning it a new value with `this.state.name = text`. Calling `this.setState()` allows React to track changes made to state that trigger rerendering. Setting state directly can break your app's reactivity!

<block class="endBlock syntax" />

---

Now that you’ve covered both React and React Native’s Core Components, let’s dive deeper on some of these core components by looking at [handling `<TextInput>`](handling-text-input).
