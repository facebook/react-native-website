---
id: platformcolor
title: PlatformColor
---

```
PlatformColor(string)
```

Use the `PlatformColor` function to access native colors on the target platform via supplying the native color’s corresponding string value. You pass a string to the `PlatformColor` function, and provided it exists on that platform, that native color will be applied to the control or Javascript component specified in your style. All native color logic also translates if applicable, meaning if the native color specified is themes and/or high contrast sensitive, that logic will also transfer to the JavaScript component being colored.

For a full list of the types of system colors supported, see:

- [Android R.attr](https://developer.android.com/reference/android/R.attr)
- [iOS Color](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/color/)

## Example

```
import React from 'react';
import { Text, View, StyleSheet, PlatformColor, Platform } from 'react-native';

export default function App() {
  return (
    <View>
      <Text style={styles.labelCell}>
        I am a special label color!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
   labelCell: {
    flex: 1,
    alignItems: 'stretch',
    ...Platform.select({
      ios: {color: PlatformColor('labelColor')},
      android: {color: PlatformColor('?attr/colorControlNormal')},
      default: {color: 'black'},
    }),
  },
});
```

The string value provided to the `PlatformColor` function must match and agree with the same string as it exists on the native platform the app is being run on. This means to avoid runtime errors the function should be wrapped in a platform check, either through a `Platform.OS === ‘platform’` or a `Platform.Select()`.

You can find a complete example that demonstrates proper, intended use of PlatformColor in [PlatformColorExample.js](https://github.com/facebook/react-native/blob/master/RNTester/js/examples/PlatformColor/PlatformColorExample.js).
