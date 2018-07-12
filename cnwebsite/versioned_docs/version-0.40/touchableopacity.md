---
id: version-0.40-touchableopacity
title: TouchableOpacity
original_id: touchableopacity
---

本组件用于封装视图，使其可以正确响应触摸操作。当按下的时候，封装的视图的不透明度会降低。这个过程并不会真正改变视图层级，大部分情况下很容易添加到应用中而不会带来一些奇怪的副作用。（__译注__：此组件与TouchableHighlight的区别在于并没有额外的颜色变化，更适于一般场景）

例子：

```javascript
renderButton: function() {
  return (
    <TouchableOpacity onPress={this._onPressButton}>
      <Image
        style={styles.button}
        source={require('image!myButton')}
      />
    </TouchableOpacity>
  );
},
```

### 属性

<div class="props">
    <div class="prop">
		<h4 class="propTitle"><a class="anchor" name="touchablewithoutfeedback"></a><a href="touchablewithoutfeedback.html#props">TouchableWithoutFeedback props...</a> <a class="hash-link" href="#touchablewithoutfeedback">#</a></h4>
        <div>
      		<p>译注：这意味着本组件继承了所有TouchableWithoutFeedback的属性。</p>
        </div>
	</div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="activeopacity"></a>activeOpacity <span class="propType">number</span> <a class="hash-link" href="#activeopacity">#</a></h4>
        <div>
            <p>指定封装的视图在被触摸操作激活时以多少不透明度显示（通常在0到1之间）。</p>
        </div>
    </div>
</div>
