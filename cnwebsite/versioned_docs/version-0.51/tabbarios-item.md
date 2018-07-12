---
id: version-0.51-tabbarios-item
title: TabBarIOS.Item
original_id: tabbarios-item
---

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View props...</a> <a class="hash-link" href="#view">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="badge"></a>badge <span class="propType">string, number</span> <a class="hash-link" href="#badge">#</a></h4>
		<div>
			<p>在图标右上角显示一个红色的气泡。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="icon"></a>icon <span class="propType">Image.propTypes.source</span> <a class="hash-link" href="#icon">#</a></h4>
		<div>
			<p>给当前标签指定一个自定义的图标。如果定义了<code>systemIcon</code>属性， 这个属性会被忽略。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onpress"></a>onPress <span class="propType">function</span> <a class="hash-link" href="#onpress">#</a></h4>
		<div>
			<p>当此标签被选中时调用。你应该修改组件的状态来使得<code>selected={true}</code>。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="selected"></a>selected <span class="propType">bool</span> <a class="hash-link" href="#selected">#</a></h4>
		<div>
			<p>这个属性决定了子视图是否可见。如果你看到一个空白的页面，很可能是没有选中任何一个标签。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="selectedicon"></a>selectedIcon <span class="propType">Image.propTypes.source</span> <a class="hash-link" href="#selectedicon">#</a></h4>
		<div>
			<p>当标签被选中的时候显示的自定义图标。如果定义了<code>systemIcon</code>属性，这个属性会被忽略。如果定义了<code>icon</code>而没定义这个属性，在选中的时候图标会染上蓝色。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="style"></a>style <span class="propType"><a href="view.html#style">View#style</a></span> <a class="hash-link" href="#style">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="systemicon"></a>systemIcon <span class="propType">enum('bookmarks', 'contacts', 'downloads', 'favorites', 'featured', 'history', 'more', 'most-recent', 'most-viewed', 'recents', 'search', 'top-rated')</span> <a class="hash-link" href="#systemicon">#</a></h4>
		<div>
			<p>一些预定义的系统图标。注意如果你使用了此属性，标题和自定义图标都会被覆盖为系统定义的值。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="title"></a>title <span class="propType">string</span> <a class="hash-link" href="#title">#</a></h4>
		<div>
			<p>在图标下面显示的标题文字。如果定义了<code>systemIcon</code>属性，这个属性会被忽略。</p>
		</div>
	</div>
</div>