---
id: version-0.57-native-modules-android
title: 原生模块
original_id: native-modules-android
---
##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(100.00%)

有时候 App 需要访问平台 API，但 React Native 可能还没有相应的模块包装；或者你需要复用一些 Java 代码，而不是用 Javascript 重新实现一遍；又或者你需要实现某些高性能的、多线程的代码，譬如图片处理、数据库、或者各种高级扩展等等。

我们把 React Native 设计为可以在其基础上编写真正的原生代码，并且可以访问平台所有的能力。这是一个相对高级的特性，我们并不认为它应当在日常开发的过程中经常出现，但具备这样的能力是很重要的。如果 React Native 还不支持某个你需要的原生特性，你应当可以自己实现该特性的封装。

## Native Module Setup

Native modules are usually distributed as npm packages, apart from the typical javascript files and resources they will contain an Android library project. This project is, from NPM's perspective just like any other media asset, meaning there isn't anything special about it from this point of view. To get the basic scaffolding make sure to read [Native Modules Setup](native-modules-setup) guide first.

### 开启 Gradle Daemon

我们建议开启[Gradle Daemon](https://docs.gradle.org/2.9/userguide/gradle_daemon.html)来加速 Java 代码编译。

## Toast 模块

本向导会用[Toast](http://developer.android.com/reference/android/widget/Toast.html)作为例子。假设我们希望可以从 Javascript 发起一个 Toast 消息（一种会在屏幕下方弹出、保持一段时间的消息通知）。

我们首先来创建一个原生模块。一个原生模块是一个继承了`ReactContextBaseJavaModule`的 Java 类，它可以实现一些 JavaScript 所需的功能。我们这里的目标是可以在 JavaScript 里写`ToastExample.show('Awesome', ToastExample.SHORT);`，来调起一个短暂的 Toast 通知。

创建一个新的 Java 类并命名为`ToastModule.java`，放置到`android/app/src/main/java/com/your-app-name/`目录下，其具体代码如下：

```java
// ToastModule.java

package com.your-app-name;

import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public ToastModule(ReactApplicationContext reactContext) {
    super(reactContext);
  }
}
```

`ReactContextBaseJavaModule`要求派生类实现`getName`方法。这个函数用于返回一个字符串名字，这个名字在 JavaScript 端标记这个模块。这里我们把这个模块叫做`ToastExample`，这样就可以在 JavaScript 中通过`NativeModules.ToastExample`访问到这个模块。**译注：RN 已经内置了一个名为 ToastAndroid 的模块，所以在练习时请勿使用 ToastAndroid 的名字，否则运行时会报错名字冲突！**

```java
  @Override
  public String getName() {
    return "ToastExample";
  }
```

一个可选的方法`getContants`返回了需要导出给 JavaScript 使用的常量。它并不一定需要实现，但在定义一些可以被 JavaScript 同步访问到的预定义的值时非常有用。

```java
  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }
```

要导出一个方法给 JavaScript 使用，Java 方法需要使用注解`@ReactMethod`。方法的返回类型必须为`void`。React Native 的跨语言访问是异步进行的，所以想要给 JavaScript 返回一个值的唯一办法是使用回调函数或者发送事件（参见下文的描述）。

```java
  @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }
```

### 参数类型

下面的参数类型在`@ReactMethod`注明的方法中，会被直接映射到它们对应的 JavaScript 类型。

```
Boolean -> Bool
Integer -> Number
Double -> Number
Float -> Number
String -> String
Callback -> function
ReadableMap -> Object
ReadableArray -> Array
```

参阅[ReadableMap](https://github.com/facebook/react-native/blob/master/ReactAndroid/src/main/java/com/facebook/react/bridge/ReadableMap.java)和[ReadableArray](https://github.com/facebook/react-native/blob/master/ReactAndroid/src/main/java/com/facebook/react/bridge/ReadableArray.java)。

### 注册模块

在 Java 这边要做的最后一件事就是注册这个模块。我们需要在应用的 Package 类的`createNativeModules`方法中添加这个模块。如果模块没有被注册，它也无法在 JavaScript 中被访问到。

创建一个新的 Java 类并命名为`CustomToastPackage.java`，放置到`android/app/src/main/java/com/your-app-name/`目录下，其具体代码如下：

```java
// CustomToastPackage.java

package com.your-app-name;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class CustomToastPackage implements ReactPackage {

  @Override
  public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.emptyList();
  }

  @Override
  public List<NativeModule> createNativeModules(
                              ReactApplicationContext reactContext) {
    List<NativeModule> modules = new ArrayList<>();

    modules.add(new ToastModule(reactContext));

    return modules;
  }

}
```

这个 package 需要在`MainApplication.java`文件的`getPackages`方法中提供。这个文件位于你的 react-native 应用文件夹的 android 目录中。具体路径是: `android/app/src/main/java/com/your-app-name/MainApplication.java`.

```java
// MainApplication.java
...
import com.your-app-name.CustomToastPackage; // <-- 引入你自己的包
...
protected List<ReactPackage> getPackages() {
    return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new CustomToastPackage()); // <-- 添加这一行，类名替换成你的Package类的名字.
}
```

为了让你的功能从 JavaScript 端访问起来更为方便，通常我们都会把原生模块封装成一个 JavaScript 模块。这不是必须的，但省下了每次都从`NativeModules`中获取对应模块的步骤。这个 JS 文件也可以用于添加一些其他 JavaScript 端实现的功能。

```javascript
// ToastExample.js
/**
 * This exposes the native ToastExample module as a JS module. This has a
 * function 'show' which takes the following parameters:
 *
 * 1. String message: A string with the text to toast
 * 2. int duration: The duration of the toast. May be ToastExample.SHORT or
 *    ToastExample.LONG
 */
import { NativeModules } from "react-native";
// 下一句中的ToastExample即对应上文
// public String getName()中返回的字符串
module.exports = NativeModules.ToastExample;
```

现在，在别处的 JavaScript 代码中可以这样调用你的方法：

```javascript
import ToastExample from "./ToastExample";

ToastExample.show("Awesome", ToastExample.SHORT);
```

## 更多特性

### 回调函数

原生模块还支持一种特殊的参数——回调函数。它提供了一个函数来把返回值传回给 JavaScript。

```java
import com.facebook.react.bridge.Callback;

public class UIManagerModule extends ReactContextBaseJavaModule {

...

  @ReactMethod
  public void measureLayout(
      int tag,
      int ancestorTag,
      Callback errorCallback,
      Callback successCallback) {
    try {
      measureLayout(tag, ancestorTag, mMeasureBuffer);
      float relativeX = PixelUtil.toDIPFromPixel(mMeasureBuffer[0]);
      float relativeY = PixelUtil.toDIPFromPixel(mMeasureBuffer[1]);
      float width = PixelUtil.toDIPFromPixel(mMeasureBuffer[2]);
      float height = PixelUtil.toDIPFromPixel(mMeasureBuffer[3]);
      successCallback.invoke(relativeX, relativeY, width, height);
    } catch (IllegalViewOperationException e) {
      errorCallback.invoke(e.getMessage());
    }
  }

...
```

这个函数可以在 JavaScript 里这样使用：

```javascript
UIManager.measureLayout(
  100,
  100,
  msg => {
    console.log(msg);
  },
  (x, y, width, height) => {
    console.log(x + ":" + y + ":" + width + ":" + height);
  }
);
```

原生模块通常只应调用回调函数一次。但是，它可以保存 callback 并在将来调用。

请务必注意 callback 并非在对应的原生函数返回后立即被执行——注意跨语言通讯是异步的，这个执行过程会通过消息循环来进行。

### Promises

Promises

**译注**：这一部分涉及到较新的 js 语法和特性，不熟悉的读者建议先阅读 ES6 的相关书籍和文档。

原生模块还可以使用 promise 来简化代码，搭配 ES2016(ES7)标准的`async/await`语法则效果更佳。如果桥接原生方法的最后一个参数是一个`Promise`，则对应的 JS 方法就会返回一个 Promise 对象。

我们把上面的代码用 promise 来代替回调进行重构：

```java
import com.facebook.react.bridge.Promise;

public class UIManagerModule extends ReactContextBaseJavaModule {

...
  private static final String E_LAYOUT_ERROR = "E_LAYOUT_ERROR";
  @ReactMethod
  public void measureLayout(
      int tag,
      int ancestorTag,
      Promise promise) {
    try {
      measureLayout(tag, ancestorTag, mMeasureBuffer);

      WritableMap map = Arguments.createMap();

      map.putDouble("relativeX", PixelUtil.toDIPFromPixel(mMeasureBuffer[0]));
      map.putDouble("relativeY", PixelUtil.toDIPFromPixel(mMeasureBuffer[1]));
      map.putDouble("width", PixelUtil.toDIPFromPixel(mMeasureBuffer[2]));
      map.putDouble("height", PixelUtil.toDIPFromPixel(mMeasureBuffer[3]));

      promise.resolve(map);
    } catch (IllegalViewOperationException e) {
      promise.reject(E_LAYOUT_ERROR, e);
    }
  }

...
```

现在 JavaScript 端的方法会返回一个 Promise。这样你就可以在一个声明了`async`的异步函数内使用`await`关键字来调用，并等待其结果返回。（虽然这样写着看起来像同步操作，但实际仍然是异步的，并不会阻塞执行来等待）。

```javascript
async function measureLayout() {
  try {
    var { relativeX, relativeY, width, height } = await UIManager.measureLayout(
      100,
      100
    );

    console.log(relativeX + ":" + relativeY + ":" + width + ":" + height);
  } catch (e) {
    console.error(e);
  }
}

measureLayout();
```

### 多线程

原生模块不应对自己被调用时所处的线程做任何假设，当前的状况有可能会在将来的版本中改变。如果一个过程要阻塞执行一段时间，这个工作应当分配到一个内部管理的工作线程，然后从那边可以调用任意的回调函数。_译注_：我们通常用 AsyncTask 来完成这项工作。

### 发送事件到 JavaScript

原生模块可以在没有被调用的情况下往 JavaScript 发送事件通知。最简单的办法就是通过`RCTDeviceEventEmitter`，这可以通过`ReactContext`来获得对应的引用，像这样：

```java
...
private void sendEvent(ReactContext reactContext,
                       String eventName,
                       @Nullable WritableMap params) {
  reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
}
...
WritableMap params = Arguments.createMap();
...
sendEvent(reactContext, "keyboardWillShow", params);
```

JavaScript 模块可以通过使用`DeviceEventEmitter`模块来监听事件：

```javascript
import { DeviceEventEmitter } from 'react-native';

// ...
componentWillMount() {
  DeviceEventEmitter.addListener('keyboardWillShow', (e: Event) => {
    // handle event.
  });
}
```

### 从`startActivityForResult`中获取结果

如果你使用`startActivityForResult`调起了一个 activity 并想从其中获取返回结果，那么你需要监听`onActivityResult`事件。具体的做法是继承`BaseActivityEventListener`或是实现`ActivityEventListener`。我们推荐前一种做法，因为它相对来说不太会受到 API 变更的影响。然后你需要在模块的构造函数中注册这一监听事件。

```java
reactContext.addActivityEventListener(mActivityResultListener);
```

现在你可以通过重写下面的方法来实现对`onActivityResult`的监听：

```java
@Override
public void onActivityResult(
  final Activity activity,
  final int requestCode,
  final int resultCode,
  final Intent intent) {
  // 在这里实现你自己的逻辑
}
```

下面我们写一个简单的图片选择器来实践一下。这个图片选择器会把`pickImage`方法暴露给 JavaScript，而这个方法在调用时就会把图片的路径返回到 JS 端。

```java
public class ImagePickerModule extends ReactContextBaseJavaModule {

  private static final int IMAGE_PICKER_REQUEST = 467081;
  private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
  private static final String E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
  private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
  private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";

  private Promise mPickerPromise;

  private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
      if (requestCode == IMAGE_PICKER_REQUEST) {
        if (mPickerPromise != null) {
          if (resultCode == Activity.RESULT_CANCELED) {
            mPickerPromise.reject(E_PICKER_CANCELLED, "Image picker was cancelled");
          } else if (resultCode == Activity.RESULT_OK) {
            Uri uri = intent.getData();

            if (uri == null) {
              mPickerPromise.reject(E_NO_IMAGE_DATA_FOUND, "No image data found");
            } else {
              mPickerPromise.resolve(uri.toString());
            }
          }

          mPickerPromise = null;
        }
      }
    }
  };

  public ImagePickerModule(ReactApplicationContext reactContext) {
    super(reactContext);

    // Add the listener for `onActivityResult`
    reactContext.addActivityEventListener(mActivityEventListener);
  }

  @Override
  public String getName() {
    return "ImagePickerModule";
  }

  @ReactMethod
  public void pickImage(final Promise promise) {
    Activity currentActivity = getCurrentActivity();

    if (currentActivity == null) {
      promise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
      return;
    }

    // Store the promise to resolve/reject when picker returns data
    mPickerPromise = promise;

    try {
      final Intent galleryIntent = new Intent(Intent.ACTION_PICK);

      galleryIntent.setType("image/*");

      final Intent chooserIntent = Intent.createChooser(galleryIntent, "Pick an image");

      currentActivity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST);
    } catch (Exception e) {
      mPickerPromise.reject(E_FAILED_TO_SHOW_PICKER, e);
      mPickerPromise = null;
    }
  }
}
```

### 监听生命周期事件

监听 activity 的生命周期事件（比如`onResume`, `onPause`等等）和我们在前面实现 `ActivityEventListener`的做法类似。模块必须实现`LifecycleEventListener`，然后需要在构造函数中注册一个监听函数：

```java
reactContext.addLifecycleEventListener(this);
```

现在你可以通过实现下列方法来监听 activity 的生命周期事件了：

```java
@Override
public void onHostResume() {
    // Activity `onResume`
}

@Override
public void onHostPause() {
    // Activity `onPause`
}

@Override
public void onHostDestroy() {
    // Activity `onDestroy`
}
```
