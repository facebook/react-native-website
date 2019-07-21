---
id: version-0.48-textinput
title: TextInput
original_id: textinput
---

TextInput是一个允许用户在应用中通过键盘输入文本的基本组件。本组件的属性提供了多种特性的配置，譬如自动完成、自动大小写、占位文字，以及多种不同的键盘类型（如纯数字键盘）等等。

最简单的用法就是丢一个`TextInput`到应用里，然后订阅它的`onChangeText`事件来读取用户的输入。注意，从TextInput里取值这就是目前唯一的做法！即使用`onChangeText`写入state，然后从this.state中取出值。它还有一些其它的事件，譬如`onSubmitEditing`和`onFocus`。一个简单的例子如下：

```ReactNativeWebPlayer
import React, { Component } from 'react';
import { AppRegistry, TextInput } from 'react-native';

class UselessTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: 'Useless Placeholder' };
  }

  render() {
    return (
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
      />
    );
  }
}

// App registration and rendering
AppRegistry.registerComponent('AwesomeProject', () => UselessTextInput);
```

注意有些属性仅在`multiline`为true或者为false的时候有效。此外，当`multiline=false`时，为元素的某一个边添加边框样式（例如：`borderBottomColor`，`borderLeftWidth`等）将不会生效。为了能够实现效果你可以使用一个`View`来包裹`TextInput`：

``` ReactNativeWebPlayer
import React, { Component } from 'react';
import { AppRegistry, View, TextInput } from 'react-native';

class UselessTextInput extends Component {
  render() {
    return (
      <TextInput
        {...this.props} // 将父组件传递来的所有props传递给TextInput;比如下面的multiline和numberOfLines
        editable = {true}
        maxLength = {40}
      />
    );
  }
}

class UselessTextInputMultiline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Useless Multiline Placeholder',
    };
  }

  // 你可以试着输入一种颜色，比如red，那么这个red就会作用到View的背景色样式上
  render() {
    return (
     <View style={{
       backgroundColor: this.state.text,
       borderBottomColor: '#000000',
       borderBottomWidth: 1 }}
     >
       <UselessTextInput
         multiline = {true}
         numberOfLines = {4}
         onChangeText={(text) => this.setState({text})}
         value={this.state.text}
       />
     </View>
    );
  }
}

// App registration and rendering
AppRegistry.registerComponent(
 'AwesomeProject',
 () => UselessTextInputMultiline
);
```

`TextInput`在安卓上默认有一个底边框，同时会有一些padding。如果要想使其看起来和iOS上尽量一致，则需要设置`padding: 0`，同时设置`underlineColorAndroid="transparent"`来去掉底边框。

又，在安卓上如果设置`multiline = {true}`，文本默认会垂直居中，可设置`textAlignVertical: 'top'`样式来使其居顶显示。

