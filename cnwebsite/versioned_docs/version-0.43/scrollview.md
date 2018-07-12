---
id: version-0.43-scrollview
title: ScrollView
original_id: scrollview
---

一个包装了平台的ScrollView（滚动视图）的组件，同时还集成了触摸锁定的“响应者”系统。

记住ScrollView必须有一个确定的高度才能正常工作，因为它实际上所做的就是将一系列不确定高度的子组件装进一个确定高度的容器（通过滚动操作）。要给一个ScrollView确定一个高度的话，要么直接给它设置高度（不建议），要么确定所有的父容器都已经绑定了高度。在视图栈的任意一个位置忘记使用`{flex:1}`都会导致错误，你可以使用元素查看器来查找问题的原因。

ScrollView内部的其他响应者尚无法阻止ScrollView本身成为响应者。

`ScrollView`和`ListView/FlatList`应该如何选择？ScrollView会简单粗暴地把所有子元素一次性全部渲染出来。其原理浅显易懂，使用上自然也最简单。然而这样简单的渲染逻辑自然带来了性能上的不足。想象一下你有一个特别长的列表需要显示，可能有好几屏的高度。创建和渲染那些屏幕以外的JS组件和原生视图，显然对于渲染性能和内存占用都是一种极大的拖累和浪费。

这就是为什么我们还有专门的`ListView`组件。`ListView`会惰性渲染子元素，只在它们将要出现在屏幕中时开始渲染。这种惰性渲染逻辑要复杂很多，因而API在使用上也更为繁琐。除非你要渲染的数据特别少，否则你都应该尽量使用`ListView`，哪怕它们用起来更麻烦。

`FlatList`是0.43版本开始新出的改进版的`ListView`，性能更优，但可能不够稳定，尚待时间考验。

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View props...</a> <a class="hash-link" href="#view">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="contentcontainerstyle"></a>contentContainerStyle <span class="propType">StyleSheetPropType(ViewStylePropTypes)</span> <a class="hash-link" href="#contentcontainerstyle">#</a></h4>
		<div>
			<p>这些样式会应用到一个内层的内容容器上，所有的子视图都会包裹在内容容器内。例子：</p>
			<p><pre class="markdown-highlight"><code class="language-javascript hljs"><span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-title">ScrollView</span> <span class="hljs-attribute">contentContainerStyle</span>=<span class="hljs-value">{styles.contentContainer}</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-title">ScrollView</span>&gt;</span>
  )</span>;
  ...
  <span class="hljs-keyword">var</span> styles = StyleSheet.create({
    contentContainer: {
      paddingVertical: <span class="hljs-number">20</span>
    }
  });
