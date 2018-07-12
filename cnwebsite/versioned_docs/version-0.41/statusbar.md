---
id: version-0.41-statusbar
title: StatusBar
original_id: statusbar
---

用于控制应用状态栏的组件。

### 与Navigator搭配的用法
`StatusBar`组件可以同时加载多个。此时属性会按照加载顺序合并（后者覆盖前者）。一个典型的用法就是在使用`Navigator`时，针对不同的路由指定不同的状态栏样式，如下：
```js
 <View>
   <StatusBar
     backgroundColor="blue"
     barStyle="light-content"
   />
   <Navigator
     initialRoute={{statusBarHidden: true}}
     renderScene={(route, navigator) =>
       <View>
         <StatusBar hidden={route.statusBarHidden} />
         ...
       </View>
     }
   />
 </View>
```

### 常量

`currentHeight` 状态栏的当前高度。
 

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="animated"></a>animated <span
            class="propType">bool</span> <a class="hash-link" href="#animated">#</a></h4>
        <div><p>指定状态栏的变化是否应以动画形式呈现。目前支持这几种样式：backgroundColor, barStyle和hidden。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="hidden"></a>hidden <span
            class="propType">bool</span> <a class="hash-link" href="#hidden">#</a></h4>
        <div><p>是否隐藏状态栏。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="backgroundcolor"></a><span
            class="platform">android</span>backgroundColor <span class="propType"><a href="colors.html">color</a></span>
        <a class="hash-link" href="#backgroundcolor">#</a></h4>
        <div><p>状态栏的背景色。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="translucent"></a><span
            class="platform">android</span>translucent <span class="propType">bool</span> <a class="hash-link"
                                                                                             href="#translucent">#</a>
    </h4>
        <div><p>指定状态栏是否透明。设置为true时，应用会在状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="barstyle"></a>barStyle
        <span class="propType">enum('default', 'light-content', 'dark-content')</span> <a class="hash-link" href="#barstyle">#</a></h4>
        <div><p>设置状态栏文本的颜色。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="networkactivityindicatorvisible"></a><span
            class="platform">ios</span>networkActivityIndicatorVisible <span class="propType">bool</span> <a
            class="hash-link" href="#networkactivityindicatorvisible">#</a></h4>
        <div><p>指定是否显示网络活动提示符。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="showhidetransition"></a><span
            class="platform">ios</span>showHideTransition <span class="propType">enum('fade', 'slide')</span> <a
            class="hash-link" href="#showhidetransition">#</a></h4>
        <div><p>通过<code>hidden</code>属性来显示或隐藏状态栏时所使用的动画效果。默认值为'fade'。</p></div>
    </div>
</div>

### 例子

