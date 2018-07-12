---
id: version-0.50-pushnotificationios
title: PushNotificationIOS
original_id: pushnotificationios
---

本模块帮助你处理应用的推送通知，包括权限控制以及应用图标上的角标数（未读消息数）。

要使用推送通知功能，首先[在苹果后台配置推送通知服务](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/AddingCapabilities/AddingCapabilities.html#//apple_ref/doc/uid/TP40012582-CH26-SW6)并且准备好服务端的系统。设置的过程可以参考[Parse的教程](https://parse.com/tutorials/ios-push-notifications)

首先请[手动链接](linking-libraries-ios.html)PushNotificationIOS的库（以下操作如果不熟悉，请自行补习Xcode的使用教程）：  
- 将`node_modules/react-native/Libraries/PushNotificationIOS/RCTPushNotification.xcodeproj`文件拖到Xcode界面中
- 在Xcode的`Link Binary With Libraries`中添加`libRCTPushNotification.a`

然后你需要在AppDelegate中启用推送通知的支持以及注册相应的事件。

在`AppDelegate.m`开头：

```objective-c
#import <React/RCTPushNotificationManager.h>
```

然后在AppDelegate实现中添加如下的代码：

```objective-c
   // Required to register for notifications
   - (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings
   {
    [RCTPushNotificationManager didRegisterUserNotificationSettings:notificationSettings];
   }
   // Required for the register event.
   - (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
   {
    [RCTPushNotificationManager didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
   }
   // Required for the notification event.
   - (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)notification
   {
    [RCTPushNotificationManager didReceiveRemoteNotification:notification];
   }
   // Required for the localNotification event.
   - (void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification
   {
    [RCTPushNotificationManager didReceiveLocalNotification:notification];
   }
```

### 方法

<div class="props">
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="presentlocalnotification"></a><span class="propType">static </span>presentLocalNotification<span class="propType">(details: Object)</span> <a class="hash-link" href="#presentlocalnotification">#</a></h4>
		<div>
			<p>立即产生一个本地通知</p>
			<p>details参数是一个对象，包含：</p>
			<ul>
				<li><code>alertBody</code> : 要在通知提示中显示的消息。</li>
				<li><code>alertAction</code> : 在交互式通知提示下显示的"action"。默认为"view"。</li>
				<li><code>soundName</code> : 通知触发时播放的声音名字（可选）。</li>
				<li><code>category </code> : 可选的通知类型，但对于交互式通知为必填。</li>
				<li><code>userInfo </code> : 提供一个可选的object，可以在其中提供额外的数据。</li>
				<li><code>applicationIconBadgeNumber </code> : 指定显示在应用右上角的数字角标（可选）。默认值为0，即不显示角标。</li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="schedulelocalnotification"></a><span class="propType">static </span>scheduleLocalNotification<span class="propType">(details: Object)</span> <a class="hash-link" href="#schedulelocalnotification">#</a></h4>
		<div>
			<p>计划一个本地通知，在将来进行提示。</p>
			<p>details参数是一个对象，包含：</p>
			<ul>
				<li><code>fireDate</code> : 系统发送这个提示的日期和时间。</li>
				<li><code>alertBody</code> : 要在通知提示中显示的消息。</li>
				<li><code>alertAction</code> : 在交互式通知提示下显示的"action"。默认为"view"。</li>
				<li><code>soundName</code> : 通知触发时播放的声音名字（可选）。</li>
				<li><code>category </code> : 可选的通知类型，但对于交互式通知为必填。</li>
				<li><code>userInfo </code> : 提供一个可选的object，可以在其中提供额外的数据。</li>
				<li><code>applicationIconBadgeNumber </code> : 指定显示在应用右上角的数字角标（可选）。默认值为0，即不显示角标。</li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="cancelalllocalnotifications"></a><span class="propType">static </span>cancelAllLocalNotifications<span class="propType">()</span> <a class="hash-link" href="#cancelalllocalnotifications">#</a></h4>
		<div>
			<p>取消所有已计划的本地通知</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="setapplicationiconbadgenumber"></a><span class="propType">static </span>setApplicationIconBadgeNumber<span class="propType">(number: number)</span> <a class="hash-link" href="#setapplicationiconbadgenumber">#</a></h4>
		<div>
			<p>设置要在手机主屏幕应用图标上显示的角标数（未读消息数）。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getapplicationiconbadgenumber"></a><span class="propType">static </span>getApplicationIconBadgeNumber<span class="propType">(callback: Function)</span> <a class="hash-link" href="#getapplicationiconbadgenumber">#</a></h4>
		<div>
			<p>获取目前在手机主屏幕应用图标上显示的角标数（未读消息数）。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="addeventlistener"></a><span class="propType">static </span>addEventListener<span class="propType">(type: string, handler: Function)</span> <a class="hash-link" href="#addeventlistener">#</a></h4>
		<div>
			<p>添加一个监听器，监听远程或本地推送的通知事件，不论应用在前台还是在后台运行</p>
			<p>事件类型有：</p>
			<ul>
				<li><code>notification</code> : 当收到来自远程的推送通知时调用handler函数，第一个参数是一个<code>PushNotificationIOS</code>实例。</li>
				<li><code>localNotification</code> : 当收到来自本地的推送通知时调用handler函数，第一个参数是一个<code>PushNotificationIOS</code>实例。</li>
				<li><code>register</code>: 当用户注册远程通知的时候调用handler函数。参数是一个十六进制的字符串，表示了设备标识(deviceToken)。</li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="requestpermissions"></a><span class="propType">static </span>requestPermissions<span class="propType">(permissions?: {
    alert?: boolean,
    badge?: boolean,
    sound?: boolean
  })</span> <a class="hash-link" href="#requestpermissions">#</a></h4>
  		<div>
  			<p>向iOS系统请求通知权限，给用户展示一个对话框。默认情况下，它会请求所有的权限。不过你可以通过传递一个映射(map)到permissions参数来请求指定的权限子集。可以请求的权限类型有：</p>
			<ul>
				<li><code>alert</code></li>
				<li><code>badge</code></li>
				<li><code>sound</code></li>
			</ul>
			<p>如果提供了一个映射(map)作为参数，只有值为真值的权限才会被请求。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="abandonpermissions"></a><span class="propType">static </span>abandonPermissions<span class="propType">()</span> <a class="hash-link" href="#abandonpermissions">#</a></h4>
		<div>
			<p>注销所有从苹果推送通知服务收到的远程消息。</p>
			<p>你应该只会在极少的情况下需要调用此函数，譬如一个新版本的App要取消所有远程推送通知的支持。如果是用户希望关闭推送通知，他可以打开系统设置的推送通知一栏来暂时屏蔽。应用通过此方法注销后，可以随时重新注册。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="checkpermissions"></a><span class="propType">static </span>checkPermissions<span class="propType">(callback: Function)</span> <a class="hash-link" href="#checkpermissions">#</a></h4>
		<div>
			<p>检查哪些推送通知权限被开启。 <code>callback</code>函数会被调用，参数为<code>permissions</code> 对象:</p>
			<ul>
				<li><code>alert</code> :boolean</li>
				<li><code>badge</code> :boolean</li>
				<li><code>sound</code> :boolean</li>
			</ul>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="removeeventlistener"></a><span class="propType">static </span>removeEventListener<span class="propType">(type: string, handler: Function)</span> <a class="hash-link" href="#removeeventlistener">#</a></h4>
		<div><p>移除注册事件监听器。在<code>componentWillUnmount</code>中调用此函数以避免内存泄露。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getinitialnotification"></a><span class="propType">static </span>getInitialNotification<span class="propType">()</span> <a class="hash-link" href="#getinitialnotification">#</a></h4>
		<div>
			<p>如果用户通过点击推送通知来冷启动应用（即：之前应用不在运行状态），此函数会返回一个初始的通知。</p>
			<p>第一次调用<code>getInitialNotification</code>会返回初始的通知对象，或者返回<code>null</code>。后续的调用全部会返回null.</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="constructor"></a>constructor<span class="propType">(nativeNotif: Object)</span> <a class="hash-link" href="#constructor">#</a></h4>
		<div><p>你应该永远不需要自己实例化<code>PushNotificationIOS</code>对象。监听<code>notification</code>事件和调用<code>popInitialNotification</code>应当足够了。</p>
		</div>
	</div>
	<div class="prop">
	<h4 class="methodTitle"><a class="anchor" name="finish"></a>finish<span class="methodType">(fetchResult)</span> <a class="hash-link" href="docs/pushnotificationios.html#finish">#</a></h4>
	<div>
		<p>This method is available for remote notifications that have been received via:
		<code>application:didReceiveRemoteNotification:fetchCompletionHandler:</code>
		<a href="https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplicationDelegate_Protocol/#//apple_ref/occ/intfm/UIApplicationDelegate/application:didReceiveRemoteNotification:fetchCompletionHandler">https://developer.apple.com/library/ios/documentation/UIKit/Reference/UIApplicationDelegate_Protocol/#//apple_ref/occ/intfm/UIApplicationDelegate/application:didReceiveRemoteNotification:fetchCompletionHandler</a>:
		</p>
		<p>Call this to execute when the remote notification handling is complete. When calling this block, pass in the fetch result value that best describes the results of your operation. You <em>must</em> call this handler and should do so as soon as possible. For a list of possible values, see <code>PushNotificationIOS.FetchResult</code>.</p><p>If you do not call this method your background remote notifications could be throttled, to read more about it see the above documentation link.</p>
	</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getmessage"></a>getMessage<span class="propType">()</span> <a class="hash-link" href="#getmessage">#</a></h4>
		<div>
			<p><code>getAlert</code>方法的别名。获取推送通知的主消息内容。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getsound"></a>getSound<span class="propType">()</span> <a class="hash-link" href="#getsound">#</a></h4>
		<div>
			<p>从<code>aps</code>对象中获取声音字符串</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getalert"></a>getAlert<span class="propType">()</span> <a class="hash-link" href="#getalert">#</a></h4>
		<div>
			<p>从<code>aps</code>对象中获取推送通知的主消息内容。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getbadgecount"></a>getBadgeCount<span class="propType">()</span> <a class="hash-link" href="#getbadgecount">#</a></h4>
		<div>
			<p>从<code>aps</code>对象中获取推送通知的角标数（未读消息数）。</p>
		</div>
	</div>
	<div class="prop">
		<h4 class="propTitle"><a class="anchor" name="getdata"></a>getData<span class="propType">()</span> <a class="hash-link" href="#getdata">#</a></h4>
		<div>
			<p>获取推送的数据对象。</p>
		</div>
	</div>
</div>

### 例子

```javascript
'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
  AlertIOS,
  PushNotificationIOS,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} = ReactNative;

var Button = React.createClass({
  render: function() {
    return (
      <TouchableHighlight
        underlayColor={'white'}
        style={styles.button}
        onPress={this.props.onPress}>
        <Text style={styles.buttonLabel}>
          {this.props.label}
        </Text>
      </TouchableHighlight>
    );
  }
});

class NotificationExample extends React.Component {
  componentWillMount() {
    // Add listener for push notifications
    PushNotificationIOS.addEventListener('notification', this._onNotification);
    // Add listener for local notifications
    PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);
  }

  componentWillUnmount() {
    // Remove listener for push notifications
    PushNotificationIOS.removeEventListener('notification', this._onNotification);
    // Remove listener for local notifications
    PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification);
  }

  render() {
    return (
      <View>
        <Button
          onPress={this._sendNotification}
          label="Send fake notification"
        />

        <Button
          onPress={this._sendLocalNotification}
          label="Send fake local notification"
        />
      </View>
    );
  }

  _sendNotification() {
    require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
      aps: {
        alert: 'Sample notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE'
      },
    });
  }

  _sendLocalNotification() {
    require('RCTDeviceEventEmitter').emit('localNotificationReceived', {
      aps: {
        alert: 'Sample local notification',
        badge: '+1',
        sound: 'default',
        category: 'REACT_NATIVE'
      },
    });
  }

  _onNotification(notification) {
    AlertIOS.alert(
      'Push Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }

  _onLocalNotification(notification){
    AlertIOS.alert(
      'Local Notification Received',
      'Alert message: ' + notification.getMessage(),
      [{
        text: 'Dismiss',
        onPress: null,
      }]
    );
  }
}

class NotificationPermissionExample extends React.Component {
  state: any;

  constructor(props) {
    super(props);
    this.state = {permissions: null};
  }

  render() {
    return (
      <View>
        <Button
          onPress={this._showPermissions.bind(this)}
          label="Show enabled permissions"
        />
        <Text>
          {JSON.stringify(this.state.permissions)}
        </Text>
      </View>
    );
  }

  _showPermissions() {
    PushNotificationIOS.checkPermissions((permissions) => {
      this.setState({permissions});
    });
  }
}

var styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    color: 'blue',
  },
});

exports.title = 'PushNotificationIOS';
exports.description = 'Apple PushNotification and badge value';
exports.examples = [
{
  title: 'Badge Number',
  render(): ReactElement<any> {
    PushNotificationIOS.requestPermissions();

    return (
      <View>
        <Button
          onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(42)}
          label="Set app's icon badge to 42"
        />
        <Button
          onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(0)}
          label="Clear app's icon badge"
        />
      </View>
    );
  },
},
{
  title: 'Push Notifications',
  render(): ReactElement<any> {
    return <NotificationExample />;
  }
},
{
  title: 'Notifications Permissions',
  render(): ReactElement<any> {
    return <NotificationPermissionExample />;
  }
}];
```
