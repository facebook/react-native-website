---
id: version-0.45-flatlist
title: FlatList
original_id: flatlist
---

高性能的简单列表组件，支持下面这些常用的功能：

- 完全跨平台。
- 支持水平布局模式。
- 行组件显示或隐藏时可配置回调事件。
- 支持单独的头部组件。
- 支持单独的尾部组件。
- 支持自定义行间分隔线。
- 支持下拉刷新。
- 支持上拉加载。
- 支持跳转到指定行（ScrollToIndex）。

如果需要分组/类/区（section），请使用[`<SectionList>`](sectionlist.html)。

一个最简单的例子：

```javascript
<FlatList
  data={[{key: 'a'}, {key: 'b'}]}
  renderItem={({item}) => <Text>{item.key}</Text>}
/>
```

下面是一个较复杂的例子，其中演示了如何利用`PureComponent`来进一步优化性能和减少bug产生的可能（以下这段文字需要你深刻理解shouldComponentUpdate的机制，以及Component和PureComponent的不同，所以如果不了解就先跳过吧）。 

- 对于`MyListItem`组件来说，其`onPressItem`属性使用箭头函数而非bind的方式进行绑定，使其不会在每次列表重新render时生成一个新的函数，从而保证了props的不变性（当然前提是 `id`、`selected`和`title`也没变），不会触发自身无谓的重新render。换句话说，如果你是用bind来绑定`onPressItem`，每次都会生成一个新的函数，导致props在`===`比较时返回false，从而触发自身的一次不必要的重新render。
- 给`FlatList`指定`extraData={this.state}`属性，是为了保证`state.selected`变化时，能够正确触发`FlatList`的更新。如果不指定此属性，则`FlatList`不会触发更新，因为它是一个`PureComponent`，其props在`===`比较中没有变化则不会触发更新。
- `keyExtractor`属性指定使用id作为列表每一项的key。

```javascript
class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <SomeOtherWidget
        {...this.props}
        onPress={this._onPress}
      />
    )
  }
}

class MyList extends React.PureComponent {
  state = {selected: (new Map(): Map<string, boolean>)};

  _keyExtractor = (item, index) => item.id;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState((state) => {
      // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return {selected};
    });
  };

  _renderItem = ({item}) => (
    <MyListItem
      id={item.id}
      onPressItem={this._onPressItem}
      selected={!!this.state.selected.get(item.id)}
      title={item.title}
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}
```

本组件实质是基于[`<VirtualizedList>`](virtualizedlist.html)组件的封装，因此也有下面这些需要注意的事项：

