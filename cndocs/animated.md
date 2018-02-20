---
id: animated
title: Animated
---

The `Animated` library is designed to make animations fluid, powerful, and easy to build and maintain. `Animated` focuses on declarative relationships between inputs and outputs, with configurable transforms in between, and simple `start`/`stop` methods to control time-based animation execution.

The simplest workflow for creating an animation is to create an `Animated.Value`, hook it up to one or more style attributes of an animated component, and then drive updates via animations using `Animated.timing()`:

```javascript
Animated.timing(
  // Animate value over time
  this.state.fadeAnim, // The value to drive
  {
    toValue: 1 // Animate to final value of 1
  }
).start(); // Start the animation
```

你可以在[动画](animations.md#animated-api)文档中看到更多实际的例子。

## 概览

`Animated`提供了两种类型的值：

* [`Animated.Value()`](animated.md#value)用于单个值
* [`Animated.ValueXY()`](animated.md#valuexy)用于矢量值

`Animated.Value`可以绑定到样式或是其他属性上，也可以进行插值运算。单个`Animated.Value`可以用在任意多个属性上。

### 配置动画

`Animated`提供了三种动画类型。每种动画类型都提供了特定的函数曲线，用于控制动画值从初始值变化到最终值的变化过程：

* [`Animated.decay()`](animated.md#decay)以指定的初始速度开始变化，然后变化速度越来越慢直至停下。
* [`Animated.spring()`](animated.md#spring) provides a simple spring physics model.
* [`Animated.timing()`](animated.md#timing) animates a value over time using [easing functions](easing.md).

大多数情况下你应该使用`timing()`. By default, it uses a symmetric easeInOut curve that conveys the gradual acceleration of an object to full speed and concludes by gradually decelerating to a stop.

### 使用动画

Animations are started by calling `start()` on your animation. `start()` takes a completion callback that will be called when the animation is done. If the animation finished running normally, the completion callback will be invoked with `{finished: true}`. If the animation is done because `stop()` was called on it before it could finish (e.g. because it was interrupted by a gesture or another animation), then it will receive `{finished: false}`.

### 启用原生动画驱动

By using the native driver, we send everything about the animation to native before starting the animation, allowing native code to perform the animation on the UI thread without having to go through the bridge on every frame. Once the animation has started, the JS thread can be blocked without affecting the animation.

You can use the native driver by specifying `useNativeDriver: true` in your animation configuration. 你可以在[动画文档](animations.md#启用原生动画驱动) 中看到更详细的解释。

### 自定义动画组件

组件必须经过特殊处理才能用于动画。所谓的特殊处理主要是指把动画值绑定到属性上，并且在一帧帧执行动画时避免 react 重新渲染和重新调和的开销。此外还得在组件卸载时做一些清理工作，使得这些组件在使用时是安全的。

* [`createAnimatedComponent()`](animated.md#createanimatedcomponent)方法正是用来处理组件，使其可以用于动画。

`Animated`中默认导出了以下这些可以直接使用的动画组件，当然它们都是通过使用上面这个方法进行了封装：

* `Animated.Image`
* `Animated.ScrollView`
* `Animated.Text`
* `Animated.View`

### 组合动画

Animations can also be combined in complex ways using composition functions:

* [`Animated.delay()`](animated.md#delay) starts an animation after a given delay.
* [`Animated.parallel()`](animated.md#parallel) starts a number of animations at the same time.
* [`Animated.sequence()`](animated.md#sequence) starts the animations in order, waiting for each to complete before starting the next.
* [`Animated.stagger()`](animated.md#stagger) starts animations in order and in parallel, but with successive delays.

Animations can also be chained together simply by setting the `toValue` of one animation to be another `Animated.Value`. See [跟踪动态值](animations.md#跟踪动态值) in the Animations guide.

By default, if one animation is stopped or interrupted, then all other animations in the group are also stopped.

### 合成动画值

你可以使用加减乘除以及取余等运算来把两个动画值合成为一个新的动画值：

* [`Animated.add()`](animated.md#add)
* [`Animated.divide()`](animated.md#divide)
* [`Animated.modulo()`](animated.md#modulo)
* [`Animated.multiply()`](animated.md#multiply)

### 插值

The `interpolate()` function allows input ranges to map to different output ranges. By default, it will extrapolate the curve beyond the ranges given, but you can also have it clamp the output value. It uses lineal interpolation by default but also supports easing functions.

* [`interpolate()`](animated.md#插值)

你可以在[动画](animations.md#插值)文档中了解到更多。

### 处理手势和其他事件

Gestures, like panning or scrolling, and other events can map directly to animated values using `Animated.event()`. This is done with a structured map syntax so that values can be extracted from complex event objects. The first level is an array to allow mapping across multiple args, and that array contains nested objects.

* [`Animated.event()`](animated.md#event)

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

### 查看方法

* [`decay`](animated.md#decay)
* [`timing`](animated.md#timing)
* [`spring`](animated.md#spring)
* [`add`](animated.md#add)
* [`divide`](animated.md#divide)
* [`multiply`](animated.md#multiply)
* [`modulo`](animated.md#modulo)
* [`diffClamp`](animated.md#diffclamp)
* [`delay`](animated.md#delay)
* [`sequence`](animated.md#sequence)
* [`parallel`](animated.md#parallel)
* [`stagger`](animated.md#stagger)
* [`loop`](animated.md#loop)
* [`event`](animated.md#event)
* [`forkEvent`](animated.md#forkevent)
* [`unforkEvent`](animated.md#unforkevent)

### 属性

* [`Value`](animated.md#value)
* [`ValueXY`](animated.md#valuexy)
* [`Interpolation`](animated.md#interpolation)
* [`Node`](animated.md#node)
* [`createAnimatedComponent`](animated.md#createanimatedcomponent)
* [`attachNativeEvent`](animated.md#attachnativeevent)

---

# 文档

## 方法

### `decay()`

```javascript
static decay(value, config)
```

推动一个值以一个初始的速度和一个衰减系数逐渐变为 0。

Config 参数有以下这些属性：

* `velocity`: 初始速度。必填。
* `deceleration`: 衰减系数。默认值 0.997。
* `isInteraction`: Whether or not this animation creates an "interaction handle" on the `InteractionManager`. Default true.
* `useNativeDriver`: 启用原生动画驱动。默认不启用(false)。

---

### `timing()`

```javascript
static timing(value, config)
```

推动一个值按照一个缓动曲线而随时间变化。[`Easing`](easing.md)模块定义了一大堆曲线，你也可以使用你自己的函数。

Config 参数有以下这些属性：

* `duration`: 动画的持续时间（毫秒）。默认值为 500.
* `easing`: 缓动函数。 默认为`Easing.inOut(Easing.ease)`。
* `delay`: 开始动画前的延迟时间（毫秒）。默认为 0.
* `isInteraction`: Whether or not this animation creates an "interaction handle" on the `InteractionManager`. Default true.
* `useNativeDriver`: 启用原生动画驱动。默认不启用(false)。

---

### `spring()`

```javascript
static spring(value, config)
```

根据基于[阻尼谐振动 damped harmonic oscillation](https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator)的弹性模型生成一个动画值。它会在`toValue`值更新的同时跟踪当前的速度状态，以确保动画连贯。可以链式调用。

Config 参数有以下这些属性：

注意你不能同时定义 bounciness/speed、tension/friction 或 stiffness/damping/mass 这三组数据，只能指定其中一组：

The friction/tension or bounciness/speed options match the spring model in [Facebook Pop](https://github.com/facebook/pop), [Rebound](http://facebook.github.io/rebound/), and [Origami](http://origami.design/).

* `friction`: Controls "bounciness"/overshoot. Default 7.
* `tension`: Controls speed. Default 40.
* `speed`: Controls speed of the animation. Default 12.
* `bounciness`: Controls bounciness. Default 8.

Specifying stiffness/damping/mass as parameters makes `Animated.spring` use an analytical spring model based on the motion equations of a [damped harmonic oscillator](https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator). This behavior is slightly more precise and faithful to the physics behind spring dynamics, and closely mimics the implementation in iOS's CASpringAnimation primitive.

* `stiffness`: The spring stiffness coefficient. Default 100.
* `damping`: Defines how the spring’s motion should be damped due to the forces of friction. Default 10.
* `mass`: The mass of the object attached to the end of the spring. Default 1.

Other configuration options are as follows:

* `velocity`: The initial velocity of the object attached to the spring. Default 0 (object is at rest).
* `overshootClamping`: Boolean indiciating whether the spring should be clamped and not bounce. Default false.
* `restDisplacementThreshold`: The threshold of displacement from rest below which the spring should be considered at rest. Default 0.001.
* `restSpeedThreshold`: The speed at which the spring should be considered at rest in pixels per second. Default 0.001.
* `delay`: Start the animation after delay (milliseconds). Default 0.
* `isInteraction`: Whether or not this animation creates an "interaction handle" on the `InteractionManager`. Default true.
* `useNativeDriver`: 启用原生动画驱动。默认不启用(false)。

---

### `add()`

```javascript
static add(a, b)
```

将两个动画值相加计算，得出一个新的动画值。

---

### `divide()`

```javascript
static divide(a, b)
```

将两个动画值相除计算，得出一个新的动画值。

---

### `multiply()`

```javascript
static multiply(a, b)
```

将两个动画值相乘计算，得出一个新的动画值。

---

### `modulo()`

```javascript
static modulo(a, modulus)
```

将两个动画值做取模（取余数）计算，得出一个新的动画值。

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

在指定的延迟之后开始动画。

---

### `sequence()`

```javascript
static sequence(animations)
```

按顺序执行一个动画数组里的动画，等待一个完成后再执行下一个。如果当前的动画被中止，后面的动画则不会继续执行。

---

### `parallel()`

```javascript
static parallel(animations, config?)
```

同时开始一个动画数组里的全部动画。默认情况下，如果有任何一个动画停止了，其余的也会被停止。你可以通过`stopTogether`选项来改变这个效果。

---

### `stagger()`

```javascript
static stagger(time, animations)
```

一个动画数组，里面的动画有可能会同时执行（重叠），不过会以指定的延迟来开始。适用于制作拖尾效果。

---

### `loop()`

```javascript
static loop(animation)
```

无限循环指定的动画，从头到尾周而复始。Can specify number of times to loop using the key `iterations` in the config. Will loop without blocking the UI thread if the child animation is set to `useNativeDriver: true`. In addition, loops can prevent `VirtualizedList`-based components from rendering more rows while the animation is running. You can pass `isInteraction: false` in the child animation config to fix this.

---

### `event()`

```javascript
static event(argMapping, config?)
```

接受一个映射的数组，对应的解开每个值，然后调用所有对应的输出的`setValue`方法。例如：

```javascript
 onScroll={Animated.event(
   [{nativeEvent: {contentOffset: {x: this._scrollX}}}],
   {listener: (event) => console.log(event)}, // 可选的异步监听函数
 )}
 ...
 onPanResponderMove: Animated.event([
   null,                // 忽略原始事件
   {dx: this._panX}],    // 手势状态参数
{listener: (event, gestureState) => console.log(event, gestureState)}, // 可选的异步监听函数
 ),
```

Config is an object that may have the following options:

* `listener`: Optional async listener.
* `useNativeDriver`: Uses the native driver when true. Default false.

---

### `forkEvent()`

```javascript
static forkEvent(event, listener)
```

Advanced imperative API for snooping on animated events that are passed in through props. Use values directly where possible.

---

### `unforkEvent()`

```javascript
static unforkEvent(event, listener)
```

## Properties

---

---

---

---

---
