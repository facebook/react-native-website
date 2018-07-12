---
id: version-0.42-segmentedcontrolios
title: SegmentedControlIOS
original_id: segmentedcontrolios
---

使用`SegmentedControlIOS`来在iOS设备上渲染一个`UISegmentedControl`组件。这是一个分段显示多个选项的组件。

### 截图
![SegmentedControlIOS](img/components/segmentedcontrolios.png)

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View props...</a> <a class="hash-link" href="#view">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="enabled"></a>enabled <span class="propType">bool</span> <a class="hash-link" href="#enabled">#</a></h4>
		<div>
			<p>如果为false，用户不能与此控件交互。默认为true。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="momentary"></a>momentary <span class="propType">bool</span> <a class="hash-link" href="#momentary">#</a></h4>
		<div>
			<p>如果为true，选中的段不会一直保持特效。但<code>onValueChange</code>回调还是会正常工作。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onchange"></a>onChange <span class="propType">function</span> <a class="hash-link" href="#onchange">#</a></h4>
		<div>
			<p>当用户点击某一段的时候调用。参数是一个事件对象。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onvaluechange"></a>onValueChange <span class="propType">function</span> <a class="hash-link" href="#onvaluechange">#</a></h4>
		<div>
			<p>当用户点击某一段的时候调用。参数是被选中段的值。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="selectedindex"></a>selectedIndex <span class="propType">number</span> <a class="hash-link" href="#selectedindex">#</a></h4>
		<div>
			<p>组件显示时，一开始被选中的段落的下标。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="tintcolor"></a>tintColor <span class="propType">string</span> <a class="hash-link" href="#tintcolor">#</a></h4>
		<div>
			<p>被选中的段的颜色。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="values"></a>values <span class="propType">[string]</span> <a class="hash-link" href="#values">#</a></h4>
		<div>
			<p>按顺序每一个段落的标题文字。</p>
		</div>
	</div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  SegmentedControlIOS,
  Text,
  View,
  StyleSheet
} = ReactNative;

var BasicSegmentedControlExample = React.createClass({
  render() {
    return (
      <View>
        <View style={{marginBottom: 10}}>
          <SegmentedControlIOS values={['One', 'Two']} />
        </View>
        <View>
          <SegmentedControlIOS values={['One', 'Two', 'Three', 'Four', 'Five']} />
        </View>
      </View>
    );
  }
});

var PreSelectedSegmentedControlExample = React.createClass({
  render() {
    return (
      <View>
        <View>
          <SegmentedControlIOS values={['One', 'Two']} selectedIndex={0} />
        </View>
      </View>
    );
  }
});

var MomentarySegmentedControlExample = React.createClass({
  render() {
    return (
      <View>
        <View>
          <SegmentedControlIOS values={['One', 'Two']} momentary={true} />
        </View>
      </View>
    );
  }
});

var DisabledSegmentedControlExample = React.createClass({
  render() {
    return (
      <View>
        <View>
          <SegmentedControlIOS enabled={false} values={['One', 'Two']} selectedIndex={1} />
        </View>
      </View>
    );
  },
});

var ColorSegmentedControlExample = React.createClass({
  render() {
    return (
      <View>
        <View style={{marginBottom: 10}}>
          <SegmentedControlIOS tintColor="#ff0000" values={['One', 'Two', 'Three', 'Four']} selectedIndex={0} />
        </View>
        <View>
          <SegmentedControlIOS tintColor="#00ff00" values={['One', 'Two', 'Three']} selectedIndex={1} />
        </View>
      </View>
    );
  },
});

var EventSegmentedControlExample = React.createClass({
  getInitialState() {
    return {
      values: ['One', 'Two', 'Three'],
      value: 'Not selected',
      selectedIndex: undefined
    };
  },

  render() {
    return (
      <View>
        <Text style={styles.text} >
          Value: {this.state.value}
        </Text>
        <Text style={styles.text} >
          Index: {this.state.selectedIndex}
        </Text>
        <SegmentedControlIOS
          values={this.state.values}
          selectedIndex={this.state.selectedIndex}
          onChange={this._onChange}
          onValueChange={this._onValueChange} />
      </View>
    );
  },

  _onChange(event) {
    this.setState({
      selectedIndex: event.nativeEvent.selectedSegmentIndex,
    });
  },

  _onValueChange(value) {
    this.setState({
      value: value,
    });
  }
});

var styles = StyleSheet.create({
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
});

exports.title = '<SegmentedControlIOS>';
exports.displayName = 'SegmentedControlExample';
exports.description = 'Native segmented control';
exports.examples = [
  {
    title: 'Segmented controls can have values',
    render(): ReactElement<any> { return <BasicSegmentedControlExample />; }
  },
  {
    title: 'Segmented controls can have a pre-selected value',
    render(): ReactElement<any> { return <PreSelectedSegmentedControlExample />; }
  },
  {
    title: 'Segmented controls can be momentary',
    render(): ReactElement<any> { return <MomentarySegmentedControlExample />; }
  },
  {
    title: 'Segmented controls can be disabled',
    render(): ReactElement<any> { return <DisabledSegmentedControlExample />; }
  },
  {
    title: 'Custom colors can be provided',
    render(): ReactElement<any> { return <ColorSegmentedControlExample />; }
  },
  {
    title: 'Change events can be detected',
    render(): ReactElement<any> { return <EventSegmentedControlExample />; }
  }
];
```