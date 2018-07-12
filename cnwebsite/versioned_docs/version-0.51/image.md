---
id: version-0.51-image
title: Image
original_id: image
---

一个用于显示多种不同类型图片的React组件，包括网络图片、静态资源、临时的本地图片、以及本地磁盘上的图片（如相册）等。详细用法参阅[图片文档](images.html)。

用法样例：

```javascript
renderImages() {
  return (
    <View>
      <Image
        style={styles.icon}
        source={require('./icon.png')}
      />
      <Image
        style={styles.logo}
        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
      />
    </View>
  );
}
```

### 截图
![](img/components/image.png)

### 在Android上支持GIF和WebP格式图片

默认情况下Android是不支持GIF和WebP格式的。你需要在`android/app/build.gradle`文件中根据需要手动添加以下模块：

```
dependencies {
  // 如果你需要支持Android4.0(API level 14)之前的版本
  compile 'com.facebook.fresco:animated-base-support:1.3.0'

  // 如果你需要支持GIF动图
  compile 'com.facebook.fresco:animated-gif:1.3.0'

  // 如果你需要支持WebP格式，包括WebP动图
  compile 'com.facebook.fresco:animated-webp:1.3.0'
  compile 'com.facebook.fresco:webpsupport:1.3.0'

  // 如果只需要支持WebP格式而不需要动图
  compile 'com.facebook.fresco:webpsupport:1.3.0'
}
```

如果你在使用GIF的同时还使用了ProGuard，那么需要在`proguard-rules.pro`中添加如下规则 :

```
-keep class com.facebook.imagepipeline.animated.factory.AnimatedFactoryImpl {
  public AnimatedFactoryImpl(com.facebook.imagepipeline.bitmaps.PlatformBitmapFactory, com.facebook.imagepipeline.core.ExecutorSupplier);
}
```

