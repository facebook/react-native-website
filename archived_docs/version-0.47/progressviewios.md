---
id: version-0.47-progressviewios
title: ProgressViewIOS
original_id: progressviewios
---

使用`ProgressViewIOS`来在iOS上渲染一个UIProgressView。

### 截图
![](/img/components/progressviewios.png)

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View props...</a> <a class="hash-link" href="#view">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="progress"></a>progress <span class="propType">number</span> <a class="hash-link" href="#progress">#</a></h4>
		<div>
			<p>当前的进度值（0到1之间）。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="progressimage"></a>progressImage <span class="propType">Image.propTypes.source</span> <a class="hash-link" href="#progressimage">#</a></h4>
		<div>
			<p>一个可以拉伸的图片，用于显示进度条。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="progresstintcolor"></a>progressTintColor <span class="propType">string</span> <a class="hash-link" href="#progresstintcolor">#</a></h4>
		<div>
			<p>进度条本身染上的颜色。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="progressviewstyle"></a>progressViewStyle <span class="propType">enum('default', 'bar')</span> <a class="hash-link" href="#progressviewstyle">#</a></h4>
		<div>
			<p>进度条的样式。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="trackimage"></a>trackImage <span class="propType">Image.propTypes.source</span> <a class="hash-link" href="#trackimage">#</a></h4>
		<div>
			<p>一个可拉伸的图片，用于显示进度条后面的轨道。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="tracktintcolor"></a>trackTintColor <span class="propType">string</span> <a class="hash-link" href="#tracktintcolor">#</a></h4>
		<div>
			<p>进度条轨道染上的颜色。</p>
		</div>
	</div>
</div>

### 例子

```jsx
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ProgressViewIOS,
  StyleSheet,
  View,
} = ReactNative;
var TimerMixin = require('react-timer-mixin');

var ProgressViewExample = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      progress: 0,
    };
  },

  componentDidMount() {
    this.updateProgress();
  },

  updateProgress() {
    var progress = this.state.progress + 0.01;
    this.setState({ progress });
    this.requestAnimationFrame(() => this.updateProgress());
  },

  getProgress(offset) {
    var progress = this.state.progress + offset;
    return Math.sin(progress % Math.PI) % 1;
  },

  render() {
    return (
      <View style={styles.container}>
        <ProgressViewIOS style={styles.progressView} progress={this.getProgress(0)}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="purple" progress={this.getProgress(0.2)}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="red" progress={this.getProgress(0.4)}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="orange" progress={this.getProgress(0.6)}/>
        <ProgressViewIOS style={styles.progressView} progressTintColor="yellow" progress={this.getProgress(0.8)}/>
      </View>
    );
  },
});

exports.displayName = (undefined: ?string);
exports.framework = 'React';
exports.title = 'ProgressViewIOS';
exports.description = 'ProgressViewIOS';
exports.examples = [{
  title: 'ProgressViewIOS',
  render() {
    return (
      <ProgressViewExample/>
    );
  }
}];

var styles = StyleSheet.create({
  container: {
    marginTop: -20,
    backgroundColor: 'transparent',
  },
  progressView: {
    marginTop: 20,
  }
});
```