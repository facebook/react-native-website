---
id: version-0.42-animations
title: 动画
original_id: animations
---

流畅、有意义的动画对于移动应用用户体验来说是非常必要的。和React Native的其他部分一样，动画API也还在积极开发中，不过我们已经可以联合使用两个互补的系统：用于全局的布局动画`LayoutAnimation`，和用于创建更精细的交互控制的动画`Animated`。

### Animated

`Animated`库使得开发者可以非常容易地实现各种各样的动画和交互方式，并且具备极高的性能。`Animated`仅关注动画的输入与输出声明，在其中建立一个可配置的变化函数，然后使用简单的`start/stop`方法来控制动画按顺序执行。下面是一个在加载时带有简单的弹跳动画的组件示例：

```jsx
class Playground extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      bounceValue: new Animated.Value(0),
    };
  }
  render(): ReactElement {
    return (
      <Animated.Image                         // 可选的基本组件类型: Image, Text, View
        source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
        style={{
          flex: 1,
          transform: [                        // `transform`是一个有序数组（动画按顺序执行）
            {scale: this.state.bounceValue},  // 将`bounceValue`赋值给 `scale`
          ]
        }}
      />
    );
  }
  componentDidMount() {
    this.state.bounceValue.setValue(1.5);     // 设置一个较大的初始值
    Animated.spring(                          // 可选的基本动画类型: spring, decay, timing
      this.state.bounceValue,                 // 将`bounceValue`值动画化
      {
        toValue: 0.8,                         // 将其值以动画的形式改到一个较小值
        friction: 1,                          // Bouncier spring
      }
    ).start();                                // 开始执行动画
  }
}
```

`bounceValue`在构造函数中初始化为`state`的一部分，然后和图片的缩放比例进行绑定。在动画执行的背后，其数值会被不断的计算并用于设置缩放比例。当组件刚刚挂载的时候，缩放比例被设置到1.5。然后紧跟着在`bounceValue`上执行了一个弹跳动画(spring)，会逐帧刷新数值，并同步更新所有依赖本数值的绑定（在这个例子里，就是图片的缩放比例）。比起调用`setState`然后重新渲染，这一运行过程要快得多。因为整个配置都是声明式的，我们可以实现更进一步的优化，只要序列化好配置，然后我们可以在一个高优先级的线程执行动画。

#### 核心API

大部分你需要的东西都来自`Animated`模块。它包括两个值类型，`Value`用于单个的值，而`ValueXY`用于向量值；还包括三种动画类型，`spring`，`decay`，还有`timing`，以及三种组件类型，`View`，`Text`和`Image`。你可以使用`Animated.createAnimatedComponent`方法来对其它类型的组件创建动画。

这三种动画类型可以用来创建几乎任何你需要的动画曲线，因为它们每一个都可以被自定义：

