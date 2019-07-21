---
id: version-0.43-webview
title: WebView
original_id: webview
---

创建一个原生的WebView，可以用于访问一个网页。

### 截图
![](/img/components/webview.png)

### 属性

<div class="props">
	<div class="prop">
	<h4 class="propTitle"><a class="anchor" name="allowsinlinemediaplayback"></a><span class="platform">ios</span>allowsInlineMediaPlayback <span class="propType">bool</span> <a class="hash-link" href="#allowsinlinemediaplayback">#</a></h4>
	<div><p>指定HTML5视频是在网页当前位置播放还是使用原生的全屏播放器播放。
	默认值为<code>false</code>。</p>
	<p><strong>注意</strong> : 要让视频在网页中播放，不光要将这个属性设为true，HTML中的视频元素本身也需要包含<code>webkit-playsinline</code>属性。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="automaticallyadjustcontentinsets"></a>automaticallyAdjustContentInsets <span class="propType">bool</span> <a class="hash-link" href="#automaticallyadjustcontentinsets">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="bounces"></a><span class="platform">ios</span>bounces <span class="propType">bool</span> <a class="hash-link" href="#bounces">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="contentinset"></a>contentInset <span class="propType">{top: number, left: number, bottom: number, right: number}</span> <a class="hash-link" href="#contentinset">#</a></h4>
	</div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="datadetectortypes"></a><span class="platform">ios</span>dataDetectorTypes <span class="propType">enum('phoneNumber', 'link', 'address', 'calendarEvent', 'none', 'all'), [object Object]</span> <a class="hash-link" href="#datadetectortypes">#</a></h4><div>
    <p>探测网页中某些特殊数据类型，自动生成可点击的链接，默认情况下仅允许探测电话号码。</p><p>你可以指定探测下述类型中的一种，或者使用数组来指定多个类型。</p>
    <p><code>dataDetectorTypes</code>的可选值：</p>
    <ul>
      <li><code>'phoneNumber'</code></li>
      <li><code>'link'</code></li>
      <li><code>'address'</code></li>
      <li><code>'calendarEvent'</code></li>
      <li><code>'none'</code></li>
      <li><code>'all'</code></li>
    </ul>
    </div>
  </div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="decelerationrate"></a><span class="platform">ios</span>decelerationRate
    <span class="propType">ScrollView.propTypes.decelerationRate</span> <a class="hash-link" href="#decelerationrate">#</a></h4>
    <div><p>指定一个浮点数，用于设置在用户停止触摸之后，此视图应以多快的速度停止滚动。也可以指定预设的字符串值，如<code>"normal"</code>和<code>"fast"</code>，分别对应<code>UIScrollViewDecelerationRateNormal</code> 和<code>UIScrollViewDecelerationRateFast</code>。
    <ul>
        <li>Normal（正常速度）: 0.998</li>
        <li>Fast（较快速度）: 0.9 (iOS WebView的默认值)</li>
        </ul>
        </p></div>
  </div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="domstorageenabled"></a><span
        class="platform">android</span>domStorageEnabled <span class="propType">bool</span> <a class="hash-link"
                                                                                               href="#domstorageenabled">#</a>
  </h4>
    <div><p>仅限Android平台。指定是否开启DOM本地存储。</p></div>
  </div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="html"></a>html <span class="propType">string</span> <a class="hash-link" href="#html">#</a></h4>
		<div class="deprecated"><div class="deprecatedTitle"><span>已过期</span></div><div class="deprecatedMessage"><div><p>请使用<code>source</code> 属性代替。</p></div></div></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="injectedjavascript"></a>injectedJavaScript <span class="propType">string</span> <a class="hash-link" href="#injectedjavascript">#</a></h4>
		<div>
			<p>设置在网页加载之前注入的一段JS代码。</p>
		</div>
	</div>
	<div class="prop">
	<h4 class="propTitle"><a class="anchor" name="mediaplaybackrequiresuseraction"></a>mediaPlaybackRequiresUserAction <span class="propType">bool</span> <a class="hash-link" href="#mediaplaybackrequiresuseraction">#</a></h4>
	<div>
		<p>设置页面中的HTML5音视频是否需要在用户点击后再开始播放。默认值为<code>true</code>.</p>
	</div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="onerror"></a>onError <span
        class="propType">function</span> <a class="hash-link" href="#onerror">#</a></h4>
    <div><p>加载失败时调用。</p></div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="onload"></a>onLoad <span
	        class="propType">function</span> <a class="hash-link" href="#onload">#</a></h4>
	    <div><p>加载成功时调用。</p></div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="onloadend"></a>onLoadEnd <span
        class="propType">function</span> <a class="hash-link" href="#onloadend">#</a></h4>
    <div><p>加载结束时（无论成功或失败）调用。</p></div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="onloadstart"></a>onLoadStart <span class="propType">function</span>
	    <a class="hash-link" href="#onloadstart">#</a></h4>
	    <div><p>加载开始时调用。</p></div>
	</div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="onmessage"></a>onMessage <span class="propType">function</span> 
    <a class="hash-link" href="#onmessage">#</a></h4>
    <div>
      <p>在webview内部的网页中调用<code>window.postMessage</code>方法时可以触发此属性对应的函数，从而实现网页和RN之间的数据交换。
  设置此属性的同时会在webview中注入一个<code>postMessage</code>的全局函数并覆盖可能已经存在的同名实现。</p>
      <p>网页端的<code>window.postMessage</code>只发送一个参数<code>data</code>，此参数封装在RN端的event对象中，即<code>event.nativeEvent.data</code>。<code>data</code>
  只能是一个字符串。</p>
    </div>
  </div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="javascriptenabled"></a><span class="platform">android</span>javaScriptEnabled <span class="propType">bool</span> <a class="hash-link" href="#javascriptenabled">#</a></h4>
		<div>
			<p>仅限Android平台。iOS平台JavaScript是默认开启的。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onnavigationstatechange"></a>onNavigationStateChange <span class="propType">function</span> <a class="hash-link" href="#onnavigationstatechange">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onshouldstartloadwithrequest"></a><span class="platform">ios</span>onShouldStartLoadWithRequest <span class="propType">function</span> <a class="hash-link" href="#onshouldstartloadwithrequest">#</a></h4>
		<div>
			<p>允许为webview发起的请求运行一个自定义的处理函数。返回true或false表示是否要继续执行响应的请求。</p>
		</div>
	</div>
	<div class="prop">
	<h4 class="propTitle"><a class="anchor" name="rendererror"></a>renderError <span class="propType">function</span> <a class="hash-link" href="#rendererror">#</a></h4>
	<div><p>设置一个函数，返回一个视图用于显示错误。</p></div>
	</div>
	<div class="prop">
	<h4 class="propTitle"><a class="anchor" name="renderloading"></a>renderLoading <span class="propType">function</span> <a class="hash-link" href="#renderloading">#</a></h4>
	<div><p>设置一个函数，返回一个加载指示器。</p></div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="source"></a>source <span class="propType">{uri: string, method: string, headers: object, body: string}, {html: string, baseUrl: string}, number</span>
    <a class="hash-link" href="#source">#</a></h4>
	    <div><p>在WebView中载入一段静态的html代码或是一个url（还可以附带一些header选项）。</p></div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="scalespagetofit"></a>scalesPageToFit <span class="propType">bool</span> <a class="hash-link" href="#scalespagetofit">#</a></h4>
		<div>
			<p>设置是否要把网页缩放到适应视图的大小，以及是否允许用户改变缩放比例。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="scrollenabled"></a><span class="platform">ios</span>scrollEnabled <span class="propType">bool</span> <a class="hash-link" href="#scrollenabled">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="startinloadingstate"></a>startInLoadingState <span class="propType">bool</span> <a class="hash-link" href="#startinloadingstate">#</a></h4>
    <div>
      <p>强制WebView在第一次加载时先显示loading视图。默认为true。</p>
    </div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="style"></a>style <span class="propType"><a href="view.html#style">View#style</a></span> <a class="hash-link" href="#style">#</a></h4>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="url"></a>url <span class="propType">string</span> <a class="hash-link" href="#url">#</a></h4>
		<div class="deprecated"><div class="deprecatedTitle"><span>已过期</span></div><div class="deprecatedMessage"><div><p>请使用<code>source</code> 属性代替。</p></div></div></div>
	</div>
	<div class="prop">
	    <h4 class="propTitle">
	        <a class="anchor" name="useragent"></a>
	        <span class="platform">android</span>userAgent
	        <span class="propType">string</span> <a class="hash-link" href="#useragent">#</a>
	    </h4>
	    <div><p>为WebView设置user-agent字符串标识。这一字符串也可以在原生端用WebViewConfig来设置，但js端的设置会覆盖原生端的设置。</p></div>
	</div>
