---
id: version-0.40-share
title: Share
original_id: share
---

### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="share"></a><span class="methodType">static </span>share<span
            class="methodType">(content, options)</span> <a class="hash-link" href="#share">#</a></h4>
        <div><p>Open a dialog to share text content.</p>
            <p>In iOS, Returns a Promise which will be invoked an object containing <code>action</code>, <code>activityType</code>.
                If the user dismissed the dialog, the Promise will still be resolved with action being <code>Share.dismissedAction</code>
                and all the other keys being undefined.</p>
            <p>In Android, Returns a Promise which always be resolved with action being <code>Share.sharedAction</code>.
            </p>
            <h3><a class="anchor" name="content"></a>Content <a class="hash-link" href="#content">#</a>
            </h3>
            <ul>
                <li><code>message</code> - a message to share</li>
                <li><code>title</code> - title of the message</li>
            </ul>
            <h4><a class="anchor" name="ios"></a>iOS <a class="hash-link" href="#ios">#</a></h4>
            <ul>
                <li><code>url</code> - an URL to share</li>
            </ul>
            <p>At least one of URL and message is required.</p>
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
        <div><p>The content was successfully shared.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="dismissedaction"></a><span class="methodType">static </span>dismissedAction<span
            class="methodType">()</span> <a class="hash-link" href="#dismissedaction">#</a></h4>
        <div><p>The dialog has been dismissed.
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