### 属性

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onlayout"></a>onLayout <span class="propType">function</span> <a class="hash-link" href="#onlayout">#</a></h4>
        <div>
            <p>当元素挂载或者布局改变的时候调用，参数为：<code>{nativeEvent: {layout: {x, y, width, height}}}</code>.</p>
        </div>
    </div>
        <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onload"></a>onLoad <span class="propType">function</span> <a class="hash-link" href="#onload">#</a></h4>
        <div>
            <p>加载成功完成时调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onloadend"></a>onLoadEnd <span class="propType">function</span> <a class="hash-link" href="#onloadend">#</a></h4>
        <div>
            <p>加载结束后，不论成功还是失败，调用此回调函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onloadstart"></a>onLoadStart <span class="propType">function</span> <a class="hash-link" href="#onloadstart">#</a></h4>
        <div>
            <p>加载开始时调用。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="resizemode"></a>resizeMode <span class="propType">enum('cover', 'contain', 'stretch', 'repeat', 'center')</span> <a class="hash-link" href="#resizemode">#</a></h4>
        <div>
            <p>决定当组件尺寸和图片尺寸不成比例的时候如何调整图片的大小。</p>
            <ul>
            <li><p><code>cover</code>: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都大于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。__译注__：这样图片完全覆盖甚至超出容器，容器中不留任何空白。</p></li>
		        <li><p><code>contain</code>: 在保持图片宽高比的前提下缩放图片，直到宽度和高度都小于等于容器视图的尺寸（如果容器有padding内衬的话，则相应减去）。__译注__：这样图片完全被包裹在容器中，容器中可能留有空白</p></li>
		        <li><p><code>stretch</code>: 拉伸图片且不维持宽高比，直到宽高都刚好填满容器。</p></li>
            <li><p><code>repeat</code>: 重复平铺图片直到填满容器。图片会维持原始尺寸。仅iOS可用。</p></li>
            <li><p><code>center</code>: 居中不拉伸。</p></li>
			  </ul>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="source"></a>source <span class="propType">{uri: string}, number</span> <a class="hash-link" href="#source">#</a></h4>
        <div>
            <p><code>uri</code>是一个表示图片的资源标识的字符串，它可以是一个http地址或是一个本地文件路径（使用<code>require(相对路径)</code>来引用）。</p>
            <p>This prop can also contain several remote URLs, specified together with their width and height and potentially with scale/other URI arguments. The native side will then choose the best `uri` to display based on the measured size of the image container. A `cache` property can be added to control how networked request interacts with the local cache.</p>
            <p>目前原生支持的图片格式有`png`、`jpg`、`jpeg`、`bmp`、`gif`、`webp` （限Android）、`psd` （限iOS）。当然你可以在github上找一些第三方组件来扩充支持的格式。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="style"></a>style <span class="propType">style</span> <a class="hash-link" href="#style">#</a></h4>
        <div class="compactProps">
            <div class="prop">
                <h6 class="propTitle"><a href="layout-with-flexbox.html">布局Flexbox...</a></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle"><a href="shadow-props.html">阴影Shadow...</a></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle"><a href="transforms.html">动画变换Transforms...</a></h6>
            </div>
			<div class="prop">
				<h6 class="propTitle">backfaceVisibility <span class="propType">ReactPropTypes.oneOf(['visible', 'hidden'])</span> </h6>
			</div>
            <div class="prop">
                <h6 class="propTitle">resizeMode <span class="propType">Object.keys(ImageResizeMode)</span></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">backgroundColor <span class="propType"><a href="colors.html">color</a></span></h6>
            </div>
			<div class="prop">
			    <h6 class="propTitle">borderBottomLeftRadius <span class="propType">ReactPropTypes.number</span></h6>
			</div>
			<div class="prop">
			    <h6 class="propTitle">borderBottomRightRadius <span class="propType">ReactPropTypes.number</span></h6>
			</div>
            <div class="prop">
                <h6 class="propTitle">borderColor <span class="propType"><a href="colors.html">color</a></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">borderRadius <span class="propType">number</span></h6>
            </div>
			<div class="prop">
			    <h6 class="propTitle">borderTopLeftRadius <span class="propType">ReactPropTypes.number</span></h6>
			</div>
			<div class="prop">
			    <h6 class="propTitle">borderTopRightRadius <span class="propType">ReactPropTypes.number</span></h6>
			</div>
            <div class="prop">
                <h6 class="propTitle">borderWidth <span class="propType">number</span></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">overflow <span class="propType">enum('visible', 'hidden')</span></h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">tintColor <span class="propType"><a href="colors.html">color</a></span>
				<div><p>为所有非透明的像素指定一个颜色</p></div>
				</h6>
            </div>
            <div class="prop">
                <h6 class="propTitle">opacity <span class="propType">number</span></h6>
            </div>
			<div class="prop">
			    <h6 class="propTitle"><span class="platform">android</span>overlayColor <span
			            class="propType">ReactPropTypes.string</span>
			        <div><p>当图片有圆角的时候，指定一个颜色用于填充圆角处的空白。虽然一般情况下圆角处是透明的，但在某些情况下，Android并不支持圆角透明，比如：
                        <ul>
			            <li>某些resize模式比如<code>'contain'</code></li>
			            <li>GIF动画</li>
                        </p>
                        </ul>
			            <p>常见的用法就是在不能圆角透明时，设置<code>overlayColor</code>和背景色一致。</p>
			            <p>详细说明可参考
			                <a href="http://frescolib.org/docs/rounded-corners-and-circles.html">http://frescolib.org/docs/rounded-corners-and-circles.html</a>
			            </p></div>
			    </h6>
			</div>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="testid"></a>testID <span class="propType">string</span> <a class="hash-link" href="#testid">#</a></h4>
        <div>
            <p>一个唯一的资源标识符，用来在自动测试脚本中标识这个元素。</p>
        </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="resizemethod"></a><span class="platform">android</span>resizeMethod
        <span class="propType">enum('auto', 'resize', 'scale')</span> <a class="hash-link"
                                                                         href="#resizemethod">#</a></h4>
        <div><p>当图片实际尺寸和容器样式尺寸不一致时，决定以怎样的策略来调整图片的尺寸。默认值为<code>auto</code>。</p>
            <ul>
                <li><p><code>auto</code>：使用启发式算法来在<code>resize</code>和<code>scale</code>中自动决定。</p>
                </li>
                <li><p><code>resize</code>： 在图片解码之前，使用软件算法对其在内存中的数据进行修改。当图片尺寸比容器尺寸大得多时，应该优先使用此选项。</p></li>
                <li><p><code>scale</code>：对图片进行缩放。和<code>resize</code>相比，
                    <code>scale</code>速度更快（一般有硬件加速），而且图片质量更优。在图片尺寸比容器尺寸小或者只是稍大一点时，应该优先使用此选项。</p></li>
            </ul>
            <p>关于<code>resize</code>和<code>scale</code>的详细说明请参考<a
                    href="http://frescolib.org/docs/resizing-rotating.html">http://frescolib.org/docs/resizing-rotating.html</a>.
            </p></div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="accessibilitylabel"></a><span class="platform">ios</span>accessibilityLabel <span class="propType">string</span> <a class="hash-link" href="#accessibilitylabel">#</a></h4>
        <div>
            <p>当用户与图片交互时，读屏器（无障碍功能）会朗读的文字。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="accessible"></a><span class="platform">ios</span>accessible <span class="propType">bool</span> <a class="hash-link" href="#accessible">#</a></h4>
        <div>
            <p>当此属性为真的时候，表示这个图片是一个启用了无障碍功能的元素。</p>
        </div>
    </div>
    <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="blurradius"></a>blurRadius <span class="propType">number</span> <a class="hash-link" href="#blurradius">#</a>
    </h4>
    <div>
    <p>blurRadius(模糊半径)：为图片添加一个指定半径的模糊滤镜。</p>
    </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="capinsets"></a><span class="platform">ios</span>capInsets <span class="propType">{top: number, left: number, bottom: number, right: number}</span> <a class="hash-link" href="#capinsets">#</a></h4>
        <div>
            <p>当图片被缩放的时候，capInsets指定的角上的尺寸会被固定而不进行缩放，而中间和边上其他的部分则会被拉伸。这在制作一些可变大小的圆角按钮、阴影、以及其它资源的时候非常有用（译注：这就是常说的九宫格或者.9图。了解更多信息，可以参见<a href="https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIImage_Class/index.html#//apple_ref/occ/instm/UIImage/resizableImageWithCapInsets" target="_blank">苹果官方文档</a></p>
        </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="defaultsource"></a><span class="platform">ios</span>defaultSource
        <span class="propType">{uri: string, width: number, height: number, scale: number}, number</span> <a
                class="hash-link" href="#defaultsource">#</a></h4>
        <div><p>在读取图片时默认显示的加载提示图片</p>
            <ul>
                <li><code>uri</code> - 是一个表示图片的资源标识的字符串，它可以是一个http地址或是一个本地文件路径（使用<code>require(相对路径)</code>来引用）。
                </li>
                <li><code>width</code>, <code>height</code> - 如果你知道图片的尺寸，那么可以在这里指定。这一尺寸会被用作<code>&lt;Image/&gt;</code>组件的默认尺寸。
                </li>
                <li><code>scale</code> - 图片的缩放系数。默认是1.0，意味着每一个图片像素都对应一个设备独立像素（DIP）。
                </li>
                <li><code>number</code> - 本地图片引用语法<code>require('./image.jpg')</code>所返回的内部资源id。</li>
            </ul>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onerror"></a><span class="platform">ios</span>onError <span class="propType">function</span> <a class="hash-link" href="#onerror">#</a></h4>
        <div>
            <p>当加载错误的时候调用此回调函数，参数为<code>{nativeEvent: {error}}</code></p>
        </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onpartialload"></a><span class="platform">ios</span>onPartialLoad
        <span class="propType">function</span> <a class="hash-link" href="#onpartialload">#</a></h4>
        <div><p>如果图片本身支持逐步加载，则逐步加载的过程中会调用此方法。“逐步加载”的具体定义与具体的标准和实现有关。</p></div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onprogress"></a><span class="platform">ios</span>onProgress <span class="propType">function</span> <a class="hash-link" href="#onprogress">#</a></h4>
        <div>
            <p>在加载过程中不断调用，参数为<code>{nativeEvent: {loaded, total}}</code></p>
        </div>
    </div>
