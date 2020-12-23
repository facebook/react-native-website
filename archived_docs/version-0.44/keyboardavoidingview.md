---
id: version-0.44-keyboardavoidingview
title: KeyboardAvoidingView
original_id: keyboardavoidingview
---

本组件用于解决一个常见的尴尬问题：手机上弹出的键盘常常会挡住当前的视图。本组件可以自动根据键盘的位置，调整自身的position或底部的padding，以避免被遮挡。

### 属性
<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View
        props...</a> <a class="hash-link" href="#view">#</a>
        </h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="behavior"></a>behavior <span class="propType">PropTypes.oneOf(['height', 'position', 'padding'])</span>
        <a class="hash-link" href="#behavior">#</a>
        </h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="contentcontainerstyle"></a>contentContainerStyle
        <span class="propType"><a href="view.html#style">View#style</a></span> 
            <a class="hash-link" href="#contentcontainerstyle">#</a>
        </h4>
        <div><p>如果设定behavior值为'position'，则会生成一个View作为内容容器。此属性用于指定此内容容器的样式。</p></div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="keyboardverticaloffset"></a>keyboardVerticalOffset
        <span class="propType">PropTypes.number.isRequired</span> 
            <a class="hash-link" href="#keyboardverticaloffset">#</a>
        </h4>
        <div><p>有时候应用离屏幕顶部还有一些距离（比如状态栏等等），利用此属性来补偿修正这段距离。</p></div>
    </div>
</div>

### 方法
<div class="props">
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="relativekeyboardheight"></a>relativeKeyboardHeight<span
            class="methodType">(keyboardFrame): </span> <a class="hash-link" href="#relativekeyboardheight">#</a>
        </h4>
    </div>
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="onkeyboardchange"></a>onKeyboardChange<span
            class="methodType">(event)</span> <a class="hash-link" href="#onkeyboardchange">#</a>
        </h4>
    </div>
    <div class="prop">
        <h4 class="methodTitle"><a class="anchor" name="onlayout"></a>onLayout<span class="methodType">(event)</span>
        <a class="hash-link" href="#onlayout">#</a>
        </h4>
    </div>
</div>

### 例子

```js
'use strict';

const React = require('React');
const ReactNative = require('react-native');
const {
  KeyboardAvoidingView,
  Modal,
  SegmentedControlIOS,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} = ReactNative;

const RNTesterBlock = require('./RNTesterBlock');
const RNTesterPage = require('./RNTesterPage');

class KeyboardAvoidingViewExample extends React.Component {
  static title = '<KeyboardAvoidingView>';
  static description = 'Base component for views that automatically adjust their height or position to move out of the way of the keyboard.';

  state = {
    behavior: 'padding',
    modalOpen: false,
  };

  onSegmentChange = (segment: String) => {
    this.setState({behavior: segment.toLowerCase()});
  };

  renderExample = () => {
    return (
      <View style={styles.outerContainer}>
        <Modal animationType="fade" visible={this.state.modalOpen}>
          <KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>
            <SegmentedControlIOS
              onValueChange={this.onSegmentChange}
              selectedIndex={this.state.behavior === 'padding' ? 0 : 1}
              style={styles.segment}
              values={['Padding', 'Position']} />
            <TextInput
              placeholder="<TextInput />"
              style={styles.textInput} />
          </KeyboardAvoidingView>
          <TouchableHighlight
            onPress={() => this.setState({modalOpen: false})}
            style={styles.closeButton}>
            <Text>Close</Text>
          </TouchableHighlight>
        </Modal>

        <TouchableHighlight onPress={() => this.setState({modalOpen: true})}>
          <Text>Open Example</Text>
        </TouchableHighlight>
      </View>
    );
  };

  render() {
    return (
      <RNTesterPage title="Keyboard Avoiding View">
        <RNTesterBlock title="Keyboard-avoiding views move out of the way of the keyboard.">
          {this.renderExample()}
        </RNTesterBlock>
      </RNTesterPage>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  textInput: {
    borderRadius: 5,
    borderWidth: 1,
    height: 44,
    paddingHorizontal: 10,
  },
  segment: {
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 10,
  }
});

module.exports = KeyboardAvoidingViewExample;
```