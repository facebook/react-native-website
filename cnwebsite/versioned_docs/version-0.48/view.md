---
id: version-0.48-view
title: View
original_id: view
---

作为创建UI时最基础的组件，`View`是一个支持Flexbox布局、样式、一些触摸处理、和一些无障碍功能的容器，并且它可以放到其它的视图里，也可以有任意多个任意类型的子视图。不论在什么平台上，`View`都会直接对应一个平台的原生视图，无论它是`UIView`、`<div>`还是`android.view.View`。下面的例子创建了一个`View`，包含了两个有颜色的方块和一个自定义的组件，并且设置了一个内边距：

```javascript
<View style={{flexDirection: 'row', height: 100, padding: 20}}>
  <View style={{backgroundColor: 'blue', flex: 0.3}} />
  <View style={{backgroundColor: 'red', flex: 0.5}} />
  <MyCustomComponent {...customProps} />
</View>
```

`View`的设计初衷是和`StyleSheet`搭配使用，这样可以使代码更清晰并且获得更高的性能。尽管内联样式也同样可以使用。

### 截图
![](img/components/view.png)

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="accessibilitylabel"></a>accessibilityLabel <span class="propType">string</span> <a class="hash-link" href="#accessibilitylabel">#</a></h4>
		<div>
			<p>设置当用户与此元素交互时，“读屏器”（对视力障碍人士的辅助功能）阅读的文字。默认情况下，这个文字会通过遍历所有的子元素并累加所有的文本标签来构建。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="accessible"></a>accessible <span class="propType">bool</span> <a class="hash-link" href="#accessible">#</a></h4>
		<div>
			<p>当此属性为true时，表示此视图时一个启用了无障碍功能的元素。默认情况下，所有可触摸操作的元素都是无障碍功能元素。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onaccessibilitytap"></a>onAccessibilityTap <span class="propType">function</span> <a class="hash-link" href="#onaccessibilitytap">#</a></h4>
		<div>
			<p>当<code>accessible</code>为true时，如果用户对一个已选中的无障碍元素做了一个双击手势时，系统会调用此函数。（译注：此事件是针对残障人士，并非是一个普通的点击事件。如果要为View添加普通点击事件，<strong>请直接使用Touchable系列组件替代View，然后添加onPress函数</strong>）。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onlayout"></a>onLayout <span class="propType">function</span> <a class="hash-link" href="#onlayout">#</a></h4>
		<div>
			<p>当组件挂载或者布局变化的时候调用，参数为：</p>
			<p><code>{nativeEvent: { layout: {x, y, width, height}}}</code></p>
			<p>这个事件会在布局计算完成后立即调用一次，不过收到此事件时新的布局可能还没有在屏幕上呈现，尤其是一个布局动画正在进行中的时候。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onmagictap"></a>onMagicTap <span class="propType">function</span> <a class="hash-link" href="#onmagictap">#</a></h4>
		<div>
			<p>当<code>accessible</code>为true时，如果用户做了一个双指轻触(Magic tap)手势，系统会调用此函数。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onmoveshouldsetresponder"></a>onMoveShouldSetResponder <span class="propType">function</span> <a class="hash-link" href="#onmoveshouldsetresponder">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onmoveshouldsetrespondercapture"></a>onMoveShouldSetResponderCapture <span class="propType">function</span> <a class="hash-link" href="#onmoveshouldsetrespondercapture">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onrespondergrant"></a>onResponderGrant <span class="propType">function</span> <a class="hash-link" href="#onrespondergrant">#</a></h4>
		<div>
			<p>对于大部分的触摸处理，你只需要用<code>TouchableHighlight</code>或<code>TouchableOpacity</code>包装你的组件。阅读<code>Touchable.js</code>、<code>ScrollResponder.js</code>和<code>ResponderEventPlugin.js</code>来了解更多信息。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onrespondermove"></a>onResponderMove <span class="propType">function</span> <a class="hash-link" href="#onrespondermove">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onresponderreject"></a>onResponderReject <span class="propType">function</span> <a class="hash-link" href="#onresponderreject">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onresponderrelease"></a>onResponderRelease <span class="propType">function</span> <a class="hash-link" href="#onresponderrelease">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onresponderterminate"></a>onResponderTerminate <span class="propType">function</span> <a class="hash-link" href="#onresponderterminate">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onresponderterminationrequest"></a>onResponderTerminationRequest <span class="propType">function</span> <a class="hash-link" href="#onresponderterminationrequest">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onstartshouldsetresponder"></a>onStartShouldSetResponder <span class="propType">function</span> <a class="hash-link" href="#onstartshouldsetresponder">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onstartshouldsetrespondercapture"></a>onStartShouldSetResponderCapture <span class="propType">function</span> <a class="hash-link" href="#onstartshouldsetrespondercapture">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="pointerevents"></a>pointerEvents <span class="propType">enum('box-none', 'none', 'box-only', 'auto')</span> <a class="hash-link" href="#pointerevents">#</a></h4>
		<div>
			<p>用于控制当前视图是否可以作为触控事件的目标。</p>
			<ul>
				<li><code>auto</code>：视图可以作为触控事件的目标。</li>
				<li><code>none</code>：视图不能作为触控事件的目标。</li>
				<li><code>box-none</code>：视图自身不能作为触控事件的目标，但其子视图可以。类似于你在<code>CSS</code> 中这样设置:
			<pre>