</div>

### 例子
```jsx
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  WebView
} = ReactNative;

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)';
var DISABLED_WASH = 'rgba(255,255,255,0.25)';

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://m.facebook.com';

class WebViewExample extends React.Component {
  state = {
    url: DEFAULT_URL,
    status: 'No Page Loaded',
    backButtonEnabled: false,
    forwardButtonEnabled: false,
    loading: true,
    scalesPageToFit: true,
  };

  inputText = '';

  handleTextInputChange = (event) => {
    var url = event.nativeEvent.text;
    if (!/^[a-zA-Z-_]+:/.test(url)) {
      url = 'http://' + url;
    }
    this.inputText = url;
  };

  render() {
    this.inputText = this.state.url;

    return (
      <View style={[styles.container]}>
        <View style={[styles.addressBarRow]}>
          <TouchableOpacity
            onPress={this.goBack}
            style={this.state.backButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
               {'<'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.goForward}
            style={this.state.forwardButtonEnabled ? styles.navButton : styles.disabledButton}>
            <Text>
              {'>'}
            </Text>
          </TouchableOpacity>
          <TextInput
            ref={TEXT_INPUT_REF}
            autoCapitalize="none"
            defaultValue={this.state.url}
            onSubmitEditing={this.onSubmitEditing}
            onChange={this.handleTextInputChange}
            clearButtonMode="while-editing"
            style={styles.addressBarTextInput}
          />
          <TouchableOpacity onPress={this.pressGoButton}>
            <View style={styles.goButton}>
              <Text>
                 Go!
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <WebView
          ref={WEBVIEW_REF}
          automaticallyAdjustContentInsets={false}
          style={styles.webView}
          source={{uri: this.state.url}}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          decelerationRate="normal"
          onNavigationStateChange={this.onNavigationStateChange}
          onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
          startInLoadingState={true}
          scalesPageToFit={this.state.scalesPageToFit}
        />
        <View style={styles.statusBar}>
          <Text style={styles.statusBarText}>{this.state.status}</Text>
        </View>
      </View>
    );
  }

  goBack = () => {
    this.refs[WEBVIEW_REF].goBack();
  };

  goForward = () => {
    this.refs[WEBVIEW_REF].goForward();
  };

  reload = () => {
    this.refs[WEBVIEW_REF].reload();
  };

  onShouldStartLoadWithRequest = (event) => {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  };

  onNavigationStateChange = (navState) => {
    this.setState({
      backButtonEnabled: navState.canGoBack,
      forwardButtonEnabled: navState.canGoForward,
      url: navState.url,
      status: navState.title,
      loading: navState.loading,
      scalesPageToFit: true
    });
  };

  onSubmitEditing = (event) => {
    this.pressGoButton();
  };

  pressGoButton = () => {
    var url = this.inputText.toLowerCase();
    if (url === this.state.url) {
      this.reload();
    } else {
      this.setState({
        url: url,
      });
    }
    // dismiss keyboard
    this.refs[TEXT_INPUT_REF].blur();
  };
}

class Button extends React.Component {
  _handlePress = () => {
    if (this.props.enabled !== false && this.props.onPress) {
      this.props.onPress();
    }
  };

  render() {
    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View style={styles.button}>
          <Text>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

class ScaledWebView extends React.Component {
  state = {
    scalingEnabled: true,
  };

  render() {
    return (
      <View>
        <WebView
          style={{
            backgroundColor: BGWASH,
            height: 200,
          }}
          source={{uri: 'https://facebook.github.io/react/'}}
          scalesPageToFit={this.state.scalingEnabled}
        />
        <View style={styles.buttons}>
        { this.state.scalingEnabled ?
          <Button
            text="Scaling:ON"
            enabled={true}
            onPress={() => this.setState({scalingEnabled: false})}
          /> :
          <Button
            text="Scaling:OFF"
            enabled={true}
            onPress={() => this.setState({scalingEnabled: true})}
          /> }
        </View>
      </View>
    );
  }
}

class MessagingTest extends React.Component {
  webview = null

  state = {
    messagesReceivedFromWebView: 0,
    message: '',
  }

  onMessage = e => this.setState({
    messagesReceivedFromWebView: this.state.messagesReceivedFromWebView + 1,
    message: e.nativeEvent.data,
  })

  postMessage = () => {
    if (this.webview) {
      this.webview.postMessage('"Hello" from React Native!');
    }
  }

  render(): ReactElement<any> {
    const {messagesReceivedFromWebView, message} = this.state;

    return (
      <View style={[styles.container, { height: 200 }]}>
        <View style={styles.container}>
          <Text>Messages received from web view: {messagesReceivedFromWebView}</Text>
          <Text>{message || '(No message)'}</Text>
          <View style={styles.buttons}>
            <Button text="Send Message to Web View" enabled onPress={this.postMessage} />
          </View>
        </View>
        <View style={styles.container}>
          <WebView
            ref={webview => { this.webview = webview; }}
            style={{
              backgroundColor: BGWASH,
              height: 100,
            }}
            source={require('./messagingtest.html')}
            onMessage={this.onMessage}
          />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HEADER,
  },
  addressBarRow: {
    flexDirection: 'row',
    padding: 8,
  },
  webView: {
    backgroundColor: BGWASH,
    height: 350,
  },
  addressBarTextInput: {
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    borderWidth: 1,
    height: 24,
    paddingLeft: 10,
    paddingTop: 3,
    paddingBottom: 3,
    flex: 1,
    fontSize: 14,
  },
  navButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  disabledButton: {
    width: 20,
    padding: 3,
    marginRight: 3,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: DISABLED_WASH,
    borderColor: 'transparent',
    borderRadius: 3,
  },
  goButton: {
    height: 24,
    padding: 3,
    marginLeft: 8,
    alignItems: 'center',
    backgroundColor: BGWASH,
    borderColor: 'transparent',
    borderRadius: 3,
    alignSelf: 'stretch',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
    height: 22,
  },
  statusBarText: {
    color: 'white',
    fontSize: 13,
  },
  spinner: {
    width: 20,
    marginRight: 6,
  },
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 0.5,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
});

const HTML = `
<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
  </head>
  <body>
    <h1>Hello Static World</h1>
  </body>
