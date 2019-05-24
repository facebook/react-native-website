---
id: version-0.43-animated
title: Animated
original_id: animated
---

The `Animated` library is designed to make animations fluid, powerful, and easy to build and maintain. `Animated` focuses on declarative relationships between inputs and outputs, with configurable transforms in between, and simple `start`/`stop` methods to control time-based animation execution.

The simplest workflow for creating an animation is to to create an `Animated.Value`, hook it up to one or more style attributes of an animated component, and then drive updates via animations using `Animated.timing()`:

```javascript
Animated.timing(
  // Animate value over time
  this.state.fadeAnim, // The value to drive
  {
    toValue: 1, // Animate to final value of 1
  },
).start(); // Start the animation
```

Refer to the [Animations](animations.md#animated-api) guide to see additional examples of `Animated` in action.

## Overview

There are two value types you can use with `Animated`:

- [`Animated.Value()`](animated.md#value) for single values
- [`Animated.ValueXY()`](animated.md#valuexy) for vectors

`Animated.Value` can bind to style properties or other props, and can be interpolated as well. A single `Animated.Value` can drive any number of properties.

### Configuring animations

`Animated` provides three types of animation types. Each animation type provides a particular animation curve that controls how your values animate from their initial value to the final value:

- [`Animated.decay()`](animated.md#decay) starts with an initial velocity and gradually slows to a stop.
- [`Animated.spring()`](animated.md#spring) provides a simple spring physics model.
- [`Animated.timing()`](animated.md#timing) animates a value over time using [easing functions](easing.md).

In most cases, you will be using `timing()`. By default, it uses a symmetric easeInOut curve that conveys the gradual acceleration of an object to full speed and concludes by gradually decelerating to a stop.

### Working with animations

Animations are started by calling `start()` on your animation. `start()` takes a completion callback that will be called when the animation is done. If the animation finished running normally, the completion callback will be invoked with `{finished: true}`. If the animation is done because `stop()` was called on it before it could finish (e.g. because it was interrupted by a gesture or another animation), then it will receive `{finished: false}`.

### Using the native driver

By using the native driver, we send everything about the animation to native before starting the animation, allowing native code to perform the animation on the UI thread without having to go through the bridge on every frame. Once the animation has started, the JS thread can be blocked without affecting the animation.

You can use the native driver by specifying `useNativeDriver: true` in your animation configuration. See the [Animations](animations.md#using-the-native-driver) guide to learn more.

### Animatable components

Only animatable components can be animated. These special components do the magic of binding the animated values to the properties, and do targeted native updates to avoid the cost of the react render and reconciliation process on every frame. They also handle cleanup on unmount so they are safe by default.

- [`createAnimatedComponent()`](animated.md#createanimatedcomponent) can be used to make a component animatable.

`Animated` exports the following animatable components using the above wrapper:

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`

### Composing animations

Animations can also be combined in complex ways using composition functions:

- [`Animated.delay()`](animated.md#delay) starts an animation after a given delay.
- [`Animated.parallel()`](animated.md#parallel) starts a number of animations at the same time.
- [`Animated.sequence()`](animated.md#sequence) starts the animations in order, waiting for each to complete before starting the next.
- [`Animated.stagger()`](animated.md#stagger) starts animations in order and in parallel, but with successive delays.

Animations can also be chained together simply by setting the `toValue` of one animation to be another `Animated.Value`. See [Tracking dynamic values](animations.md#tracking-dynamic-values) in the Animations guide.

By default, if one animation is stopped or interrupted, then all other animations in the group are also stopped.

### Combining animated values

You can combine two animated values via addition, multiplication, division, or modulo to make a new animated value:

- [`Animated.add()`](animated.md#add)
- [`Animated.divide()`](animated.md#divide)
- [`Animated.modulo()`](animated.md#modulo)
- [`Animated.multiply()`](animated.md#multiply)

### Interpolation

The `interpolate()` function allows input ranges to map to different output ranges. By default, it will extrapolate the curve beyond the ranges given, but you can also have it clamp the output value. It uses linear interpolation by default but also supports easing functions.

- [`interpolate()`](animated.md#interpolate)

Read more about interpolation in the [Animation](animations.md#interpolation) guide.

### Handling gestures and other events

Gestures, like panning or scrolling, and other events can map directly to animated values using `Animated.event()`. This is done with a structured map syntax so that values can be extracted from complex event objects. The first level is an array to allow mapping across multiple args, and that array contains nested objects.

- [`Animated.event()`](animated.md#event)

For example, when working with horizontal scrolling gestures, you would do the following in order to map `event.nativeEvent.contentOffset.x` to `scrollX` (an `Animated.Value`):

```javascript
 onScroll={Animated.event(
   // scrollX = e.nativeEvent.contentOffset.x
   [{ nativeEvent: {
        contentOffset: {
          x: scrollX
        }
      }
    }]
 )}
```

### Methods

- [`decay`](animated.md#decay)
- [`timing`](animated.md#timing)
- [`spring`](animated.md#spring)
- [`add`](animated.md#add)
- [`divide`](animated.md#divide)
- [`multiply`](animated.md#multiply)
- [`modulo`](animated.md#modulo)
- [`diffClamp`](animated.md#diffclamp)
- [`delay`](animated.md#delay)
- [`sequence`](animated.md#sequence)
- [`parallel`](animated.md#parallel)
- [`stagger`](animated.md#stagger)
- [`event`](animated.md#event)
- [`createAnimatedComponent`](animated.md#createanimatedcomponent)

### Properties

- [`Value`](animated.md#value)
- [`ValueXY`](animated.md#valuexy)
- [`Interpolation`](animated.md#interpolation)

### Classes

- [`AnimatedValue`](animated.md#animatedvalue)
- [`AnimatedValueXY`](animated.md#animatedvaluexy)
- [`AnimatedInterpolation`](animated.md#animatedinterpolation)
- [`AnimatedProps`](animated.md#animatedprops)

---

# Reference

## Methods

### `decay()`

```javascript
static decay(value, config)
```

Animates a value from an initial velocity to zero based on a decay coefficient.

Config is an object that may have the following options:

- `velocity`: Initial velocity. Required.
- `deceleration`: Rate of decay. Default 0.997.
- `useNativeDriver`: Uses the native driver when true. Default false.

---

### `timing()`

```javascript
static timing(value, config)
```

Animates a value along a timed easing curve. The [`Easing`](easing.md) module has tons of predefined curves, or you can use your own function.

Config is an object that may have the following options:

- `duration`: Length of animation (milliseconds). Default 500.
- `easing`: Easing function to define curve. Default is `Easing.inOut(Easing.ease)`.
- `delay`: Start the animation after delay (milliseconds). Default 0.
- `useNativeDriver`: Uses the native driver when true. Default false.

---

### `spring()`

```javascript
static spring(value, config)
```

Spring animation based on Rebound and [Origami](https://facebook.github.io/origami/). Tracks velocity state to create fluid motions as the `toValue` updates, and can be chained together.

Config is an object that may have the following options:

- `friction`: Controls "bounciness"/overshoot. Default 7.
- `tension`: Controls speed. Default 40.
- `useNativeDriver`: Uses the native driver when true. Default false.

---

### `add()`

```javascript
static add(a, b)
```

Creates a new Animated value composed from two Animated values added together.

---

### `divide()`

```javascript
static divide(a, b)
```

Creates a new Animated value composed by dividing the first Animated value by the second Animated value.

---

### `multiply()`

```javascript
static multiply(a, b)
```

Creates a new Animated value composed from two Animated values multiplied together.

---

### `modulo()`

```javascript
static modulo(a, modulus)
```

Creates a new Animated value that is the (non-negative) modulo of the provided Animated value

---

### `diffClamp()`

```javascript
static diffClamp(a, min, max)
```

Create a new Animated value that is limited between 2 values. It uses the difference between the last value so even if the value is far from the bounds it will start changing when the value starts getting closer again. (`value = clamp(value + diff, min, max)`).

This is useful with scroll events, for example, to show the navbar when scrolling up and to hide it when scrolling down.

---

### `delay()`

```javascript
static delay(time)
```

Starts an animation after the given delay.

---

### `sequence()`

```javascript
static sequence(animations)
```

Starts an array of animations in order, waiting for each to complete before starting the next. If the current running animation is stopped, no following animations will be started.

---

### `parallel()`

```javascript
static parallel(animations, config?)
```

Starts an array of animations all at the same time. By default, if one of the animations is stopped, they will all be stopped. You can override this with the `stopTogether` flag.

---

### `stagger()`

```javascript
static stagger(time, animations)
```

Array of animations may run in parallel (overlap), but are started in sequence with successive delays. Nice for doing trailing effects.

---

### `event()`

```javascript
static event(argMapping, config?)
```

Takes an array of mappings and extracts values from each arg accordingly, then calls `setValue` on the mapped outputs. e.g.

```javascript
 onScroll={Animated.event(
   [{nativeEvent: {contentOffset: {x: this._scrollX}}}]
   {listener},          // Optional async listener
 )
 ...
 onPanResponderMove: Animated.event([
   null,                // raw event arg ignored
   {dx: this._panX},    // gestureState arg
 ]),
```

Config is an object that may have the following options:

- `listener`: Optional async listener.
- `useNativeDriver`: Uses the native driver when true. Default false.

---

### `createAnimatedComponent()`

```javascript
static createAnimatedComponent(Component)
```

Make any React component Animatable. Used to create `Animated.View`, etc.

## Properties

---

---

## Classes

## class AnimatedValue

Standard value for driving animations. One `Animated.Value` can drive multiple properties in a synchronized fashion, but can only be driven by one mechanism at a time. Using a new mechanism (e.g. starting a new animation, or calling `setValue`) will stop any previous ones.

### Methods

### `constructor()`

```javascript
constructor(value);
```

---

### `setValue()`

```javascript
setValue(value);
```

Directly set the value. This will stop any animations running on the value and update all the bound properties.

---

### `setOffset()`

```javascript
setOffset(offset);
```

Sets an offset that is applied on top of whatever value is set, whether via `setValue`, an animation, or `Animated.event`. Useful for compensating things like the start of a pan gesture.

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

---

### `removeListener()`

```javascript
removeListener(id);
```

---

### `removeAllListeners()`

```javascript
removeAllListeners();
```

---

### `stopAnimation()`

```javascript
stopAnimation(callback?)
```

Stops any running animation or tracking. `callback` is invoked with the final value after stopping the animation, which is useful for updating state to match the animation position with layout.

---

### `interpolate()`

```javascript
interpolate(config);
```

Interpolates the value before updating the property, e.g. mapping 0-1 to 0-10.

---

### `animate()`

```javascript
animate(animation, callback);
```

Typically only used internally, but could be used by a custom Animation class.

---

### `stopTracking()`

```javascript
stopTracking();
```

Typically only used internally.

---

### `track()`

```javascript
track(tracking);
```

Typically only used internally.

---

## class AnimatedValueXY

2D Value for driving 2D animations, such as pan gestures. Almost identical API to normal `Animated.Value`, but multiplexed. Contains two regular `Animated.Value`s under the hood.

#### Example

```javascript
class DraggableView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: new Animated.ValueXY(), // inits to zero
    };
    this.state.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: this.state.pan.x, // x,y are Animated.Value
          dy: this.state.pan.y,
        },
      ]),
      onPanResponderRelease: () => {
        Animated.spring(
          this.state.pan, // Auto-multiplexed
          {toValue: {x: 0, y: 0}}, // Back to zero
        ).start();
      },
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

### `constructor()`

```javascript
constructor(valueIn?)
```

---

### `setValue()`

```javascript
setValue(value);
```

---

### `setOffset()`

```javascript
setOffset(offset);
```

---

### `flattenOffset()`

```javascript
flattenOffset();
```

---

### `extractOffset()`

```javascript
extractOffset();
```

---

### `stopAnimation()`

```javascript
stopAnimation(callback?)
```

---

### `addListener()`

```javascript
addListener(callback);
```

---

### `removeListener()`

```javascript
removeListener(id);
```

---

### `removeAllListeners()`

```javascript
removeAllListeners();
```

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

---

## class AnimatedInterpolation### Methods

### `constructor()`

```javascript
constructor(parent, config);
```

---

### `interpolate()`

```javascript
interpolate(config);
```