</code></pre></p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="horizontal"></a>horizontal <span class="propType">bool</span> <a class="hash-link" href="#horizontal">#</a></h4>
		<div>
			<p>当此属性为true的时候，所有的子视图会在水平方向上排成一行，而不是默认的在垂直方向上排成一列。默认值为false。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="keyboarddismissmode"></a>keyboardDismissMode <span class="propType">enum('none', "interactive", 'on-drag')</span> <a class="hash-link" href="#keyboarddismissmode">#</a></h4>
		<div>
			<p>用户拖拽滚动视图的时候，是否要隐藏软键盘。</p>
			<ul>
			<li><p><code>none</code>（默认值），拖拽时不隐藏软键盘。</p></li>
			<li><p><code>on-drag</code> 当拖拽开始的时候隐藏软键盘。</p></li>
			<li><p><code>interactive</code> 软键盘伴随拖拽操作同步地消失，并且如果往上滑动会恢复键盘。安卓设备上不支持这个选项，会表现的和<code>none</code>一样。</p></li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="keyboardshouldpersisttaps"></a>keyboardShouldPersistTaps <span class="propType">enum('always', 'never', 'handled', false, true)</span> <a class="hash-link" href="#keyboardshouldpersisttaps">#</a></h4>
		<div><p>如果当前界面有软键盘，那么点击scrollview后是否收起键盘，取决于本属性的设置。（译注：很多人反应TextInput无法自动失去焦点/需要点击多次切换到其他组件等等问题，其关键都是需要将TextInput放到ScrollView中再设置本属性）</p>
		<ul>
			<li><code>'never'</code>（默认值），点击TextInput以外的子组件会使当前的软键盘收起。此时子元素不会收到点击事件。</li>
			<li><code>'always'</code>，键盘不会自动收起，ScrollView也不会捕捉点击事件，但子组件可以捕获。</li>
			<li><code>'handled'</code>，当点击事件被子组件捕获时，键盘不会自动收起。这样切换TextInput时键盘可以保持状态。多数带有TextInput的情况下你应该选择此项。</li>
			<li><code>false</code>，已过期，请使用'never'代替。</li>
			<li><code>true</code>，已过期，请使用'always'代替。</li>
		</ul>
	</div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="oncontentsizechange"></a>onContentSizeChange <span
	        class="propType">function</span> <a class="hash-link" href="#oncontentsizechange">#</a></h4>
	    <div><p>此函数会在ScrollView内部可滚动内容的视图发生变化时调用。</p>
	        <p>调用参数为内容视图的宽和高: <code>(contentWidth,
	            contentHeight)</code></p>
	        <p>此方法是通过绑定在内容容器上的onLayout来实现的。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onmomentumscrollstart"></a>onMomentumScrollStart?: <span class="propType">function</span> <a class="hash-link" href="#onmomentumscrollstart">#</a></h4>
		<div><p>滚动动画开始时调用此函数。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onmomentumscrollend"></a>onMomentumScrollEnd?: <span class="propType">function</span> <a class="hash-link" href="#onmomentumscrollend">#</a></h4>
		<div><p>滚动动画结束时调用此函数。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onscroll"></a>onScroll <span class="propType">function</span> <a class="hash-link" href="#onscroll">#</a></h4>
		<div>
			<p>在滚动的过程中，每帧最多调用一次此回调函数。调用的频率可以用<code>scrollEventThrottle</code>属性来控制。</p>
		</div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="refreshcontrol"></a>refreshControl <span class="propType">element</span> <a class="hash-link" href="#refreshcontrol">#</a></h4>
	<div><p>指定<a href="refreshcontrol.html">RefreshControl</a>组件，用于为ScrollView提供下拉刷新功能。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="removeclippedsubviews"></a>removeClippedSubviews <span class="propType">bool</span> <a class="hash-link" href="#removeclippedsubviews">#</a></h4>
		<div>
			<p>（实验特性）：当此属性为true时，屏幕之外的子视图（子视图的<code>overflow</code>样式需要设为<code>hidden</code>）会被移除。这个可以提升大列表的滚动性能。默认值为true。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="showshorizontalscrollindicator"></a>showsHorizontalScrollIndicator <span class="propType">bool</span> <a class="hash-link" href="#showshorizontalscrollindicator">#</a></h4>
		<div>
			<p>当此属性为true的时候，显示一个水平方向的滚动条。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="showsverticalscrollindicator"></a>showsVerticalScrollIndicator <span class="propType">bool</span> <a class="hash-link" href="#showsverticalscrollindicator">#</a></h4>
		<div>
			<p>当此属性为true的时候，显示一个垂直方向的滚动条。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="style"></a>style <span class="propType">style</span> <a class="hash-link" href="#style">#</a></h4>
		<div class="compactProps">
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
				<h6 class="propTitle">shadowColor <span class="propType">string</span></h6>
			</div>
			<div class="prop">
				<h6 class="propTitle">shadowOffset <span class="propType">{width: number, height: number}</span></h6>
			</div>
			<div class="prop">
				<h6 class="propTitle">shadowOpacity <span class="propType">number</span></h6>
			</div>
			<div class="prop">
				<h6 class="propTitle">shadowRadius <span class="propType">number</span></h6>
			</div>
		</div>
	</div>
	<div class="prop">
	    <h4 class="propTitle">
	        <a class="anchor" name="endfillcolor"></a>
	        <span class="platform">android</span>endFillColor
	        <span class="propType"><a href="colors.html">color</a></span>
	        <a class="hash-link" href="#endfillcolor">#</a>
	    </h4>
	    <div>
	        <p>有时候滚动视图会占据比实际内容更多的空间。这种情况下可以使用此属性，指定以某种颜色来填充多余的空间，以避免设置背景和创建不必要的绘制开销。一般情况下并不需要这种高级优化技巧。</p>
	    </div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="overscrollmode"></a><span
        class="platform">android</span>overScrollMode <span class="propType">enum('auto', 'always', 'never')</span> <a
        class="hash-link" href="#overscrollmode">#</a></h4>
    <div><p>覆盖默认的overScroll模式</p>
        <p>可选的值有：</p>
        <ul>
            <li><code>'auto'</code> - 默认值，允许用户在内容超出视图高度之后可以滚动视图。
            </li>
            <li><code>'always'</code> - 无论内容尺寸，用户始终可以滚动视图。</li>
            <li><code>'never'</code> - 始终不允许用户滚动视图。</li>
        </ul>
    		</div>
  </div>
  <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="scrollperftag"></a><span class="platform">android</span>scrollPerfTag
    <span class="propType">string</span> <a class="hash-link" href="#scrollperftag">#</a></h4>
	    <div><p>Tag used to log scroll performance on this scroll view. Will force
	        momentum events to be turned on (see sendMomentumEvents). This doesn't do
	        anything out of the box and you need to implement a custom native
	        FpsListener for it to be useful.</p>
			</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="alwaysbouncehorizontal"></a><span class="platform">ios</span>alwaysBounceHorizontal <span class="propType">bool</span> <a class="hash-link" href="#alwaysbouncehorizontal">#</a></h4>
		<div>
			<p>当此属性为true时，水平方向即使内容比滚动视图本身还要小，也可以弹性地拉动一截。当<code>horizontal={true}</code>时默认值为true，否则为false。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="alwaysbouncevertical"></a><span class="platform">ios</span>alwaysBounceVertical <span class="propType">bool</span> <a class="hash-link" href="#alwaysbouncevertical">#</a></h4>
		<div>
			<p>当此属性为true时，垂直方向即使内容比滚动视图本身还要小，也可以弹性地拉动一截。当<code>horizontal={true}</code>时默认值为false，否则为true。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="automaticallyadjustcontentinsets"></a><span class="platform">ios</span>automaticallyAdjustContentInsets <span class="propType">bool</span> <a class="hash-link" href="#automaticallyadjustcontentinsets">#</a></h4>
		<div>
			<p>当滚动视图放在一个导航条或者工具条后面的时候，iOS系统是否要自动调整内容的范围。默认值为true。（译注：如果你的ScrollView或ListView的头部出现莫名其妙的空白，尝试将此属性置为false）</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="bounces"></a><span class="platform">ios</span>bounces <span class="propType">bool</span> <a class="hash-link" href="#bounces">#</a></h4>
		<div>
			<p>当值为true时，如果内容范围比滚动视图本身大，在到达内容末尾的时候，可以弹性地拉动一截。如果为false，尾部的所有弹性都会被禁用，即使<code>alwaysBounce</code>属性为true。默认值为true。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="bounceszoom"></a><span class="platform">ios</span>bouncesZoom <span class="propType">bool</span> <a class="hash-link" href="#bounceszoom">#</a></h4>
		<div>
			<p>当值为true时，使用手势缩放内容可以超过min/max的限制，然后在手指抬起之后弹回min/max的缩放比例。否则的话，缩放不能超过限制。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="cancancelcontenttouches"></a><span class="platform">ios</span>canCancelContentTouches <span class="propType">bool</span> <a class="hash-link" href="#cancancelcontenttouches">#</a></h4>
		<div>
			<p>当值为false时，一旦有子节点响应触摸操作，即使手指开始移动也不会拖动滚动视图。默认值为true（在以上情况下可以拖动滚动视图。）</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="centercontent"></a><span class="platform">ios</span>centerContent <span class="propType">bool</span> <a class="hash-link" href="#centercontent">#</a></h4>
		<div>
			<p>当值为true时，如果滚动视图的内容比视图本身小，则会自动把内容居中放置。当内容比滚动视图大的时候，此属性没有作用。默认值为false。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="contentinset"></a><span class="platform">ios</span>contentInset <span class="propType">{top: number, left: number, bottom: number, right: number}</span> <a class="hash-link" href="#contentinset">#</a></h4>
		<div>
			<p>内容范围相对滚动视图边缘的坐标。默认为<code>{0, 0, 0, 0}</code>。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="contentoffset"></a><span class="platform">ios</span>contentOffset <span class="propType">PointPropType</span> <a class="hash-link" href="#contentoffset">#</a></h4>
		<div>
			<p>用来手动设置初始的滚动坐标。默认值为<code>{x: 0, y: 0}</code>。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="decelerationrate"></a><span class="platform">ios</span>decelerationRate <span class="propType">number</span> <a class="hash-link" href="#decelerationrate">#</a></h4>
		<div>
			<p>一个浮点数，用于决定当用户抬起手指之后，滚动视图减速停下的速度。常见的选项有：</p>
			<ul>
			<li><p><code>Normal</code>: 0.998 (默认值)</p></li>
			<li><p><code>Fast</code>: 0.9</p></li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="directionallockenabled"></a><span class="platform">ios</span>directionalLockEnabled <span class="propType">bool</span> <a class="hash-link" href="#directionallockenabled">#</a></h4>
		<div>
			<p>当值为真时，滚动视图在拖拽的时候会锁定只有垂直或水平方向可以滚动。默认值为false。</p>
		</div>
	</div>
	<div class="prop">
    <h4 class="propTitle"><a class="anchor" name="indicatorstyle"></a><span class="platform">ios</span>indicatorStyle
    <span class="propType">enum('default', 'black', 'white')</span> <a class="hash-link"
                                                                       href="#indicatorstyle">#</a>
    </h4>
    <div><p>设置滚动条的样式。</p>
        <ul>
            <li><code>default</code>，默认值，等同<code>black</code>.</li>
            <li><code>black</code>，黑色滚动条。</li>
            <li><code>white</code>，白色滚动条。</li>
        </ul>
    </div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="maximumzoomscale"></a><span class="platform">ios</span>maximumZoomScale <span class="propType">number</span> <a class="hash-link" href="#maximumzoomscale">#</a></h4>
		<div>
			<p>允许的最大缩放比例。默认值为1.0。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="minimumzoomscale"></a><span class="platform">ios</span>minimumZoomScale <span class="propType">number</span> <a class="hash-link" href="#minimumzoomscale">#</a></h4>
		<div>
			<p>允许的最小缩放比例。默认值为1.0。</p>
		</div>
	</div>
	<div class="prop">
	<h4 class="propTitle"><a class="anchor" name="onrefreshstart"></a><span class="platform">ios</span>onRefreshStart <span class="propType">function</span> <a class="hash-link" href="#onrefreshstart">#</a></h4>
	<div class="deprecated">
	<div class="deprecatedTitle"><span>已过期</span></div>
	<div class="deprecatedMessage"><div><p>请使用<code>refreshControl</code> 属性代替。</p>
	</div>
	</div>
	</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="pagingenabled"></a>pagingEnabled <span class="propType">bool</span> <a class="hash-link" href="#pagingenabled">#</a></h4>
		<div>
			<p>当值为true时，滚动条会停在滚动视图的尺寸的整数倍位置。这个可以用在水平分页上。默认值为false。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="scrollenabled"></a>scrollEnabled <span class="propType">bool</span> <a class="hash-link" href="#scrollenabled">#</a></h4>
		<div>
			<p>当值为false的时候，内容不能滚动，默认值为true。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="scrolleventthrottle"></a><span class="platform">ios</span>scrollEventThrottle <span class="propType">number</span> <a class="hash-link" href="#scrolleventthrottle">#</a></h4>
		<div>
			<p>这个属性控制在滚动过程中，scroll事件被调用的频率（单位是每秒事件数量）。更大的数值能够更及时的跟踪滚动位置，不过可能会带来性能问题，因为更多的信息会通过bridge传递。默认值为0，意味着每次视图被滚动，scroll事件只会被调用一次。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="scrollindicatorinsets"></a><span class="platform">ios</span>scrollIndicatorInsets <span class="propType">{top: number, left: number, bottom: number, right: number}</span> <a class="hash-link" href="#scrollindicatorinsets">#</a></h4>
		<div>
			<p>决定滚动条距离视图边缘的坐标。这个值应该和<code>contentInset</code>一样。默认值为<code>{0, 0, 0, 0}</code>。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="scrollstotop"></a><span class="platform">ios</span>scrollsToTop <span class="propType">bool</span> <a class="hash-link" href="#scrollstotop">#</a></h4>
		<div>
			<p>当此值为true时，点击状态栏的时候视图会滚动到顶部。默认值为true。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="snaptoalignment"></a><span class="platform">ios</span>snapToAlignment <span class="propType">enum('start', "center", 'end')</span> <a class="hash-link" href="#snaptoalignment">#</a></h4>
		<div>
			<p>当设置了<code>snapToInterval</code>，<code>snapToAlignment</code>会定义停驻点与滚动视图之间的关系。</p>
			<ul>
			<li><p><code>start</code> (默认) 会将停驻点对齐在左侧（水平）或顶部（垂直）</p></li>
			<li><p><code>center</code> 会将停驻点对齐到中间</p></li>
			<li><p><code>end</code> 会将停驻点对齐到右侧（水平）或底部（垂直）</p></li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="snaptointerval"></a><span class="platform">ios</span>snapToInterval <span class="propType">number</span> <a class="hash-link" href="#snaptointerval">#</a></h4>
		<div>
			<p>当设置了此属性时，会让滚动视图滚动停止后，停止在<code>snapToInterval</code>的倍数的位置。这可以在一些子视图比滚动视图本身小的时候用于实现分页显示。与<code>snapToAlignment</code>组合使用。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="stickyheaderindices"></a>stickyHeaderIndices <span class="propType">[number]</span> <a class="hash-link" href="#stickyheaderindices">#</a></h4>
		<div>
			<p>一个子视图下标的数组，用于决定哪些成员会在滚动之后固定在屏幕顶端。举个例子，传递<code>stickyHeaderIndices={[0]}</code>会让第一个成员固定在滚动视图顶端。这个属性不能和<code>horizontal={true}</code>一起使用。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="zoomscale"></a><span class="platform">ios</span>zoomScale <span class="propType">number</span> <a class="hash-link" href="#zoomscale">#</a></h4>
		<div>
			<p>滚动视图内容初始的缩放比例。默认值为1.0。</p>
		</div>
	</div>
