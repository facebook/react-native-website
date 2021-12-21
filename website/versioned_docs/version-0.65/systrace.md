---
id: systrace
title: Systrace
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

`Systrace` is a standard Android marker-based profiling tool (and is installed when you install the Android platform-tools package). Profiled code blocks are surrounded by start/end markers which are then visualized in a colorful chart format. Both the Android SDK and React Native framework provide standard markers that you can visualize.

## Example

`Systrace` allows you to mark JavaScript (JS) events with a tag and an integer value. Capture the non-Timed JS events in EasyProfiler.

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Systrace%20Function%20Component%20Example
import React from "react";
import { Button, Text, View, SafeAreaView, StyleSheet, Systrace } from "react-native";

const App = () =>  {

  const enableProfiling = () => {
    Systrace.setEnabled(true); // Call setEnabled to turn on the profiling.
    Systrace.beginEvent('event_label')
    Systrace.counterEvent('event_label', 10);
  }

  const stopProfiling = () => {
    Systrace.endEvent()
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.header, styles.paragraph]}>React Native Systrace API</Text>
    <View style={styles.buttonRow}>
      <Button title="Capture the non-Timed JS events in EasyProfiler" onPress={()=> enableProfiling()}/>
      <Button title="Stop capturing" onPress={()=> stopProfiling()} color="#FF0000"/>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 44,
    padding: 8
  },
   header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  paragraph: {
    margin: 24,
    fontSize: 25,
    textAlign: "center"
  },
  buttonRow: {
    flexBasis: 150,
    marginVertical: 16,
    justifyContent: 'space-evenly'
  }
});

export default App;
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Systrace%20Class%20Component%20Example
import React, { Component } from "react";
import { Button, Text, View, SafeAreaView, StyleSheet, Systrace } from "react-native";

class App extends Component {

  enableProfiling = () => {
    Systrace.setEnabled(true); // Call setEnabled to turn on the profiling.
    Systrace.beginEvent('event_label')
    Systrace.counterEvent('event_label', 10);
  }

  stopProfiling = () => {
    Systrace.endEvent()
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>React Native Systrace API</Text>
      <View style={styles.buttonRow}>
        <Button title="Capture the non-Timed JS events in EasyProfiler" onPress={()=> this.enableProfiling()}/>
        <Button title="Stop capturing" onPress={()=> this.stopProfiling()} color="#FF0000"/>
      </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 44,
    padding: 8
  },
   header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  paragraph: {
    margin: 24,
    fontSize: 25,
    textAlign: "center"
  },
  buttonRow: {
    flexBasis: 150,
    marginVertical: 16,
    justifyContent: 'space-evenly'
  }
});

export default App;
```

</TabItem>
</Tabs>

---

# Reference

## Methods

### `installReactHook()`

```jsx
static installReactHook(useFiber)
```

---

### `setEnabled()`

```jsx
static setEnabled(enabled)
```

---

### `isEnabled()`

```jsx
static isEnabled()
```

---

### `beginEvent()`

```jsx
static beginEvent(profileName?, args?)
```

beginEvent/endEvent for starting and then ending a profile within the same call stack frame.

---

### `endEvent()`

```jsx
static endEvent()
```

---

### `beginAsyncEvent()`

```jsx
static beginAsyncEvent(profileName?)
```

beginAsyncEvent/endAsyncEvent for starting and then ending a profile where the end can either occur on another thread or out of the current stack frame, eg await the returned cookie variable should be used as input into the endAsyncEvent call to end the profile.

---

### `endAsyncEvent()`

```jsx
static endAsyncEvent(profileName?, cookie?)
```

---

### `counterEvent()`

```jsx
static counterEvent(profileName?, value?)
```

Register the value to the profileName on the systrace timeline.
