---
id: systrace
title: Systrace
---

`Systrace` is a standard Android marker-based profiling tool (and is installed when you install the Android platform-tools package). Profiled code blocks are surrounded by start/end markers which are then visualized in a colorful chart format. Both the Android SDK and React Native framework provide standard markers that you can visualize.

## Example

`Systrace` allows you to mark JavaScript (JS) events with a tag and an integer value. Capture the non-Timed JS events in EasyProfiler.

```SnackPlayer name=Systrace%20Example
import React from 'react';
import {
  Button,
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Systrace,
} from 'react-native';

const App = () => {
  const enableProfiling = () => {
    Systrace.setEnabled(true); // Call setEnabled to turn on the profiling.
    Systrace.beginEvent('event_label');
    Systrace.counterEvent('event_label', 10);
  };

  const stopProfiling = () => {
    Systrace.endEvent();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.header, styles.paragraph]}>
        React Native Systrace API
      </Text>
      <View style={styles.buttonRow}>
        <Button
          title="Capture the non-Timed JS events in EasyProfiler"
          onPress={() => enableProfiling()}
        />
        <Button
          title="Stop capturing"
          onPress={() => stopProfiling()}
          color="#FF0000"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 44,
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 25,
    textAlign: 'center',
  },
  buttonRow: {
    flexBasis: 150,
    marginVertical: 16,
    justifyContent: 'space-evenly',
  },
});

export default App;
```

---

# Reference

## Methods

### `isEnabled()`

```tsx
static isEnabled(): boolean;
```

---

### `beginEvent()`

```tsx
static beginEvent(eventName: string | (() => string), args?: EventArgs);
```

beginEvent/endEvent for starting and then ending a profile within the same call stack frame.

---

### `endEvent()`

```tsx
static endEvent(args?: EventArgs);
```

---

### `beginAsyncEvent()`

```tsx
static beginAsyncEvent(
  eventName: string | (() => string),
  args?: EventArgs,
): number;
```

beginAsyncEvent/endAsyncEvent for starting and then ending a profile where the end can either occur on another thread or out of the current stack frame, eg await the returned cookie variable should be used as input into the endAsyncEvent call to end the profile.

---

### `endAsyncEvent()`

```tsx
static endAsyncEvent(
  eventName: EventName,
  cookie: number,
  args?: EventArgs,
);
```

---

### `counterEvent()`

```tsx
static counterEvent(eventName: string | (() => string), value: number);
```

Register the value to the profileName on the systrace timeline.
