---
id: version-0.55-building-for-apple-tv
title: 为电视和机顶盒制作应用
original_id: building-for-apple-tv
---

<style>
  .toggler li {
    display: inline-block;
    position: relative;
    top: 1px;
    padding: 10px;
    margin: 0px 2px 0px 2px;
    border: 1px solid #05A5D1;
    border-bottom-color: transparent;
    border-radius: 3px 3px 0px 0px;
    color: #05A5D1;
    background-color: transparent;
    font-size: 0.99em;
    cursor: pointer;
  }
  .toggler li:first-child {
    margin-left: 0;
  }
  .toggler li:last-child {
    margin-right: 0;
  }
  .toggler ul {
    width: 100%;
    display: inline-block;
    list-style-type: none;
    margin: 0;
    border-bottom: 1px solid #05A5D1;
    cursor: default;
  }
  @media screen and (max-width: 960px) {
    .toggler li,
    .toggler li:first-child,
    .toggler li:last-child {
      display: block;
      border-bottom-color: #05A5D1;
      border-radius: 3px;
      margin: 2px 0px 2px 0px;
    }
    .toggler ul {
      border-bottom: 0;
    }
  }
  .toggler a {
    display: inline-block;
    padding: 10px 5px;
    margin: 2px;
    border: 1px solid #05A5D1;
    border-radius: 3px;
    text-decoration: none !important;
  }
  .display-platform-ios .toggler .button-ios,
  .display-platform-android .toggler .button-android {
    background-color: #05A5D1;
    color: white;
  }
  block { display: none; }
  .display-platform-ios .ios,
  .display-platform-android .android {
    display: block;
  }
</style>

目前的 React Native 应用只需在 JavaScript 端简单修改甚至无需修改，在电视和机顶盒设备上就基本可用了。

<div class="toggler">

  <ul role="tablist" >
    <li id="ios" class="button-ios" aria-selected="false" role="tab" tabindex="0" aria-controls="iostab" onclick="displayTab('platform', 'ios')">
      iOS
    </li>
    <li id="android" class="button-android" aria-selected="false" role="tab" tabindex="-1" aria-controls="androidtab" onclick="displayTab('platform', 'android')">
      Android
    </li>
  </ul>
</div>

<block class="ios" />

