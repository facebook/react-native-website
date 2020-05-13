---
id: version-0.36-animated
title: Animated
original_id: animated
---

Animations are an important part of modern UX, and the `Animated` library is designed to make them fluid, powerful, and painless to build and maintain.

The most basic workflow is to create an `Animated.Value`, hook it up to one or more style attributes of an animated component, and then drive updates either via animations, such as `Animated.timing`, or by hooking into gestures like panning or scrolling via `Animated.event`. `Animated.Value` can also bind to props other than style, and can be interpolated as well. Here is a basic example of a container view that will fade in when it's mounted:

```jsx
class FadeInView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0) // init opacity 0
    };
  }
  componentDidMount() {
    Animated.timing(
      // Uses easing functions
      this.state.fadeAnim, // The value to drive
      { toValue: 1 } // Configuration
    ).start(); // Don't forget start!
  }
  render() {
    return (
      <Animated.View // Special animatable View
        style={{ opacity: this.state.fadeAnim }}>
        {' '}
        // Binds
        {this.props.children}
      </Animated.View>
    );
  }
}
```

Note that only animatable components can be animated. `View`, `Text`, and `Image` are already provided, and you can create custom ones with `createAnimatedComponent`. These unique components do the magic of binding the animated values to the properties, and do targeted native updates to avoid the cost of the react render and reconciliation process on every frame. They also handle cleanup on unmount so they are safe by default.

Animations are heavily configurable. Custom and pre-defined easing functions, delays, durations, decay factors, spring constants, and more can all be tweaked depending on the type of animation.

A single `Animated.Value` can drive any number of properties, and each property can be run through an interpolation first. An interpolation maps input ranges to output ranges, typically using a linear interpolation but also supports easing functions. By default, it will extrapolate the curve beyond the ranges given, but you can also have it clamp the output value.

For example, you may want to think about your `Animated.Value` as going from 0 to 1, but animate the position from 150px to 0px and the opacity from 0 to

1. This can be done by modifying `style` in the example above like so:

```jsx
 style={{
   opacity: this.state.fadeAnim, // Binds directly
   transform: [{
     translateY: this.state.fadeAnim.interpolate({
       inputRange: [0, 1],
       outputRange: [150, 0]  // 0 : 150, 0.5 : 75, 1 : 0
     }),
   }],
 }}>
```

Animations can also be combined in complex ways using composition functions such as `sequence` and `parallel`, and can also be chained together by setting the `toValue` of one animation to be another `Animated.Value`.

`Animated.ValueXY` is handy for 2D animations, like panning, and there are other helpful additions like `setOffset` and `getLayout` to aid with typical interaction patterns, like drag-and-drop.

You can see more example usage in `AnimationExample.js`, the Gratuitous Animation App, and [Animations documentation guide](animations.md).

Note that `Animated` is designed to be fully serializable so that animations can be run in a high performance way, independent of the normal JavaScript event loop. This does influence the API, so keep that in mind when it seems a little trickier to do something compared to a fully synchronous system. Checkout `Animated.Value.addListener` as a way to work around some of these limitations, but use it sparingly since it might have performance implications in the future.

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

### Classes

