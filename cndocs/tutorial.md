---
id: tutorial
title: 核心概念
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native 看起来很像 React，只不过它使用原生组件而非 Web 组件作为构建模块。因此，要理解 React Native 应用的基本结构，你需要了解一些 React 的基础概念，例如 JSX、组件、`state` 和 `props`。即使你已经熟悉 React，仍然需要学习一些 React Native 特有的知识，比如原生组件的使用。本教程面向所有读者，无论你是否有 React 经验。

让我们开始吧。

## Hello World

按照我们悠久的传统，首先来构建一个只显示 "Hello, world!" 的应用：

```SnackPlayer name=Hello%20World
import React from 'react';
import {Text, View} from 'react-native';

const HelloWorldApp = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Hello, world!</Text>
    </View>
  );
};
export default HelloWorldApp;
```

你可以直接在上面的在线模拟器中修改代码试试效果。也可以将代码粘贴到本地项目的 `App.js` 文件中运行。

## 这段代码是什么意思？

1. 首先，我们需要导入 `React` 以使用 `JSX`，JSX 会被转换为各平台的原生组件。
2. 在第二行，我们从 `react-native` 中导入了 `Text` 和 `View` 组件。

然后我们定义了 `HelloWorldApp` 函数，这是一个[函数式组件](https://react.dev/reference/react/Component)，其行为与 React Web 中的完全一致。该函数返回一个带有样式的 `View` 组件，其子元素是一个 `Text` 组件。

`Text` 组件用于渲染文本，`View` 组件用于渲染容器。这个容器应用了几个样式，我们来逐一分析：

第一个样式是 `flex: 1`，[`flex`](layout-props#flex) 属性定义了子元素如何沿主轴方向"填充"可用空间。由于我们只有一个容器，它将占据父组件的所有可用空间。在本例中，它是唯一的组件，因此会占据整个屏幕空间。

接下来是 [`justifyContent`](layout-props#justifycontent): "center"，它将容器的子元素沿主轴居中对齐。最后是 [`alignItems`](layout-props#alignitems): "center"，它将容器的子元素沿交叉轴居中对齐。

上面的代码中有些地方看起来可能不太像 JavaScript——别慌，这就是"未来的"JavaScript。

首先，ES2015（也称为 ES6）是一套 JavaScript 的改进标准，现在已成为官方标准的一部分，但尚未被所有浏览器完全支持，因此在 Web 开发中还未被广泛使用。React Native 内置了对 ES2015 的支持，你可以放心使用，无需担心兼容性。上面示例中的 `import`、`export`、`const` 和箭头函数 `from` 都是 ES2015 的特性。如果你不熟悉 ES2015，可以通过阅读本教程中的示例代码来熟悉。如果需要更系统的学习，[这个页面](https://babeljs.io/learn-es2015/)提供了 ES2015 特性的全面概述。

代码中另一个看起来不太常规的部分是 `<View><Text>Hello world!</Text></View>`。这是 JSX——一种在 JavaScript 中嵌入 XML 的语法。很多框架使用专门的模板语言在标记中嵌入代码，而 React 恰好反其道行之。JSX 让你在代码中编写标记。它看起来很像 Web 上的 HTML，区别在于你使用的不是 `<div>` 或 `<span>` 等 Web 元素，而是 React 组件。这里 `<Text>` 是一个用于显示文本的[核心组件](intro-react-native-components)，`View` 则类似于 `<div>` 或 `<span>`。

## 组件

上面的代码定义了 `HelloWorldApp`——一个新的 `组件`。在构建 React Native 应用时，你会频繁地创建新组件。屏幕上看到的任何东西都是某种组件。

## Props（属性）

大多数组件在创建时可以通过不同的参数进行自定义配置，这些参数被称为 props（属性）。

你自己创建的组件也可以使用 `props`。这使得你可以编写一个组件，在应用的不同位置复用，每个地方传入略有不同的属性。在函数式组件中通过 `props.YOUR_PROP_NAME` 访问，在类组件中通过 `this.props.YOUR_PROP_NAME` 访问。示例如下：

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Hello%20Props&ext=js
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

const Greeting = props => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name="Rexxar" />
      <Greeting name="Jaina" />
      <Greeting name="Valeera" />
    </View>
  );
};

export default LotsOfGreetings;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Hello%20Props&ext=tsx
import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
  },
});

type GreetingProps = {
  name: string;
};

const Greeting = (props: GreetingProps) => {
  return (
    <View style={styles.center}>
      <Text>Hello {props.name}!</Text>
    </View>
  );
};

const LotsOfGreetings = () => {
  return (
    <View style={[styles.center, {top: 50}]}>
      <Greeting name="Rexxar" />
      <Greeting name="Jaina" />
      <Greeting name="Valeera" />
    </View>
  );
};

export default LotsOfGreetings;
```

</TabItem>
</Tabs>

通过 `name` 作为 prop 传入，我们可以自定义 `Greeting` 组件，从而在每个问候语中复用该组件。这个例子还在 JSX 中使用了 `Greeting` 组件——这种能力正是 React 强大的关键所在。

这里还出现了 [`View`](view.md) 组件。[`View`](view.md) 作为其他组件的容器，有助于控制样式和布局。

通过 `props` 以及基础的 [`Text`](text.md)、[`Image`](image.md) 和 [`View`](view.md) 组件，你可以构建出各种静态页面。要学习如何让应用能够响应变化，你需要[了解 State](#state)。

## State（状态）

与 [props 是只读的](https://react.dev/reference/react/Component#props)且不应被修改不同，`state` 允许 React 组件根据用户操作、网络响应等随时间改变其输出。

#### React 中 state 和 props 有什么区别？

在 React 组件中，props 是从父组件传递给子组件的变量。而 state 同样是变量，区别在于它不是作为参数传入的，而是由组件内部初始化和管理的。

#### React 和 React Native 在处理 state 上有区别吗？

<div className="two-columns">

```tsx
// ReactJS Counter Example using Hooks!

import React, {useState} from 'react';



const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="container">
      <p>You clicked {count} times</p>
      <button
        onClick={() => setCount(count + 1)}>
        Click me!
      </button>
    </div>
  );
};


// CSS
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}

```

```tsx
// React Native Counter Example using Hooks!

import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text>You clicked {count} times</Text>
      <Button
        onPress={() => setCount(count + 1)}
        title="Click me!"
      />
    </View>
  );
};

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
```

</div>

如上所示，[React](https://react.dev/learn/state-a-components-memory) 和 React Native 在处理 `state` 上没有区别。你可以在类组件和函数式组件中使用 state，函数式组件通过 [Hooks](https://react.dev/reference/react/useState) 来使用。

下面的示例使用类组件实现了同样的计数器：

```SnackPlayer name=Hello%20Classes
import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';

class App extends Component {
  state = {
    count: 0,
  };

  onPress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={this.onPress}>
          <Text>Click me</Text>
        </TouchableOpacity>
        <View>
          <Text>You clicked {this.state.count} times</Text>
        </View>
      </View>
    );
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
    marginBottom: 10,
  },
});

export default App;
```
