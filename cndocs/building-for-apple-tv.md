---
id: building-for-apple-tv
title: 为电视和机顶盒制作应用
---

目前的 React Native 应用只需在 JavaScript 端简单修改甚至无需修改，在电视和机顶盒设备上就基本可用了。

<div class="toggler">
   <ul role="tablist" id="toggle-platform">
    <li id="ios" class="button-ios" aria-selected="false" role="tab" tabindex="0" aria-controls="iostab" onclick="displayTab('platform', 'ios')">
      iOS
    </li>
    <li id="android" class="button-android" aria-selected="false" role="tab" tabindex="0" aria-controls="androidtab" onclick="displayTab('platform', 'android')">
      Android
    </li>
  </ul>
</div>

<block class="ios" />

源代码仓库里的[RNTester 演示应用](https://github.com/facebook/react-native/tree/master/RNTester)支持在 Apple TV 上运行，使用`RNTester-tvOS`编译目标来在 tvOS 上编译运行。

## 编译变更

- _原生端_: React Native 生成的 Xcode 项目现都已包含 Apple TV 编译目标，其名字都带有'-tvOS'后缀。

- _react-native init_: 使用`react-native init`命令创建的新项目会自动在 Xcode 新项目中包含 Apple TV 编译目标。

- _JavaScript 端_: 对于电视设备的检测代码已经加入到了`Platform`模块中。你可以使用下面的代码来检测当前运行设备是否是电视设备：

```jsx
import {Platform} from 'react-native';
const running_on_tv = Platform.isTV;

// 如果你想更精确地针对tvOS设备（即排除Android设备），
// 那么可以使用下面的代码：
const running_on_apple_tv = Platform.isTVOS;
```

<block class="android" />

## 编译修改

- _原生端_: 在 Android TV 上运行 React Native 项目请先在`AndroidManifest.xml`中加入下列配置：

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

- _JavaScript 端_: 对于电视设备的检测代码已经加入到了`Platform`模块中。你可以使用下面的代码来检测当前运行设备是否是电视设备：

```js
import {Platform} from 'react-native';
const running_on_tv = Platform.isTV;
```

<block class="ios android" />

## 代码修改

<block class="ios" />

- _General support for tvOS_: Apple TV specific changes in native code are all wrapped by the TARGET_OS_TV define. These include changes to suppress APIs that are not supported on tvOS (e.g. web views, sliders, switches, status bar, etc.), and changes to support user input from the TV remote or keyboard.

- _Common codebase_: Since tvOS and iOS share most Objective-C and JavaScript code in common, most documentation for iOS applies equally to tvOS.

- _访问可点击的控件_: When running on Apple TV, the native view class is `RCTTVView`, which has additional methods to make use of the tvOS focus engine. The `Touchable` mixin has code added to detect focus changes and use existing methods to style the components properly and initiate the proper actions when the view is selected using the TV remote, so `TouchableWithoutFeedback`, `TouchableHighlight` and `TouchableOpacity` will "just work". In particular:

  - `onFocus` will be executed when the touchable view goes into focus
  - `onBlur` will be executed when the touchable view goes out of focus
  - `onPress` will be executed when the touchable view is actually selected by pressing the "select" button on the TV remote.

<block class="android" />

- _访问可点击的控件_: When running on Android TV the Android framework will automatically apply a directional navigation scheme based on relative position of focusable elements in your views. The `Touchable` mixin has code added to detect focus changes and use existing methods to style the components properly and initiate the proper actions when the view is selected using the TV remote, so `TouchableWithoutFeedback`, `TouchableHighlight`, `TouchableOpacity` and `TouchableNativeFeedback` will "just work". In particular:

  - `onFocus` will be executed when the touchable view goes into focus
  - `onBlur` will be executed when the touchable view goes out of focus
  - `onPress` will be executed when the touchable view is actually selected by pressing the "select" button on the TV remote.

<block class="ios" />

- _TV remote/keyboard input_: A new native class, `RCTTVRemoteHandler`, sets up gesture recognizers for TV remote events. When TV remote events occur, this class fires notifications that are picked up by `RCTTVNavigationEventEmitter` (a subclass of `RCTEventEmitter`), that fires a JS event. This event will be picked up by instances of the `TVEventHandler` JavaScript object. Application code that needs to implement custom handling of TV remote events can create an instance of `TVEventHandler` and listen for these events, as in the following code:

<block class="android">

- _TV remote/keyboard input_: A new native class, `ReactAndroidTVRootViewHelper`, sets up key events handlers for TV remote events. When TV remote events occur, this class fires a JS event. This event will be picked up by instances of the `TVEventHandler` JavaScript object. Application code that needs to implement custom handling of TV remote events can create an instance of `TVEventHandler` and listen for these events, as in the following code:

<block class="ios android">

```jsx
var TVEventHandler = require('TVEventHandler');

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

- _Dev Menu support_: On the simulator, cmd-M will bring up the developer menu, just like on Android. To bring it up on a real Android TV device, press the menu button or long press the fast-forward button on the remote. (Please do not shake the Android TV device, that will not work :) )

- _TV remote animations_: `RCTTVView` native code implements Apple-recommended parallax animations to help guide the eye as the user navigates through views. The animations can be disabled or adjusted with new optional view properties.

- _Back navigation with the TV remote menu button_: The `BackHandler` component, originally written to support the Android back button, now also supports back navigation on the Apple TV using the menu button on the TV remote.

- _TabBarIOS behavior_: The `TabBarIOS` component wraps the native `UITabBar` API, which works differently on Apple TV. To avoid jittery rerendering of the tab bar in tvOS (see [this issue](https://github.com/facebook/react-native/issues/15081)), the selected tab bar item can only be set from Javascript on initial render, and is controlled after that by the user through native code.

<block class="android" />

- _Dev Menu support_: On the simulator, cmd-M will bring up the developer menu, just like on Android. To bring it up on a real Android TV device, make a long press on the play/pause button on the remote. (Please do not shake the Android TV device, that will not work :) )

<block class="ios" />

- _已知问题_:

  - [ListView scrolling](https://github.com/facebook/react-native/issues/12793). The issue can be easily worked around by setting `removeClippedSubviews` to false in ListView and similar components. For more discussion of this issue, see [this PR](https://github.com/facebook/react-native/pull/12944).

<block class="android" />

- _已知问题_:

  - `TextInput` components do not work for now (i.e. they cannot receive focus).
