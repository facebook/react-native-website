---
id: animatedvalue
title: Animated.Value
---

驱动动画的一维标量值. 一个`Animated.Value`可以同步地驱动多个属性，但每次只能以一种动画机制变化。如果改用了其他动画机制（例如开始一个新的动画或是调用`setValue`），则会停止先前的动画。

一般这样来初始化`new Animated.Value(0);`

---

# 文档

## 方法

### `setValue()`

```jsx
setValue(value);
```

直接赋值。注意这会导致正在运行的动画中断而直接更新到新值。

**参数：**

| 名称  | 类型   | 必需 | 说明       |
| ----- | ------ | ---- | ---------- |
| value | number | 是   | 新的动画值 |

---

### `setOffset()`

```jsx
setOffset(offset);
```

设置一个偏移量，该偏移量会叠加在通过`setValue`、动画或`Animated.event`设置的任何值之上。对于补偿诸如平移手势的起始位置等情况非常有用。

**参数：**

| 名称   | 类型   | 必需 | 说明         |
| ------ | ------ | ---- | ------------ |
| offset | number | 是   | 偏移量 |

---

### `flattenOffset()`

```jsx
flattenOffset();
```

将偏移值合并到基础值中，并将偏移重置为零。最终输出的数值保持不变。

---

### `extractOffset()`

```jsx
extractOffset();
```

将偏移值设置为基准值，并将基准值重置为零。最终输出的数值保持不变。

---

### `addListener()`

```jsx
addListener(callback);
```

给动画值添加一个异步监听器，以便您可以观察动画值的更新。这很有用，因为没有办法同步读取该值，因为它可能是由原生驱动的。

返回一个作为监听器标识符的字符串。

**参数：**

| 名称     | 类型     | 必需 | 说明                                                                                        |
| -------- | -------- | ---- | ------------------------------------------------------------------------------------------- |
| callback | function | 是   | 回调函数将接收一个对象，其中`value`键的值设置为新值。 |

---

### `removeListener()`

```jsx
removeListener(id);
```

移除一个监听函数。 `id`参数应与之前由`addListener()`返回的标识符匹配。

**参数：**

| 名称 | 类型   | 必需 | 说明                               |
| ---- | ------ | ---- | ---------------------------------- |
| id   | string | 是   | 正在移除的监听器的ID。 |

---

### `removeAllListeners()`

```jsx
removeAllListeners();
```

移除所有监听函数。

---

### `stopAnimation()`

```jsx
stopAnimation([callback]);
```

停止任何正在运行的动画或跟踪。在停止动画后，将使用最终值调用`callback`，这对于更新状态以匹配布局中的动画位置非常有用。

**参数：**

| 名称     | 类型     | 必需 | 说明                                          |
| -------- | -------- | ---- | --------------------------------------------- |
| callback | function | 否   | 一个将接收最终值的函数。 |

---

### `resetAnimation()`

```jsx
resetAnimation([callback]);
```

停止任何动画并将值重置为其原始状态。

**参数：**

| 名称     | 类型     | 必需 | 说明                                             |
| -------- | -------- | ---- | ------------------------------------------------ |
| callback | function | 否   | 一个接收原始值的函数。 |

---

### `interpolate()`

```jsx
interpolate(config);
```

在更新属性之前进行插值，例如将 0-1 映射到 0-10。

请参阅`AnimatedInterpolation.js`

**参数：**

| 名称   | 类型   | 必需 | 说明         |
| ------ | ------ | ---- | ------------ |
| config | object | 是   | 看下面的说明 |

`config` 对象由以下键组成：

- `inputRange`：一个数字数组
- `outputRange`：一个数字或字符串的数组
- `easing`（可选）：一个函数，给定输入数字返回一个数字
- `extrapolate`（可选）：一个字符串，如 'extend'、'identity' 或 'clamp'
- `extrapolateLeft`（可选）：一个字符串，如 'extend'、'identity' 或 'clamp'
- `extrapolateRight`（可选）：

---

### `animate()`

```jsx
animate(animation, callback);
```

通常只在内部使用，但也可以由自定义的动画类使用。

**参数：**

| 名称      | 类型      | 必需 | 说明                |
| --------- | --------- | ---- | ------------------- |
| animation | Animation | 是   | 请参阅 `Animation.js`. |
| callback  | function  | 是   | 回调函数  |

---

### `stopTracking()`

```jsx
stopTracking();
```

一般只在内部使用。

---

### `track()`

```jsx
track(tracking);
```

一般只在内部使用。

**参数：**

| 名称     | 类型         | 必需 | 说明                  |
| -------- | ------------ | ---- | --------------------- |
| tracking | AnimatedNode | 是   | 请参阅 `AnimatedNode.js` |
