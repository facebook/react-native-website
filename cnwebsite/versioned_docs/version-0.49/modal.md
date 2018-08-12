---
id: version-0.49-modal
title: Modal
original_id: modal
---

Modal组件可以用来覆盖包含React Native根视图的原生视图（如UIViewController，Activity）。

在嵌入React Native的混合应用中可以使用Modal。Modal可以使你应用中RN编写的那部分内容覆盖在原生视图上显示。

```js
import React, { Component } from 'react';
import { Modal, Text, TouchableHighlight, View } from 'react-native';

class ModalExample extends Component {

  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>
            </TouchableHighlight>

          </View>
         </View>
        </Modal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}
```

### 截图
![](/img/components/modal.png)

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="animated"></a>animated <span
            class="propType">bool</span> <a class="hash-link" href="#animated">#</a></h4>
        <div class="deprecated">
            <div class="deprecatedTitle"><span>已过期</span></div>
            <div class="deprecatedMessage">
                <div><p>请使用<code>animationType</code> 属性代替。</p></div>
            </div>
        </div>
	</div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="animated"></a>animationType  <span
            class="propType">PropTypes.oneOf(['none', 'slide', 'fade'])</span> <a class="hash-link" href="#animationType ">#</a></h4>
        <div>
            <p>The <code>animationType</code> prop controls how the modal animates.</p>
            <ul>
            <li><code>slide</code> slides in from the bottom</li>
            <li><code>fade</code> fades into view</li>
            <li><code>none</code> appears without an animation</li>
            </ul>
        </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onRequestClose"></a>onRequestClose <span
            class="propType">Platform.OS === 'android' ? PropTypes.func.isRequired : PropTypes.func</span> <a
            class="hash-link" href="#onRequestClose">#</a></h4>
        <div>
        <p>The <code>onRequestClose</code> prop allows passing a function that will be called once the modal has been dismissed.</p>
        <p><em>On the Android platform, this is a required function.</em></p>
        </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onShow"></a>onShow <span
            class="propType">function</span> <a class="hash-link" href="#onShow">#</a></h4>
            <div>
            <p>The <code>onShow</code> prop allows passing a function that will be called once the modal has been shown.</p>
            </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="transparent"></a>transparent <span class="propType">bool</span>
        <a class="hash-link" href="#transparent">#</a></h4>
        <div>
        <p>The <code>transparent</code> prop determines whether your modal will fill the entire view. Setting this to <code>true</code> will render the modal over a transparent background.</p>
        </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="visible"></a>visible <span
            class="propType">bool</span> <a class="hash-link" href="#visible">#</a></h4>
            <div><p>The <code>visible</code> prop determines whether your modal is visible.</p></div>
    </div>
    <div class="prop">
	    <h4 class="propTitle"><a class="anchor" name="onorientationchange"></a><span class="platform">ios</span>onOrientationChange <span class="propType">PropTypes.func</span> 
	    <a class="hash-link" href="#onorientationchange">#</a>
	    </h4>
	    <div><p>The <code>onOrientationChange</code> callback is called when the orientation changes while the modal is being displayed.
		The orientation provided is only 'portrait' or 'landscape'. This callback is also called on initial render, regardless of the current orientation.</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="supportedorientations"></a><span class="platform">ios</span>supportedOrientations <span class="propType">PropTypes.arrayOf(PropTypes.oneOf(['portrait', 'portrait-upside-down', 'landscape', 'landscape-left', 'landscape-right']))</span> 
		<a class="hash-link" href="#supportedorientations">#</a>
		</h4>
		<div>
			<p>The <code>supportedOrientations</code> prop allows the modal to be rotated to any of the specified orientations. On iOS, the modal is still restricted by what's specified in your app's Info.plist's UISupportedInterfaceOrientations field.</p>
		</div>
	</div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Modal,
  StyleSheet,
  Switch,
  Text,
  TouchableHighlight,
  View,
} = ReactNative;

exports.displayName = (undefined: ?string);
exports.framework = 'React';
exports.title = '<Modal>';
exports.description = 'Component for presenting modal views.';

var Button = React.createClass({
  getInitialState() {
    return {
      active: false,
    };
  },

  _onHighlight() {
    this.setState({active: true});
  },

  _onUnhighlight() {
    this.setState({active: false});
  },

  render() {
    var colorStyle = {
      color: this.state.active ? '#fff' : '#000',
    };
    return (
      <TouchableHighlight
        onHideUnderlay={this._onUnhighlight}
        onPress={this.props.onPress}
        onShowUnderlay={this._onHighlight}
        style={[styles.button, this.props.style]}
        underlayColor="#a9d9d4">
          <Text style={[styles.buttonText, colorStyle]}>{this.props.children}</Text>
      </TouchableHighlight>
    );
  }
});

var ModalExample = React.createClass({
  getInitialState() {
    return {
      animationType: 'none',
      modalVisible: false,
      transparent: false,
    };
  },

  _setModalVisible(visible) {
    this.setState({modalVisible: visible});
  },

  _setAnimationType(type) {
    this.setState({animationType: type});
  },

  _toggleTransparent() {
    this.setState({transparent: !this.state.transparent});
  },

  render() {
    var modalBackgroundStyle = {
      backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : '#f5fcff',
    };
    var innerContainerTransparentStyle = this.state.transparent
      ? {backgroundColor: '#fff', padding: 20}
      : null;
    var activeButtonStyle = {
      backgroundColor: '#ddd'
    };

    return (
      <View>
        <Modal
          animationType={this.state.animationType}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {this._setModalVisible(false)}}
          >
          <View style={[styles.container, modalBackgroundStyle]}>
            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
              <Text>This modal was presented {this.state.animationType === 'none' ? 'without' : 'with'} animation.</Text>
              <Button
                onPress={this._setModalVisible.bind(this, false)}
                style={styles.modalButton}>
                Close
              </Button>
            </View>
          </View>
        </Modal>
        <View style={styles.row}>
          <Text style={styles.rowTitle}>Animation Type</Text>
          <Button onPress={this._setAnimationType.bind(this, 'none')} style={this.state.animationType === 'none' ? activeButtonStyle : {}}>
            none
          </Button>
          <Button onPress={this._setAnimationType.bind(this, 'slide')} style={this.state.animationType === 'slide' ? activeButtonStyle : {}}>
            slide
          </Button>
          <Button onPress={this._setAnimationType.bind(this, 'fade')} style={this.state.animationType === 'fade' ? activeButtonStyle : {}}>
            fade
          </Button>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowTitle}>Transparent</Text>
          <Switch value={this.state.transparent} onValueChange={this._toggleTransparent} />
        </View>

        <Button onPress={this._setModalVisible.bind(this, true)}>
          Present
        </Button>
      </View>
    );
  },
});

exports.examples = [
  {
    title: 'Modal Presentation',
    description: 'Modals can be presented with or without animation',
    render: () => <ModalExample />,
  },
];

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
  },
  rowTitle: {
    flex: 1,
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 5,
    flex: 1,
    height: 44,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 18,
    margin: 5,
    textAlign: 'center',
  },
  modalButton: {
    marginTop: 10,
  },
});
```
