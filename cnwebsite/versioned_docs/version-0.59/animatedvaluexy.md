---
id: version-0.59-animatedvaluexy
title: AnimatedValueXY
original_id: animatedvaluexy
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

2D Value for driving 2D animations, such as pan gestures. Almost identical API to normal [`Animated.Value`](animatedvalue.md), but multiplexed. Contains two regular `Animated.Value`s under the hood.

See also [`Animated`](animated.md).

## 示例

```javascript
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
        style={this.state.pan.getLayout()}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
```

### Methods

* [`setValue`](animatedvaluexy.md#setvalue)
* [`setOffset`](animatedvaluexy.md#setoffset)
* [`flattenOffset`](animatedvaluexy.md#flattenoffset)
* [`extractOffset`](animatedvaluexy.md#extractoffset)
* [`addListener`](animatedvaluexy.md#addlistener)
* [`removeListener`](animatedvaluexy.md#removelistener)
* [`removeAllListeners`](animatedvaluexy.md#removealllisteners)
* [`stopAnimation`](animatedvaluexy.md#stopanimation)
* [`resetAnimation`](animatedvaluexy.md#resetanimation)
* [`getLayout`](animatedvaluexy.md#getlayout)
* [`getTranslateTransform`](animatedvaluexy.md#gettranslatetransform)

---

# 文档

## Methods

### `setValue()`

```javascript
setValue(value);
```

Directly set the value. This will stop any animations running on the value and update all the bound properties.

**参数：**

| 名称  | 类型   | 必填 | 说明 |
| ----- | ------ | ---- | ---- |
| value | number | 是   |      |

---

### `setOffset()`

```javascript
setOffset(offset);
```

Sets an offset that is applied on top of whatever value is set, whether via `setValue`, an animation, or `Animated.event`. Useful for compensating things like the start of a pan gesture.

**参数：**

| 名称   | 类型   | 必填 | 说明 |
| ------ | ------ | ---- | ---- |
| offset | number | 是   |      |

---

### `flattenOffset()`

```javascript
flattenOffset();
```

Merges the offset value into the base value and resets the offset to zero. The final output of the value is unchanged.

---

### `extractOffset()`

```javascript
extractOffset();
```

Sets the offset value to the base value, and resets the base value to zero. The final output of the value is unchanged.

---

### `addListener()`

```javascript
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

```javascript
removeListener(id);
```

Unregister a listener. The `id` param shall match the identifier previously returned by `addListener()`.

**参数：**

| 名称 | 类型   | 必填 | 说明                               |
| ---- | ------ | ---- | ---------------------------------- |
| id   | string | 是   | Id for the listener being removed. |

---

### `removeAllListeners()`

```javascript
removeAllListeners();
```

Remove all registered listeners.

---

### `stopAnimation()`

```javascript
stopAnimation([callback]);
```

Stops any running animation or tracking. `callback` is invoked with the final value after stopping the animation, which is useful for updating state to match the animation position with layout.

**参数：**

| 名称     | 类型     | 必填 | 说明                                          |
| -------- | -------- | ---- | --------------------------------------------- |
| callback | function | 否   | A function that will receive the final value. |

---

### `resetAnimation()`

```javascript
resetAnimation([callback]);
```

Stops any animation and resets the value to its original.

**参数：**

| 名称     | 类型     | 必填 | 说明                                             |
| -------- | -------- | ---- | ------------------------------------------------ |
| callback | function | 否   | A function that will receive the original value. |

---

### `getLayout()`

```javascript
getLayout();
```

Converts `{x, y}` into `{left, top}` for use in style, e.g.

```javascript
style={this.state.anim.getLayout()}
```

---

### `getTranslateTransform()`

```javascript
getTranslateTransform();
```

Converts `{x, y}` into a useable translation transform, e.g.

```javascript
style={{
  transform: this.state.anim.getTranslateTransform()
}}
```
