---
id: version-0.43-activityindicator
title: ActivityIndicator
original_id: activityindicator
---

显示一个圆形的loading提示符号。

### 属性

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View props...</a> <a class="hash-link" href="#view">#</a></h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="animating"></a>animating <span class="propType">bool</span> <a class="hash-link" href="#animating">#</a></h4>
        <div>
            <p>是否要显示指示器，默认为true，表示显示。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="color"></a>color <span class="propType">string</span> <a class="hash-link" href="#color">#</a></h4>
        <div>
            <p>滚轮的前景颜色（默认为灰色）。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="hideswhenstopped"></a><span class="platform">ios</span>hidesWhenStopped <span class="propType">bool</span> <a class="hash-link" href="#hideswhenstopped">#</a></h4>
        <div>
            <p>在没有动画的时候，是否要隐藏指示器（默认为true）。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="size"></a>size <span class="propType">enum('small', 'large')</span> <a class="hash-link" href="#size">#</a></h4>
        <div>
            <p>指示器的大小。small的高度为20，large为36。</p>
        </div>
    </div>
</div>

### 例子

```jsx
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  ActivityIndicator,
  StyleSheet,
  View,
} = ReactNative;
const TimerMixin = require('react-timer-mixin');

const ToggleAnimatingActivityIndicator = React.createClass({
  mixins: [TimerMixin],

  getInitialState() {
    return {
      animating: true,
    };
  },

  setToggleTimeout() {
    this.setTimeout(() => {
      this.setState({animating: !this.state.animating});
      this.setToggleTimeout();
    }, 2000);
  },

  componentDidMount() {
    this.setToggleTimeout();
  },

  render() {
    return (
      <ActivityIndicator
        animating={this.state.animating}
        style={[styles.centering, {height: 80}]}
        size="large"
      />
    );
  }
});

exports.displayName = (undefined: ?string);
exports.framework = 'React';
exports.title = '<ActivityIndicator>';
exports.description = 'Animated loading indicators.';

exports.examples = [
  {
    title: 'Default (small, white)',
    render() {
      return (
        <ActivityIndicator
          style={[styles.centering, styles.gray]}
          color="white"
        />
      );
    }
  },
  {
    title: 'Gray',
    render() {
      return (
        <View>
          <ActivityIndicator
            style={[styles.centering]}
          />
          <ActivityIndicator
            style={[styles.centering, {backgroundColor: '#eeeeee'}]}
          />
        </View>
      );
    }
  },
  {
    title: 'Custom colors',
    render() {
      return (
        <View style={styles.horizontal}>
          <ActivityIndicator color="#0000ff" />
          <ActivityIndicator color="#aa00aa" />
          <ActivityIndicator color="#aa3300" />
          <ActivityIndicator color="#00aa00" />
        </View>
      );
    }
  },
  {
    title: 'Large',
    render() {
      return (
        <ActivityIndicator
          style={[styles.centering, styles.gray]}
          color="white"
          size="large"
        />
      );
    }
  },
  {
    title: 'Large, custom colors',
    render() {
      return (
        <View style={styles.horizontal}>
          <ActivityIndicator
            size="large"
            color="#0000ff"
          />
          <ActivityIndicator
            size="large"
            color="#aa00aa"
          />
          <ActivityIndicator
            size="large"
            color="#aa3300"
          />
          <ActivityIndicator
            size="large"
            color="#00aa00"
          />
        </View>
      );
    }
  },
  {
    title: 'Start/stop',
    render() {
      return <ToggleAnimatingActivityIndicator />;
    }
  },
  {
    title: 'Custom size',
    render() {
      return (
        <ActivityIndicator
          style={[styles.centering, {transform: [{scale: 1.5}]}]}
          size="large"
        />
      );
    }
  },
];

const styles = StyleSheet.create({
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  gray: {
    backgroundColor: '#cccccc',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});
```