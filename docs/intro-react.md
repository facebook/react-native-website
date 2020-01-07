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

The rest of this introduction to React uses pets in its examples: friendly, approachable creatures that need names. Your first component is a Pet:

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

<block class="functional webNote androidNote" />

```SnackPlayer name=JSX
import React from 'react';
import { Text } from 'react-native';

export default function MyPet() {
  return (
    <Text>Hello, I am your pet!</Text>
  );
}
```

<block class="classical webNote androidNote" />

```SnackPlayer name=Hello%20World
import React, { Component } from 'react';
import { Text } from 'react-native';

export default class MyPet extends Component {
    render() {
      return (
          <Text>Hello, I am your pet!</Text>
      );
    }
}
```

<block class="classical functional webNote androidNote" />

To define your `MyPet` component, first use JavaScript’s [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) to import React and React Native’s [`Text`](/react-native/docs/next/text) component:

```jsx
import React from 'react';
import {Text} from 'react-native';
```

Your component starts as a function:

```jsx
function MyPet() {}
```

Whatever a function component returns is rendered as a React element. `MyPet` will render a `<Text>` element:

```jsx
function MyPet() {
  return <Text>Hello, I am your pet!</Text>;
}
```

You can export your function component with JavaScript’s [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) for use throughout your app like so:

```jsx
export default function MyPet() {
  // return your component here!
}
```

