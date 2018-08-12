---
id: version-0.51-text
title: Text
original_id: text
---

一个用于显示文本的React组件，并且它也支持嵌套、样式，以及触摸处理。在下面的例子里，嵌套的标题和正文文字会继承来自`styles.baseText`的`fontFamily`字体样式，不过标题上还附加了它自己额外的样式。标题和文本会在顶部依次堆叠，并且被代码中内嵌的换行符分隔开。

```javascript
renderText() {
  return (
    <Text style={styles.baseText}>
      <Text style={styles.titleText} onPress={this.onPressTitle}>
        {this.state.titleText + '\n\n'}
      </Text>
      <Text numberOfLines={5}>
        {this.state.bodyText}
      </Text>
    </Text>
  );
},
...
var styles = StyleSheet.create({
  baseText: {
    fontFamily: 'Cochin',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
};
```

### 截图
![](/img/components/text.png)

### 属性

<div class="props">
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="adjustsfontsizetofit"></a>adjustsFontSizeToFit  <span class="propType">bool</span> <a class="hash-link" href="#adjustsfontsizetofit">#</a></h4>
    <div>
      <p>指定字体是否随着给定样式的限制而自动缩放。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="allowfontscaling"></a>allowFontScaling <span class="propType">bool</span> <a class="hash-link" href="#allowfontscaling">#</a></h4>
    <div>
      <p>控制字体是否要根据系统的“字体大小”辅助选项来进行缩放。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="minimumfontscale"></a><span class="platform">ios</span>minimumFontScale <span class="propType">bool</span> <a class="hash-link" href="#minimumfontscale">#</a></h4>
    <div>
      <p>当adjustsFontSizeToFit开启时，指定最小的缩放比（即不能低于这个值）。可设定的值为0.01 - 1.0</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="numberoflines"></a>numberOfLines <span class="propType">number</span> <a class="hash-link" href="#numberoflines">#</a></h4>
    <div>
      <p>用来当文本过长的时候裁剪文本。包括折叠产生的换行在内，总的行数不会超过这个属性的限制。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="onlayout"></a>onLayout <span class="propType">function</span> <a class="hash-link" href="#onlayout">#</a></h4>
    <div>
      <p>当挂载或者布局变化以后调用，参数为如下的内容：</p>
      <p>  <code>{nativeEvent: {layout: {x, y, width, height}}}</code></p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="onlongpress"></a>onLongPress <span class="propType">function</span> <a class="hash-link" href="#onlongpress">#</a></h4>
    <div>
      <p>当文本被长按以后调用此回调函数。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="onpress"></a>onPress <span class="propType">function</span> <a class="hash-link" href="#onpress">#</a></h4>
    <div>
      <p>当文本被点击以后调用此回调函数。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="selectable"></a>selectable <span class="propType">function</span> <a class="hash-link" href="#selectable">#</a></h4>
    <div>
      <p>决定用户是否可以长按选择文本，以便复制和粘贴。</p>
    </div>
  </div><div class="prop"><h4 class="propTitle"><a class="anchor" name="style"></a>style <span class="propType">style</span> <a
        class="hash-link" href="#style">#</a></h4>
    <div class="compactProps">
        <div class="prop"><h6 class="propTitle"><a href="view.html#style">View#style...</a></h6></div>
        <div class="prop"><h6 class="propTitle">color <span class="propType"><a href="colors.html">color</a></span>
        </h6></div>
        <div class="prop"><h6 class="propTitle">fontFamily <span class="propType">string</span></h6></div>
        <div class="prop"><h6 class="propTitle">fontSize <span class="propType">number</span></h6></div>
        <div class="prop"><h6 class="propTitle">fontStyle <span class="propType">enum('normal', 'italic')</span></h6>
        </div>
        <div class="prop">
            <h6 class="propTitle">fontWeight <span class="propType">enum('normal', 'bold', '100', '200', '300', '400', '500', '600', '700', '800', '900')</span>
                <div><p>指定字体的粗细。大多数字体都支持'normal'和'bold'值。并非所有字体都支持所有的数字值。如果某个值不支持，则会自动选择最接近的值。</p></div>
            </h6>
        </div>
        <div class="prop"><h6 class="propTitle">lineHeight <span class="propType">number</span></h6></div>
        <div class="prop">
            <h6 class="propTitle">textAlign <span
                    class="propType">enum('auto', 'left', 'right', 'center', 'justify')</span>
                <div><p>指定文本的对齐方式。其中'justify'值仅iOS支持，在Android上会变为<code>left</code></p></div>
            </h6>
        </div>
        <div class="prop"><h6 class="propTitle">textDecorationLine <span class="propType">enum('none', 'underline', 'line-through', 'underline line-through')</span>
        </h6></div>
        <div class="prop"><h6 class="propTitle">textShadowColor <span class="propType"><a
                href="colors.html">color</a></span></h6></div>
        <div class="prop"><h6 class="propTitle">textShadowOffset <span
                class="propType">{width: number, height: number}</span></h6></div>
        <div class="prop"><h6 class="propTitle">textShadowRadius <span class="propType">number</span></h6></div>
        <div class="prop">
            <h6 class="propTitle"><span class="platform">android</span>includeFontPadding <span
                    class="propType">bool</span>
                <div><p>Android在默认情况下会为文字额外保留一些padding，以便留出空间摆放上标或是下标的文字。对于某些字体来说，这些额外的padding可能会导致文字难以垂直居中。如果你把<code>textAlignVertical</code>设置为<code>center</code>之后，文字看起来依然不在正中间，那么可以尝试将本属性设置为<code>false</code>.
                </p></div>
            </h6>
        </div>
        <div class="prop"><h6 class="propTitle"><span class="platform">android</span>textAlignVertical <span
                class="propType">enum('auto', 'top', 'bottom', 'center')</span></h6></div>
        <div class="prop"><h6 class="propTitle"><span class="platform">ios</span>fontVariant <span
                class="propType"><span>[enum('small-caps', 'oldstyle-nums', 'lining-nums', 'tabular-nums', 'proportional-nums')]</span></span>
        </h6></div>
        <div class="prop"><h6 class="propTitle"><span class="platform">ios</span>letterSpacing <span class="propType">number</span>
        </h6></div>
        <div class="prop"><h6 class="propTitle"><span class="platform">ios</span>textDecorationColor <span
                class="propType"><a href="colors.html">color</a></span></h6></div>
        <div class="prop"><h6 class="propTitle"><span class="platform">ios</span>textDecorationStyle <span
                class="propType">enum('solid', 'double', 'dotted', 'dashed')</span></h6></div>
        <div class="prop"><h6 class="propTitle"><span class="platform">ios</span>writingDirection <span
                class="propType">enum('auto', 'ltr', 'rtl')</span></h6></div>
    </div>