</div>

### 方法

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getsize"></a><span class="propType">static </span>getSize<span
            class="propType">(uri: string, success: (width: number, height: number) =&gt; void, failure: (error: any) =&gt; void)</span>
        <a class="hash-link" href="#getsize">#</a></h4>
        <div><p>在显示图片前获取图片的宽高(以像素为单位)。如果图片地址不正确或下载失败,此方法也会失败。</p>
            <p>要获取图片的尺寸,首先需要加载或下载图片(同时会被缓存起来)。这意味着理论上你可以用这个方法来预加载图片，虽然此方法并没有针对这一用法进行优化，而且将来可能会换一些实现方案使得并不需要完整下载图片即可获取尺寸。所以更好的预加载方案是使用下面那个专门的预加载方法。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="prefetch"></a><span class="propType">static </span>prefetch<span
            class="propType">(url: string)</span> <a class="hash-link" href="#prefetch">#</a></h4>
        <div><p>预加载一个远程图片(将其下载到本地磁盘缓存)。</p></div>
    </div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  ActivityIndicator,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} = ReactNative;

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

var ImageCapInsetsExample = require('./ImageCapInsetsExample');
const IMAGE_PREFETCH_URL = 'http://origami.design/public/images/bird-logo.png?r=1&t=' + Date.now();
var prefetchTask = Image.prefetch(IMAGE_PREFETCH_URL);

