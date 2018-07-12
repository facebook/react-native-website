---
id: version-0.41-linking
title: Linking
original_id: linking
---

`Linking`提供了一个通用的接口来与传入和传出的App链接进行交互。

### 基本用法

#### 处理链接

如果你的应用被其注册过的外部url调起，则可以在任何组件内这样获取和处理它：

```javascript
componentDidMount() {
  var url = Linking.getInitialURL().then(url) => {
    if (url) {
      console.log('Initial url is: ' + url);
    }
  }).catch(err => console.error('An error occurred', err));
}
```
注：要了解更多如何在Android上支持深度链接的说明，请参阅[Enabling Deep Links for App Content - Add Intent Filters for Your Deep Links](http://developer.android.com/training/app-indexing/deep-linking.html#adding-filters)。  

如果要在现有的MainActivity中监听传入的intent，那么需要在`AndroidManifest.xml`中将MainActivity的`launchMode`设置为`singleTask`。相关解释可参考[`<activity>`](http://developer.android.com/guide/topics/manifest/activity-element.html)文档。

```xml
<activity
 android:name=".MainActivity"
 android:launchMode="singleTask">
```

对于iOS来说，如果要在App启动后也监听传入的App链接，那么首先需要在项目中链接`RCTLinking`，具体步骤请参考[使用链接库](linking-libraries-ios.html)这篇文档，然后需要在`AppDelegate.m`中增加以下代码：

```objective-c
#import <React/RCTLinkingManager.h>

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
   sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
 {
   return [RCTLinkingManager application:application openURL:url
                       sourceApplication:sourceApplication annotation:annotation];
 }

// Only if your app is using [Universal Links](https://developer.apple.com/library/prerelease/ios/documentation/General/Conceptual/AppSearch/UniversalLinks.html).
- (BOOL)application:(UIApplication *)application continueUserActivity:(NSUserActivity *)userActivity
  restorationHandler:(void (^)(NSArray * _Nullable))restorationHandler
 {
  return [RCTLinkingManager application:application
                   continueUserActivity:userActivity
                     restorationHandler:restorationHandler];
 }
```

然后你的React组件就可以监听`Linking`的相关事件：

```javascript
componentDidMount() {
  Linking.addEventListener('url', this._handleOpenURL);
},
componentWillUnmount() {
  Linking.removeEventListener('url', this._handleOpenURL);
},
_handleOpenURL(event) {
  console.log(event.url);
}
```


#### 打开外部链接

要启动一个链接相对应的应用（打开浏览器、邮箱或者其它的应用），只需调用：

```javascript
Linking.openURL(url).catch(err => console.error('An error occurred', err));
```
如果想在打开链接前先检查是否安装了对应的应用，则调用以下方法：

```javascript
Linking.canOpenURL(url).then(supported => {
  if (!supported) {
    console.log('Can\'t handle url: ' + url);
  } else {
    return Linking.openURL(url);
  }
}).catch(err => console.error('An error occurred', err));
```

### 方法

<div class="props">
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="addeventlistener"></a><span class="propType">static </span>addEventListener<span class="propType">(type: string, handler: Function)</span> <a class="hash-link" href="#addeventlistener">#</a></h4>
        <div>
            <p>添加一个监听Linking变化的事件。type参数应填<code>`url`</code>，并提供一个处理函数。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="removeeventlistener"></a><span class="propType">static </span>removeEventListener<span class="propType">(type: string, handler: Function)</span> <a class="hash-link" href="#removeeventlistener">#</a></h4>
        <div>
            <p>删除一个事件处理函数。type参数应填<code>`url`</code>。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="openurl"></a><span class="propType">static </span>openURL<span class="propType">(url: string)</span> <a class="hash-link" href="#openurl">#</a></h4>
        <div>
            <p>尝试使用设备上已经安装的应用打开指定的<code>url</code>。</p>
            <p>你还可以使用其他类型的URL，比如一个地理位置（形如"geo:37.484847,-122.148386"或是一个通讯录名片，只要是可以通过{@code Intent.ACTION_VIEW}打开的即可。</p>
            <p>注：如果系统不知道如何处理给定的URL，则此方法会调用失败。如果你传入的URL不是一个http链接，则最好先通过{@code canOpenURL}方法检查一下。</p>
            <p>注：对于web链接来说，协议头("http://", "https://")不能省略！</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="canopenurl"></a><span class="propType">static </span>canOpenURL<span class="propType">(url: string, callback: Function)</span> <a class="hash-link" href="#canopenurl">#</a></h4>
        <div>
            <p>判断设备上是否有已经安装的应用可以处理指定的URL。回调函数的参数只有一个：<code>bool supported</code></p>
            <p>注：对于web链接来说，协议头("http://", "https://")不能省略！</p>
            <p>注：对于iOS 9以上版本，你还需要在<code>Info.plist</code>中添加<code>LSApplicationQueriesSchemes</code>字段。</p>
        </div>
    </div>
    <div class="prop">
        <h4 class="propTitle"><a class="anchor" name="getinitialurl"></a><span class="propType">static </span>getInitialURL<span class="propType">()</span> <a class="hash-link" href="#getinitialurl">#</a></h4>
        <div>
            <p>如果应用是被一个链接调起的，则会返回相应的链接地址。否则它会返回<code>null</code>。</p>
            <p>注：如果要在Android上支持深度链接，请参阅<a href="http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents">http://developer.android.com/training/app-indexing/deep-linking.html#handling-intents</a></p>
        </div>
    </div>
</div>
