---
id: version-0.41-actionsheetios
title: ActionSheetIOS
original_id: actionsheetios
---

### 截图
![showActionSheetWithOptions](img/api/actionsheetios1.png)

![showShareActionSheetWithOptions](img/api/actionsheetios2.png)

### 方法

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="showactionsheetwithoptions"></a><span class="propType">static </span>showActionSheetWithOptions<span class="propType">(options: Object, callback: Function)</span> <a class="hash-link" href="#showactionsheetwithoptions">#</a></h4>
		<div>
			<p>在iOS设备上显示一个ActionSheet弹出框，其中options参数为一个对象，其属性必须包含以下一项或多项：</p>
			<ul>
				<li><code>options</code>（字符串数组） - 一组按钮的标题（必选）</li>
				<li><code>cancelButtonIndex</code>（整型） - 选项中取消按钮所在的位置（索引）</li>
				<li><code>destructiveButtonIndex</code>（整型） - 选项中删除按钮所在的位置（索引）</li>
				<li><code>title</code>（字符串） - 弹出框顶部的标题</li>
				<li><code>message</code>（字符串） - 弹出框顶部标题下方的信息</li>
			</ul>
		</div>
</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="showshareactionsheetwithoptions"></a><span class="propType">static </span>showShareActionSheetWithOptions<span class="propType">(options: Object, failureCallback: Function, successCallback: Function)</span> <a class="hash-link" href="#showshareactionsheetwithoptions">#</a></h4>

		<div>
			<p>在iOS设备上显示一个分享弹出框，其中options参数为一个对象，其属性包含以下几项（必须至少有message或url）：</p>
			<ul>
				<li><code>message</code>（字符串） - 要分享的信息</li>
				<li><code>url</code>（字符串） - 要分享的URL地址</li>
				<li><code>subject</code>（字符串） - 要分享的信息主题</li>
				<li><code>excludedActivityTypes</code>（数组） - 指定在actionsheet中不显示的活动</li>
			</ul>
			<p>注：如果<code>url</code>指向本地文件，或者是一个base64编码的url，则会直接读取并分享相应的文件。你可以用这样的方式来分享图片、视频以及PDF文件等。</p>
		</div>
</div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActionSheetIOS,
  StyleSheet,
  Text,
  UIManager,
  View,
} = ReactNative;

var BUTTONS = [
  'Option 0',
  'Option 1',
  'Option 2',
  'Delete',
  'Cancel',
];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 4;

var ActionSheetExample = React.createClass({
  getInitialState() {
    return {
      clicked: 'none',
    };
  },

  render() {
    return (
      <View>
        <Text onPress={this.showActionSheet} style={style.button}>
          Click to show the ActionSheet
        </Text>
        <Text>
          Clicked button: {this.state.clicked}
        </Text>
      </View>
    );
  },

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }
});

var ActionSheetTintExample = React.createClass({
  getInitialState() {
    return {
      clicked: 'none',
    };
  },

  render() {
    return (
      <View>
        <Text onPress={this.showActionSheet} style={style.button}>
          Click to show the ActionSheet
        </Text>
        <Text>
          Clicked button: {this.state.clicked}
        </Text>
      </View>
    );
  },

  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'green',
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
  }
});

var ShareActionSheetExample = React.createClass({
  getInitialState() {
    return {
      text: ''
    };
  },

  render() {
    return (
      <View>
        <Text onPress={this.showShareActionSheet} style={style.button}>
          Click to show the Share ActionSheet
        </Text>
        <Text>
          {this.state.text}
        </Text>
      </View>
    );
  },

  showShareActionSheet() {
    ActionSheetIOS.showShareActionSheetWithOptions({
      url: this.props.url,
      message: 'message to go with the shared url',
      subject: 'a subject to go in the email heading',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    },
    (error) => alert(error),
    (success, method) => {
      var text;
      if (success) {
        text = `Shared via ${method}`;
      } else {
        text = 'You didn\'t share';
      }
      this.setState({text});
    });
  }
});

var ShareScreenshotExample = React.createClass({
  getInitialState() {
    return {
      text: ''
    };
  },

  render() {
    return (
      <View>
        <Text onPress={this.showShareActionSheet} style={style.button}>
          Click to show the Share ActionSheet
        </Text>
        <Text>
          {this.state.text}
        </Text>
      </View>
    );
  },

  showShareActionSheet() {
    // Take the snapshot (returns a temp file uri)
    UIManager.takeSnapshot('window').then((uri) => {
      // Share image data
      ActionSheetIOS.showShareActionSheetWithOptions({
        url: uri,
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToTwitter'
        ]
      },
      (error) => alert(error),
      (success, method) => {
        var text;
        if (success) {
          text = `Shared via ${method}`;
        } else {
          text = 'You didn\'t share';
        }
        this.setState({text});
      });
    }).catch((error) => alert(error));
  }
});

var style = StyleSheet.create({
  button: {
    marginBottom: 10,
    fontWeight: '500',
  }
});

exports.title = 'ActionSheetIOS';
exports.description = 'Interface to show iOS\' action sheets';
exports.examples = [
  {
    title: 'Show Action Sheet',
    render(): ReactElement { return <ActionSheetExample />; }
  },
  {
    title: 'Show Action Sheet with tinted buttons',
    render(): ReactElement { return <ActionSheetTintExample />; }
  },
  {
    title: 'Show Share Action Sheet',
    render(): ReactElement {
      return <ShareActionSheetExample url="https://code.facebook.com" />;
    }
  },
  {
    title: 'Share Local Image',
    render(): ReactElement {
      return <ShareActionSheetExample url="bunny.png" />;
    }
  },
  {
    title: 'Share Screenshot',
    render(): ReactElement {
      return <ShareScreenshotExample />;
    }
  }
];
```