</html>
`;

exports.displayName = (undefined: ?string);
exports.title = '<WebView>';
exports.description = 'Base component to display web content';
exports.examples = [
  {
    title: 'Simple Browser',
    render(): React.Element<any> { return <WebViewExample />; }
  },
  {
    title: 'Scale Page to Fit',
    render(): React.Element<any> { return <ScaledWebView/>; }
  },
  {
    title: 'Bundled HTML',
    render(): React.Element<any> {
      return (
        <WebView
          style={{
            backgroundColor: BGWASH,
            height: 100,
          }}
          source={require('./helloworld.html')}
          scalesPageToFit={true}
        />
      );
    }
  },
  {
    title: 'Static HTML',
    render(): React.Element<any> {
      return (
        <WebView
          style={{
            backgroundColor: BGWASH,
            height: 100,
          }}
          source={{html: HTML}}
          scalesPageToFit={true}
        />
      );
    }
  },
  {
    title: 'POST Test',
    render(): React.Element<any> {
      return (
        <WebView
          style={{
            backgroundColor: BGWASH,
            height: 100,
          }}
          source={{
            uri: 'http://www.posttestserver.com/post.php',
            method: 'POST',
            body: 'foo=bar&bar=foo'
          }}
          scalesPageToFit={false}
        />
      );
    }
  },
  {
    title: 'Mesaging Test',
    render(): ReactElement<any> { return <MessagingTest />; }
  }
];
```
