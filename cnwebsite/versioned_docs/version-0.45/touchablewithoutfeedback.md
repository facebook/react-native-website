---
id: version-0.45-touchablewithoutfeedback
title: TouchableWithoutFeedback
original_id: touchablewithoutfeedback
---

除非你有一个很好的理由，否则不要用这个组件。所有能够响应触屏操作的元素在触屏后都应该有一个视觉上的反馈（然而本组件没有任何视觉反馈）。这也是为什么一个"web"应用总是显得不够"原生"的主要原因之一。

> **注意**：TouchableWithoutFeedback只支持一个子节点
>
> 如果你希望包含多个子组件，用一个View来包装它们。

### 属性

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="accessibilitycomponenttype"></a>accessibilityComponentType <span class="propType">View.AccessibilityComponentType</span> <a class="hash-link" href="#accessibilitycomponenttype">#</a></h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="accessibilitytraits"></a>accessibilityTraits <span class="propType">View.AccessibilityTraits, [View.AccessibilityTraits]</span> <a class="hash-link" href="#accessibilitytraits">#</a></h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="accessible"></a>accessible <span class="propType">bool</span> <a class="hash-link" href="#accessible">#</a></h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="delaylongpress"></a>delayLongPress <span class="propType">number</span> <a class="hash-link" href="#delaylongpress">#</a></h4>
        <div>
            <p>单位是毫秒，从onPressIn开始，到onLongPress被调用的延迟。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="delaypressin"></a>delayPressIn <span class="propType">number</span> <a class="hash-link" href="#delaypressin">#</a></h4>
        <div>
            <p>单位是毫秒，从触摸操作开始到onPressIn被调用的延迟。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="delaypressout"></a>delayPressOut <span class="propType">number</span> <a class="hash-link" href="#delaypressout">#</a></h4>
        <div>
            <p>单位是毫秒，从触摸操作结束开始到onPressOut被调用的延迟。</p>
        </div>
    </div>
    <div class="prop">
	    <h4 class="propTitle">
	    <a class="anchor" name="disabled"></a>disabled <span class="propType">bool</span> <a class="hash-link" href="touchablewithoutfeedback.html#disabled">#</a>
	    </h4>
	    <div><p>如果设为true，则禁止此组件的一切交互。</p></div>
    </div>
    <div class="prop">
	    <h4 class="propTitle">
	    <a class="anchor" name="hitslop"></a>hitSlop <span class="propType">{top: number, left: number, bottom: number, right: number}</span> <a class="hash-link" href="touchablewithoutfeedback.html#hitslop">#</a>
	    </h4>
	    <div><p>这一属性定义了按钮的外延范围。这一范围也会使<code>pressRetentionOffset</code>（见下文）变得更大。
	<strong>注意：</strong>触摸范围不会超过父视图的边界，也不会影响原先和本组件层叠的视图（保留原先的触摸优先级）。</p></div>
	</div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onlayout"></a>onLayout <span class="propType">function</span> <a class="hash-link" href="#onlayout">#</a></h4>
        <div>
            <p>当加载或者布局改变的时候被调用，参数为：</p>
            <p>  <code>{nativeEvent: {layout: {x, y, width, height}}}</code></p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onlongpress"></a>onLongPress <span class="propType">function</span> <a class="hash-link" href="#onlongpress">#</a></h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onpress"></a>onPress <span class="propType">function</span> <a class="hash-link" href="#onpress">#</a></h4>
        <div>
            <p>当触摸操作结束时调用，但如果被取消了则不调用（譬如响应者被一个滚动操作取代）</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onpressin"></a>onPressIn <span class="propType">function</span> <a class="hash-link" href="#onpressin">#</a></h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="onpressout"></a>onPressOut <span class="propType">function</span> <a class="hash-link" href="#onpressout">#</a></h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="pressretentionoffset"></a>pressRetentionOffset <span class="propType">{top: number, left: number, bottom: number, right: number}</span> <a class="hash-link" href="#pressretentionoffset">#</a></h4>
        <div>
            <p>在当前视图不能滚动的前提下指定这个属性，可以决定当手指移开多远距离之后，会不再激活按钮。但如果手指再次移回范围内，按钮会被再次激活。只要视图不能滚动，你可以来回多次这样的操作。确保你传入一个常量来减少内存分配。</p>
        </div>
    </div>
</div>