- 当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
- 为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，而我们也在设法持续改进。
- 本组件继承自`PureComponent`而非通常的`Component`，这意味着如果其`props`在`浅比较`中是相等的，则不会重新渲染。所以请先检查你的`renderItem`函数所依赖的`props`数据（包括`data`属性以及可能用到的父组件的state），如果是一个引用类型（Object或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的Object或者数组中），然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下[js中的基本类型和引用类型](https://segmentfault.com/a/1190000002789651)。）
- 默认情况下每行都需要提供一个不重复的key属性。你也可以提供一个`keyExtractor`函数来生成key。

注意：`removeClippedSubviews`属性目前是不必要的，而且可能会引起问题。如果你在某些场景碰到内容不渲染的情况（比如使用`LayoutAnimation`时），尝试设置`removeClippedSubviews={false}`。我们可能会在将来的版本中修改此属性的默认值。

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="itemseparatorcomponent"></a>ItemSeparatorComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#itemseparatorcomponent">#</a>
    </h4>
        <div><p>行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。</p></div>
    </div>
	<div class="prop"><h4 class="propTitle"><a class="anchor" name="listEmptyComponent"></a>ListEmptyComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt; | React.Element&lt;any&gt;</code></span> <a class="hash-link"
	                                                                           href="#listEmptyComponent">#</a>
	    </h4>
		<div><p>列表为空时渲染该组件。可以是React Component, 也可以是一个render函数， 或者渲染好的element。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="listfootercomponent"></a>ListFooterComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#listfootercomponent">#</a>
    </h4>
        <div><p>尾部组件</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="listheadercomponent"></a>ListHeaderComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#listheadercomponent">#</a>
    </h4>
        <div><p>头部组件</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="columnwrapperstyle"></a>columnWrapperStyle?: <span
            class="propType"><code>StyleObj</code></span> <a class="hash-link"
                                                             href="#columnwrapperstyle">#</a></h4>
        <div><p>如果设置了多列布局（即将<code>numColumns</code>值设为大于1的整数），则可以额外指定此样式作用在每行容器上。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="data"></a>data: <span class="propType"><code>?Array&lt;ItemT&gt;</code></span>
        <a class="hash-link" href="#data">#</a></h4>
        <div><p>为了简化起见，data属性目前只支持普通数组。如果需要使用其他特殊数据结构，例如immutable数组，请直接使用更底层的<code>VirtualizedList</code>组件。</p></div>
    </div>
       <div class="prop">
       <h4 class="propTitle"><a class="anchor" name="extradata"></a>extraData?: <span class="propType">any</span> <a class="hash-link" href="#extradata">#</a></h4>
       <div><p>如果有除<code>data</code>以外的数据用在列表中（不论是用在<code>renderItem</code>还是Header或者Footer中），请在此属性中指定。同时此数据在修改时也需要先修改其引用地址（比如先复制到一个新的Object或者数组中），然后再修改其值，否则界面很可能不会刷新。</p>
       </div>
       </div>
    <div class="prop">
       <h4 class="propTitle"><a class="anchor" name="getitem"></a>getItem?: <a class="hash-link" href="#getitem">#</a>
    </h4>
       </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitemcount"></a>getItemCount?: <a
            class="hash-link" href="#getitemcount">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitemlayout"></a>getItemLayout?: <span
            class="propType"><code>(data: ?Array&lt;ItemT&gt;, index: number) =&gt;
  {length: number, offset: number, index: number}</code></span> <a class="hash-link"
                                                                   href="#getitemlayout">#</a></h4>
        <div><p><code>getItemLayout</code>是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，<code>getItemLayout</code>用起来就既高效又简单，类似下面这样：</p>
            <div class="prism language-javascript">getItemLayout<span class="token operator">=</span><span
                    class="token punctuation">{</span><span class="token punctuation">(</span>data<span
                    class="token punctuation">,</span> index<span class="token punctuation">)</span> <span
                    class="token operator">=</span><span class="token operator">&gt;</span> <span
                    class="token punctuation">(</span>
                <span class="token punctuation">{</span>length<span class="token punctuation">:</span> 行高<span
                        class="token punctuation">,</span> offset<span class="token punctuation">:</span> 行高
                <span class="token operator">*</span> index<span class="token punctuation">,</span> index<span
                        class="token punctuation">}</span>
                <span class="token punctuation">)</span><span class="token punctuation">}</span></div>
            <p>注意如果你指定了<code>SeparatorComponent</code>，请把分隔线的尺寸也考虑到offset的计算之中。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="horizontal"></a>horizontal?: <span class="propType"><code>?boolean</code></span>
        <a class="hash-link" href="#horizontal">#</a></h4>
        <div><p>设置为true则变为水平布局模式。</p></div>
    </div>
    <div class="prop">
       <h4 class="propTitle"><a class="anchor" name="initialnumtorender"></a>initialNumToRender: <span class="propType">number</span> <a class="hash-link" href="#initialnumtorender">#</a></h4>
       <div><p>指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容。注意这第一批次渲染的元素不会在滑动过程中被卸载，这样是为了保证用户执行返回顶部的操作时，不需要重新渲染首批元素。</p>
       </div>
    </div>		
    <div class="prop">
	    <h4 class="propTitle"><a class="anchor" name="initialscrollindex"></a>initialScrollIndex?: <span class="propType"><span>?number</span></span> <a class="hash-link" href="#initialscrollindex">#</a>
	    </h4>
	    <div><p>Instead of starting at the top with the first item, start at <code>initialScrollIndex</code>. This
		disables the "scroll to top" optimization that keeps the first <code>initialNumToRender</code> items
		always rendered and immediately renders the items starting at this initial index. Requires
		<code>getItemLayout</code> to be implemented.</p>
		</div>
	</div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="keyextractor"></a>keyExtractor: <span
            class="propType"><code>(item: ItemT, index: number) =&gt; string</code></span> <a class="hash-link"
                                                                                              href="#keyextractor">#</a>
    </h4>
        <div><p>此函数用于为给定的item生成一个不重复的key。Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取<code>item.key</code>作为key值。若<code>item.key</code>也不存在，则使用数组下标。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="legacyimplementation"></a>legacyImplementation?:
        <span class="propType"><code>?boolean</code></span> <a class="hash-link"
                                                               href="#legacyimplementation">#</a></h4>                                     
        <div><p>设置为true则使用旧的ListView的实现。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="numcolumns"></a>numColumns: <span
            class="propType"><code>number</code></span> <a class="hash-link" href="#numcolumns">#</a>
    </h4>
        <div><p>多列布局只能在非水平模式下使用，即必须是<code>horizontal={false}</code>。此时组件内元素会从左到右从上到下按Z字形排列，类似启用了<code>flexWrap</code>的布局。组件内元素必须是等高的——暂时还无法支持瀑布流布局。</p></div>
    </div>
    <div class="prop">
    	<h4 class="propTitle"><a class="anchor" name="onendreached"></a>onEndReached?: <span
            class="propType"><code>?(info: {distanceFromEnd: number}) =&gt; void</code></span> <a class="hash-link"
                                                                                                  href="#onendreached">#</a>
    	</h4>
        <div><p>当列表被滚动到距离内容最底部不足<code>onEndReachedThreshold</code>的距离时调用。</p></div>
    </div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="onendreachedthreshold"></a>onEndReachedThreshold?: <span class="propType"><span>?number</span></span> <a class="hash-link" href="#onendreachedthreshold">#</a></h4>
		<div>
			<p>
			决定当距离内容最底部还有多远时触发<code>onEndReached</code>回调。注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。
			</p>
		</div>
	</div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onrefresh"></a>onRefresh?: <span
            class="propType"><code>?() =&gt; void</code></span> <a class="hash-link"
                                                                   href="#onrefresh">#</a></h4>
        <div><p>如果设置了此选项，则会在列表头部添加一个标准的<code>RefreshControl</code>控件，以便实现“下拉刷新”的功能。同时你需要正确设置<code>refreshing</code>属性。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onviewableitemschanged"></a>onViewableItemsChanged?:
        <span class="propType"><code>?(info: {viewableItems: Array&lt;ViewToken&gt;, changed: Array&lt;ViewToken&gt;}) =&gt; void</code></span>
        <a class="hash-link" href="#onviewableitemschanged">#</a></h4>
        <div><p>在可见行元素变化时调用。可见范围和变化频率等参数的配置请设置<code>viewabilityconfig</code>属性</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="refreshing"></a>refreshing?: <span class="propType"><code>?boolean</code></span>
        <a class="hash-link" href="#refreshing">#</a></h4>
        <div><p>在等待加载新数据时将此属性设为true，列表就会显示出一个正在加载的符号。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="renderitem"></a>renderItem: <span
            class="propType"><code>(info: {item: ItemT, index: number}) =&gt; ?React.Element&lt;any&gt;</code></span> <a
            class="hash-link" href="#renderitem">#</a></h4>
        <div><p>根据行数据<code>data</code>渲染每一行的组件。典型用法：</p>
			<div class="prism language-javascript">&lt;FlatList
			  ItemSeparatorComponent<span class="token operator">=</span><span class="token punctuation">{</span>Platform<span class="token punctuation">.</span>OS <span class="token operator">!</span><span class="token operator">==</span> <span class="token string">'android'</span> &amp;&amp; <span class="token punctuation">(</span><span class="token punctuation">{</span>highlighted<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">(</span>
			    &lt;View style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span>style<span class="token punctuation">.</span>separator<span class="token punctuation">,</span> highlighted &amp;&amp; <span class="token punctuation">{</span>marginLeft<span class="token punctuation">:</span> <span class="token number">0</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span> <span class="token operator">/</span><span class="token operator">&gt;</span>
			  <span class="token punctuation">)</span><span class="token punctuation">}</span>
			  data<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">[</span><span class="token punctuation">{</span>title<span class="token punctuation">:</span> <span class="token string">'Title Text'</span><span class="token punctuation">,</span> key<span class="token punctuation">:</span> <span class="token string">'item1'</span><span class="token punctuation">}</span><span class="token punctuation">]</span><span class="token punctuation">}</span>
			  renderItem<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">{</span>item<span class="token punctuation">,</span> separators<span class="token punctuation">}</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token punctuation">(</span>
			    &lt;TouchableHighlight
			      onPress<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=</span><span class="token operator">&gt;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">_onPress<span class="token punctuation">(</span></span>item<span class="token punctuation">)</span><span class="token punctuation">}</span>
			      onShowUnderlay<span class="token operator">=</span><span class="token punctuation">{</span>separators<span class="token punctuation">.</span>highlight<span class="token punctuation">}</span>
			      onHideUnderlay<span class="token operator">=</span><span class="token punctuation">{</span>separators<span class="token punctuation">.</span>unhighlight<span class="token punctuation">}</span><span class="token operator">&gt;</span>
			      &lt;View style<span class="token operator">=</span><span class="token punctuation">{</span><span class="token punctuation">{</span>backgroundColor<span class="token punctuation">:</span> <span class="token string">'white'</span><span class="token punctuation">}</span><span class="token punctuation">}</span><span class="token operator">&gt;</span>
			        &lt;Text<span class="token operator">&gt;</span><span class="token punctuation">{</span>item<span class="token punctuation">.</span>title<span class="token punctuation">}</span><span class="token punctuation">}</span>&lt;<span class="token operator">/</span>Text<span class="token operator">&gt;</span>
			      &lt;<span class="token operator">/</span>View<span class="token operator">&gt;</span>
			    &lt;<span class="token operator">/</span>TouchableHighlight<span class="token operator">&gt;</span>
			  <span class="token punctuation">)</span><span class="token punctuation">}</span>
			<span class="token operator">/</span><span class="token operator">&gt;</span></div>
            <p>Provides additional metadata like <code>index</code> if you need it, as well as a more generic
<code>separators.updateProps</code> function which let's you set whatever props you want to change the
rendering of either the leading separator or trailing separator in case the more common
<code>highlight</code> and <code>unhighlight</code> (which set the <code>highlighted: boolean</code> prop) are insufficient for
your use-case.</p>
        </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="viewabilityconfig"></a>viewabilityConfig?: <span
            class="propType"><code>ViewabilityConfig</code></span> <a class="hash-link"
                                                                      href="#viewabilityconfig">#</a>
    </h4>
        <div><p>请参考<a href="https://github.com/facebook/react-native/blob/master/Libraries/Lists/ViewabilityHelper.js"><code>ViewabilityHelper</code></a>的源码来了解具体的配置。</p></div>
    </div>
</div>

### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoend"></a>scrollToEnd<span
            class="methodType">(params?: object)</span> <a class="hash-link" href="#scrolltoend">#</a>
    </h4>
        <div><p>滚动到底部。如果不设置<code>getItemLayout</code>属性的话，可能会比较卡。</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoindex"></a>scrollToIndex<span
            class="methodType">(params: object)</span> <a class="hash-link"
                                                          href="#scrolltoindex">#</a></h4>
        <div><p>Scrolls to the item at a the specified index such that it is positioned in the viewable area
            such that <code>viewPosition</code> 0 places it at the top, 1 at the bottom, and 0.5 centered in the
            middle.</p>
            <p>如果不设置<code>getItemLayout</code>属性的话，无法跳转到当前可视区域以外的位置。</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoitem"></a>scrollToItem<span
            class="methodType">(params: object)</span> <a class="hash-link" href="#scrolltoitem">#</a>
    </h4>
        <div><p>Requires linear scan through data - use <code>scrollToIndex</code> instead if possible. 如果不设置<code>getItemLayout</code>属性的话，可能会比较卡。</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltooffset"></a>scrollToOffset<span
            class="methodType">(params: object)</span> <a class="hash-link"
                                                          href="#scrolltooffset">#</a></h4>
        <div><p>Scroll to a specific content pixel offset, like a normal <code>ScrollView</code>.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="recordinteraction"></a>recordInteraction<span
            class="methodType">()</span> <a class="hash-link" href="#recordinteraction">#</a></h4>
        <div><p>Tells the list an interaction has occured, which should trigger viewability calculations, e.g.
            if <code>waitForInteractions</code> is true and the user has not scrolled. This is typically called by
            taps on items or by navigation actions.</p></div>
    </div>
</div>


### 例子
```javascript
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  Animated,
  FlatList,
  StyleSheet,
  View,
} = ReactNative;

const RNTesterPage = require('./RNTesterPage');

const infoLog = require('infoLog');

const {
  FooterComponent,
  HeaderComponent,
  ItemComponent,
  PlainInput,
  SeparatorComponent,
  Spindicator,
  genItemData,
  getItemLayout,
  pressItem,
  renderSmallSwitchOption,
} = require('./ListExampleShared');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

class FlatListExample extends React.PureComponent {
  static title = '<FlatList>';
  static description = 'Performant, scrollable list of data.';

  state = {
    data: genItemData(100),
    debug: false,
    horizontal: false,
    filterText: '',
    fixedHeight: true,
    logViewable: false,
    virtualized: true,
  };

  _onChangeFilterText = (filterText) => {
    this.setState({filterText});
  };

  _onChangeScrollToIndex = (text) => {
    this._listRef.getNode().scrollToIndex({viewPosition: 0.5, index: Number(text)});
  };

  _scrollPos = new Animated.Value(0);
  _scrollSinkX = Animated.event(
    [{nativeEvent: { contentOffset: { x: this._scrollPos } }}],
    {useNativeDriver: true},
  );
  _scrollSinkY = Animated.event(
    [{nativeEvent: { contentOffset: { y: this._scrollPos } }}],
    {useNativeDriver: true},
  );

  componentDidUpdate() {
    this._listRef.getNode().recordInteraction(); // e.g. flipping logViewable switch
  }

  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) => (
      filterRegex.test(item.text) || filterRegex.test(item.title)
    );
    const filteredData = this.state.data.filter(filter);
    return (
      <RNTesterPage
        noSpacer={true}
        noScroll={true}>
        <View style={styles.searchRow}>
          <View style={styles.options}>
            <PlainInput
              onChangeText={this._onChangeFilterText}
              placeholder="Search..."
              value={this.state.filterText}
            />
            <PlainInput
              onChangeText={this._onChangeScrollToIndex}
              placeholder="scrollToIndex..."
            />
          </View>
          <View style={styles.options}>
            {renderSmallSwitchOption(this, 'virtualized')}
            {renderSmallSwitchOption(this, 'horizontal')}
            {renderSmallSwitchOption(this, 'fixedHeight')}
            {renderSmallSwitchOption(this, 'logViewable')}
            {renderSmallSwitchOption(this, 'debug')}
            <Spindicator value={this._scrollPos} />
          </View>
        </View>
        <SeparatorComponent />
        <AnimatedFlatList
          ItemSeparatorComponent={SeparatorComponent}
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={FooterComponent}
          data={filteredData}
          debug={this.state.debug}
          disableVirtualization={!this.state.virtualized}
          getItemLayout={this.state.fixedHeight ?
            this._getItemLayout :
            undefined
          }
          horizontal={this.state.horizontal}
          key={(this.state.horizontal ? 'h' : 'v') +
            (this.state.fixedHeight ? 'f' : 'd')
          }
          legacyImplementation={false}
          numColumns={1}
          onEndReached={this._onEndReached}
          onRefresh={this._onRefresh}
          onScroll={this.state.horizontal ? this._scrollSinkX : this._scrollSinkY}
          onViewableItemsChanged={this._onViewableItemsChanged}
          ref={this._captureRef}
          refreshing={false}
          renderItem={this._renderItemComponent}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </RNTesterPage>
    );
  }
  _captureRef = (ref) => { this._listRef = ref; };
  _getItemLayout = (data: any, index: number) => {
    return getItemLayout(data, index, this.state.horizontal);
  };
  _onEndReached = () => {
    this.setState((state) => ({
      data: state.data.concat(genItemData(100, state.data.length)),
    }));
  };
  _onRefresh = () => alert('onRefresh: nothing to refresh :P');
  _renderItemComponent = ({item}) => {
    return (
      <ItemComponent
        item={item}
        horizontal={this.state.horizontal}
        fixedHeight={this.state.fixedHeight}
        onPress={this._pressItem}
      />
    );
  };
  // This is called when items change viewability by scrolling into or out of
  // the viewable area.
  _onViewableItemsChanged = (info: {
      changed: Array<{
        key: string,
        isViewable: boolean,
        item: any,
        index: ?number,
        section?: any,
      }>
    }
  ) => {
    // Impressions can be logged here
    if (this.state.logViewable) {
      infoLog(
        'onViewableItemsChanged: ',
        info.changed.map((v) => ({...v, item: '...'})),
      );
    }
  };
  _pressItem = (key: number) => {
    this._listRef.getNode().recordInteraction();
    pressItem(this, key);
  };
  _listRef: FlatList<*>;
}


const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  searchRow: {
    paddingHorizontal: 10,
  },
});

module.exports = FlatListExample;
```
