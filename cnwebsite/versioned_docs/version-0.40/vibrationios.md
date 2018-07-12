---
id: version-0.40-vibrationios
title: VibrationIOS
original_id: vibrationios
---

注意：`VibrationIOS`已经过期。请使用[`Vibration`](vibration.html)代替。  
本模块导出函数`VibrationIOS.vibrate()`用于控制设备震动。在iOS设备上，调用这个函数会触发一个一秒钟的震动。震动触发是异步的，也就是说这个函数会立即返回而非等待震动结束。

在不支持震动的设备上（如iOS模拟器），调用此方法没有任何效果。

震动模式设置现在还不支持。

### 方法

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="vibrate"></a><span class="propType">static </span>vibrate<span class="propType">()</span> <a class="hash-link" href="#vibrate">#</a></h4></div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  VibrationIOS
} = ReactNative;

exports.framework = 'React';
exports.title = 'VibrationIOS';
exports.description = 'Vibration API for iOS';
exports.examples = [{
  title: 'VibrationIOS.vibrate()',
  render() {
    return (
      <TouchableHighlight
        style={styles.wrapper}
        onPress={() => VibrationIOS.vibrate()}>
        <View style={styles.button}>
          <Text>Vibrate</Text>
        </View>
      </TouchableHighlight>
    );
  },
}];

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