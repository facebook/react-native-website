---
id: version-0.44-animated
title: Animated
original_id: animated
---

The `Animated` library is designed to make animations fluid, powerful, and easy to build and maintain. `Animated` focuses on declarative relationships between inputs and outputs, with configurable transforms in between, and simple `start/stop` methods to control time-based animation execution.

The simplest workflow for creating an animation is to to create an `Animated.Value`, hook it up to one or more style attributes of an animated component, and then drive updates via animations using `Animated.timing()`:

```javascript
Animated.timing(                            // Animate value over time
  this.state.fadeAnim,                      // The value to drive
  {
    toValue: 1,                             // Animate to final value of 1
  }
).start();                                  // Start the animation
```

你可以在[动画](animations.html)文档中看到更多实际的例子。

## 概览

`Animated`提供了两种类型的值：  

- `Animated.Value()`用于单个值 
- `Animated.ValueXY()`用于矢量值 

`Animated.Value`可以绑定到样式或是其他属性上，也可以进行插值运算。单个`Animated.Value`可以用在任意多个属性上。

### 配置动画

`Animated`提供了三种动画类型。每种动画类型都提供了特定的函数曲线，用于控制动画值从初始值变化到最终值的变化过程：

- `Animated.decay()`以指定的初始速度开始变化，然后变化速度越来越慢直至停下。 starts with an initial velocity and gradually slows to a stop.
- `Animated.spring()` provides a simple spring physics model.
- `Animated.timing()` animates a value over time using [easing函数](easing.html).

大多数情况下你应该使用`timing()`。By default, it uses a symmetric easeInOut curve that conveys the gradual acceleration of an object to full speed and concludes by gradually decelerating to a stop.

### 使用动画 

Animations are started by calling `start()` on your animation. `start()` takes a completion callback that will be called when the animation is done. If the animation finished running normally, the completion callback will be invoked with `{finished: true}`. If the animation is done because `stop()` was called on it before it could finish (e.g. because it was interrupted by a gesture or another animation), then it will receive `{finished: false}`.

### 使用原生动画驱动

By using the native driver, we send everything about the animation to native before starting the animation, allowing native code to perform the animation on the UI thread without having to go through the bridge on every frame. Once the animation has started, the JS thread can be blocked without affecting the animation.