源代码仓库里的[RNTester 演示应用](https://github.com/facebook/react-native/tree/master/RNTester)支持在 Apple TV 上运行，使用`RNTester-tvOS`编译目标来在 tvOS 上编译运行。

## 编译变更

* _原生端_: React Native 生成的 Xcode 项目现都已包含 Apple TV 编译目标，其名字都带有'-tvOS'后缀。

* _react-native init_: 使用`react-native init`命令创建的新项目会自动在 Xcode 新项目中包含 Apple TV 编译目标。

* _JavaScript 端_: 对于电视设备的检测代码已经加入到了`Platform`模块中。你可以使用下面的代码来检测当前运行设备是否是电视设备：

```javascript
import { Platform } from "react-native";
const running_on_tv = Platform.isTV;

// 如果你想更精确地针对tvOS设备（即排除Android设备），
// 那么可以使用下面的代码：
const running_on_apple_tv = Platform.isTVOS;
```

<block class="android" />

## 编译修改

* _原生端_: 在 Android TV 上运行 React Native 项目请先在`AndroidManifest.xml`中加入下列配置：

```xml
  <!-- 加入自定义的banner图作为TV设备上的图标 -->
 <application
  ...
  android:banner="@drawable/tv_banner"
  >
    ...
    <intent-filter>
      ...
      <!-- Needed to properly create a launch intent when running on Android TV -->
      <category android:name="android.intent.category.LEANBACK_LAUNCHER"/>
    </intent-filter>
    ...
  </application>
```

* _JavaScript 端_: 对于电视设备的检测代码已经加入到了`Platform`模块中。你可以使用下面的代码来检测当前运行设备是否是电视设备：

```js
import { Platform } from "react-native";
const running_on_tv = Platform.isTV;
```

<block class="ios android" />

## 代码修改

<block class="ios" />

* _General support for tvOS_: Apple TV specific changes in native code are all wrapped by the TARGET_OS_TV define. These include changes to suppress APIs that are not supported on tvOS (e.g. web views, sliders, switches, status bar, etc.), and changes to support user input from the TV remote or keyboard.

* _Common codebase_: Since tvOS and iOS share most Objective-C and JavaScript code in common, most documentation for iOS applies equally to tvOS.

* _访问可点击的控件_: When running on Apple TV, the native view class is `RCTTVView`, which has additional methods to make use of the tvOS focus engine. The `Touchable` mixin has code added to detect focus changes and use existing methods to style the components properly and initiate the proper actions when the view is selected using the TV remote, so `TouchableHighlight` and `TouchableOpacity` will "just work". In particular:

  * `touchableHandleActivePressIn` will be executed when the touchable view goes into focus
  * `touchableHandleActivePressOut` will be executed when the touchable view goes out of focus
  * `touchableHandlePress` will be executed when the touchable view is actually selected by pressing the "select" button on the TV remote.

<block class="android" />

* _访问可点击的控件_: When running on Android TV the Android framework will automatically apply a directional navigation scheme based on relative position of focusable elements in your views. The `Touchable` mixin has code added to detect focus changes and use existing methods to style the components properly and initiate the proper actions when the view is selected using the TV remote, so `TouchableHighlight`, `TouchableOpacity` and `TouchableNativeFeedback` will "just work". In particular:

  * `touchableHandleActivePressIn` will be executed when the touchable view goes into focus
  * `touchableHandleActivePressOut` will be executed when the touchable view goes out of focus
  * `touchableHandlePress` will be executed when the touchable view is actually selected by pressing the "select" button on the TV remote.

<block class="ios" />

* _TV remote/keyboard input_: A new native class, `RCTTVRemoteHandler`, sets up gesture recognizers for TV remote events. When TV remote events occur, this class fires notifications that are picked up by `RCTTVNavigationEventEmitter` (a subclass of `RCTEventEmitter`), that fires a JS event. This event will be picked up by instances of the `TVEventHandler` JavaScript object. Application code that needs to implement custom handling of TV remote events can create an instance of `TVEventHandler` and listen for these events, as in the following code:

<block class="android">

* _TV remote/keyboard input_: A new native class, `ReactAndroidTVRootViewHelper`, sets up key events handlers for TV remote events. When TV remote events occur, this class fires a JS event. This event will be picked up by instances of the `TVEventHandler` JavaScript object. Application code that needs to implement custom handling of TV remote events can create an instance of `TVEventHandler` and listen for these events, as in the following code:

<block class="ios android">

```javascript
var TVEventHandler = require('TVEventHandler');

.
.
.

class Game2048 extends React.Component {
  _tvEventHandler: any;

  _enableTVEventHandler() {
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, function(cmp, evt) {
      if (evt && evt.eventType === 'right') {
        cmp.setState({board: cmp.state.board.move(2)});
      } else if(evt && evt.eventType === 'up') {
        cmp.setState({board: cmp.state.board.move(1)});
      } else if(evt && evt.eventType === 'left') {
        cmp.setState({board: cmp.state.board.move(0)});
      } else if(evt && evt.eventType === 'down') {
        cmp.setState({board: cmp.state.board.move(3)});
      } else if(evt && evt.eventType === 'playPause') {
        cmp.restartGame();
      }
    });
  }

  _disableTVEventHandler() {
    if (this._tvEventHandler) {
      this._tvEventHandler.disable();
      delete this._tvEventHandler;
    }
  }

  componentDidMount() {
    this._enableTVEventHandler();
  }

  componentWillUnmount() {
    this._disableTVEventHandler();
  }
```

<block class="ios" />

* _Dev Menu support_: On the simulator, cmd-D will bring up the developer menu, just like on iOS. To bring it up on a real Apple TV device, make a long press on the play/pause button on the remote. (Please do not shake the Apple TV device, that will not work :) )