var NetworkImageCallbackExample = React.createClass({
  getInitialState: function() {
    return {
      events: [],
      startLoadPrefetched: false,
      mountTime: new Date(),
    };
  },

  componentWillMount() {
    this.setState({mountTime: new Date()});
  },

  render: function() {
    var { mountTime } = this.state;

    return (
      <View>
        <Image
          source={this.props.source}
          style={[styles.base, {overflow: 'visible'}]}
          onLoadStart={() => this._loadEventFired(`✔ onLoadStart (+${new Date() - mountTime}ms)`)}
          onLoad={(event) => {
            // Currently this image source feature is only available on iOS.
            if (event.nativeEvent.source) {
              const url = event.nativeEvent.source.url;
              this._loadEventFired(`✔ onLoad (+${new Date() - mountTime}ms) for URL ${url}`);
            } else {
              this._loadEventFired(`✔ onLoad (+${new Date() - mountTime}ms)`);
            }
          }}
          onLoadEnd={() => {
            this._loadEventFired(`✔ onLoadEnd (+${new Date() - mountTime}ms)`);
            this.setState({startLoadPrefetched: true}, () => {
              prefetchTask.then(() => {
                this._loadEventFired(`✔ Prefetch OK (+${new Date() - mountTime}ms)`);
              }, error => {
                this._loadEventFired(`✘ Prefetch failed (+${new Date() - mountTime}ms)`);
              });
            });
          }}
        />
        {this.state.startLoadPrefetched ?
          <Image
            source={this.props.prefetchedSource}
            style={[styles.base, {overflow: 'visible'}]}
            onLoadStart={() => this._loadEventFired(`✔ (prefetched) onLoadStart (+${new Date() - mountTime}ms)`)}
            onLoad={(event) => {
              // Currently this image source feature is only available on iOS.
              if (event.nativeEvent.source) {
                const url = event.nativeEvent.source.url;
                this._loadEventFired(`✔ (prefetched) onLoad (+${new Date() - mountTime}ms) for URL ${url}`);
              } else {
                this._loadEventFired(`✔ (prefetched) onLoad (+${new Date() - mountTime}ms)`);
              }
            }}
            onLoadEnd={() => this._loadEventFired(`✔ (prefetched) onLoadEnd (+${new Date() - mountTime}ms)`)}
          />
          : null}
        <Text style={{marginTop: 20}}>
          {this.state.events.join('\n')}
        </Text>
      </View>
    );
  },

  _loadEventFired(event) {
    this.setState((state) => {
      return state.events = [...state.events, event];
    });
  }
});

var NetworkImageExample = React.createClass({
  getInitialState: function() {
    return {
      error: false,
      loading: false,
      progress: 0
    };
  },
  render: function() {
    var loader = this.state.loading ?
      <View style={styles.progress}>
        <Text>{this.state.progress}%</Text>
        <ActivityIndicator style={{marginLeft:5}} />
      </View> : null;
    return this.state.error ?
      <Text>{this.state.error}</Text> :
      <Image
        source={this.props.source}
        style={[styles.base, {overflow: 'visible'}]}
        onLoadStart={(e) => this.setState({loading: true})}
        onError={(e) => this.setState({error: e.nativeEvent.error, loading: false})}
        onProgress={(e) => this.setState({progress: Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total)})}
        onLoad={() => this.setState({loading: false, error: false})}>
        {loader}
      </Image>;
  }
});

