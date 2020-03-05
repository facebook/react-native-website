---
id: settings
title: Settings
---

`Settings` serves as a wrapper for [`NSUserDefaults`](https://developer.apple.com/documentation/foundation/nsuserdefaults), a persistent key-value store available only on iOS.

## Example

```SnackPlayer name=Settings%20Example&supportedPlatforms=ios
import React, { useEffect, useState } from "react";
import { Button, Settings, StyleSheet, Text, View } from "react-native";

export default App = () => {
  const [data, setData] = useState("-");
  
  useEffect(() => {
    const watchId = Settings.watchKeys(
      "data", 
      () => setData(Settings.get("data"))
    );
    return () => Settings.clearWatch(watchId);
  });

  return (
    <View style={styles.container}>
      <Text>Stored value:</Text>
      <Text>{data}</Text>
      <Button 
        onPress={() => Settings.set({ data: "React" })} 
        title="Store 'React'"
      />
      <Button 
        onPress={() => Settings.set({ data: "Native" })} 
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

Get the current value for a key in `NSUserDefaults`.

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

Subscribe to be notified when the value for any of the keys specified by the `keys` array changes in `NSUserDefaults`. Returns a `watchId` number that may be used with `clearWatch()` to unsubscribe.
