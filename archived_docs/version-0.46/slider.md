---
id: version-0.46-slider
title: Slider
original_id: slider
---

用于选择一个范围值的组件。

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View props...</a> <a class="hash-link" href="#view">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="disabled"></a>disabled <span class="propType">bool</span> <a class="hash-link" href="#disabled">#</a></h4>
		<div>
			<p>如果为true，用户就不能移动滑块。默认为false。</p>
		</div>
	</div>
	<div class="prop">
	<h4 class="propTitle"><a class="anchor" name="maximumtrackimage"></a><span class="platform">ios</span>maximumTrackImage <span class="propType">Image.propTypes.source</span> <a class="hash-link" href="#maximumtrackimage">#</a></h4>
	<div><p>指定一个滑块右侧轨道背景图。仅支持静态图片。图片最左边的像素会被平铺直至填满轨道。</p></div></div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="maximumtracktintcolor"></a>maximumTrackTintColor <span class="propType">string</span> <a class="hash-link" href="#maximumtracktintcolor">#</a></h4>
		<div>
			<p>滑块右侧轨道的颜色。默认为一个蓝色的渐变色。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="maximumvalue"></a>maximumValue <span class="propType">number</span> <a class="hash-link" href="#maximumvalue">#</a></h4>
		<div>
			<p>滑块的最大值（当滑块滑到最右端时表示的值）。默认为1。</p>
		</div>
	</div>
	<div class="prop">
	<h4 class="propTitle"><a class="anchor" name="minimumtrackimage"></a><span class="platform">ios</span>minimumTrackImage <span class="propType">Image.propTypes.source</span> <a class="hash-link" href="#minimumtrackimage">#</a></h4>
	<div><p>指定一个滑块左侧轨道背景图。仅支持静态图片。图片最右边的像素会被平铺直至填满轨道。</p></div></div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="minimumtracktintcolor"></a>minimumTrackTintColor <span class="propType">string</span> <a class="hash-link" href="#minimumtracktintcolor">#</a></h4>
		<div>
			<p>滑块左侧轨道的颜色。默认为一个蓝色的渐变色。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="minimumvalue"></a>minimumValue <span class="propType">number</span> <a class="hash-link" href="#minimumvalue">#</a></h4>
		<div>
			<p>滑块的最小值（当滑块滑到最左侧时表示的值）。默认为0。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onslidingcomplete"></a>onSlidingComplete <span class="propType">function</span> <a class="hash-link" href="#onslidingcomplete">#</a></h4>
		<div>
			<p>用户结束滑动的时候调用此回调。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onvaluechange"></a>onValueChange <span class="propType">function</span> <a class="hash-link" href="#onvaluechange">#</a></h4>
		<div>
			<p>在用户拖动滑块的过程中不断调用此回调。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="step"></a>step <span class="propType">number</span> <a class="hash-link" href="#step">#</a></h4>
		<div>
			<p>滑块的最小步长。这个值应该在0到(maximumValue - minimumValue)之间。默认值为0。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="style"></a>style <span class="propType"><a href="view.html#style">View#style</a></span> <a class="hash-link" href="#style">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="thumbimage"></a>thumbImage <span class="propType">Image.propTypes.source</span> <a class="hash-link" href="#thumbimage">#</a></h4>
		<div>
			<p>给滑块设置一张图片。只支持静态图片。</p>
		</div>
	</div>	
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="thumbtintcolor"></a> <span class="platform">android</span>thumbTintColor <span class="propType">ColorPropType</span> <a class="hash-link" href="#thumbtintcolor">#</a></h4>
		<div>
			<p>Color of the foreground switch grip.</p>
		</div>
	</div>	
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="trackimage"></a>trackImage <span class="propType">Image.propTypes.source</span> <a class="hash-link" href="#trackimage">#</a></h4>
		<div>
			<p>给轨道设置一张背景图。只支持静态图片。图片最中央的像素会被平铺直至填满轨道。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="value"></a>value <span class="propType">number</span> <a class="hash-link" href="#value">#</a></h4>
		<div>
			<p>滑块的初始值。这个值应该在最小值和最大值之间。默认值是0。</p>
			<p><em>这不是一个受约束的组件。</em>也就是说，如果你不更新值，在用户操作后，这个组件也不会还原到初始值。</p>
		</div>
	</div>
</div>

### 例子

```jsx
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Slider,
  Text,
  StyleSheet,
  View,
} = ReactNative;

var SliderExample = React.createClass({
  getDefaultProps() {
    return {
      value: 0,
    }
  },

  getInitialState() {
    return {
      value: this.props.value,
    };
  },

  render() {
    return (
      <View>
        <Text style={styles.text} >
          {this.state.value && +this.state.value.toFixed(3)}
        </Text>
        <Slider
          {...this.props}
          onValueChange={(value) => this.setState({value: value})} />
      </View>
    );
  }
});

var SlidingCompleteExample = React.createClass({
  getInitialState() {
    return {
      slideCompletionValue: 0,
      slideCompletionCount: 0,
    };
  },

  render() {
    return (
      <View>
        <SliderExample
          {...this.props}
          onSlidingComplete={(value) => this.setState({
              slideCompletionValue: value,
              slideCompletionCount: this.state.slideCompletionCount + 1})} />
        <Text>
          Completions: {this.state.slideCompletionCount} Value: {this.state.slideCompletionValue}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  slider: {
    height: 10,
    margin: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 10,
  },
});

exports.title = '<Slider>';
exports.displayName = 'SliderExample';
exports.description = 'Slider input for numeric values';
exports.examples = [
  {
    title: 'Default settings',
    render(): ReactElement<any> {
      return <SliderExample />;
    }
  },
  {
    title: 'Initial value: 0.5',
    render(): ReactElement<any> {
      return <SliderExample value={0.5} />;
    }
  },
  {
    title: 'minimumValue: -1, maximumValue: 2',
    render(): ReactElement<any> {
      return (
        <SliderExample
          minimumValue={-1}
          maximumValue={2}
        />
      );
    }
  },
  {
    title: 'step: 0.25',
    render(): ReactElement<any> {
      return <SliderExample step={0.25} />;
    }
  },
  {
    title: 'onSlidingComplete',
    render(): ReactElement<any> {
      return (
        <SlidingCompleteExample />
      );
    }
  },
  {
    title: 'Custom min/max track tint color',
    platform: 'ios',
    render(): ReactElement<any> {
      return (
        <SliderExample
          minimumTrackTintColor={'red'}
          maximumTrackTintColor={'green'}
        />
      );
    }
  },
  {
    title: 'Custom thumb image',
    platform: 'ios',
    render(): ReactElement<any> {
      return <SliderExample thumbImage={require('./uie_thumb_big.png')} />;
    }
  },
  {
    title: 'Custom track image',
    platform: 'ios',
    render(): ReactElement<any> {
      return <SliderExample trackImage={require('./slider.png')} />;
    }
  },
  {
    title: 'Custom min/max track image',
    platform: 'ios',
    render(): ReactElement<any> {
      return (
        <SliderExample
          minimumTrackImage={require('./slider-left.png')}
          maximumTrackImage={require('./slider-right.png')}
        />
      );
    }
  },
];
```
