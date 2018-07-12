---
id: version-0.47-listview
title: ListView
original_id: listview
---


**此组件已过期** - 请使用[`FlatList`](flatlist.html)或[`SectionList`](sectionlist.html)代替。

ListView - 一个核心组件，用于高效地显示一个可以垂直滚动的变化的数据列表。最基本的使用方式就是创建一个`ListView.DataSource`数据源，然后给它传递一个普通的数据数组，再使用数据源来实例化一个`ListView`组件，并且定义它的`renderRow`回调函数，这个函数会接受数组中的每个数据作为参数，返回一个可渲染的组件（作为listview的每一行）。

最简单的例子：

```javascript
constructor(props) {
  super(props);
  var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = {
    dataSource: ds.cloneWithRows(['row 1', 'row 2']),
  };
}
render() {
  return (
    <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <Text>{rowData}</Text>}
    />
  );
}
```

ListView还支持一些高级特性，譬如给每段/组(section)数据添加一个带有粘性的头部（类似iPhone的通讯录，其首字母会在滑动过程中吸附在屏幕上方）；在列表头部和尾部增加单独的内容；在到达列表尾部的时候调用回调函数(`onEndReached`)，还有在视野内可见的数据变化时调用回调函数(`onChangeVisibleRows`)，以及一些性能方面的优化。

有一些性能优化使得ListView可以滚动的更加平滑，尤其是在动态加载可能很大（或者概念上无限长的）数据集的时候：

* 只更新变化的行 - 提供给数据源的rowHasChanged函数可以告诉ListView它是否需要重绘一行数据（即：数据是否发生了变化）参见ListViewDataSource
* 限制频率的行渲染 - 默认情况下，每次消息循环只有一行会被渲染（可以用`pageSize`属性配置）。这把较大的工作分散成小的碎片，以降低因为渲染而导致丢帧的可能性。

### 截图
![](img/components/listview1.png)

![](img/components/listview2.png)

![](img/components/listview3.png)

### 属性

