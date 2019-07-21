---
id: version-0.40-vibration
title: Vibration
original_id: vibration
---

本模块导出函数`Vibration.vibrate()`用于控制设备震动。震动触发是异步的，也就是说这个函数会立即返回而非等待震动结束。

在不支持震动的设备上（如iOS模拟器），调用此方法没有任何效果。

注意对于android来说需要在`AndroidManifest.xml`中添加`<uses-permission android:name="android.permission.VIBRATE"/>`权限。

震动模式设置现在还不支持。

### 方法

<div class="props">
<div class="prop"><h4 class="propTitle"><a class="anchor" name="vibrate"></a><span class="propType">static </span>vibrate<span class="propType">(duration: number)</span> <a class="hash-link" href="docs/vibration.html#vibrate">#</a></h4></div>
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
} = ReactNative;

exports.framework = 'React';
exports.title = 'Vibration';
exports.description = 'Vibration API';
exports.examples = [
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
    title: 'Vibration.vibrate([0, 500, 200, 500])',
    render() {
      return (
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => Vibration.vibrate([0, 500, 200, 500])}>
          <View style={styles.button}>
            <Text>Vibrate once</Text>
          </View>
        </TouchableHighlight>
      );
    },
  },
  {
    title: 'Vibration.vibrate([0, 500, 200, 500], true)',
    render() {
      return (
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => Vibration.vibrate([0, 500, 200, 500], true)}>
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