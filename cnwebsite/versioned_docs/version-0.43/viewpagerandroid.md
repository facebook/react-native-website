---
id: version-0.43-viewpagerandroid
title: ViewPagerAndroid
original_id: viewpagerandroid
---

一个允许在子视图之间左右翻页的容器。每一个`ViewPagerAndroid`的子容器会被视作一个单独的页，并且会被拉伸填满`ViewPagerAndroid`。

注意所有的子视图都必须是纯View，而不能是自定义的复合容器。你可以给每个子视图设置样式属性譬如`padding`或`backgroundColor`。

例子：

```jsx
render: function() {
  return (
    <ViewPagerAndroid
      style={styles.viewPager}
      initialPage={0}>
      <View style={styles.pageStyle}>
        <Text>First page</Text>
      </View>
      <View style={styles.pageStyle}>
        <Text>Second page</Text>
      </View>
    </ViewPagerAndroid>
  );
}

...

var styles = {
  ...
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  }
}
```

### 截图
![](/img/components/viewpager.png)

### 属性

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="initialpage"></a>initialPage <span class="propType">number</span> <a class="hash-link" href="#initialpage">#</a></h4>
		<div>
			<p>初始选中的页的下标。你可以用<code>setPage</code> 函数来翻页，并且用<code>onPageSelected</code>来监听页的变化。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="keyboarddismissmode"></a>keyboardDismissMode <span class="propType">enum('none', "on-drag")</span> <a class="hash-link" href="#keyboarddismissmode">#</a></h4>
		<div>
			<p>决定在滑动的时候是否要让软键盘消失。</p>
			<ul>
			<li><p><code>none</code> （默认值），拖拽不会让键盘消失。 <p></li>
			<li><p><code>on-drag</code>， 当拖拽开始的时候会让键盘消失。</p></li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onpagescroll"></a>onPageScroll <span class="propType">function</span> <a class="hash-link" href="#onpagescroll">#</a></h4>
		<div>
			<p>当在页间切换时（不论是由于动画还是由于用户在页间滑动/拖拽）执行。</p>
			<p>回调参数中的<code>event.nativeEvent</code>对象会包含如下数据：</p>
			<ul>
			<li><p><code>position</code> 从左数起第一个当前可见的页面的下标。</p></li>
			<li><p><code>offset</code> 一个在[0,1)（大于等于0，小于1）之间的范围，代表当前页面切换的状态。值x表示现在"position"所表示的页有(1 - x)的部分可见，而下一页有x的部分可见。</p></li>
			</ul>
		</div>
	</div>
	<div class="prop">
	<h4 class="propTitle"><a class="anchor" name="onpagescrollstatechanged"></a>onPageScrollStateChanged <span class="propType">function</span> <a class="hash-link" href="#onpagescrollstatechanged">#</a></h4>
	<div>
	<p>页面滑动状态变化时调用此回调函数。页面滑动状态可能为以下三种之一：
	<ul>
		<li><p><code>idle</code> 空闲，意味着当前没有交互。</p></li>
		<li><p><code>dragging</code> 拖动中，意味着当前页面正在被拖动。</p></li>
		<li><p><code>settling</code> 处理中，意味着当前页面发生过交互，且正在结束开头或收尾的动画。</p></li>
  </ul>
  </p></div>
  </div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onpageselected"></a>onPageSelected <span class="propType">function</span> <a class="hash-link" href="#onpageselected">#</a></h4>
		<div>
			<p>这个回调会在页面切换完成后（当用户在页面间滑动）调用。</p>
			<p>回调参数中的<code>event.nativeEvent</code>对象会包含如下的字段：</p>
			<ul>
			<li><p><code>position</code> 当前被选中的页面下标</p></li>
			</ul>
		</div>
	</div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="scrollenabled"></a>scrollEnabled <span class="propType">bool</span>
	    <a class="hash-link" href="#scrollenabled">#</a></h4>
	    <div><p>设为false时可禁止滚动。默认值为true</p></div>
	</div>
</div>


### 例子

