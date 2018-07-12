---
id: version-0.43-picker
title: Picker
original_id: picker
---

本组件可以在iOS和Android上渲染原生的选择器（Picker）。用例：
```js
<Picker
  selectedValue={this.state.language}
  onValueChange={(lang) => this.setState({language: lang})}>
  <Picker.Item label="Java" value="java" />
  <Picker.Item label="JavaScript" value="js" />
</Picker>
```

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View
        props...</a> <a class="hash-link" href="#view">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onvaluechange"></a>onValueChange <span
            class="propType">function</span> <a class="hash-link" href="#onvaluechange">#</a></h4>
        <div><p>某一项被选中时执行此回调。调用时带有如下参数：
        <ul>
            <li><code>itemValue</code>: 被选中项的<code>value</code>属性</li>
            <li><code>itemPosition</code>: 被选中项在picker中的索引位置</li>
	   	</ul>
        </p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="selectedvalue"></a>selectedValue <span
            class="propType">any</span> <a class="hash-link" href="#selectedvalue">#</a></h4>
        <div><p>默认选中的值。可以是字符串或整数。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="style"></a>style <span class="propType">pickerStyleType</span>
        <a class="hash-link" href="#style">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="testid"></a>testID <span
            class="propType">string</span> <a class="hash-link" href="#testid">#</a></h4>
        <div><p>用于在端对端测试中定位此视图。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="enabled"></a><span class="platform">android</span>enabled
        <span class="propType">bool</span> <a class="hash-link" href="#enabled">#</a></h4>
        <div><p>如果设为false，则会禁用此选择器。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="mode"></a><span class="platform">android</span>mode
        <span class="propType">enum('dialog', 'dropdown')</span> <a class="hash-link" href="#mode">#</a></h4>
        <div><p>在Android上，可以指定在用户点击选择器时，以怎样的形式呈现选项：</p>
            <ul>
                <li><code>dialog</code>（对话框形式）: 显示一个模态对话框。默认选项。</li>
                <li><code>dropdown</code>（下拉框形式）: 以选择器所在位置为锚点展开一个下拉框。</li>
            </ul>
        </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="prompt"></a><span class="platform">android</span>prompt
        <span class="propType">string</span> <a class="hash-link" href="#prompt">#</a></h4>
        <div><p>设置选择器的提示字符串。在Android的对话框模式中用作对话框的标题。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="itemstyle"></a><span class="platform">ios</span>itemStyle
        <span class="propType">itemStylePropType</span> <a class="hash-link" href="#itemstyle">#</a></h4>
        <div><p>指定应用在每项标签上的样式。</p></div>
    </div>
</div>
