---
id: version-0.49-animations
title: 动画
original_id: animations
---

流畅、有意义的动画对于移动应用用户体验来说是非常重要的。现实生活中的物体在开始移动和停下来的时候都具有一定的惯性，我们在界面中也可以使用动画来实现契合物理规律的交互。
React Native提供了两个互补的动画系统：用于全局的布局动画`LayoutAnimation`，和用于创建更精细的交互控制的动画`Animated`。

### Animated

`Animated`库使得开发者可以非常容易地实现各种各样的动画和交互方式，并且具备极高的性能。`Animated`旨在以声明的形式来定义动画的输入与输出，在其中建立一个可配置的变化函数，然后使用简单的`start/stop`方法来控制动画按顺序执行。
`Animated`仅封装了四个可以动画化的组件：`View`、`Text`、`Image`和`ScrollView`，不过你也可以使用`Animated.createAnimatedComponent()`来封装你自己的组件。
下面是一个在加载时带有淡入动画效果的视图：

```javascript
// FadeInView.js
import React, { Component } from 'react';
import {
  Animated,
} from 'react-native';

export default class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),          // 透明度初始值设为0
    };
  }
  componentDidMount() {
    Animated.timing(                            // 随时间变化而执行的动画类型
      this.state.fadeAnim,                      // 动画中的变量值
      {
        toValue: 1,                             // 透明度最终变为1，即完全不透明
      }
    ).start();                                  // 开始执行动画
  }
  render() {
    return (
      <Animated.View                            // 可动画化的视图组件
        style={{
          ...this.props.style,
          opacity: this.state.fadeAnim,          // 将透明度指定为动画变量值
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

```

然后你就可以在组件中像使用`View`那样去使用`FadeInView`了，比如像下面这样：

```javascript
render() {
  return (
    <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
      <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
    </FadeInView>
  )
}
```

![](/img/AnimatedFadeInView.gif)

我们来分析一下这个过程。
在`FadeInView`的构造函数里，我们创建了一个名为`fadeAnim`的`Animated.Value`，并放在`state`中。
而`View`的透明度是和这个值绑定的。 

组件加载时，透明度首先设为0.
Then, an easing animation is started on the `fadeAnim` animated value,
which will update all of its dependent mappings (in this case, just the opacity) on each frame as the value animates to the final value of 1.

This is done in an optimized way that is faster than calling `setState` and re-rendering.  
Because the entire configuration is declarative, we will be able to implement further optimizations that serialize the configuration and runs the animation on a high-priority thread.


### 配置动画

动画拥有非常灵活的配置项。自定义的或预定义的easing函数、延迟、持续时间、衰减系数、Animations are heavily configurable. Custom and predefined easing functions, delays, durations, decay factors, spring constants, and more can all be tweaked depending on the type of animation.

