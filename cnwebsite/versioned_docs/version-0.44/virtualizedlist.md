---
id: version-0.44-virtualizedlist
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