> This is just one way to export your component—specifically to work with the Snack Player. However, depending on your app’s file structure, you might need to use a different convention. This [handy cheatsheet on JavaScript imports and exports](https://medium.com/dailyjs/javascript-module-cheatsheet-7bd474f1d829) can help.

Now take a closer look at that `return` statement. `<Text>Hello, I am your pet!</Text>` is using a special JavaScript syntax that makes writing elements convienent: JSX.

## JSX

React and React Native use JSX, a syntax that lets you write elements inside JavaScript like so: `<Text>Hello, I am your pet!</Text>`. The React docs have [a comprehensive guide to JSX](https://reactjs.org/docs/introducing-jsx.html) you can reference to learn even more. Here’s how you would write the previous example with JSX:

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

<block class="functional webNote androidNote" />

```SnackPlayer name=JSX
import React from 'react';
import { Text } from 'react-native';

export default function MyPet() {
  return (
    <Text>Hello, I am your pet!</Text>
  );
}
```

<block class="classical webNote androidNote" />

```SnackPlayer name=JSX
import React, { Component } from 'react';
import { Text } from 'react-native';

export default class MyPet extends Component {
    render() {
        return (
            <Text>Hello, I am your pet!</Text>
        );
    }
}
```

<block class="classical functional webNote androidNote" />

Because JSX is JavaScript, you can use variables inside it. Here you are declaring a name for the pet, `petName`, and embedding it with curly braces inside `<Text>`.

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

<block class="functional webNote androidNote" />

```SnackPlayer name=Curly%20Braces
import React from 'react';
import { Text } from 'react-native';

export default function MyPet() {
  const petName = "Peebo";
  return (
    <Text>Hello, I am {petName}!</Text>
  );
}
```

<block class="classical webNote androidNote" />

```SnackPlayer name=Curly%20Braces
import React, { Component } from 'react';
import { Text } from 'react-native';

export default class MyPet extends Component {
    render() {
        const petName = "Peebo";

        return (
            <Text>Hello, I am {petName}!</Text>
        );
    }
}
```

<block class="classical functional webNote androidNote" />

## Custom Components

You’ve already met [React Native’s Core Components](intro-react-native-components). React lets you nest these components inside each other to create new components. These nestable, reusable components are at the heart of the React paradigm.

For example, you can nest [`Text`](text) and [`TextInput`](textinput) inside a [`View`](view) below, and React Native will render them together:

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

<block class="functional webNote androidNote" />

```SnackPlayer name=Custom%20Components
import React from 'react';
import { Text, TextInput, View } from 'react-native';

export default function MyPet() {
    return (
        <View>
            <Text>Hello, I am...</Text>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                value="Name me!"
            />
        </View>
    );
}
```

<block class="classical webNote androidNote" />

```SnackPlayer name=Custom%20Components
import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

export default class MyPet extends Component {
    render(){
        return (
            <View>
                <Text>Hello, I am...</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    value="Name me!"
                />
            </View>
        );
    }
}
```

<block class="classical functional webNote androidNote" />

<div class="toggler">
  <span>Developer Notes</span>
  <span role="tablist" id="toggle-devNotes">
    <button role="tab" class="button-web" onclick="displayTab('devNotes', 'webNote')">Web</button>
    <button role="tab" class="button-android" onclick="displayTab('devNotes', 'androidNote')">Android</button>
  </span>
</div>

<block class="webNote classical functional" />

> If you’re familiar with web development, `<View>` and `<Text>` might remind you of HTML! You can think of them as the `<div>` and `<p>` tags of application development.

<block class="androidNote classical functional" />

> On Android, you usually put your views inside LinearLayout, FrameLayout, RelativeLayout, etc. to define how the view’s children will be arranged on the screen. In React Native, `View` uses Flexbox for its children’s layout. You can learn more in [our guide to layout with Flexbox](https://facebook.github.io/react-native/docs/next/flexbox).

<block class="webNote androidNote classical functional" />

You can render this component in multiple places without repeating your code by using `<MyPet>`:

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

<block class="functional webNote androidNote" />

```SnackPlayer name=Multiple%20Components
import React from 'react';
import { Text, TextInput, View } from 'react-native';

function MyPet() {
  return (
    <View>
        <Text>Hello, I am your pet!</Text>
    </View>
  );
}

export default function MyPets() {
    return (
      <View>
        <MyPet />
        <MyPet />
        <MyPet />
      </View>
    );
}
```

<block class="classical webNote androidNote" />

```SnackPlayer name=Multiple%20Components
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class MyPet extends Component {
    render(){
        return (
            <Text>Hello, I am your pet!</Text>
        );
    }
}

export default class MyPets extends Component {
    render(){
        return (
            <View>
                <MyPet />
                <MyPet />
                <MyPet />
            </View>
        );
    }
}
```

<block class="functional classical webNote androidNote" />

In the above example, `MyPet` is a React component. In `MyPets`, each `<MyPet>` renders a completely different pet. These pets can all have different data, which you pass to them via props.

## Props

Most Core Components can be customized with different parameters called **props**. “Props” is short for properties.

When using React Native’s Core Components [`Image`](image), you pass it a `prop` named [`source`](image#source) to define what image it shows:

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

<block class="functional webNote androidNote" />

```SnackPlayer name=Props
import React from 'react';
import { Text, View, Image } from 'react-native';

export default function MyPetApp() {
    return (
      <View>
        <Image source='https://placekitten.com/g/193/110' style={{width: 193, height: 110}}/>
        <Text>Hello, I am your pet!</Text>
      </View>
    );
}
```

<block class="classical webNote androidNote" />

```SnackPlayer name=Props
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

export default class MyPet extends Component {
    render(){
        return (
            <View>
                <Image source='https://placekitten.com/g/193/110' style={{width: 193, height: 110}}/>
                <Text>Hello, I am your pet!</Text>
            </View>
        );
    }
}
```

<block class="functional classical webNote androidNote" />

`Image` has [many different props](image#props), including [`style`](image#style), which accepts a JS object of design and layout related property-value pairs.

> Notice the double curly braces `{{ }}` surrounding `style`‘s width and height. In JSX, JavaScript values are referenced with `{}`. For example `<Pet name={["Peebo", "Robert"][0]} />`. However, JS object are **_also_** denoted with curly braces: `{width: 193, height: 110}`. Therefore, to pass a JS object in JSX, you must wrap the object in **another pair** of curly braces: `{{width: 193, height: 110}}`

Your own components can also use props. Props let you customize your components. For example, here each `<MyPet>` passes a different `name` for the `MyPet` function to render:

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

<block class="functional webNote androidNote" />

```SnackPlayer name=Multiple%20Props
import React from 'react';
import { Text, View } from 'react-native';

function MyPet(props) {
  return (
    <View>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
}

export default function MyPets() {
    return (
      <View>
        <MyPet name="Peebo" />
        <MyPet name="Henrietta" />
        <MyPet name="Tenno" />
      </View>
    );
}
```

<block class="classical webNote androidNote" />

```SnackPlayer name=Multiple%20Props
import React, { Component } from 'react';
import { Text, View } from 'react-native';

export class MyPet extends Component {
    render(){
        return (
            <Text>Hello, I am {this.props.name}!</Text>
        );
    }
}

export default class MyPets extends Component {
    render(){
        return (
            <View>
                <MyPet name="Peebo" />
                <MyPet name="Henrietta" />
                <MyPet name="Tenno" />
            </View>
        );
    }
}
```

<block class="functional classical webNote androidNote" />

You can add custom pet pictures to your component by:

- adding an `Image` component to your `MyPet` component
- setting `Image`‘s `source` via `MyPet`‘s `props` with `{props.picURI}`
- then passing `picURI` values in each `MyPet`

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

<block class="functional webNote androidNote" />

```SnackPlayer name=Custom%20Pictures
import React from 'react';
import { Text, View, Image } from 'react-native';

function MyPet(props) {
  return (
    <View>
      <Image source={props.picURI} style={{width: 200, height: 200}}/>
      <Text>Hello, I am {props.name}!</Text>
    </View>
  );
}

export default function MyPets() {
    return (
      <View>
        <MyPet name="Peebo" picURI="https://placekitten.com/g/200/200" />
        <MyPet name="Henrietta" picURI="https://placekitten.com/g/200/200" />
        <MyPet name="Tenno" picURI="https://placekitten.com/g/200/200" />
      </View>
    );
}
```

<block class="classical webNote androidNote" />

```SnackPlayer name=Custom%20Pictures
import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

export class MyPet extends Component {
    render(){
        return (
            <View>
                <Image source={this.props.picURI} style={{width: 200, height: 200}}/>
                <Text>Hello, I am {this.props.name}!</Text>
            </View>
        );
    }
}

export default class MyPets extends Component {
    render(){
        return (
            <View>
                <MyPet name="Peebo" picURI="https://placekitten.com/g/200/200" />
                <MyPet name="Henrietta" picURI="https://placekitten.com/g/200/200" />
                <MyPet name="Tenno" picURI="https://placekitten.com/g/200/200" />
            </View>
        );
    }
}
```

<block class="functional classical webNote androidNote" />

You can build many things with `props` and the Core Components [`Text`](text), [`Image`](image), and [`View`](view)! But to build something interactive, you’ll need `state`.

## State

Props are set by the parent component and can only be changed by the parent component passing down new values. But user interfaces need to accept new data (input) directly and change according to human interaction. Fortunately, React has `state`, which lets you get and set data associated with a component. You can manipulate a component’s state by calling [React’s `useState` Hook](https://reactjs.org/docs/hooks-state.html).

> A Hook is a kind of function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components. You can learn more about [other kinds of Hooks in the React documentation.](https://reactjs.org/docs/hooks-intro.html)

You can manipulate a component’s state by calling `useState` inside its function:

`const [currentValue, setNewValue] = useState("Initial value.");`

You can use `useState` to track any kind of data, including numbers:

`const [quantity, pickQuantity] = useState(0);`

Calling `useState` does three things:

- it creates a “state variable”
- it creates a function to set its value
- it sets its initial value

Let’s break `[a, b] = useState(c)` down:

- `a` is the “state variable”—it refers to the current value of the component’s state
- `b` is the name of the function you use to update the state variable
- `c` is the value you initialize the state variable with

```SnackPlayer name=State
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

function MyPet() {

  const [name, setName] = useState("What's my name again?");

  return (
    <View>
        <Text>Hello, I am...{name}!</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => setName(text)}
        />
    </View>
  );
}

export default function MyPets() {
    return (
        <>
            <MyPet />
            <MyPet />
        </>
    );
}
```

> See the `<>` and `</>` above? These bits of JSX wrap [fragments](https://reactjs.org/docs/fragments.html) inside a component. Adjacent JSX elements must be wrapped in an enclosing tag. This tag lets you do that without nesting an extra `View`.

First, you will want to import `useState` from React like so:

```jsx
import React, {useState} from 'react';
```

In this example, inside your `Pet` function, `useState` creates a `name` state variable:

```jsx
const [name, setName] = useState("What's my name again?");
```

Then you add `onChangeText` to the `<TextInput>`. This fires every time the `<TextInput>`‘s value changes (every time a user adds a character of text).

```jsx
onChangeText={(text) => setName(text)}
```

This uses the `setName` you defined with the `useState` Hook above to update your state variable `defaultText` every time `onChangeText` fires. (You might set state when you have new data from the server, or from user input, or even from a timer!)

> You might’ve noticed that although `name` is a [const](https://developer.mozilla.org/Web/JavaScript/Reference/Statements/const) , it is seemingly reassignable! What is happening is that every time a user inputs a letter into `<TextInput>`, `setName()` fires to update the state const `name`. When a state-setting function like `setName` is called, its component will re-render, running its function again. In this case `MyPet` will re-render its `Pet`—discarding the old state const `name` in the process!

---

Now that you’ve covered both React and React Native’s Core Components, let’s dive deeper on some of these core components by looking at [handling `<TextInput>`](handling-text-input).
