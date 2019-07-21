---
id: version-0.41-stylesheet
title: StyleSheet
original_id: stylesheet
---

StyleSheet提供了一种类似CSS样式表的抽象。

创建一个样式表：

```jsx
var styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});
```

使用一个样式表：

```jsx
<View style={styles.container}>
  <Text style={[styles.title, this.props.isActive && styles.activeTitle]} />
</View>
```

从代码质量角度：

* 从render函数中移除具体的样式内容，可以使代码更清晰易懂。
* 给样式命名也是对render函数中的原始组件的作用的一种标记。

从性能角度：

* 创建一个样式表，就可以使得我们后续更容易通过ID来引用样式，而不是每次都创建一个新的对象。
* 它还使得样式只会在JavaScript和原生之间传递一次，随后的过程都可以只传递一个ID（这个优化还未实现）。

### 方法

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="create"></a><span class="propType">static </span>create<span class="propType">(obj: {[key: string]: any})</span> <a class="hash-link" href="#create">#</a></h4></div>
</div>

### 属性

<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="hairlinewidth"></a>hairlineWidth<span class="propType">: CallExpression</span> <a class="hash-link" href="#hairlinewidth">#</a></h4><div>
	<p>这一常量定义了当前平台上的最细的宽度。可以用作边框或是两个元素间的分隔线。例如：</p>
	<div class="prism language-javascript">  <span class="token punctuation">{</span>
    borderBottomColor<span class="token punctuation">:</span> <span class="token string">'#bbb'</span><span class="token punctuation">,</span>
    borderBottomWidth<span class="token punctuation">:</span> StyleSheet<span class="token punctuation">.</span>hairlineWidth
  <span class="token punctuation">}</span></div>
  <p>这一常量始终是一个整数的像素值（线看起来会像头发丝一样细），并会尽量符合当前平台最细的线的标准。然而，你不能把它“视为一个常量”，因为不同的平台和不同的屏幕像素密度会导致不同的结果。</p></div>
  </div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="absolutefill"></a>absoluteFill<span class="propType">: CallExpression</span>
    <a class="hash-link" href="#absolutefill">#</a></h4>
    <div><p>A very common pattern is to create overlays with position absolute and zero positioning,
        so <code>absoluteFill</code> can be used for convenience and to reduce duplication of these repeated
        styles.</p></div>
</div>
<div class="prop"><h4 class="propTitle"><a class="anchor" name="absolutefillobject"></a>absoluteFillObject<span
        class="propType">: ObjectExpression</span> <a class="hash-link"
                                                      href="#absolutefillobject">#</a></h4>
    <div><p>Sometimes you may want <code>absoluteFill</code> but with a couple tweaks - <code>absoluteFillObject</code>
        can be
        used to create a customized entry in a <code>StyleSheet</code>, e.g.:</p>
        <p> const styles = StyleSheet.create({
            wrapper: {
            ...StyleSheet.absoluteFillObject,
            top: 10,
            backgroundColor: 'transparent',
            },
            });</p></div>
</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="flatten"></a>flatten<span class="propType">: CallExpression</span>
            <a class="hash-link" href="stylesheet.html#flatten">#</a></h4>
            <div><p>Flattens an array of style objects, into one aggregated style object.
                Alternatively, this method can be used to lookup IDs, returned by
                StyleSheet.register.</p>
                <blockquote><p><strong>NOTE</strong>: Exercise caution as abusing this can tax you in terms of
                    optimizations.</p>
                    <p>IDs enable optimizations through the bridge and memory in general. Refering
                        to style objects directly will deprive you of these optimizations.</p></blockquote>
                <p>Example:</p>
                <div class="prism language-javascript"><span class="token keyword">var</span> styles <span
                        class="token operator">=</span> StyleSheet<span class="token punctuation">.</span><span
                        class="token function">create<span class="token punctuation">(</span></span><span
                        class="token punctuation">{</span>
                    listItem<span class="token punctuation">:</span> <span class="token punctuation">{</span>
                    flex<span class="token punctuation">:</span> <span class="token number">1</span><span
                            class="token punctuation">,</span>
                    fontSize<span class="token punctuation">:</span> <span class="token number">16</span><span
                            class="token punctuation">,</span>
                    color<span class="token punctuation">:</span> <span class="token string">'white'</span>
                    <span class="token punctuation">}</span><span class="token punctuation">,</span>
                    selectedListItem<span class="token punctuation">:</span> <span class="token punctuation">{</span>
                    color<span class="token punctuation">:</span> <span class="token string">'green'</span>
                    <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span><span class="token punctuation">)</span><span
                            class="token punctuation">;</span>

                    StyleSheet<span class="token punctuation">.</span><span class="token function">flatten<span
                            class="token punctuation">(</span></span><span class="token punctuation">[</span>styles<span
                            class="token punctuation">.</span>listItem<span class="token punctuation">,</span>
                    styles<span class="token punctuation">.</span>selectedListItem<span
                            class="token punctuation">])</span><span class="token comment" spellcheck="true">
// returns { flex: 1, fontSize: 16, color: 'green' }</span></div>
                <p>Alternative use:</p>
                <div class="prism language-javascript">StyleSheet<span class="token punctuation">.</span><span
                        class="token function">flatten<span class="token punctuation">(</span></span>styles<span
                        class="token punctuation">.</span>listItem<span class="token punctuation">)</span><span
                        class="token punctuation">;</span><span class="token comment" spellcheck="true">
// return { flex: 1, fontSize: 16, color: 'white' }
</span><span class="token comment" spellcheck="true">// Simply styles.listItem would return its ID (number)</span></div>
                <p>This method internally uses <code>StyleSheetRegistry.getStyleByID(style)</code>
                    to resolve style objects represented by IDs. Thus, an array of style
                    objects (instances of StyleSheet.create), are individually resolved to,
                    their respective objects, merged as one and then returned. This also explains
                    the alternative use.</p></div>
    </div>
</div>

