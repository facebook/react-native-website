---
id: dimensions
title: Dimensions
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

本模块用于获取设备屏幕的宽高。

> 对于 React 函数组件，我们更推荐使用[`useWindowDimensions`](usewindowdimensions)这个 Hook API。和 `Dimensions` 不同，它会在屏幕尺寸变化时自动更新。

```jsx
import { Dimensions } from 'react-native';
```

你可以用下面的方法来获取设备的宽高：

```jsx
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
```

> 注意：尽管尺寸信息立即就可用，但它可能会在将来被修改（譬如设备的方向改变），所以基于这些常量的渲染逻辑和样式应当每次 render 之后都调用此函数，而不是将对应的值保存下来。（举例来说，你可能需要使用内联的样式而不是在`StyleSheet`中保存相应的尺寸）。

如果你要考虑可折叠的设备，或者其他屏幕尺寸可变的设备，可以参考下面例子中所使用的事件监听函数或是[`useWindowDimensions`](usewindowdimensions)：

## 示例

```SnackPlayer name=Dimensions
import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

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
    <View style={styles.container}>
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
    </View>
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

---

# 文档

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

| 名称                                                               | 类型   | 描述                                                                              |
| ------------------------------------------------------------------ | ------ | --------------------------------------------------------------------------------- |
| dim <div className="label basic required two-lines">必需</div>     | 字符串 | 调用 `set` 时定义的尺寸的名称。返回该尺寸的值。                                   |

> 对于 Android，`window` 尺寸将不包括 `状态栏`（如果不透明）和 `底部导航栏` 占用的大小。

---

## 类型定义

### DimensionsValue

**属性:**

| 名称    | 类型                                | 描述                                   |
| ------ | ----------------------------------- | --------------------------------------- |
| window | [ScaledSize](dimensions#scaledsize) | 可见应用窗口的大小。                  |
| screen | [ScaledSize](dimensions#scaledsize) | 设备屏幕的大小。                      |

### ScaledSize

| 类型   |
| ------ |
| 对象   |

**属性:**

| 名称      | 类型   |
| --------- | ------ |
| width     | number |
| height    | number |
| scale     | number |
| fontScale | number |
