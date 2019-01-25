---
id: animated
title: Animated
---

`Animated`库旨在使动画变得流畅，强大并易于构建和维护。`Animated`侧重于输入和输出之间的声明性关系，以及两者之间的可配置变换，此外还提供了简单的 `start/stop`方法来控制基于时间的动画执行。

创建动画最简单的工作流程是创建一个 `Animated.Value` ，将它连接到动画组件的一个或多个样式属性，然后使用`Animated.timing()`通过动画效果展示数据的变化：

```javascript
Animated.timing(
  // timing方法使动画值随时间变化
  this.state.fadeAnim, // 要变化的动画值
  {
    toValue: 1, // 最终的动画值
  },
).start(); // 开始执行动画
```

你可以在[动画](animations.md#animated-api)文档中看到更多实际的例子。

## 概览

`Animated`提供了两种类型的值：

- [`Animated.Value()`](animated.md#value)用于单个值
- [`Animated.ValueXY()`](animated.md#valuexy)用于矢量值

`Animated.Value`可以绑定到样式或是其他属性上，也可以进行插值运算。单个`Animated.Value`可以用在任意多个属性上。

### 配置动画

`Animated`提供了三种动画类型。每种动画类型都提供了特定的函数曲线，用于控制动画值从初始值变化到最终值的变化过程：

- [`Animated.decay()`](animated.md#decay)以指定的初始速度开始变化，然后变化速度越来越慢直至停下。
- [`Animated.spring()`](animated.md#spring)提供了一个简单的弹簧物理模型.
- [`Animated.timing()`](animated.md#timing)使用[easing 函数](easing.md)让数值随时间动起来。

大多数情况下你应该使用`timing()`。默认情况下，它使用对称的 easeInOut 曲线，将对象逐渐加速到全速，然后通过逐渐减速停止结束。

### 使用动画

通过在动画上调用`start()`来启动动画。 `start()`需要一个 完成 回调函数，当动画完成时将会调用它。如果动画运行正常，则将通过`{finished：true}`触发回调。如果动画是因为调用了`stop()`而结束（例如，因为它被手势或其他动画中断），则它会收到`{finished：false}`。

### 启用原生动画驱动

使用原生动画，我们会在开始动画之前将所有关于动画的内容发送到原生代码，从而使用原生代码在 UI 线程上执行动画，而不是通过对每一帧的桥接去执行动画。一旦动画开始，JS 线程就可以在不影响动画效果的情况下阻塞（去执行其他任务）掉了。

您可以通过在动画配置中指定`useNativeDriver：true` 来使用原生动画驱动。你可以在[动画文档](animations.md#启用原生动画驱动) 中看到更详细的解释。

### 自定义动画组件

组件必须经过特殊处理才能用于动画。所谓的特殊处理主要是指把动画值绑定到属性上，并且在一帧帧执行动画时避免 react 重新渲染和重新调和的开销。此外还得在组件卸载时做一些清理工作，使得这些组件在使用时是安全的。

- [`createAnimatedComponent()`](animated.md#createanimatedcomponent)方法正是用来处理组件，使其可以用于动画。

`Animated`中默认导出了以下这些可以直接使用的动画组件，当然它们都是通过使用上面这个方法进行了封装：

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`

### 组合动画

动画还可以使用组合函数以复杂的方式进行组合：

- [`Animated.delay()`](animated.md#delay)在给定延迟后开始动画。
- [`Animated.parallel()`](animated.md#parallel)同时启动多个动画。
- [`Animated.sequence()`](animated.md#sequence)按顺序启动动画，等待每一个动画完成后再开始下一个动画。
- [`Animated.stagger()`](animated.md#stagger)按照给定的延时间隔，顺序并行的启动动画。

动画也可以通过将`toValue`设置为另一个动画的`Animated.Value`来简单的链接在一起。请参阅动画指南中的[跟踪动态值](animations.md＃跟踪动态值)值。

默认情况下，如果一个动画停止或中断，则组合中的所有其他动画也会停止。

### 合成动画值

你可以使用加减乘除以及取余等运算来把两个动画值合成为一个新的动画值：

- [`Animated.add()`](animated.md#add)
- [`Animated.subtract()`](animated.md#subtract)
- [`Animated.divide()`](animated.md#divide)
- [`Animated.modulo()`](animated.md#modulo)
- [`Animated.multiply()`](animated.md#multiply)

### 插值

`interpolate()`函数允许输入范围映射到不同的输出范围。默认情况下，它将推断超出给定范围的曲线，但也可以限制输出值。它默认使用线性插值，但也支持缓动功能。

- [`interpolate()`](animated.md#插值)

你可以在[动画](animations.md#插值)文档中了解到更多。

### 处理手势和其他事件

手势，如平移或滚动，以及其他事件可以使用`Animated.event()`直接映射到动画值。这是通过结构化映射语法完成的，以便可以从复杂的事件对象中提取值。第一层参数是一个数组，你可以在其中指定多个参数映射，这种映射可以是嵌套的对象。

- [`Animated.event()`](animated.md#event)

例如，在使用水平滚动手势时，为了将`event.nativeEvent.contentOffset.x`映射到`scrollX`（`Animated.Value`），您需要执行以下操作：

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

- [`decay`](animated.md#decay)
- [`timing`](animated.md#timing)
- [`spring`](animated.md#spring)
- [`add`](animated.md#add)
- [`subtract`](animated.md#subtract)
- [`divide`](animated.md#divide)
- [`multiply`](animated.md#multiply)
- [`modulo`](animated.md#modulo)
- [`diffClamp`](animated.md#diffclamp)
- [`delay`](animated.md#delay)
- [`sequence`](animated.md#sequence)
- [`parallel`](animated.md#parallel)
- [`stagger`](animated.md#stagger)
- [`loop`](animated.md#loop)
- [`event`](animated.md#event)
- [`forkEvent`](animated.md#forkevent)
- [`unforkEvent`](animated.md#unforkevent)

### 属性

- [`Value`](animated.md#value)
- [`ValueXY`](animated.md#valuexy)
- [`Interpolation`](animated.md#interpolation)
- [`Node`](animated.md#node)
- [`createAnimatedComponent`](animated.md#createanimatedcomponent)
- [`attachNativeEvent`](animated.md#attachnativeevent)

---

# 文档

## 方法

如果下面的方法参数是二维向量值 ValueXY 而不是单一标量值 Value，则对应的配置参数 config 也应该是二维向量形式`{x: ..., y: ...}`。

### `decay()`

```javascript
static decay(value, config)
```

推动一个值以一个初始的速度和一个衰减系数逐渐变为 0。

Config 参数有以下这些属性：

- `velocity`: 初始速度。必填。
- `deceleration`: 衰减系数。默认值 0.997。
- `isInteraction`: 指定本动画是否在`InteractionManager`的队列中注册以影响其任务调度。默认值为 true。
- `useNativeDriver`: 启用原生动画驱动。默认不启用(false)。

---

### `timing()`

```javascript
static timing(value, config)
```

推动一个值按照一个缓动曲线而随时间变化。[`Easing`](easing.md)模块定义了一大堆曲线，你也可以使用你自己的函数。

Config 参数有以下这些属性：

- `duration`: 动画的持续时间（毫秒）。默认值为 500.
- `easing`: 缓动函数。 默认为`Easing.inOut(Easing.ease)`。
- `delay`: 开始动画前的延迟时间（毫秒）。默认为 0.
- `isInteraction`: 指定本动画是否在`InteractionManager`的队列中注册以影响其任务调度。默认值为 true。
- `useNativeDriver`: 启用原生动画驱动。默认不启用(false)。

---

### `spring()`

```javascript
static spring(value, config)
```

根据基于[阻尼谐振动 damped harmonic oscillation](https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator)的弹性模型生成一个动画值。它会在`toValue`值更新的同时跟踪当前的速度状态，以确保动画连贯。可以链式调用。

Config 参数有以下这些属性：

注意你不能同时定义 bounciness/speed、tension/friction 或 stiffness/damping/mass 这三组数据，只能指定其中一组：

The friction/tension or bounciness/speed options match the spring model in [Facebook Pop](https://github.com/facebook/pop), [Rebound](http://facebook.github.io/rebound/), and [Origami](http://origami.design/).

- `friction`: Controls "bounciness"/overshoot. Default 7.
- `tension`: Controls speed. Default 40.
- `speed`: Controls speed of the animation. Default 12.
- `bounciness`: Controls bounciness. Default 8.

Specifying stiffness/damping/mass as parameters makes `Animated.spring` use an analytical spring model based on the motion equations of a [damped harmonic oscillator](https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator). This behavior is slightly more precise and faithful to the physics behind spring dynamics, and closely mimics the implementation in iOS's CASpringAnimation primitive.

- `stiffness`: The spring stiffness coefficient. Default 100.
- `damping`: Defines how the spring’s motion should be damped due to the forces of friction. Default 10.
- `mass`: The mass of the object attached to the end of the spring. Default 1.

Other configuration options are as follows:

- `velocity`: The initial velocity of the object attached to the spring. Default 0 (object is at rest).
- `overshootClamping`: Boolean indiciating whether the spring should be clamped and not bounce. Default false.
- `restDisplacementThreshold`: The threshold of displacement from rest below which the spring should be considered at rest. Default 0.001.
- `restSpeedThreshold`: The speed at which the spring should be considered at rest in pixels per second. Default 0.001.
- `delay`: Start the animation after delay (milliseconds). Default 0.
- `isInteraction`: 指定本动画是否在`InteractionManager`的队列中注册以影响其任务调度。默认值为 true。
- `useNativeDriver`: 启用原生动画驱动。默认不启用(false)。

---

### `add()`

```javascript
static add(a, b)
```

将两个动画值相加计算，得出一个新的动画值。

---

### `subtract()`

```javascript
static subtract(a, b)
```

将两个动画值相减计算，得出一个新的动画值。

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
static loop(animation, config?)
```

无限循环一个指定的动画，从头到尾周而复始。Will loop without blocking the UI thread if the child animation is set to `useNativeDriver: true`. In addition, loops can prevent `VirtualizedList`-based components from rendering more rows while the animation is running. You can pass `isInteraction: false` in the child animation config to fix this.
 
 Config is an object that may have the following options:
 
 * `iterations`: Number of times the animation should loop. Default `-1` (infinite).

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

Config 参数有以下这些属性：

- `listener`: 可选的异步监听函数
- `useNativeDriver`: 启用原生动画驱动。默认不启用(false)。

---

### `forkEvent()`

```javascript
static forkEvent(event, listener)
```

Advanced imperative API for snooping on animated events that are passed in through props. It permits to add a new javascript listener to an existing `AnimatedEvent`. If `animatedEvent` is a simple javascript listener, it will merge the 2 listeners into a single one, and if `animatedEvent` is null/undefined, it will assign the javascript listener directly. Use values directly where possible.

---

### `unforkEvent()`

```javascript
static unforkEvent(event, listener)
```

## 属性

### `Value`

驱动动画运行的一维标量值。一般使用`new Animated.Value(0);`来初始化。

---

### `ValueXY`

驱动 2D 动画运行的二维向量值，比如用在手势动画中。

---

### `Interpolation`

Exported to use the Interpolation type in flow.

---

### `Node`

Exported for ease of type checking. All animated values derive from this class.

---

### `createAnimatedComponent`

封装任意 React 组件，使其可以动画化。`Animated.View`等内置组件就是通过这一方法封装的。

---

### `attachNativeEvent`

Imperative API to attach an animated value to an event on a view. Prefer using `Animated.event` with `useNativeDrive: true` if possible.
