---
id: version-0.44-headless-js-android
title: Headless JS（后台任务）
original_id: headless-js-android
---

Headless JS是一种使用js在后台执行任务的方法。它可以用来在后台同步数据、处理推送通知或是播放音乐等等。

## JS端的API

首先我们要通过`AppRegistry`来注册一个async函数，这个函数我们称之为“任务”。注册方式类似在index.js中注册RN应用：

```js
AppRegistry.registerHeadlessTask('SomeTaskName', () => require('SomeTaskName'));
```

然后创建require对应的`SomeTaskName.js`文件:

```js
module.exports = async (taskData) => {
  // 要做的事情
}
```

你可以在任务中处理任何事情（网络请求、定时器等等），但唯独**不要涉及用户界面**！在任务完成后（例如在promise中调用resolve），RN会进入一个“暂停”模式，直到有新任务需要执行或者是应用回到前台。

## Java端的API

没错，我们还需要一些原生代码，但是请放心并不麻烦。你需要像下面这样继承`HeadlessJsTaskService`，然后覆盖`getTaskConfig`方法的实现：

```java
public class MyTaskService extends HeadlessJsTaskService {

  @Override
  protected @Nullable HeadlessJsTaskConfig getTaskConfig(Intent intent) {
    Bundle extras = intent.getExtras();
    if (extras != null) {
      return new HeadlessJsTaskConfig(
          "SomeTaskName",
          Arguments.fromBundle(extras),
          5000);
    }
    return null;
  }
}
```

然后记得把服务添加到`AndroidManifest`文件里：
 
 ```
 <service android:name="com.example.MyTaskService" />
 ```


好了，现在当你[启动服务时][0]（例如一个周期性的任务或是响应一些系统事件/广播），JS任务就会开始执行。例如：

```java
Intent service = new Intent(getApplicationContext(), MyTaskService.class);
Bundle bundle = new Bundle();

bundle.putString("foo", "bar");
service.putExtras(bundle);

getApplicationContext().startService(service);
```


## 注意事项

* 默认情况下，如果应用正在前台运行时尝试执行任务，那么应用会崩溃。这是为了防止开发者在任务中处理太多逻辑而拖慢用户界面。如果你必须要这么做，那么可以设置第四个参数为`false`来更改这一限制。
* 如果你是通过`BroadcastReceiver`来启动的服务，那么谨记在从`onReceive()`返回之前要调用`HeadlessJsTaskService.acquireWakeLockNow()`。

[0]: https://developer.android.com/reference/android/content/Context.html#startService(android.content.Intent)