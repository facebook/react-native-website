---
id: animatedvaluexy
title: Animated.ValueXY
---

用于驱动 2D 动画的 2D 值，例如平移手势。与普通的 [`Animated.Value`](animatedvalue) 几乎相同的 API，但是是多路复用的。包含两个常规的“Animated.Value”。

＃＃ 例子

```SnackPlayer name=Animated.ValueXY%20Example
import React, {useRef} from 'react';
import {Animated, PanResponder, StyleSheet} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

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
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[pan.getLayout(), styles.box]}
        />
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

＃ 参考

＃＃ 方法

### `setValue()`

```tsx
setValue(value: {x: number; y: number});
```

直接设定值。这将停止在该值上运行的任何动画并更新所有绑定的属性。

**参数：**

| 名称 | 类型                  | 必填 | 描述 |
| ---- | --------------------- | ---- | ---- |
| 价值 | `{x：数字； y: 数字}` | 是的 | 价值 |

---

### `setOffset()`

```tsx
setOffset(offset: {x: number; y: number});
```

设置一个偏移量，该偏移量应用于设置的任何值，无论是通过“setValue”、动画还是“Animated.event”。对于补偿诸如平移手势的开始之类的事情很有用。

**参数：**

| 名称 | 类型                  | 必填 | 描述   |
| ---- | --------------------- | ---- | ------ |
| 偏移 | `{x：数字； y: 数字}` | 是的 | 偏移值 |

---

### `flattenOffset()`

```tsx
flattenOffset();
```

将偏移值合并到基值并将偏移重置为零。最终输出的值没有变化。

---

### `extractOffset()`

```tsx
extractOffset();
```

将偏移值设置为基值，并将基值重置为零。最终输出的值没有变化。

---

### `addListener()`

```tsx
addListener(callback: (value: {x: number; y: number}) => void);
```

向值添加异步侦听器，以便您可以观察动画的更新。这很有用，因为无法同步读取该值，因为它可能是本机驱动的。

返回一个字符串，用作侦听器的标识符。

**参数：**

| 名称 | 类型 | 必填 | 描述                                                  |
| ---- | ---- | ---- | ----------------------------------------------------- |
| 回调 | 功能 | 是的 | 回调函数将接收一个对象，该对象的“value”键设置为新值。 |

---

### `removeListener()`

```tsx
removeListener(id: string);
```

取消注册侦听器。 “id”参数应与之前由“addListener()”返回的标识符匹配。

**参数：**

| 名称 | 类型   | 必填 | 描述                    |
| ---- | ------ | ---- | ----------------------- |
| 编号 | 字符串 | 是的 | 正在删除的侦听器的 ID。 |

---

### `removeAllListeners()`

```tsx
removeAllListeners();
```

删除所有已注册的侦听器。

---

### `停止动画()`

```tsx
stopAnimation(callback?: (value: {x: number; y: number}) => void);
```

停止任何正在运行的动画或跟踪。停止动画后使用最终值调用“callback”，这对于更新状态以将动画位置与布局相匹配非常有用。

**参数：**

| 名称 | 类型 | 必填 | 描述                 |
| ---- | ---- | ---- | -------------------- |
| 回调 | 功能 | 没有 | 将接收最终值的函数。 |

---

### `重置动画()`

```tsx
resetAnimation(callback?: (value: {x: number; y: number}) => void);
```

停止任何动画并将值重置为其原始值。

**参数：**

| 名称 | 类型 | 必填 | 描述                 |
| ---- | ---- | ---- | -------------------- |
| 回调 | 功能 | 没有 | 将接收原始值的函数。 |

---

### `getLayout()`

```tsx
getLayout(): {left: Animated.Value, top: Animated.Value};
```

将 `{x, y}` 转换为 `{left, top}` 以在样式中使用，例如

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

将 `{x, y}` 转换为可用的平移变换，例如

```tsx
style={{
  transform: this.state.anim.getTranslateTransform()
}}
```