<div class="props">
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="scrollview"></a><a href="scrollview.html#props">ScrollView props...</a> <a class="hash-link" href="#scrollview">#</a></h4>
    <div>
      <p>译注：这意味着ListView可以使用所有ScrollView的属性。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="datasource"></a>dataSource <span class="propType">ListViewDataSource</span> <a class="hash-link" href="#datasource">#</a></h4>
	<div>
		<p><a href="listviewdatasource.html" target="_blank">ListView.DataSource</a>实例（列表依赖的数据源）</p>
	</div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="initiallistsize"></a>initialListSize <span class="propType">number</span> <a class="hash-link" href="#initiallistsize">#</a></h4>
    <div>
      <p>指定在组件刚挂载的时候渲染多少行数据。用这个属性来确保首屏显示合适数量的数据，而不是花费太多帧逐步显示出来。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="onchangevisiblerows"></a>onChangeVisibleRows <span class="propType">function</span> <a class="hash-link" href="#onchangevisiblerows">#</a></h4>
    <div>
      <p>(visibleRows, changedRows) =&gt; void</p>
      <p>当可见的行的集合变化的时候调用此回调函数。<code>visibleRows</code> 以 { sectionID: { rowID: true }}的格式包含了所有可见行，而<code>changedRows</code> 以{ sectionID: { rowID: true | false }}的格式包含了所有刚刚改变了可见性的行，其中如果值为true表示一个行变得可见，而为false表示行刚刚离开可视区域而变得不可见。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="onendreached"></a>onEndReached <span class="propType">function</span> <a class="hash-link" href="#onendreached">#</a></h4>
    <div>
      <p>当所有的数据都已经渲染过，并且列表被滚动到距离最底部不足onEndReachedThreshold个像素的距离时调用。原生的滚动事件会被作为参数传递。译注：当第一次渲染时，如果数据不足一屏（比如初始值是空的），这个事件也会被触发，请自行做标记过滤。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="onendreachedthreshold"></a>onEndReachedThreshold <span class="propType">number</span> <a class="hash-link" href="#onendreachedthreshold">#</a></h4>
    <div>
      <p>调用onEndReached之前的临界值，单位是像素。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="pagesize"></a>pageSize <span class="propType">number</span> <a class="hash-link" href="#pagesize">#</a></h4>
    <div>
      <p>每次事件循环（每帧）渲染的行数。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="removeclippedsubviews"></a>removeClippedSubviews <span class="propType">bool</span> <a class="hash-link" href="#removeclippedsubviews">#</a></h4>
    <div>
      <p>用于提升大列表的滚动性能。需要给行容器添加样式overflow:'hidden'。（Android已默认添加此样式）。此属性默认开启。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="renderfooter"></a>renderFooter <span class="propType">function</span> <a class="hash-link" href="#renderfooter">#</a></h4>
    <div>
      <p>() =&gt; renderable</p>
      <p>页头与页脚会在每次渲染过程中都重新渲染（如果提供了这些属性）。如果它们重绘的性能开销很大，把他们包装到一个StaticContainer或者其它恰当的结构中。页脚会永远在列表的最底部，而页头会在最顶部。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="renderheader"></a>renderHeader <span class="propType">function</span> <a class="hash-link" href="#renderheader">#</a></h4>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="renderrow"></a>renderRow <span class="propType">function</span> <a class="hash-link" href="#renderrow">#</a></h4>
    <div>
      <p>(rowData, sectionID, rowID, highlightRow) =&gt; renderable</p>
      <p>从数据源(Data source)中接受一条数据，以及它和它所在section的ID。返回一个可渲染的组件来为这行数据进行渲染。默认情况下参数中的数据就是放进数据源中的数据本身，不过也可以提供一些转换器。</p>
      <p>如果某一行正在被高亮（通过调用highlightRow函数），ListView会得到相应的通知。当一行被高亮时，其两侧的分割线会被隐藏。行的高亮状态可以通过调用highlightRow(null)来重置。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="renderscrollcomponent"></a>renderScrollComponent <span class="propType">function</span> <a class="hash-link" href="#renderscrollcomponent">#</a></h4>
    <div>
      <p>(props) =&gt; renderable</p>
      <p>指定一个函数，在其中返回一个可以滚动的组件。ListView将会在该组件内部进行渲染。默认情况下会返回一个包含指定属性的ScrollView。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="rendersectionheader"></a>renderSectionHeader <span class="propType">function</span> <a class="hash-link" href="#rendersectionheader">#</a></h4>
    <div>
      <p>(sectionData, sectionID) =&gt; renderable</p>
      <p>如果提供了此函数，会为每个小节(section)渲染一个粘性的标题。</p>
      <p>粘性是指当它刚出现时，会处在对应小节的内容顶部；继续下滑当它到达屏幕顶端的时候，它会停留在屏幕顶端，一直到对应的位置被下一个小节的标题占据为止。可以使用<code> stickySectionHeadersEnabled</code>来决定是否启用其粘性特性。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="renderseparator"></a>renderSeparator <span class="propType">function</span> <a class="hash-link" href="#renderseparator">#</a></h4>
    <div>
      <p>(sectionID, rowID, adjacentRowHighlighted) =&gt; renderable</p>
      <p>如果提供了此属性，一个可渲染的组件会被渲染在每一行下面，除了小节标题的前面的最后一行。在其上方的小节ID和行ID，以及邻近的行是否被高亮会作为参数传递进来。</p>
    </div>
  </div>
  <div class="prop">
    <h4 class="propTitle"><a class="anchor" name="scrollrenderaheaddistance"></a>scrollRenderAheadDistance <span class="propType">number</span> <a class="hash-link" href="#scrollrenderaheaddistance">#</a></h4>
    <div>
      <p>当一个行接近屏幕范围多少像素之内的时候，就开始渲染这一行。</p>
    </div>
  </div>
  <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="stickyheaderindices"></a>stickyHeaderIndices <span class="propType">[number]</span> <a class="hash-link" href="#stickyheaderindices">#</a></h4>
        <div>
            <p>一个子视图下标的数组，用于决定哪些成员会在滚动之后固定在屏幕顶端。举个例子，传递<code>stickyHeaderIndices={[0]}</code>会让第一个成员固定在滚动视图顶端。这个属性不能和<code>horizontal={true}</code>一起使用。</p>
        </div>
  </div>
  <div class="prop">
  	<h4 class="propTitle"><a class="anchor" name="stickysectionheadersenabled"></a>stickySectionHeadersEnabled?: <span class="propType">bool</span> <a class="hash-link" href="#stickysectionheadersenabled">#</a></h4>
	<div>
	  	<p>设置小节标题(section header)是否具有粘性。粘性是指当它刚出现时，会处在对应小节的内容顶部；继续下滑当它到达屏幕顶端的时候，它会停留在屏幕顶端，一直到对应的位置被下一个小节的标题占据为止。注意此设置在水平模式（<code>horizontal={true}</code>）下无效。由于不同平台的设计原则不同，此选项在iOS上默认开启，andriod上默认关闭。</p>
	</div>
  </div>
