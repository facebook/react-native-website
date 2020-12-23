---
id: version-0.48-datepickerios
title: DatePickerIOS
original_id: datepickerios
---

使用`DatePickerIOS`来在iOS平台上渲染一个日期/时间选择器。这是一个受约束的(Controlled)组件，所以你必须监听`onDateChange`回调函数并且及时更新`date`属性来使得组件更新，否则用户的修改会立刻被撤销来确保当前显示值和`props.date`一致。

### 截图
![](/img/components/datepickerios.png)

### 属性

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="view"></a><a href="view.html#props">View props...</a> <a class="hash-link" href="#view">#</a></h4>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="date"></a>date <span class="propType">Date</span> <a class="hash-link" href="#date">#</a></h4>
        <div>
            <p>当前被选中的日期。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="maximumdate"></a>maximumDate <span class="propType">Date</span> <a class="hash-link" href="#maximumdate">#</a></h4>
        <div>
            <p>可选的最大日期。</p>
            <p>限制可选的日期/时间范围。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="minimumdate"></a>minimumDate <span class="propType">Date</span> <a class="hash-link" href="#minimumdate">#</a></h4>
        <div>
            <p>可选的最小日期。</p>
            <p>限制可选的日期/时间范围。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="minuteinterval"></a>minuteInterval <span class="propType">enum(1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30)</span> <a class="hash-link" href="#minuteinterval">#</a></h4>
        <div>
            <p>可选的最小的分钟单位。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="mode"></a>mode <span class="propType">enum('date', 'time', 'datetime')</span> <a class="hash-link" href="#mode">#</a></h4>
        <div>
            <p>选择器模式</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="ondatechange"></a>onDateChange <span class="propType">function</span> <a class="hash-link" href="#ondatechange">#</a></h4>
        <div>
            <p>当用户修改日期或时间时调用此回调函数。</p>
            <p>唯一的参数是一个日期对象，表示新的日期和时间。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="timezoneoffsetinminutes"></a>timeZoneOffsetInMinutes <span class="propType">number</span> <a class="hash-link" href="#timezoneoffsetinminutes">#</a></h4>
        <div>
            <p>时区差，单位是分钟。</p>
            <p>默认情况下，选择器会选择设备的默认时区。通过此参数，可以指定一个时区。举个例子，要使用北京时间（东八区），可以传递8 * 60。</p>
        </div>
    </div>
</div>

### 例子

```jsx
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  DatePickerIOS,
  StyleSheet,
  Text,
  TextInput,
  View,
} = ReactNative;

var DatePickerExample = React.createClass({
  getDefaultProps: function () {
    return {
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  },

  getInitialState: function() {
    return {
      date: this.props.date,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
    };
  },

  onDateChange: function(date) {
    this.setState({date: date});
  },

  onTimezoneChange: function(event) {
    var offset = parseInt(event.nativeEvent.text, 10);
    if (isNaN(offset)) {
      return;
    }
    this.setState({timeZoneOffsetInHours: offset});
  },

  render: function() {
    // Ideally, the timezone input would be a picker rather than a
    // text input, but we don't have any pickers yet :(
    return (
      <View>
        <WithLabel label="Value:">
          <Text>{
            this.state.date.toLocaleDateString() +
            ' ' +
            this.state.date.toLocaleTimeString()
          }</Text>
        </WithLabel>
        <WithLabel label="Timezone:">
          <TextInput
            onChange={this.onTimezoneChange}
            style={styles.textinput}
            value={this.state.timeZoneOffsetInHours.toString()}
          />
          <Text> hours from UTC</Text>
        </WithLabel>
        <Heading label="Date + time picker" />
        <DatePickerIOS
          date={this.state.date}
          mode="datetime"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
        <Heading label="Date picker" />
        <DatePickerIOS
          date={this.state.date}
          mode="date"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
        />
        <Heading label="Time picker, 10-minute interval" />
        <DatePickerIOS
          date={this.state.date}
          mode="time"
          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
          onDateChange={this.onDateChange}
          minuteInterval={10}
        />
      </View>
    );
  },
});

var WithLabel = React.createClass({
  render: function() {
    return (
      <View style={styles.labelContainer}>
        <View style={styles.labelView}>
          <Text style={styles.label}>
            {this.props.label}
          </Text>
        </View>
        {this.props.children}
      </View>
    );
  }
});

var Heading = React.createClass({
  render: function() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
});

exports.displayName = (undefined: ?string);
exports.title = '<DatePickerIOS>';
exports.description = 'Select dates and times using the native UIDatePicker.';
exports.examples = [
{
  title: '<DatePickerIOS>',
  render: function(): ReactElement<any> {
    return <DatePickerExample />;
  },
}];

var styles = StyleSheet.create({
  textinput: {
    height: 26,
    width: 50,
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    padding: 4,
    fontSize: 13,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  labelView: {
    marginRight: 10,
    paddingVertical: 2,
  },
  label: {
    fontWeight: '500',
  },
  headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
  heading: {
    fontWeight: '500',
    fontSize: 14,
  },
});
```