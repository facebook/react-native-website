---
id: version-0.40-geolocation
title: Geolocation
original_id: geolocation
---

定位API遵循[web标准](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation)。

## iOS
你需要在Info.plist中增加`NSLocationWhenInUseUsageDescription`字段来启用定位功能。如果你使用`react-native init`创建项目，定位会被默认启用。

## Android
要请求访问地理位置的权限，你需要在`AndroidManifest.xml`文件中加入如下一行：  

`<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />`

## 方法
<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getcurrentposition"></a><span class="propType">static </span>getCurrentPosition<span
            class="propType">(geo_success: Function, geo_error?: Function, geo_options?: GeoOptions)</span> <a
            class="hash-link" href="#getcurrentposition">#</a></h4>
        <div><p>成功时会调用geo_success回调，参数中包含最新的位置信息。支持的选项：timeout (ms), maximumAge (ms), enableHighAccuracy (bool)</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="watchposition"></a><span
            class="propType">static </span>watchPosition<span class="propType">(success: Function, error?: Function, options?: GeoOptions)</span>
        <a class="hash-link" href="#watchposition">#</a></h4>
        <div><p>持续监听位置，每当位置变化之后都调用success回调。支持的选项：timeout (ms), maximumAge (ms), enableHighAccuracy (bool)</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="clearwatch"></a><span
            class="propType">static </span>clearWatch<span class="propType">(watchID: number)</span> <a
            class="hash-link" href="#clearwatch">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="stopobserving"></a><span
            class="propType">static </span>stopObserving<span class="propType">()</span> <a class="hash-link"
                                                                                            href="#stopobserving">#</a>
    </h4></div>
</div>

## 例子

```javascript
/* eslint no-console: 0 */
'use strict';


var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  View,
} = ReactNative;

exports.framework = 'React';
exports.title = 'Geolocation';
exports.description = 'Examples of using the Geolocation API.';

exports.examples = [
  {
    title: 'navigator.geolocation',
    render: function(): ReactElement<any> {
      return <GeolocationExample />;
    },
  }
];

var GeolocationExample = React.createClass({
  watchID: (null: ?number),

  getInitialState: function() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  render: function() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Initial position: </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Current position: </Text>
          {this.state.lastPosition}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});
```

