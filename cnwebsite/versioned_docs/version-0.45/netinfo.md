---
id: version-0.45-netinfo
title: NetInfo
original_id: netinfo
---

NetInfo模块可以获知设备联网或离线的状态信息。  

```javascript
NetInfo.fetch().done((reach) => {
  console.log('Initial: ' + reach);
});
function handleFirstConnectivityChange(reach) {
  console.log('First change: ' + reach);
  NetInfo.removeEventListener(
    'change',
    handleFirstConnectivityChange
  );
}
NetInfo.addEventListener(
  'change',
  handleFirstConnectivityChange
);
```

### IOS
以异步的方式判断设备是否联网，以及是否使用了移动数据网络。  

- `none` - 设备处于离线状态。
- `wifi` - 设备处于联网状态且通过wifi链接，或者是一个iOS的模拟器。
- `cell` - 设备是通过Edge、3G、WiMax或是LTE网络联网的。
- `unknown` - 发生错误，网络状况不可知  

### Android
请求网络信息需要先在应用的`AndroidManifest.xml`文件中添加如下权限字段：
```
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```
Android的联网类型：  
- `NONE` - 设备处于离线状态
- `BLUETOOTH` - 蓝牙数据连接
- `DUMMY` - 模拟数据连接
- `ETHERNET` - 以太网数据连接
- `MOBILE` - 移动网络数据连接
- `MOBILE_DUN` - 拨号移动网络数据连接
- `MOBILE_HIPRI` - 高优先级移动网络数据连接
- `MOBILE_MMS` - 彩信移动网络数据连接
- `MOBILE_SUPL` - 安全用户面定位（SUPL）数据连接
- `VPN` - 虚拟网络连接。需要Android5.0以上
- `WIFI` - WIFI数据连接
- `WIMAX` - WiMAX数据连接
- `UNKNOWN` - 未知数据连接

其他的连接状态已被Android API隐藏，但可以在需要时使用。

### isConnectionExpensive
此方法仅Android可用。用于判断当前活动的连接是否计费。如果当前连接是通过移动数据网络，或者通过基于移动数据网络所创建的wifi热点，都有可能被判定为计费的数据连接。  

```javascript    
NetInfo.isConnectionExpensive((isConnectionExpensive) => {
  console.log('Connection is ' + (isConnectionExpensive ? 'Expensive' : 'Not Expensive'));
});  
```

### isConnected
此方法所有平台皆可使用。以异步方式获取一个布尔值，用于判断当前设备是否联网。  

```javascript
NetInfo.isConnected.fetch().done((isConnected) => {
  console.log('First, is ' + (isConnected ? 'online' : 'offline'));
});
function handleFirstConnectivityChange(isConnected) {
  console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
  NetInfo.isConnected.removeEventListener(
    'change',
    handleFirstConnectivityChange
  );
}
NetInfo.isConnected.addEventListener(
  'change',
  handleFirstConnectivityChange
);
```


### 方法

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="addeventlistener"></a><span
            class="propType">static </span>addEventListener<span class="propType">(eventName, handler)</span> <a
            class="hash-link" href="#addeventlistener">#</a></h4>
        <div><p>在网络状况/类型发生变化时调用此监听函数。回调的参数为上面列出的网络状况/类型。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="removeeventlistener"></a><span class="propType">static </span>removeEventListener<span
            class="propType">(eventName, handler)</span> <a class="hash-link"
                                                            href="#removeeventlistener">#</a></h4>
        <div><p>移除网络状况/类型变化的监听函数。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="fetch"></a><span class="propType">static </span>fetch<span
            class="propType">()</span> <a class="hash-link" href="#fetch">#</a></h4>
        <div><p>返回一个promise，用于获取当前的网络状况/类型。</p></div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="isconnectionexpensive"></a><span class="propType">static </span>isConnectionExpensive<span
            class="propType">()</span> <a class="hash-link" href="#isconnectionexpensive">#</a></h4>
    </div>
</div>

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="isconnected"></a>isConnected<span class="propType">: ObjectExpression</span>
        <a class="hash-link" href="#isconnected">#</a></h4>
        <div><p>此属性为一个对象，也可调用上面列出的方法。但其监听函数接受的参数为一个布尔值，仅仅能表明当前网络是否联通。如果你只关心设备是否连上网了（不关心网络类型），那么使用此属性即可。</p></div>
    </div>