</div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="testid"></a>testID <span class="propType">string</span> <a class="hash-link" href="#testid">#</a></h4>
    <div>
      <p>用来在端到端测试中标记这个视图。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="suppresshighlighting"></a><span class="platform">ios</span>suppressHighlighting <span class="propType">bool</span> <a class="hash-link" href="#suppresshighlighting">#</a></h4>
    <div>
      <p>当为true时，如果文本被按下，则没有任何视觉效果。默认情况下，文本被按下时会有一个灰色的、椭圆形的高光。</p>
    </div>
  </div>
</div>


## 嵌套文本

在iOS当中，显示一个格式化文本的方法就是使用`NSAttributedString`：提供你想显示的文本内容，并且使用范围标注来指定一些格式。这种用法非常繁琐。在React Native中，我们决定采用和Web一致的设计，这样你可以把相同格式的文本嵌套包裹起来：

```javascript
<Text style={{fontWeight: 'bold'}}>
  I am bold
  <Text style={{color: 'red'}}>
    and red
  </Text>
</Text>
```

而实际上在框架内部，这会生成一个扁平结构的`NSAttributedString`，包含以下的信息：

```javascript
"I am bold and red"
0-9: bold
9-17: bold, red
```

## 容器

`<Text>`元素在布局上不同于其它组件：在Text内部的元素不再使用flexbox布局，而是采用文本布局。这意味着`<Text>`内部的元素不再是一个个矩形，而可能会在行末进行折叠。

```javascript
<Text>
  <Text>First part and </Text>
  <Text>second part</Text>
</Text>
// Text container: all the text flows as if it was one
// |First part |
// |and second |
// |part       |

<View>
  <Text>First part and </Text>
  <Text>second part</Text>
</View>
// View container: each text is its own block
// |First part |
// |and        |
// |second part|
```

## 样式继承限制

在Web上，要想指定整个文档的字体和大小，我们只需要写：

```css
/* 这段代码是CSS, *不是*React Native */
html {
  font-family: 'lucida grande', tahoma, verdana, arial, sans-serif;
  font-size: 11px;
  color: #141823;
}
```

当浏览器尝试渲染一个文本节点的时候，它会在树中一路向上查询，直到根节点，来找到一个具备`font-size`属性的元素。这个系统一个不好的地方在于**任何**节点都可能会有`font-size`属性，包括`<div>`标签。这个设计为了方便而设计，但实际上语义上并不太正确。

在React Native中，我们把这个问题设计的更加严谨：**你必须把你的文本节点放在`<Text>`组件内**。你不能直接在`<View>`下放置一段文本。

```javascript
// 错误的做法：会导致一个错误。<View>下不能直接放一段文本。
<View>
  一些文本
</View>

// 正确的做法
<View>
  <Text>
    一些文本
  </Text>
</View>
```

并且你也不能直接设置一整颗子树的默认样式。使用一个一致的文本和尺寸的推荐方式是创建一个包含相关样式的组件`MyAppText`，然后在你的App中反复使用它。你还可以创建更多特殊的组件譬如`MyAppHeaderText`来表达不同样式的文本。

```javascript
<View>
  <MyAppText>这个组件包含了一个默认的字体样式，用于整个应用的文本</MyAppText>
  <MyAppHeaderText>这个组件包含了用于标题的样式</MyAppHeaderText>
</View>
```

React Native实际上还是有一部分样式继承的实现，不过仅限于文本标签的子树。在下面的代码里，第二部分会在加粗的同时又显示为红色：

```javascript
<Text style={{fontWeight: 'bold'}}>
  I am bold
  <Text style={{color: 'red'}}>
    and red
  </Text>
</Text>
```

我们相信这种看起来不太舒服的给文本添加样式的方法反而会帮助我们生产更好的App：

- (对开发者来说) React组件在概念上被设计为强隔离性的：你应当可以在应用的任何位置放置一个组件，而且只要属性相同，其外观和表现都将完全相同。文本如果能够继承外面的样式属性，将会打破这种隔离性。

- (对实现者来说) React Native的实现也被简化了。我们不需要在每个元素上都添加一个`fontFamily`字段，并且我们也不需要隐含地在显示文本的时候向上遍历树。唯一的样式继承在原生Text组件中编码，也不会影响到其它组件或者系统本身。