var ImageSizeExample = React.createClass({
  getInitialState: function() {
    return {
      width: 0,
      height: 0,
    };
  },
  componentDidMount: function() {
    Image.getSize(this.props.source.uri, (width, height) => {
      this.setState({width, height});
    });
  },
  render: function() {
    return (
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{
            width: 60,
            height: 60,
            backgroundColor: 'transparent',
            marginRight: 10,
          }}
          source={this.props.source} />
        <Text>
          Actual dimensions:{'\n'}
          Width: {this.state.width}, Height: {this.state.height}
        </Text>
      </View>
    );
  },
});

var MultipleSourcesExample = React.createClass({
  getInitialState: function() {
    return {
      width: 30,
      height: 30,
    };
  },
  render: function() {
    return (
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={styles.touchableText}
            onPress={this.decreaseImageSize} >
            Decrease image size
          </Text>
          <Text
            style={styles.touchableText}
            onPress={this.increaseImageSize} >
            Increase image size
          </Text>
        </View>
        <Text>Container image size: {this.state.width}x{this.state.height} </Text>
        <View
          style={{height: this.state.height, width: this.state.width}} >
          <Image
            style={{flex: 1}}
            source={[
              {uri: 'https://facebook.github.io/react/img/logo_small.png', width: 38, height: 38},
              {uri: 'https://facebook.github.io/react/img/logo_small_2x.png', width: 76, height: 76},
              {uri: 'https://facebook.github.io/react/img/logo_og.png', width: 400, height: 400}
            ]}
          />
        </View>
      </View>
    );
  },
  increaseImageSize: function() {
    if (this.state.width >= 100) {
      return;
    }
    this.setState({
      width: this.state.width + 10,
      height: this.state.height + 10,
    });
  },
  decreaseImageSize: function() {
    if (this.state.width <= 10) {
      return;
    }
    this.setState({
      width: this.state.width - 10,
      height: this.state.height - 10,
    });
  },
});

exports.displayName = (undefined: ?string);
exports.framework = 'React';
exports.title = '<Image>';
exports.description = 'Base component for displaying different types of images.';