You can use the native driver by specifying `useNativeDriver: true` in your animation configuration. 你可以在[动画文档](animations.html#使用原生动画驱动) 中看到更详细的解释。

### 自定义动画组件 

组件必须经过特殊处理才能用于动画。所谓的特殊处理主要是指把动画值绑定到属性上，并且在一帧帧执行动画时避免react重新渲染和重新调和的开销。此外还得在组件卸载时做一些清理工作，使得这些组件在使用时是安全的。

- `createAnimatedComponent()`方法正是用来处理组件，使其可以用于动画。

`Animated`中默认导出了以下这些可以直接使用的动画组件，当然它们都是通过使用上面这个方法进行了封装：

- `Animated.Image`
- `Animated.ScrollView`
- `Animated.Text`
- `Animated.View`

### 组合动画 

Animations can also be combined in complex ways using composition functions:

- `Animated.delay()` starts an animation after a given delay.
- `Animated.parallel()` starts a number of animations at the same time.
- `Animated.sequence()` starts the animations in order, waiting for each to complete before starting the next.
- `Animated.stagger()` starts animations in order and in parallel, but with successive delays.

Animations can also be chained together simply by setting the `toValue` of one animation to be another `Animated.Value`. See [跟踪动态值](animations.html#跟踪动态值) values in the Animations guide.

By default, if one animation is stopped or interrupted, then all other animations in the group are also stopped.

### 合成动画值 

你可以使用加减乘除以及取余等运算来把两个动画值合成为一个新的动画值。

- `Animated.add()`
- `Animated.divide()`
- `Animated.modulo()`
- `Animated.multiply()`

### 插值 

The `interpolate()` function allows input ranges to map to different output ranges. By default, it will extrapolate the curve beyond the ranges given, but you can also have it clamp the output value. It uses lineal interpolation by default but also supports easing functions.

- `interpolate()`

你可以在[动画](animations.html#插值)文档中了解到更多。

### 处理手势和其他事件 

Gestures, like panning or scrolling, and other events can map directly to animated values using `Animated.event()`. This is done with a structured map syntax so that values can be extracted from complex event objects. The first level is an array to allow mapping across multiple args, and that array contains nested objects.

- `Animated.event()`

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

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="decay"></a><span class="propType">static </span>decay<span class="propType">(value: AnimatedValue | AnimatedValueXY, config: DecayAnimationConfig)</span> <a class="hash-link" href="#decay">#</a></h4>
		<div>
			<p>推动一个值以一个初始的速度和一个衰减系数逐渐变为0。</p>
			<p>Config参数有以下这些属性：</p>
			<ul>
				<li><code>velocity</code>: 初始速度。必填。</li>
				<li><code>deceleration</code>: 衰减系数。默认值0.997。</li>
				<li><code>useNativeDriver</code>: 使用原生动画驱动。默认不启用(false)。</li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="timing"></a><span class="propType">static </span>timing<span class="propType">(value: AnimatedValue | AnimatedValueXY, config: TimingAnimationConfig)</span> <a class="hash-link" href="#timing">#</a></h4>
		<div>
			<p>推动一个值按照一个过渡曲线而随时间变化。<code>Easing</code>模块定义了一大堆曲线，你也可以使用你自己的函数。</p>
			<p>Config参数有以下这些属性：</p>
			<ul>
				<li><code>duration</code>: 动画的持续时间（毫秒）。默认值为500.</li>
				<li><code>easing</code>: Easing function to define curve。默认值为<code>Easing.inOut(Easing.ease)</code>.</li>
				<li><code>delay</code>: 开始动画前的延迟时间（毫秒）。默认为0.</li>
				<li><code>useNativeDriver</code>: 使用原生动画驱动。默认不启用(false)。</li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="spring"></a><span class="propType">static </span>spring<span class="propType">(value: AnimatedValue | AnimatedValueXY, config: SpringAnimationConfig)</span> <a class="hash-link" href="#spring">#</a></h4>
		<div>
			<p>产生一个基于Rebound和Origami实现的Spring动画。它会在<code>toValue</code>值更新的同时跟踪当前的速度状态，以确保动画连贯。可以链式调用。</p>
			<p>Config参数有以下这些属性（注意你不能同时定义bounciness/speed和 tension/friction这两组，只能指定其中一组）：</p>
			<ul>
				<li><code>friction</code>: Controls "bounciness"/overshoot.  Default 7.</li>
				<li><code>tension</code>: Controls speed.  Default 40.</li>
				<li><code>speed</code>: Controls speed of the animation. Default 12.</li>
				<li><code>bounciness</code>: Controls bounciness. Default 8.</li>
				<li><code>useNativeDriver</code>: 使用原生动画驱动。默认不启用(false)。</li>
			</ul>
		</div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="add"></a><span class="propType">static </span>add<span class="propType">(a: Animated, b: Animated)</span> <a class="hash-link" href="#add">#</a></h4>
		<div>
		<p>将两个动画值相加计算，得出一个新的动画值。</p>
		</div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="divide"></a><span class="propType">static </span>divide<span class="propType">(a: Animated, b: Animated)</span> <a class="hash-link" href="#divide">#</a></h4>
		<div>
		<p>将两个动画值相除计算，得出一个新的动画值。</p>
		</div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="multiply"></a><span class="propType">static </span>multiply<span class="propType">(a: Animated, b: Animated)</span> <a class="hash-link" href="#multiply">#</a></h4>
		<div>
		<p>将两个动画值相乘计算，得出一个新的动画值。</p>
		</div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="modulo"></a><span class="propType">static </span>modulo<span class="propType">(a: Animated, b: Animated)</span> <a class="hash-link" href="#modulo">#</a></h4>
		<div>
		<p>将两个动画值做取模（取余数）计算，得出一个新的动画值。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="methodTitle"><a class="anchor" name="diffclamp"></a><span class="methodType">static </span>diffClamp<span class="methodType">(a, min, max)</span> <a class="hash-link" href="#diffclamp">#</a></h4>
		<div>
		<p>Create a new Animated value that is limited between 2 values. It uses the difference between the last value so even if the value is far from the bounds it will start changing when the value starts getting closer again. (<code>value = clamp(value + diff, min, max)</code>).</p>
		<p>This is useful with scroll events, for example, to show the navbar when
		scrolling up and to hide it when scrolling down.</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="delay"></a><span class="propType">static </span>delay<span class="propType">(time: number)</span> <a class="hash-link" href="#delay">#</a></h4>
		<div>
			<p>在指定的延迟之后开始动画。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="sequence"></a><span class="propType">static </span>sequence<span class="propType">(animations: Array&lt;CompositeAnimation&gt;)</span> <a class="hash-link" href="#sequence">#</a></h4>
		<div>
			<p>按顺序执行一个动画数组里的动画，等待一个完成后再执行下一个。如果当前的动画被中止，后面的动画则不会继续执行。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="parallel"></a><span class="propType">static </span>parallel<span class="propType">(animations: Array&lt;CompositeAnimation&gt;, config?: ParallelConfig)</span> <a class="hash-link" href="#parallel">#</a></h4>
		<div>
			<p>同时开始一个动画数组里的全部动画。默认情况下，如果有任何一个动画停止了，其余的也会被停止。你可以通过<code>stopTogether</code>选项来改变这个效果。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="stagger"></a><span class="propType">static </span>stagger<span class="propType">(time: number, animations: Array&lt;CompositeAnimation&gt;)</span> <a class="hash-link" href="#stagger">#</a></h4>
		<div>
			<p>一个动画数组，里面的动画有可能会同时执行（重叠），不过会以指定的延迟来开始。用来制作拖尾效果非常合适。</p>
		</div>
	</div>
	<div class="prop">
	<h4 class="methodTitle"><a class="anchor" name="loop"></a><span class="methodType">static </span>loop<span class="methodType">(animation)</span> <a class="hash-link" href="#loop">#</a></h4>
		<div><p>Loops a given animation continuously, so that each time it reaches the end, it resets and begins again from the start. Can specify number of
		times to loop using the key 'iterations' in the config. Will loop without
		blocking the UI thread if the child animation is set to 'useNativeDriver'.</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="event"></a><span class="propType">static </span>event<span class="propType">(argMapping: Array&lt;Mapping&gt;, config?: EventConfig)</span> <a class="hash-link" href="#event">#</a></h4>
		<div>
			<p>接受一个映射的数组，对应的解开每个值，然后调用所有对应的输出的<code>setValue</code>方法。例如：</p>
			<pre><code class="lang-javascript"> onScroll={<span class="hljs-keyword">this</span>.AnimatedEvent(
   [{nativeEvent: {contentOffset: {x: <span class="hljs-keyword">this</span>._scrollX}}}]
   {listener},          <span class="hljs-comment">// 可选的异步监听函数</span>
 )
 ...
 onPanResponderMove: <span class="hljs-keyword">this</span>.AnimatedEvent([
   <span class="hljs-literal">null</span>,                <span class="hljs-comment">// 忽略原始事件</span>
   {dx: <span class="hljs-keyword">this</span>._panX},    <span class="hljs-comment">// 手势状态参数</span>
 ]),
</code></pre>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="createanimatedcomponent"></a><span class="propType">static </span>createAnimatedComponent<span class="propType">(Component: any)</span> <a class="hash-link" href="#createanimatedcomponent">#</a></h4>
		<div>
			<p>使得任何一个React组件支持动画。用它来创建<code>Animated.View</code>等等。</p>
		</div>
	</div>
	<div class="prop"><h4 class="methodTitle"><a class="anchor" name="attachnativeevent"></a><span class="methodType">static </span>attachNativeEvent<span class="methodType">(viewRef, eventName, argMapping)</span> <a class="hash-link" href="#attachnativeevent">#</a></h4>
		<div><p>Imperative API to attach an animated value to an event on a view. Prefer using
	<code>Animated.event</code> with <code>useNativeDrive: true</code> if possible.</p></div>
	</div>
	<div class="prop"><h4 class="methodTitle"><a class="anchor" name="forkevent"></a><span class="methodType">static </span>forkEvent<span class="methodType">(event, listener)</span> <a class="hash-link" href="#forkevent">#</a></h4>
		<div><p>Advanced imperative API for snooping on animated events that are passed in through props. Use
		values directly where possible.</p>
		</div>
	</div>
	<div class="prop"><h4 class="methodTitle"><a class="anchor" name="unforkevent"></a><span class="methodType">static </span>unforkEvent<span class="methodType">(event, listener)</span> <a class="hash-link" href="#unforkevent">#</a></h4></div>
	</div>

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="value"></a>Value<span class="propType">: AnimatedValue</span> <a class="hash-link" href="#value">#</a></h4>
		<div>
			<p>表示一个数值的类，用于驱动动画。通常用<code>new Animated.Value(0);</code>来初始化。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="valuexy"></a>ValueXY<span class="propType">: AnimatedValueXY</span> <a class="hash-link" href="#valuexy">#</a></h4>
		<div>
			<p>表示一个2D值的类，用来驱动2D动画，例如拖动操作等。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="interpolation"></a>Interpolation<span class="propType">: AnimatedInterpolation</span> <a class="hash-link" href="#interpolation">#</a></h4>
		<div>
		<p>exported to use the Interpolation type in flow</p><p>See also <a href="animated.html#animatedinterpolation" target="_blank"><code>AnimatedInterpolation</code></a>.</p>
		</div>
	</div>
</div>

## class AnimatedValue

用于驱动动画的标准值。一个`Animated.Value`可以用一种同步的方式驱动多个属性，但同时只能被一个行为所驱动。启用一个新的行为（譬如开始一个新的动画，或者运行`setValue`）会停止任何之前的动作。

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="constructor"></a>constructor<span class="propType">(value: number)</span> <a class="hash-link" href="#constructor">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="setvalue"></a>setValue<span class="propType">(value: number)</span> <a class="hash-link" href="#setvalue">#</a></h4>
		<div>
			<p>直接设置它的值。这个会停止任何正在进行的动画，然后更新所有绑定的属性。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="setoffset"></a>setOffset<span class="propType">(offset: number)</span> <a class="hash-link" href="#setoffset">#</a></h4>
		<div>
			<p>设置一个相对值，不论接下来的值是由<code>setValue</code>、一个动画，还是<code>Animated.event</code>产生的，都会加上这个值。常用来在拖动操作一开始的时候用来记录一个修正值（譬如当前手指位置和View位置）。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="flattenoffset"></a>flattenOffset<span class="propType">()</span> <a class="hash-link" href="#flattenoffset">#</a></h4>
		<div>
			<p>把当前的相对值合并到值里，并且将相对值设为0。最终输出的值不会变化。常在拖动操作结束后调用。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="methodTitle"><a class="anchor" name="extractoffset"></a>extractOffset<span class="methodType">()</span> <a class="hash-link" href="#extractoffset">#</a></h4>
		<div>
		<p>Sets the offset value to the base value, and resets the base value to zero. The final output of the value is unchanged.</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="addlistener"></a>addListener<span class="propType">(callback: ValueListenerCallback)</span> <a class="hash-link" href="#addlistener">#</a></h4>
		<div>
			<p>添加一个异步监听函数，这样你就可以监听动画值的变更。这有时候很有用，因为你没办法同步的读取动画的当前值，因为有时候动画会在原生层次运行。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="removelistener"></a>removeListener<span class="propType">(id: string)</span> <a class="hash-link" href="#removelistener">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="removealllisteners"></a>removeAllListeners<span class="propType">()</span> <a class="hash-link" href="#removealllisteners">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="stopanimation"></a>stopAnimation<span class="propType">(callback?: ?(value: number) =&gt; void)</span> <a class="hash-link" href="#stopanimation">#</a></h4>
		<div>
			<p>停止任何正在运行的动画或跟踪值。<code>callback</code>会被调用，参数是动画结束后的最终值，这个值可能会用于同步更新状态与动画位置。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="methodTitle"><a class="anchor" name="resetanimation"></a>resetAnimation<span class="methodType">(callback?)</span> <a class="hash-link" href="#resetanimation">#</a></h4>
		<div><p>Stops any animation and resets the value to its original</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="interpolate"></a>interpolate<span class="propType">(config: InterpolationConfigType)</span> <a class="hash-link" href="#interpolate">#</a></h4>
		<div>
			<p>在更新属性之前对值进行插值。譬如：把0-1映射到0-10。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="animate"></a>animate<span class="propType">(animation: Animation, callback: EndCallback)</span> <a class="hash-link" href="#animate">#</a></h4>
		<div>
			<p>一般仅供内部使用。不过有可能一个自定义的动画类会用到此方法。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="stoptracking"></a>stopTracking<span class="propType">()</span> <a class="hash-link" href="#stoptracking">#</a></h4>
		<div>
			<p>仅供内部使用。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="track"></a>track<span class="propType">(tracking: Animated)</span> <a class="hash-link" href="#track">#</a></h4>
		<div>
			<p>仅供内部使用。</p>
		</div>
	</div>
</div>

## class AnimatedValueXY

用来驱动2D动画的2D值，譬如滑动操作等。API和普通的`Animated.Value`几乎一样，只不过是个复合结构。它实际上包含两个普通的`Animated.Value`。

例子：

```javascript
class DraggableView extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       pan: new Animated.ValueXY(), // inits to zero
     };
     this.state.panResponder = PanResponder.create({
       onStartShouldSetPanResponder: () => true,
       onPanResponderMove: Animated.event([null, {
         dx: this.state.pan.x, // x,y are Animated.Value
         dy: this.state.pan.y,
       }]),
       onPanResponderRelease: () => {
         Animated.spring(
           this.state.pan,         // Auto-multiplexed
           {toValue: {x: 0, y: 0}} // Back to zero
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

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="constructor"></a>constructor<span class="propType">(valueIn?: ?{x: number | AnimatedValue; y: number | AnimatedValue})</span> <a class="hash-link" href="#constructor">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="setvalue"></a>setValue<span class="propType">(value: {x: number; y: number})</span> <a class="hash-link" href="#setvalue">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="setoffset"></a>setOffset<span class="propType">(offset: {x: number; y: number})</span> <a class="hash-link" href="#setoffset">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="flattenoffset"></a>flattenOffset<span class="propType">()</span> <a class="hash-link" href="#flattenoffset">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="stopanimation"></a>stopAnimation<span class="propType">(callback?: ?() =&gt; number)</span> <a class="hash-link" href="#stopanimation">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="addlistener"></a>addListener<span class="propType">(callback: ValueXYListenerCallback)</span> <a class="hash-link" href="#addlistener">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="removelistener"></a>removeListener<span class="propType">(id: string)</span> <a class="hash-link" href="#removelistener">#</a></h4>

	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getlayout"></a>getLayout<span class="propType">()</span> <a class="hash-link" href="#getlayout">#</a></h4>
		<div>
			<p>将一个<code>{x, y}</code>组合转换为<code>{left, top}</code>以用于样式。例如：</p>
			<pre><code class="lang-javascript"> style={<span class="hljs-keyword">this</span>.state.anim.getLayout()}
</code></pre>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="gettranslatetransform"></a>getTranslateTransform<span class="propType">()</span> <a class="hash-link" href="#gettranslatetransform">#</a></h4>
		<div>
			<p>将一个<code>{x, y}</code> 组合转换为一个可用的位移变换(translation transform)，例如：</p>
			<pre><code class="lang-javascript"> style={{
   transform: <span class="hljs-keyword">this</span>.state.anim.getTranslateTransform()
 }}
</code></pre>
		</div>
	</div>
</div>


## class AnimatedInterpolation

### 方法

<div class="props">
	<div class="prop"><h4 class="methodTitle"><a class="anchor" name="constructor"></a>constructor<span class="methodType">(parent, config)</span> <a class="hash-link" href="#constructor">#</a></h4>
	</div>
	<div class="prop"><h4 class="methodTitle"><a class="anchor" name="interpolate"></a>interpolate<span class="methodType">(config)</span> <a class="hash-link" href="#interpolate">#</a></h4>
	</div>
</div>