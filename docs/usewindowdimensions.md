---
id: usewindowdimensions
title: useWindowDimensions
---

```jsx
import {useWindowDimensions} from 'react-native';
```

React native comes with `useWindowDimensions` which automatically updates the window size when screen size changes

```SnackPlayer name=useWindowDimensions&supportedPlatforms=ios,android
import React from "react";
import { View, StyleSheet, Text, useWindowDimensions } from "react-native";
export default function App() {
  const window = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text>{`Window Dimensions: height - ${window.height}, width - ${window.width}`}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
```

- You can also try [useDimensions](https://github.com/react-native-community/react-native-hooks#usedimensions) hook from [React native hooks](https://github.com/react-native-community/react-native-hooks) library which makes handling screen/window size changes much simpler.
- [React Native Responsive Dimensions](https://github.com/DaniAkash/react-native-responsive-dimensions) also comes with responsive hooks.
