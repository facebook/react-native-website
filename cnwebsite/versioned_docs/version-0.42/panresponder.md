---
id: version-0.42-panresponder
title: PanResponder
original_id: panresponder
---

`PanResponder`类可以将多点触摸操作协调成一个手势。它使得一个单点触摸可以接受更多的触摸操作，也可以用于识别简单的多点触摸手势。

它提供了一个对[触摸响应系统](gesture-responder-system.html)响应器的可预测的包装。对于每一个处理函数，它在原生事件之外提供了一个新的`gestureState`对象。  

```javascript
onPanResponderMove: (event, gestureState) => {}
```  

原生事件是指由以下字段组成的合成触摸事件：   
 
- `nativeEvent`
     + `changedTouches` - 在上一次事件之后，所有发生变化的触摸事件的数组集合（即上一次事件后，所有移动过的触摸点）
     + `identifier` - 触摸点的ID
     + `locationX` - 触摸点相对于父元素的横坐标
     + `locationY` - 触摸点相对于父元素的纵坐标
     + `pageX` - 触摸点相对于根元素的横坐标
     + `pageY` - 触摸点相对于根元素的纵坐标
     + `target` - 触摸点所在的元素ID
     + `timestamp` - 触摸事件的时间戳，可用于移动速度的计算
     + `touches` - 当前屏幕上的所有触摸点的集合

一个`gestureState`对象有如下的字段：

* `stateID` - 触摸状态的ID。在屏幕上有至少一个触摸点的情况下，这个ID会一直有效。
* `moveX` - 最近一次移动时的屏幕横坐标
* `moveY` - 最近一次移动时的屏幕纵坐标
* `x0` - 当响应器产生时的屏幕坐标
* `y0` - 当响应器产生时的屏幕坐标
* `dx` - 从触摸操作开始时的累计横向路程
* `dy` - 从触摸操作开始时的累计纵向路程
* `vx` - 当前的横向移动速度
* `vy` - 当前的纵向移动速度
* `numberActiveTouches` - 当前在屏幕上的有效触摸点的数量

### 基本用法

```javascript
  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        // 开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！

        // gestureState.{x,y}0 现在会被设置为0
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
  },

  render: function() {
    return (
      <View {...this._panResponder.panHandlers} />
    );
  },
```

### 可运行的例子

要想看看可以直接使用的例子，请参阅[UIExplorer中的PanResponder](https://github.com/facebook/react-native/blob/master/Examples/UIExplorer/js/PanResponderExample.js)

### 方法

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="create"></a><span class="propType">static </span>create<span class="propType">(config: object)</span> <a class="hash-link" href="#create">#</a></h4>
        <div>
            <p>@param {object} 配置所有响应器回调的加强版本，不仅仅包括原本的<code>ResponderSyntheticEvent</code>，还包括<code>PanResponder</code>手势状态的回调。你只要简单的把<code>onResponder*</code>回调中的<code>Responder</code>替换为<code>PanResponder</code>。举例来说，这个<code>config</code>对象可能看起来像这样：</p>
            <ul>
                <li><code>onMoveShouldSetPanResponder: (e, gestureState) =&gt; {...}</code></li>
                <li><code>onMoveShouldSetPanResponderCapture: (e, gestureState) =&gt; {...}</code></li>
                <li><code>onStartShouldSetPanResponder: (e, gestureState) =&gt; {...}</code></li>
                <li><code>onStartShouldSetPanResponderCapture: (e, gestureState) =&gt; {...}</code></li>
                <li><code>onPanResponderReject: (e, gestureState) =&gt; {...}</code></li>
                <li><code>onPanResponderGrant: (e, gestureState) =&gt; {...}</code></li>
                <li><code>onPanResponderStart: (e, gestureState) =&gt; {...}</code></li>
                <li><code>onPanResponderEnd: (e, gestureState) =&gt; {...}</code></li>
                <li><code>onPanResponderRelease: (e, gestureState) =&gt; {...}</code></li>
                <li><code>onPanResponderMove: (e, gestureState) =&gt; {...}</code></li>
                <li><code>onPanResponderTerminate: (e, gestureState) =&gt; {...}</code></li>
                <li><code>onPanResponderTerminationRequest: (e, gestureState) =&gt; {...}</code></li>
                <li>
                    <p><code>onShouldBlockNativeResponder: (e, gestureState) =&gt; {...}</code></p>
                    <p>通常来说，对那些有对应捕获事件的事件来说，我们在捕获阶段更新gestureState一次，然后在冒泡阶段直接使用即可。</p>
                    <p>注意onStartShould* 回调。他们只会在此节点冒泡/捕获的开始/结束事件中提供已经更新过的<code>gestureState</code>。一旦这个节点成为了事件的响应者，则所有的开始/结束事件都会被手势正确处理，并且<code>gestureState</code>也会被正确更新。(numberActiveTouches)有可能没有包含所有的触摸点，除非你就是触摸事件的响应者。</p>
                </li>
            </ul>
        </div>
    </div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  PanResponder,
  StyleSheet,
  View,
  processColor,
} = ReactNative;

var CIRCLE_SIZE = 80;

var PanResponderExample = React.createClass({

  statics: {
    title: 'PanResponder Sample',
    description: 'Shows the use of PanResponder to provide basic gesture handling.',
  },

  _panResponder: {},
  _previousLeft: 0,
  _previousTop: 0,
  _circleStyles: {},
  circle: (null : ?{ setNativeProps(props: Object): void }),

  componentWillMount: function() {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });
    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
        backgroundColor: 'green',
      }
    };
  },

  componentDidMount: function() {
    this._updateNativeStyles();
  },

  render: function() {
    return (
      <View
        style={styles.container}>
        <View
          ref={(circle) => {
            this.circle = circle;
          }}
          style={styles.circle}
          {...this._panResponder.panHandlers}
        />
      </View>
    );
  },

  _highlight: function() {
    this._circleStyles.style.backgroundColor = 'blue';
    this._updateNativeStyles();
  },

  _unHighlight: function() {
    this._circleStyles.style.backgroundColor = 'green';
    this._updateNativeStyles();
  },

  _updateNativeStyles: function() {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  },

  _handleStartShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user presses down on the circle?
    return true;
  },

  _handleMoveShouldSetPanResponder: function(e: Object, gestureState: Object): boolean {
    // Should we become active when the user moves a touch over the circle?
    return true;
  },

  _handlePanResponderGrant: function(e: Object, gestureState: Object) {
    this._highlight();
  },
  _handlePanResponderMove: function(e: Object, gestureState: Object) {
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updateNativeStyles();
  },
  _handlePanResponderEnd: function(e: Object, gestureState: Object) {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  },
});

var styles = StyleSheet.create({
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  container: {
    flex: 1,
    paddingTop: 64,
  },
});

module.exports = PanResponderExample;
```