又又，在安卓上长按选择文本会导致`windowSoftInputMode`设置变为`adjustResize`，这样可能导致绝对定位的元素被键盘给顶起来。要解决这一问题你需要在AndroidManifest.xml中明确指定合适的`windowSoftInputMode`( <https://developer.android.com/guide/topics/manifest/activity-element.html> )值，或是自己监听事件来处理布局变化。


### 截图
![](/img/components/textinput.png)

### 属性

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="autocapitalize"></a>autoCapitalize <span class="propType">enum('none', 'sentences', 'words', 'characters')</span> <a class="hash-link" href="#autocapitalize">#</a></h4>
        <div>
            <p>控制TextInput是否要自动将特定字符切换为大写：</p>
            <ul>
                <li>characters: 所有的字符。</li>
                <li>words: 每个单词的第一个字符。</li>
                <li>sentences: 每句话的第一个字符（默认）。</li>
                <li>none: 不自动切换任何字符为大写。</li>
            </ul>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="autocorrect"></a>autoCorrect <span class="propType">bool</span> <a class="hash-link" href="#autocorrect">#</a></h4>
        <div>
            <p>如果为false，会关闭拼写自动修正。默认值是true。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="autofocus"></a>autoFocus <span class="propType">bool</span> <a class="hash-link" href="#autofocus">#</a></h4>
        <div>
            <p>如果为true，在componentDidMount后会获得焦点。默认值为false。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="bluronsubmit"></a>blurOnSubmit <span class="propType">bool</span> <a class="hash-link" href="#bluronsubmit">#</a></h4>
        <div>
            <p>如果为true，文本框会在提交的时候失焦。对于单行输入框默认值为true，多行则为false。注意：对于多行输入框来说，如果将blurOnSubmit设为true，则在按下回车键时就会失去焦点同时触发onSubmitEditing事件，而不会换行。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="carethidden"></a>caretHidden <span class="propType">bool</span> <a class="hash-link" href="#carethidden">#</a></h4>
        <div>
            <p>如果为true，则隐藏光标。默认值为false</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="defaultvalue"></a>defaultValue <span class="propType">string</span> <a class="hash-link" href="#defaultvalue">#</a></h4>
        <div>
            <p>提供一个文本框中的初始值。当用户开始输入的时候，值就可以改变。</p>
            <p>在一些简单的使用情形下，如果你不想用监听消息然后更新value属性的方法来保持属性和状态同步的时候，就可以用defaultValue来代替。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="editable"></a>editable <span class="propType">bool</span> <a class="hash-link" href="#editable">#</a></h4>
        <div>
            <p>如果为false，文本框是不可编辑的。默认值为true。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="keyboardtype"></a>keyboardType <span class="propType">enum("default", 'numeric', 'email-address', "ascii-capable", 'numbers-and-punctuation', 'url', 'number-pad', 'phone-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search')</span> <a class="hash-link" href="#keyboardtype">#</a></h4>
        <div>
            <p>决定弹出的何种软键盘的，譬如<code>numeric</code>（纯数字键盘）。</p>
            <p>这些值在所有平台都可用：</p>
            <ul>
	            <li>default</li>
	            <li>numeric</li>
	            <li>email-address</li>
	            <li>phone-pad</li>
            </ul>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="maxlength"></a>maxLength <span class="propType">number</span> <a class="hash-link" href="#maxlength">#</a></h4>
        <div>
            <p>限制文本框中最多的字符数。使用这个属性而不用JS逻辑去实现，可以避免闪烁的现象。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="multiline"></a>multiline <span class="propType">bool</span> <a class="hash-link" href="#multiline">#</a></h4>
        <div>
            <p>如果为true，文本框中可以输入多行文字。默认值为false。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onblur"></a>onBlur <span class="propType">function</span> <a class="hash-link" href="#onblur">#</a></h4>
        <div>
            <p>当文本框失去焦点的时候调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onchange"></a>onChange <span class="propType">function</span> <a class="hash-link" href="#onchange">#</a></h4>
        <div>
            <p>当文本框内容变化时调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onchangetext"></a>onChangeText <span class="propType">function</span> <a class="hash-link" href="#onchangetext">#</a></h4>
        <div>
            <p>当文本框内容变化时调用此回调函数。改变后的文字内容会作为参数传递。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onendediting"></a>onEndEditing <span class="propType">function</span> <a class="hash-link" href="#onendediting">#</a></h4>
        <div>
            <p>当文本输入结束后调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onfocus"></a>onFocus <span class="propType">function</span> <a class="hash-link" href="#onfocus">#</a></h4>
        <div>
            <p>当文本框获得焦点的时候调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onlayout"></a>onLayout <span class="propType">function</span> <a class="hash-link" href="#onlayout">#</a></h4>
        <div>
            <p>当组件挂载或者布局变化的时候调用，参数为<code>{x, y, width, height}</code>。</p>
        </div>
    </div>
    <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="onscroll"></a>onScroll <span class="propType">function</span> <a class="hash-link" href="#onscroll">#</a></h4>
    	<div>
    		<p>在内容滚动时持续调用，传回参数的格式形如<code>{ nativeEvent: { contentOffset: { x, y } } }</code>。
    		也可能包含其他和滚动事件相关的参数，但是在Android上，出于性能考虑，不会提供contentSize参数。</p>
		</div>
	</div>
    <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="onselectionchange"></a>onSelectionChange <span class="propType">function</span> <a class="hash-link" href="#onselectionchange">#</a></h4>
    	<div>
    		<p>长按选择文本时，选择范围变化时调用此函数，传回参数的格式形如
				<code>{ nativeEvent: { selection: { start, end } } }</code>。</p>
		</div>
	</div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onsubmitediting"></a>onSubmitEditing <span class="propType">function</span> <a class="hash-link" href="#onsubmitediting">#</a></h4>
        <div>
            <p>此回调函数当软键盘的`确定`/`提交`按钮被按下的时候调用此函数。如果<code>multiline={true}</code>，此属性不可用。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="placeholder"></a>placeholder <span class="propType">string</span> <a class="hash-link" href="#placeholder">#</a></h4>
        <div>
            <p>如果没有任何文字输入，会显示此字符串。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="placeholdertextcolor"></a>placeholderTextColor <span class="propType"><a href="colors.html">color</a></span> <a class="hash-link" href="#placeholdertextcolor">#</a></h4>
        <div>
            <p>占位字符串显示的文字颜色。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="returnkeytype"></a><span class="platform">ios</span>returnKeyType <span class="propType">enum('done', 'go', 'next', 'search', 'send', 'none', 'previous', 'default', 'emergency-call', 'google', 'join', 'route', 'yahoo')</span> <a class="hash-link" href="#returnkeytype">#</a></h4>
        <div><p>决定“确定”按钮显示的内容。在Android上你还可以使用<code>returnKeyLabel</code>来自定义文本。</p>
		<p><em>跨平台</em></p><p>下列这些选项是跨平台可用的：</p>
		<ul>
			<li><code>done</code></li>
			<li><code>go</code></li>
			<li><code>next</code></li>
			<li><code>search</code></li>
			<li><code>send</code></li>
		</ul>
		<p><em>限Android</em></p><p>下列这些选项仅限Android使用：</p>
		<ul>
			<li><code>none</code></li>
			<li><code>previous</code></li>
		</ul>
		<p><em>限iOS</em></p><p>下列这些选项仅限iOS使用：</p>
		<ul>
			<li><code>default</code></li>
			<li><code>emergency-call</code></li>
			<li><code>google</code></li>
			<li><code>join</code></li>
			<li><code>route</code></li>
			<li><code>yahoo</code></li>
			</ul>
		</div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="securetextentry"></a>secureTextEntry <span class="propType">bool</span> <a class="hash-link" href="#securetextentry">#</a></h4>
        <div>
            <p>如果为true，文本框会遮住之前输入的文字，这样类似密码之类的敏感文字可以更加安全。默认值为false。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="selectTextOnFocus"></a>selectTextOnFocus <span class="propType">bool</span> <a class="hash-link" href="#selectTextOnFocus">#</a></h4>
        <div>
            <p>如果为true，当获得焦点的时候，所有的文字都会被选中。</p>
        </div>
    </div>
    <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="selection"></a>selection <span class="propType">{start: number, end: number}</span> <a class="hash-link" href="#selection">#</a></h4>
    	<div>
    		<p>设置选中文字的范围（指定首尾的索引值）。如果首尾为同一索引位置，则相当于指定光标的位置。</p>
		</div>
	</div>
    <div class="prop">
		<h4 class="propTitle"><a class="anchor" name="selectioncolor"></a>selectionColor <span class="propType"><a href="colors.html">color</a></span> <a class="hash-link" href="#selectioncolor">#</a></h4>
		<div>
		    <p>设置输入框高亮时的颜色（在iOS上还包括光标）</p>
		</div>
	</div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="style"></a>style <span class="propType"><a href="text.html#style">Text#style</a></span> <a class="hash-link" href="#style">#</a></h4>
        <div>
      		<p>译注：这意味着本组件继承了所有Text的样式。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="value"></a>value <span class="propType">string</span> <a class="hash-link" href="#value">#</a></h4>
        <div>
            <p>文本框中的文字内容。</p>
            <p>TextInput是一个受约束的(Controlled)的组件，意味着如果提供了value属性，原生值会被强制与value属性保持一致。在大部分情况下这都工作的很好，不过有些情况下会导致一些闪烁现象——一个常见的原因就是通过不改变value来阻止用户进行编辑。如果你希望阻止用户输入，可以考虑设置<code>editable={false}</code>；如果你是希望限制输入的长度，可以考虑设置<code>maxLength</code>属性，这两个属性都不会导致闪烁。</p>
        </div>
    </div>
    <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="disablefullscreenui"></a><span class="platform">android</span>disableFullscreenUI <span class="propType">bool</span> <a class="hash-link" href="#disablefullscreenui">#</a></h4>
    	<div>
    	<p>When <code>false</code>, if there is a small amount of space available around a text input
			(e.g. landscape orientation on a phone), the OS may choose to have the user edit
			the text inside of a full screen text input mode. When <code>true</code>, this feature is
			disabled and users will always edit the text directly inside of the text input.
			Defaults to <code>false</code>.</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="inlineimageleft"></a><span class="platform">android</span>inlineImageLeft <span class="propType">string</span> <a class="hash-link" href="#inlineimageleft">#</a></h4>
		<div><p>指定一个图片放置在左侧。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="inlineimagepadding"></a><span class="platform">android</span>inlineImagePadding <span class="propType">number</span> <a class="hash-link" href="#inlineimagepadding">#</a></h4>
		<div><p>给放置在左侧的图片设置padding样式。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="returnkeylabel"></a><span class="platform">android</span>returnKeyLabel <span class="propType">string</span> <a class="hash-link" href="#returnkeylabel">#</a></h4>
		<div><p>Sets the return key to the label. Use it instead of <code>returnKeyType</code>.</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="textbreakstrategy"></a><span class="platform">android</span>textBreakStrategy <span class="propType">enum('simple', 'highQuality', 'balanced')</span> <a class="hash-link" href="#textbreakstrategy">#</a></h4>
		<div><p>Set text break strategy on Android API Level 23+, possible values are <code>simple</code>, <code>highQuality</code>, <code>balanced</code>
The default value is <code>simple</code>.</p></div>
	</div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="clearbuttonmode"></a><span class="platform">ios</span>clearButtonMode <span class="propType">enum('never', 'while-editing', 'unless-editing', 'always')</span> <a class="hash-link" href="#clearbuttonmode">#</a></h4>
        <div>
            <p>是否要在文本框右侧显示“清除”按钮。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="cleartextonfocus"></a><span class="platform">ios</span>clearTextOnFocus <span class="propType">bool</span> <a class="hash-link" href="#cleartextonfocus">#</a></h4>
        <div>
            <p>如果为true，每次开始输入的时候都会清除文本框的内容。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="enablesreturnkeyautomatically"></a><span class="platform">ios</span>enablesReturnKeyAutomatically <span class="propType">bool</span> <a class="hash-link" href="#enablesreturnkeyautomatically">#</a></h4>
        <div>
            <p>如果为true，键盘会在文本框内没有文字的时候禁用确认按钮。默认值为false。</p>
        </div>
    </div>
    <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="datadetectortypes"></a><span class="platform">ios</span>dataDetectorTypes <span class="propType">enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'), [object Object]</span> <a class="hash-link" href="#datadetectortypes">#</a></h4>
    	<div>
    		<p>Determines the types of data converted to clickable URLs in the text input. Only valid if <code>multiline={true}</code> and <code>editable={false}</code>. By default no data types are detected.</p><p>You can provide one type or an array of many types.</p><p>Possible values for <code>dataDetectorTypes</code> are:</p>
			<ul>
				<li><code>'phoneNumber'</code></li>
				<li><code>'link'</code></li>
				<li><code>'address'</code></li>
				<li><code>'calendarEvent'</code></li>
				<li><code>'none'</code></li><li><code>'all'</code></li>
			</ul>
		</div>
	</div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="keyboardappearance"></a><span class="platform">ios</span>keyboardAppearance <span class="propType">enum('default', 'light', 'dark')</span> <a class="hash-link" href="#keyboardappearance">#</a></h4>
        <div>
            <p>指定键盘的颜色。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onkeypress"></a><span class="platform">ios</span>onKeyPress <span class="propType">function</span> <a class="hash-link" href="#onkeypress">#</a></h4>
        <div>
            <p>当一个键被按下的时候调用此回调。传递给回调函数的参数为<code>{ nativeEvent: { key: keyValue } }</code>，其中keyValue即为被按下的键。会在onChange之前调用。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="selectionstate"></a><span class="platform">ios</span>selectionState <span class="propType">DocumentSelectionState</span> <a class="hash-link" href="#selectionstate">#</a></h4>
        <div>
            <p>参见<a href="https://github.com/facebook/react-native/blob/master/Libraries/vendor/document/selection/DocumentSelectionState.js">DocumentSelectionState.js</a>，可以控制一个文档中哪段文字被选中的状态。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="numberoflines"></a><span class="platform">android</span>numberOfLines <span class="propType">number</span> <a class="hash-link" href="#numberoflines">#android</a></h4>
        <div>
            <p>设置输入框的行数。当multiline设置为true时使用它，可以占据对应的行数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="underlinecolorandroid"></a><span class="platform">android</span>underlineColorAndroid <span class="propType">string</span> <a class="hash-link" href="#underlinecolorandroid">#</a></h4>
        <div>
            <p>文本框的下划线颜色(译注：如果要去掉文本框的边框，请将此属性设为透明transparent)。</p>
        </div>
    </div>
    <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="spellcheck"></a><span class="platform">ios</span>spellCheck <span class="propType">bool</span> <a class="hash-link" href="#spellcheck">#</a></h4>
    	<div><p>如果设置为<code>false</code>，则禁用拼写检查的样式（比如错误拼写的单词下的红线）。默认值继承自<code>autoCorrect</code>.</p></div>
	</div>
</div>



### 方法

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="isfocused"></a>isFocused<span class="propType">(): boolean</span>
        <a class="hash-link" href="#isfocused">#</a></h4>
        <div><p>返回值表明当前输入框是否获得了焦点。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="clear"></a>clear<span class="propType">()</span> <a
            class="hash-link" href="#clear">#</a></h4>
        <div><p>清空输入框的内容。</p></div>
    </div>
</div>

### 例子

#### iOS  
```jsx
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Text,
  TextInput,
  View,
  StyleSheet,
} = ReactNative;

class WithLabel extends React.Component {
  render() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.label}>
          <Text>{this.props.label}</Text>
        </View>
        {this.props.children}
      </View>
    );
  }
}

class TextEventsExample extends React.Component {
  state = {
    curText: '<No Event>',
    prevText: '<No Event>',
    prev2Text: '<No Event>',
    prev3Text: '<No Event>',
  };

  updateText = (text) => {
    this.setState((state) => {
      return {
        curText: text,
        prevText: state.curText,
        prev2Text: state.prevText,
        prev3Text: state.prev2Text,
      };
    });
  };

  render() {
    return (
      <View>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter text to see events"
          autoCorrect={false}
          onFocus={() => this.updateText('onFocus')}
          onBlur={() => this.updateText('onBlur')}
          onChange={(event) => this.updateText(
            'onChange text: ' + event.nativeEvent.text
          )}
          onEndEditing={(event) => this.updateText(
            'onEndEditing text: ' + event.nativeEvent.text
          )}
          onSubmitEditing={(event) => this.updateText(
            'onSubmitEditing text: ' + event.nativeEvent.text
          )}
          onSelectionChange={(event) => this.updateText(
            'onSelectionChange range: ' +
              event.nativeEvent.selection.start + ',' +
              event.nativeEvent.selection.end
          )}
          onKeyPress={(event) => {
            this.updateText('onKeyPress key: ' + event.nativeEvent.key);
          }}
          style={styles.default}
        />
        <Text style={styles.eventLabel}>
          {this.state.curText}{'\n'}
          (prev: {this.state.prevText}){'\n'}
          (prev2: {this.state.prev2Text}){'\n'}
          (prev3: {this.state.prev3Text})
        </Text>
      </View>
    );
  }
}

class AutoExpandingTextInput extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {
      text: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. The focus of React Native is on developer efficiency across all the platforms you care about — learn once, write anywhere. Facebook uses React Native in multiple production apps and will continue investing in React Native.',
      height: 0,
    };
  }
  render() {
    return (
      <TextInput
        {...this.props}
        multiline={true}
        onChangeText={(text) => {
          this.setState({text});
        }}
        onContentSizeChange={(event) => {
          this.setState({height: event.nativeEvent.contentSize.height});
        }}
        style={[styles.default, {height: Math.max(35, this.state.height)}]}
        value={this.state.text}
      />
    );
  }
}

class RewriteExample extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    var limit = 20;
    var remainder = limit - this.state.text.length;
    var remainderColor = remainder > 5 ? 'blue' : 'red';
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          multiline={false}
          maxLength={limit}
          onChangeText={(text) => {
            text = text.replace(/ /g, '_');
            this.setState({text});
          }}
          style={styles.default}
          value={this.state.text}
        />
        <Text style={[styles.remainder, {color: remainderColor}]}>
          {remainder}
        </Text>
      </View>
    );
  }
}

class RewriteExampleInvalidCharacters extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          multiline={false}
          onChangeText={(text) => {
            this.setState({text: text.replace(/\s/g, '')});
          }}
          style={styles.default}
          value={this.state.text}
        />
      </View>
    );
  }
}

class TokenizedTextExample extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {text: 'Hello #World'};
  }
  render() {

    //define delimiter
    let delimiter = /\s+/;

    //split string
    let _text = this.state.text;
    let token, index, parts = [];
    while (_text) {
      delimiter.lastIndex = 0;
      token = delimiter.exec(_text);
      if (token === null) {
        break;
      }
      index = token.index;
      if (token[0].length === 0) {
        index = 1;
      }
      parts.push(_text.substr(0, index));
      parts.push(token[0]);
      index = index + token[0].length;
      _text = _text.slice(index);
    }
    parts.push(_text);

    //highlight hashtags
    parts = parts.map((text) => {
      if (/^#/.test(text)) {
        return <Text key={text} style={styles.hashtag}>{text}</Text>;
      } else {
        return text;
      }
    });

    return (
      <View>
        <TextInput
          multiline={true}
          style={styles.multiline}
          onChangeText={(text) => {
            this.setState({text});
          }}>
          <Text>{parts}</Text>
        </TextInput>
      </View>
    );
  }
}

class BlurOnSubmitExample extends React.Component {
  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  render() {
    return (
      <View>
        <TextInput
          ref="1"
          style={styles.default}
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <TextInput
          ref="2"
          style={styles.default}
          keyboardType="email-address"
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('3')}
        />
        <TextInput
          ref="3"
          style={styles.default}
          keyboardType="url"
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('4')}
        />
        <TextInput
          ref="4"
          style={styles.default}
          keyboardType="numeric"
          placeholder="blurOnSubmit = false"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('5')}
        />
        <TextInput
          ref="5"
          style={styles.default}
          keyboardType="numbers-and-punctuation"
          placeholder="blurOnSubmit = true"
          returnKeyType="done"
        />
      </View>
    );
  }
}

type SelectionExampleState = {
  selection: {
    start: number;
    end?: number;
  };
  value: string;
};

class SelectionExample extends React.Component {
  state: SelectionExampleState;

  _textInput: any;

  constructor(props) {
    super(props);
    this.state = {
      selection: {start: 0, end: 0},
      value: props.value
    };
  }

  onSelectionChange({nativeEvent: {selection}}) {
    this.setState({selection});
  }

  getRandomPosition() {
    var length = this.state.value.length;
    return Math.round(Math.random() * length);
  }

  select(start, end) {
    this._textInput.focus();
    this.setState({selection: {start, end}});
  }

  selectRandom() {
    var positions = [this.getRandomPosition(), this.getRandomPosition()].sort();
    this.select(...positions);
  }

  placeAt(position) {
    this.select(position, position);
  }

  placeAtRandom() {
    this.placeAt(this.getRandomPosition());
  }

  render() {
    var length = this.state.value.length;

    return (
      <View>
        <TextInput
          multiline={this.props.multiline}
          onChangeText={(value) => this.setState({value})}
          onSelectionChange={this.onSelectionChange.bind(this)}
          ref={textInput => (this._textInput = textInput)}
          selection={this.state.selection}
          style={this.props.style}
          value={this.state.value}
        />
        <View>
          <Text>
            selection = {JSON.stringify(this.state.selection)}
          </Text>
          <Text onPress={this.placeAt.bind(this, 0)}>
            Place at Start (0, 0)
          </Text>
          <Text onPress={this.placeAt.bind(this, length)}>
            Place at End ({length}, {length})
          </Text>
          <Text onPress={this.placeAtRandom.bind(this)}>
            Place at Random
          </Text>
          <Text onPress={this.select.bind(this, 0, length)}>
            Select All
          </Text>
          <Text onPress={this.selectRandom.bind(this)}>
            Select Random
          </Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  page: {
    paddingBottom: 300,
  },
  default: {
    height: 26,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    padding: 4,
  },
  multiline: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    height: 50,
    padding: 4,
    marginBottom: 4,
  },
  multilineWithFontStyles: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'Cochin',
    height: 60,
  },
  multilineChild: {
    width: 50,
    height: 40,
    position: 'absolute',
    right: 5,
    backgroundColor: 'red',
  },
  eventLabel: {
    margin: 3,
    fontSize: 12,
  },
  labelContainer: {
    flexDirection: 'row',
    marginVertical: 2,
    flex: 1,
  },
  label: {
    width: 115,
    alignItems: 'flex-end',
    marginRight: 10,
    paddingTop: 2,
  },
  rewriteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  remainder: {
    textAlign: 'right',
    width: 24,
  },
  hashtag: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

exports.displayName = (undefined: ?string);
exports.title = '<TextInput>';
exports.description = 'Single and multi-line text inputs.';
exports.examples = [
  {
    title: 'Auto-focus',
    render: function() {
      return (
        <TextInput
          autoFocus={true}
          style={styles.default}
          accessibilityLabel="I am the accessibility label for text input"
        />
      );
    }
  },
  {
    title: "Live Re-Write (<sp>  ->  '_') + maxLength",
    render: function() {
      return <RewriteExample />;
    }
  },
  {
    title: 'Live Re-Write (no spaces allowed)',
    render: function() {
      return <RewriteExampleInvalidCharacters />;
    }
  },
  {
    title: 'Auto-capitalize',
    render: function() {
      return (
        <View>
          <WithLabel label="none">
            <TextInput
              autoCapitalize="none"
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="sentences">
            <TextInput
              autoCapitalize="sentences"
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="words">
            <TextInput
              autoCapitalize="words"
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="characters">
            <TextInput
              autoCapitalize="characters"
              style={styles.default}
            />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Auto-correct',
    render: function() {
      return (
        <View>
          <WithLabel label="true">
            <TextInput autoCorrect={true} style={styles.default} />
          </WithLabel>
          <WithLabel label="false">
            <TextInput autoCorrect={false} style={styles.default} />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Keyboard types',
    render: function() {
      var keyboardTypes = [
        'default',
        'ascii-capable',
        'numbers-and-punctuation',
        'url',
        'number-pad',
        'phone-pad',
        'name-phone-pad',
        'email-address',
        'decimal-pad',
        'twitter',
        'web-search',
        'numeric',
      ];
      var examples = keyboardTypes.map((type) => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput
              keyboardType={type}
              style={styles.default}
            />
          </WithLabel>
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Keyboard appearance',
    render: function() {
      var keyboardAppearance = [
        'default',
        'light',
        'dark',
      ];
      var examples = keyboardAppearance.map((type) => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput
              keyboardAppearance={type}
              style={styles.default}
            />
          </WithLabel>
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Return key types',
    render: function() {
      var returnKeyTypes = [
        'default',
        'go',
        'google',
        'join',
        'next',
        'route',
        'search',
        'send',
        'yahoo',
        'done',
        'emergency-call',
      ];
      var examples = returnKeyTypes.map((type) => {
        return (
          <WithLabel key={type} label={type}>
            <TextInput
              returnKeyType={type}
              style={styles.default}
            />
          </WithLabel>
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Enable return key automatically',
    render: function() {
      return (
        <View>
          <WithLabel label="true">
            <TextInput enablesReturnKeyAutomatically={true} style={styles.default} />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Secure text entry',
    render: function() {
      return (
        <View>
          <WithLabel label="true">
            <TextInput secureTextEntry={true} style={styles.default} defaultValue="abc" />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Event handling',
    render: function(): React.Element<any> { return <TextEventsExample />; },
  },
  {
    title: 'Colored input text',
    render: function() {
      return (
        <View>
          <TextInput
            style={[styles.default, {color: 'blue'}]}
            defaultValue="Blue"
          />
          <TextInput
            style={[styles.default, {color: 'green'}]}
            defaultValue="Green"
          />
        </View>
      );
    }
  },
  {
    title: 'Colored highlight/cursor for text input',
    render: function() {
      return (
        <View>
          <TextInput
            style={styles.default}
            selectionColor={"green"}
            defaultValue="Highlight me"
          />
          <TextInput
            style={styles.default}
            selectionColor={"rgba(86, 76, 205, 1)"}
            defaultValue="Highlight me"
          />
        </View>
      );
    }
  },
  {
    title: 'Clear button mode',
    render: function () {
      return (
        <View>
          <WithLabel label="never">
            <TextInput
              style={styles.default}
              clearButtonMode="never"
            />
          </WithLabel>
          <WithLabel label="while editing">
            <TextInput
              style={styles.default}
              clearButtonMode="while-editing"
            />
          </WithLabel>
          <WithLabel label="unless editing">
            <TextInput
              style={styles.default}
              clearButtonMode="unless-editing"
            />
          </WithLabel>
          <WithLabel label="always">
            <TextInput
              style={styles.default}
              clearButtonMode="always"
            />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Clear and select',
    render: function() {
      return (
        <View>
          <WithLabel label="clearTextOnFocus">
            <TextInput
              placeholder="text is cleared on focus"
              defaultValue="text is cleared on focus"
              style={styles.default}
              clearTextOnFocus={true}
            />
          </WithLabel>
          <WithLabel label="selectTextOnFocus">
            <TextInput
              placeholder="text is selected on focus"
              defaultValue="text is selected on focus"
              style={styles.default}
              selectTextOnFocus={true}
            />
          </WithLabel>
        </View>
      );
    }
  },
  {
    title: 'Blur on submit',
    render: function(): React.Element<any> { return <BlurOnSubmitExample />; },
  },
  {
    title: 'Multiline blur on submit',
    render: function() {
      return (
        <View>
          <TextInput
            style={styles.multiline}
            placeholder="blurOnSubmit = true"
            returnKeyType="next"
            blurOnSubmit={true}
            multiline={true}
            onSubmitEditing={event => alert(event.nativeEvent.text)}
          />
        </View>
      );
    }
  },
  {
    title: 'Multiline',
    render: function() {
      return (
        <View>
          <TextInput
            placeholder="multiline text input"
            multiline={true}
            style={styles.multiline}
          />
          <TextInput
            placeholder="multiline text input with font styles and placeholder"
            multiline={true}
            clearTextOnFocus={true}
            autoCorrect={true}
            autoCapitalize="words"
            placeholderTextColor="red"
            keyboardType="url"
            style={[styles.multiline, styles.multilineWithFontStyles]}
          />
          <TextInput
            placeholder="multiline text input with max length"
            maxLength={5}
            multiline={true}
            style={styles.multiline}
          />
          <TextInput
            placeholder="uneditable multiline text input"
            editable={false}
            multiline={true}
            style={styles.multiline}
          />
          <TextInput
            defaultValue="uneditable multiline text input with phone number detection: 88888888."
            editable={false}
            multiline={true}
            style={styles.multiline}
            dataDetectorTypes="phoneNumber"
          />
          <TextInput
            placeholder="multiline with children"
            multiline={true}
            enablesReturnKeyAutomatically={true}
            returnKeyType="go"
            style={styles.multiline}>
            <View style={styles.multilineChild}/>
          </TextInput>
        </View>
      );
    }
  },
  {
    title: 'Auto-expanding',
    render: function() {
      return (
        <View>
          <AutoExpandingTextInput
            placeholder="height increases with content"
            enablesReturnKeyAutomatically={true}
            returnKeyType="default"
          />
        </View>
      );
    }
  },
  {
    title: 'Attributed text',
    render: function() {
      return <TokenizedTextExample />;
    }
  },
  {
    title: 'Text selection & cursor placement',
    render: function() {
      return (
        <View>
          <SelectionExample
            style={styles.default}
            value="text selection can be changed"
          />
          <SelectionExample
            multiline
            style={styles.multiline}
            value={"multiline text selection\ncan also be changed"}
          />
        </View>
      );
    }
  },
  {
    title: 'TextInput maxLength',
    render: function() {
      return (
        <View>
          <WithLabel label="maxLength: 5">
            <TextInput
              maxLength={5}
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="maxLength: 5 with placeholder">
            <TextInput
              maxLength={5}
              placeholder="ZIP code entry"
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="maxLength: 5 with default value already set">
            <TextInput
              maxLength={5}
              defaultValue="94025"
              style={styles.default}
            />
          </WithLabel>
          <WithLabel label="maxLength: 5 with very long default value already set">
            <TextInput
              maxLength={5}
              defaultValue="9402512345"
              style={styles.default}
            />
          </WithLabel>
        </View>
      );
    }
  },
];
```

#### Android

```jsx  
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Text,
  TextInput,
  View,
  StyleSheet,
} = ReactNative;

class TextEventsExample extends React.Component {
  state = {
    curText: '<No Event>',
    prevText: '<No Event>',
    prev2Text: '<No Event>',
  };

  updateText = (text) => {
    this.setState((state) => {
      return {
        curText: text,
        prevText: state.curText,
        prev2Text: state.prevText,
      };
    });
  };

  render() {
    return (
      <View>
        <TextInput
          autoCapitalize="none"
          placeholder="Enter text to see events"
          autoCorrect={false}
          onFocus={() => this.updateText('onFocus')}
          onBlur={() => this.updateText('onBlur')}
          onChange={(event) => this.updateText(
            'onChange text: ' + event.nativeEvent.text
          )}
          onEndEditing={(event) => this.updateText(
            'onEndEditing text: ' + event.nativeEvent.text
          )}
          onSubmitEditing={(event) => this.updateText(
            'onSubmitEditing text: ' + event.nativeEvent.text
          )}
          style={styles.singleLine}
        />
        <Text style={styles.eventLabel}>
          {this.state.curText}{'\n'}
          (prev: {this.state.prevText}){'\n'}
          (prev2: {this.state.prev2Text})
        </Text>
      </View>
    );
  }
}

class AutoExpandingTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'React Native enables you to build world-class application experiences on native platforms using a consistent developer experience based on JavaScript and React. The focus of React Native is on developer efficiency across all the platforms you care about — learn once, write anywhere. Facebook uses React Native in multiple production apps and will continue investing in React Native.',
      height: 0,
    };
  }
  render() {
    return (
      <TextInput
        {...this.props}
        multiline={true}
        onContentSizeChange={(event) => {
          this.setState({height: event.nativeEvent.contentSize.height});
        }}
        onChangeText={(text) => {
          this.setState({text});
        }}
        style={[styles.default, {height: Math.max(35, this.state.height)}]}
        value={this.state.text}
      />
    );
  }
}

class RewriteExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    var limit = 20;
    var remainder = limit - this.state.text.length;
    var remainderColor = remainder > 5 ? 'blue' : 'red';
    return (
      <View style={styles.rewriteContainer}>
        <TextInput
          multiline={false}
          maxLength={limit}
          onChangeText={(text) => {
            text = text.replace(/ /g, '_');
            this.setState({text});
          }}
          style={styles.default}
          value={this.state.text}
        />
        <Text style={[styles.remainder, {color: remainderColor}]}>
          {remainder}
        </Text>
      </View>
    );
  }
}

class TokenizedTextExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: 'Hello #World'};
  }
  render() {

    //define delimiter
    let delimiter = /\s+/;

    //split string
    let _text = this.state.text;
    let token, index, parts = [];
    while (_text) {
      delimiter.lastIndex = 0;
      token = delimiter.exec(_text);
      if (token === null) {
        break;
      }
      index = token.index;
      if (token[0].length === 0) {
        index = 1;
      }
      parts.push(_text.substr(0, index));
      parts.push(token[0]);
      index = index + token[0].length;
      _text = _text.slice(index);
    }
    parts.push(_text);

    //highlight hashtags
    parts = parts.map((text) => {
      if (/^#/.test(text)) {
        return <Text key={text} style={styles.hashtag}>{text}</Text>;
      } else {
        return text;
      }
    });

    return (
      <View>
        <TextInput
          multiline={true}
          style={styles.multiline}
          onChangeText={(text) => {
            this.setState({text});
          }}>
          <Text>{parts}</Text>
        </TextInput>
      </View>
    );
  }
}

class BlurOnSubmitExample extends React.Component {
  focusNextField = (nextField) => {
    this.refs[nextField].focus();
  };

  render() {
    return (
      <View>
        <TextInput
          ref="1"
          style={styles.singleLine}
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('2')}
        />
        <TextInput
          ref="2"
          style={styles.singleLine}
          keyboardType="email-address"
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('3')}
        />
        <TextInput
          ref="3"
          style={styles.singleLine}
          keyboardType="url"
          placeholder="blurOnSubmit = false"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('4')}
        />
        <TextInput
          ref="4"
          style={styles.singleLine}
          keyboardType="numeric"
          placeholder="blurOnSubmit = false"
          blurOnSubmit={false}
          onSubmitEditing={() => this.focusNextField('5')}
        />
        <TextInput
          ref="5"
          style={styles.singleLine}
          keyboardType="numbers-and-punctuation"
          placeholder="blurOnSubmit = true"
          returnKeyType="done"
        />
      </View>
    );
  }
}

class ToggleDefaultPaddingExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {hasPadding: false};
  }
  render() {
    return (
      <View>
        <TextInput style={this.state.hasPadding ? { padding: 0 } : null}/>
        <Text onPress={() => this.setState({hasPadding: !this.state.hasPadding})}>
          Toggle padding
        </Text>
      </View>
    );
  }
}

type SelectionExampleState = {
  selection: {
    start: number;
    end: number;
  };
  value: string;
};

class SelectionExample extends React.Component {
  state: SelectionExampleState;

  _textInput: any;

  constructor(props) {
    super(props);
    this.state = {
      selection: {start: 0, end: 0},
      value: props.value
    };
  }

  onSelectionChange({nativeEvent: {selection}}) {
    this.setState({selection});
  }

  getRandomPosition() {
    var length = this.state.value.length;
    return Math.round(Math.random() * length);
  }

  select(start, end) {
    this._textInput.focus();
    this.setState({selection: {start, end}});
  }

  selectRandom() {
    var positions = [this.getRandomPosition(), this.getRandomPosition()].sort();
    this.select(...positions);
  }

  placeAt(position) {
    this.select(position, position);
  }

  placeAtRandom() {
    this.placeAt(this.getRandomPosition());
  }

  render() {
    var length = this.state.value.length;

    return (
      <View>
        <TextInput
          multiline={this.props.multiline}
          onChangeText={(value) => this.setState({value})}
          onSelectionChange={this.onSelectionChange.bind(this)}
          ref={textInput => (this._textInput = textInput)}
          selection={this.state.selection}
          style={this.props.style}
          value={this.state.value}
        />
        <View>
          <Text>
            selection = {JSON.stringify(this.state.selection)}
          </Text>
          <Text onPress={this.placeAt.bind(this, 0)}>
            Place at Start (0, 0)
          </Text>
          <Text onPress={this.placeAt.bind(this, length)}>
            Place at End ({length}, {length})
          </Text>
          <Text onPress={this.placeAtRandom.bind(this)}>
            Place at Random
          </Text>
          <Text onPress={this.select.bind(this, 0, length)}>
            Select All
          </Text>
          <Text onPress={this.selectRandom.bind(this)}>
            Select Random
          </Text>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  multiline: {
    height: 60,
    fontSize: 16,
    padding: 4,
    marginBottom: 10,
  },
  eventLabel: {
    margin: 3,
    fontSize: 12,
  },
  singleLine: {
    fontSize: 16,
    padding: 4,
  },
  singleLineWithHeightTextInput: {
    height: 30,
  },
  hashtag: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

exports.title = '<TextInput>';
exports.description = 'Single and multi-line text inputs.';
exports.examples = [
  {
    title: 'Auto-focus',
    render: function() {
      return (
        <TextInput
          autoFocus={true}
          style={styles.singleLine}
          accessibilityLabel="I am the accessibility label for text input"
        />
      );
    }
  },
  {
    title: "Live Re-Write (<sp>  ->  '_')",
    render: function() {
      return <RewriteExample />;
    }
  },
  {
    title: 'Auto-capitalize',
    render: function() {
      var autoCapitalizeTypes = [
        'none',
        'sentences',
        'words',
        'characters',
      ];
      var examples = autoCapitalizeTypes.map((type) => {
        return (
          <TextInput
            key={type}
            autoCapitalize={type}
            placeholder={'autoCapitalize: ' + type}
            style={styles.singleLine}
          />
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Auto-correct',
    render: function() {
      return (
        <View>
          <TextInput
            autoCorrect={true}
            placeholder="This has autoCorrect"
            style={styles.singleLine}
          />
          <TextInput
            autoCorrect={false}
            placeholder="This does not have autoCorrect"
            style={styles.singleLine}
          />
        </View>
      );
    }
  },
  {
    title: 'Keyboard types',
    render: function() {
      var keyboardTypes = [
        'default',
        'email-address',
        'numeric',
        'phone-pad',
      ];
      var examples = keyboardTypes.map((type) => {
        return (
          <TextInput
            key={type}
            keyboardType={type}
            placeholder={'keyboardType: ' + type}
            style={styles.singleLine}
          />
        );
      });
      return <View>{examples}</View>;
    }
  },
  {
    title: 'Blur on submit',
    render: function(): React.Element { return <BlurOnSubmitExample />; },
  },
  {
    title: 'Event handling',
    render: function(): React.Element { return <TextEventsExample />; },
  },
  {
    title: 'Colors and text inputs',
    render: function() {
      return (
        <View>
          <TextInput
            style={[styles.singleLine]}
            defaultValue="Default color text"
          />
          <TextInput
            style={[styles.singleLine, {color: 'green'}]}
            defaultValue="Green Text"
          />
          <TextInput
            placeholder="Default placeholder text color"
            style={styles.singleLine}
          />
          <TextInput
            placeholder="Red placeholder text color"
            placeholderTextColor="red"
            style={styles.singleLine}
          />
          <TextInput
            placeholder="Default underline color"
            style={styles.singleLine}
          />
          <TextInput
            placeholder="Blue underline color"
            style={styles.singleLine}
            underlineColorAndroid="blue"
          />
          <TextInput
            defaultValue="Same BackgroundColor as View "
            style={[styles.singleLine, {backgroundColor: 'rgba(100, 100, 100, 0.3)'}]}>
            <Text style={{backgroundColor: 'rgba(100, 100, 100, 0.3)'}}>
              Darker backgroundColor
            </Text>
          </TextInput>
          <TextInput
            defaultValue="Highlight Color is red"
            selectionColor={'red'}
            style={styles.singleLine}>
          </TextInput>
        </View>
      );
    }
  },
  {
    title: 'Text input, themes and heights',
    render: function() {
      return (
        <TextInput
          placeholder="If you set height, beware of padding set from themes"
          style={[styles.singleLineWithHeightTextInput]}
        />
      );
    }
  },
  {
    title: 'fontFamily, fontWeight and fontStyle',
    render: function() {
      return (
        <View>
          <TextInput
            style={[styles.singleLine, {fontFamily: 'sans-serif'}]}
            placeholder="Custom fonts like Sans-Serif are supported"
          />
          <TextInput
            style={[styles.singleLine, {fontFamily: 'sans-serif', fontWeight: 'bold'}]}
            placeholder="Sans-Serif bold"
          />
          <TextInput
            style={[styles.singleLine, {fontFamily: 'sans-serif', fontStyle: 'italic'}]}
            placeholder="Sans-Serif italic"
          />
          <TextInput
            style={[styles.singleLine, {fontFamily: 'serif'}]}
            placeholder="Serif"
          />
        </View>
      );
    }
  },
  {
    title: 'Passwords',
    render: function() {
      return (
        <View>
          <TextInput
            defaultValue="iloveturtles"
            secureTextEntry={true}
            style={styles.singleLine}
          />
          <TextInput
            secureTextEntry={true}
            style={[styles.singleLine, {color: 'red'}]}
            placeholder="color is supported too"
            placeholderTextColor="red"
          />
        </View>
      );
    }
  },
  {
    title: 'Editable',
    render: function() {
      return (
        <TextInput
           defaultValue="Can't touch this! (>'-')> ^(' - ')^ <('-'<) (>'-')> ^(' - ')^"
           editable={false}
           style={styles.singleLine}
         />
      );
    }
  },
  {
    title: 'Multiline',
    render: function() {
      return (
        <View>
          <TextInput
            autoCorrect={true}
            placeholder="multiline, aligned top-left"
            placeholderTextColor="red"
            multiline={true}
            style={[styles.multiline, {textAlign: 'left', textAlignVertical: 'top'}]}
          />
          <TextInput
            autoCorrect={true}
            placeholder="multiline, aligned center"
            placeholderTextColor="green"
            multiline={true}
            style={[styles.multiline, {textAlign: 'center', textAlignVertical: 'center'}]}
          />
          <TextInput
            autoCorrect={true}
            multiline={true}
            style={[styles.multiline, {color: 'blue'}, {textAlign: 'right', textAlignVertical: 'bottom'}]}>
            <Text style={styles.multiline}>multiline with children, aligned bottom-right</Text>
          </TextInput>
        </View>
      );
    }
  },
  {
    title: 'Fixed number of lines',
    platform: 'android',
    render: function() {
      return (
        <View>
          <TextInput numberOfLines={2}
            multiline={true}
            placeholder="Two line input"
          />
          <TextInput numberOfLines={5}
            multiline={true}
            placeholder="Five line input"
          />
        </View>
      );
    }
  },
  {
    title: 'Auto-expanding',
    render: function() {
      return (
        <View>
          <AutoExpandingTextInput
            placeholder="height increases with content"
            enablesReturnKeyAutomatically={true}
            returnKeyType="done"
          />
        </View>
      );
    }
  },
  {
    title: 'Attributed text',
    render: function() {
      return <TokenizedTextExample />;
    }
  },
  {
    title: 'Return key',
    render: function() {
      var returnKeyTypes = [
        'none',
        'go',
        'search',
        'send',
        'done',
        'previous',
        'next',
      ];
      var returnKeyLabels = [
        'Compile',
        'React Native',
      ];
      var examples = returnKeyTypes.map((type) => {
        return (
          <TextInput
            key={type}
            returnKeyType={type}
            placeholder={'returnKeyType: ' + type}
            style={styles.singleLine}
          />
        );
      });
      var types = returnKeyLabels.map((type) => {
        return (
          <TextInput
            key={type}
            returnKeyLabel={type}
            placeholder={'returnKeyLabel: ' + type}
            style={styles.singleLine}
          />
        );
      });
      return <View>{examples}{types}</View>;
    }
  },
  {
    title: 'Inline Images',
    render: function() {
      return (
        <View>
          <TextInput
            inlineImageLeft="ic_menu_black_24dp"
            placeholder="This has drawableLeft set"
            style={styles.singleLine}
          />
          <TextInput
            inlineImageLeft="ic_menu_black_24dp"
            inlineImagePadding={30}
            placeholder="This has drawableLeft and drawablePadding set"
            style={styles.singleLine}
          />
          <TextInput
            placeholder="This does not have drawable props set"
            style={styles.singleLine}
          />
        </View>
      );
    }
  },
  {
    title: 'Toggle Default Padding',
    render: function(): React.Element { return <ToggleDefaultPaddingExample />; },
  },
  {
    title: 'Text selection & cursor placement',
    render: function() {
      return (
        <View>
          <SelectionExample
            style={styles.default}
            value="text selection can be changed"
          />
          <SelectionExample
            multiline
            style={styles.multiline}
            value={"multiline text selection\ncan also be changed"}
          />
        </View>
      );
    }
  },
];
```
