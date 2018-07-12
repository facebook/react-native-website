---
id: version-0.50-checkbox
title: CheckBox
original_id: checkbox
---

Renders a boolean input.

This is a controlled component that requires an `onValueChange` callback that updates the `value` prop in order for the component to reflect user actions. If the `value` prop is not updated, the component will continue to render the supplied `value prop instead of the expected result of any user actions.

@keyword checkbox @keyword toggle


### 属性
<div class="props">
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="viewproptypes"></a><a
    href="viewproptypes.html#props">ViewPropTypes props...</a> <a class="hash-link" href="#viewproptypes">#</a>
  </h4></div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="disabled"></a>disabled?: <span
    class="propType">bool</span> <a class="hash-link" href="#disabled">#</a></h4>
    <div><p>If true the user won't be able to toggle the checkbox.
      Default value is false.</p></div>
  </div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="onchange"></a>onChange?: <span class="propType">function</span>
    <a class="hash-link" href="#onchange">#</a></h4>
    <div><p>Used in case the props change removes the component.</p></div>
  </div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="onvaluechange"></a>onValueChange?: <span
    class="propType">function</span> <a class="hash-link" href="#onvaluechange">#</a></h4>
    <div><p>Invoked with the new value when the value changes.</p></div>
  </div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="testid"></a>testID?: <span
    class="propType">string</span> <a class="hash-link" href="#testid">#</a></h4>
    <div><p>Used to locate this view in end-to-end tests.</p></div>
  </div>
  <div class="prop"><h4 class="propTitle"><a class="anchor" name="value"></a>value?: <span class="propType">bool</span>
    <a class="hash-link" href="#value">#</a></h4>
    <div><p>The value of the checkbox. If true the checkbox will be turned on.
      Default value is false.</p></div>
  </div>
</div>
