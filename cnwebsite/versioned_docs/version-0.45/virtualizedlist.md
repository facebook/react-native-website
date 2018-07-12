---
id: version-0.45-virtualizedlist
title: VirtualizedList
original_id: virtualizedlist
---

Base implementation for the more convenient [`<FlatList>`](flatlist.html) and [`<SectionList>`](sectionlist.html) components, which are also better documented. In general, this should only really be used if you need more flexibility than `FlatList` provides, e.g. for use with immutable data instead of plain arrays.

Virtualization massively improves memory consumption and performance of large lists by maintaining a finite render window of active items and replacing all items outside of the render window with appropriately sized blank space. The window adapts to scrolling behavior, and items are rendered incrementally with low-pri (after any running interactions) if they are far from the visible area, or with hi-pri otherwise to minimize the potential of seeing blank space.

注意事项：

- 当某行滑出渲染区域之外后，其内部状态将不会保留。请确保你在行组件以外的地方保留了数据。
- 本组件继承自`PureComponent`而非通常的`Component`，这意味着如果其`props`在`浅比较`中是相等的，则不会重新渲染。所以请先检查你的`renderItem`函数所依赖的`props`数据（包括`data`属性以及可能用到的父组件的state），如果是一个引用类型（Object或者数组都是引用类型），则需要先修改其引用地址（比如先复制到一个新的Object或者数组中），然后再修改其值，否则界面很可能不会刷新。（译注：这一段不了解的朋友建议先学习下[js中的基本类型和引用类型](https://segmentfault.com/a/1190000002789651)。）
- 为了优化内存占用同时保持滑动的流畅，列表内容会在屏幕外异步绘制。这意味着如果用户滑动的速度超过渲染的速度，则会先看到空白的内容。这是为了优化不得不作出的妥协，而我们也在设法持续改进。
- 默认情况下每行都需要提供一个不重复的key属性。你也可以提供一个`keyExtractor`函数来生成key。


NOTE: `LayoutAnimation` and sticky section headers both have bugs when used with this and are therefore not officially supported yet.

注意：`removeClippedSubviews`属性目前是不必要的，而且可能会引起问题。如果你在某些场景碰到内容不渲染的情况，尝试设置`removeClippedSubviews={false}`。我们可能会在将来的版本中修改此属性的默认值。

### 属性

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="data"></a>data?: <span class="propType">any</span>
        <a class="hash-link" href="#data">#</a></h4>
        <div><p>The default accessor functions assume this is an Array&lt;{key: string}&gt; but you can override
            getItem, getItemCount, and keyExtractor to handle any type of index-based data.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="debug"></a>debug?: <span class="propType"><span>?boolean</span></span>
        <a class="hash-link" href="#debug">#</a></h4>
        <div><p><code>debug</code> will turn on extra logging and visual overlays to aid with debugging both usage and
            implementation, but with a significant perf hit.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="disablevirtualization"></a>disableVirtualization:
        <span class="propType">boolean</span> <a class="hash-link"
                                                 href="#disablevirtualization">#</a></h4>
        <div><p>DEPRECATED: Virtualization provides significant performance and memory optimizations, but fully
            unmounts react instances that are outside of the render window. You should only need to disable
            this for debugging purposes.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="extradata"></a>extraData?: <span class="propType">any</span>
        <a class="hash-link" href="#extradata">#</a></h4>
        <div><p>A marker property for telling the list to re-render (since it implements <code>PureComponent</code>). If
            any of your <code>renderItem</code>, Header, Footer, etc. functions depend on anything outside of the
            <code>data</code> prop, stick it here and treat it immutably.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitem"></a>getItem: <span class="propType">(data: any, index: number) =&gt; ?Item</span>
        <a class="hash-link" href="#getitem">#</a></h4>
        <div><p>A generic accessor for extracting an item from any sort of data blob.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitemcount"></a>getItemCount: <span
            class="propType">(data: any) =&gt; number</span> <a class="hash-link"
                                                                href="#getitemcount">#</a></h4>
        <div><p>Determines how many items are in the data blob.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="getitemlayout"></a>getItemLayout?: <span
            class="propType">(data: any, index: number) =&gt;
  {length: number, offset: number, index: number}</span> <a class="hash-link"
                                                            href="#getitemlayout">#</a></h4>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="horizontal"></a>horizontal?: <span class="propType"><span>?boolean</span></span>
        <a class="hash-link" href="#horizontal">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="initialnumtorender"></a>initialNumToRender: <span
            class="propType">number</span> <a class="hash-link"
                                              href="#initialnumtorender">#</a></h4>
        <div><p>How many items to render in the initial batch. This should be enough to fill the screen but not
            much more. Note these items will never be unmounted as part of the windowed rendering in order
            to improve perceived performance of scroll-to-top actions.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="keyextractor"></a>keyExtractor: <span
            class="propType">(item: Item, index: number) =&gt; string</span> <a class="hash-link"
                                                                                href="#keyextractor">#</a>
    </h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="maxtorenderperbatch"></a>maxToRenderPerBatch: <span
            class="propType">number</span> <a class="hash-link"
                                              href="#maxtorenderperbatch">#</a></h4>
        <div><p>The maximum number of items to render in each incremental render batch. The more rendered at
            once, the better the fill rate, but responsiveness my suffer because rendering content may
            interfere with responding to button taps or other interactions.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onendreached"></a>onEndReached?: <span
            class="propType"><span>?(info: {distanceFromEnd: number}) =&gt; void</span></span> <a class="hash-link"
                                                                                                  href="#onendreached">#</a>
    </h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onendreachedthreshold"></a>onEndReachedThreshold?:
        <span class="propType"><span>?number</span></span> <a class="hash-link"
                                                              href="#onendreachedthreshold">#</a>
    </h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onlayout"></a>onLayout?: <span
            class="propType"><span>?Function</span></span> <a class="hash-link"
                                                              href="#onlayout">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onrefresh"></a>onRefresh?: <span
            class="propType"><span>?Function</span></span> <a class="hash-link"
                                                              href="#onrefresh">#</a></h4>
        <div><p>If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make
            sure to also set the <code>refreshing</code> prop correctly.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="onviewableitemschanged"></a>onViewableItemsChanged?:
        <span class="propType"><span>?(info: {
  viewableItems: Array&lt;ViewToken&gt;,
  changed: Array&lt;ViewToken&gt;,
}) =&gt; void</span></span> <a class="hash-link" href="#onviewableitemschanged">#</a></h4>
        <div><p>Called when the viewability of rows changes, as defined by the
            <code>viewabilityConfig</code> prop.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="refreshing"></a>refreshing?: <span class="propType"><span>?boolean</span></span>
        <a class="hash-link" href="#refreshing">#</a></h4>
        <div><p>Set this true while waiting for new data from a refresh.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="removeclippedsubviews"></a>removeClippedSubviews?:
        <span class="propType">boolean</span> <a class="hash-link"
                                                 href="#removeclippedsubviews">#</a></h4>
        <div><p>A native optimization that removes clipped subviews (those outside the parent) from the view
            hierarchy to offload work from the native rendering system. They are still kept around so no
            memory is saved and state is preserved.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="renderitem"></a>renderItem: <span class="propType">(info: {item: Item, index: number}) =&gt; ?React.Element&lt;any&gt;</span>
        <a class="hash-link" href="#renderitem">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="renderscrollcomponent"></a>renderScrollComponent:
        <span class="propType">(props: Object) =&gt; React.Element&lt;any&gt;</span> <a class="hash-link"
                                                                                        href="#renderscrollcomponent">#</a>
    </h4>
        <div><p>Render a custom scroll component, e.g. with a differently styled <code>RefreshControl</code>.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="updatecellsbatchingperiod"></a>updateCellsBatchingPeriod:
        <span class="propType">number</span> <a class="hash-link"
                                                href="#updatecellsbatchingperiod">#</a></h4>
        <div><p>Amount of time between low-pri item render batches, e.g. for rendering items quite a ways off
            screen. Similar fill rate/responsiveness tradeoff as <code>maxToRenderPerBatch</code>.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="viewabilityconfig"></a>viewabilityConfig?: <span
            class="propType">ViewabilityConfig</span> <a class="hash-link"
                                                         href="#viewabilityconfig">#</a></h4>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="windowsize"></a>windowSize: <span class="propType">number</span>
        <a class="hash-link" href="#windowsize">#</a></h4>
        <div><p>Determines the maximum number of items rendered outside of the visible area, in units of
            visible lengths. So if your list fills the screen, then <code>windowSize={21}</code> (the default) will
            render the visible screen area plus up to 10 screens above and 10 below the viewport. Reducing
            this number will reduce memory consumption and may improve performance, but will increase the
            chance that fast scrolling may reveal momentary blank areas of unrendered content.</p></div>
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
