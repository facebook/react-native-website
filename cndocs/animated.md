---
id: animated
title: Animated
---

`Animated` 库旨在让动画的构建与维护都更流畅、更强大、也更省心。`Animated` 关注输入与输出之间的声明式关系、中间可配置的变换过程，以及用于控制基于时间动画执行的 `start` / `stop` 方法。

创建动画的核心流程是：先创建一个 `Animated.Value`，把它绑定到动画组件的一个或多个样式属性上，再通过 `Animated.timing()` 等动画方法驱动其更新。

:::note
不要直接修改动画值。你可以使用 [`useRef` Hook](https://react.dev/reference/react/useRef) 返回一个可变的 ref 对象。该对象的 `current` 属性会以给定参数初始化，并在整个组件生命周期内保持不变。
:::

## 示例

下面示例包含一个 `View`，它会根据动画值 `fadeAnim` 淡入和淡出。

```SnackPlayer name=Animated%20Example
import React from 'react';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {
  Animated,
  Text,
  View,
  StyleSheet,
  Button,
  useAnimatedValue,
} from 'react-native';

const App = () => {
  // fadeAnim will be used as the value for opacity. Initial Value: 0
  const fadeAnim = useAnimatedValue(0);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              // Bind opacity to animated value
              opacity: fadeAnim,
            },
          ]}>
          <Text style={styles.fadingText}>Fading View!</Text>
        </Animated.View>
        <View style={styles.buttonRow}>
          <Button title="Fade In View" onPress={fadeIn} />
          <Button title="Fade Out View" onPress={fadeOut} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
  fadingText: {
    fontSize: 28,
  },
  buttonRow: {
    flexBasis: 100,
    justifyContent: 'space-evenly',
    marginVertical: 16,
  },
});

export default App;
```

可参考[动画](animations#animated-api)指南，查看更多 `Animated` 实战示例。

## 概览

`Animated` 支持两种值类型：

- [`Animated.Value()`](animated#value)：单值
- [`Animated.ValueXY()`](animated#valuexy)：向量值

`Animated.Value` 可以绑定到样式属性或其他 props，也可以进行插值。一个 `Animated.Value` 可驱动任意多个属性。

### 配置动画

`Animated` 提供三种动画类型。每种类型都通过不同曲线，控制值从初始值过渡到目标值：

- [`Animated.decay()`](animated#decay)：以初速度开始并逐渐减速直至停止。
- [`Animated.spring()`](animated#spring)：提供基础的弹簧物理模型。
- [`Animated.timing()`](animated#timing)：基于时间和[缓动函数](easing)进行动画。

多数情况下你会使用 `timing()`。它默认使用对称的 easeInOut 曲线：先逐渐加速，再逐渐减速到停止。

### 使用动画

通过在动画实例上调用 `start()` 来启动动画。`start()` 接收一个完成回调：

- 正常结束时回调参数为 `{finished: true}`
- 若动画在完成前被 `stop()` 中断（例如被手势或其他动画打断），回调参数为 `{finished: false}`

```tsx
Animated.timing({}).start(({finished}) => {
  /* completion callback */
});
```

### 使用原生驱动

使用原生驱动时，会在动画开始前将动画所需信息一次性发送到原生端。之后动画可在 UI 线程执行，不必每帧经过 bridge。动画启动后，即使 JS 线程阻塞，也不影响动画表现。

在动画配置中设置 `useNativeDriver: true` 即可启用。详见[动画](animations#using-the-native-driver)。

### 可动画组件

只有可动画组件才能被动画化。这些组件负责把动画值绑定到属性，并进行有针对性的原生更新，避免每帧都走 React 渲染与协调的开销。它们也会在卸载时自动清理。

- [`createAnimatedComponent()`](animated#createanimatedcomponent) 可将任意组件包装成可动画组件。

`Animated` 通过该封装导出了以下可动画组件：

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`
- `Animated.FlatList`
- `Animated.SectionList`

### 组合动画

可以通过组合函数构建更复杂的动画：

- [`Animated.delay()`](animated#delay)：延迟后开始动画。
- [`Animated.parallel()`](animated#parallel)：并行启动多个动画。
- [`Animated.sequence()`](animated#sequence)：按顺序依次执行动画。
- [`Animated.stagger()`](animated#stagger)：按顺序启动，但带有错开延迟，可部分重叠。

还可以将某个动画的 `toValue` 设为另一个 `Animated.Value` 来串联动画。详见动画指南中的[跟踪动态值](animations#tracking-dynamic-values)。

默认情况下，组内若某个动画停止或中断，其余动画也会被停止。

### 组合动画值

你可以通过加减乘除或取模，将两个动画值组合成新的动画值：

- [`Animated.add()`](animated#add)
- [`Animated.subtract()`](animated#subtract)
- [`Animated.divide()`](animated#divide)
- [`Animated.modulo()`](animated#modulo)
- [`Animated.multiply()`](animated#multiply)

### 插值

`interpolate()` 可将输入区间映射到不同输出区间。默认会对给定区间外做外推，也可以限制输出范围。默认是线性插值，也支持缓动函数。

- [`interpolate()`](animatedvalue#interpolate)

更多内容见[动画](animations#interpolation)。

### 处理手势与其他事件

手势（如平移、滚动）和其他事件可通过 `Animated.event()` 直接映射到动画值。它使用结构化映射语法，从复杂事件对象中提取值。第一层是数组（用于映射多个参数），数组内是嵌套对象。

- [`Animated.event()`](animated#event)

例如在横向滚动中，将 `event.nativeEvent.contentOffset.x` 映射到 `scrollX`（一个 `Animated.Value`）：

```tsx
 onScroll={Animated.event(
   // scrollX = e.nativeEvent.contentOffset.x
   [{nativeEvent: {
        contentOffset: {
          x: scrollX
        }
      }
    }]
 )}
```

---

# 参考

## 方法

当传入值是 ValueXY 而非 Value 时，各配置项可使用形如 `{x: ..., y: ...}` 的向量，而不只是标量。

### `decay()`

```tsx
static decay(value, config): CompositeAnimation;
```

基于衰减系数，让值从初速度逐渐衰减到 0。

`config` 可包含：

- `velocity`：初始速度。必填。
- `deceleration`：衰减率。默认 `0.997`。
- `isInteraction`：是否在 `InteractionManager` 上创建 interaction handle。默认 `true`。
- `useNativeDriver`：为 `true` 时使用原生驱动。必填。

---

### `timing()`

```tsx
static timing(value, config): CompositeAnimation;
```

沿时间缓动曲线执行动画。[`Easing`](easing) 模块提供大量预设曲线，也可使用自定义函数。

`config` 可包含：

- `duration`：动画时长（毫秒）。默认 `500`。
- `easing`：定义曲线的缓动函数。默认为 `Easing.inOut(Easing.ease)`。
- `delay`：延迟多久后开始（毫秒）。默认 `0`。
- `isInteraction`：是否在 `InteractionManager` 上创建 interaction handle。默认 `true`。
- `useNativeDriver`：为 `true` 时使用原生驱动。必填。

---

### `spring()`

```tsx
static spring(value, config): CompositeAnimation;
```

根据[阻尼谐振子](https://en.wikipedia.org/wiki/Harmonic_oscillator#Damped_harmonic_oscillator)的解析弹簧模型执行动画。它会跟踪速度状态，使 `toValue` 变化时过渡更流畅，也支持链式衔接。

`config` 可包含以下选项。

注意：`bounciness/speed`、`tension/friction`、`stiffness/damping/mass` 三组参数只能选一组定义，不能混用。

`friction/tension` 或 `bounciness/speed` 与 [`Facebook Pop`](https://github.com/facebook/pop)、[Rebound](https://github.com/facebookarchive/rebound) 和 [Origami](https://origami.design/) 的弹簧模型一致。

- `friction`：控制“弹性”/过冲。默认 `7`。
- `tension`：控制速度。默认 `40`。
- `speed`：控制动画速度。默认 `12`。
- `bounciness`：控制弹性。默认 `8`。

指定 `stiffness/damping/mass` 后，`Animated.spring` 会采用基于阻尼谐振子运动方程的解析弹簧模型。该行为在物理精度上略高，也更接近 iOS `CASpringAnimation` 的实现。

- `stiffness`：弹簧刚度系数。默认 `100`。
- `damping`：定义弹簧受摩擦力影响的阻尼程度。默认 `10`。
- `mass`：连接在弹簧末端物体的质量。默认 `1`。

其他配置项：

- `velocity`：弹簧连接物体的初始速度。默认 `0`（静止）。
- `overshootClamping`：布尔值，是否限制过冲（不回弹）。默认 `false`。
- `restDisplacementThreshold`：位移阈值；低于该值可视为静止。默认 `0.001`。
- `restSpeedThreshold`：速度阈值（像素/秒）；低于该值可视为静止。默认 `0.001`。
- `delay`：延迟多久后开始（毫秒）。默认 `0`。
- `isInteraction`：是否在 `InteractionManager` 上创建 interaction handle。默认 `true`。
- `useNativeDriver`：为 `true` 时使用原生驱动。必填。

---

### `add()`

```tsx
static add(a: Animated, b: Animated): AnimatedAddition;
```

创建一个由两个动画值相加得到的新动画值。

---

### `subtract()`

```tsx
static subtract(a: Animated, b: Animated): AnimatedSubtraction;
```

创建一个由第一个动画值减去第二个动画值得到的新动画值。

---

### `divide()`

```tsx
static divide(a: Animated, b: Animated): AnimatedDivision;
```

创建一个由第一个动画值除以第二个动画值得到的新动画值。

---

### `multiply()`

```tsx
static multiply(a: Animated, b: Animated): AnimatedMultiplication;
```

创建一个由两个动画值相乘得到的新动画值。

---

### `modulo()`

```tsx
static modulo(a: Animated, modulus: number): AnimatedModulo;
```

创建一个新动画值，其值为给定动画值的（非负）取模结果。

---

### `diffClamp()`

```tsx
static diffClamp(a: Animated, min: number, max: number): AnimatedDiffClamp;
```

创建一个限制在两值之间的新动画值。它使用“与上一次值的差值”来更新，因此即便当前值已经远离边界，只要变化趋势重新朝边界靠近，也会恢复变化（`value = clamp(value + diff, min, max)`）。

此方法常用于滚动场景，例如上滑显示导航栏、下滑隐藏导航栏。

---

### `delay()`

```tsx
static delay(time: number): CompositeAnimation;
```

在给定延迟后启动动画。

---

### `sequence()`

```tsx
static sequence(animations: CompositeAnimation[]): CompositeAnimation;
```

按顺序依次启动一组动画，前一个完成后再启动下一个。若当前动画被停止，后续动画不会启动。

---

### `parallel()`

```tsx
static parallel(
  animations: CompositeAnimation[],
  config?: ParallelConfig
): CompositeAnimation;
```

同时启动一组动画。默认情况下，只要其中一个动画被停止，其他动画也会全部停止。可通过 `stopTogether` 覆盖该行为。

---

### `stagger()`

```tsx
static stagger(
  time: number,
  animations: CompositeAnimation[]
): CompositeAnimation;
```

一组动画按顺序错开启动，但可并行重叠运行，适合做拖尾效果。

---

### `loop()`

```tsx
static loop(
  animation: CompositeAnimation[],
  config?: LoopAnimationConfig
): CompositeAnimation;
```

循环执行给定动画。每次到达终点后会重置并重新开始。若子动画使用 `useNativeDriver: true`，可在不阻塞 JS 线程的情况下循环。

另外，循环动画可能导致基于 `VirtualizedList` 的组件在动画运行期间无法继续渲染更多行。可在子动画配置中设置 `isInteraction: false` 规避。

`config` 可包含：

- `iterations`：循环次数。默认 `-1`（无限循环）。

---

### `event()`

```tsx
static event(
  argMapping: Mapping[],
  config?: EventConfig
): (...args: any[]) => void;
```

接收映射数组，从各参数中提取对应值，并在映射目标上调用 `setValue`。例如：

```tsx
onScroll={Animated.event(
  [{nativeEvent: {contentOffset: {x: this._scrollX}}}],
  {listener: (event: ScrollEvent) => console.log(event)}, // Optional async listener
)}
 ...
onPanResponderMove: Animated.event(
  [
    null, // raw event arg ignored
    {dx: this._panX},
  ], // gestureState arg
  {
    listener: (
      event: GestureResponderEvent,
      gestureState: PanResponderGestureState
    ) => console.log(event, gestureState),
  } // Optional async listener
);
```

`config` 可包含：

- `listener`：可选的异步监听器。
- `useNativeDriver`：为 `true` 时使用原生驱动。必填。

---

### `forkEvent()`

```jsx
static forkEvent(event: AnimatedEvent, listener: Function): AnimatedEvent;
```

高级命令式 API，用于“旁路监听”通过 props 传入的动画事件。它可向现有 `AnimatedEvent` 添加一个新的 JavaScript 监听器。

如果 `animatedEvent` 本身是 JavaScript 监听器，会合并为一个监听器；如果 `animatedEvent` 为 `null/undefined`，则直接使用该 JavaScript 监听器。可行时优先直接使用值。

---

### `unforkEvent()`

```jsx
static unforkEvent(event: AnimatedEvent, listener: Function);
```

---

### `start()`

```tsx
static start(callback?: (result: {finished: boolean}) => void);
```

通过在动画实例上调用 `start()` 启动动画。`start()` 接收完成回调：动画正常结束时调用；或在完成前被 `stop()` 中断时也会调用。

**参数：**

| 名称     | 类型                                    | 必填 | 说明                                                                                                                             |
| -------- | --------------------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------- |
| callback | `(result: {finished: boolean}) => void` | 否   | 动画正常结束后，或动画在完成前被 `stop()` 中断后调用的回调函数。                                                                 |

带回调的启动示例：

```tsx
Animated.timing({}).start(({finished}) => {
  /* completion callback */
});
```

---

### `stop()`

```tsx
static stop();
```

停止任何正在运行的动画。

---

### `reset()`

```tsx
static reset();
```

停止任何正在运行的动画，并将值重置为初始值。

## 属性

### `Value`

用于驱动动画的标准值类。通常在函数组件中使用 `useAnimatedValue(0);` 初始化，在类组件中使用 `new Animated.Value(0);` 初始化。

`Animated.Value` 的完整 API 请见单独页面 [animatedvalue](animatedvalue)。

---

### `ValueXY`

用于驱动 2D 动画（如平移手势）的二维值类。

`Animated.ValueXY` 的完整 API 请见单独页面 [animatedvaluexy](animatedvaluexy)。

---

### `Interpolation`

导出该类型，便于在 Flow 中使用 Interpolation 类型。

---

### `Node`

为方便类型检查而导出。所有动画值都派生自此类。

---

### `createAnimatedComponent`

可将任意 React 组件转换为可动画组件。用于创建 `Animated.View` 等。

---

### `attachNativeEvent`

用于将动画值以命令式方式绑定到某个视图事件上。若可行，优先使用 `Animated.event` + `useNativeDriver: true`。
