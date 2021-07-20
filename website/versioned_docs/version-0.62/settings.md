---
id: settings
title: Settings
---

`Settings` serves as a wrapper for [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults), a persistent key-value store available only on iOS.

## Example

```SnackPlayer name=Settings%20Example&supportedPlatforms=ios
import React, { useState } from "react";
import { Button, Settings, StyleSheet, Text, View } from "react-native";

export default App = () => {
  const [data, setData] = useState(Settings.get("data"));

  const storeData = data => {
    Settings.set(data);
    setData(Settings.get("data"));
  };

  return (
    <View style={styles.container}>
      <Text>Stored value:</Text>
      <Text style={styles.value}>{data}</Text>
      <Button
        onPress={() => storeData({ data: "React" })}
        title="Store 'React'"
      />
      <Button
        onPress={() => storeData({ data: "Native" })}
        title="Store 'Native'"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  value: {
    fontSize: 24,
    marginVertical: 12
  }
});
```

---

# Reference

## Methods

### `clearWatch()`

```jsx
static clearWatch(watchId: number)
```

`watchId` is the number returned by `watchKeys()` when the subscription was originally configured.

### `get()`

```jsx
static get(key: string): mixed
```

Get the current value for a given `key` in `NSUserDefaults`.

---

### `set()`

```jsx
static set(settings: object)
```

Set one or more values in `NSUserDefaults`.

---

### `watchKeys()`

```jsx
static watchKeys(keys: string | array<string>, callback: function): number
```

Subscribe to be notified when the value for any of the keys specified by the `keys` parameter has been changed in `NSUserDefaults`. Returns a `watchId` number that may be used with `clearWatch()` to unsubscribe.

> **Note:** `watchKeys()` by design ignores internal `set()` calls and fires callback only on changes preformed outside of React Native code.
