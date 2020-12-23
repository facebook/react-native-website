---
id: version-0.44-handling-text-input
title: 处理文本输入
original_id: handling-text-input
---

[`TextInput`](textinput.html#content)是一个允许用户输入文本的基础组件。它有一个名为`onChangeText`的属性，此属性接受一个函数，而此函数会在文本变化时被调用。另外还有一个名为`onSubmitEditing`的属性，会在文本被提交后（用户按下软键盘上的提交键）调用。

假如我们要实现当用户输入时，实时将其以单词为单位翻译为另一种文字。我们假设这另一种文字来自某个吃货星球，只有一个单词： 🍕。所以"Hello there Bob"将会被翻译为"🍕🍕🍕"。

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View } from 'react-native';

class PizzaTranslator extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to translate!"
          onChangeText={(text) => this.setState({text})}
        />
        <Text style={{padding: 10, fontSize: 42}}>
          {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
        </Text>
      </View>
    );
  }
}
// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('PizzaTranslator', () => PizzaTranslator);
```

在上面的例子里，我们把`text`保存到state中，因为它会随着时间变化。

文本输入方面还有很多其他的东西要处理。比如你可能想要在用户输入的时候进行验证，在[React的表单组件中的受限组件](http://reactjs.cn/react/docs/forms.html)一节中有一些详细的示例（注意react中的onChange对应的是rn中的onChangeText）。此外你还需要看看[TextInput的文档](textinput.html)。

TextInput可能是天然具有“动态状态”的最简单的组件了。下面我们来看看另一类控制布局的组件，先从[ScrollView开始学习](using-a-scrollview.html)。
