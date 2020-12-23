---
id: version-0.45-asyncstorage
title: AsyncStorage
original_id: asyncstorage
---

AsyncStorage是一个简单的、异步的、持久化的Key-Value存储系统，它对于App来说是全局性的。它用来代替LocalStorage。

我们推荐您在AsyncStorage的基础上做一层抽象封装，而不是直接使用AsyncStorage。  

__译注__：推荐由`React Native中文网`封装维护的[`react-native-storage`](https://github.com/sunnylqm/react-native-storage/blob/master/README-CHN.md)模块，提供了较多便利功能。

本模块的JS代码提供了对原生实现的一个封装，以提供一个更清晰的JS API、返回真正的错误对象，以及简单的单项对象操作函数。每个方法都会返回一个`Promise`对象。

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getitem"></a><span class="propType">static </span>getItem<span class="propType">(key: string, callback?: ?(error: ?Error, result: ?string) =&gt; void)</span> <a class="hash-link" href="#getitem">#</a></h4>
		<div>
			<p>读取<code>key</code>字段并将结果作为第二个参数传递给<code>callback</code>。如果有任何错误发生，则会传递一个<code>Error</code>对象作为第一个参数。返回一个<code>Promise</code>对象。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="setitem"></a><span class="propType">static </span>setItem<span class="propType">(key: string, value: string, callback?: ?(error: ?Error) =&gt; void)</span> <a class="hash-link" href="#setitem">#</a></h4>
		<div>
			<p>将<code>key</code>字段的值设置成<code>value</code>，并在完成后调用<code>callback</code>函数。如果有任何错误发生，则会传递一个<code>Error</code>对象作为第一个参数。返回一个<code>Promise</code>对象。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="removeitem"></a><span class="propType">static </span>removeItem<span class="propType">(key: string, callback?: ?(error: ?Error) =&gt; void)</span> <a class="hash-link" href="#removeitem">#</a></h4>
		<div>
			<p>删除一个字段。返回一个<code>Promise</code>对象。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="mergeitem"></a><span class="propType">static </span>mergeItem<span class="propType">(key: string, value: string, callback?: ?(error: ?Error) =&gt; void)</span> <a class="hash-link" href="#mergeitem">#</a></h4>
		<div>
			<p>假设已有的值和新的值都是字符串化的JSON，则将两个值合并。返回一个<code>Promise</code>对象。还没有被所有原生实现都支持。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="clear"></a><span class="propType">static </span>clear<span class="propType">(callback?: ?(error: ?Error) =&gt; void)</span> <a class="hash-link" href="#clear">#</a></h4>
		<div>
			<p>删除<em>全部的</em>AsyncStorage数据，不论来自什么库或调用者。通常不应该调用这个函数——使用removeItem或者multiRemove来清除你自己的key。返回一个<code>Promise</code>对象。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getallkeys"></a><span class="propType">static </span>getAllKeys<span class="propType">(callback?: ?(error: ?Error, keys: ?Array&lt;string&gt;) =&gt; void)</span> <a class="hash-link" href="#getallkeys">#</a></h4>
		<div>
			<p>获取<em>所有</em>本应用可以访问到的数据，不论来自什么库或调用者。返回一个<code>Promise</code>对象。</p>
		</div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="flushgetrequests"></a><span class="propType">static </span>flushGetRequests<span class="propType">()</span> <a class="hash-link" href="#flushgetrequests">#</a></h4><div><p>清除所有进行中的查询操作。</p></div></div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="multiget"></a><span class="propType">static </span>multiGet<span class="propType">(keys: Array&lt;string&gt;, callback?: ?(errors: ?Array&lt;Error&gt;, result: ?Array&lt;Array&lt;string&gt;&gt;) =&gt; void)</span> <a class="hash-link" href="#multiget">#</a></h4>
		<div>
			<p>获取keys所包含的所有字段的值，调用callback回调函数时返回一个key-value数组形式的数组。返回一个<code>Promise</code>对象。</p>
			<p>  multiGet(['k1', 'k2'], cb) -&gt; cb([['k1', 'val1'], ['k2', 'val2']])</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="multiset"></a><span class="propType">static </span>multiSet<span class="propType">(keyValuePairs: Array&lt;Array&lt;string&gt;&gt;, callback?: ?(errors: ?Array&lt;Error&gt;) =&gt; void)</span> <a class="hash-link" href="#multiset">#</a></h4>
		<div>
			<p>multiSet和multiMerge都接受一个与multiGet输出值一致的key-value数组的数组。返回一个<code>Promise</code>对象。</p>
			<p>  multiSet([['k1', 'val1'], ['k2', 'val2']], cb);</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="multiremove"></a><span class="propType">static </span>multiRemove<span class="propType">(keys: Array&lt;string&gt;, callback?: ?(errors: ?Array&lt;Error&gt;) =&gt; void)</span> <a class="hash-link" href="#multiremove">#</a></h4>
		<div>
			<p>删除所有键在<code>keys</code>数组中的数据。返回一个<code>Promise</code>对象。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="multimerge"></a><span class="propType">static </span>multiMerge<span class="propType">(keyValuePairs: Array&lt;Array&lt;string&gt;&gt;, callback?: ?(errors: ?Array&lt;Error&gt;) =&gt; void)</span> <a class="hash-link" href="#multimerge">#</a></h4>
		<div>
			<p>将多个输入的值和已有的值合并，要求都是字符串化的JSON。返回一个<code>Promise</code>对象。</p>
			<p>还没有被所有原生实现都支持。</p>
		</div>
	</div>
</div>
