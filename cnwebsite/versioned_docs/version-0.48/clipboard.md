---
id: version-0.48-clipboard
title: Clipboard
original_id: clipboard
---

`Clipboard`组件可以在iOS和Android的剪贴板中读写内容。

### 方法

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getstring"></a><span class="propType">static </span>getString<span
            class="propType">()</span> <a class="hash-link" href="docs/clipboard.html#getstring">#</a></h4>
        <div><p>获取剪贴板的文本内容，返回一个<code>Promise</code>你可以用下面的方式来调用。</p>
            <div class="prism language-javascript">async <span class="token function">_getContent<span
                    class="token punctuation">(</span></span><span class="token punctuation">)</span> <span
                    class="token punctuation">{</span>
                <span class="token keyword">var</span> content <span class="token operator">=</span> await
                Clipboard<span class="token punctuation">.</span><span class="token function">getString<span
                        class="token punctuation">(</span></span><span class="token punctuation">)</span><span
                        class="token punctuation">;</span>
                <span class="token punctuation">}</span></div>
        </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="setstring"></a><span class="propType">static </span>setString<span
            class="propType">(content: string)</span> <a class="hash-link" href="docs/clipboard.html#setstring">#</a>
    </h4>
        <div><p>设置剪贴板的文本内容。你可以用下面的方式来调用。</p>
            <div class="prism language-javascript"><span class="token function">_setContent<span
                    class="token punctuation">(</span></span><span class="token punctuation">)</span> <span
                    class="token punctuation">{</span>
                Clipboard<span class="token punctuation">.</span><span class="token function">setString<span
                        class="token punctuation">(</span></span><span class="token string">'hello world'</span><span
                        class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span></div></div>
    </div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Clipboard,
  View,
  Text,
} = ReactNative;

var ClipboardExample = React.createClass({
  getInitialState() {
    return {
      content: 'Content will appear here'
    };
  },

  async _setClipboardContent(){
    Clipboard.setString('Hello World');
    try {
      var content = await Clipboard.getString();
      this.setState({content});
    } catch (e) {
      this.setState({content:e.message});
    }
  },

  render() {
    return (
      <View>
        <Text onPress={this._setClipboardContent} style={{color: 'blue'}}>
          Tap to put "Hello World" in the clipboard
        </Text>
        <Text style={{color: 'red', marginTop: 20}}>
          {this.state.content}
        </Text>
      </View>
    );
  }
});

exports.title = 'Clipboard';
exports.description = 'Show Clipboard contents.';
exports.examples = [
  {
    title: 'Clipboard.setString() and getString()',
    render() {
      return <ClipboardExample/>;
    }
  }
];
```
