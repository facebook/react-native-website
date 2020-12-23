---
id: version-0.44-sectionlist
title: SectionList
original_id: sectionlist
---

高性能的分组(section)列表组件，支持下面这些常用的功能：

- 完全跨平台。
- 支持水平布局模式。
- 行组件显示或隐藏时可配置回调事件。
- 支持单独的头部组件。
- 支持单独的尾部组件。
- 支持自定义行间分隔线。
- 支持下拉刷新。
- 支持上拉加载。

如果你的列表不需要分组(section)，那么可以使用结构更简单的[`<FlatList>`](flatlist.html)。

在0.43版本中，如果希望section的头部能够吸顶悬浮，请暂时先使用老版的[`<ListView>`](listview.html)。下一个版本开始可以支持悬浮的section头部。

简单的例子：

```jsx
<SectionList
  renderItem={({item}) => <ListItem title={item.title} />}
  renderSectionHeader={({section}) => <H1 title={section.key} />}
  sections={[ // 不同section渲染相同类型的子组件
    {data: [...], key: ...},
    {data: [...], key: ...},
    {data: [...], key: ...},
  ]}
/>

<SectionList
  sections={[ // 不同section渲染不同类型的子组件
    {data: [...], key: ..., renderItem: ...},
    {data: [...], key: ..., renderItem: ...},
    {data: [...], key: ..., renderItem: ...},
  ]}
/>
```

本组件实质是基于[`<VirtualizedList>`](virtualizedlist.html)组件的封装，因此也有下面这些需要注意的事项：

