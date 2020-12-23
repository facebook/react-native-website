---
id: version-0.47-touchablenativefeedback
title: TouchableNativeFeedback
original_id: touchablenativefeedback
---

本组件用于封装视图，使其可以正确响应触摸操作（仅限Android平台）。在Android设备上，这个组件利用原生状态来渲染触摸的反馈。目前它只支持一个单独的View实例作为子节点。在底层实现上，实际会创建一个新的RCTView节点替换当前的子View，并附带一些额外的属性。

原生触摸操作反馈的背景可以使用`background`属性来自定义。

例子：

```jsx
renderButton: function() {
  return (
    <TouchableNativeFeedback
        onPress={this._onPressButton}
        background={TouchableNativeFeedback.SelectableBackground()}>
      <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
        <Text style={{margin: 30}}>Button</Text>
      </View>
    </TouchableNativeFeedback>
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
        <h4 class="propTitle"><a class="anchor" name="background"></a>background <span class="propType">backgroundPropType</span> <a class="hash-link" href="#background">#</a></h4>
        <div>
            <p>决定在触摸反馈的时候显示什么类型的背景。它接受一个有着<code>type</code>属性和一些基于<code>type</code>属性的额外数据的对象。我们推荐使用以下的静态方法之一来创建这个对象：</p>
            <p>1) TouchableNativeFeedback.SelectableBackground() - 会创建一个对象，表示安卓主题默认的对于被选中对象的背景。(?android:attr/selectableItemBackground)</p>
            <p>2) TouchableNativeFeedback.SelectableBackgroundBorderless() - 会创建一个对象，表示安卓主题默认的对于被选中的无边框对象的背景。(?android:attr/selectableItemBackgroundBorderless)。只在Android API level 21+适用。</p>
            <p>3) TouchableNativeFeedback.Ripple(color, borderless) - 会创建一个对象，当按钮被按下时产生一个涟漪状的背景，你可以通过color参数来指定颜色，如果参数<code>borderless</code>是true，那么涟漪还会渲染到视图的范围之外。（参见原生的actionbar buttons作为该效果的一个例子）。这个背景类型只在Android API level 21+适用。</p>
        </div>
    </div>
</div>