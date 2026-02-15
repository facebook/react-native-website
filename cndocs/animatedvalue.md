---
id: animatedvalue
title: Animated.Value
---

用于驱动动画的标准数值。一个 `Animated.Value` 可以以同步方式驱动多个属性，但同一时间只能由一种机制驱动。使用新的机制（例如启动新动画，或调用 `setValue`）会停止之前的机制。

通常在函数组件中通过 `useAnimatedValue(0);` 初始化，在类组件中通过 `new Animated.Value(0);` 初始化。

---

# 参考

## 方法

### `setValue()`

```tsx
setValue(value: number);
```

直接设置值。这会停止该值上正在运行的任何动画，并更新所有已绑定的属性。

**参数：**

| 名称  | 类型   | 必填 | 说明 |
| ----- | ------ | ---- | ---- |
| value | number | 是   | 值   |

---

### `setOffset()`

```tsx
setOffset(offset: number);
```

设置一个偏移量。该偏移量会叠加到当前值之上，无论当前值来自 `setValue`、动画，还是 `Animated.event`。常用于补偿例如拖拽手势起点等场景。

**参数：**

| 名称   | 类型   | 必填 | 说明   |
| ------ | ------ | ---- | ------ |
| offset | number | 是   | 偏移值 |

---

### `flattenOffset()`

```tsx
flattenOffset();
```

将偏移值合并到基础值中，并将偏移重置为 0。最终输出值不变。

---

### `extractOffset()`

```tsx
extractOffset();
```

将偏移值设为当前基础值，并将基础值重置为 0。最终输出值不变。

---

### `addListener()`

```tsx
addListener(callback: (state: {value: number}) => void): string;
```

给该值添加异步监听器，以便观察动画更新。由于该值可能由原生驱动，无法同步读取，因此此方法很有用。

返回一个字符串，作为监听器标识符。

**参数：**

| 名称     | 类型     | 必填 | 说明                                             |
| -------- | -------- | ---- | ------------------------------------------------ |
| callback | function | 是   | 回调函数，接收形如 `{value: number}` 的最新值对象。 |

---

### `removeListener()`

```tsx
removeListener(id: string);
```

注销某个监听器。`id` 参数应与 `addListener()` 返回的标识符一致。

**参数：**

| 名称 | 类型   | 必填 | 说明                 |
| ---- | ------ | ---- | -------------------- |
| id   | string | 是   | 要移除的监听器 ID。 |

---

### `removeAllListeners()`

```tsx
removeAllListeners();
```

移除所有已注册的监听器。

---

### `stopAnimation()`

```tsx
stopAnimation(callback?: (value: number) => void);
```

停止任何正在运行的动画或跟踪。停止后会以最终值调用 `callback`，这对将状态更新为与布局中的动画位置一致很有帮助。

**参数：**

| 名称     | 类型     | 必填 | 说明                   |
| -------- | -------- | ---- | ---------------------- |
| callback | function | 否   | 接收最终值的回调函数。 |

---

### `resetAnimation()`

```tsx
resetAnimation(callback?: (value: number) => void);
```

停止任何动画，并将值重置为初始值。

**参数：**

| 名称     | 类型     | 必填 | 说明                   |
| -------- | -------- | ---- | ---------------------- |
| callback | function | 否   | 接收初始值的回调函数。 |

---

### `interpolate()`

```tsx
interpolate(config: InterpolationConfigType);
```

在更新属性之前先对该值进行插值，例如将 0-1 映射到 0-10。

参见 `AnimatedInterpolation.js`。

**参数：**

| 名称   | 类型   | 必填 | 说明     |
| ------ | ------ | ---- | -------- |
| config | object | 是   | 见下文。 |

`config` 对象包含以下键：

- `inputRange`: number 数组
- `outputRange`: number 或 string 数组
- `easing`（可选）：输入一个 number，返回一个 number 的函数
- `extrapolate`（可选）：字符串，如 `'extend'`、`'identity'`、`'clamp'`
- `extrapolateLeft`（可选）：字符串，如 `'extend'`、`'identity'`、`'clamp'`
- `extrapolateRight`（可选）：字符串，如 `'extend'`、`'identity'`、`'clamp'`

---

### `animate()`

```tsx
animate(animation, callback);
```

通常仅供内部使用，但也可用于自定义 Animation 类。

**参数：**

| 名称      | 类型      | 必填 | 说明                  |
| --------- | --------- | ---- | --------------------- |
| animation | Animation | 是   | 参见 `Animation.js`。 |
| callback  | function  | 是   | 回调函数。            |