</div>


### 方法
<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="scrollto"></a>scrollTo<span class="propType">(y: number | { x?: number, y?: number, animated?: boolean }, x: number, animated: boolean)</span>
        <a class="hash-link" href="#scrollto">#</a></h4>
        <div><p>滚动到指定的x, y偏移处。第三个参数为是否启用平滑滚动动画。</p>
            <p>使用示例:</p>
            <p><code>scrollTo({x: 0, y: 0, animated: true})</code></p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoend"></a>scrollToEnd<span class="methodType">(options?)</span> <a class="hash-link" href="#scrolltoend">#</a></h4>
    	<div>
    	<p>滚动到视图底部（水平方向的视图则滚动到最右边）。</p><p>加上动画参数 <code>scrollToEnd({animated: true})</code>则启用平滑滚动动画，或是调用
<code>scrollToEnd({animated: false})</code>来立即跳转。如果不使用参数，则<code>animated</code>选项默认启用。</p>
		</div>
	</div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} = ReactNative;

exports.displayName = (undefined: ?string);
exports.title = '<ScrollView>';
exports.description = 'Component that enables scrolling through child components';
exports.examples = [
{
  title: '<ScrollView>',
  description: 'To make content scrollable, wrap it within a <ScrollView> component',
  render: function() {
    var _scrollView: ScrollView;
    return (
      <View>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          style={styles.scrollView}>
          {THUMBS.map(createThumbRow)}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollTo({y: 0}); }}>
          <Text>Scroll to top</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollToEnd({animated: true}); }}>
          <Text>Scroll to bottom</Text>
        </TouchableOpacity>
      </View>
    );
  }
}, {
  title: '<ScrollView> (horizontal = true)',
  description: 'You can display <ScrollView>\'s child components horizontally rather than vertically',
  render: function() {
    var _scrollView: ScrollView;
    return (
      <View>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          horizontal={true}
          style={[styles.scrollView, styles.horizontalScrollView]}>
          {THUMBS.map(createThumbRow)}
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollTo({x: 0}); }}>
          <Text>Scroll to start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => { _scrollView.scrollToEnd({animated: true}); }}>
          <Text>Scroll to end</Text>
        </TouchableOpacity>
      </View>
    );
  }
}];

