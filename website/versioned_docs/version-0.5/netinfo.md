---
id: version-0.5-netinfo
title: NetInfo
original_id: netinfo
---

NetInfo exposes info about online/offline status

### reachabilityIOS

Asynchronously determine if the device is online and on a cellular network.

- `none` - device is offline
- `wifi` - device is online and connected via wifi, or is the iOS simulator
- `cell` - device is connected via Edge, 3G, WiMax, or LTE
- `unknown` - error case and the network status is unknown

```
NetInfo.reachabilityIOS.fetch().done((reach) => {
  console.log('Initial: ' + reach);
});
function handleFirstReachabilityChange(reach) {
  console.log('First change: ' + reach);
  NetInfo.reachabilityIOS.removeEventListener(
    'change',
    handleFirstReachabilityChange
  );
}
NetInfo.reachabilityIOS.addEventListener(
  'change',
  handleFirstReachabilityChange
);
```

### isConnected

Available on all platforms. Asynchronously fetch a boolean to determine internet connectivity.

```
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

---

# Reference
