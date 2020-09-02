---
id: systrace
title: Systrace
---

`Systrace` is a standard Android marker-based profiling tool (and is installed when you install the Android platform-tools package). Profiled code blocks are surrounded by start/end markers which are then visualized in a colorful chart format. Both the Android SDK and React Native framework provide standard markers that you can visualize.

## Example

`Systrace` allows you to mark JavaScript (JS) events with a tag and an integer value. Capture the non-Timed JS events in EasyProfiler.

<div class="toggler">
  <ul role="tablist" class="toggle-syntax">
    <li id="functional" class="button-functional" aria-selected="false" role="tab" tabindex="0" aria-controls="functionaltab" onclick="displayTabs('syntax', 'functional')">
      Function Component Example
    </li>
    <li id="classical" class="button-classical" aria-selected="false" role="tab" tabindex="0" aria-controls="classicaltab" onclick="displayTabs('syntax', 'classical')">
      Class Component Example
    </li>
  </ul>
</div>

<block class="functional syntax" />

```SnackPlayer name=Systrace%20Function%20Component%20Example
import React from "react";
import { Button, Text, View, StyleSheet, Systrace } from "react-native";

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
    <View style={styles.container}>
      <Text style={[styles.header, styles.paragraph]}>React Native Systrace API</Text>
      <Button title="Capture the non-Timed JS events in EasyProfiler" onPress={()=> enableProfiling()}/>
      <Button title="Stop capturing" onPress={()=> stopProfiling()} color="#FF0000"/>
    </View>
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
    textAlign: "center"
  }
});

export default App;
```

<block class="classical syntax" />

```SnackPlayer name=Systrace%20Class%20Component%20Example
import React, { Component } from "react";
import { Button, Text, View, StyleSheet, Systrace } from "react-native";

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
      <View style={styles.container}>
        <Text style={[styles.header, styles.paragraph]}>React Native Systrace API</Text>
        <Button title="Capture the non-Timed JS events in EasyProfiler" onPress={()=> this.enableProfiling()}/>
        <Button title="Stop capturing" onPress={()=> this.stopProfiling()} color="#FF0000"/>
      </View>
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
    textAlign: "center"
  }
});

export default App;
```

<block class="endBlock syntax" />

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
