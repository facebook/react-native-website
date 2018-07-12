---
id: version-0.43-virtualizedlist
title: VirtualizedList
original_id: virtualizedlist
---

Base implementation for the more convenient [`<FlatList>`](flatlist.html) and [`<SectionList>`](sectionlist.html) components, which are also better documented. In general, this should only really be used if you need more flexibility than `FlatList` provides, e.g. for use with immutable data instead of plain arrays.

Virtualization massively improves memory consumption and performance of large lists by maintaining a finite render window of active items and replacing all items outside of the render window with appropriately sized blank space. The window adapts to scrolling behavior, and items are rendered incrementally with low-pri (after any running interactions) if they are far from the visible area, or with hi-pri otherwise to minimize the potential of seeing blank space.

Some caveats:

- Internal state is not preserved when content scrolls out of the render window. Make sure all your data is captured in the item data or external stores like Flux, Redux, or Relay.
- In order to constrain memory and enable smooth scrolling, content is rendered asynchronously offscreen. This means it's possible to scroll faster than the fill rate ands momentarily see blank content. This is a tradeoff that can be adjusted to suit the needs of each application, and we are working on improving it behind the scenes.
- By default, the list looks for a key prop on each item and uses that for the React key. Alternatively, you can provide a custom keyExtractor prop.


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
