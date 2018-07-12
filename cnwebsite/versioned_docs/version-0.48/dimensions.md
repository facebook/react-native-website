---
id: version-0.48-dimensions
title: Dimensions
original_id: dimensions
---

__译注__：本模块用于获取设备屏幕的宽高。

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="set"></a><span class="propType">static </span>set<span class="propType">(dims: {[key:string]: any})</span> <a class="hash-link" href="#set">#</a></h4>
		<div>
			<p>这个函数只应该被原生代码调用。.</p>
			<p>@param {object} dims 一个简单的字符串作为key的对象，包含了需要设置的尺寸信息。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="get"></a><span class="propType">static </span>get<span class="propType">(dim: string)</span> <a class="hash-link" href="#get">#</a></h4>
		<div>
			<p>初始的尺寸信息应该在<code>runApplication</code>之后被执行，所以它可以在任何其他的require被执行之前就可用。不过在稍后可能还会更新。</p>
			<p>注意：尽管尺寸信息立即就可用，但它可能会在将来被修改（譬如设备的方向改变），所以基于这些常量的渲染逻辑和样式应当每次render之后都调用此函数，而不是将对应的值保存下来。（举例来说，你可能需要使用内联的样式而不是在<code>StyleSheet</code>中保存相应的尺寸）。</p>
			<p>例子：<code>var {height, width} = Dimensions.get('window');</code></p>
			<p>@param {string} dim 想要获取的尺寸信息的字段名。</p>
			<p>@returns {Object?} 返回的尺寸信息值。</p>
		</div>
	</div>
</div>