`Animated`提供了多种动画类型，其中最常用的要属[`Animated.timing()`](animated.html#timing)。
It supports animating a value over time using one of various predefined easing functions, or you can use your own.
Easing functions are typically used in animation to convey gradual acceleration and deceleration of objects.

By default, `timing` will use a easeInOut curve that conveys gradual acceleration to full speed and concludes by gradually decelerating to a stop.
You can specify a different easing function by passing a `easing` parameter.
Custom `duration` or even a `delay` before the animation starts is also supported.

For example, if we want to create a 2-second long animation of an object that slightly backs up before moving to its final position:

```javascript
Animated.timing(
  this.state.xPosition,
  {
    toValue: 100,
    easing: Easing.back,
    duration: 2000,
  }                              
).start();  
```

Take a look at the [Configuring animations](animated.html#configuring-animations) section of the `Animated` API reference to learn more about all the config parameters supported by the built-in animations.


### 组合动画

多个动画可以通过`parallel`（同时执行）、`sequence`（顺序执行）、`stagger`和`delay`来组合使用。它们中的每一个都接受一个要执行的动画数组，并且自动在适当的时候调用start/stop。举个例子：

```javascript
Animated.sequence([            // 首先执行decay动画，结束后同时执行spring和twirl动画
  Animated.decay(position, {   // 滑行一段距离后停止
    velocity: {x: gestureState.vx, y: gestureState.vy}, // 根据用户的手势设置速度
    deceleration: 0.997,
  }),
  Animated.parallel([          // 在decay之后并行执行：
    Animated.spring(position, {
      toValue: {x: 0, y: 0}    // 返回到起始点开始
    }),
    Animated.timing(twirl, {   // 同时开始旋转
      toValue: 360,
    }),
  ]),
]).start();                    // 执行这一整套动画序列
```

默认情况下，如果任何一个动画被停止或中断了，组内所有其它的动画也会被停止。Parallel有一个`stopTogether`属性，如果设置为`false`，可以禁用自动停止。

You can find a full list of composition methods in the [Composing animations](animated.html#composing-animations) section of the `Animated` API reference.

### 合成动画值

你可以使用加减乘除以及取余等运算来[把两个动画值合成为一个新的动画值](animated.html#合成动画值)。

There are some cases where an animated value needs to invert another animated value for calculation.
An example is inverting a scale (2x --> 0.5x):

```javascript
const a = Animated.Value(1);
const b = Animated.divide(1, a);

Animated.spring(a, {
  toValue: 2,
}).start();
```

### 插值

`Animated` API还有一个很强大的部分就是`interpolate`插值函数。它可以接受一个输入区间，然后将其映射到另一个的输出区间。下面是一个一个简单的从0-1区间到0-100区间的映射示例：

```javascript
value.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
```

`interpolate`还支持定义多个区间段落，常用来定义静止区间等。举个例子，要让输入在接近-300时取相反值，然后在输入接近-100时到达0，然后在输入接近0时又回到1，接着一直到输入到100的过程中逐步回到0，最后形成一个始终为0的静止区间，对于任何大于100的输入都返回0。具体写法如下：

```javascript
value.interpolate({
  inputRange: [-300, -100, 0, 100, 101],
  outputRange: [300,    0, 1,   0,   0],
});
```

它的最终映射结果如下：

输入  | 输出
------|-------
  -400|    450
  -300|    300
  -200|    150
  -100|      0
   -50|    0.5
     0|      1
    50|    0.5
   100|      0
   101|      0
   200|      0

`interpolate`还支持到字符串的映射，从而可以实现颜色以及带有单位的值的动画变换。例如你可以像下面这样实现一个旋转动画：
 
 ```javascript
 value.interpolate({
   inputRange: [0, 360],
   outputRange: ['0deg', '360deg']
 })
 ```

`interpolation`还支持任意的渐变函数，其中有很多已经在`Easing`类中定义了，包括二次、指数、贝塞尔等曲线以及step、bounce等方法。`interpolation`还支持限制输出区间`outputRange`。你可以通过设置`extrapolate`、`extrapolateLeft`或`extrapolateRight`属性来限制输出区间。默认值是`extend`（允许超出），不过你可以使用`clamp`选项来阻止输出值超过`outputRange`。

### 跟踪动态值

动画中所设的值还可以通过跟踪别的值得到。你只要把toValue设置成另一个动态值而不是一个普通数字就行了。比如我们可以用弹跳动画来实现聊天头像的闪动，又比如通过`timing`设置`duration:0`来实现快速的跟随。他们还可以使用插值来进行组合：

```javascript
Animated.spring(follower, {toValue: leader}).start();
Animated.timing(opacity, {
  toValue: pan.x.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
  }),
}).start();
```

`ValueXY`是一个方便的处理2D交互的办法，譬如旋转或拖拽。它是一个简单的包含了两个`Animated.Value`实例的包装，然后提供了一系列辅助函数，使得`ValueXY`在许多时候可以替代`Value`来使用。比如在上面的代码片段中，`leader`和`follower`可以同时为`valueXY`类型，这样x和y的值都会被跟踪。

### 输入事件

`Animated.event`是Animated API中与输入有关的部分，允许手势或其它事件直接绑定到动态值上。它通过一个结构化的映射语法来完成，使得复杂事件对象中的值可以被正确的解开。第一层是一个数组，允许同时映射多个值，然后数组的每一个元素是一个嵌套的对象。在下面的例子里，你可以发现`scrollX`被映射到了`event.nativeEvent.contentOffset.x`(`event`通常是回调函数的第一个参数)，并且`pan.x`和`pan.y`分别映射到`gestureState.dx`和`gestureState.dy`（`gestureState`是传递给`PanResponder`回调函数的第二个参数）。

```javascript
onScroll={Animated.event(
  [{nativeEvent: {contentOffset: {x: scrollX}}}]   // scrollX = e.nativeEvent.contentOffset.x
)}
onPanResponderMove={Animated.event([
  null,                                          // 忽略原生事件
  {dx: pan.x, dy: pan.y}                         // 从gestureState中解析出dx和dy的值
]);
```

#### 响应当前的动画值

你可能会注意到这里没有一个明显的方法来在动画的过程中读取当前的值——这是出于优化的角度考虑，有些值只有在原生代码运行阶段中才知道。如果你需要在JavaScript中响应当前的值，有两种可能的办法：

* `spring.stopAnimation(callback)`会停止动画并且把最终的值作为参数传递给回调函数`callback`——这在处理手势动画的时候非常有用。
* `spring.addListener(callback)` 会在动画的执行过程中持续异步调用`callback`回调函数，提供一个最近的值作为参数。这在用于触发状态切换的时候非常有用，譬如当用户拖拽一个东西靠近的时候弹出一个新的气泡选项。不过这个状态切换可能并不会十分灵敏，因为它不像许多连续手势操作（如旋转）那样在60fps下运行。

`Animated` is designed to be fully serializable so that animations can be run in a high performance way, independent of the normal JavaScript event loop.
This does influence the API, so keep that in mind when it seems a little trickier to do something compared to a fully synchronous system.
Check out `Animated.Value.addListener` as a way to work around some of these limitations,
but use it sparingly since it might have performance implications in the future.

### 使用原生动画驱动

`Animated`的API是可序列化的（即可转化为字符串表达以便通信或存储）。  
通过启用[原生驱动](http://facebook.github.io/react-native/blog/2017/02/14/using-native-driver-for-animated.html)，我们在启动动画前就把其所有配置信息都发送到原生端，利用原生代码在UI线程执行动画，而不用每一帧都在两端间来回沟通。
如此一来，动画一开始就完全脱离了JS线程，因此此时即便JS线程被卡住，也不会影响到动画了。

在动画中启用原生驱动非常简单。
只需在开始动画之前，在动画配置中加入一行`useNativeDriver: true`，如下所示：

```javascript
Animated.timing(this.state.animatedValue, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true, // <-- 加上这一行
}).start();
```

动画值在不同的驱动方式之间是不能兼容的。因此如果你在某个动画中启用了原生驱动，那么所有和此动画依赖相同动画值的其他动画也必须启用原生驱动。

原生驱动还可以在`Animated.event`中使用。
This is specially useful for animations that follow the scroll position as without the native driver,
the animation will always run a frame behind the gesture due to the async nature of React Native.

```javascript
<Animated.ScrollView // <-- 使用Animated ScrollView wrapper
  scrollEventThrottle={1} // <-- 设为1以确保滚动事件的触发频率足够密集
  onScroll={Animated.event(
    [{ nativeEvent: { contentOffset: { y: this.state.animatedValue } } }],
    { useNativeDriver: true } // <-- 加上这一行
  )}
>
  {content}
</Animated.ScrollView>
```

You can see the native driver in action by running the [RNTester app](https://github.com/facebook/react-native/blob/master/RNTester/),
then loading the Native Animated Example.
You can also take a look at the [source code](https://github.com/facebook/react-native/blob/master/RNTester/js/NativeAnimationsExample.js) to learn how these examples were produced.

#### 注意事项

Not everything you can do with `Animated` is currently supported by the native driver.
The main limitation is that you can only animate non-layout properties:
things like `transform` and `opacity` will work, but flexbox and position properties will not.
When using `Animated.event`, it will only work with direct events and not bubbling events.
This means it does not work with `PanResponder` but does work with things like `ScrollView#onScroll`.

### 示例

The RNTester app has various examples of `Animated` in use:

- [AnimatedGratuitousApp](https://github.com/facebook/react-native/tree/master/Examples/RNTester/js/AnimatedGratuitousApp)
- [NativeAnimationsExample](https://github.com/facebook/react-native/blob/master/Examples/RNTester/js/NativeAnimationsExample.js)

### LayoutAnimation

`LayoutAnimation`允许你在全局范围内`创建`和`更新`动画，这些动画会在下一次渲染或布局周期运行。它常用来更新flexbox布局，因为它可以无需测量或者计算特定属性就能直接产生动画。尤其是当布局变化可能影响到父节点（譬如“查看更多”展开动画既增加父节点的尺寸又会将位于本行之下的所有行向下推动）时，如果不使用`LayoutAnimation`，可能就需要显式声明组件的坐标，才能使得所有受影响的组件能够同步运行动画。

注意尽管`LayoutAnimation`非常强大且有用，但它对动画本身的控制没有`Animated`或者其它动画库那样方便，所以如果你使用`LayoutAnimation`无法实现一个效果，那可能还是要考虑其他的方案。

另外，如果要在**Android**上使用LayoutAnimation，那么目前还需要在`UIManager`中启用：
```javascript
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
```

![](/img/LayoutAnimationExample.gif)

```javascript
import React from 'react';
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default class App extends React.Component {
  state = {
    w: 100,
    h: 100,
  };

  _onPress = () => {
    // Animate the update
    LayoutAnimation.spring();
    this.setState({w: this.state.w + 15, h: this.state.h + 15})
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.box, {width: this.state.w, height: this.state.h}]} />
        <TouchableOpacity onPress={this._onPress}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Press me!</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
```

This example uses a preset value, you can customize the animations as
you need, see [LayoutAnimation.js](https://github.com/facebook/react-native/blob/master/Libraries/LayoutAnimation/LayoutAnimation.js)
for more information.

## 其他要注意的地方

### `requestAnimationFrame`

`requestAnimationFrame`是一个对浏览器标准API的兼容实现，你可能已经熟悉它了。它接受一个函数作为唯一的参数，并且在下一次重绘之前调用此函数。一些基于JavaScript的动画库高度依赖于这一API。通常你不必直接调用它——那些动画库会替你管理好帧的更新。

### `setNativeProps`

正如[直接操作](direct-manipulation.html)文档所说，`setNativeProps`方法可以使我们直接修改基于原生视图的组件的属性，而不需要使用`setState`来重新渲染整个组件树。如果我们要更新的组件有一个非常深的内嵌结构，并且没有使用`shouldComponentUpdate`来优化，那么使用`setNativeProps`就将大有裨益。

如果你发现你的动画丢帧（低于60帧每秒），可以尝试使用`setNativeProps`或者`shouldComponentUpdate`来优化它们。Or you could run the animations on the UI thread rather than
the JavaScript thread [with the useNativeDriver
option](http://facebook.github.io/react-native/blog/2017/02/14/using-native-driver-for-animated.html)。你还可以考虑将部分计算工作放在动画完成之后进行，这时可以使用[InteractionManager](interactionmanager.html)。你还可以使用应用内的开发者菜单中的“FPS Monitor”工具来监控应用的帧率。
