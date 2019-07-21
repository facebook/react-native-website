---
id: version-0.42-share
title: Share
original_id: share
---

### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="share"></a><span class="methodType">static </span>share<span
            class="methodType">(content, options)</span> <a class="hash-link" href="#share">#</a></h4>
        <div><p>打开一个对话框来共享文本内容。</p>
            <p>在iOS中，返回一个<code>Promise</code>，它将被调用一个包含<code>action</code>的对象，<code>activityType</code>。 如果用户关闭对话框，则<code>Promise</code>仍将被解析，而<code>ActionDisissedAction</code>和所有其他键未被定义。</p>
            <p>在<code>Android</code>中，返回一个<code>Promise</code>，它始终使用<code>Share.sharedAction</code>操作来解决。
            </p>
            <h3><a class="anchor" name="content"></a>Content <a class="hash-link" href="#content">#</a>
            </h3>
            <ul>
                <li><code>message</code> - 要分享的消息</li>
                <li><code>title</code> - 消息的标题</li>
            </ul>
            <h4><a class="anchor" name="ios"></a>iOS <a class="hash-link" href="#ios">#</a></h4>
            <ul>
                <li><code>url</code> - 要分享的网址</li>
            </ul>
            <p>至少需要一个URL和消息.</p>
            <h3><a class="anchor" name="options"></a>Options <a class="hash-link" href="#options">#</a>
            </h3><h4><a class="anchor" name="ios"></a>iOS <a class="hash-link" href="#ios">#</a></h4>
            <ul>
                <li><code>excludedActivityTypes</code></li>
                <li><code>tintColor</code></li>
            </ul>
            <h4><a class="anchor" name="android"></a>Android <a class="hash-link" href="#android">#</a>
            </h4>
            <ul>
                <li><code>dialogTitle</code></li>
            </ul>
        </div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="sharedaction"></a><span
            class="methodType">static </span>sharedAction<span class="methodType">()</span> <a class="hash-link"
                                                                                                href="#sharedaction">#</a>
    </h4>
        <div><p>内容已成功共享。.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="dismissedaction"></a><span class="methodType">static </span>dismissedAction<span
            class="methodType">()</span> <a class="hash-link" href="#dismissedaction">#</a></h4>
        <div><p>该对话框已被拒绝.
            @platform ios</p></div>
    </div>
</div>


### 例子

```jsx
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Share,
} = ReactNative;

exports.framework = 'React';
exports.title = 'Share';
exports.description = 'Share data with other Apps.';
exports.examples = [{
  title: 'Share Text Content',
  render() {
    return <ShareMessageExample />;
  }
}];

class ShareMessageExample extends React.Component {
  _shareMessage: Function;
  _shareText: Function;
  _showResult: Function;
  state: any;

  constructor(props) {
    super(props);

    this._shareMessage = this._shareMessage.bind(this);
    this._shareText = this._shareText.bind(this);
    this._showResult = this._showResult.bind(this);

    this.state = {
      result: ''
    };
  }

  render() {
    return (
      <View>
        <TouchableHighlight style={styles.wrapper}
          onPress={this._shareMessage}>
          <View style={styles.button}>
            <Text>Click to share message</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper}
          onPress={this._shareText}>
          <View style={styles.button}>
            <Text>Click to share message, URL and title</Text>
          </View>
        </TouchableHighlight>
        <Text>{this.state.result}</Text>
      </View>
    );
  }

  _shareMessage() {
    Share.share({
      message: 'React Native | A framework for building native apps using React'
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _shareText() {
    Share.share({
      message: 'A framework for building native apps using React',
      url: 'http://facebook.github.io/react-native/',
      title: 'React Native'
    }, {
      dialogTitle: 'Share React Native website',
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ],
      tintColor: 'green'
    })
    .then(this._showResult)
    .catch((error) => this.setState({result: 'error: ' + error.message}));
  }

  _showResult(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({result: 'shared with an activityType: ' + result.activityType});
      } else {
        this.setState({result: 'shared'});
      }
    } else if (result.action === Share.dismissedAction) {
      this.setState({result: 'dismissed'});
    }
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
