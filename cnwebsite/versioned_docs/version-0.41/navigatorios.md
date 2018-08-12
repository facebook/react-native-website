---
id: version-0.41-navigatorios
title: NavigatorIOS
original_id: navigatorios
---

`NavigatorIOS` is a wrapper around `UINavigationController`, enabling you to implement a navigation stack. It works exactly the same as it would on a native app using `UINavigationController`, providing the same animations and behavior from UIKIt.

As the name implies, it is only available on iOS. Take a look at Navigator for a similar solution for your cross-platform needs, or check out [react-native-navigation](https://github.com/wix/react-native-navigation), a component that aims to provide native navigation on both iOS and Android.

To set up the navigator, provide the `initialRoute` prop with a route object. A route object is used to describe each scene that your app navigates to. `initialRoute` represents the first route in your navigator.

```js
import React, { Component, PropTypes } from 'react';
import { NavigatorIOS, Text } from 'react-native';

export default class NavigatorIOSApp extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: MyScene,
          title: 'My Initial Scene',
        }}
        style={{flex: 1}}
      />
    );
  }
}

class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  constructor(props, context) {
    super(props, context);
    this._onForward = this._onForward.bind(this);
    this._onBack = this._onBack.bind(this);
  }

  _onForward() {
    this.props.navigator.push({
      title: 'Scene ' + nextIndex,
    });
  }

  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this._onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
```

In this code, the navigator renders the component specified in `initialRoute`, which in this case is `MyScene`. This component will receive a `route` prop and a `navigator` prop representing the navigator. The navigator's navigation bar will render the title for the current scene, "My Initial Scene".

You can optionally pass in a `passProps` property to your `initialRoute`. `NavigatorIOS` passes this in as props to the rendered component:

```js
initialRoute={{
  component: MyScene,
  title: 'My Initial Scene',
  passProps: { myProp: 'foo' }
}}
```

You can then access the props passed in via `{this.props.myProp}`.

### 处理导航

To trigger navigation functionality such as pushing or popping a view, you have access to a navigator object. The object is passed in as a prop to any component that is rendered by NavigatorIOS. You can then call the relevant methods to perform the navigation action you need:

```js
class MyView extends Component {
  _handleBackPress() {
    this.props.navigator.pop();
  }

  _handleNextPress(nextRoute) {
    this.props.navigator.push(nextRoute);
  }

  render() {
    const nextRoute = {
      component: MyView,
      title: 'Bar That',
      passProps: { myProp: 'bar' }
    };
    return(
      <TouchableHighlight onPress={() => this._handleNextPress(nextRoute)}>
        <Text style={{marginTop: 200, alignSelf: 'center'}}>
          See you on the other nav {this.props.myProp}!
        </Text>
      </TouchableHighlight>
    );
  }
}
You can also trigger navigator functionality from the NavigatorIOS component:

class NavvyIOS extends Component {
  _handleNavigationRequest() {
    this.refs.nav.push({
      component: MyView,
      title: 'Genius',
      passProps: { myProp: 'genius' },
    });
  }

  render() {
    return (
      <NavigatorIOS
        ref='nav'
        initialRoute={{
          component: MyView,
          title: 'Foo This',
          passProps: { myProp: 'foo' },
          rightButtonTitle: 'Add',
          onRightButtonPress: () => this._handleNavigationRequest(),
        }}
        style={{flex: 1}}
      />
    );
  }
}
```

The code above adds a `_handleNavigationRequest` private method that is invoked from the `NavigatorIOS` component when the right navigation bar item is pressed. To get access to the navigator functionality, a reference to it is saved in the `ref` prop and later referenced to push a new scene into the navigation stack.

### 导航栏的配置

Props passed to `NavigatorIOS` will set the default configuration for the navigation bar. Props passed as properties to a route object will set the configuration for that route's navigation bar, overriding any props passed to the `NavigatorIOS `component.

```js
_handleNavigationRequest() {
  this.refs.nav.push({
    //...
    passProps: { myProp: 'genius' },
    barTintColor: '#996699',
  });
}

render() {
  return (
    <NavigatorIOS
      //...
      style={{flex: 1}}
      barTintColor='#ffffcc'
    />
  );
}
```

In the example above the navigation bar color is changed when the new route is pushed.

### 截图
![](/img/components/navigatorios1.png)

![](/img/components/navigatorios2.png)

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="bartintcolor"></a>barTintColor <span class="propType">string</span> <a class="hash-link" href="#bartintcolor">#</a></h4>
		<div>
			<p>导航条的背景颜色。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="initialroute"></a>initialRoute <span class="propType">{component: function, title: string, passProps: object, backButtonIcon: Image.propTypes.source, backButtonTitle: string, leftButtonIcon: Image.propTypes.source, leftButtonTitle: string, onLeftButtonPress: function, rightButtonIcon: Image.propTypes.source, rightButtonTitle: string, onRightButtonPress: function, wrapperStyle: [object Object]}</span> <a class="hash-link" href="#initialroute">#</a></h4>
		<div>
			<p>NavigatorIOS使用"路由"对象来包含要渲染的子视图、它们的属性、以及导航条配置。"push"和任何其它的导航函数的参数都是这样的路由对象。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="itemwrapperstyle"></a>itemWrapperStyle <span class="propType"><a href="view.html#style">View#style</a></span> <a class="hash-link" href="#itemwrapperstyle">#</a></h4>
		<div>
			<p>导航器中的组件的默认属性。一个常见的用途是设置所有页面的背景颜色。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="navigationbarhidden"></a>navigationBarHidden <span class="propType">bool</span> <a class="hash-link" href="#navigationbarhidden">#</a></h4>
		<div>
			<p>一个布尔值，决定导航栏是否隐藏。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="shadowhidden"></a>shadowHidden <span class="propType">bool</span> <a class="hash-link" href="#shadowhidden">#</a></h4>
		<div>
			<p>一个布尔值，决定是否要隐藏1像素的阴影</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="tintcolor"></a>tintColor <span class="propType">string</span> <a class="hash-link" href="#tintcolor">#</a></h4>
		<div>
			<p>导航栏上按钮的颜色。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="titletextcolor"></a>titleTextColor <span class="propType">string</span> <a class="hash-link" href="#titletextcolor">#</a></h4>
		<div>
			<p>导航器标题的文字颜色。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="translucent"></a>translucent <span class="propType">bool</span> <a class="hash-link" href="#translucent">#</a></h4>
		<div>
			<p>一个布尔值，决定是否导航条是半透明的。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="interactivepopgestureenabled"></a>interactivePopGestureEnabled <span class="propType">bool</span> <a class="hash-link" href="#interactivepopgestureenabled">#</a></h4>
		<div>
			<p>决定是否启用滑动返回手势。不指定此属性时，手势会根据navigationBar的显隐情况决定是否启用（显示时启用手势，隐藏时禁用手势）。指定此属性后，手势与navigationBar的显隐情况无关。</p>
		</div>
	</div>
</div>

### 方法

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="push"></a>push<span class="propType">(route: {
  component: Function;
  title: string;
  passProps?: Object;
  backButtonTitle?: string;
  backButtonIcon?: Object;
  leftButtonTitle?: string;
  leftButtonIcon?: Object;
  onLeftButtonPress?: Function;
  rightButtonTitle?: string;
  rightButtonIcon?: Object;
  onRightButtonPress?: Function;
  wrapperStyle?: any;
})</span> <a class="hash-link" href="#push">#</a></h4>
        <div><p>Navigate forward to a new route</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="popn"></a>popN<span
            class="propType">(n: number)</span> <a class="hash-link" href="#popn">#</a></h4>
        <div><p>Go back N pages at once. When N=1, behavior matches <code>pop()</code></p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="pop"></a>pop<span class="propType">()</span> <a
            class="hash-link" href="#pop">#</a></h4>
        <div><p>Go back one page</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="replaceatindex"></a>replaceAtIndex<span
            class="propType">(route: {
  component: Function;
  title: string;
  passProps?: Object;
  backButtonTitle?: string;
  backButtonIcon?: Object;
  leftButtonTitle?: string;
  leftButtonIcon?: Object;
  onLeftButtonPress?: Function;
  rightButtonTitle?: string;
  rightButtonIcon?: Object;
  onRightButtonPress?: Function;
  wrapperStyle?: any;
}, index: number)</span> <a class="hash-link" href="#replaceatindex">#</a></h4>
        <div><p>Replace a route in the navigation stack.</p>
            <p><code>index</code> specifies the route in the stack that should be replaced.
                If it's negative, it counts from the back.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="replace"></a>replace<span class="propType">(route: {
  component: Function;
  title: string;
  passProps?: Object;
  backButtonTitle?: string;
  backButtonIcon?: Object;
  leftButtonTitle?: string;
  leftButtonIcon?: Object;
  onLeftButtonPress?: Function;
  rightButtonTitle?: string;
  rightButtonIcon?: Object;
  onRightButtonPress?: Function;
  wrapperStyle?: any;
})</span> <a class="hash-link" href="#replace">#</a></h4>
        <div><p>Replace the route for the current page and immediately
            load the view for the new route.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="replaceprevious"></a>replacePrevious<span
            class="propType">(route: {
  component: Function;
  title: string;
  passProps?: Object;
  backButtonTitle?: string;
  backButtonIcon?: Object;
  leftButtonTitle?: string;
  leftButtonIcon?: Object;
  onLeftButtonPress?: Function;
  rightButtonTitle?: string;
  rightButtonIcon?: Object;
  onRightButtonPress?: Function;
  wrapperStyle?: any;
})</span> <a class="hash-link" href="#replaceprevious">#</a></h4>
        <div><p>Replace the route/view for the previous page.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="poptotop"></a>popToTop<span
            class="propType">()</span> <a class="hash-link" href="#poptotop">#</a></h4>
        <div><p>Go back to the top item</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="poptoroute"></a>popToRoute<span class="propType">(route: {
  component: Function;
  title: string;
  passProps?: Object;
  backButtonTitle?: string;
  backButtonIcon?: Object;
  leftButtonTitle?: string;
  leftButtonIcon?: Object;
  onLeftButtonPress?: Function;
  rightButtonTitle?: string;
  rightButtonIcon?: Object;
  onRightButtonPress?: Function;
  wrapperStyle?: any;
})</span> <a class="hash-link" href="#poptoroute">#</a></h4>
        <div><p>Go back to the item for a particular route object</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor"
                                               name="replacepreviousandpop"></a>replacePreviousAndPop<span
            class="propType">(route: {
  component: Function;
  title: string;
  passProps?: Object;
  backButtonTitle?: string;
  backButtonIcon?: Object;
  leftButtonTitle?: string;
  leftButtonIcon?: Object;
  onLeftButtonPress?: Function;
  rightButtonTitle?: string;
  rightButtonIcon?: Object;
  onRightButtonPress?: Function;
  wrapperStyle?: any;
})</span> <a class="hash-link" href="#replacepreviousandpop">#</a></h4>
        <div><p>Replaces the previous route/view and transitions back to it.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="resetto"></a>resetTo<span class="propType">(route: {
  component: Function;
  title: string;
  passProps?: Object;
  backButtonTitle?: string;
  backButtonIcon?: Object;
  leftButtonTitle?: string;
  leftButtonIcon?: Object;
  onLeftButtonPress?: Function;
  rightButtonTitle?: string;
  rightButtonIcon?: Object;
  onRightButtonPress?: Function;
  wrapperStyle?: any;
})</span> <a class="hash-link" href="#resetto">#</a></h4>
        <div><p>Replaces the top item and popToTop</p></div>
    </div>
