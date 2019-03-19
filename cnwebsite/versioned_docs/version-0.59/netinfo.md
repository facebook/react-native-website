---
id: version-0.59-netinfo
title: NetInfo
original_id: netinfo
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

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

`EffectiveConnectionType`有如下跨平台可用的值:

* `2g`
* `3g`
* `4g`
* `unknown`

### Android

要在Android上获取联网状态，还需要在`AndroidManifest.xml`中添加如下权限请求：

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

添加一个事件监听函数。

**参数：**

| 名称      | 类型                           | 必填 | 说明                   |
| --------- | ------------------------------ | ---- | ---------------------- |
| eventName | enum(connectionChange, change) | 是   | 事件名 |
| handler   | function                       | 是   | 监听函数     |

支持的事件名：

* `connectionChange`：当联网状态改变时触发。传给监听函数的参数是一个对象，包含有下列属性：
  * `type`： 上面所列出的`ConnectionType`值
  * `effectiveType`: 上面所列出的`EffectiveConnectionType`值
* `change`: 这一事件已过期。请使用`connectionChange`代替。当联网状态改变时触发。

---

### `removeEventListener()`

```javascript
NetInfo.removeEventListener(eventName, handler);
```

移除联网状态改变的监听函数。

**参数：**

| 名称      | 类型                           | 必填 | 说明                   |
| --------- | ------------------------------ | ---- | ---------------------- |
| eventName | enum(connectionChange, change) | 是   | 事件名 |
| handler   | function                       | 是   | 监听函数     |

---

### `getConnectionInfo()`

```javascript
NetInfo.getConnectionInfo();
```

返回一个promise，最终解析值为带有`type`和`effectiveType`属性的对象。其中`type`属性的值为[`ConnectionType`](netinfo.md#connectiontype-enum) ，而`effectiveType`属性的值为[`EffectiveConnectionType`](netinfo.md#effectiveconnectiontype-enum))。

---

### `isConnectionExpensive()`

```javascript
NetInfo.isConnectionExpensive();
```

仅Android可用。用于判断当前活动的连接是否计费。如果当前连接是通过移动数据网络，或者通过基于移动数据网络所创建的wifi热点，或是大量消耗电池等等，都有可能被判定为计费的数据连接。

```
NetInfo.isConnectionExpensive()
.then(isConnectionExpensive => {
  console.log('Connection is ' + (isConnectionExpensive ? 'Expensive' : 'Not Expensive'));
})
.catch(error => {
  console.error(error);
});
```

## 属性

### `isConnected`

在所有平台上可用。以异步方式获取一个布尔值，用于判断当前设备是否联网。

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
