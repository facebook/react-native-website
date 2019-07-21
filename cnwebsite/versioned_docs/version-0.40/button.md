---
id: version-0.40-button
title: Button
original_id: button
---

一个简单的跨平台的按钮组件。可以进行一些简单的定制。

![](/img/components/buttonExample.png)

如果这个组件外观并不怎么搭配你的设计，那你可以使用`TouchableOpacity`或是`TouchableNativeFeedback`组件来制作自己所需要的按钮，视频教程[如何制作一个按钮](http://v.youku.com/v_show/id_XMTQ5OTE3MjkzNg==.html?f=26822355&from=y1.7-1.3)讲述了完整的过程。或者你也可以在github.com网站上搜索'react native button'来看看社区其他人的作品。


用法示例：

```js
<Button
  onPress={onPressLearnMore}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
```

### 属性
<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="accessibilitylabel"></a>accessibilityLabel <span
            class="propType">string</span> <a class="hash-link" href="#accessibilitylabel">#</a></h4>
        <div><p>用于给残障人士显示的文本（比如读屏器软件可能会读取这一内容）</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="color"></a>color <span class="propType"><a
            href="colors.html">color</a></span> <a class="hash-link" href="#color">#</a></h4>
        <div><p>文本的颜色(iOS)，或是按钮的背景色(Android)</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="disabled"></a>disabled <span
            class="propType">bool</span> <a class="hash-link" href="#disabled">#</a></h4>
        <div><p>设置为true时此按钮将不可点击</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onpress"></a>onPress <span
            class="propType">function</span> <a class="hash-link" href="#onpress">#</a></h4>
        <div><p>用户点击此按钮时所调用的处理函数</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="title"></a>title <span
            class="propType">string</span> <a class="hash-link" href="#title">#</a></h4>
        <div><p>按钮内显示的文本</p></div>
    </div>
</div>

### 例子

```jsx
use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  Alert,
  Button,
  View,
} = ReactNative;

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

exports.displayName = 'ButtonExample';
exports.framework = 'React';
exports.title = '<Button>';
exports.description = 'Simple React Native button component.';

exports.examples = [
  {
    title: 'Simple Button',
    description: 'The title and onPress handler are required. It is ' +
      'recommended to set accessibilityLabel to help make your app usable by ' +
      'everyone.',
    render: function() {
      return (
        <Button
          onPress={onButtonPress}
          title="Press Me"
          accessibilityLabel="See an informative alert"
        />
      );
    },
  },
  {
    title: 'Adjusted color',
    description: 'Adjusts the color in a way that looks standard on each ' +
      'platform. On iOS, the color prop controls the color of the text. On ' +
      'Android, the color adjusts the background color of the button.',
    render: function() {
      return (
        <Button
          onPress={onButtonPress}
          title="Press Purple"
          color="#841584"
          accessibilityLabel="Learn more about purple"
        />
      );
    },
  },
  {
    title: 'Fit to text layout',
    description: 'This layout strategy lets the title define the width of ' +
      'the button',
    render: function() {
      return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            onPress={onButtonPress}
            title="This looks great!"
            accessibilityLabel="This sounds great!"
          />
          <Button
            onPress={onButtonPress}
            title="Ok!"
            color="#841584"
            accessibilityLabel="Ok, Great!"
          />
        </View>
      );
    },
  },
  {
    title: 'Disabled Button',
    description: 'All interactions for the component are disabled.',
    render: function() {
      return (
        <Button
          disabled
          onPress={onButtonPress}
          title="I Am Disabled"
          accessibilityLabel="See an informative alert"
        />
      );
    },
  },
];
```
