---
id: dimensions
title: Dimensions
---

:::info
对于 React 组件，[`useWindowDimensions`](usewindowdimensions) 是首选 API。与 `Dimensions` 不同，它会在窗口尺寸更新时同步更新。这种方式也更符合 React 的编程范式。
:::

```tsx
import {Dimensions} from 'react-native';
```

你可以使用下面的代码获取应用窗口的宽度和高度：

```tsx
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
```

:::note
尽管尺寸信息会立即可用，但它们可能发生变化（例如设备旋转、可折叠设备等），因此任何依赖这些常量的渲染逻辑或样式，都应尽量在每次渲染时调用此函数，而不是缓存其值（例如，使用内联样式，而不是把值写死在 `StyleSheet` 中）。
:::

如果你的目标设备是可折叠设备，或者设备的屏幕尺寸、应用窗口尺寸可能发生变化，可以像下面的示例一样使用 Dimensions 模块提供的事件监听器。

## 示例

```SnackPlayer name=Dimensions%20Example
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Dimensions} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const App = () => {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({window, screen}) => {
        setDimensions({window, screen});
      },
    );
    return () => subscription?.remove();
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Window Dimensions</Text>
        {Object.entries(dimensions.window).map(([key, value]) => (
          <Text>
            {key} - {value}
          </Text>
        ))}
        <Text style={styles.header}>Screen Dimensions</Text>
        {Object.entries(dimensions.screen).map(([key, value]) => (
          <Text>
            {key} - {value}
          </Text>
        ))}
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
  header: {
    fontSize: 16,
    marginVertical: 10,
  },
});

export default App;
```

# 参考

## 方法

### `addEventListener()`

```tsx
static addEventListener(
  type: 'change',
  handler: ({
    window,
    screen,
  }: DimensionsValue) => void,
): EmitterSubscription;
```

添加一个事件监听函数。目前支持的事件有：

- `change`：在`Dimensions`对象内部的属性发生变化时触发。事件处理程序的参数是一个[`DimensionsValue`](#dimensionsvalue)类型的对象。

---

### `get()`

```tsx
static get(dim: 'window' | 'screen'): ScaledSize;
```

初始尺寸在调用 `runApplication` 之前设置，因此在运行任何其他 require 之前应该可用，但可能会在之后更新。

示例：`const {height, width} = Dimensions.get('window');`

**参数:**

| 名称                                                           | 类型   | 描述                                            |
| -------------------------------------------------------------- | ------ | ----------------------------------------------- |
| dim <div className="label basic required two-lines">必需</div> | 字符串 | 调用 `set` 时定义的尺寸的名称。返回该尺寸的值。 |

> 对于 Android，`window` 尺寸将不包括 `状态栏`（如果不透明）和 `底部导航栏` 占用的大小。

---

## 类型定义

### DimensionsValue

**属性:**

| 名称   | 类型                                | 描述                 |
| ------ | ----------------------------------- | -------------------- |
| window | [ScaledSize](dimensions#scaledsize) | 可见应用窗口的大小。 |
| screen | [ScaledSize](dimensions#scaledsize) | 设备屏幕的大小。     |

### ScaledSize

| 类型 |
| ---- |
| 对象 |

**属性:**

| 名称      | 类型   |
| --------- | ------ |
| width     | number |
| height    | number |
| scale     | number |
| fontScale | number |
