---
id: version-0.42-layoutanimation
title: LayoutAnimation
original_id: layoutanimation
---

当布局变化时，自动将视图运动到它们新的位置上。


一个常用的调用此API的办法是调用`LayoutAnimation.configureNext`，然后调用`setState`。


注意：目前如果要在**Android**上使用LayoutAnimation，那么还需要在`UIManager`中明确启用：
```javascript
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
```


### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="configurenext"></a><span class="propType">static </span>configureNext<span class="propType">(config: Config, onAnimationDidEnd?: Function)</span> <a class="hash-link" href="#configurenext">#</a></h4>
		<div>
			<p>计划下一次布局要发生的动画。</p>
			<p>@param config 表示动画相应的属性</p>
			<ul>
				<li><code>duration</code> 动画持续时间，单位是毫秒</li>
				<li><code>create</code>, 配置创建新视图时的动画。(参阅 <code>Anim</code> 类型)</li>
				<li><code>update</code>, 配置被更新的视图的动画。(参阅 <code>Anim</code> 类型)</li>
			</ul>
			<p>@param onAnimationDidEnd 当动画结束的时候被调用。只在iOS设备上支持。</p>
			<p>@param onError 当动画产生错误的时候被调用。只在iOS设备上支持。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="create"></a><span class="propType">static </span>create<span class="propType">(duration: number, type, creationProp)</span> <a class="hash-link" href="#create">#</a></h4>
		<div>
			<p>用来创建<code>configureNext</code>所需的config参数的辅助函数。</p>
		</div>
	</div>
</div>

### 属性

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="types"></a>Types<span class="propType">: CallExpression</span> <a class="hash-link" href="#types">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="properties"></a>Properties<span class="propType">: CallExpression</span> <a class="hash-link" href="#properties">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="configchecker"></a>configChecker<span class="propType">: CallExpression</span> <a class="hash-link" href="#configchecker">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="presets"></a>Presets<span class="propType">: ObjectExpression</span> <a class="hash-link" href="#presets">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="easeineaseout"></a>easeInEaseOut<span class="propType">: CallExpression</span> <a class="hash-link" href="#easeineaseout">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="linear"></a>linear<span class="propType">: CallExpression</span> <a class="hash-link" href="#linear">#</a></h4></div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="spring"></a>spring<span class="propType">: CallExpression</span> <a class="hash-link" href="#spring">#</a></h4></div>
</div>

