---
id: netinfo
title: '🚧 NetInfo'
---

> **Removed.** Use one of the [community packages](https://reactnative.directory/?search=network) instead.

NetInfo exposes info about online/offline status

```jsx
NetInfo.getConnectionInfo().then((connectionInfo) => {
  console.log(
    'Initial, type: ' +
      connectionInfo.type +
      ', effectiveType: ' +
      connectionInfo.effectiveType
  );
});
function handleFirstConnectivityChange(connectionInfo) {
  console.log(
    'First change, type: ' +
      connectionInfo.type +
      ', effectiveType: ' +
      connectionInfo.effectiveType
  );
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

### ConnectionType enum

`ConnectionType` describes the type of connection the device is using to communicate with the network.

Cross platform values for `ConnectionType`:

- `none` - device is offline
- `wifi` - device is online and connected via wifi, or is the iOS simulator
- `cellular` - device is connected via Edge, 3G, WiMax, or LTE
- `unknown` - error case and the network status is unknown

Android-only values for `ConnectionType`:

- `bluetooth` - device is connected via Bluetooth
- `ethernet` - device is connected via Ethernet
- `wimax` - device is connected via WiMAX

### EffectiveConnectionType enum

Cross platform values for `EffectiveConnectionType`:

- `2g`
- `3g`
- `4g`
- `unknown`

### Android

To request network info, you need to add the following line to your app's `AndroidManifest.xml`:

`<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />`

### Methods

- [`addEventListener`](netinfo.md#addeventlistener)
- [`removeEventListener`](netinfo.md#removeeventlistener)
- [`getConnectionInfo`](netinfo.md#getconnectioninfo)
- [`isConnectionExpensive`](netinfo.md#isconnectionexpensive)

### Properties

- [`isConnected`](netinfo.md#isconnected)

---

# Reference

## Methods

### `addEventListener()`

```jsx
NetInfo.addEventListener(eventName, handler);
```

Adds an event handler.

**Parameters:**

| Name      | Type                           | Required | Description            |
| --------- | ------------------------------ | -------- | ---------------------- |
| eventName | enum(connectionChange, change) | Yes      | The change event name. |
| handler   | function                       | Yes      | Listener function.     |

Supported events:

- `connectionChange`: Fires when the network status changes. The argument to the event handler is an object with keys:
  - `type`: A `ConnectionType` (listed above)
  - `effectiveType`: An `EffectiveConnectionType` (listed above)
- `change`: This event is deprecated. Listen to `connectionChange` instead. Fires when the network status changes. The argument to the event handler is one of the deprecated connectivity types listed above.

---

### `removeEventListener()`

```jsx
NetInfo.removeEventListener(eventName, handler);
```

Removes the listener for network status changes.

**Parameters:**

| Name      | Type                           | Required | Description            |
| --------- | ------------------------------ | -------- | ---------------------- |
| eventName | enum(connectionChange, change) | Yes      | The change event name. |
| handler   | function                       | Yes      | Listener function.     |

---

### `getConnectionInfo()`

```jsx
NetInfo.getConnectionInfo();
```

Returns a promise that resolves to an object with `type` and `effectiveType` keys whose values are a [`ConnectionType`](netinfo.md#connectiontype-enum) and an [`EffectiveConnectionType`](netinfo.md#effectiveconnectiontype-enum)), respectively.

---

### `isConnectionExpensive()`

```jsx
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
