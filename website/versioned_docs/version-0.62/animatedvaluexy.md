---
id: animatedvaluexy
title: AnimatedValueXY
---

2D Value for driving 2D animations, such as pan gestures. Almost identical API to normal [`Animated.Value`](animatedvalue), but multiplexed. Contains two regular `Animated.Value`s under the hood.

See also [`Animated`](animated).

## Example

```jsx
class DraggableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY() // inits to zero
    };
    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x, // x,y are Animated.Value
          dy: this.state.pan.y
        }
      ]),
      onPanResponderRelease: () => {
        Animated.spring(
          this.state.pan, // Auto-multiplexed
          { toValue: { x: 0, y: 0 } } // Back to zero
        ).start();
      }
    });
  }
  render() {
    return (
      <Animated.View
        {...this.state.panResponder.panHandlers}
        style={this.state.pan.getLayout()}>
        {this.props.children}
      </Animated.View>
    );
  }
}
```

### Methods

- [`setValue`](animatedvaluexy#setvalue)
- [`setOffset`](animatedvaluexy#setoffset)
- [`flattenOffset`](animatedvaluexy#flattenoffset)
- [`extractOffset`](animatedvaluexy#extractoffset)
- [`addListener`](animatedvaluexy#addlistener)
- [`removeListener`](animatedvaluexy#removelistener)
- [`removeAllListeners`](animatedvaluexy#removealllisteners)
- [`stopAnimation`](animatedvaluexy#stopanimation)
- [`resetAnimation`](animatedvaluexy#resetanimation)
- [`getLayout`](animatedvaluexy#getlayout)
- [`getTranslateTransform`](animatedvaluexy#gettranslatetransform)

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
| value | number | Yes      |             |

---

### `setOffset()`

```jsx
setOffset(offset);
```

Sets an offset that is applied on top of whatever value is set, whether via `setValue`, an animation, or `Animated.event`. Useful for compensating things like the start of a pan gesture.

**Parameters:**

| Name   | Type   | Required | Description |
| ------ | ------ | -------- | ----------- |
| offset | number | Yes      |             |

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

### `getLayout()`

```jsx
getLayout();
```

Converts `{x, y}` into `{left, top}` for use in style, e.g.

```jsx
style={this.state.anim.getLayout()}
```

---

### `getTranslateTransform()`

```jsx
getTranslateTransform();
```

Converts `{x, y}` into a useable translation transform, e.g.

```jsx
style={{
  transform: this.state.anim.getTranslateTransform()
}}
```