```jsx
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  ViewPagerAndroid,
} = ReactNative;

import type { ViewPagerScrollState } from 'ViewPagerAndroid';

var PAGES = 5;
var BGCOLOR = ['#fdc08e', '#fff6b9', '#99d1b7', '#dde5fe', '#f79273'];
var IMAGE_URIS = [
  'http://apod.nasa.gov/apod/image/1410/20141008tleBaldridge001h990.jpg',
  'http://apod.nasa.gov/apod/image/1409/volcanicpillar_vetter_960.jpg',
  'http://apod.nasa.gov/apod/image/1409/m27_snyder_960.jpg',
  'http://apod.nasa.gov/apod/image/1409/PupAmulti_rot0.jpg',
  'http://apod.nasa.gov/apod/image/1510/lunareclipse_27Sep_beletskycrop4.jpg',
];

var LikeCount = React.createClass({
  getInitialState: function() {
    return {
      likes: 7,
    };
  },
  onClick: function() {
    this.setState({likes: this.state.likes + 1});
  },
  render: function() {
    var thumbsUp = '\uD83D\uDC4D';
    return (
      <View style={styles.likeContainer}>
        <TouchableOpacity onPress={this.onClick} style={styles.likeButton}>
          <Text style={styles.likesText}>
            {thumbsUp + ' Like'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.likesText}>
          {this.state.likes + ' likes'}
        </Text>
      </View>
    );
  },
});

var Button = React.createClass({
  _handlePress: function() {
    if (this.props.enabled && this.props.onPress) {
      this.props.onPress();
    }
  },
  render: function() {
    return (
      <TouchableWithoutFeedback onPress={this._handlePress}>
        <View style={[styles.button, this.props.enabled ? {} : styles.buttonDisabled]}>
          <Text style={styles.buttonText}>{this.props.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
});

var ProgressBar = React.createClass({
  render: function() {
    var fractionalPosition = (this.props.progress.position + this.props.progress.offset);
    var progressBarSize = (fractionalPosition / (PAGES - 1)) * this.props.size;
    return (
      <View style={[styles.progressBarContainer, {width: this.props.size}]}>
        <View style={[styles.progressBar, {width: progressBarSize}]}/>
      </View>
    );
  }
});

var ViewPagerAndroidExample = React.createClass({
  statics: {
    title: '<ViewPagerAndroid>',
    description: 'Container that allows to flip left and right between child views.'
  },
  getInitialState: function() {
    return {
      page: 0,
      animationsAreEnabled: true,
      scrollEnabled: true,
      progress: {
        position: 0,
        offset: 0,
      },
    };
  },

  onPageSelected: function(e) {
    this.setState({page: e.nativeEvent.position});
  },

  onPageScroll: function(e) {
    this.setState({progress: e.nativeEvent});
  },

  onPageScrollStateChanged: function(state : ViewPagerScrollState) {
    this.setState({scrollState: state});
  },

  move: function(delta) {
    var page = this.state.page + delta;
    this.go(page);
  },

  go: function(page) {
    if (this.state.animationsAreEnabled) {
      this.viewPager.setPage(page);
    } else {
      this.viewPager.setPageWithoutAnimation(page);
    }

    this.setState({page});
  },

  render: function() {
    var pages = [];
    for (var i = 0; i < PAGES; i++) {
      var pageStyle = {
        backgroundColor: BGCOLOR[i % BGCOLOR.length],
        alignItems: 'center',
        padding: 20,
      };
      pages.push(
        <View key={i} style={pageStyle} collapsable={false}>
          <Image
            style={styles.image}
            source={{uri: IMAGE_URIS[i % BGCOLOR.length]}}
          />
          <LikeCount />
       </View>
      );
    }
    var { page, animationsAreEnabled } = this.state;
    return (
      <View style={styles.container}>
        <ViewPagerAndroid
          style={styles.viewPager}
          initialPage={0}
          scrollEnabled={this.state.scrollEnabled}
          onPageScroll={this.onPageScroll}
          onPageSelected={this.onPageSelected}
          onPageScrollStateChanged={this.onPageScrollStateChanged}
          pageMargin={10}
          ref={viewPager => { this.viewPager = viewPager; }}>
          {pages}
        </ViewPagerAndroid>
        <View style={styles.buttons}>
          <Button
            enabled={true}
            text={this.state.scrollEnabled ? 'Scroll Enabled' : 'Scroll Disabled'}
            onPress={() => this.setState({scrollEnabled: !this.state.scrollEnabled})}
          />
        </View>
        <View style={styles.buttons}>
          { animationsAreEnabled ?
            <Button
              text="Turn off animations"
              enabled={true}
              onPress={() => this.setState({animationsAreEnabled: false})}
            /> :
            <Button
              text="Turn animations back on"
              enabled={true}
              onPress={() => this.setState({animationsAreEnabled: true})}
            /> }
          <Text style={styles.scrollStateText}>ScrollState[ {this.state.scrollState} ]</Text>
        </View>
        <View style={styles.buttons}>
          <Button text="Start" enabled={page > 0} onPress={() => this.go(0)}/>
          <Button text="Prev" enabled={page > 0} onPress={() => this.move(-1)}/>
          <Text style={styles.buttonText}>Page {page + 1} / {PAGES}</Text>
          <ProgressBar size={100} progress={this.state.progress}/>
          <Button text="Next" enabled={page < PAGES - 1} onPress={() => this.move(1)}/>
          <Button text="Last" enabled={page < PAGES - 1} onPress={() => this.go(PAGES - 1)}/>
        </View>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    height: 30,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    width: 0,
    margin: 5,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: 'gray',
  },
  buttonDisabled: {
    backgroundColor: 'black',
    opacity: 0.5,
  },
  buttonText: {
    color: 'white',
  },
  scrollStateText: {
    color: '#99d1b7',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  image: {
    width: 300,
    height: 200,
    padding: 20,
  },
  likeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderColor: '#333333',
    borderWidth: 1,
    borderRadius: 5,
    flex: 1,
    margin: 8,
    padding: 8,
  },
  likeContainer: {
    flexDirection: 'row',
  },
  likesText: {
    flex: 1,
    fontSize: 18,
    alignSelf: 'center',
  },
  progressBarContainer: {
    height: 10,
    margin: 10,
    borderColor: '#eeeeee',
    borderWidth: 2,
  },
  progressBar: {
    alignSelf: 'flex-start',
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  viewPager: {
    flex: 1,
  },
});

module.exports = ViewPagerAndroidExample;
```