```javascript
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = ReactNative;

exports.framework = 'React';
exports.title = '<StatusBar>';
exports.description = 'Component for controlling the status bar';

const colors = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
];

const barStyles = [
  'default',
  'light-content',
];

const showHideTransitions = [
  'fade',
  'slide',
];

function getValue<T>(values: Array<T>, index: number): T {
  return values[index % values.length];
}

const StatusBarHiddenExample = React.createClass({
  getInitialState() {
    return {
      animated: true,
      hidden: false,
      showHideTransition: getValue(showHideTransitions, 0),
    };
  },

  _showHideTransitionIndex: 0,

  _onChangeAnimated() {
    this.setState({animated: !this.state.animated});
  },

  _onChangeHidden() {
    this.setState({hidden: !this.state.hidden});
  },

  _onChangeTransition() {
    this._showHideTransitionIndex++;
    this.setState({
      showHideTransition: getValue(showHideTransitions, this._showHideTransitionIndex),
    });
  },

  render() {
    return (
      <View>
        <StatusBar
          hidden={this.state.hidden}
          showHideTransition={this.state.showHideTransition}
          animated={this.state.animated}
        />
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeHidden}>
          <View style={styles.button}>
            <Text>hidden: {this.state.hidden ? 'true' : 'false'}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeAnimated}>
          <View style={styles.button}>
            <Text>animated (ios only): {this.state.animated ? 'true' : 'false'}</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeTransition}>
          <View style={styles.button}>
            <Text>
              showHideTransition (ios only):
              '{getValue(showHideTransitions, this._showHideTransitionIndex)}'
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
});

const StatusBarStyleExample = React.createClass({
  getInitialState() {
    return {
      animated: true,
      barStyle: getValue(barStyles, this._barStyleIndex),
    };
  },

  _barStyleIndex: 0,

  _onChangeBarStyle() {
    this._barStyleIndex++;
    this.setState({barStyle: getValue(barStyles, this._barStyleIndex)});
  },

  _onChangeAnimated() {
    this.setState({animated: !this.state.animated});
  },

  render() {
    return (
      <View>
        <StatusBar
          animated={this.state.animated}
          barStyle={this.state.barStyle}
        />
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeBarStyle}>
          <View style={styles.button}>
            <Text>style: '{getValue(barStyles, this._barStyleIndex)}'</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeAnimated}>
          <View style={styles.button}>
            <Text>animated: {this.state.animated ? 'true' : 'false'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
});

const StatusBarNetworkActivityExample = React.createClass({
  getInitialState() {
    return {
      networkActivityIndicatorVisible: false,
    };
  },

  _onChangeNetworkIndicatorVisible() {
    this.setState({
      networkActivityIndicatorVisible: !this.state.networkActivityIndicatorVisible,
    });
  },

  render() {
    return (
      <View>
        <StatusBar
          networkActivityIndicatorVisible={this.state.networkActivityIndicatorVisible}
        />
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeNetworkIndicatorVisible}>
          <View style={styles.button}>
            <Text>
              networkActivityIndicatorVisible:
              {this.state.networkActivityIndicatorVisible ? 'true' : 'false'}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
});

const StatusBarBackgroundColorExample = React.createClass({
  getInitialState() {
    return {
      animated: true,
      backgroundColor: getValue(colors, 0),
    };
  },

  _colorIndex: 0,

  _onChangeBackgroundColor() {
    this._colorIndex++;
    this.setState({backgroundColor: getValue(colors, this._colorIndex)});
  },

  _onChangeAnimated() {
    this.setState({animated: !this.state.animated});
  },

  render() {
    return (
      <View>
        <StatusBar
          backgroundColor={this.state.backgroundColor}
          animated={this.state.animated}
        />
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeBackgroundColor}>
          <View style={styles.button}>
            <Text>backgroundColor: '{getValue(colors, this._colorIndex)}'</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeAnimated}>
          <View style={styles.button}>
            <Text>animated: {this.state.animated ? 'true' : 'false'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
});


const StatusBarTranslucentExample = React.createClass({
  getInitialState() {
    return {
      translucent: false,
    };
  },

  _onChangeTranslucent() {
    this.setState({
      translucent: !this.state.translucent,
    });
  },

  render() {
    return (
      <View>
        <StatusBar
          translucent={this.state.translucent}
        />
        <TouchableHighlight
          style={styles.wrapper}
          onPress={this._onChangeTranslucent}>
          <View style={styles.button}>
            <Text>translucent: {this.state.translucent ? 'true' : 'false'}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
});

const StatusBarStaticIOSExample = React.createClass({
  render() {
    return (
      <View>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setHidden(true, 'slide');
          }}>
          <View style={styles.button}>
            <Text>setHidden(true, 'slide')</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setHidden(false, 'fade');
          }}>
          <View style={styles.button}>
            <Text>setHidden(false, 'fade')</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setBarStyle('default', true);
          }}>
          <View style={styles.button}>
            <Text>setBarStyle('default', true)</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setBarStyle('light-content', true);
          }}>
          <View style={styles.button}>
            <Text>setBarStyle('light-content', true)</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setNetworkActivityIndicatorVisible(true);
          }}>
          <View style={styles.button}>
            <Text>setNetworkActivityIndicatorVisible(true)</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setNetworkActivityIndicatorVisible(false);
          }}>
          <View style={styles.button}>
            <Text>setNetworkActivityIndicatorVisible(false)</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
});

const StatusBarStaticAndroidExample = React.createClass({
  render() {
    return (
      <View>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setHidden(true);
          }}>
          <View style={styles.button}>
            <Text>setHidden(true)</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setHidden(false);
          }}>
          <View style={styles.button}>
            <Text>setHidden(false)</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setBackgroundColor('#ff00ff', true);
          }}>
          <View style={styles.button}>
            <Text>setBackgroundColor('#ff00ff', true)</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setBackgroundColor('#00ff00', true);
          }}>
          <View style={styles.button}>
            <Text>setBackgroundColor('#00ff00', true)</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.4)', true);
          }}>
          <View style={styles.button}>
            <Text>setTranslucent(true) and setBackgroundColor('rgba(0, 0, 0, 0.4)', true)</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.wrapper}
          onPress={() => {
            StatusBar.setTranslucent(false);
            StatusBar.setBackgroundColor('black', true);
          }}>
          <View style={styles.button}>
            <Text>setTranslucent(false) and setBackgroundColor('black', true)</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  },
});

const examples = [{
  title: 'StatusBar hidden',
  render() {
    return <StatusBarHiddenExample />;
  },
}, {
  title: 'StatusBar style',
  render() {
    return <StatusBarStyleExample />;
  },
  platform: 'ios',
}, {
  title: 'StatusBar network activity indicator',
  render() {
    return <StatusBarNetworkActivityExample />;
  },
  platform: 'ios',
}, {
  title: 'StatusBar background color',
  render() {
    return <StatusBarBackgroundColorExample />;
  },
  platform: 'android',
}, {
  title: 'StatusBar background color',
  render() {
    return <StatusBarTranslucentExample />;
  },
  platform: 'android',
}, {
  title: 'StatusBar static API',
  render() {
    return <StatusBarStaticIOSExample />;
  },
  platform: 'ios',
}, {
  title: 'StatusBar static API',
  render() {
    return <StatusBarStaticAndroidExample />;
  },
  platform: 'android',
}, {
  title: 'StatusBar dimensions',
  render() {
    return (
      <View>
        <Text>Height: {StatusBar.currentHeight} pts</Text>
      </View>
    );
  }
}];

exports.examples = examples;

var styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#eeeeee',
    padding: 10,
  },
  title: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  }
});
```
