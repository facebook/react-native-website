---
id: version-0.43-alert
title: Alert
original_id: alert
---

启动一个提示对话框，包含对应的标题和信息。

你还可以指定一系列的按钮，点击对应的按钮会调用对应的onPress回调并且关闭提示框。默认情况下，对话框会仅有一个'确定'按钮。

本接口可以在iOS和Android上显示一个静态的提示框。如果要在显示提示框的同时接受用户输入一些信息，那你可能需要[`AlertIOS`](alertios.html)。

### iOS 
在iOS上你可以指定任意数量的按钮。每个按钮还都可以指定自己的样式，此外还可以指定提示的类别。参阅[AlertIOS](alertios.html)来了解更多细节。

### Android 
在Android上最多能指定三个按钮，这三个按钮分别具有“中间态”、“消极态”和“积极态”的概念：

如果你只指定一个按钮，则它具有“积极态”的属性（比如“确定”）；两个按钮，则分别是“消极态”和“积极态”（比如“取消”和“确定”）；三个按钮则意味着“中间态”、“消极态”和“积极态”（比如“稍候再说”，“取消”，“确定”）。

在Android上默认情况下点击提示框的外面会自动取消提示框。你可以提供一个额外参数来处理这一事件：`{ onDismiss: () => {} }`。

还有另外一个参数也可以用来阻止提示框被自动取消，即`{ cancelable: false }`。

一个简单的例子：

```javascript
// iOS和Android上都可用
Alert.alert(
  'Alert Title',
  'My Alert Msg',
  [
    {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    {text: 'OK', onPress: () => console.log('OK Pressed')},
  ],
  { cancelable: false }
)
```

### 方法

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="showactionsheetwithoptions"></a><span class="propType">static </span>alert<span class="propType">(title: string, message?: string, button?: Buttons, type?: AlertType)</span> <a class="hash-link" href="#showactionsheetwithoptions">#</a></h4></div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = ReactNative;

var UIExplorerBlock = require('./UIExplorerBlock');

// corporate ipsum > lorem ipsum
var alertMessage = 'Credibly reintermediate next-generation potentialities after goal-oriented ' +
                   'catalysts for change. Dynamically revolutionize.';

/**
 * Simple alert examples.
 */
var SimpleAlertExampleBlock = React.createClass({

  render: function() {
    return (
      <View>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            alertMessage,
          )}>
          <View style={styles.button}>
            <Text>Alert with message and default button</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            alertMessage,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )}>
          <View style={styles.button}>
            <Text>Alert with one button</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            alertMessage,
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed!')},
              {text: 'OK', onPress: () => console.log('OK Pressed!')},
            ]
          )}>
          <View style={styles.button}>
            <Text>Alert with two buttons</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Alert Title',
            null,
            [
              {text: 'Foo', onPress: () => console.log('Foo Pressed!')},
              {text: 'Bar', onPress: () => console.log('Bar Pressed!')},
              {text: 'Baz', onPress: () => console.log('Baz Pressed!')},
            ]
          )}>
          <View style={styles.button}>
            <Text>Alert with three buttons</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={() => Alert.alert(
            'Foo Title',
            alertMessage,
            '..............'.split('').map((dot, index) => ({
              text: 'Button ' + index,
              onPress: () => console.log('Pressed ' + index)
            }))
          )}>
          <View style={styles.button}>
            <Text>Alert with too many buttons</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
});

var AlertExample = React.createClass({
  statics: {
    title: 'Alert',
    description: 'Alerts display a concise and informative message ' +
    'and prompt the user to make a decision.',
  },
  render: function() {
    return (
      <UIExplorerBlock title={'Alert'}>
        <SimpleAlertExampleBlock />
      </UIExplorerBlock>
    );
  }
});

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

module.exports = {
  AlertExample,
  SimpleAlertExampleBlock,
};
```