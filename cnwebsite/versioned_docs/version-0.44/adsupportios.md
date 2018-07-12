---
id: version-0.44-adsupportios
title: AdSupportIOS
original_id: adsupportios
---


### 方法

<div class="props">
    <div class="prop">
        <h4 class="methodTitle">
            <a class="anchor" name="getadvertisingid"></a>
            <span class="methodType">static </span>getAdvertisingId<span class="methodType">(onSuccess, onFailure)</span> 
            <a class="hash-link" href="#getadvertisingid">#</a>
        </h4>
    </div>
    <div class="prop">
        <h4 class="methodTitle">
            <a class="anchor" name="getadvertisingtrackingenabled"></a>
            <span class="methodType">static </span>getAdvertisingTrackingEnabled<span class="methodType">(onSuccess, onFailure)</span> 
            <a class="hash-link" href="#getadvertisingtrackingenabled">#</a>
        </h4>
    </div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AdSupportIOS,
  StyleSheet,
  Text,
  View,
} = ReactNative;

exports.framework = 'React';
exports.title = 'Advertising ID';
exports.description = 'Example of using the ad support API.';

exports.examples = [
  {
    title: 'Ad Support IOS',
    render: function(): ReactElement<any> {
      return <AdSupportIOSExample />;
    },
  }
];

class AdSupportIOSExample extends React.Component {
  state = {
    deviceID: 'No IDFA yet',
    hasAdvertiserTracking: 'unset',
  };

  componentDidMount() {
    AdSupportIOS.getAdvertisingId(
      this._onDeviceIDSuccess,
      this._onDeviceIDFailure
    );

    AdSupportIOS.getAdvertisingTrackingEnabled(
      this._onHasTrackingSuccess,
      this._onHasTrackingFailure
    );
  }

  _onHasTrackingSuccess = (hasTracking) => {
    this.setState({
      'hasAdvertiserTracking': hasTracking,
    });
  };

  _onHasTrackingFailure = (e) => {
    this.setState({
      'hasAdvertiserTracking': 'Error!',
    });
  };

  _onDeviceIDSuccess = (deviceID) => {
    this.setState({
      'deviceID': deviceID,
    });
  };

  _onDeviceIDFailure = (e) => {
    this.setState({
      'deviceID': 'Error!',
    });
  };

  render() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Advertising ID: </Text>
          {JSON.stringify(this.state.deviceID)}
        </Text>
        <Text>
          <Text style={styles.title}>Has Advertiser Tracking: </Text>
          {JSON.stringify(this.state.hasAdvertiserTracking)}
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  title: {
    fontWeight: '500',
  },
});
```
