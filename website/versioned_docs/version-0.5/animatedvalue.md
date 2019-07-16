---
id: version-0.5-animatedvalue
title: AnimatedValue
original_id: animatedvalue
---

Standard value for driving animations. One `Animated.Value` can drive multiple properties in a synchronized fashion, but can only be driven by one mechanism at a time. Using a new mechanism (e.g. starting a new animation, or calling `setValue`) will stop any previous ones.

Typically initialized with `new Animated.Value(0);`

See also [`Animated`](animated.md).

### Methods

- [`setValue`](animatedvalue.md#setvalue)
- [`setOffset`](animatedvalue.md#setoffset)
- [`flattenOffset`](animatedvalue.md#flattenoffset)
- [`extractOffset`](animatedvalue.md#extractoffset)
- [`addListener`](animatedvalue.md#addlistener)
- [`removeListener`](animatedvalue.md#removelistener)
- [`removeAllListeners`](animatedvalue.md#removealllisteners)
- [`stopAnimation`](animatedvalue.md#stopanimation)
- [`resetAnimation`](animatedvalue.md#resetanimation)
- [`interpolate`](animatedvalue.md#interpolate)
- [`animate`](animatedvalue.md#animate)
- [`stopTracking`](animatedvalue.md#stoptracking)
- [`track`](animatedvalue.md#track)

---

# Reference

## Methods

### `setValue()`

```jsx
setValue(value);
```

Directly set the value. This will stop any animations running on the value and update all the bound properties.

**Parameters:**

| Name  | Type   | Required | Description |
| ----- | ------ | -------- | ----------- |
| value | number | Yes      | Value       |

---

### `setOffset()`

```jsx
setOffset(offset);
```

Sets an offset that is applied on top of whatever value is set, whether via `setValue`, an animation, or `Animated.event`. Useful for compensating things like the start of a pan gesture.

**Parameters:**

| Name   | Type   | Required | Description  |
| ------ | ------ | -------- | ------------ |
| offset | number | Yes      | Offset value |

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

**Parameters:**

| Name     | Type     | Required | Description                                                                                 |
| -------- | -------- | -------- | ------------------------------------------------------------------------------------------- |
| callback | function | Yes      | The callback function which will receive an object with a `value` key set to the new value. |

---

### `removeListener()`

```jsx
removeListener(id);
```

Unregister a listener. The `id` param shall match the identifier previously returned by `addListener()`.

**Parameters:**

| Name | Type   | Required | Description                        |
| ---- | ------ | -------- | ---------------------------------- |
| id   | string | Yes      | Id for the listener being removed. |

---

### `removeAllListeners()`

```jsx
removeAllListeners();
```

Remove all registered listeners.

---

### `stopAnimation()`

```jsx
stopAnimation([callback]);
```

Stops any running animation or tracking. `callback` is invoked with the final value after stopping the animation, which is useful for updating state to match the animation position with layout.

**Parameters:**

| Name     | Type     | Required | Description                                   |
| -------- | -------- | -------- | --------------------------------------------- |
| callback | function | No       | A function that will receive the final value. |

---

### `resetAnimation()`

```jsx
resetAnimation([callback]);
```

Stops any animation and resets the value to its original.

**Parameters:**

| Name     | Type     | Required | Description                                      |
| -------- | -------- | -------- | ------------------------------------------------ |
| callback | function | No       | A function that will receive the original value. |

---

### `interpolate()`

```jsx
interpolate(config);
```

Interpolates the value before updating the property, e.g. mapping 0-1 to 0-10.

See `AnimatedInterpolation.js`

**Parameters:**

| Name   | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| config | object | Yes      | See below.  |

The `config` object is composed of the following keys:

- `inputRange`: an array of numbers
- `outputRange`: an array of numbers or strings
- `easing` (optional): a function that returns a number, given an input number
- `extrapolate` (optional): a string such as 'extend', 'identity', or 'clamp'
- `extrapolateLeft` (optional): a string such as 'extend', 'identity', or 'clamp'
- `extrapolateRight` (optional): a string such as 'extend', 'identity', or 'clamp'

---

### `animate()`

```jsx
animate(animation, callback);
```

Typically only used internally, but could be used by a custom Animation class.

**Parameters:**

| Name      | Type      | Required | Description         |
| --------- | --------- | -------- | ------------------- |
| animation | Animation | Yes      | See `Animation.js`. |
| callback  | function  | Yes      | Callback function.  |

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

**Parameters:**

| Name     | Type         | Required | Description           |
| -------- | ------------ | -------- | --------------------- |
| tracking | AnimatedNode | Yes      | See `AnimatedNode.js` |