</div>

### 方法

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getmetrics"></a>getMetrics<span
            class="propType">()</span> <a class="hash-link" href="#getmetrics">#</a></h4>
        <div><p>导出一些用于性能分析的数据。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="scrollto"></a>scrollTo<span class="propType">(...args)</span>
        <a class="hash-link" href="#scrollto">#</a></h4>
        <div><p>滚动到指定的x, y偏移处，可以指定是否加上过渡动画。</p>
            <p>参考 <a href="scrollview.html#scrollto">ScrollView#scrollTo</a>.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoend"></a>scrollToEnd<span class="methodType">(options?)</span> <a class="hash-link" href="#scrolltoend">#</a></h4>
    	<div>
    	<p>滚动到视图底部（水平方向的视图则滚动到最右边）。</p><p>加上动画参数 <code>scrollToEnd({animated: true})</code>则启用平滑滚动动画，或是调用
<code>scrollToEnd({animated: false})</code>来立即跳转。如果不使用参数，则<code>animated</code>选项默认启用。</p>
		</div>
	</div>
</div>


### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  Image,
  ListView,
  TouchableHighlight,
  StyleSheet,
  RecyclerViewBackedScrollView,
  Text,
  View,
} = ReactNative;

var RNTesterPage = require('./RNTesterPage');

var ListViewSimpleExample = React.createClass({
  statics: {
    title: '<ListView>',
    description: 'Performant, scrollable list of data.'
  },

  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this._genRows({})),
    };
  },

  _pressData: ({}: {[key: number]: boolean}),

  componentWillMount: function() {
    this._pressData = {};
  },

  render: function() {
    return (
      <RNTesterPage
        title={this.props.navigator ? null : '<ListView>'}
        noSpacer={true}
        noScroll={true}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
          renderSeparator={this._renderSeperator}
        />
      </RNTesterPage>
    );
  },

  _renderRow: function(rowData: string, sectionID: number, rowID: number, highlightRow: (sectionID: number, rowID: number) => void) {
    var rowHash = Math.abs(hashCode(rowData));
    var imgSource = THUMB_URLS[rowHash % THUMB_URLS.length];
    return (
      <TouchableHighlight onPress={() => {
          this._pressRow(rowID);
          highlightRow(sectionID, rowID);
        }}>
        <View>
          <View style={styles.row}>
            <Image style={styles.thumb} source={imgSource} />
            <Text style={styles.text}>
              {rowData + ' - ' + LOREM_IPSUM.substr(0, rowHash % 301 + 10)}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
    var dataBlob = [];
    for (var ii = 0; ii < 100; ii++) {
      var pressedText = pressData[ii] ? ' (pressed)' : '';
      dataBlob.push('Row ' + ii + pressedText);
    }
    return dataBlob;
  },

  _pressRow: function(rowID: number) {
    this._pressData[rowID] = !this._pressData[rowID];
    this.setState({dataSource: this.state.dataSource.cloneWithRows(
      this._genRows(this._pressData)
    )});
  },

  _renderSeperator: function(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: adjacentRowHighlighted ? 4 : 1,
          backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        }}
      />
    );
  }
});

var THUMB_URLS = [
  require('./Thumbnails/like.png'),
  require('./Thumbnails/dislike.png'),
  require('./Thumbnails/call.png'),
  require('./Thumbnails/fist.png'),
  require('./Thumbnails/bandaged.png'),
  require('./Thumbnails/flowers.png'),
  require('./Thumbnails/heart.png'),
  require('./Thumbnails/liking.png'),
  require('./Thumbnails/party.png'),
  require('./Thumbnails/poke.png'),
  require('./Thumbnails/superlike.png'),
  require('./Thumbnails/victory.png'),
  ];
var LOREM_IPSUM = 'Lorem ipsum dolor sit amet, ius ad pertinax oportere accommodare, an vix civibus corrumpit referrentur. Te nam case ludus inciderint, te mea facilisi adipiscing. Sea id integre luptatum. In tota sale consequuntur nec. Erat ocurreret mei ei. Eu paulo sapientem vulputate est, vel an accusam intellegam interesset. Nam eu stet pericula reprimique, ea vim illud modus, putant invidunt reprehendunt ne qui.';

/* eslint no-bitwise: 0 */
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  thumb: {
    width: 64,
    height: 64,
  },
  text: {
    flex: 1,
  },
});

module.exports = ListViewSimpleExample;
```