- [`AnimatedValue`](animated.md#animatedvalue)
- [`AnimatedValueXY`](animated.md#animatedvaluexy)
- [`AnimatedProps`](animated.md#animatedprops)

---

# Reference

## Methods

### `decay()`

```jsx
static decay(value, config)
```

Animates a value from an initial velocity to zero based on a decay coefficient.

---

### `timing()`

```jsx
static timing(value, config)
```

Animates a value along a timed easing curve. The `Easing` module has tons of pre-defined curves, or you can use your own function.

---

### `spring()`

```jsx
static spring(value, config)
```

Spring animation based on Rebound and Origami. Tracks velocity state to create fluid motions as the `toValue` updates, and can be chained together.

---

### `add()`

```jsx
static add(a, b)
```

Creates a new Animated value composed from two Animated values added together.

---

### `divide()`

```jsx
static divide(a, b)
```

Creates a new Animated value composed by dividing the first Animated value by the second Animated value.

---

### `multiply()`

```jsx
static multiply(a, b)
```

Creates a new Animated value composed from two Animated values multiplied together.

---

### `modulo()`

```jsx
static modulo(a, modulus)
```

Creates a new Animated value that is the (non-negative) modulo of the provided Animated value

---

### `diffClamp()`

```jsx
static diffClamp(a, min, max)
```

Create a new Animated value that is limited between 2 values. It uses the difference between the last value so even if the value is far from the bounds it will start changing when the value starts getting closer again. (`value = clamp(value + diff, min, max)`).

This is useful with scroll events, for example, to show the navbar when scrolling up and to hide it when scrolling down.

---

### `delay()`

```jsx
static delay(time)
```

Starts an animation after the given delay.

---

### `sequence()`

```jsx
static sequence(animations)
```

Starts an array of animations in order, waiting for each to complete before starting the next. If the current running animation is stopped, no following animations will be started.

---

### `parallel()`

```jsx
static parallel(animations, config?)
```

Starts an array of animations all at the same time. By default, if one of the animations is stopped, they will all be stopped. You can override this with the `stopTogether` flag.

---

### `stagger()`

```jsx
static stagger(time, animations)
```

Array of animations may run in parallel (overlap), but are started in sequence with successive delays. Nice for doing trailing effects.

---

### `event()`

```jsx
static event(argMapping, config?)
```

Takes an array of mappings and extracts values from each arg accordingly, then calls `setValue` on the mapped outputs. e.g.

```jsx
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

---

### `createAnimatedComponent()`

```jsx
static createAnimatedComponent(Component)
```

Make any React component Animatable. Used to create `Animated.View`, etc.

## Properties

---

## Classes

## class AnimatedValue

Standard value for driving animations. One `Animated.Value` can drive multiple properties in a synchronized fashion, but can only be driven by one mechanism at a time. Using a new mechanism (e.g. starting a new animation, or calling `setValue`) will stop any previous ones.

### Methods

### `constructor()`

```jsx
constructor(value);
```

---

### `setValue()`

```jsx
setValue(value);
```

Directly set the value. This will stop any animations running on the value and update all the bound properties.

---

### `setOffset()`

```jsx
setOffset(offset);
```

Sets an offset that is applied on top of whatever value is set, whether via `setValue`, an animation, or `Animated.event`. Useful for compensating things like the start of a pan gesture.

---

### `flattenOffset()`

```jsx
flattenOffset();
```

Merges the offset value into the base value and resets the offset to zero. The final output of the value is unchanged.

---

### `addListener()`

```jsx
addListener(callback);
```

Adds an asynchronous listener to the value so you can observe updates from animations. This is useful because there is no way to synchronously read the value because it might be driven natively.

---

### `removeListener()`

```jsx
removeListener(id);
```

---

### `removeAllListeners()`

```jsx
removeAllListeners();
```

---

### `stopAnimation()`

```jsx
stopAnimation(callback?)
```

Stops any running animation or tracking. `callback` is invoked with the final value after stopping the animation, which is useful for updating state to match the animation position with layout.

---

### `interpolate()`

```jsx
interpolate(config);
```

Interpolates the value before updating the property, e.g. mapping 0-1 to 0-10.

---

### `animate()`

```jsx
animate(animation, callback);
```

Typically only used internally, but could be used by a custom Animation class.

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

---

## class AnimatedValueXY

2D Value for driving 2D animations, such as pan gestures. Almost identical API to normal `Animated.Value`, but multiplexed. Contains two regular `Animated.Value`s under the hood. Example:

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

### `constructor()`

```jsx
constructor(valueIn?)
```

---

### `setValue()`

```jsx
setValue(value);
```

---

### `setOffset()`

```jsx
setOffset(offset);
```

---

### `flattenOffset()`

```jsx
flattenOffset();
```

---

### `stopAnimation()`

```jsx
stopAnimation(callback?)
```

---

### `addListener()`

```jsx
addListener(callback);
```

---

### `removeListener()`

```jsx
removeListener(id);
```

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
