---
id: handling-text-input
title: 处理文本输入
---

[`TextInput`](textinput#content)是一个允许用户输入文本的[基础组件](intro-react-native-components)。它有一个`onChangeText`属性，此属性接受一个函数，并会在文本每次发生变化时调用。它还有一个`onSubmitEditing`属性，此属性接受一个函数，并会在文本被提交时调用。

例如，假设当用户输入时，你要把他们的话翻译成另一种语言。在这种新语言里，每一个单词都写成同样的样子：🍕。所以句子“Hello there Bob”会被翻译成“🍕 🍕 🍕”。

```SnackPlayer name=Handling%20Text%20Input
import React, {useState} from 'react';
import {Text, TextInput, View} from 'react-native';

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TextInput
        placeholder="Type here to translate!"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
        style={{
          height: 40,
          padding: 5,
          marginHorizontal: 8,
          borderWidth: 1,
        }}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text
          .split(' ')
          .map(word => word && '🍕')
          .join(' ')}
      </Text>
    </View>
  );
};

export default PizzaTranslator;
```

在这个例子中，我们把`text`存储在 state 中，因为它会随着时间而变化。

关于文本输入，还有很多你可能想做的事情。例如，你可以在用户输入时对文本进行校验。更详细的示例请参阅 [React 关于受控组件的文档](https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable)，以及 [TextInput 的参考文档](textinput.md)。

`TextInput`只是用户与你的应用交互的多种方式之一。有关处理其他输入方式的示例，请参阅[如何处理触摸](handling-touches.md)文档。

现在，让我们来看看另一个基础组件：[ScrollView](using-a-scrollview)。
