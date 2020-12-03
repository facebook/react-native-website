---
id: intro-react
title: React基础
description: To understand React Native fully, you need a solid foundation in React. This short introduction to React can help you get started or get refreshed.
---

React Native 的基础是[React](https://zh-hans.reactjs.org/)， 是在 web 端非常流行的开源 UI 框架。要想掌握 React Native，先了解 React 框架本身是非常有帮助的。本文旨在为初学者介绍一些 react 的入门知识。

本文主要会探讨以下几个 React 的核心概念：

- components 组件
- JSX
- props 属性
- state 状态

如果你想更深一步学习，我们建议你阅读[React 的官方文档](https://zh-hans.reactjs.org/)，它也提供有中文版。

## 尝试编写一个组件

本文档会用“Cat”这种有个名字和咖啡馆就能开始工作的人畜无害的生物来作为例子。下面是我们的第一个 Cat 组件:

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      函数组件示例
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class组件示例
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

要定义一个`Cat`组件，第一步要使用[`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)语句来引入`React`以及`React Native`的[`Text`](/react-native/docs/next/text)组件：

```jsx
import React from 'react';
import { Text } from 'react-native';
```

然后一个简单的函数就可以作为一个组件：

```jsx
function Cat() {}
```

这个函数的`返回值`就会被渲染为一个 React 元素。这里`Cat`会渲染一个`<Text>`元素：

```jsx
function Cat() {
  return <Text>Hello, I am your cat!</Text>;
}
```

这里我们还使用了[`export default`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)语句来导出这个组件，以使其可以在其他地方引入使用：

```jsx
export default function Cat() {
  return <Text>Hello, I am your cat!</Text>;
}
```

<block class="classical syntax" />

Class 组件比函数组件写起来要繁琐一些。

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

你还需要从 React 中引入`Component`：

```jsx
import React, { Component } from 'react';
```

定义组件首先要继承(extends)自`Component`：

```jsx
class Cat extends Component {}
```

Class 组件必须有一个`render()`函数，它的返回值会被渲染为一个 React 元素：

```jsx
class Cat extends Component {
  render() {
    return <Text>Hello, I am your cat!</Text>;
  }
}
```

和函数组件一样，我们也可以导出 class 组件：

```jsx
export default class Cat extends Component {
  render() {
    return <Text>Hello, I am your cat!</Text>;
  }
}
```

<block class="endBlock syntax" />

> 上面只是导出组件的写法之一。你还可以看看这篇博客整理[handy cheatsheet on JavaScript imports and exports](https://www.samanthaming.com/tidbits/79-module-cheatsheet/)整理的各种不同的写法。下面我们来看看这个`return` 语句。`<Text>Hello, I am your cat!</Text>`是一种简化 React 元素的写法，这种语法名字叫做 JSX。

## JSX

React 和 React Native 都使用**JSX 语法**，这种语法使得你可以在 JavaScript 中直接输出元素：`<Text>Hello, I am your cat!</Text>`。React 的文档有一份完整的[JSX 指南](https://zh-hans.reactjs.org/docs/jsx-in-depth.html#gatsby-focus-wrapper)可供你参考。因为 JSX 本质上也就是 JavaScript，所以你可以在其中直接使用变量。这里我们为猫猫的名字声明了一个变量`name`，并且用括号把它放在了`<Text>`之中。

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

括号中可以使用任意 JavaScript 表达式，包括调用函数，例如`{getFullName("Rum", Tum", "Tugger")}`：

```SnackPlayer name=Curly%20Braces
import React from 'react';
import { Text } from 'react-native';
export default function Cat() {
  function getFullName(firstName, secondName, thirdName) {
    return firstName + " " + secondName + " " + thirdName;
  }
  return (
    <Text>
      Hello, I am {getFullName("Rum", "Tum", "Tugger")}!
    </Text>
  );
}
```

你可以把括号`{}`想象成在 JSX 中打开了一个可以调用 JS 功能的传送门！

> 因为 JSX 语法糖的实质是调用`React.createElement`方法，所以你必须在文件头部引用`import React from 'react'`。

## 自定义组件

你应该已经了解[React Native 的核心组件](intro-react-native-components)了。 React 使得你可以通过嵌套这些组件来创造新组件。这些可嵌套可复用的组件正是 React 理念的精髓。

例如你可以把[`Text`](text)和[`TextInput`](textinput)嵌入到[`View`](view) 中，React Native 会把它们一起渲染出来：

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
  <span>对开发者的提示：</span>
  <span role="tablist" class="toggle-devNotes">
    <button role="tab" class="button-webNote" onclick="displayTabs('devNotes', 'webNote')">Web</button>
    <button role="tab" class="button-androidNote" onclick="displayTabs('devNotes', 'androidNote')">Android</button>
  </span>
</div>

<block class="webNote devNotes" />

> 如果你熟悉 web 开发，`<View>`和`<Text>`应该能让你想起 HTML。你可以把它们看作是应用开发中的`<div>`和`<p>`标签。

<block class="androidNote devNotes" />

> 在 Android 上，常见的做法是把视图放入`LinearLayout`, `FrameLayout`或是`RelativeLayout`等布局容器中来定义子元素如何排列。 In React Native, `View` uses Flexbox for its children’s layout. You can learn more in [our guide to layout with Flexbox](flexbox).

<block class="endBlock devNotes" />

这样你就可以在别处通过`<Cat>`来任意引用这个组件了：

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
      <Text>Welcome!</Text>
      <Cat />
      <Cat />
      <Cat />
    </View>
  );
}
```

我们把包含着其他组件的组件称为**父组件或父容器**。这里`Cafe`是一个父组件，而每个`Cat`则是**子组件**。

你的咖啡店里，想养多少只猫都行！注意每只`<Cat>`渲染的都是不同的元素——你可以使用不同的 props 属性来定制它们。

## Props 属性

**Props** 是“properties”（属性）的简写。Props 使得我们可以定制组件。比如可以给每只`<Cat>`一个不同的`name`：

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

React Native 的绝大多数核心组件都提供了可定制的 props。例如，在使用[`Image`](image)组件时，你可以给它传递一个[`source`](image#source)属性，用来指定它显示的内容：

```SnackPlayer name=Props
import React from 'react';
import { Text, View, Image } from 'react-native';
export default function CatApp() {
  return (
    <View>
      <Image
        source="https://facebook.github.ioassets/p_cat1.png"
        style={{width: 200, height: 200}}
      />
      <Text>Hello, I am your cat!</Text>
    </View>
  );
}
```

`Image` 有[很多不同的 props](image#props)，[`style`](image#style)也是其中之一，它接受对象形式的样式和布局键值对。

> 请留意我们在指定`style`属性的宽高时所用到的双层括号`{{ }}`。在JSX中，引用JS值时需要使用`{}`括起来。在你需要传递非字符串值（比如数组或者数字）的时候会经常用到这种写法：`<Cat food={["fish", "kibble"]} /> age={2}`。然而我们在JS中定义一个对象时，本来**_也_**需要用括号括起来：`{width: 200, height: 200}`。因此要在JSX中传递一个JS对象值的时候，就必须用到两层括号：`{{width: 200, height: 200}}`。

使用核心组件[`Text`](text), [`Image`](image)以及[`View`](view)搭配props已经可以做不少东西了！但是如果想要做一些用户交互，那我们还需要用到状态（state）。

## State 状态

如果把props理解为定制组件渲染的参数， 那么**state**就像是组件的私人数据记录。状态用于记录那些随时间或者用户交互而变化的数据。状态使组件拥有了记忆！

> 按惯例来说，props用来配置组件的第一次渲染（初始状态）。Use state to keep track of any component data that you expect to change over time. The following example takes place in a cat cafe where two hungry cats are waiting to be fed. Their hunger, which we expect to change over time (unlike their names), is stored as state. To feed the cats, press their buttons—which will update their state.

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      函数组件的状态 State
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class 组件的状态 State
    </li>
  </ul>
</div>

<block class="functional syntax" />

You can add state to a component by calling [React’s `useState` Hook](https://zh-hans.reactjs.org/docs/hooks-state.html). A Hook is a kind of function that lets you “hook into” React features. For example, `useState` is a Hook that lets you add state to function components. You can learn more about [other kinds of Hooks in the React documentation.](https://zh-hans.reactjs.org/docs/hooks-intro.html)

```SnackPlayer name=State
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
function Cat(props) {
  const [isHungry, setIsHungry] = useState(true);
  return (
    <View>
      <Text>
        I am {props.name}, and I am {isHungry ? "hungry" : "full"}!
      </Text>
      <Button
        onPress={() => {
          setIsHungry(false);
        }}
        disabled={!isHungry}
        title={isHungry ? "Pour me some milk, please!" : "Thank you!"}
      />
    </View>
  );
}
export default function Cafe() {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
}
```

首先要从 react 中引入`useState`：

```jsx
import React, { useState } from 'react';
```

然后可以通过在函数内调用`useState`来为组件声明状态。In this example, `useState` creates an `isHungry` state variable:

```jsx
function Cat(props) {
  const [isHungry, setIsHungry] = useState(true);
  // ...
}
```

> 你可以使用`useState`来记录各种类型的数据： strings, numbers, Booleans, arrays, objects。例如你可以这样来记录猫咪被爱抚的次数：`const [timesPetted, setTimesPetted] = useState(0)`。`useState`实质上做了两件事情：

- it creates a “state variable” with an initial value—in this case the state variable is `isHungry` and its initial value is `true`
- it creates a function to set that state variable’s value—`setIsHungry`

取什么名字并不重要。但脑海中应该形成这样一种模式：`[<取值>, <设值>] = useState(<initialValue>)`.

下面我们添加一个按钮[`Button`](button)组件，并给它一个`onPress`的prop：

```jsx
<Button
  onPress={() => {
    setIsHungry(false);
  }}
  //..
/>
```

现在当用户点击按钮时，`onPress`函数会被触发，从而调用`setIsHungry(false)`。此时状态变量`isHungry`就被设为了`false`。当`isHungry`为false的时候，`Button`的`disabled`属性就变成了`true` ，其`title`也相应变化：

```jsx
<Button
  //..
  disabled={!isHungry}
  title={isHungry ? 'Pour me some milk, please!' : 'Thank you!'}
/>
```

> 你可能注意到虽然`isHungry`使用了常量关键字[const](https://developer.mozilla.org/Web/JavaScript/Reference/Statements/const)，但它看起来还是可以修改！ What is happening is when a state-setting function like `setIsHungry` is called, its component will re-render. In this case the `Cat` function will run again—and this time, `useState` will give us the next value of `isHungry`. Finally, put your cats inside a `Cafe` component:

```jsx
export default function Cafe() {
  return (
    <>
      <Cat name="Munkustrap" />
      <Cat name="Spot" />
    </>
  );
}
```

<block class="classical syntax" />

老式的 class 组件在使用 state 的写法上有所不同：

```SnackPlayer name=State%20and%20Class%20Components
import React, { Component } from "react";
import { Button, Text, View } from "react-native";
export class Cat extends Component {
  state = { isHungry: true };
  render() {
    return (
      <View>
        <Text>
          I am {this.props.name}, and I am
          {this.state.isHungry ? " hungry" : " full"}!
        </Text>
        <Button
          onPress={() => {
            this.setState({ isHungry: false });
          }}
          disabled={!this.state.isHungry}
          title={
            this.state.isHungry ? "Pour me some milk, please!" : "Thank you!"
          }
        />
      </View>
    );
  }
}
export default class Cafe extends Component {
  render() {
    return (
      <>
        <Cat name="Munkustrap" />
        <Cat name="Spot" />
      </>
    );
  }
}
```

再次强调，对于 class 组件始终要记得从 React 中引入`Component`：

```jsx
import React, { Component } from 'react';
```

在 class 组件中， state 以对象的形式存放：

```jsx
export class Cat extends Component {
  state = { isHungry: true };
  //..
}
```

和使用`this.props`获取props一样，在组件中获取状态也是通过`this.state`：

```jsx
<Text>
  I am {this.props.name}, and I am
  {this.state.isHungry ? ' hungry' : ' full'}!
</Text>
```

And you set individual values inside the state object by passing an object with the key value pair for state and its new value to `this.setState()`:

```jsx
<Button
  onPress={() => {
    this.setState({ isHungry: false });
  }}
  // ..
</Button>
```

> 不要直接给组件state赋值（比如`this.state.hunger = false`）来修改状态。Calling `this.setState()` allows React to track changes made to state that trigger rerendering. Setting state directly can break your app's reactivity! When `this.state.isHungry` is false, the `Button`’s `disabled` prop is set to `false` and its `title` also changes:

```jsx
<Button
  // ..
  disabled={!this.state.isHungry}
  title={
    this.state.isHungry
      ? 'Pour me some milk, please!'
      : 'Thank you!'
  }
/>
```

最后，把你的猫放到一个咖啡店`Cafe`组件中：

```jsx
export default class Cafe extends Component {
  render() {
    return (
      <>
        <Cat name="Munkustrap" />
        <Cat name="Spot" />
      </>
    );
  }
}
```

<block class="endBlock syntax" />

> 注意到上面的`<>`和`</>`了吗？ 这一对JSX标签称为[Fragments（片段）](https://zh-hans.reactjs.org/docs/fragments.html)。由于JSX的语法要求根元素必须为单个元素，如果我们需要在根节点处并列多个元素，在这之前就不得不额外套一个没有实际用处的`View`。但有了Fragment后就不需要引入额外的容器视图了。

---

现在你应该已经差不多了解React和React Native的核心组件与思想了。下面可以试着深入学习一些核心组件的用法，比如如何[处理文本输入`<TextInput>`](handling-text-input)。
