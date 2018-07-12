---
id: version-0.46-timepickerandroid
title: TimePickerAndroid
original_id: timepickerandroid
---

本组件会打开一个标准的Android时间选择器的对话框。

### 示例
```js
try {
  const {action, hour, minute} = await TimePickerAndroid.open({
    hour: 14,
    minute: 0,
    is24Hour: false, // 会显示为'2 PM'
  });
  if (action !== TimePickerAndroid.dismissedAction) {
    // 这里开始可以处理用户选好的时分两个参数：hour (0-23), minute (0-59)
  }
} catch ({code, message}) {
  console.warn('Cannot open time picker', message);
}
```

### 方法

<div class="props">
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="open"></a><span
            class="propType">static </span>open<span class="propType">(options: Object)</span> <a class="hash-link"
                                                                                                  href="#open">#</a>
    </h4>
        <div><p>打开一个标准的Android时间选择器的对话框。</p>
            <p>可选的<code>options</code>对象的key值如下：
            <ul>
                <li><code>hour</code> (0-23) - 要显示的小时，默认为当前时间。</li>
                <li><code>minute</code> (0-59) - 要显示的分钟，默认为当前时间。</li>
                <li><code>is24Hour</code> (boolean) - 如果设为<code>true</code>，则选择器会使用24小时制。如果设为<code>false</code>，则会额外显示AM/PM的选项。如果不设定，则采取当前地区的默认设置。</li>
            </p>
            <p>在用户选好时间后返回一个Promise，回调参数为一个对象，其中包含有<code>action</code>, <code>hour</code> (0-23),
                <code>minute</code> (0-59)。如果用户取消了对话框，Promise仍然会执行，返回的action为<code>TimePickerAndroid.dismissedAction</code>，其他几项参数则为undefined。所以请在使用其他值之前<strong>务必</strong>先检查<code>action</code>的值。</p>
    </div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="datesetaction"></a><span
            class="propType">static </span>timeSetAction<span class="propType">()</span> <a class="hash-link"
                                                                                            href="#timesetaction">#</a>
    </h4>
        <div><p>已选中一个时间。</p></div>
    </div>
    <div class="prop"><h4 class="propTitle"><a class="anchor" name="dismissedaction"></a><span
            class="propType">static </span>dismissedAction<span class="propType">()</span> <a class="hash-link"
                                                                                              href="#dismissedaction">#</a>
    </h4>
        <div><p>取消对话框。</p></div>
    </div>
</div>