<code class="lang-css"><span class="hljs-class">.box-none</span> <span class="hljs-rules">{
  <span class="hljs-rule"><span class="hljs-attribute">pointer-events</span>:<span class="hljs-value"> none</span></span>; 
}</span> 
<span class="hljs-class">.box-none</span> * <span class="hljs-rules">{
  <span class="hljs-rule"><span class="hljs-attribute">pointer-events</span>:<span class="hljs-value"> all</span></span>; 
}</span>
</code></pre>
				</li>
				<li><code>box-only</code>：视图自身可以作为触控事件的目标，但其子视图不能。类似于你在<code>CSS</code> 中这样设置:
			<pre><code class="lang-css">
<span class="hljs-class">.box-none</span> <span class="hljs-rules">{
  <span class="hljs-rule"><span class="hljs-attribute">pointer-events</span>:<span class="hljs-value"> all</span></span>; 
}</span> 
<span class="hljs-class">.box-none</span> * <span class="hljs-rules">{
  <span class="hljs-rule"><span class="hljs-attribute">pointer-events</span>:<span class="hljs-value"> none</span></span>; 
}</span>
</code></pre>
				</li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="removeclippedsubviews"></a>removeClippedSubviews <span class="propType">bool</span> <a class="hash-link" href="#removeclippedsubviews">#</a></h4>
		<div>
			<p>这是一个特殊的性能相关的属性，由RCTView导出。在制作滑动控件时，如果控件有很多不在屏幕内的子视图，会非常有用。</p>
			<p>要让此属性生效，首先要求视图有很多超出范围的子视图，并且子视图和容器视图（或它的某个祖先视图）都应该有样式<code>overflow: hidden</code>。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="style"></a>style <span class="propType">style</span> <a class="hash-link" href="#style">#</a></h4><div class="compactProps">
		<div class="prop">
			<h6 class="propTitle"><a href="layout-with-flexbox.html">Flexbox...</a></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle"><a href="shadow-props.html">ShadowProp#style...</a></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle"><a href="transforms.html#proptypes">Transforms...</a></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">backfaceVisibility <span class="propType">enum('visible', 'hidden')</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">backgroundColor <span class="propType">string</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderColor <span class="propType">string</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderTopColor <span class="propType">string</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderRightColor <span class="propType">string</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderBottomColor <span class="propType">string</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderLeftColor <span class="propType">string</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderRadius <span class="propType">number</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderTopLeftRadius <span class="propType">number</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderTopRightRadius <span class="propType">number</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderBottomLeftRadius <span class="propType">number</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderBottomRightRadius <span class="propType">number</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderStyle <span class="propType">enum('solid', 'dotted', 'dashed')</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderWidth <span class="propType">number</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderTopWidth <span class="propType">number</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderRightWidth <span class="propType">number</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderBottomWidth <span class="propType">number</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">borderLeftWidth <span class="propType">number</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">opacity <span class="propType">number</span></h6>
		</div>
		<div class="prop">
			<h6 class="propTitle">overflow <span class="propType">enum('visible', 'hidden')</span></h6>
		</div>
		<div class="prop">
		<h6 class="propTitle">
		<span class="platform">android</span>
		elevation <span class="propType">number</span> 		<div>
		<p>(限Android)使用Android原生的
