---
id: i18nmanager
title: I18nManager
---

# I18nManager

`I18nManager` 模块提供了管理从右到左（RTL）布局方向的工具方法，适用于阿拉伯语、希伯来语等 RTL 语言。它提供了控制 RTL 行为以及查询当前布局方向的方法。

## 示例

### 根据 RTL 调整位置和动画

如果你使用绝对定位来对齐元素，在 RTL 语言下可能无法正确对齐。使用 `isRTL` 可以动态调整对齐方向或动画方向。

```SnackPlayer name=I18nManager%20Change%20Absolute%20Positions%20And%20Animations
import React from 'react';
import {I18nManager, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  // Change to `true` to see the effect in a non-RTL language
  const isRTL = I18nManager.isRTL;
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View
          style={{
            position: 'absolute',
            left: isRTL ? undefined : 0,
            right: isRTL ? 0 : undefined,
          }}>
          {isRTL ? <Text>Back &gt;</Text> : <Text>&lt; Back</Text>}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
```

### 开发调试

```SnackPlayer name=I18nManager%20During%20Development
import React, {useState} from 'react';
import {Alert, I18nManager, StyleSheet, Switch, Text, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  const [rtl, setRTL] = useState(I18nManager.isRTL);
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.forceRtl}>
            <Text>Force RTL in Development:</Text>
            <Switch
              value={rtl}
              onValueChange={value => {
                setRTL(value);
                I18nManager.forceRTL(value);
                Alert.alert(
                  'Reload this page',
                  'Please reload this page to change the UI direction! ' +
                    'All examples in this app will be affected. ' +
                    'Check them out to see what they look like in RTL layout.',
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  forceRtl: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default App;
```

# 参考

## 属性

### `isRTL`

```typescript
static isRTL: boolean;
```

一个布尔值，指示应用当前是否处于 RTL 布局模式。

`isRTL` 的值由以下逻辑决定：

- 如果 `forceRTL` 为 `true`，则 `isRTL` 返回 `true`
- 如果 `allowRTL` 为 `false`，则 `isRTL` 返回 `false`
- 其他情况下，满足以下条件时 `isRTL` 为 `true`：
  - **iOS：**
    - 设备上用户首选语言为 RTL 语言
    - 应用定义的本地化列表包含用户选择的语言（在 Xcode 项目文件中的 `knownRegions = (...)` 中定义）
  - **Android：**
    - 设备上用户首选语言为 RTL 语言
    - 应用的 `AndroidManifest.xml` 在 `<application>` 元素上定义了 `android:supportsRTL="true"`

### `doLeftAndRightSwapInRTL`

```typescript
static doLeftAndRightSwapInRTL: boolean;
```

一个布尔值，指示在 RTL 模式下是否自动交换 left 和 right 样式属性。启用后，RTL 布局中 left 变为 right，right 变为 left。

## 方法

### `allowRTL()`

```typescript
static allowRTL: (allowRTL: boolean) => void;
```

启用或禁用应用的 RTL 布局支持。

**参数：**

- `allowRTL` (boolean)：是否允许 RTL 布局

**重要说明：**

- 更改在下次应用启动时生效，不会立即生效
- 此设置会在应用重启后持久保留

### `forceRTL()`

```typescript
static forceRTL: (forced: boolean) => void;
```

强制应用使用 RTL 布局，无论设备语言设置如何。此方法主要用于开发阶段测试 RTL 布局。

不建议在生产环境中强制开启 RTL，因为该设置需要完全重启应用才能生效，用户体验不佳。

**参数：**

- `forced` (boolean)：是否强制使用 RTL 布局

**重要说明：**

- 更改在下次应用启动时完全生效，不会立即生效
- 此设置会在应用重启后持久保留
- 仅用于开发和测试。在生产环境中，你应该完全禁用 RTL 或正确处理 RTL（参见 `isRTL`）

### `swapLeftAndRightInRTL()`

```typescript
static swapLeftAndRightInRTL: (swapLeftAndRight: boolean) => void;
```

在 RTL 模式下交换 left 和 right 样式属性。启用后，RTL 布局中 left 变为 right，right 变为 left。不会影响 `isRTL` 的值。
