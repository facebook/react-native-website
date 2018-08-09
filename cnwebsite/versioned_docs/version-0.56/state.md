---
id: version-0.56-state
title: State（状态）
original_id: state
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

我们使用两种数据来控制一个组件：`props`和`state`。`props`是在父组件中指定，而且一经指定，在被指定的组件的生命周期中则不再改变。 对于需要改变的数据，我们需要使用`state`。

一般来说，你需要在 constructor 中初始化`state`（译注：这是 ES6 的写法，早期的很多 ES5 的例子使用的是 getInitialState 方法来初始化 state，这一做法会逐渐被淘汰），然后在需要修改时调用`setState`方法。

假如我们需要制作一段不停闪烁的文字。文字内容本身在组件创建时就已经指定好了，所以文字内容应该是一个`prop`。而文字的显示或隐藏的状态（快速的显隐切换就产生了闪烁的效果）则是随着时间变化的，因此这一状态应该写到`state`中。

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { Text, View } from 'react-native';

class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = { showText: true };

    // 每1000毫秒对showText状态做一次取反操作
    setInterval(() => {
      this.setState(previousState => {
        return { showText: !previousState.showText };
      });
    }, 1000);
  }

  render() {
    // 根据当前showText的值决定是否显示text内容
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}

export default class BlinkApp extends Component {
  render() {
    return (
      <View>
        <Blink text='I love to blink' />
        <Blink text='Yes blinking is so great' />
        <Blink text='Why did they ever take this out of HTML' />
        <Blink text='Look at me look at me look at me' />
      </View>
    );
  }
}
```

实际开发中，我们一般不会在定时器函数（setInterval、setTimeout 等）中来操作 state。典型的场景是在接收到服务器返回的新数据，或者在用户输入数据之后。你也可以使用一些“状态容器”比如[Redux](http://redux.js.org/index.html)来统一管理数据流。

每次调用`setState`时，BlinkApp 都会重新执行 render 方法重新渲染。这里我们使用定时器来不停调用`setState`，于是组件就会随着时间变化不停地重新渲染。

State 的工作原理和 React.js 完全一致，所以对于处理 state 的一些更深入的细节，你可以参阅[React.Component API](https://reactjs.org/docs/react-component.html#setstate)。

译注：提示一些初学者应该牢记的要点：

- 一切界面变化都是`状态state变化`
- `state`的修改必须通过`setState()`方法
  - this.state.likes = 100; // 这样的`直接赋值修改无效！`
  - setState 是一个 merge 合并操作，只修改指定属性，不影响其他属性
  - setState 是`异步`操作，修改`不会马上生效`

看到这里，你可能觉得我们的例子总是千篇一律的黑色文本，太特么无聊了。那么我们一起来[学习一下样式](style.md)吧。
