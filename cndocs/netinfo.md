---
id: netinfo
title: NetInfo
---

通过NetInfo模块可以获取设备当前的联网状态。

```
NetInfo.getConnectionInfo().then((connectionInfo) => {
  console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
});
function handleFirstConnectivityChange(connectionInfo) {
  console.log('First change, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
  NetInfo.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}
NetInfo.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);
```

### ConnectionType枚举值

`ConnectionType`描述了设备联网的方式。

`ConnectionType`有如下跨平台可用的值:

* `none` - 设备处于离线状态
* `wifi` - 设备通过wifi联网，或者设备是iOS模拟器
* `cellular` - 设备通过蜂窝数据流量联网
* `unknown` - 联网状态异常

`ConnectionType`还有如下仅在Android平台上可用的值:

* `bluetooth` - 设备通过蓝牙协议联网
* `ethernet` - 设备通过以太网协议联网
* `wimax` - 设备通过WiMAX协议联网

### EffectiveConnectionType枚举值

Cross platform values for `EffectiveConnectionType`:

* `2g`
* `3g`
* `4g`
* `unknown`

### Android

To request network info, you need to add the following line to your app's `AndroidManifest.xml`:

`<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />`

### 查看方法

* [`addEventListener`](netinfo.md#addeventlistener)
* [`removeEventListener`](netinfo.md#removeeventlistener)
* [`getConnectionInfo`](netinfo.md#getconnectioninfo)
* [`isConnectionExpensive`](netinfo.md#isconnectionexpensive)

### 查看属性

* [`isConnected`](netinfo.md#isconnected)

---

# 文档

## 方法

### `addEventListener()`

```javascript
NetInfo.addEventListener(eventName, handler);
```

Adds an event handler.

**参数：**

| 名称      | 类型                           | 必填 | 说明                   |
| --------- | ------------------------------ | ---- | ---------------------- |
| eventName | enum(connectionChange, change) | 是   | The change event name. |
| handler   | function                       | 是   | Listener function.     |

Supported events:

* `connectionChange`: Fires when the network status changes. The argument to the event handler is an object with keys:
  * `type`: A `ConnectionType` (listed above)
  * `effectiveType`: An `EffectiveConnectionType` (listed above)
* `change`: This event is deprecated. Listen to `connectionChange` instead. Fires when the network status changes. The argument to the event handler is one of the deprecated connectivity types listed above.

---

### `removeEventListener()`

```javascript
NetInfo.removeEventListener(eventName, handler);
```

Removes the listener for network status changes.

**参数：**

| 名称      | 类型                           | 必填 | 说明                   |
| --------- | ------------------------------ | ---- | ---------------------- |
| eventName | enum(connectionChange, change) | 是   | The change event name. |
| handler   | function                       | 是   | Listener function.     |

---

### `getConnectionInfo()`

```javascript
NetInfo.getConnectionInfo();
```

Returns a promise that resolves to an object with `type` and `effectiveType` keys whose values are a [`ConnectionType`](netinfo.md#connectiontype-enum) and an [`EffectiveConnectionType`](netinfo.md#effectiveconnectiontype-enum)), respectively.

---

### `isConnectionExpensive()`

```javascript
NetInfo.isConnectionExpensive();
```

Available on Android. Detect if the current active connection is metered or not. A network is classified as metered when the user is sensitive to heavy data usage on that connection due to monetary costs, data limitations or battery/performance issues.

```
NetInfo.isConnectionExpensive()
.then(isConnectionExpensive => {
  console.log('Connection is ' + (isConnectionExpensive ? 'Expensive' : 'Not Expensive'));
})
.catch(error => {
  console.error(error);
});
```

## Properties

### `isConnected`

Available on all platforms. Asynchronously fetch a boolean to determine internet connectivity.

```
NetInfo.isConnected.fetch().then(isConnected => {
  console.log('First, is ' + (isConnected ? 'online' : 'offline'));
});
function handleFirstConnectivityChange(isConnected) {
  console.log('Then, is ' + (isConnected ? 'online' : 'offline'));
  NetInfo.isConnected.removeEventListener(
    'connectionChange',
    handleFirstConnectivityChange
  );
}
NetInfo.isConnected.addEventListener(
  'connectionChange',
  handleFirstConnectivityChange
);
```
