---
id: version-0.27-netinfo
title: NetInfo
original_id: netinfo
---

NetInfo exposes info about online/offline status

```
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

Asynchronously determine if the device is online and on a cellular network.

- `none` - device is offline
- `wifi` - device is online and connected via wifi, or is the iOS simulator
- `cell` - device is connected via Edge, 3G, WiMax, or LTE
- `unknown` - error case and the network status is unknown

### Android

To request network info, you need to add the following line to your app's `AndroidManifest.xml`:

`<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />` Asynchronously determine if the device is connected and details about that connection.

Android Connectivity Types.

- `NONE` - device is offline
- `BLUETOOTH` - The Bluetooth data connection.
- `DUMMY` - Dummy data connection.
- `ETHERNET` - The Ethernet data connection.
- `MOBILE` - The Mobile data connection.
- `MOBILE_DUN` - A DUN-specific Mobile data connection.
- `MOBILE_HIPRI` - A High Priority Mobile data connection.
- `MOBILE_MMS` - An MMS-specific Mobile data connection.
- `MOBILE_SUPL` - A SUPL-specific Mobile data connection.
- `VPN` - A virtual network using one or more native bearers. Requires API Level 21
- `WIFI` - The WIFI data connection.
- `WIMAX` - The WiMAX data connection.
- `UNKNOWN` - Unknown data connection.

The rest ConnectivityStates are hidden by the Android API, but can be used if necessary.

### isConnectionExpensive

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

### isConnected

Available on all platforms. Asynchronously fetch a boolean to determine internet connectivity.

```
NetInfo.isConnected.fetch().then(isConnected => {
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

### Methods

- [`addEventListener`](netinfo.md#addeventlistener)
- [`removeEventListener`](netinfo.md#removeeventlistener)
- [`fetch`](netinfo.md#fetch)
- [`isConnectionExpensive`](netinfo.md#isconnectionexpensive)

### Properties

- [`isConnected`](netinfo.md#isconnected)

---

# Reference

## Methods

### `addEventListener()`

```jsx
static addEventListener(eventName, handler)
```

Invokes the listener whenever network status changes. The listener receives one of the connectivity types listed above.

---

### `removeEventListener()`

```jsx
static removeEventListener(eventName, handler)
```

Removes the listener for network status changes.

---

### `fetch()`

```jsx
static fetch()
```

Returns a promise that resolves with one of the connectivity types listed above.

---

### `isConnectionExpensive()`

```jsx
static isConnectionExpensive()
```

## Properties