<a href="https://developer.android.com/training/material/shadows-clipping.html#Elevation" target="_blank">elevation API</a>来设置视图的高度（elevation）。这样可以为视图添加一个投影，并且会影响视图层叠的顺序。此属性仅支持Android5.0及以上版本。
</p>
		</div>
		</h6>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="testid"></a>testID <span class="propType">string</span> <a class="hash-link" href="#testid">#</a></h4>
		<div>
			<p>用来在端到端测试中定位这个视图。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="accessibilitycomponenttype"></a><span class="platform">android</span>accessibilityComponentType <span class="propType">AccessibilityComponentType</span> <a class="hash-link" href="#accessibilitycomponenttype">#</a></h4>
		<div>
			<p>使无障碍服务对这个UI组件与原生组件一致处理。仅对Android平台有效。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="accessibilityliveregion"></a><span class="platform">android</span>accessibilityLiveRegion <span class="propType">enum('none', 'polite', 'assertive')</span> <a class="hash-link" href="#accessibilityliveregion">#</a></h4>
		<div>
			<p>告知无障碍服务当此视图更新时，是否要通知用户。只对Android API &gt;= 19 的设备有效。可以阅读<a href="http://developer.android.com/reference/android/view/View.html#attr_android:accessibilityLiveRegion">http://developer.android.com/reference/android/view/View.html#attr_android:accessibilityLiveRegion</a>了解更多信息。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="accessibilitytraits"></a><span class="platform">ios</span>accessibilityTraits <span class="propType">AccessibilityTraits, [AccessibilityTraits]</span> <a class="hash-link" href="#accessibilitytraits">#</a></h4>
		<div>
			<p>为读屏器提供更多属性。除非在元素里指定，默认情况下不提供任何属性。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="collapsable"></a><span class="platform">android</span>collapsable <span class="propType">bool</span> <a class="hash-link" href="#collapsable">#</a></h4>
		<div>
			<p>如果一个View只用于布局它的子组件，则它可能会为了优化而从原生布局树中移除。 把此属性设为<code>false</code>可以禁用这个优化，以确保对应视图在原生结构中存在。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="importantforaccessibility"></a><span class="platform">android</span>importantForAccessibility <span class="propType">enum('auto', 'yes', 'no', 'no-hide-descendants')</span> <a class="hash-link" href="#importantforaccessibility">#</a></h4>
		<div>
			<p>控制一个视图在无障碍功能中有多重要：它是否产生一个辅助功能事件，以及它是否能被请求屏幕内容的无障碍服务知晓。只对Android平台生效。了解更多信息，可以阅读<a href="http://developer.android.com/reference/android/R.attr.html#importantForAccessibility">http://developer.android.com/reference/android/R.attr.html#importantForAccessibility</a>。</p>
			<p> 可选的值: </p>
			<ul>
			<li><p><code>auto</code> - 系统来决定这个视图对于辅助功能是否重要 - 默认(推荐)。 </p></li>
			<li><p><code>yes</code> - 这个视图对于辅助功能而言重要。</p></li>
			<li><p><code>no</code> - 这个视图对辅助功能不重要。</p></li>
			<li><p><code>no-hide-descendants</code> - 这个视图，以及所有的后代视图，都对于辅助功能不重要。</p></li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="needsoffscreenalphacompositing"></a><span class="platform">android</span>needsOffscreenAlphaCompositing <span class="propType">bool</span> <a class="hash-link" href="#needsoffscreenalphacompositing">#</a></h4>
		<div>
			<p>决定这个视图是否要先离屏渲染再进行半透明度处理，来确保颜色和混合效果正确。默认值(false)会在渲染组件和它的所有子节点的时候直接应用透明通道，而不会先离屏渲染整个组件再将它附加一个透明通道后渲染到屏幕上。有时候当你给视图设置了一个透明度，且其中有较多元素层叠在一起的时候，默认的设置就会导致看起来不太正常（会比正常显得更加不透明）。</p>
			<p>为了正确的透明表现而进行离屏渲染会带来极大的开销，而且对于非原生开发者来说很难调试。这就是为啥它被默认关闭。如果你需要在一个动画中启用这个属性，考虑与<code>renderToHardwareTextureAndroid</code>组合使用，前提是视图的<strong>内容</strong>不会发生变化（即：它不需要每帧重绘一次）。如果开启了renderToHardwareTextureAndroid，则视图只会离屏渲染一次之后保存为一个硬件纹理，然后以正确的透明度绘制到屏幕上，这样就不会导致GPU频繁切换渲染目标（GPU切换渲染目标会带来极大的开销）。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="rendertohardwaretextureandroid"></a><span class="platform">android</span>renderToHardwareTextureAndroid <span class="propType">bool</span> <a class="hash-link" href="#rendertohardwaretextureandroid">#</a></h4>
		<div>
			<p>决定这个视图是否要把它自己（以及所有的子视图）渲染到一个GPU上的硬件纹理中。</p>
			<p>在Android上，这对于只修改不透明度、旋转、位移、或缩放的动画和交互十分有用：在这些情况下，视图不必每次都重新绘制，显示列表也不需要重新执行。纹理可以被重用于不同的参数。负面作用是这会大量消耗显存，所以当交互/动画结束后应该把此属性设置回false。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="shouldrasterizeios"></a><span class="platform">ios</span>shouldRasterizeIOS <span class="propType">bool</span> <a class="hash-link" href="#shouldrasterizeios">#</a></h4>
		<div>
			<p>决定这个视图是否需要在被混合之前绘制到一个位图上。</p>
			<p>在iOS上，这对于不会修改组件的尺寸和孩子的动画和交互十分有用。举例来说，当我们移动一个静态视图的位置的时候，预渲染允许渲染器重用一个缓存了静态视图的位图，并快速合成。</p>
			<p>预渲染会产生一个离屏的渲染过程，并且位图会消耗内存。所以使用此属性需要进行充分的测试和评估。</p>
		</div>
	</div>
</div>
