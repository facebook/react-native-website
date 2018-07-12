---
id: version-0.44-progressbarandroid
title: ProgressBarAndroid
original_id: progressbarandroid
---

封装了Android平台上的`ProgressBar`的React组件。这个组件可以用来表示应用正在加载或者有些事情正在进行中。

例子：

```javascript
render: function() {
  var progressBar =
    <View style={styles.container}>
      <ProgressBar styleAttr="Inverse" />
    </View>;

  return (
    <MyLoadingComponent
      componentView={componentView}
      loadingView={progressBar}
      style={styles.loadingComponent}
    />
  );
},
```
### 截图
![](img/components/progressbarandroid.png)

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View props...</a> <a class="hash-link" href="#view">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="color"></a>color <span class="propType">string</span> <a class="hash-link" href="#color">#</a></h4>
		<div>
			<p>进度条的颜色。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="indeterminate"></a>indeterminate <span class="propType">indeterminateType</span> <a class="hash-link" href="#indeterminate">#</a></h4>
		<div>
			<p>决定进度条是否要显示一个不确定的进度。注意这个在styleAttr是Horizontal的时候必须是false。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="progress"></a>progress <span class="propType">number</span> <a class="hash-link" href="#progress">#</a></h4>
		<div>
			<p>当前的进度值（在0到1之间）。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="styleattr"></a>styleAttr <span class="propType">STYLE_ATTRIBUTES</span> <a class="hash-link" href="#styleattr">#</a></h4>
		<div>
			<p>进度条的样式。可取值有：</p>
			<ul>
				<li>Horizontal</li>
				<li>Small</li>
				<li>Large</li>
				<li>Inverse</li>
				<li>SmallInverse</li>
				<li>LargeInverse</li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="testid"></a>testID <span class="propType">string</span> <a class="hash-link" href="#testid">#</a></h4>
		<div>
			<p>用来在端到端测试中定位这个视图。</p>
		</div>
	</div>
</div>

### 样例

```javascript
'use strict';

var ProgressBar = require('ProgressBarAndroid');
var React = require('React');
var RNTesterBlock = require('RNTesterBlock');
var RNTesterPage = require('RNTesterPage');

var TimerMixin = require('react-timer-mixin');

var MovingBar = React.createClass({
  mixins: [TimerMixin],

  getInitialState: function() {
    return {
      progress: 0
    };
  },

  componentDidMount: function() {
    this.setInterval(
      () => {
        var progress = (this.state.progress + 0.02) % 1;
        this.setState({progress: progress});
      }, 50
    );
  },

  render: function() {
    return <ProgressBar progress={this.state.progress} {...this.props} />;
  },
});

var ProgressBarAndroidExample = React.createClass({

  statics: {
    title: '<ProgressBarAndroid>',
    description: 'Visual indicator of progress of some operation. ' +
        'Shows either a cyclic animation or a horizontal bar.',
  },

  render: function() {
    return (
      <RNTesterPage title="ProgressBar Examples">
        <RNTesterBlock title="Default ProgressBar">
          <ProgressBar />
        </RNTesterBlock>

        <RNTesterBlock title="Small ProgressBar">
          <ProgressBar styleAttr="Small" />
        </RNTesterBlock>

        <RNTesterBlock title="Large ProgressBar">
          <ProgressBar styleAttr="Large" />
        </RNTesterBlock>

        <RNTesterBlock title="Inverse ProgressBar">
          <ProgressBar styleAttr="Inverse" />
        </RNTesterBlock>

        <RNTesterBlock title="Small Inverse ProgressBar">
          <ProgressBar styleAttr="SmallInverse" />
        </RNTesterBlock>

        <RNTesterBlock title="Large Inverse ProgressBar">
          <ProgressBar styleAttr="LargeInverse" />
        </RNTesterBlock>

        <RNTesterBlock title="Horizontal Indeterminate ProgressBar">
          <ProgressBar styleAttr="Horizontal" />
        </RNTesterBlock>

        <RNTesterBlock title="Horizontal ProgressBar">
          <MovingBar styleAttr="Horizontal" indeterminate={false} />
        </RNTesterBlock>

        <RNTesterBlock title="Large Red ProgressBar">
          <ProgressBar styleAttr="Large" color="red" />
        </RNTesterBlock>

        <RNTesterBlock title="Horizontal Black Indeterminate ProgressBar">
          <ProgressBar styleAttr="Horizontal" color="black" />
        </RNTesterBlock>

        <RNTesterBlock title="Horizontal Blue ProgressBar">
          <MovingBar styleAttr="Horizontal" indeterminate={false} color="blue" />
        </RNTesterBlock>
      </RNTesterPage>
    );
  },
});

module.exports = ProgressBarAndroidExample;
```