- 当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
- 本组件继承自`PureComponent`而非通常的`Component`，这意味着如果其`props`在`浅比较`中是相等的，则不会重新渲染。所以请先检查你的`renderItem`函数所依赖的`props`数据（包括`data`属性以及可能用到的父组件的state），如果是一个引用类型（Object或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的Object或者数组中），然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下[js中的基本类型和引用类型](https://segmentfault.com/a/1190000002789651)。）
- 为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，而我们也在设法持续改进。
- 默认情况下每行都需要提供一个不重复的key属性。你也可以提供一个`keyExtractor`函数来生成key。

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="itemseparatorcomponent"></a>ItemSeparatorComponent?:
        <span class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                             href="#itemseparatorcomponent">#</a>
    </h4>
        <div><p>行与行之间的分隔线组件。不会出现在第一行之前和最后一行之后。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="listfootercomponent"></a>ListFooterComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#listfootercomponent">#</a>
    </h4>
        <div><p>尾部组件</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="listheadercomponent"></a>ListHeaderComponent?: <span
            class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                           href="#listheadercomponent">#</a>
    </h4>
        <div><p>头部组件</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="sectionseparatorcomponent"></a>SectionSeparatorComponent?:
        <span class="propType"><code>?ReactClass&lt;any&gt;</code></span> <a class="hash-link"
                                                                             href="#sectionseparatorcomponent">#</a>
    </h4>
        <div><p>Rendered in between each section.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="keyextractor"></a>keyExtractor: <span
            class="propType"><code>(item: Item, index: number) =&gt; string</code></span> <a class="hash-link"
                                                                                             href="#keyextractor">#</a>
    </h4>
        <div><p>Used to extract a unique key for a given item at the specified index. Key is used for caching
            and as the react key to track item re-ordering. The default extractor checks item.key, then
            falls back to using the index, like react does.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onendreached"></a>onEndReached?: <span
            class="propType"><code>?(info: {distanceFromEnd: number}) =&gt; void</code></span> <a class="hash-link"
                                                                                                  href="#onendreached">#</a>
    </h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onrefresh"></a>onRefresh?: <span
            class="propType"><code>?() =&gt; void</code></span> <a class="hash-link"
                                                                   href="#onrefresh">#</a></h4>
        <div><p>If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make
            sure to also set the <code>refreshing</code> prop correctly.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onviewableitemschanged"></a>onViewableItemsChanged?:
        <span class="propType"><code>?(info: {viewableItems: Array&lt;ViewToken&gt;, changed: Array&lt;ViewToken&gt;}) =&gt; void</code></span>
        <a class="hash-link" href="#onviewableitemschanged">#</a></h4>
        <div><p>Called when the viewability of rows changes, as defined by the
            <code>viewabilityConfig</code> prop.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="refreshing"></a>refreshing?: <span class="propType"><code>?boolean</code></span>
        <a class="hash-link" href="#refreshing">#</a></h4>
        <div><p>Set this true while waiting for new data from a refresh.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="renderitem"></a>renderItem: <span
            class="propType"><code>(info: {item: Item, index: number}) =&gt; ?React.Element&lt;any&gt;</code></span> <a
            class="hash-link" href="#renderitem">#</a></h4>
        <div><p>Default renderer for every item in every section. Can be over-ridden on a per-section basis.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="rendersectionheader"></a>renderSectionHeader?: <span
            class="propType"><code>?(info: {section: SectionT}) =&gt; ?React.Element&lt;any&gt;</code></span> <a
            class="hash-link" href="#rendersectionheader">#</a></h4>
        <div><p>Rendered at the top of each section. Sticky headers are not yet supported.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="sections"></a>sections: <span
            class="propType"><code>Array&lt;SectionT&gt;</code></span> <a class="hash-link"
                                                                          href="#sections">#</a>
    </h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="shoulditemupdate"></a>shouldItemUpdate: <span
            class="propType"><code>(
  prevProps: {item: Item, index: number},
  nextProps: {item: Item, index: number}
) =&gt; boolean</code></span> <a class="hash-link" href="#shoulditemupdate">#</a></h4>
        <div><p>This is an optional optimization to minimize re-rendering items.</p></div>
    </div>
</div>

### 例子

```jsx
'use strict';

const React = require('react');
const ReactNative = require('react-native');
const {
  SectionList,
  StyleSheet,
  Text,
  View,
} = ReactNative;

const RNTesterPage = require('./RNTesterPage');

const infoLog = require('infoLog');

const {
  HeaderComponent,
  FooterComponent,
  ItemComponent,
  PlainInput,
  SeparatorComponent,
  genItemData,
  pressItem,
  renderSmallSwitchOption,
  renderStackedItem,
} = require('./ListExampleShared');

const VIEWABILITY_CONFIG = {
  minimumViewTime: 3000,
  viewAreaCoveragePercentThreshold: 100,
  waitForInteraction: true,
};

const renderSectionHeader = ({section}) => (
  <View>
    <Text style={styles.headerText}>SECTION HEADER: {section.key}</Text>
    <SeparatorComponent />
  </View>
);

const CustomSeparatorComponent = ({text}) => (
  <View>
    <SeparatorComponent />
    <Text style={styles.separatorText}>{text}</Text>
    <SeparatorComponent />
  </View>
);

class SectionListExample extends React.PureComponent {
  static title = '<SectionList>';
  static description = 'Performant, scrollable list of data.';

  state = {
    data: genItemData(1000),
    filterText: '',
    logViewable: false,
    virtualized: true,
  };
  render() {
    const filterRegex = new RegExp(String(this.state.filterText), 'i');
    const filter = (item) => (filterRegex.test(item.text) || filterRegex.test(item.title));
    const filteredData = this.state.data.filter(filter);
    return (
      <RNTesterPage
        noSpacer={true}
        noScroll={true}>
        <View style={styles.searchRow}>
          <PlainInput
            onChangeText={filterText => {
              this.setState(() => ({filterText}));
            }}
            placeholder="Search..."
            value={this.state.filterText}
          />
          <View style={styles.optionSection}>
            {renderSmallSwitchOption(this, 'virtualized')}
            {renderSmallSwitchOption(this, 'logViewable')}
          </View>
        </View>
        <SeparatorComponent />
        <SectionList
          ListHeaderComponent={HeaderComponent}
          ListFooterComponent={FooterComponent}
          SectionSeparatorComponent={() => <CustomSeparatorComponent text="SECTION SEPARATOR" />}
          ItemSeparatorComponent={() => <CustomSeparatorComponent text="ITEM SEPARATOR" />}
          enableVirtualization={this.state.virtualized}
          onRefresh={() => alert('onRefresh: nothing to refresh :P')}
          onViewableItemsChanged={this._onViewableItemsChanged}
          refreshing={false}
          renderItem={this._renderItemComponent}
          renderSectionHeader={renderSectionHeader}
          sections={[
            {renderItem: renderStackedItem, key: 's1', data: [
              {title: 'Item In Header Section', text: 'Section s1', key: '0'},
            ]},
            {key: 's2', data: [
              {noImage: true, title: 'First item', text: 'Section s2', key: '0'},
              {noImage: true, title: 'Second item', text: 'Section s2', key: '1'},
            ]},
            {key: 'Filtered Items', data: filteredData},
          ]}
          viewabilityConfig={VIEWABILITY_CONFIG}
        />
      </RNTesterPage>
    );
  }
  _renderItemComponent = ({item}) => <ItemComponent item={item} onPress={this._pressItem} />;
  // This is called when items change viewability by scrolling into our out of the viewable area.
  _onViewableItemsChanged = (info: {
    changed: Array<{
      key: string, isViewable: boolean, item: {columns: Array<*>}, index: ?number, section?: any
    }>},
  ) => {
    // Impressions can be logged here
    if (this.state.logViewable) {
      infoLog('onViewableItemsChanged: ', info.changed.map((v: Object) => (
        {...v, item: '...', section: v.section.key}
      )));
    }
  };
  _pressItem = (index: number) => {
    pressItem(this, index);
  };
}

const styles = StyleSheet.create({
  headerText: {
    padding: 4,
  },
  optionSection: {
    flexDirection: 'row',
  },
  searchRow: {
    paddingHorizontal: 10,
  },
  separatorText: {
    color: 'gray',
    alignSelf: 'center',
    padding: 4,
    fontSize: 9,
  },
});

module.exports = SectionListExample;
```
