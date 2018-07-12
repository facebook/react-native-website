---
id: version-0.49-switch
title: Switch
original_id: switch
---

跨平台通用的可以在两个状态中切换的组件。  
注意这是一个“受控组件”（controlled component）。你必须使用`onValueChange`回调来更新`value`属性以响应用户的操作。如果不更新`value`属性，组件只会按一开始给定的`value`值来渲染且保持不变，看上去就像完全点不动。  

@keyword checkbox @keyword toggle @keyword 单选 @keyword 多选

### 截图
![](img/components/switchandroid.png)

![](img/components/switchios.png)

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View props...</a> <a class="hash-link" href="#view">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="disabled"></a>disabled <span class="propType">bool</span> <a class="hash-link" href="#disabled">#</a></h4>
		<div>
			<p>如果为<code>true</code>，这个组件不能进行交互。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onvaluechange"></a>onValueChange <span class="propType">function</span> <a class="hash-link" href="#onvaluechange">#</a></h4>
		<div>
			<p>当值改变的时候调用此回调函数，参数为新的值。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="testid"></a>testID <span class="propType">string</span> <a class="hash-link" href="#testid">#</a></h4>
		<div>
			<p>用来在端到端测试中定位此视图。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="value"></a>value <span class="propType">bool</span> <a class="hash-link" href="#value">#</a></h4>
		<div>
			<p>表示此开关是否打开。默认为false（关闭状态）。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="ontintcolor"></a>onTintColor <span class="propType">ColorPropType</span> <a class="hash-link" href="#ontintcolor">#</a></h4>
		<div><p>开启状态时的背景颜色。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="thumbtintcolor"></a>thumbTintColor <span class="propType">ColorPropType</span> <a class="hash-link" href="#thumbtintcolor">#</a></h4>
		<div><p>开关上圆形按钮的背景颜色。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="tintcolor"></a>tintColor <span class="propType">ColorPropType</span> <a class="hash-link" href="#tintcolor">#</a></h4>
		<div><p>关闭状态时的边框颜色(iOS)或背景颜色(Android)。</p></div>
	</div>
</div>

