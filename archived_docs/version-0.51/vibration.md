---
id: version-0.51-vibration
title: Vibration
original_id: vibration
---

本模块导出函数`Vibration.vibrate()`用于控制设备震动。震动触发是异步的，也就是说这个函数会立即返回而非等待震动结束。

在不支持震动的设备上（如iOS模拟器），调用此方法没有任何效果。

注意对于android来说需要在`AndroidManifest.xml`中添加`<uses-permission android:name="android.permission.VIBRATE"/>`权限。

### 方法

<div class="props">
	<div class="prop">
		<h4 class="methodTitle"><a class="anchor" name="vibrate"></a><span class="methodType">static </span>vibrate<span class="methodType">(pattern, repeat)</span> <a class="hash-link" href="#vibrate">#</a>
		</h4>
		<div>
		<p><code>pattern</code>参数为一个不定长的数组。在Andriod上，数组第一个元素表示开始震动前的等待时间，然后是震动持续时长和等待时长的交替，例如[0, 500, 1000, 500]表示立刻开始震动500ms，然后等待1000ms，再震动500ms；但在iOS上震动时长是固定的，所以从数组第二个元素开始都是表示震动的间隔时长。</p>
		<p><code>repeat</code>参数为布尔类型，表示是否持续循环震动。为true时只有调用cancel才会停止。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="methodTitle"><a class="anchor" name="cancel"></a><span class="methodType">static </span>cancel<span class="methodType">()</span> <a class="hash-link" href="#cancel">#</a>
		</h4>
	<div><p>停止震动。</p></div>
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
  Vibration,
  Platform,
} = ReactNative;

exports.framework = 'React';
exports.title = 'Vibration';
exports.description = 'Vibration API';

var pattern, patternLiteral, patternDescription;
if (Platform.OS === 'android') {
  pattern = [0, 500, 200, 500];
  patternLiteral = '[0, 500, 200, 500]';
  patternDescription = `${patternLiteral}
arg 0: duration to wait before turning the vibrator on.
arg with odd: vibration length.
arg with even: duration to wait before next vibration.
`;
} else {
  pattern = [0, 1000, 2000, 3000];
  patternLiteral = '[0, 1000, 2000, 3000]';
  patternDescription = `${patternLiteral}
vibration length on iOS is fixed.
pattern controls durations BETWEEN each vibration only.

arg 0: duration to wait before turning the vibrator on.
subsequent args: duration to wait before next vibrattion.
`;
}

exports.examples = [
  {
    title: 'Pattern Descriptions',
    render() {
      return (
        <View style={styles.wrapper}>
          <Text>{patternDescription}</Text>
        </View>
      );
    },
  },
  {
    title: 'Vibration.vibrate()',
    render() {
      return (
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => Vibration.vibrate()}>
          <View style={styles.button}>
            <Text>Vibrate</Text>
          </View>
        </TouchableHighlight>
      );
    },
  },
  {
    title: `Vibration.vibrate(${patternLiteral})`,
    render() {
      return (
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => Vibration.vibrate(pattern)}>
          <View style={styles.button}>
            <Text>Vibrate once</Text>
          </View>
        </TouchableHighlight>
      );
    },
  },
  {
    title: `Vibration.vibrate(${patternLiteral}, true)`,
    render() {
      return (
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => Vibration.vibrate(pattern, true)}>
          <View style={styles.button}>
            <Text>Vibrate until cancel</Text>
          </View>
        </TouchableHighlight>
      );
    },
  },
  {
    title: 'Vibration.cancel()',
    render() {
      return (
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => Vibration.cancel()}>
          <View style={styles.button}>
            <Text>Cancel</Text>
          </View>
        </TouchableHighlight>
      );
    },
  },
];

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