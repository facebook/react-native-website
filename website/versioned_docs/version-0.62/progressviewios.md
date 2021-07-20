---
id: progressviewios
title: '🚧 ProgressViewIOS'
---

> **Deprecated.** Use [@react-native-community/progress-view](https://github.com/react-native-progress-view/progress-view) instead.

Uses `ProgressViewIOS` to render a UIProgressView on iOS.

### Example

```SnackPlayer name=ProgressViewIOS&supportedPlatforms=ios
import React from 'react';
import {View, StyleSheet, ProgressViewIOS, Text} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.example}>
        <Text>Progress Bar - 0%</Text>
        <ProgressViewIOS style={styles.progress} />
      </View>
      <View style={styles.example}>
        <Text>Colored Progress Bar - 50%</Text>
        <ProgressViewIOS
          style={styles.progress}
          progressTintColor=""
          progress={0.5}
        />
      </View>
      <View>
        <Text>Progress Bar - 100%</Text>
        <ProgressViewIOS
          style={styles.progress}
          progressTintColor="black"
          progress={1}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  example: {
    marginVertical: 20,
  },
  progress: {
    width: 200,
  },
});
```

---

# Reference

## Props

Inherits [View Props](view.md#props).

### `progress`

The progress value (between 0 and 1).

| Type   | Required |
| ------ | -------- |
| number | No       |

---

### `progressImage`

A stretchable image to display as the progress bar.

| Type                   | Required |
| ---------------------- | -------- |
| Image.propTypes.source | No       |

---

### `progressTintColor`

The tint color of the progress bar itself.

| Type   | Required |
| ------ | -------- |
| string | No       |

---

### `progressViewStyle`

The progress bar style.

| Type                   | Required |
| ---------------------- | -------- |
| enum('default', 'bar') | No       |

---

### `trackImage`

A stretchable image to display behind the progress bar.

| Type                   | Required |
| ---------------------- | -------- |
| Image.propTypes.source | No       |

---

### `trackTintColor`

The tint color of the progress bar track.

| Type   | Required |
| ------ | -------- |
| string | No       |
