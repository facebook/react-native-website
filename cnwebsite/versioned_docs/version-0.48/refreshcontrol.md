---
id: version-0.48-refreshcontrol
title: RefreshControl
original_id: refreshcontrol
---

这一组件可以用在ScrollView或ListView内部，为其添加下拉刷新的功能。当ScrollView处于竖直方向的起点位置（scrollY: 0），此时下拉会触发一个`onRefresh`事件。

### 属性
<div class="props">
<div class="prop"><h4 class="propTitle"><a class="anchor" name="onrefresh"></a>onRefresh <span class="propType">function</span>
<a class="hash-link" href="#onrefresh">#</a></h4>
<div><p>在视图开始刷新时调用。</p></div>
</div>
<div class="prop"><h4 class="propTitle"><a class="anchor" name="refreshing"></a>refreshing <span class="propType">bool</span>
<a class="hash-link" href="#refreshing">#</a></h4>
<div><p>视图是否应该在刷新时显示指示器。</p></div>
</div>
<div class="prop"><h4 class="propTitle"><a class="anchor" name="colors"></a><span class="platform">android</span>colors
<span class="propType">[ColorPropType]</span> <a class="hash-link" href="#colors">#</a></h4>
<div><p>指定至少一种颜色用来绘制刷新指示器。</p></div>
</div>
<div class="prop"><h4 class="propTitle"><a class="anchor" name="enabled"></a><span class="platform">android</span>enabled
<span class="propType">bool</span> <a class="hash-link" href="#enabled">#</a></h4>
<div><p>指定是否要开启刷新指示器。</p></div>
</div>
<div class="prop"><h4 class="propTitle"><a class="anchor" name="progressbackgroundcolor"></a><span class="platform">android</span>progressBackgroundColor
<span class="propType">ColorPropType</span> <a class="hash-link" href="#progressbackgroundcolor">#</a></h4>
<div><p>指定刷新指示器的背景色。</p></div>
</div>
<div class="prop"><h4 class="propTitle"><a class="anchor" name="size"></a><span class="platform">android</span>size
<span class="propType">RefreshLayoutConsts.SIZE.DEFAULT</span> <a class="hash-link" href="#size">#</a></h4>
<div><p>指定刷新指示器的大小，具体数值可参阅RefreshControl.SIZE.</p></div>
</div>
<div class="prop"><h4 class="propTitle"><a class="anchor" name="progressviewoffset"></a><span class="platform">android</span>progressViewOffset
<span class="propType">React.PropTypes.number</span> <a class="hash-link" href="#progressviewoffset">#</a></h4>
<div><p>指定刷新指示器的垂直起始位置(top offset)。</p></div>
</div>
<div class="prop"><h4 class="propTitle"><a class="anchor" name="tintcolor"></a><span class="platform">ios</span>tintColor
<span class="propType">ColorPropType</span> <a class="hash-link" href="#tintcolor">#</a></h4>
<div><p>指定刷新指示器的颜色。</p></div>
</div>
<div class="prop"><h4 class="propTitle"><a class="anchor" name="title"></a><span class="platform">ios</span>title
<span class="propType">string</span> <a class="hash-link" href="#title">#</a></h4>
<div><p>指定刷新指示器下显示的文字。</p></div>
</div>
</div>

### 例子

```jsx
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  ScrollView,
  StyleSheet,
  RefreshControl,
  Text,
  TouchableWithoutFeedback,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  row: {
    borderColor: 'grey',
    borderWidth: 1,
    padding: 20,
    backgroundColor: '#3a5795',
    margin: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#fff',
  },
  scrollview: {
    flex: 1,
  },
});

const Row = React.createClass({
  _onClick: function() {
    this.props.onClick(this.props.data);
  },
  render: function() {
    return (
     <TouchableWithoutFeedback onPress={this._onClick} >
        <View style={styles.row}>
          <Text style={styles.text}>
            {this.props.data.text + ' (' + this.props.data.clicks + ' clicks)'}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  },
});

const RefreshControlExample = React.createClass({
  statics: {
    title: '<RefreshControl>',
    description: 'Adds pull-to-refresh support to a scrollview.'
  },

  getInitialState() {
    return {
      isRefreshing: false,
      loaded: 0,
      rowData: Array.from(new Array(20)).map(
        (val, i) => ({text: 'Initial row ' + i, clicks: 0})),
    };
  },

  _onClick(row) {
    row.clicks++;
    this.setState({
      rowData: this.state.rowData,
    });
  },

  render() {
    const rows = this.state.rowData.map((row, ii) => {
      return <Row key={ii} data={row} onClick={this._onClick}/>;
    });
    return (
      <ScrollView
        style={styles.scrollview}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefresh}
            tintColor="#ff0000"
            title="Loading..."
            titleColor="#00ff00"
            colors={['#ff0000', '#00ff00', '#0000ff']}
            progressBackgroundColor="#ffff00"
          />
        }>
        {rows}
      </ScrollView>
    );
  },

  _onRefresh() {
    this.setState({isRefreshing: true});
    setTimeout(() => {
      // prepend 10 items
      const rowData = Array.from(new Array(10))
      .map((val, i) => ({
        text: 'Loaded row ' + (+this.state.loaded + i),
        clicks: 0,
      }))
      .concat(this.state.rowData);

      this.setState({
        loaded: this.state.loaded + 10,
        isRefreshing: false,
        rowData: rowData,
      });
    }, 5000);
  },
});

module.exports = RefreshControlExample;
```
