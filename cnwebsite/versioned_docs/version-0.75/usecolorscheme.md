---
id: usecolorscheme
title: useColorScheme
---

```jsx
import { useColorScheme } from 'react-native';
```

`useColorScheme` 这个React hook 提供并订阅来自Appearance模块的颜色方案更新。返回值表示当前用户首选的颜色方案。该值可以稍后通过直接用户动作（例如，设备设置中的主题选择）或根据时间表（例如，遵循白天/夜晚周期的亮主题和暗主题）来更新。

### 支持的颜色方案

- `"light"`: 用户倾向于使用浅色主题。
- `"dark"`: 用户倾向于使用深色主题。
- `null`: 用户未指定首选颜色方案。

---

## Example

```SnackPlayer
import React from 'react';
import { Text, StyleSheet, useColorScheme, View } from 'react-native';

const App = () => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <Text>useColorScheme(): {colorScheme}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
});

export default App;
```

您可以在[`AppearanceExample.js`](https://github.com/facebook/react-native/blob/master/packages/rn-tester/js/examples/Appearance/AppearanceExample.js)中找到一个完整的示例，该示例演示了如何使用此钩子以及React上下文来为您的应用程序添加浅色和深色主题支持。 