</div>

### 例子

```javascript
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  NetInfo,
  Text,
  View,
  TouchableWithoutFeedback,
} = ReactNative;

const ConnectionInfoSubscription = React.createClass({
  getInitialState() {
    return {
      connectionInfoHistory: [],
    };
  },
  componentDidMount: function() {
    NetInfo.addEventListener(
        'change',
        this._handleConnectionInfoChange
    );
  },
  componentWillUnmount: function() {
    NetInfo.removeEventListener(
        'change',
        this._handleConnectionInfoChange
    );
  },
  _handleConnectionInfoChange: function(connectionInfo) {
    const connectionInfoHistory = this.state.connectionInfoHistory.slice();
    connectionInfoHistory.push(connectionInfo);
    this.setState({
      connectionInfoHistory,
    });
  },
  render() {
    return (
        <View>
          <Text>{JSON.stringify(this.state.connectionInfoHistory)}</Text>
        </View>
    );
  }
});

const ConnectionInfoCurrent = React.createClass({
  getInitialState() {
    return {
      connectionInfo: null,
    };
  },
  componentDidMount: function() {
    NetInfo.addEventListener(
        'change',
        this._handleConnectionInfoChange
    );
    NetInfo.fetch().done(
        (connectionInfo) => { this.setState({connectionInfo}); }
    );
  },
  componentWillUnmount: function() {
    NetInfo.removeEventListener(
        'change',
        this._handleConnectionInfoChange
    );
  },
  _handleConnectionInfoChange: function(connectionInfo) {
    this.setState({
      connectionInfo,
    });
  },
  render() {
    return (
        <View>
          <Text>{this.state.connectionInfo}</Text>
        </View>
    );
  }
});

const IsConnected = React.createClass({
  getInitialState() {
    return {
      isConnected: null,
    };
  },
  componentDidMount: function() {
    NetInfo.isConnected.addEventListener(
        'change',
        this._handleConnectivityChange
    );
    NetInfo.isConnected.fetch().done(
        (isConnected) => { this.setState({isConnected}); }
    );
  },
  componentWillUnmount: function() {
    NetInfo.isConnected.removeEventListener(
        'change',
        this._handleConnectivityChange
    );
  },
  _handleConnectivityChange: function(isConnected) {
    this.setState({
      isConnected,
    });
  },
  render() {
    return (
        <View>
          <Text>{this.state.isConnected ? 'Online' : 'Offline'}</Text>
        </View>
    );
  }
});

const IsConnectionExpensive = React.createClass({
  getInitialState() {
    return {
      isConnectionExpensive: (null : ?boolean),
    };
  },
  _checkIfExpensive() {
    NetInfo.isConnectionExpensive().then(
        isConnectionExpensive => { this.setState({isConnectionExpensive}); }
    );
  },
  render() {
    return (
        <View>
          <TouchableWithoutFeedback onPress={this._checkIfExpensive}>
            <View>
              <Text>Click to see if connection is expensive:
                {this.state.isConnectionExpensive === true ? 'Expensive' :
                this.state.isConnectionExpensive === false ? 'Not expensive'
                : 'Unknown'}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
    );
  }
});

exports.title = 'NetInfo';
exports.description = 'Monitor network status';
exports.examples = [
  {
    title: 'NetInfo.isConnected',
    description: 'Asynchronously load and observe connectivity',
    render(): ReactElement<any> { return <IsConnected />; }
  },
  {
    title: 'NetInfo.update',
    description: 'Asynchronously load and observe connectionInfo',
    render(): ReactElement<any> { return <ConnectionInfoCurrent />; }
  },
  {
    title: 'NetInfo.updateHistory',
    description: 'Observed updates to connectionInfo',
    render(): ReactElement<any> { return <ConnectionInfoSubscription />; }
  },
  {
    platform: 'android',
    title: 'NetInfo.isConnectionExpensive (Android)',
    description: 'Asynchronously check isConnectionExpensive',
    render(): ReactElement<any> { return <IsConnectionExpensive />; }
  },
];
```
