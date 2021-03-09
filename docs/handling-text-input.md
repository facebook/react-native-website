---
id: handling-text-input
title: Handling Text Input
---

[`TextInput`](textinput#content) is a [Core Component](intro-react-native-components) that allows the user to enter text. It has an `onChangeText` prop that takes a function to be called every time the text changed, and an `onSubmitEditing` prop that takes a function to be called when the text is submitted.

For example, let's say that as the user types, you're translating their words into a different language. In this new language, every single word is written the same way: 🍕. So the sentence "Hello there Bob" would be translated as "🍕🍕🍕".

```SnackPlayer name=Handling%20Text%20Input
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  return (
    <View style={{padding: 10}}>
      <TextInput
        style={{height: 40}}
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={{padding: 10, fontSize: 42}}>
        {text.split(' ').map((word) => word && '🍕').join(' ')}
      </Text>
    </View>
  );
}

export default PizzaTranslator;
```

In this example, we store `text` in the state, because it changes over time.

There are a lot more things you might want to do with a text input. For example, you could validate the text inside while the user types. For more detailed examples, see the [React docs on controlled components](https://reactjs.org/docs/forms.html#controlled-components), or the [reference docs for TextInput](textinput.md).

Text input is one of the ways the user interacts with the app. Next, let's look at another type of input and [learn how to handle touches](handling-touches.md).

> The touch area never extends past the parent view bounds and on Android negative margin is not supported. [react-native#29308](https://github.com/facebook/react-native/issues/29308#issuecomment-792864162)