class Thumb extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return (
      <View style={styles.button}>
        <Image style={styles.img} source={{uri:this.props.uri}} />
      </View>
    );
  }
}

var THUMBS = ['https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851549_767334479959628_274486868_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851561_767334496626293_1958532586_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851579_767334503292959_179092627_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851589_767334513292958_1747022277_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851563_767334559959620_1193692107_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851593_767334566626286_1953955109_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851591_767334523292957_797560749_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851567_767334529959623_843148472_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851548_767334489959627_794462220_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851575_767334539959622_441598241_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-ash3/t39.1997/p128x128/851573_767334549959621_534583464_n.png', 'https://fbcdn-dragon-a.akamaihd.net/hphotos-ak-prn1/t39.1997/p128x128/851583_767334573292952_1519550680_n.png'];
THUMBS = THUMBS.concat(THUMBS); // double length of THUMBS
var createThumbRow = (uri, i) => <Thumb key={i} uri={uri} />;

var styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#6A85B1',
    height: 300,
  },
  horizontalScrollView: {
    height: 120,
  },
  containerPage: {
    height: 50,
    width: 50,
    backgroundColor: '#527FE4',
    padding: 5,
  },
  text: {
    fontSize: 20,
    color: '#888888',
    left: 80,
    top: 20,
    height: 40,
  },
  button: {
    margin: 7,
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 3,
  },
  buttonContents: {
    flexDirection: 'row',
    width: 64,
    height: 64,
  },
  img: {
    width: 64,
    height: 64,
  }
});
```
