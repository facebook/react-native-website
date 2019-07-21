---
id: version-0.43-toastandroid
title: ToastAndroid
original_id: toastandroid
---

本模块将原生的ToastAndroid模块导出为一个JS模块，用于在Android设备上显示一个悬浮的提示信息。本模块包含一个`show`方法接受以下的参数：

1. String message: 一个字符串，表示将要显示的文本内容。
2. int duration: 提示信息持续显示的时间。可以是`ToastAndroid.SHORT`或者`ToastAndroid.LONG`。

还有一个名为`showWithGravity`的方法可以指定弹出的位置。可选项有：ToastAndroid.TOP, ToastAndroid.BOTTOM, ToastAndroid.CENTER.

用法示例：  
```jsx
ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
ToastAndroid.showWithGravity('All Your Base Are Belong To Us', ToastAndroid.SHORT, ToastAndroid.CENTER);
```

### 截图
![toastandroid](/img/api/toastandroid.png)

### 方法


<div class="props">
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="show"></a><span class="propType">static </span>show<span class="propType">(message: string, duration: number)</span> <a class="hash-link" href="#show">#</a></h4></div>
	<div class="prop"><h4 class="methodTitle"><a class="anchor" name="showwithgravity"></a><span class="methodType">static </span>showWithGravity<span class="methodType">(message, duration, gravity)</span> <a class="hash-link" href="#showwithgravity">#</a></h4></div>
</div>

### 属性

<div class="props"><div class="prop"><h4 class="propTitle"><a class="anchor" name="short"></a>SHORT<span class="propType">: MemberExpression</span> <a class="hash-link" href="#short">#</a></h4><div><p>// Toast duration constants</p></div></div><div class="prop"><h4 class="propTitle"><a class="anchor" name="long"></a>LONG<span class="propType">: MemberExpression</span> <a class="hash-link" href="#long">#</a></h4></div><div class="prop"><h4 class="propTitle"><a class="anchor" name="top"></a>TOP<span class="propType">: MemberExpression</span> <a class="hash-link" href="#top">#</a></h4><div><p>// Toast gravity constants</p></div></div><div class="prop"><h4 class="propTitle"><a class="anchor" name="bottom"></a>BOTTOM<span class="propType">: MemberExpression</span> <a class="hash-link" href="#bottom">#</a></h4></div><div class="prop"><h4 class="propTitle"><a class="anchor" name="center"></a>CENTER<span class="propType">: MemberExpression</span> <a class="hash-link" href="#center">#</a></h4></div></div>
### 例子

```jsx
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableWithoutFeedback,
} = ReactNative;

var UIExplorerBlock = require('UIExplorerBlock');
var UIExplorerPage = require('UIExplorerPage');

class ToastExample extends React.Component {
  static title = 'Toast Example';
  static description = 'Example that demonstrates the use of an Android Toast to provide feedback.';
  state = {};

  render() {
    return (
      <UIExplorerPage title="ToastAndroid">
        <UIExplorerBlock title="Simple toast">
          <TouchableWithoutFeedback
            onPress={() =>
              ToastAndroid.show('This is a toast with short duration', ToastAndroid.SHORT)}>
            <Text style={styles.text}>Click me.</Text>
          </TouchableWithoutFeedback>
        </UIExplorerBlock>
        <UIExplorerBlock title="Toast with long duration">
          <TouchableWithoutFeedback
            onPress={() =>
              ToastAndroid.show('This is a toast with long duration', ToastAndroid.LONG)}>
            <Text style={styles.text}>Click me.</Text>
          </TouchableWithoutFeedback>
        </UIExplorerBlock>
        <UIExplorerBlock title="Toast with top gravity">
          <TouchableWithoutFeedback
            onPress={() =>
              ToastAndroid.showWithGravity(
                'This is a toast with top gravity',
                ToastAndroid.SHORT,
                ToastAndroid.TOP,
              )
            }>
            <Text style={styles.text}>Click me.</Text>
          </TouchableWithoutFeedback>
        </UIExplorerBlock>
        <UIExplorerBlock title="Toast with center gravity">
          <TouchableWithoutFeedback
            onPress={() =>
              ToastAndroid.showWithGravity(
                'This is a toast with center gravity',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
              )
            }>
            <Text style={styles.text}>Click me.</Text>
          </TouchableWithoutFeedback>
        </UIExplorerBlock>
        <UIExplorerBlock title="Toast with bottom gravity">
          <TouchableWithoutFeedback
            onPress={() =>
              ToastAndroid.showWithGravity(
                'This is a toast with bottom gravity',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
              )
            }>
            <Text style={styles.text}>Click me.</Text>
          </TouchableWithoutFeedback>
        </UIExplorerBlock>
      </UIExplorerPage>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: 'black',
  },
});

module.exports = ToastExample;
```