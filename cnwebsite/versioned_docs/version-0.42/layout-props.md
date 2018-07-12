---
id: version-0.42-layout-props
title: 布局样式属性
original_id: layout-props
---

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="alignitems"></a>alignItems <span class="propType">enum('flex-start', 'flex-end', 'center', 'stretch')</span>
        <a class="hash-link" href="#alignitems">#</a></h4>
        <div><p><code>alignItems</code>决定了子元素在次轴方向的排列方式（此样式设置在父元素上）。例如若子元素本来是沿着竖直方向排列的（即主轴竖直，次轴水平），则<code>alignItems</code>决定了它们在水平方向的排列方式。此样式和CSS中的<code>align-items</code>表现一致，默认值为stretch。访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-items">https://developer.mozilla.org/en-US/docs/Web/CSS/align-items</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="alignself"></a>alignSelf <span class="propType">enum('auto', 'flex-start', 'flex-end', 'center', 'stretch')</span>
        <a class="hash-link" href="#alignself">#</a></h4>
        <div><p><code>alignSelf</code>决定了元素在父元素的次轴方向的排列方式（此样式设置在子元素上），其值会覆盖父元素的<code>alignItems</code>的值。其表现和CSS上的<code>align-self</code>一致（默认值为auto）。访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/align-self">https://developer.mozilla.org/en-US/docs/Web/CSS/align-self</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="borderbottomwidth"></a>borderBottomWidth <span
            class="propType">number</span> <a class="hash-link" href="#borderbottomwidth">#</a>
    </h4>
        <div><p><code>borderBottomWidth</code>和CSS上的<code>border-bottom-width</code>表现一致。访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width">https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom-width</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="borderleftwidth"></a>borderLeftWidth <span
            class="propType">number</span> <a class="hash-link" href="#borderleftwidth">#</a></h4>
        <div><p><code>borderLeftWidth</code>和CSS上的<code>border-left-width</code>表现一致。访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width">https://developer.mozilla.org/en-US/docs/Web/CSS/border-left-width</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="borderrightwidth"></a>borderRightWidth <span
            class="propType">number</span> <a class="hash-link" href="#borderrightwidth">#</a>
    </h4>
        <div><p><code>borderRightWidth</code> 和CSS上的<code>border-right-width</code>表现一致。访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width">https://developer.mozilla.org/en-US/docs/Web/CSS/border-right-width</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="bordertopwidth"></a>borderTopWidth <span
            class="propType">number</span> <a class="hash-link" href="#bordertopwidth">#</a></h4>
        <div><p><code>borderTopWidth</code>和CSS上的<code>border-top-width</code>表现一致。访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width">https://developer.mozilla.org/en-US/docs/Web/CSS/border-top-width</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="borderwidth"></a>borderWidth <span class="propType">number</span>
        <a class="hash-link" href="#borderwidth">#</a></h4>
        <div><p><code>borderWidth</code>和CSS上的<code>border-width</code>表现一致。访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/border-width">https://developer.mozilla.org/en-US/docs/Web/CSS/border-width</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="bottom"></a>bottom <span
            class="propType">number</span> <a class="hash-link" href="#bottom">#</a></h4>
        <div><p><code>bottom</code>值是指将本组件定位到距离底部多少个逻辑像素（底部的定义取决于<code>position</code>属性）。</p>
            <p>它的表现和CSS上的<code>bottom</code>类似，但注意在React Native上只能使用逻辑像素值（数字单位），而不能使用百分比、em或是任何其他单位。</p>
            <p>访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/bottom">https://developer.mozilla.org/en-US/docs/Web/CSS/bottom</a>来进一步了解<code>bottom</code>是如何影响布局的。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="flex"></a>flex <span class="propType">number</span>
        <a class="hash-link" href="#flex">#</a></h4>
        <div><p>在React Native中<code>flex</code>的表现和CSS有些区别。
            <code>flex</code>在RN中只能为整数值，其具体表现请参考<code>yoga引擎库</code>的文档，其网址是<a href="https://github.com/facebook/yoga">https://github.com/facebook/yoga</a></p>
            <p>当<code>flex</code>取正整数值时， is a positive number, it makes the component flexible
                and it will be sized proportional to its flex value. So a
                component with <code>flex</code> set to 2 will take twice the space as a
                component with <code>flex</code> set to 1.</p>
            <p> When <code>flex</code> is 0, the component is sized according to <code>width</code>
                and <code>height</code> and it is inflexible.</p>
            <p> When <code>flex</code> is -1, the component is normally sized according
                <code>width</code> and <code>height</code>. However, if there's not enough space,
                the component will shrink to its <code>minWidth</code> and <code>minHeight</code>.</p>
            <p>flexGrow, flexShrink, and flexBasis work the same as in CSS.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="flexbasis"></a>flexBasis <span class="propType">number</span>
        <a class="hash-link" href="#flexbasis">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="flexdirection"></a>flexDirection <span
            class="propType">enum('row', 'row-reverse', 'column', 'column-reverse')</span> <a class="hash-link"
                                                                                              href="#flexdirection">#</a>
    </h4>
        <div><p><code>flexDirection</code> controls which directions children of a container go.
            <code>row</code> goes left to right, <code>column</code> goes top to bottom, and you may
            be able to guess what the other two do. It works like <code>flex-direction</code>
            in CSS, except the default is <code>column</code>.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction">https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="flexgrow"></a>flexGrow <span
            class="propType">number</span> <a class="hash-link" href="#flexgrow">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="flexshrink"></a>flexShrink <span class="propType">number</span>
        <a class="hash-link" href="#flexshrink">#</a></h4></div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="flexwrap"></a>flexWrap <span class="propType">enum('wrap', 'nowrap')</span>
        <a class="hash-link" href="#flexwrap">#</a></h4>
        <div><p><code>flexWrap</code> controls whether children can wrap around after they
            hit the end of a flex container.
            It works like <code>flex-wrap</code> in CSS (default: nowrap).访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap">https://developer.mozilla.org/en-US/docs/Web/CSS/flex-wrap</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="height"></a>height <span
            class="propType">number</span> <a class="hash-link" href="#height">#</a></h4>
        <div><p><code>height</code>用于设置组件的高度。</p>
            <p> It works similarly to <code>height</code> in CSS, but in React Native you
                must use logical pixel units, rather than percents, ems, or any of that.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/height">https://developer.mozilla.org/en-US/docs/Web/CSS/height</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="justifycontent"></a>justifyContent <span
            class="propType">enum('flex-start', 'flex-end', 'center', 'space-between', 'space-around')</span> <a
            class="hash-link" href="#justifycontent">#</a></h4>
        <div><p><code>justifyContent</code> aligns children in the main direction.
            For example, if children are flowing vertically, <code>justifyContent</code>
            controls how they align vertically.
            It works like <code>justify-content</code> in CSS (default: flex-start).访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content">https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="left"></a>left <span class="propType">number</span>
        <a class="hash-link" href="#left">#</a></h4>
        <div><p><code>left</code>值是指将本组件定位到距离左边多少个逻辑像素（左边的定义取决于<code>position</code>属性）。</p>
            <p>它的表现和CSS上的<code>left</code>类似，但注意在React Native上只能使用逻辑像素值（数字单位），而不能使用百分比、em或是任何其他单位。</p>
            <p>访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/left">https://developer.mozilla.org/en-US/docs/Web/CSS/left</a>来进一步了解<code>left</code>是如何影响布局的。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="margin"></a>margin <span
            class="propType">number</span> <a class="hash-link" href="#margin">#</a></h4>
        <div><p>Setting <code>margin</code> has the same effect as setting each of
            <code>marginTop</code>, <code>marginLeft</code>, <code>marginBottom</code>, and <code>marginRight</code>.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/margin">https://developer.mozilla.org/en-US/docs/Web/CSS/margin</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="marginbottom"></a>marginBottom <span
            class="propType">number</span> <a class="hash-link" href="#marginbottom">#</a></h4>
        <div><p><code>marginBottom</code> works like <code>margin-bottom</code> in CSS.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom">https://developer.mozilla.org/en-US/docs/Web/CSS/margin-bottom</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="marginhorizontal"></a>marginHorizontal <span
            class="propType">number</span> <a class="hash-link" href="#marginhorizontal">#</a>
    </h4>
        <div><p>Setting <code>marginHorizontal</code> has the same effect as setting
            both <code>marginLeft</code> and <code>marginRight</code>.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="marginleft"></a>marginLeft <span class="propType">number</span>
        <a class="hash-link" href="#marginleft">#</a></h4>
        <div><p><code>marginLeft</code> works like <code>margin-left</code> in CSS.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left">https://developer.mozilla.org/en-US/docs/Web/CSS/margin-left</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="marginright"></a>marginRight <span class="propType">number</span>
        <a class="hash-link" href="#marginright">#</a></h4>
        <div><p><code>marginRight</code> works like <code>margin-right</code> in CSS.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right">https://developer.mozilla.org/en-US/docs/Web/CSS/margin-right</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="margintop"></a>marginTop <span class="propType">number</span>
        <a class="hash-link" href="#margintop">#</a></h4>
        <div><p><code>marginTop</code> works like <code>margin-top</code> in CSS.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top">https://developer.mozilla.org/en-US/docs/Web/CSS/margin-top</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="marginvertical"></a>marginVertical <span
            class="propType">number</span> <a class="hash-link" href="#marginvertical">#</a></h4>
        <div><p>Setting <code>marginVertical</code> has the same effect as setting both
            <code>marginTop</code> and <code>marginBottom</code>.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="maxheight"></a>maxHeight <span class="propType">number</span>
        <a class="hash-link" href="#maxheight">#</a></h4>
        <div><p><code>maxHeight</code> is the maximum height for this component, in logical pixels.</p>
            <p> It works similarly to <code>max-height</code> in CSS, but in React Native you
                must use logical pixel units, rather than percents, ems, or any of that.</p>
            <p>访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/max-height">https://developer.mozilla.org/en-US/docs/Web/CSS/max-height</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="maxwidth"></a>maxWidth <span
            class="propType">number</span> <a class="hash-link" href="#maxwidth">#</a></h4>
        <div><p><code>maxWidth</code> is the maximum width for this component, in logical pixels.</p>
            <p> It works similarly to <code>max-width</code> in CSS, but in React Native you
                must use logical pixel units, rather than percents, ems, or any of that.</p>
            <p>访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/max-width">https://developer.mozilla.org/en-US/docs/Web/CSS/max-width</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="minheight"></a>minHeight <span class="propType">number</span>
        <a class="hash-link" href="#minheight">#</a></h4>
        <div><p><code>minHeight</code> is the minimum height for this component, in logical pixels.</p>
            <p> It works similarly to <code>min-height</code> in CSS, but in React Native you
                must use logical pixel units, rather than percents, ems, or any of that.</p>
            <p>访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/min-height">https://developer.mozilla.org/en-US/docs/Web/CSS/min-height</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="minwidth"></a>minWidth <span
            class="propType">number</span> <a class="hash-link" href="#minwidth">#</a></h4>
        <div><p><code>minWidth</code> is the minimum width for this component, in logical pixels.</p>
            <p> It works similarly to <code>min-width</code> in CSS, but in React Native you
                must use logical pixel units, rather than percents, ems, or any of that.</p>
            <p>访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/min-width">https://developer.mozilla.org/en-US/docs/Web/CSS/min-width</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="overflow"></a>overflow <span class="propType">enum('visible', 'hidden', 'scroll')</span>
        <a class="hash-link" href="#overflow">#</a></h4>
        <div><p><code>overflow</code> controls how a children are measured and displayed.
            <code>overflow: hidden</code> causes views to be clipped while <code>overflow: scroll</code>
            causes views to be measured independently of their parents main axis.<code>It works like</code>overflow` in
            CSS (default: visible).访问<a href="https://developer.mozilla.org/en/docs/Web/CSS/overflow">https://developer.mozilla.org/en/docs/Web/CSS/overflow</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="padding"></a>padding <span
            class="propType">number</span> <a class="hash-link" href="#padding">#</a></h4>
        <div><p>Setting <code>padding</code> has the same effect as setting each of
            <code>paddingTop</code>, <code>paddingBottom</code>, <code>paddingLeft</code>, and <code>paddingRight</code>.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/padding">https://developer.mozilla.org/en-US/docs/Web/CSS/padding</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="paddingbottom"></a>paddingBottom <span
            class="propType">number</span> <a class="hash-link" href="#paddingbottom">#</a></h4>
        <div><p><code>paddingBottom</code> works like <code>padding-bottom</code> in CSS.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom">https://developer.mozilla.org/en-US/docs/Web/CSS/padding-bottom</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="paddinghorizontal"></a>paddingHorizontal <span
            class="propType">number</span> <a class="hash-link" href="#paddinghorizontal">#</a>
    </h4>
        <div><p>Setting <code>paddingHorizontal</code> is like setting both of
            <code>paddingLeft</code> and <code>paddingRight</code>.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="paddingleft"></a>paddingLeft <span class="propType">number</span>
        <a class="hash-link" href="#paddingleft">#</a></h4>
        <div><p><code>paddingLeft</code> works like <code>padding-left</code> in CSS.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left">https://developer.mozilla.org/en-US/docs/Web/CSS/padding-left</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="paddingright"></a>paddingRight <span
            class="propType">number</span> <a class="hash-link" href="#paddingright">#</a></h4>
        <div><p><code>paddingRight</code> works like <code>padding-right</code> in CSS.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right">https://developer.mozilla.org/en-US/docs/Web/CSS/padding-right</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="paddingtop"></a>paddingTop <span class="propType">number</span>
        <a class="hash-link" href="#paddingtop">#</a></h4>
        <div><p><code>paddingTop</code> works like <code>padding-top</code> in CSS.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top">https://developer.mozilla.org/en-US/docs/Web/CSS/padding-top</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="paddingvertical"></a>paddingVertical <span
            class="propType">number</span> <a class="hash-link" href="#paddingvertical">#</a></h4>
        <div><p>Setting <code>paddingVertical</code> is like setting both of
            <code>paddingTop</code> and <code>paddingBottom</code>.</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="position"></a>position <span class="propType">enum('absolute', 'relative')</span>
        <a class="hash-link" href="#position">#</a></h4>
        <div><p><code>position</code> in React Native is similar to regular CSS, but
            everything is set to <code>relative</code> by default, so <code>absolute</code>
            positioning is always just relative to the parent.</p>
            <p> If you want to position a child using specific numbers of logical
                pixels relative to its parent, set the child to have <code>absolute</code>
                position.</p>
            <p> If you want to position a child relative to something
                that is not its parent, just don't use styles for that. Use the
                component tree.</p>
            <p>访问<a href="https://facebook.github.io/yoga/docs/absolute-position/">https://facebook.github.io/yoga/docs/absolute-position/</a>来进一步了解<code>position</code>在React Native和CSS中的差异。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="right"></a>right <span
            class="propType">number</span> <a class="hash-link" href="#right">#</a></h4>
        <div><p><code>right</code>值是指将本组件定位到距离右边多少个逻辑像素（右边的定义取决于<code>position</code>属性）。</p>
            <p>它的表现和CSS上的<code>right</code>类似，但注意在React Native上只能使用逻辑像素值（数字单位），而不能使用百分比、em或是任何其他单位。</p>
            <p>访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/right">https://developer.mozilla.org/en-US/docs/Web/CSS/right</a>来进一步了解<code>right</code>是如何影响布局的。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="top"></a>top <span class="propType">number</span> <a
            class="hash-link" href="#top">#</a></h4>
        <div><p><code>top</code>值是指将本组件定位到距离顶部多少个逻辑像素（顶部的定义取决于<code>position</code>属性）。</p>
            <p>它的表现和CSS上的<code>top</code>类似，但注意在React Native上只能使用逻辑像素值（数字单位），而不能使用百分比、em或是任何其他单位。</p>
            <p>访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/top">https://developer.mozilla.org/en-US/docs/Web/CSS/top</a>来进一步了解<code>top</code>是如何影响布局的。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="width"></a>width <span
            class="propType">number</span> <a class="hash-link" href="#width">#</a></h4>
        <div><p><code>width</code>用于设置组件的宽度。</p>
            <p> It works similarly to <code>width</code> in CSS, but in React Native you
                must use logical pixel units, rather than percents, ems, or any of that.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/width">https://developer.mozilla.org/en-US/docs/Web/CSS/width</a>来进一步了解。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="zindex"></a>zIndex <span
            class="propType">number</span> <a class="hash-link" href="#zindex">#</a></h4>
        <div><p><code>zIndex</code> controls which components display on top of others.
            Normally, you don't use <code>zIndex</code>. Components render according to
            their order in the document tree, so later components draw over
            earlier ones. <code>zIndex</code> may be useful if you have animations or custom
            modal interfaces where you don't want this behavior.</p>
            <p> It works like the CSS <code>z-index</code> property - components with a larger
                <code>zIndex</code> will render on top. Think of the z-direction like it's
                pointing from the phone into your eyeball.访问<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/z-index">https://developer.mozilla.org/en-US/docs/Web/CSS/z-index</a>
来进一步了解。</p></div>
    </div>
</div>