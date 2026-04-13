---
id: platform
title: Platform
---

## 示例

```SnackPlayer name=Platform%20API%20Example&supportedPlatforms=ios,android
import React from 'react';
import {Platform, StyleSheet, Text, ScrollView} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text>OS</Text>
          <Text style={styles.value}>{Platform.OS}</Text>
          <Text>OS Version</Text>
          <Text style={styles.value}>{Platform.Version}</Text>
          <Text>isTV</Text>
          <Text style={styles.value}>{Platform.isTV.toString()}</Text>
          {Platform.OS === 'ios' && (
            <>
              <Text>isPad</Text>
              <Text style={styles.value}>{Platform.isPad.toString()}</Text>
            </>
          )}
          <Text>Constants</Text>
          <Text style={styles.value}>
            {JSON.stringify(Platform.constants, null, 2)}
          </Text>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontWeight: '600',
    padding: 4,
    marginBottom: 8,
  },
  safeArea: {
    flex: 1,
  },
});

export default App;
```

---

# 参考

## 属性

### `constants`

```tsx
static constants: PlatformConstants;
```

返回一个包含当前平台所有可用通用常量和平台特定常量的对象。

**属性：**

| <div className="widerColumn">名称</div>                   | 类型    | 可选 | 说明                                                                                                                                                                           |
| --------------------------------------------------------- | ------- | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| isTesting                                                 | boolean | 否   |                                                                                                                                                                                |
| reactNativeVersion                                        | object  | 否   | React Native 版本信息。键为 `major`、`minor`、`patch`（可选 `prerelease`），值为 `number` 类型。                                                                               |
| Version <div className="label android">Android</div>      | number  | 否   | Android 特定的操作系统版本常量。                                                                                                                                               |
| Release <div className="label android">Android</div>      | string  | 否   |                                                                                                                                                                                |
| Serial <div className="label android">Android</div>       | string  | 否   | Android 设备的硬件序列号。                                                                                                                                                     |
| Fingerprint <div className="label android">Android</div>  | string  | 否   | 唯一标识该构建版本的字符串。                                                                                                                                                   |
| Model <div className="label android">Android</div>        | string  | 否   | 面向最终用户的 Android 设备名称。                                                                                                                                              |
| Brand <div className="label android">Android</div>        | string  | 否   | 产品/硬件关联的消费者可见品牌名称。                                                                                                                                            |
| Manufacturer <div className="label android">Android</div> | string  | 否   | Android 设备的制造商。                                                                                                                                                         |
| ServerHost <div className="label android">Android</div>   | string  | 是   |                                                                                                                                                                                |
| uiMode <div className="label android">Android</div>       | string  | 否   | 可能的值有：`'car'`、`'desk'`、`'normal'`、`'tv'`、`'watch'` 和 `'unknown'`。详见 [Android ModeType](https://developer.android.com/reference/android/app/UiModeManager.html)。 |
| forceTouchAvailable <div className="label ios">iOS</div>  | boolean | 否   | 指示设备是否支持 3D Touch。                                                                                                                                                    |
| interfaceIdiom <div className="label ios">iOS</div>       | string  | 否   | 设备的界面类型。详见 [UIUserInterfaceIdiom](https://developer.apple.com/documentation/uikit/uiuserinterfaceidiom)。                                                            |
| osVersion <div className="label ios">iOS</div>            | string  | 否   | iOS 特定的操作系统版本常量。                                                                                                                                                   |
| systemName <div className="label ios">iOS</div>           | string  | 否   | iOS 特定的操作系统名称常量。                                                                                                                                                   |

---

### `isPad` <div className="label ios">iOS</div>

```tsx
static isPad: boolean;
```

返回一个布尔值，指示当前设备是否为 iPad。

| 类型    |
| ------- |
| boolean |

---

### `isTV`

```tsx
static isTV: boolean;
```

返回一个布尔值，指示当前设备是否为电视。

| 类型    |
| ------- |
| boolean |

---

### `isVision`

```tsx
static isVision: boolean;
```

返回一个布尔值，指示当前设备是否为 Apple Vision 设备。_如果你使用的是 [Apple Vision Pro（Designed for iPad）](https://developer.apple.com/documentation/visionos/determining-whether-to-bring-your-app-to-visionos)，`isVision` 将为 `false`，但 `isPad` 将为 `true`。_

| 类型    |
| ------- |
| boolean |

---

### `isTesting`

```tsx
static isTesting: boolean;
```

返回一个布尔值，指示应用是否在开发者模式下且设置了测试标记时运行。

| 类型    |
| ------- |
| boolean |

---

### `OS`

```tsx
static OS: 'android' | 'ios';
```

返回表示当前操作系统的字符串值。

| 类型                       |
| -------------------------- |
| enum(`'android'`, `'ios'`) |

---

### `Version`

```tsx
static Version: 'number' | 'string';
```

返回操作系统的版本号。

| 类型                                                                                                 |
| ---------------------------------------------------------------------------------------------------- |
| number <div className="label android">Android</div><hr />string <div className="label ios">iOS</div> |

## 方法

### `select()`

```tsx
static select(config: Record<string, T>): T;
```

根据当前运行的平台返回最匹配的值。

#### 参数：

| 名称   | 类型   | 必填 | 说明               |
| ------ | ------ | ---- | ------------------ |
| config | object | 是   | 详见下方配置说明。 |

`select` 方法返回当前运行平台最匹配的值。即如果你在手机上运行，`android` 和 `ios` 键会优先匹配。如果这两个键未指定，则会使用 `native` 键，最后才使用 `default` 键。

`config` 参数是一个对象，可包含以下键：

- `android` (any)
- `ios` (any)
- `native` (any)
- `default` (any)

**使用示例：**

```tsx
import {Platform, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        backgroundColor: 'green',
      },
      ios: {
        backgroundColor: 'red',
      },
      default: {
        // 其他平台，例如 Web
        backgroundColor: 'blue',
      },
    }),
  },
});
```

上述代码会使容器在所有平台上都具有 `flex: 1`，在 Android 上背景为绿色，在 iOS 上背景为红色，在其他平台上背景为蓝色。

由于对应平台键的值可以是任意类型，[`select`](platform.md#select) 方法也可以用于返回平台特定的组件，如下所示：

```tsx
const Component = Platform.select({
  ios: () => require('ComponentIOS'),
  android: () => require('ComponentAndroid'),
})();

<Component />;
```

```tsx
const Component = Platform.select({
  native: () => require('ComponentForNative'),
  default: () => require('ComponentForWeb'),
})();

<Component />;
```