exports.examples = [
  {
    title: 'Plain Network Image',
    description: 'If the `source` prop `uri` property is prefixed with ' +
    '"http", then it will be downloaded from the network.',
    render: function() {
      return (
        <Image
          source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
          style={styles.base}
        />
      );
    },
  },
  {
    title: 'Plain Static Image',
    description: 'Static assets should be placed in the source code tree, and ' +
    'required in the same way as JavaScript modules.',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image source={require('./uie_thumb_normal.png')} style={styles.icon} />
          <Image source={require('./uie_thumb_selected.png')} style={styles.icon} />
          <Image source={require('./uie_comment_normal.png')} style={styles.icon} />
          <Image source={require('./uie_comment_highlighted.png')} style={styles.icon} />
        </View>
      );
    },
  },
  {
    title: 'Image Loading Events',
    render: function() {
      return (
        <NetworkImageCallbackExample source={{uri: 'http://origami.design/public/images/bird-logo.png?r=1&t=' + Date.now()}}
          prefetchedSource={{uri: IMAGE_PREFETCH_URL}}/>
      );
    },
  },
  {
    title: 'Error Handler',
    render: function() {
      return (
        <NetworkImageExample source={{uri: 'https://TYPO_ERROR_facebook.github.io/react/img/logo_og.png'}} />
      );
    },
    platform: 'ios',
  },
  {
    title: 'Image Download Progress',
    render: function() {
      return (
        <NetworkImageExample source={{uri: 'http://origami.design/public/images/bird-logo.png?r=1'}}/>
      );
    },
    platform: 'ios',
  },
  {
    title: 'defaultSource',
    description: 'Show a placeholder image when a network image is loading',
    render: function() {
      return (
        <Image
          defaultSource={require('./bunny.png')}
          source={{uri: 'https://facebook.github.io/origami/public/images/birds.jpg'}}
          style={styles.base}
        />
      );
    },
    platform: 'ios',
  },
  {
    title: 'Border Color',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            source={smallImage}
            style={[
              styles.base,
              styles.background,
              {borderWidth: 3, borderColor: '#f099f0'}
            ]}
          />
        </View>
      );
    },
  },
  {
    title: 'Border Width',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            source={smallImage}
            style={[
              styles.base,
              styles.background,
              {borderWidth: 5, borderColor: '#f099f0'}
            ]}
          />
        </View>
      );
    },
  },
  {
    title: 'Border Radius',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            style={[styles.base, {borderRadius: 5}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {borderRadius: 19}]}
            source={fullImage}
          />
        </View>
      );
    },
  },
  {
    title: 'Background Color',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image source={smallImage} style={styles.base} />
          <Image
            style={[
              styles.base,
              styles.leftMargin,
              {backgroundColor: 'rgba(0, 0, 100, 0.25)'}
            ]}
            source={smallImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {backgroundColor: 'red'}]}
            source={smallImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {backgroundColor: 'black'}]}
            source={smallImage}
          />
        </View>
      );
    },
  },
  {
    title: 'Opacity',
    render: function() {
      return (
        <View style={styles.horizontal}>
          <Image
            style={[styles.base, {opacity: 1}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.8}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.6}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.4}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0.2}]}
            source={fullImage}
          />
          <Image
            style={[styles.base, styles.leftMargin, {opacity: 0}]}
            source={fullImage}
          />
        </View>
      );
    },
  },
  {
    title: 'Nesting',
    render: function() {
      return (
        <Image
          style={{width: 60, height: 60, backgroundColor: 'transparent'}}
          source={fullImage}>
          <Text style={styles.nestedText}>
            React
          </Text>
        </Image>
      );
    },
  },
  {
    title: 'Tint Color',
    description: 'The `tintColor` style prop changes all the non-alpha ' +
      'pixels to the tint color.',
    render: function() {
      return (
        <View>
          <View style={styles.horizontal}>
            <Image
              source={require('./uie_thumb_normal.png')}
              style={[styles.icon, {borderRadius: 5, tintColor: '#5ac8fa' }]}
            />
            <Image
              source={require('./uie_thumb_normal.png')}
              style={[styles.icon, styles.leftMargin, {borderRadius: 5, tintColor: '#4cd964' }]}
            />
            <Image
              source={require('./uie_thumb_normal.png')}
              style={[styles.icon, styles.leftMargin, {borderRadius: 5, tintColor: '#ff2d55' }]}
            />
            <Image
              source={require('./uie_thumb_normal.png')}
              style={[styles.icon, styles.leftMargin, {borderRadius: 5, tintColor: '#8e8e93' }]}
            />
          </View>
          <Text style={styles.sectionText}>
            It also works with downloaded images:
          </Text>
          <View style={styles.horizontal}>
            <Image
              source={smallImage}
              style={[styles.base, {borderRadius: 5, tintColor: '#5ac8fa' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#4cd964' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#ff2d55' }]}
            />
            <Image
              source={smallImage}
              style={[styles.base, styles.leftMargin, {borderRadius: 5, tintColor: '#8e8e93' }]}
            />
          </View>
        </View>
      );
    },
  },
  {
    title: 'Resize Mode',
    description: 'The `resizeMode` style prop controls how the image is ' +
      'rendered within the frame.',
    render: function() {
      return (
        <View>
          {[smallImage, fullImage].map((image, index) => {
            return (
            <View key={index}>
              <View style={styles.horizontal}>
                <View>
                  <Text style={[styles.resizeModeText]}>
                    Contain
                  </Text>
                  <Image
                    style={styles.resizeMode}
                    resizeMode={Image.resizeMode.contain}
                    source={image}
                  />
                </View>
                <View style={styles.leftMargin}>
                  <Text style={[styles.resizeModeText]}>
                    Cover
                  </Text>
                  <Image
                    style={styles.resizeMode}
                    resizeMode={Image.resizeMode.cover}
                    source={image}
                  />
                </View>
              </View>
              <View style={styles.horizontal}>
                <View>
                  <Text style={[styles.resizeModeText]}>
                    Stretch
                  </Text>
                  <Image
                    style={styles.resizeMode}
                    resizeMode={Image.resizeMode.stretch}
                    source={image}
                  />
                </View>
                { Platform.OS === 'ios' ?
                  <View style={styles.leftMargin}>
                    <Text style={[styles.resizeModeText]}>
                      Repeat
                    </Text>
                    <Image
                      style={styles.resizeMode}
                      resizeMode={Image.resizeMode.repeat}
                      source={image}
                    />
                  </View>
                : null }
                { Platform.OS === 'android' ?
                  <View style={styles.leftMargin}>
                    <Text style={[styles.resizeModeText]}>
                      Center
                    </Text>
                    <Image
                      style={styles.resizeMode}
                      resizeMode={Image.resizeMode.center}
                      source={image}
                    />
                  </View>
                : null }
              </View>
            </View>
          );
        })}
        </View>
      );
    },
  },
  {
    title: 'Animated GIF',
    render: function() {
      return (
        <Image
          style={styles.gif}
          source={{uri: 'https://38.media.tumblr.com/9e9bd08c6e2d10561dd1fb4197df4c4e/tumblr_mfqekpMktw1rn90umo1_500.gif'}}
        />
      );
    },
    platform: 'ios',
  },
  {
    title: 'Base64 image',
    render: function() {
      return (
        <Image
          style={styles.base64}
          source={{uri: base64Icon, scale: 3}}
        />
      );
    },
    platform: 'ios',
  },
  {
    title: 'Cap Insets',
    description:
      'When the image is resized, the corners of the size specified ' +
      'by capInsets will stay a fixed size, but the center content and ' +
      'borders of the image will be stretched. This is useful for creating ' +
      'resizable rounded buttons, shadows, and other resizable assets.',
    render: function() {
      return <ImageCapInsetsExample />;
    },
    platform: 'ios',
  },
  {
    title: 'Image Size',
    render: function() {
      return <ImageSizeExample source={fullImage} />;
    },
  },
  {
    title: 'MultipleSourcesExample',
    description:
      'The `source` prop allows passing in an array of uris, so that native to choose which image ' +
      'to diplay based on the size of the of the target image',
    render: function() {
      return <MultipleSourcesExample />;
    },
  },
  {
    title: 'Legacy local image',
    description:
      'Images shipped with the native bundle, but not managed ' +
      'by the JS packager',
    render: function() {
      return (
        <Image
          source={{uri: 'legacy_image', width: 120, height: 120}}
        />
      );
    },
  },
  {
    title: 'Bundled images',
    description:
      'Images shipped in a separate native bundle',
    render: function() {
      return (
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              url: 'ImageInBundle',
              bundle: 'RNTesterBundle',
              width: 100,
              height: 100,
            }}
            style={{borderColor: 'yellow', borderWidth: 4}}
          />
          <Image
            source={{
              url: 'ImageInAssetCatalog',
              bundle: 'RNTesterBundle',
              width: 100,
              height: 100,
            }}
            style={{marginLeft: 10, borderColor: 'blue', borderWidth: 4}}
          />
        </View>
      );
    },
    platform: 'ios',
  },
];

var fullImage = {uri: 'https://facebook.github.io/react/img/logo_og.png'};
var smallImage = {uri: 'https://facebook.github.io/react/img/logo_small_2x.png'};

var styles = StyleSheet.create({
  base: {
    width: 38,
    height: 38,
  },
  progress: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    width: 100
  },
  leftMargin: {
    marginLeft: 10,
  },
  background: {
    backgroundColor: '#222222'
  },
  sectionText: {
    marginVertical: 6,
  },
  nestedText: {
    marginLeft: 12,
    marginTop: 20,
    backgroundColor: 'transparent',
    color: 'white'
  },
  resizeMode: {
    width: 90,
    height: 60,
    borderWidth: 0.5,
    borderColor: 'black'
  },
  resizeModeText: {
    fontSize: 11,
    marginBottom: 3,
  },
  icon: {
    width: 15,
    height: 15,
  },
  horizontal: {
    flexDirection: 'row',
  },
  gif: {
    flex: 1,
    height: 200,
  },
  base64: {
    flex: 1,
    height: 50,
    resizeMode: 'contain',
  },
  touchableText: {
    fontWeight: '500',
    color: 'blue',
  },
});
```