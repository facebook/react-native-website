---
id: animatedvalue
title: AnimatedValue
---

驱动动画的一维标量值. 一个`Animated.Value`可以同步地驱动多个属性，但每次只能以一种动画机制变化。如果改用了其他动画机制（例如开始一个新的动画或是调用`setValue`），则会停止先前的动画。

一般这样来初始化`new Animated.Value(0);`

相关文档请参考[`Animated`](animated.md).

### 查看方法

* [`setValue`](animatedvalue.md#setvalue)
* [`setOffset`](animatedvalue.md#setoffset)
* [`flattenOffset`](animatedvalue.md#flattenoffset)
* [`extractOffset`](animatedvalue.md#extractoffset)
* [`addListener`](animatedvalue.md#addlistener)
* [`removeListener`](animatedvalue.md#removelistener)
* [`removeAllListeners`](animatedvalue.md#removealllisteners)
* [`stopAnimation`](animatedvalue.md#stopanimation)
* [`resetAnimation`](animatedvalue.md#resetanimation)
* [`interpolate`](animatedvalue.md#interpolate)
* [`animate`](animatedvalue.md#animate)
* [`stopTracking`](animatedvalue.md#stoptracking)
* [`track`](animatedvalue.md#track)

---

# 文档

## 方法

### `setValue()`

```jsx
setValue(value);
```

直接赋值。 This will stop any animations running on the value and update all the bound properties.

**参数：**

| 名称  | 类型   | 必填 | 说明  |
| ----- | ------ | ---- | ----- |
| value | number | 是   | Value |

---

### `setOffset()`

```jsx
setOffset(offset);
```

Sets an offset that is applied on top of whatever value is set, whether via `setValue`, an animation, or `Animated.event`. Useful for compensating things like the start of a pan gesture.

**参数：**

| 名称   | 类型   | 必填 | 说明         |
| ------ | ------ | ---- | ------------ |
| offset | number | 是   | Offset value |

---

### `flattenOffset()`

```jsx
flattenOffset();
```

Merges the offset value into the base value and resets the offset to zero. The final output of the value is unchanged.

---

### `extractOffset()`

```jsx
extractOffset();
```

Sets the offset value to the base value, and resets the base value to zero. The final output of the value is unchanged.

---

### `addListener()`

```jsx
addListener(callback);
```

Adds an asynchronous listener to the value so you can observe updates from animations. This is useful because there is no way to synchronously read the value because it might be driven natively.

Returns a string that serves as an identifier for the listener.

**参数：**

| 名称     | 类型     | 必填 | 说明                                                                                        |
| -------- | -------- | ---- | ------------------------------------------------------------------------------------------- |
| callback | function | 是   | The callback function which will receive an object with a `value` key set to the new value. |

---

### `removeListener()`

```jsx
removeListener(id);
```

移除一个监听函数。 The `id` param shall match the identifier previously returned by `addListener()`.

**参数：**

| 名称 | 类型   | 必填 | 说明                               |
| ---- | ------ | ---- | ---------------------------------- |
| id   | string | 是   | Id for the listener being removed. |

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

Stops any running animation or tracking. `callback` is invoked with the final value after stopping the animation, which is useful for updating state to match the animation position with layout.

**参数：**

| 名称     | 类型     | 必填 | 说明                                          |
| -------- | -------- | ---- | --------------------------------------------- |
| callback | function | 否   | A function that will receive the final value. |

---

### `resetAnimation()`

```jsx
resetAnimation([callback]);
```

Stops any animation and resets the value to its original.

**参数：**

| 名称     | 类型     | 必填 | 说明                                             |
| -------- | -------- | ---- | ------------------------------------------------ |
| callback | function | 否   | A function that will receive the original value. |

---

### `interpolate()`

```jsx
interpolate(config);
```

Interpolates the value before updating the property, e.g. mapping 0-1 to 0-10.

See `AnimatedInterpolation.js`

**参数：**

| 名称   | 类型   | 必填 | 说明         |
| ------ | ------ | ---- | ------------ |
| config | object | 是   | 看下面的说明 |

The `config` object is composed of the following keys:

* `inputRange`: an array of numbers
* `outputRange`: an array of numbers or strings
* `easing` (optional): a function that returns a number, given an input number
* `extrapolate` (optional): a string such as 'extend', 'identity', or 'clamp'
* `extrapolateLeft` (optional): a string such as 'extend', 'identity', or 'clamp'
* `extrapolateRight` (optional): a string such as 'extend', 'identity', or 'clamp'

---

### `animate()`

```jsx
animate(animation, callback);
```

Typically only used internally, but could be used by a custom Animation class.

**参数：**

| 名称      | 类型      | 必填 | 说明                |
| --------- | --------- | ---- | ------------------- |
| animation | Animation | 是   | See `Animation.js`. |
| callback  | function  | 是   | Callback function.  |

---

### `stopTracking()`

```jsx
stopTracking();
```

Typically only used internally.

---

### `track()`

```jsx
track(tracking);
```

Typically only used internally.

**参数：**

| 名称     | 类型         | 必填 | 说明                  |
| -------- | ------------ | ---- | --------------------- |
| tracking | AnimatedNode | 是   | See `AnimatedNode.js` |