</div>

### 例子

```javascript
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const ViewExample = require('./ViewExample');

const createExamplePage = require('./createExamplePage');
const nativeImageSource = require('nativeImageSource');
const {
  AlertIOS,
  NavigatorIOS,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = ReactNative;

class EmptyPage extends React.Component {
  render() {
    return (
      <View style={styles.emptyPage}>
        <Text style={styles.emptyPageText}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

class NavigatorIOSExamplePage extends React.Component {
  render() {
    var recurseTitle = 'Recurse Navigation';
    if (!this.props.depth || this.props.depth === 1) {
      recurseTitle += ' - more examples here';
    }
    return (
      <ScrollView style={styles.list}>
        <View style={styles.line}/>
        <View style={styles.group}>
          {this._renderRow(recurseTitle, () => {
            this.props.navigator.push({
              title: NavigatorIOSExample.title,
              component: NavigatorIOSExamplePage,
              backButtonTitle: 'Custom Back',
              passProps: {depth: this.props.depth ? this.props.depth + 1 : 1},
            });
          })}
          {this._renderRow('Push View Example', () => {
            this.props.navigator.push({
              title: 'Very Long Custom View Example Title',
              component: createExamplePage(null, ViewExample),
            });
          })}
          {this._renderRow('Custom title image Example', () => {
            this.props.navigator.push({
              title: 'Custom title image Example',
              titleImage: require('./relay.png'),
              component: createExamplePage(null, ViewExample),
            });
          })}
          {this._renderRow('Custom Right Button', () => {
            this.props.navigator.push({
              title: NavigatorIOSExample.title,
              component: EmptyPage,
              rightButtonTitle: 'Cancel',
              onRightButtonPress: () => this.props.navigator.pop(),
              passProps: {
                text: 'This page has a right button in the nav bar',
              }
            });
          })}
          {this._renderRow('Custom Right System Button', () => {
            this.props.navigator.push({
              title: NavigatorIOSExample.title,
              component: EmptyPage,
              rightButtonSystemIcon: 'bookmarks',
              onRightButtonPress: () => this.props.navigator.pop(),
              passProps: {
                text: 'This page has a right system button in the nav bar',
              }
            });
          })}
          {this._renderRow('Custom Left & Right Icons', () => {
            this.props.navigator.push({
              title: NavigatorIOSExample.title,
              component: EmptyPage,
              leftButtonTitle: 'Custom Left',
              onLeftButtonPress: () => this.props.navigator.pop(),
              rightButtonIcon: nativeImageSource({
                ios: 'NavBarButtonPlus',
                width: 17,
                height: 17
              }),
              onRightButtonPress: () => {
                AlertIOS.alert(
                  'Bar Button Action',
                  'Recognized a tap on the bar button icon',
                  [
                    {
                      text: 'OK',
                      onPress: () => console.log('Tapped OK'),
                    },
                  ]
                );
              },
              passProps: {
                text: 'This page has an icon for the right button in the nav bar',
              }
            });
          })}
          {this._renderRow('Custom Left & Right System Icons', () => {
            this.props.navigator.push({
              title: NavigatorIOSExample.title,
              component: EmptyPage,
              leftButtonSystemIcon: 'cancel',
              onLeftButtonPress: () => this.props.navigator.pop(),
              rightButtonSystemIcon: 'search',
              onRightButtonPress: () => {
                AlertIOS.alert(
                  'Bar Button Action',
                  'Recognized a tap on the bar button icon',
                  [
                    {
                      text: 'OK',
                      onPress: () => console.log('Tapped OK'),
                    },
                  ]
                );
              },
              passProps: {
                text: 'This page has an icon for the right button in the nav bar',
              }
            });
          })}
          {this._renderRow('Pop', () => {
            this.props.navigator.pop();
          })}
          {this._renderRow('Pop to top', () => {
            this.props.navigator.popToTop();
          })}
          {this._renderReplace()}
          {this._renderReplacePrevious()}
          {this._renderReplacePreviousAndPop()}
          {this._renderRow('Exit NavigatorIOS Example', this.props.onExampleExit)}
        </View>
        <View style={styles.line}/>
      </ScrollView>
    );
  }

  _renderReplace = () => {
    if (!this.props.depth) {
      // this is to avoid replacing the top of the stack
      return null;
    }
    return this._renderRow('Replace here', () => {
      var prevRoute = this.props.route;
      this.props.navigator.replace({
        title: 'New Navigation',
        component: EmptyPage,
        rightButtonTitle: 'Undo',
        onRightButtonPress: () => this.props.navigator.replace(prevRoute),
        passProps: {
          text: 'The component is replaced, but there is currently no ' +
            'way to change the right button or title of the current route',
        }
      });
    });
  };

  _renderReplacePrevious = () => {
    if (!this.props.depth || this.props.depth < 2) {
      // this is to avoid replacing the top of the stack
      return null;
    }
    return this._renderRow('Replace previous', () => {
      this.props.navigator.replacePrevious({
        title: 'Replaced',
        component: EmptyPage,
        passProps: {
          text: 'This is a replaced "previous" page',
        },
        wrapperStyle: styles.customWrapperStyle,
      });
    });
  };

  _renderReplacePreviousAndPop = () => {
    if (!this.props.depth || this.props.depth < 2) {
      // this is to avoid replacing the top of the stack
      return null;
    }
    return this._renderRow('Replace previous and pop', () => {
      this.props.navigator.replacePreviousAndPop({
        title: 'Replaced and Popped',
        component: EmptyPage,
        passProps: {
          text: 'This is a replaced "previous" page',
        },
        wrapperStyle: styles.customWrapperStyle,
      });
    });
  };

  _renderRow = (title: string, onPress: Function) => {
    return (
      <View>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {title}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  };
}

class NavigatorIOSExample extends React.Component {
  static title = '<NavigatorIOS>';
  static description = 'iOS navigation capabilities';
  static external = true;

  render() {
    const {onExampleExit} = this.props;
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: NavigatorIOSExample.title,
          component: NavigatorIOSExamplePage,
          passProps: {onExampleExit},
        }}
        tintColor="#008888"
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customWrapperStyle: {
    backgroundColor: '#bbdddd',
  },
  emptyPage: {
    flex: 1,
    paddingTop: 64,
  },
  emptyPageText: {
    margin: 10,
  },
  list: {
    backgroundColor: '#eeeeee',
    marginTop: 10,
  },
  group: {
    backgroundColor: 'white',
  },
  groupSpace: {
    height: 15,
  },
  line: {
    backgroundColor: '#bbbbbb',
    height: StyleSheet.hairlineWidth,
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowNote: {
    fontSize: 17,
  },
  rowText: {
    fontSize: 17,
    fontWeight: '500',
  },
});

module.exports = NavigatorIOSExample;
```