* `spring`: 基础的单次弹跳物理模型，符合[Origami设计标准](https://facebook.github.io/origami/)
  * `friction`: 摩擦力，默认为7.
  * `tension`: 张力，默认40。
* `decay`: 以一个初始速度开始并且逐渐减慢停止。
  * `velocity`: 起始速度，必填参数。
  * `deceleration`: 速度衰减比例，默认为0.997。
* `timing`: 从时间范围映射到渐变的值。
  * `duration`: 动画持续的时间（单位是毫秒），默认为500。
  * `easing`：一个用于定义曲线的渐变函数。阅读`Easing`模块可以找到许多预定义的函数。iOS默认为`Easing.inOut(Easing.ease)`。
  * `delay`: 在一段时间之后开始动画（单位是毫秒），默认为0。

动画可以通过调用`start`方法来开始。`start`接受一个回调函数，当动画结束的时候会调用此回调函数。如果动画是因为正常播放完成而结束的，回调函数被调用时的参数为`{finished: true}`，但若动画是在结束之前被调用了`stop`而结束（可能是被一个手势或者其它的动画打断），它会收到参数`{finished: false}`。

#### 组合动画

多个动画可以通过`parallel`（同时执行）、`sequence`（顺序执行）、`stagger`和`delay`来组合使用。它们中的每一个都接受一个要执行的动画数组，并且自动在适当的时候调用start/stop。举个例子：

```jsx
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

#### 插值（interpolate）

`Animated` API还有一个很强大的部分就是`interpolate`插值函数。它可以接受一个输入区间，然后将其映射到另一个的输出区间。下面是一个一个简单的从0-1区间到0-100区间的映射示例：

```jsx
value.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
```

`interpolate`还支持定义多个区间段落，常用来定义静止区间等。举个例子，要让输入在接近-300时取相反值，然后在输入接近-100时到达0，然后在输入接近0时又回到1，接着一直到输入到100的过程中逐步回到0，最后形成一个始终为0的静止区间，对于任何大于100的输入都返回0。具体写法如下：

```jsx
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
 
 ```jsx
 value.interpolate({
   inputRange: [0, 360],
   outputRange: ['0deg', '360deg']
 })
 ```

`interpolation`还支持任意的渐变函数，其中有很多已经在`Easing`类中定义了，包括二次、指数、贝塞尔等曲线以及step、bounce等方法。`interpolation`还支持限制输出区间`outputRange`。你可以通过设置`extrapolate`、`extrapolateLeft`或`extrapolateRight`属性来限制输出区间。默认值是`extend`（允许超出），不过你可以使用`clamp`选项来阻止输出值超过`outputRange`。

#### 跟踪动态值

动画中所设的值还可以通过跟踪别的值得到。你只要把toValue设置成另一个动态值而不是一个普通数字就行了。比如我们可以用弹跳动画来实现聊天头像的闪动，又比如通过`timing`设置`duration:0`来实现快速的跟随。他们还可以使用插值来进行组合：

```jsx
Animated.spring(follower, {toValue: leader}).start();
Animated.timing(opacity, {
  toValue: pan.x.interpolate({
    inputRange: [0, 300],
    outputRange: [1, 0],
  }),
}).start();
```

`ValueXY`是一个方便的处理2D交互的办法，譬如旋转或拖拽。它是一个简单的包含了两个`Animated.Value`实例的包装，然后提供了一系列辅助函数，使得`ValueXY`在许多时候可以替代`Value`来使用。比如在上面的代码片段中，`leader`和`follower`可以同时为`valueXY`类型，这样x和y的值都会被跟踪。

#### 输入事件

`Animated.event`是Animated API中与输入有关的部分，允许手势或其它事件直接绑定到动态值上。它通过一个结构化的映射语法来完成，使得复杂事件对象中的值可以被正确的解开。第一层是一个数组，允许同时映射多个值，然后数组的每一个元素是一个嵌套的对象。在下面的例子里，你可以发现`scrollX`被映射到了`event.nativeEvent.contentOffset.x`(`event`通常是回调函数的第一个参数)，并且`pan.x`和`pan.y`分别映射到`gestureState.dx`和`gestureState.dy`（`gestureState`是传递给`PanResponder`回调函数的第二个参数）。

```jsx
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

#### 后续工作

如前面所述，我们计划继续优化Animated，以进一步提升性能。我们还想尝试一些声明式的手势响应和触发动画，譬如垂直或者水平的倾斜操作。

上面的API提供了一个强大的工具来简明、健壮、高效地组织各种各种不同的动画。你可以在[UIExplorer/AnimationExample](https://github.com/facebook/react-native/tree/master/Examples/UIExplorer/AnimatedGratuitousApp)中看到更多的样例代码。不过还有些时候`Animated`并不能支持你想要的效果，下面的章节包含了一些其它的动画系统。

### LayoutAnimation

`LayoutAnimation`允许你在全局范围内`创建`和`更新`动画，这些动画会在下一次渲染或布局周期运行。它常用来更新flexbox布局，因为它可以无需测量或者计算特定属性就能直接产生动画。尤其是当布局变化可能影响到父节点（譬如“查看更多”展开动画既增加父节点的尺寸又会将位于本行之下的所有行向下推动）时，如果不使用`LayoutAnimation`，可能就需要显式声明组件的坐标，才能使得所有受影响的组件能够同步运行动画。

注意尽管`LayoutAnimation`非常强大且有用，但它对动画本身的控制没有`Animated`或者其它动画库那样方便，所以如果你使用`LayoutAnimation`无法实现一个效果，那可能还是要考虑其他的方案。

另外，如果要在**Android**上使用LayoutAnimation，那么目前还需要在`UIManager`中启用：
```jsx
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
```

![](/img/LayoutAnimationExample.gif)

```jsx
var App = React.createClass({
  componentWillMount() {
    // 创建动画
    LayoutAnimation.spring();
  },

  getInitialState() {
    return { w: 100, h: 100 }
  },

  _onPress() {
    // 让视图的尺寸变化以动画形式展现
    LayoutAnimation.spring();
    this.setState({w: this.state.w + 15, h: this.state.h + 15})
  },

  render: function() {
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
});
```
[运行这个例子](https://rnplay.org/apps/uaQrGQ)

上面这个例子使用了一个预设值，不过你也可以自己配置你需要的动画。参见[LayoutAnimation.js](https://github.com/facebook/react-native/blob/master/Libraries/LayoutAnimation/LayoutAnimation.js)。

### requestAnimationFrame

`requestAnimationFrame`是一个对浏览器标准API的兼容实现，你可能已经熟悉它了。它接受一个函数作为唯一的参数，并且在下一次重绘之前调用此函数。一些基于JavaScript的动画库高度依赖于这一API。通常你不必直接调用它——那些动画库会替你管理好帧的更新。

### react-tween-state(不推荐，用[Animated](#animated)来替代)

[react-tween-state](https://github.com/chenglou/react-tween-state)是一个极小的库，正如它名字（tween：补间）表示的含义：它生成一个节点的状态的中间值，从一个**开始**值，结束于一个**到达**值。这意味着它会生成这两者之间的值，然后在每次`requestAnimationFrame`的时候修改状态。

> 在[Wikipedia](https://en.wikipedia.org/wiki/Inbetweening)上对于补间动画(tweening)的定义：
>
> “补间是在两个图像之间生成中间帧的过程，以使得第一个图像能够平滑的变化为第二个图像”。补间帧是指在关键帧之间用于创建过渡假象的图画。”

一个最基础的从一个值运动到另一个值的办法就是线性过渡：只需要将结束值减去开始值，然后除以动画总共需要经历的帧数，再在每一帧加到当前值上，一直到结束值位置。线性过渡有时候看起来怪异且不自然，所以react-tween-state提供了一系列常用的[过渡函数](http://easings.net/)，可以用于使你的动画更加自然。

这个库并未随React Native一起发布——要在你的工程中使用它，则需要先在你的工程目录下执行`npm i react-tween-state --save`来安装。

```jsx
import tweenState from 'react-tween-state';
import reactMixin from 'react-mixin'; // https://github.com/brigand/react-mixin

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { opacity: 1 };
    this._animateOpacity = this._animateOpacity.bind(this);
  }

  _animateOpacity() {
    this.tweenState('opacity', {
      easing: tweenState.easingTypes.easeOutQuint,
      duration: 1000,
      endValue: this.state.opacity === 0.2 ? 1 : 0.2,
    });
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableWithoutFeedback onPress={this._animateOpacity}>
          <View ref={component => this._box = component}
                style={{width: 200, height: 200, backgroundColor: 'red',
                        opacity: this.getTweeningValue('opacity')}} />
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

reactMixin.onClass(App, tweenState.Mixin);
```
[运行这个例子](https://rnplay.org/apps/4FUQ-A)

![](/img/TweenState.gif)

在上面的例子里我们变化的是透明度，但你可能也猜到了，我们能变化任何数值的值。可以参考它的[说明文档](https://github.com/chenglou/react-tween-state)来了解更多信息。

#### Rebound (不推荐 - 使用[Animated](#animated)来替代)

[Rebound.js](https://github.com/facebook/rebound-js)是一个[安卓版Rebound](https://github.com/facebook/rebound)的JavaScript移植版。它在概念上类似react-tween-state：你有一个起始值，然后定义一个结束值，然后Rebound会生成所有中间的值并用于你的动画。Rebound基于弹性物理模型，你不需要提供一个动画的持续时间，它会自动根据弹性系数、助力、当前值和结束值来计算。我们[在React Native内部应用](https://github.com/facebook/react-native/search?utf8=%E2%9C%93&q=rebound)了Rebound，比如`Navigator`和`WarningBox`。

![](/img/ReboundImage.gif)

需要注意的是Rebound动画可以被中断——如果你在按下动画的过程中释放手指，它会从当前状态弹回初始值。

```jsx
var rebound = require('rebound');

var App = React.createClass({
  // 首先我们初始化一个spring动画，并添加监听函数，
  // 这个函数会在spring更新时调用setState
  componentWillMount() {
    // 初始化spring
    this.springSystem = new rebound.SpringSystem();
    this._scrollSpring = this.springSystem.createSpring();
    var springConfig = this._scrollSpring.getSpringConfig();
    springConfig.tension = 230;
    springConfig.friction = 10;

    this._scrollSpring.addListener({
      onSpringUpdate: () => {
        this.setState({scale: this._scrollSpring.getCurrentValue()});
      },
    });

    // 将spring的初始值设为1
    this._scrollSpring.setCurrentValue(1);
  },

  _onPressIn() {
    this._scrollSpring.setEndValue(0.5);
  },

  _onPressOut() {
    this._scrollSpring.setEndValue(1);
  },

  render: function() {
    var imageStyle = {
      width: 250,
      height: 200,
      transform: [{scaleX: this.state.scale}, {scaleY: this.state.scale}],
    };

    var imageUri = "https://facebook.github.io/react-native/img/ReboundExample.png";

    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPressIn={this._onPressIn}
                                  onPressOut={this._onPressOut}>
          <Image source={{uri: imageUri}} style={imageStyle} />
        </TouchableWithoutFeedback>
      </View>
    );
  }
});
```

你还可以为弹跳值启用边界，这样它们不会超出，而是会缓缓接近最终值。在上面的例子里，我们可以添加`this._scrollSpring.setOvershootClampingEnabled(true)`来启用边界。参见下面的gif动画来看一个启用了边界的效果：

![](/img/Rebound.gif) 截图来自
[react-native-scrollable-tab-view](https://github.com/brentvatne/react-native-scrollable-tab-view)。

你可以在[这里](https://rnplay.org/apps/qHU_5w)看到一个类似的例子。

#### 关于setNativeProps

正如[直接操作](direct-manipulation.html)文档所说，`setNativeProps`方法可以使我们直接修改基于原生视图的组件的属性，而不需要使用`setState`来重新渲染整个组件树。

我们可以把这个用在Rebound样例中来更新缩放比例——如果我们要更新的组件有一个非常深的内嵌结构，并且没有使用`shouldComponentUpdate`来优化，那么使用`setNativeProps`就将大有裨益。

```jsx
// 回到上面示例的那个组件中，找到componentWillMount方法，
// 然后将scrollSpring的监听函数替换为如下代码:
this._scrollSpring.addListener({
  onSpringUpdate: () => {
    if (!this._photo) { return }
    var v = this._scrollSpring.getCurrentValue();
    var newProps = {style: {transform: [{scaleX: v}, {scaleY: v}]}};
    this._photo.setNativeProps(newProps);
  },
});

// 最后，我们修改render方法，不再通过style来传入transform（避免
// 重新渲染时产生冲突）；然后给图片加上ref引用。 
render: function() {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPressIn={this._onPressIn} onPressOut={this._onPressOut}>
        <Image ref={component => this._photo = component}
               source={{uri: "https://facebook.github.io/react-native/img/ReboundExample.png"}}
               style={{width: 250, height: 200}} />
      </TouchableWithoutFeedback>
    </View>
  );
}
```
[运行这个例子](https://rnplay.org/apps/fUqjAg)

不过你没办法把`setNativeProps`和react-tween-state结合使用，因为更新的补间值会自动被库设置到state上——Rebound则不同，它通过`onSprintUpdate`函数在每一帧中给我们提供一个更新后的值。

如果你发现你的动画丢帧（低于60帧每秒），可以尝试使用`setNativeProps`或者`shouldComponentUpdate`来优化它们。你还可能需要将部分计算工作放在动画完成之后进行，这时可以使用[InteractionManager](/react-native/docs/interactionmanager.html)。你还可以使用应用内的开发者菜单中的“FPS Monitor”工具来监控应用的帧率。

### 导航器场景切换

正如文档[导航器对比](navigator-comparison.html#content)所说，`Navigator`使用JavaScript实现，而`NavigatoIOS`则是一个对于`UINavigationController`提供的原生功能的包装。所以这些场景切换动画仅仅对`Navigator`有效。为了在Navigator中重新创建`UINavigationController`所提供的动画并且使之可以被自定义，React Native导出了一个[NavigatorSceneConfigs](https://github.com/facebook/react-native/blob/master/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js)API。

```jsx
import { Dimensions } from 'react-native';
var SCREEN_WIDTH = Dimensions.get('window').width;
var BaseConfig = Navigator.SceneConfigs.FloatFromRight;

var CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // 用户中断返回手势时，迅速弹回  
  snapVelocity: 8,

  // 如下设置可以使我们在屏幕的任何地方拖动它
  edgeHitWidth: SCREEN_WIDTH,
});

var CustomSceneConfig = Object.assign({}, BaseConfig, {
  // 如下设置使过场动画看起来很快
  springTension: 100,
  springFriction: 1,

  // 使用上面我们自定义的手势
  gestures: {
    pop: CustomLeftToRightGesture,
  }
});
```
[运行这个例子](https://rnplay.org/apps/HPy6UA)

要了解更多有关自定义场景切换的信息，你可以[阅读相应的源码](https://github.com/facebook/react-native/blob/master/Libraries/CustomComponents/Navigator/NavigatorSceneConfigs.js)。