* _TV remote animations_: `RCTTVView` native code implements Apple-recommended parallax animations to help guide the eye as the user navigates through views. The animations can be disabled or adjusted with new optional view properties.

* _Back navigation with the TV remote menu button_: The `BackHandler` component, originally written to support the Android back button, now also supports back navigation on the Apple TV using the menu button on the TV remote.

* _TabBarIOS behavior_: The `TabBarIOS` component wraps the native `UITabBar` API, which works differently on Apple TV. To avoid jittery rerendering of the tab bar in tvOS (see [this issue](https://github.com/facebook/react-native/issues/15081)), the selected tab bar item can only be set from Javascript on initial render, and is controlled after that by the user through native code.

<block class="android" />

* _Dev Menu support_: On the simulator, cmd-M will bring up the developer menu, just like on Android. To bring it up on a real Android TV device, make a long press on the play/pause button on the remote. (Please do not shake the Android TV device, that will not work :) )

<block class="ios" />

* _已知问题_:

  * [ListView scrolling](https://github.com/facebook/react-native/issues/12793). The issue can be easily worked around by setting `removeClippedSubviews` to false in ListView and similar components. For more discussion of this issue, see [this PR](https://github.com/facebook/react-native/pull/12944).

<block class="android" />

* _已知问题_:

  * `TextInput` components do not work for now (i.e. they cannot receive focus).

<script>
  function displayTab(type, value) {
    var container = document.getElementsByTagName('block')[0].parentNode;
    container.className = 'display-' + type + '-' + value + ' ' +
      container.className.replace(RegExp('display-' + type + '-[a-z]+ ?'), '');
  }
  function convertBlocks() {
    // Convert <div>...<span><block /></span>...</div>
    // Into <div>...<block />...</div>
    var blocks = document.querySelectorAll('block');
    for (var i = 0; i < blocks.length; ++i) {
      var block = blocks[i];
      var span = blocks[i].parentNode;
      var container = span.parentNode;
      container.insertBefore(block, span);
      container.removeChild(span);
    }
    // Convert <div>...<block />content<block />...</div>
    // Into <div>...<block>content</block><block />...</div>
    blocks = document.querySelectorAll('block');
    for (var i = 0; i < blocks.length; ++i) {
      var block = blocks[i];
      while (
        block.nextSibling &&
        block.nextSibling.tagName !== 'BLOCK'
      ) {
        block.appendChild(block.nextSibling);
      }
    }
  }
  function guessPlatformAndOS() {
    if (!document.querySelector('block')) {
      return;
    }
    // If we are coming to the page with a hash in it (i.e. from a search, for example), try to get
    // us as close as possible to the correct platform and dev os using the hashtag and block walk up.
    var foundHash = false;
    if (
      window.location.hash !== '' &&
      window.location.hash !== 'content'
    ) {
      // content is default
      var hashLinks = document.querySelectorAll(
        'a.hash-link'
      );
      for (
        var i = 0;
        i < hashLinks.length && !foundHash;
        ++i
      ) {
        if (hashLinks[i].hash === window.location.hash) {
          var parent = hashLinks[i].parentElement;
          while (parent) {
            if (parent.tagName === 'BLOCK') {
              // Could be more than one target os and dev platform, but just choose some sort of order
              // of priority here.
              // Target Platform
              if (parent.className.indexOf('ios') > -1) {
                displayTab('platform', 'ios');
                foundHash = true;
              } else if (
                parent.className.indexOf('android') > -1
              ) {
                displayTab('platform', 'android');
                foundHash = true;
              } else {
                break;
              }
            }
            parent = parent.parentElement;
          }
        }
      }
    }
    // Do the default if there is no matching hash
    if (!foundHash) {
      var isMac = navigator.platform === 'MacIntel';
      var isWindows = navigator.platform === 'Win32';
      displayTab('platform', isMac ? 'ios' : 'android');
    }
  }
  convertBlocks();
  guessPlatformAndOS();
</script>
