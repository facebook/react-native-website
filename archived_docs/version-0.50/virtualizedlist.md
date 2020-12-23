---
id: version-0.50-virtualizedlist
title: VirtualizedList
original_id: virtualizedlist
---

[`FlatList`](flatlist.html) and [`SectionList`](sectionlist.html) 的底层实现。`FlatList` 和 `SectionList` 使用起来更方便，同时也有相对更详细的文档。一般来说，仅当想获得比 `FlatList` 更高的灵活性（比如说在使用 immutable data 而不是 普通数组）的时候，你才应该考虑使用`VirtualizedList`。

`Vritualization` 通过维护一个有限的渲染窗口（其中包含可见的元素），并将渲染窗口之外的元素全部用合适的定长空白空间代替的方式，极大的改善了内存消耗以及在有大量数据情况下的使用性能。这个渲染窗口能响应滚动行为。当一个元素离可视区太远时，它就有一个较低优先级；否则就获得一个较高的优先级。渲染窗口通过这种方式逐步渲染其中的元素（在进行了任何交互之后），以尽量减少出现空白区域的可能性。

注意事项：

- 当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
- 本组件继承自`PureComponent`而非通常的`Component`，这意味着如果其`props`在`浅比较`中是相等的，则不会重新渲染。所以请先检查你的`renderItem`函数所依赖的`props`数据（包括`data`属性以及可能用到的父组件的state），如果是一个引用类型（Object或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的Object或者数组中），然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下[js中的基本类型和引用类型](https://segmentfault.com/a/1190000002789651)。）
- 为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，而我们也在设法持续改进。
- 默认情况下每行都需要提供一个不重复的key属性。你也可以提供一个`keyExtractor`函数来生成key。


NOTE: `LayoutAnimation` 和可粘接的section headers 在与 `VirtualizedList` 一起使用的时候，可能会有 bug，所以还没有得到官方支持。

注意：`removeClippedSubviews`属性目前是不必要的，而且可能会引起问题。如果你在某些场景碰到内容不渲染的情况，尝试设置`removeClippedSubviews={false}`。我们可能会在将来的版本中修改此属性的默认值。

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="data"></a>data?: <span class="propType">any</span>
        <a class="hash-link" href="#data">#</a></h4>
        <div><p>默认的获取器函数假设它是一个数组（Array&lt;{key: string}&gt;），但是你能重写 <code>getItem</code>, <code>getItemCount</code>, <code>keyExtractor</code> 来处理任何类型的可索引数据。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="debug"></a>debug?: <span class="propType"><span>?boolean</span></span>
        <a class="hash-link" href="#debug">#</a></h4>
        <div><p>开启额外的日志和视觉覆盖功能，来协助对使用和实现的调试。但是会严重地影响性能。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="disablevirtualization"></a>disableVirtualization:
        <span class="propType">boolean</span> <a class="hash-link"
                                                 href="#disablevirtualization">#</a></h4>
        <div><p>已过时: Virtualization 提供了显著的性能和内存优化，并且完全卸载了位于可视区之外的 react 实例。当且仅当为了调试，你才可以关闭这个特性。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="extradata"></a>extraData?: <span class="propType">any</span>
        <a class="hash-link" href="#extradata">#</a></h4>
        <div><p>这是一个标记属性，用来告诉列表重新渲染（由于它实现了<code>PureComponent</code>)。如果有  <code>data</code> 属性之外的数据引用，就把它列在这里，并把它当成不可变的。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitem"></a>getItem: <span class="propType">(data: any, index: number) =&gt; ?Item</span>
        <a class="hash-link" href="#getitem">#</a></h4>
        <div><p>通用的获取器，用来从任意类型的数据块中获取一个元素。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitemcount"></a>getItemCount: <span
            class="propType">(data: any) =&gt; number</span> <a class="hash-link"
                                                                href="#getitemcount">#</a></h4>
        <div><p>用来决定数据块中一共有多少元素。</p></div>
    </div>
    <div class="prop">
      <h4 class="propTitle"><a class="anchor" name="getitemlayout"></a>getItemLayout?: <span class="propType">(data: any, index: number) =&gt; {length: number, offset: number, index: number}</span> <a class="hash-link" href="#getitemlayout">#</a></h4>
      <p><code>getItemLayout</code>是一个可选的优化，用于避免动态测量内容尺寸的开销，不过前提是你可以提前知道内容的高度。如果你的行高是固定的，<code>getItemLayout</code>用起来就既高效又简单。</p>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="horizontal"></a>horizontal?: <span class="propType"><span>?boolean</span></span>
        <a class="hash-link" href="#horizontal">#</a></h4>
        <p>设置为true则变为水平布局模式。</p>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="initialnumtorender"></a>initialNumToRender: <span
            class="propType">number</span> <a class="hash-link"
                                              href="#initialnumtorender">#</a></h4>
        <div><p>首批应该渲染的元素数量。这些元素应该能够覆盖住屏幕，但再多就不好了。注意：为了响应“滚动到顶部”这个事件并最优化其性能，这些元素将作为窗口渲染的一部分，永远不会被卸载。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="keyextractor"></a>keyExtractor: <span class="propType">(item: Item, index: number) =&gt; string</span> <a class="hash-link" href="#keyextractor">#</a>
    </h4>
      <p>此函数用于为给定的item生成一个不重复的key。Key的作用是使React能够区分同类元素的不同个体，以便在刷新时能够确定其变化的位置，减少重新渲染的开销。若不指定此函数，则默认抽取item.key作为key值。若item.key也不存在，则使用数组下标。</p>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="maxtorenderperbatch"></a>maxToRenderPerBatch: <span
            class="propType">number</span> <a class="hash-link"
                                              href="#maxtorenderperbatch">#</a></h4>
        <div><p>每批增量渲染可渲染的最大数量。能立即渲染出的元素数量越多，填充速率就越快，但是响应性可能会有一些损失，因为每个被渲染的元素都可能参与或干扰对按钮点击事件或其他事件的响应。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onendreached"></a>onEndReached?: <span
            class="propType"><span>?(info: {distanceFromEnd: number}) =&gt; void</span></span> <a class="hash-link"
                                                                                                  href="#onendreached">#</a>
    </h4>
      <p>当列表被滚动到距离内容最底部不足 <code>onEndReachedThreshold</code> 的距离时调用。</p>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onendreachedthreshold"></a>onEndReachedThreshold?:
        <span class="propType"><span>?number</span></span> <a class="hash-link"
                                                              href="#onendreachedthreshold">#</a>
    </h4>
      <p>决定当距离内容最底部还有多远时触发 <code>onEndReached</code> 回调。注意此参数是一个比值而非像素单位。比如，0.5表示距离内容最底部的距离为当前列表可见长度的一半时触发。</p>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onlayout"></a>onLayout?: <span
            class="propType"><span>?Function</span></span> <a class="hash-link"
                                                              href="#onlayout">#</a></h4>
      <p>参见 <a href="view.html#onlayout">View#onlayout</a></p>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onrefresh"></a>onRefresh?: <span
            class="propType"><span>?Function</span></span> <a class="hash-link"
                                                              href="#onrefresh">#</a></h4>
        <div><p>如果设置了此选项，则会在列表头部添加一个标准的<code>RefreshControl</code>控件，以便实现“下拉刷新”的功能。同时你需要正确设置<code>refreshing</code>属性。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onviewableitemschanged"></a>onViewableItemsChanged?:
        <span class="propType"><span>?(info: {
  viewableItems: Array&lt;ViewToken&gt;,
  changed: Array&lt;ViewToken&gt;,
}) =&gt; void</span></span> <a class="hash-link" href="#onviewableitemschanged">#</a></h4>
        <div><p>当列表中行的可见性发生变化时，就会调用这个函数。可见性设置见<code>viewabilityConfig</code>。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="refreshing"></a>refreshing?: <span class="propType"><span>?boolean</span></span>
        <a class="hash-link" href="#refreshing">#</a></h4>
        <div><p>当等待数据进行更新时，将这个属性设置为<code>true</code></p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="removeclippedsubviews"></a>removeClippedSubviews?:
        <span class="propType">boolean</span> <a class="hash-link"
                                                 href="#removeclippedsubviews">#</a></h4>
        <div><p>一个将“剪裁子视图”(clipped subviews)（指的是那些在父视图之外的视图）从视图层级中删除的本地优化，为的是减轻渲染系统的工作负担。但是这些被剪裁掉的子视图依然保留在内存中，所以它们所占的储存空间没有被释放，内部状态也都保留了下来。</p></div>
        <div><p></p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="renderitem"></a>renderItem: <span class="propType">(info: {item: Item, index: number}) =&gt; ?React.Element&lt;any&gt;</span>
        <a class="hash-link" href="#renderitem">#</a></h4>
        <p>参见 <a href="flatlist.html#renderitem">FlatList#renderitem</a></p>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="renderscrollcomponent"></a>renderScrollComponent:
        <span class="propType">(props: Object) =&gt; React.Element&lt;any&gt;</span> <a class="hash-link" href="#renderscrollcomponent">#</a>
    </h4>
        <div><p>渲染一个自定义的滚动组件，比如说这个组件有一种不同的刷新控制方式。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="updatecellsbatchingperiod"></a>updateCellsBatchingPeriod:
        <span class="propType">number</span> <a class="hash-link"
                                                href="#updatecellsbatchingperiod">#</a></h4>
        <div><p>具有较低渲染优先级的元素（比如那些离屏幕相当远的元素）的渲染批次之间的时间间隔。与<code>maxToRenderPerBatch</code>具有相同的目的，都是为了在渲染速率和响应性之间获得一个平衡。</p></div>
    </div>
    <div class="prop">
      <h4 class="propTitle"><a class="anchor" name="viewabilityconfig"></a>viewabilityConfig?: <span class="propType">ViewabilityConfig</span> <a class="hash-link" href="#viewabilityconfig">#</a></h4>
      <div><p>请参考<a href="https://github.com/facebook/react-native/blob/master/Libraries/Lists/ViewabilityHelper.js"><code>ViewabilityHelper</code></a>的源码来了解具体的配置。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="windowsize"></a>windowSize: <span class="propType">number</span>
        <a class="hash-link" href="#windowsize">#</a></h4>
        <div><p>设置可视区外最大能被渲染的元素的数量，以可视区的长度为单位。比如说，如果列表占满了整个屏幕，而<code>windowSize</code>属性被设置为 <i>21</i> 的话，那渲染的长度为包括当前可见屏幕区域在内，往上10个屏幕的长度和往下10个屏幕的长度。将<code>windowSize</code>设置为一个较小值，能有减小内存消耗并提高性能，但是当你快速滚动列表时，遇到尚未渲染的内容的几率会增大，而这些尚未渲染的内容会暂时性地被空白区块所替代。</p></div>
    </div>
</div>

### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoend"></a>scrollToEnd<span
            class="methodType">(params?: object)</span> <a class="hash-link"
                                                           href=".html#scrolltoend">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoindex"></a>scrollToIndex<span
            class="methodType">(params: object)</span> <a class="hash-link"
                                                          href=".html#scrolltoindex">#</a></h4>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltoitem"></a>scrollToItem<span
            class="methodType">(params: object)</span> <a class="hash-link"
                                                          href=".html#scrolltoitem">#</a></h4></div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="scrolltooffset"></a>scrollToOffset<span
            class="methodType">(params: object)</span> <a class="hash-link"
                                                          href=".html#scrolltooffset">#</a></h4>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="recordinteraction"></a>recordInteraction<span
            class="methodType">()</span> <a class="hash-link" href=".html#recordinteraction">#</a>
    </h4></div>
</div>
