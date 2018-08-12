---
id: version-0.51-alertios
title: AlertIOS
original_id: alertios
---

启动一个提示对话框，包含对应的标题和信息。

你还可以指定一系列的按钮，点击对应的按钮会调用对应的onPress回调并且关闭提示框。默认情况下，对话框会仅有一个'确定'按钮。

这个API主要用于需要iOS特有功能的场景，比如提示用户输入一些信息等。其他情况下，尤其是仅仅显示一个静态的提示框时，应该使用跨平台的[`Alert`](alert.html)接口。

```javascript
AlertIOS.alert(
  'Foo Title',
  'My Alert Msg',
  [
    {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
    {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
  ]
)
```
### 截图
![alertios1](/img/api/alertios1.png)

![alertios2](/img/api/alertios2.png)

### 方法

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="alert"></a><span class="propType">static </span>alert<span class="propType">(title: string, message?: string, buttons?: Array&lt;{
      text?: string;
      onPress?: ?Function;
      style?: AlertButtonStyle;
    }&gt;, type?: AlertType)</span> <a class="hash-link" href="#alert">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="prompt"></a><span class="propType">static </span>prompt<span class="propType">(title: string, value?: string, buttons?: Array&lt;{
      text?: string;
      onPress?: ?Function;
      style?: AlertButtonStyle;
    }&gt;, callback?: Function)</span> <a class="hash-link" href="#prompt">#</a></h4><div><p>提示用户输入一些文字。</p></div></div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  AlertIOS,
} = ReactNative;

var { SimpleAlertExampleBlock } = require('./AlertExample');

exports.framework = 'React';
exports.title = 'AlertIOS';
exports.description = 'iOS alerts and action sheets';
exports.examples = [{
  title: 'Alerts',
  render() {
    return <SimpleAlertExampleBlock />;
  }
},
{
  title: 'Prompt Options',
  render(): ReactElement<any> {
    return <PromptOptions />;
  }
},
{
  title: 'Prompt Types',
  render() {
    return (
      <View>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => AlertIOS.prompt('Plain Text Entry')}>

          <View style={styles.button}>
            <Text>
              plain-text
            </Text>
          </View>

        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => AlertIOS.prompt('Secure Text', null, null, 'secure-text')}>

          <View style={styles.button}>
            <Text>
              secure-text
            </Text>
          </View>

        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => AlertIOS.prompt('Login & Password', null, null, 'login-password')}>

          <View style={styles.button}>
            <Text>
              login-password
            </Text>
          </View>

        </TouchableHighlight>
      </View>
    );
  }
}];

class PromptOptions extends React.Component {
  state: any;
  customButtons: Array<Object>;

  constructor(props) {
    super(props);

    // $FlowFixMe this seems to be a Flow bug, `saveResponse` is defined below
    this.saveResponse = this.saveResponse.bind(this);

    this.customButtons = [{
      text: 'Custom OK',
      onPress: this.saveResponse
    }, {
      text: 'Custom Cancel',
      style: 'cancel',
    }];

    this.state = {
      promptValue: undefined,
    };
  }

  render() {
    return (
      <View>
        <Text style={{marginBottom: 10}}>
          <Text style={{fontWeight: 'bold'}}>Prompt value:</Text> {this.state.promptValue}
        </Text>

        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => AlertIOS.prompt('Type a value', null, this.saveResponse)}>

          <View style={styles.button}>
            <Text>
              prompt with title & callback
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => AlertIOS.prompt('Type a value', null, this.customButtons)}>

          <View style={styles.button}>
            <Text>
              prompt with title & custom buttons
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => AlertIOS.prompt('Type a value', null, this.saveResponse, undefined, 'Default value')}>

          <View style={styles.button}>
            <Text>
              prompt with title, callback & default value
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => AlertIOS.prompt('Type a value', null, this.customButtons, 'login-password', 'admin@site.com')}>

          <View style={styles.button}>
            <Text>
              prompt with title, custom buttons, login/password & default value
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  saveResponse(promptValue) {
    this.setState({ promptValue: JSON.stringify(promptValue) });
  }
}

var styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#eeeeee',
    padding: 10,
  },
});
```