---
id: clipboard
title: Clipboard
---

`Clipboard` gives you an interface for setting and getting content from Clipboard on both Android and iOS

---

### Example

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

```SnackPlayer name=Clipboard&supportedPlatforms=ios,android
import React, {useState} from 'react';
import {View, StyleSheet, Text, Button, Clipboard, TextInput} from 'react-native';

export default function App () {

  const [displayText, setDisplayText] = useState("");
  const [inputText, setInputText] = useState("");

  const copyText = async () => {
    Clipboard.setString(inputText);

    setDisplayText(await Clipboard.getString());
  };

  return (
    <View style={styles.container}>
      <Text>{`Text in Clipboard - ${displayText}`}</Text>

      <TextInput
        placeholder="Add Text here..."
        value={inputText}
        onChangeText={setInputText}
      />

      <Button title={"Copy Text"} onPress={copyText}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});
```

<block class="classical syntax" />

```SnackPlayer name=Clipboard&supportedPlatforms=ios,android
import React, {Component} from 'react';
import {View, StyleSheet, Text, Button, Clipboard, TextInput} from 'react-native';

export default class App extends Component {

  state = {
    displayText: "",
    inputText: ""
  };

  setInputText = inputText => this.setState({ inputText });

  setDisplayText = displayText => this.setState({ displayText });

  copyText = async () => {
    Clipboard.setString(this.state.inputText);

    this.setDisplayText(await Clipboard.getString());
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{`Text in Clipboard - ${this.state.displayText}`}</Text>

        <TextInput
          placeholder="Add Text here..."
          value={this.state.inputText}
          onChangeText={this.setInputText}
        />

        <Button title={"Copy Text"} onPress={this.copyText}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
});
```

<block class="endBlock syntax" />

# Reference

## Methods

### `getString()`

```jsx
static getString()
```

Get content of string type, this method returns a `Promise`, so you can use following code to get clipboard content

```jsx
async _getContent() {
  var content = await Clipboard.getString();
}
```

---

### `setString()`

```jsx
static setString(content)
```

Set content of string type. You can use following code to set clipboard content

```jsx
_setContent() {
  Clipboard.setString('hello world');
}
```

**Parameters:**

| Name    | Type   | Required | Description                               |
| ------- | ------ | -------- | ----------------------------------------- |
| content | string | Yes      | The content to be stored in the clipboard |

_Notice_

Be careful when you're trying to copy to clipboard any data except `string` and `number`, some data need additional stringification. For example, if you will try to copy array - Android will raise an exception, but iOS will not.
