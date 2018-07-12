---
id: version-0.51-checkbox
title: CheckBox
original_id: checkbox
---

渲染一个Boolean输入

这是一个“受控组件”（controlled component）。你必须使用onValueChange回调来更新value属性以响应用户的操作。如果不更新value属性，组件只会按一开始给定的value值来渲染且保持不变。

注意:CheckBox只在Android端实现，IOS端暂未实现

@keyword checkbox @keyword toggle


### 属性
<div class="props">
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="viewproptypes"></a><a
    href="viewproptypes.html#props">ViewPropTypes props...</a> <a class="hash-link" href="#viewproptypes">#</a>
  </h4></div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="disabled"></a>disabled?: <span
    class="propType">bool</span> <a class="hash-link" href="#disabled">#</a></h4>
    <div><p>如果为true，这个组件不能进行交互,默认为false</p></div>
  </div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="onchange"></a>onChange?: <span class="propType">function</span>
    <a class="hash-link" href="#onchange">#</a></h4>
    <div><p>Used in case the props change removes the component.</p></div>
  </div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="onvaluechange"></a>onValueChange?: <span
    class="propType">function</span> <a class="hash-link" href="#onvaluechange">#</a></h4>
    <div><p>当值改变的时候调用此回调函数，参数为新的值。</p></div>
  </div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="testid"></a>testID?: <span
    class="propType">string</span> <a class="hash-link" href="#testid">#</a></h4>
    <div><p>用来在端到端测试中定位此视图。</p></div>
  </div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="value"></a>value?: <span class="propType">bool</span>
    <a class="hash-link" href="#value">#</a></h4>
    <div><p>表示CheckBox是否打开。默认为false（关闭状态）。</p></div>
  </div>
</div>
