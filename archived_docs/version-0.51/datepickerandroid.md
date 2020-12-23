---
id: version-0.51-datepickerandroid
title: DatePickerAndroid
original_id: datepickerandroid
---

本组件会打开一个标准的Android日期选择器的对话框。

### 示例
```js
try {
  const {action, year, month, day} = await DatePickerAndroid.open({
    // 要设置默认值为今天的话，使用`new Date()`即可。
    // 下面显示的会是2020年5月25日。月份是从0开始算的。
    date: new Date(2020, 4, 25)
  });
  if (action !== DatePickerAndroid.dismissedAction) {
    // 这里开始可以处理用户选好的年月日三个参数：year, month (0-11), day
  }
} catch ({code, message}) {
  console.warn('Cannot open date picker', message);
}
```

### 方法

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="open"></a><span
            class="propType">static </span>open<span class="propType">(options: Object)</span> <a class="hash-link"
                                                                                                  href="#open">#</a>
    </h4>
        <div><p>打开一个标准的Android日期选择器的对话框。</p>
            <p>可选的<code>options</code>对象的key值如下：
            <ul>
                <li><code>date</code> (<code>Date</code>对象或毫秒时间戳) - 默认显示的日期</li>
                <li><code>minDate</code> (<code>Date</code>对象或毫秒时间戳) - 可选的最小日期</li>
                <li><code>maxDate</code> (<code>Date</code>对象或毫秒时间戳) - 可选的最大日期</li>
                <li><code>mode</code> (<code>(enum('calendar', 'spinner', 'default')</code>) -  设置选择器的模式：
                    <ul>
                    <li><code>calendar</code>: Show a date picker in calendar mode.</li>
                    <li><code>spinner</code>: Show a date picker in spinner mode.</li>
                    <li><code>default</code>: Show a default native date picker(spinner/calendar) based on android versions.</li>
                    </ul>
                </li>
            </p>
            <p>在用户选好日期后返回一个Promise，回调参数为一个对象，其中包含有<code>action</code>, <code>year</code>,
                <code>month</code> (0-11),
                <code>day</code>。如果用户取消了对话框，Promise仍然会执行，返回的action为<code>DatePickerAndroid.dismissedAction</code>，其他几项参数则为undefined。所以请在使用其他值之前<strong>务必</strong>先检查<code>action</code>的值。</p>
    </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="datesetaction"></a><span
            class="propType">static </span>dateSetAction<span class="propType">()</span> <a class="hash-link"
                                                                                            href="#datesetaction">#</a>
    </h4>
        <div><p>已选中一个日期。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="dismissedaction"></a><span
            class="propType">static </span>dismissedAction<span class="propType">()</span> <a class="hash-link"
                                                                                              href="#dismissedaction">#</a>
    </h4>
        <div><p>取消对话框。</p></div>
    </div>
</div>