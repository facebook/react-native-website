---
id: animatedvaluexy
title: Animated.ValueXY
---

2D 值用于驱动 2D 动画，例如平移手势。与普通的[`Animated.Value`](animatedvalue)几乎相同的 API，但是可以多路复用。在内部包含两个常规的`Animated.Value`。

## 示例

```SnackPlayer name=Animated.ValueXY
import React, {useRef} from 'react';
import {Animated, PanResponder, StyleSheet, View} from 'react-native';

const DraggableView = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x, // x,y are Animated.Value
        dy: pan.y,
      },
    ]),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        {toValue: {x: 0, y: 0}, useNativeDriver: true}, // Back to zero
      ).start();
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.box]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#61dafb',
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});

export default DraggableView;
```

---

# 文档

## 方法

### `setValue()`

```tsx
setValue(value: {x: number; y: number});
```

直接设置值。这将停止任何正在运行的动画，并更新所有绑定的属性。

**参数:**

| 名称  | 类型                     | 必需 | 描述 |
| ----- | ------------------------ | ---- | ---- |
| value | `{x: number; y: number}` | 是   | 值   |

---

### `setOffset()`

```tsx
setOffset(offset: {x: number; y: number});
```

设置一个偏移量，该偏移量会在已经设置的任何值（无论是通过`setValue`、动画还是`Animated.event`）之上应用。对于补偿诸如平移手势的起始位置等情况非常有用。

**参数:**

| 名称   | 类型                     | 必填 | 描述   |
| ------ | ------------------------ | ---- | ------ |
| offset | `{x: number; y: number}` | 是   | 偏移值 |

---

### `flattenOffset()`

```tsx
flattenOffset();
```

将偏移值合并到基础值中，并将偏移重置为零。最终输出的数值保持不变。

---

### `extractOffset()`

```tsx
extractOffset();
```

将偏移值设置为基准值，并将基准值重置为零。最终输出的数值保持不变。

---

### `addListener()`

```tsx
addListener(callback: (value: {x: number; y: number}) => void);
```

向值添加一个异步监听器，以便您可以观察动画的更新。这很有用，因为没有办法同步读取该值，因为它可能是由原生驱动的。

返回一个字符串作为监听器的标识符。

**参数:**

| 名称     | 类型 | 必需 | 描述       |
| -------- | ---- | ---- | ---------- |
| callback | 函数 | 是   | 回调函数将 |

---

### `removeListener()`

```tsx
removeListener(id: string);
```

取消注册监听器。`id` 参数应与先前由 `addListener()` 返回的标识符匹配。

**参数:**

| 名称 | 类型   | 必需 | 描述                     |
| ---- | ------ | ---- | ------------------------ |
| id   | string | 是   | 要移除的监听器的标识符。 |

---

### `removeAllListeners()`

```tsx
removeAllListeners();
```

移除所有已注册的监听器。

---

### `stopAnimation()`

```tsx
stopAnimation(callback?: (value: {x: number; y: number}) => void);
```

停止任何正在运行的动画或跟踪。在停止动画后，将使用`callback`调用最终值，这对于更新状态以匹配布局中的动画位置非常有用。

**参数:**

| 名称     | 类型 | 是否必需 | 描述                   |
| -------- | ---- | -------- | ---------------------- |
| callback | 函数 | 否       | 将接收到最终值的函数。 |

---

### `resetAnimation()`

```tsx
resetAnimation(callback?: (value: {x: number; y: number}) => void);
```

停止任何动画并将值重置为其原始状态。

**参数:**

| 名称     | 类型     | 是否必需 | 描述                   |
| -------- | -------- | -------- | ---------------------- |
| callback | function | 否       | 一个接收原始值的函数。 |

---

### `getLayout()`

```tsx
getLayout(): {left: Animated.Value, top: Animated.Value};
```

将`{x, y}`转换为`{left, top}`以在样式中使用，例如：

```tsx
style={this.state.anim.getLayout()}
```

---

### `getTranslateTransform()`

```tsx
getTranslateTransform(): [
  {translateX: Animated.Value},
  {translateY: Animated.Value},
];
```

将`{x, y}`转换为可用的平移变换，例如：

```tsx
style={{
  transform: this.state.anim.getTranslateTransform()
}}
```
