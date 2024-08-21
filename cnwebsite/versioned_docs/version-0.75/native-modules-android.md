---
id: native-modules-android
title: Android 原生模块
---

import NativeDeprecated from './the-new-architecture/\_markdown_native_deprecation.mdx'
import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

<NativeDeprecated />

欢迎来到 Android 的原生模块。请先阅读 [原生模块简介](native-modules-intro) 以了解原生模块的基本概念。

## 创建一个 Calendar 原生模块

在以下指南中，你将创建一个名为 `CalendarModule` 的原生模块，它允许你从 JavaScript 访问 Android 的日历 API。最终，你将能够从 JavaScript 中调用 `CalendarModule.createCalendarEvent('Dinner Party'， 'My House');`，从而调用 Java/Kotlin 方法创建一个日历事件。

### 设置

要开始，请在 Android Studio 中打开 React Native 应用程序中的 Android 项目。你可以在 React Native 应用中找到 Android 项目的位置:

<figure>
  <img src="/docs/assets/native-modules-android-open-project.png" width="500" alt="Image of opening up an Android project within a React Native app inside of Android Studio." />
  <figcaption>Image of where you can find your Android project</figcaption>
</figure>

我们建议使用 Android Studio 来编写你的原生代码。Android Studio 是一个为 Android 开发而构建的 IDE，使用它将帮助你快速解决代码语法错误等小问题。

我们还建议启用 [Gradle Daemon](https://docs.gradle.org/2.9/userguide/gradle_daemon.html) 以加快你迭代 Java/Kotlin 代码时的构建速度。

### 创建自定义原生模块文件

第一步是在 `android/app/src/main/java/com/your-app-name/` 文件夹中创建 Java/Kotlin 文件(`CalendarModule.java` 或 `CalendarModule.kt`)。该 Java/Kotlin 文件将包含您的原生模块 Java/Kotlin 类。

<figure>
  <img src="/docs/assets/native-modules-android-add-class.png" width="700" alt="Image of adding a class called CalendarModule.java within the Android Studio." />
  <figcaption>Image of how to add the CalendarModuleClass</figcaption>
</figure>

然后添加如下代码：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
package com.your-apps-package-name; // replace your-apps-package-name with your app’s package name
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;

public class CalendarModule extends ReactContextBaseJavaModule {
   CalendarModule(ReactApplicationContext context) {
       super(context);
   }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
package com.your-apps-package-name; // replace your-apps-package-name with your app’s package name
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {...}
```

</TabItem>
</Tabs>

正如您所看到的，您的`CalendarModule`类继承自`ReactContextBaseJavaModule`类。对于安卓系统，Java/Kotlin 原生模块是用扩展了`ReactContextBaseJavaModule`并实现了 JavaScript 所需功能的类来编写的。

值得注意的是，从技术上讲，Java/Kotlin 类只需要扩展`BaseJavaModule`类或实现`NativeModule`接口，才能被 React Native 视为原生模块。

然而，我们建议您使用上面所示的`ReactContextBaseJavaModule`。`ReactContextBaseJavaModule`提供了`ReactApplicationContext`(RAC)的访问权限，这对于需要挂钩到活动生命周期方法的原生模块非常有用。使用`ReactContextBaseJavaModule`也将使您更容易在将来实现原生模块的类型安全性。为了实现原生模块类型安全性(将在未来版本中推出)，React Native 会查看每个原生模块的 JavaScript 规范，并生成一个抽象基类，该基类扩展自`ReactContextBaseJavaModule`。

### 模块名称

所有 Android 平台上的 Java/Kotlin 原生模块都需要实现 `getName()` 方法。该方法返回一个字符串，代表了原生模块的名称。这样，原生模块就可以通过其名称在 JavaScript 中被访问。例如，在下面的代码片段中，`getName()` 返回 `"CalendarModule"`。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
// add to CalendarModule.java
@Override
public String getName() {
   return "CalendarModule";
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
// add to CalendarModule.kt
override fun getName() = "CalendarModule"
```

</TabItem>
</Tabs>

可以通过以下方式在 JS 中访问原生模块:

```tsx
const {CalendarModule} = ReactNative.NativeModules;
```

### 向 JavaScript 导出原生方法

接下来，您需要在原生模块中添加一个方法，该方法可以创建日历事件，并可以在 JavaScript 中调用。所有打算从 JavaScript 调用的原生模块方法都必须使用`@ReactMethod`进行注解。

为`CalendarModule`设置一个方法`createCalendarEvent()`，可以通过`CalendarModule.createCalendarEvent()`在 JS 中调用。目前，该方法将采用名称和位置作为字符串参数。参数类型选项将在稍后介绍。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@ReactMethod
public void createCalendarEvent(String name， String location) {
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
@ReactMethod fun createCalendarEvent(name: String， location: String) {}
```

</TabItem>
</Tabs>

在您从应用程序调用该方法时，请在该方法中添加一条调试日志以确认它已被调用。以下是如何从 Android 工具包中导入并使用[Log](https:// developer.android.com/reference/android/util/Log)类的示例:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
import android.util.Log;

@ReactMethod
public void createCalendarEvent(String name， String location) {
   Log.d("CalendarModule"， "Create event called with name: " + name
   + " and location: " + location);
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
import android.util.Log

@ReactMethod
fun createCalendarEvent(name: String， location: String) {
    Log.d("CalendarModule"， "Create event called with name: $name and location: $location")
}
```

</TabItem>
</Tabs>

一旦您完成了原生模块的实现并将其与 JavaScript 连接起来，您便可以遵循[这些步骤](https://developer.android.com/studio/debug/am-logcat.html)查看应用程序的日志。

### 同步方法

您可以将 `isBlockingSynchronousMethod = true` 传递给原生方法，将其标记为同步方法。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@ReactMethod(isBlockingSynchronousMethod = true)
```

</TabItem>
<TabItem value="kotlin">

```kotlin
@ReactMethod(isBlockingSynchronousMethod = true)
```

</TabItem>
</Tabs>

就目前而言，我们并不建议这么做，因为以同步的方式调用方法可能会带来严重的性能损失，并且可能会给你的原生模块引入与线程相关的 bug。此外，请注意，如果你选择启用 `isBlockingSynchronousMethod`， 你的应用程序将无法再使用 Google Chrome 调试器。这是因为同步方法需要 JS VM 与应用程序共享内存。对于 Google Chrome 调试器而言，React Native 运行在 Google Chrome 中的 JS VM 内部，并通过 WebSockets 与移动设备进行异步通信。

### 在 Android 上注册模块

一旦编写了原生模块，就需要将其注册到 React Native 中。为此，你需要将你的原生模块添加到一个 `ReactPackage` 中，并将该 `ReactPackage` 注册到 React Native。在初始化过程中，React Native 会遍历所有包，并对于每个 `ReactPackage`，注册其中的每个原生模块。

React Native 会调用 `ReactPackage` 的 `createNativeModules()` 方法，以获取要注册的原生模块列表。对于 Android 而言，如果一个模块未在 createNativeModules 中被实例化并返回，那么它就不会在 JavaScript 中可用。

要将你的原生模块添加到 `ReactPackage` 中，首先在 `android/app/src/main/java/com/your-app-name/` 文件夹中创建一个新的 Java/Kotlin 类(`MyAppPackage.java` 或 `MyAppPackage.kt`)，并实现 `ReactPackage` 接口:

然后添加以下内容:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
package com.your-app-name; // replace your-app-name with your app’s name
import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyAppPackage implements ReactPackage {

   @Override
   public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
       return Collections.emptyList();
   }

   @Override
   public List<NativeModule> createNativeModules(
           ReactApplicationContext reactContext) {
       List<NativeModule> modules = new ArrayList<>();

       modules.add(new CalendarModule(reactContext));

       return modules;
   }

}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
package com.your-app-name // replace your-app-name with your app’s name

import android.view.View
import com.facebook.react.ReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ReactShadowNode
import com.facebook.react.uimanager.ViewManager

class MyAppPackage : ReactPackage {

    override fun createViewManagers(
        reactContext: ReactApplicationContext
    ): MutableList<ViewManager<View， ReactShadowNode<*>>> = mutableListOf()

    override fun createNativeModules(
        reactContext: ReactApplicationContext
    ): MutableList<NativeModule> = listOf(CalendarModule(reactContext)).toMutableList()
}
```

</TabItem>
</Tabs>

这个文件导入了你创建的原生模块`CalendarModule`。然后在`createNativeModules()`函数中实例化了`CalendarModule`并将其作为`NativeModules`列表返回以便注册。如果将来你添加更多原生模块，也可以在这里实例化它们并添加到返回的列表中。

值得注意的是，这种注册原生模块的方式会在应用启动时主动地初始化所有原生模块，从而增加了应用的启动时间。你可以使用[TurboReactPackage](https://github.com/facebook/react-native/blob/main/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/TurboReactPackage.java)作为替代方案。与返回已实例化的原生模块对象列表的`createNativeModules`不同，TurboReactPackage 实现了一个`getModule(String name， ReactApplicationContext rac)`方法，在需要时创建原生模块对象。目前实现 TurboReactPackage 有点复杂。除了实现`getModule()`方法外，你还必须实现一个`getReactModuleInfoProvider()`方法，该方法返回包可实例化的所有原生模块列表以及实例化它们的函数，示例[在此](https://github.com/facebook/react-native/blob/8ac467c51b94c82d81930b4802b2978c85539925/ReactAndroid/src/main/java/com/facebook/react/CoreModulesPackage.java#L86-L165)。再次说明，使用 TurboReactPackage 将使你的应用拥有更快的启动时间，但目前编写起来有些麻烦。所以如果你选择使用 TurboReactPackage，请小心谨慎。

要注册`CalendarModule`包，你必须将`MyAppPackage`添加到 ReactNativeHost 的`getPackages()`方法返回的包列表中。打开`MainApplication.java`或`MainApplication.kt`文件，位于如下路径:`android/app/src/main/java/com/your-app-name/`。

找到 ReactNativeHost 的`getPackages()`方法，并将你的包添加到`getPackages()`返回的包列表中。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@Override
  protected List<ReactPackage> getPackages() {
    @SuppressWarnings("UnnecessaryLocalVariable")
    List<ReactPackage> packages = new PackageList(this).getPackages();
    // below MyAppPackage is added to the list of packages returned
    packages.add(new MyAppPackage());
    return packages;
  }
```

</TabItem>
<TabItem value="kotlin">

```kotlin
override fun getPackages(): List<ReactPackage> =
    PackageList(this).packages.apply {
        // Packages that cannot be autolinked yet can be added manually here， for example:
        // packages.add(new MyReactNativePackage());
        add(MyAppPackage())
    }
```

</TabItem>
</Tabs>

您已成功为 Android 注册了原生模块!

### 测试已构建的内容

此时，您已为 Android 原生模块搭建了基本的脚手架。通过在 JavaScript 中访问原生模块并调用它导出的方法来测试一下。

在应用中找到一个添加调用原生模块的 createCalendarEvent()方法的位置。下面是一个示例组件 NewModuleButton，您可以在应用中添加它。您可以在 NewModuleButton 的 onPress()函数中调用原生模块。

```tsx
import React from 'react';
import {NativeModules， Button} from 'react-native';

const NewModuleButton = () => {
  const onPress = () => {
    console.log('We will invoke the native module here!');
  };

  return (
    <Button
      title="Click to invoke your native module!"
      color="#841584"
      onPress={onPress}
    />
  );
};

export default NewModuleButton;
```

为了从 JavaScript 访问您的原生模块，您需要先从 React Native 导入`NativeModules`:

```tsx
import {NativeModules} from 'react-native';
```

然后您就可以从`NativeModules`访问`CalendarModule`原生模块了。

```tsx
const {CalendarModule} = NativeModules;
```

现在您有了可用的 CalendarModule 原生模块，就可以调用您的原生方法`createCalendarEvent()`了。下面是在`NewModuleButton`的`onPress()`方法中添加的代码:

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent('testName'， 'testLocation');
};
```

最后一步是重新构建 React Native 应用程序，以便您可以使用最新的原生代码(包括您新的原生模块!)。在您的 react native 应用程序所在的命令行中，运行以下命令:

<Tabs groupId="package-manager" queryString defaultValue={constants.defaultPackageManager} values={constants.packageManagers}>
<TabItem value="npm">

```shell
npm run android
```

</TabItem>
<TabItem value="yarn">

```shell
yarn android
```

</TabItem>
</Tabs>

### 在迭代过程中构建

在学习这些指南并对您的原生模块进行迭代的过程中，您需要对应用程序进行原生重建，以从 JavaScript 访问您最新的更改。这是因为您编写的代码位于应用程序的原生部分。虽然 React Native 的 metro bundler 可以监视 JavaScript 中的更改并为您实时重建，但它不会对原生代码进行操作。因此，如果您想测试最新的原生更改，需要使用上述命令进行重建。

### 小结 ✨

现在，您应该能够在应用程序中调用原生模块上的`createCalendarEvent()`方法。在我们的示例中，这是通过按下`NewModuleButton`来实现的。您可以通过查看在`createCalendarEvent()`方法中设置的日志来确认这一点。您可以按照[这些步骤](https://developer.android.com/studio/debug/am-logcat.html)在应用中查看 ADB 日志。然后，您应该能够搜索您的`Log.d`消息(在我们的示例中是"Create event called with name: testName and location: testLocation")，并在每次调用原生模块方法时看到您的消息被记录。

<figure>
  <img src="/docs/assets/native-modules-android-logs.png" width="1000" alt="Image of logs." />
  <figcaption>Image of ADB logs in Android Studio</figcaption>
</figure>

在这一点上，您已经创建了一个 Android 原生模块，并从您的 React Native 应用程序中的 JavaScript 调用了它的原生方法。您可以继续学习诸如原生模块方法可用的参数类型以及如何设置回调和承诺之类的内容。

## 超越日历原生模块

### 更好的原生模块导出

从上面的 `NativeModules` 导入您的原生模块是有点麻烦的。

为了让您原生模块的消费者无需每次都这样访问您的原生模块，您可以为该模块创建一个 JavaScript 包装器。创建一个名为 `CalendarModule.js` 的新 JavaScript 文件，其中包含以下内容:

```tsx
/**
* 这将原生 CalendarModule 模块作为 JS 模块暴露。它有一个名为 'createCalendarEvent' 的函数，该函数接受以下参数:

* 1. String name: 表示事件名称的字符串
* 2. String location: 表示事件位置的字符串
*/
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
export default CalendarModule;
```

此 JavaScript 文件也将成为您添加任何 JavaScript 端功能的绝佳位置。例如，如果您使用 TypeScript 等类型系统，可以在此处为您的原生模块添加类型注释。虽然 React Native 目前还不支持从原生到 JS 的类型安全性，但您所有的 JS 代码都将是类型安全的。这样做也将使您将来更容易切换到类型安全的原生模块。下面是为 CalendarModule 添加类型安全性的示例:

```tsx
/**
 * 这个模块以 JS 模块的方式暴露了原生 CalendarModule。它有一个名为 "createCalendarEvent" 的函数，接受以下两个参数:
 *
 * 1. String name: 代表事件名称的字符串
 * 2. String location: 代表事件地点的字符串
 */
import {NativeModules} from 'react-native';
const {CalendarModule} = NativeModules;
interface CalendarInterface {
  createCalendarEvent(name: string， location: string): void;
}
export default CalendarModule as CalendarInterface;
```

在其他 JavaScript 文件中，你可以如下引入原生模块并调用它的方法:

```tsx
import CalendarModule from './CalendarModule';
CalendarModule.createCalendarEvent('foo'， 'bar');
```

> 这假设你导入 `CalendarModule` 的位置与 `CalendarModule.js` 在同一层级目录。如有必要，请相应更新导入路径。

### 参数类型

当在 JavaScript 中调用原生模块方法时，React Native 会将参数从 JS 对象转换为对应的 Java/Kotlin 对象类型。例如，如果你的 Java 原生模块方法接受一个 double 类型，在 JS 中你需要用数字来调用该方法。React Native 会为你处理转换。下面列出了原生模块方法支持的参数类型以及它们在 JavaScript 中对应的等价类型。

| Java          | Kotlin        | JavaScript |
| ------------- | ------------- | ---------- |
| Boolean       | Boolean       | ?boolean   |
| boolean       |               | boolean    |
| Double        | Double        | ?number    |
| double        |               | number     |
| String        | String        | string     |
| Callback      | Callback      | Function   |
| Promise       | Promise       | Promise    |
| ReadableMap   | ReadableMap   | Object     |
| ReadableArray | ReadableArray | Array      |

> 以下类型目前虽然受支持，但在 TurboModules 中将不再支持，请避免使用:
>
> - Integer Java/Kotlin -> ?number
> - Float Java/Kotlin -> ?number
> - int Java -> number
> - float Java -> number

对于上面未列出的参数类型，你需要自行处理类型转换。例如，在 Android 中，Date 类型的转换并不是开箱即用的。你可以在原生方法中自己处理 Date 类型的转换，如下所示:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
    String dateFormat = "yyyy-MM-dd";
    SimpleDateFormat sdf = new SimpleDateFormat(dateFormat);
    Calendar eStartDate = Calendar.getInstance();
    try {
        eStartDate.setTime(sdf.parse(startDate));
    }

```

</TabItem>
<TabItem value="kotlin">

```kotlin
    val dateFormat = "yyyy-MM-dd"
    val sdf = SimpleDateFormat(dateFormat， Locale.US)
    val eStartDate = Calendar.getInstance()
    try {
        sdf.parse(startDate)?.let {
            eStartDate.time = it
        }
    }
```

</TabItem>
</Tabs>

### 导出常量

一个原生模块可以通过实现在 JavaScript 中可用的原生方法 `getConstants()` 来导出常量。接下来，您将实现 `getConstants()` 并返回一个包含 `DEFAULT_EVENT_NAME` 常量的映射，您可以在 JavaScript 中访问该常量:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@Override
public Map<String， Object> getConstants() {
   final Map<String， Object> constants = new HashMap<>();
   constants.put("DEFAULT_EVENT_NAME"， "New Event");
   return constants;
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
override fun getConstants(): MutableMap<String， Any> =
    hashMapOf("DEFAULT_EVENT_NAME" to "New Event")
```

</TabItem>
</Tabs>

然后，可以在 JS 中通过在原生模块上调用`getConstants`来访问该常量:

```tsx
const {DEFAULT_EVENT_NAME} = CalendarModule.getConstants();
console.log(DEFAULT_EVENT_NAME);
```

理论上可以直接从原生模块对象访问在`getConstants()`中导出的常量。但这种做法将来不再受支持，因此我们鼓励社区转而采用上述方式，以避免将来不得不迁移代码。

> 目前，常量仅在初始化时导出，因此如果您在运行时更改了 getConstants 的值，它不会影响 JavaScript 环境。这种情况将随着 Turbomodules 而改变。使用 Turbomodules 后，`getConstants()`将成为一个常规的原生模块方法，每次调用都会触及原生端。

### 回调函数

原生模块还支持一种独特的参数类型:回调函数。回调函数用于将数据从 Java/Kotlin 异步传递到 JavaScript，同时也可用于从原生端异步执行 JavaScript 代码。

为了在原生模块方法中加入回调函数，首先要引入`Callback`接口，然后将`Callback`类型的参数添加到你的原生模块方法中。目前使用回调参数还有一些细微差别，不过这些将在 TurboModules 中得到解决。目前，你的函数参数只能有两个回调函数——一个成功回调和一个失败回调。另外，如果原生模块方法调用的最后一个参数是函数，则将被视为成功回调;如果倒数第二个参数是函数，则被视为失败回调。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
import com.facebook.react.bridge.Callback;

@ReactMethod
public void createCalendarEvent(String name， String location， Callback callBack) {
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
import com.facebook.react.bridge.Callback

@ReactMethod fun createCalendarEvent(name: String， location: String， callback: Callback) {}
```

</TabItem>
</Tabs>

你可以在 Java/Kotlin 方法中调用回调函数，提供任何需要传递给 JavaScript 的数据。请注意，你只能从原生代码传递可序列化的数据到 JavaScript。如果需要传递原生对象，你可以使用`WriteableMaps`，如果需要使用集合，可以使用`WritableArrays`。还需要强调的是，回调函数不会在原生函数完成后立即被调用。下面是之前创建的一个事件 ID，将被传递给回调函数。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
  @ReactMethod
   public void createCalendarEvent(String name， String location， Callback callBack) {
       Integer eventId = ...
       callBack.invoke(eventId);
   }
```

</TabItem>
<TabItem value="kotlin">

```kotlin
  @ReactMethod
  fun createCalendarEvent(name: String， location: String， callback: Callback) {
      val eventId = ...
      callback.invoke(eventId)
  }
```

</TabItem>
</Tabs>

然后就可以在 JavaScript 中使用以下方法:

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent(
    'Party'，
    'My House'，
    eventId => {
      console.log(`Created a new event with id ${eventId}`);
    }，
  );
};
```

另一个需要注意的重要细节是，原生模块方法只能调用一次回调函数，这意味着你可以调用成功回调或失败回调，但不能两者兼得，而且每个回调最多只能被调用一次。不过，原生模块可以存储回调函数，并在以后调用它。

处理回调错误有两种方法。第一种是遵循 Node 的惯例，将传给回调函数的第一个参数视为错误对象。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
  @ReactMethod
   public void createCalendarEvent(String name， String location， Callback callBack) {
       Integer eventId = ...
       callBack.invoke(null， eventId);
   }
```

</TabItem>
<TabItem value="kotlin">

```kotlin
  @ReactMethod
  fun createCalendarEvent(name: String， location: String， callback: Callback) {
      val eventId = ...
      callback.invoke(null， eventId)
  }
```

</TabItem>
</Tabs>

在 JavaScript 中，你可以先检查第一个参数，看看是否传递了错误:

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent(
    'testName'，
    'testLocation'，
    (error， eventId) => {
      if (error) {
        console.error(`Error found! ${error}`);
      }
      console.log(`event id ${eventId} returned`);
    }，
  );
};
```

另一种选择是使用 onSuccess 和 onFailure 回调函数:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@ReactMethod
public void createCalendarEvent(String name， String location， Callback myFailureCallback， Callback mySuccessCallback) {
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
@ReactMethod
  fun createCalendarEvent(
      name: String，
      location: String，
      myFailureCallback: Callback，
      mySuccessCallback: Callback
  ) {}
```

</TabItem>
</Tabs>

在 JavaScript 中，您可以为错误和成功响应分别添加单独的回调函数:

```tsx
const onPress = () => {
  CalendarModule.createCalendarEvent(
    'testName'，
    'testLocation'，
    error => {
      console.error(`Error found! ${error}`);
    }，
    eventId => {
      console.log(`event id ${eventId} returned`);
    }，
  );
};
```

### Promises

原生模块也可以实现[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)承诺，这有助于简化您的 JavaScript 代码，尤其是在使用 ES2016 的[async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)语法时。当原生模块 Java/Kotlin 方法的最后一个参数为 Promise 时，对应的 JS 方法将返回一个 JS Promise 对象。

用 Promise 重构上述代码，代码如下:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
import com.facebook.react.bridge.Promise;

@ReactMethod
public void createCalendarEvent(String name， String location， Promise promise) {
    try {
        Integer eventId = ...
        promise.resolve(eventId);
    } catch(Exception e) {
        promise.reject("Create Event Error"， e);
    }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
import com.facebook.react.bridge.Promise

@ReactMethod
fun createCalendarEvent(name: String， location: String， promise: Promise) {
    try {
        val eventId = ...
        promise.resolve(eventId)
    } catch (e: Throwable) {
        promise.reject("Create Event Error"， e)
    }
}
```

</TabItem>
</Tabs>

> 类似于回调，原生模块方法可以拒绝或解决一个 Promise(但不能两者都做)，并且最多只能执行一次。这意味着您可以调用成功回调或失败回调， 但不能两者都调用，且每个回调最多只能被调用一次。不过，原生模块可以存储回调并稍后调用它。

该方法的 JavaScript 对应部分返回一个 Promise。这意味着您可以在异步函数中使用 `await` 关键字调用它并等待其结果:

```tsx
const onSubmit = async () => {
  try {
    const eventId = await CalendarModule.createCalendarEvent(
      'Party'，
      'My House'，
    );
    console.log(`Created a new event with id ${eventId}`);
  } catch (e) {
    console.error(e);
  }
};
```

reject 方法接受以下几种参数组合:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
String code， String message， WritableMap userInfo， Throwable throwable
```

</TabItem>
<TabItem value="kotlin">

```kotlin
code: String， message: String， userInfo: WritableMap， throwable: Throwable
```

</TabItem>
</Tabs>

更多详细内容，您可以在[这里](https://github.com/facebook/react-native/blob/main/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/bridge/Promise.java)查阅 `Promise.java` 接口。如果未提供 `userInfo`，React Native 会将其设置为 null。对于其余参数，React Native 将使用默认值。`message` 参数提供了显示在错误调用堆栈顶部的错误 `message`。以下是在 JavaScript 中显示的错误消息示例，该消息来自 Java/Kotlin 中的以下 reject 调用。

Java/Kotlin 的 reject 调用:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
promise.reject("Create Event error"， "Error parsing date"， e);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
promise.reject("Create Event error"， "Error parsing date"， e)
```

</TabItem>
</Tabs>

在 React Native 应用中，如果 promise 被拒绝时，会抛出如下错误信息:

<figure>
  <img src="/docs/assets/native-modules-android-errorscreen.png" width="200" alt="Image of error message in React Native app." />
  <figcaption>Image of error message</figcaption>
</figure>

### 向 JavaScript 发送事件

原生模块无需直接调用即可向 JavaScript 发送事件信号。例如，您可能需要提醒 JavaScript 某项即将发生的原生 Android 日历应用程序日历事件。最简单的方式是使用从 ReactContext 中获取的 RCTDeviceEventEmitter，如下代码片段所示。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
...
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
...
private void sendEvent(ReactContext reactContext，
                      String eventName，
                      @Nullable WritableMap params) {
 reactContext
     .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
     .emit(eventName， params);
}

private int listenerCount = 0;

@ReactMethod
public void addListener(String eventName) {
  if (listenerCount == 0) {
    // Set up any upstream listeners or background tasks as necessary
  }

  listenerCount += 1;
}

@ReactMethod
public void removeListeners(Integer count) {
  listenerCount -= count;
  if (listenerCount == 0) {
    // Remove upstream listeners， stop unnecessary background tasks
  }
}
...
WritableMap params = Arguments.createMap();
params.putString("eventProperty"， "someValue");
...
sendEvent(reactContext， "EventReminder"， params);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
...
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.Arguments
import com.facebook.react.modules.core.DeviceEventManagerModule
...

private fun sendEvent(reactContext: ReactContext， eventName: String， params: WritableMap?) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName， params)
}

private var listenerCount = 0

@ReactMethod
fun addListener(eventName: String) {
  if (listenerCount == 0) {
    // Set up any upstream listeners or background tasks as necessary
  }

  listenerCount += 1
}

@ReactMethod
fun removeListeners(count: Int) {
  listenerCount -= count
  if (listenerCount == 0) {
    // Remove upstream listeners， stop unnecessary background tasks
  }
}
...
val params = Arguments.createMap().apply {
    putString("eventProperty"， "someValue")
}
...
sendEvent(reactContext， "EventReminder"， params)
```

</TabItem>
</Tabs>

JavaScript 模块可通过在 [NativeEventEmitter](https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/EventEmitter/NativeEventEmitter.js) 类上调用 `addListener` 方法来注册接收事件。

```tsx
import {NativeEventEmitter， NativeModules} from 'react-native';
...
useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    let eventListener = eventEmitter.addListener('EventReminder'， event => {
      console.log(event.eventProperty) // "someValue"
    });

    // Removes the listener once unmounted
    return () => {
      eventListener.remove();
    };
  }， []);
```

### 从 startActivityForResult 获取结果

如果你想从使用`startActivityForResult`启动的 Activity 中获取结果，需要监听`onActivityResult`。为此，你必须扩展`BaseActivityEventListener`或实现`ActivityEventListener`。前者更可取，因为它更有弹性应对 API 变化。然后，你需要在模块的构造函数中注册监听器，就像这样:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
reactContext.addActivityEventListener(mActivityResultListener);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
reactContext.addActivityEventListener(mActivityResultListener);
```

</TabItem>
</Tabs>

现在你可以通过实现以下方法来监听 `onActivityResult` 事件:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
@Override
public void onActivityResult(
 final Activity activity，
 final int requestCode，
 final int resultCode，
 final Intent intent) {
 // Your logic here
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
override fun onActivityResult(
    activity: Activity?，
    requestCode: Int，
    resultCode: Int，
    intent: Intent?
) {
    // Your logic here
}
```

</TabItem>
</Tabs>

让我们实现一个基本的图像选择器来演示这一点。该图像选择器将向 JavaScript 暴露方法 `pickImage`，调用该方法时会返回图像路径。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```kotlin
public class ImagePickerModule extends ReactContextBaseJavaModule {

  private static final int IMAGE_PICKER_REQUEST = 1;
  private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
  private static final String E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
  private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
  private static final String E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND";

  private Promise mPickerPromise;

  private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

    @Override
    public void onActivityResult(Activity activity， int requestCode， int resultCode， Intent intent) {
      if (requestCode == IMAGE_PICKER_REQUEST) {
        if (mPickerPromise != null) {
          if (resultCode == Activity.RESULT_CANCELED) {
            mPickerPromise.reject(E_PICKER_CANCELLED， "Image picker was cancelled");
          } else if (resultCode == Activity.RESULT_OK) {
            Uri uri = intent.getData();

            if (uri == null) {
              mPickerPromise.reject(E_NO_IMAGE_DATA_FOUND， "No image data found");
            } else {
              mPickerPromise.resolve(uri.toString());
            }
          }

          mPickerPromise = null;
        }
      }
    }
  };

  ImagePickerModule(ReactApplicationContext reactContext) {
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
      promise.reject(E_ACTIVITY_DOES_NOT_EXIST， "Activity doesn't exist");
      return;
    }

    // Store the promise to resolve/reject when picker returns data
    mPickerPromise = promise;

    try {
      final Intent galleryIntent = new Intent(Intent.ACTION_PICK);

      galleryIntent.setType("image/*");

      final Intent chooserIntent = Intent.createChooser(galleryIntent， "Pick an image");

      currentActivity.startActivityForResult(chooserIntent， IMAGE_PICKER_REQUEST);
    } catch (Exception e) {
      mPickerPromise.reject(E_FAILED_TO_SHOW_PICKER， e);
      mPickerPromise = null;
    }
  }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin
class ImagePickerModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private var pickerPromise: Promise? = null

    private val activityEventListener =
        object : BaseActivityEventListener() {
            override fun onActivityResult(
                activity: Activity?，
                requestCode: Int，
                resultCode: Int，
                intent: Intent?
            ) {
                if (requestCode == IMAGE_PICKER_REQUEST) {
                    pickerPromise?.let { promise ->
                        when (resultCode) {
                            Activity.RESULT_CANCELED ->
                                promise.reject(E_PICKER_CANCELLED， "Image picker was cancelled")
                            Activity.RESULT_OK -> {
                                val uri = intent?.data

                                uri?.let { promise.resolve(uri.toString())}
                                    ?: promise.reject(E_NO_IMAGE_DATA_FOUND， "No image data found")
                            }
                        }

                        pickerPromise = null
                    }
                }
            }
        }

    init {
        reactContext.addActivityEventListener(activityEventListener)
    }

    override fun getName() = "ImagePickerModule"

    @ReactMethod
    fun pickImage(promise: Promise) {
        val activity = currentActivity

        if (activity == null) {
            promise.reject(E_ACTIVITY_DOES_NOT_EXIST， "Activity doesn't exist")
            return
        }

        pickerPromise = promise

        try {
            val galleryIntent = Intent(Intent.ACTION_PICK).apply { type = "image\/*" }

            val chooserIntent = Intent.createChooser(galleryIntent， "Pick an image")

            activity.startActivityForResult(chooserIntent， IMAGE_PICKER_REQUEST)
        } catch (t: Throwable) {
            pickerPromise?.reject(E_FAILED_TO_SHOW_PICKER， t)
            pickerPromise = null
        }
    }

    companion object {
        const val IMAGE_PICKER_REQUEST = 1
        const val E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST"
        const val E_PICKER_CANCELLED = "E_PICKER_CANCELLED"
        const val E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER"
        const val E_NO_IMAGE_DATA_FOUND = "E_NO_IMAGE_DATA_FOUND"
    }
}
```

</TabItem>
</Tabs>

### 监听生命周期事件

监听如 `onResume`、`onPause` 等活动的生命周期事件，跟实现 `ActivityEventListener` 的方式非常相似。该模块必须实现 `LifecycleEventListener`。然后，你需要在模块的构造函数中注册一个监听器，就像这样:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java
reactContext.addLifecycleEventListener(this);
```

</TabItem>
<TabItem value="kotlin">

```kotlin
reactContext.addLifecycleEventListener(this)
```

</TabItem>
</Tabs>

现在，通过实现以下方法，您可以监听活动的生命周期事件:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

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

</TabItem>
<TabItem value="kotlin">

```kotlin
override fun onHostResume() {
    // Activity `onResume`
}

override fun onHostPause() {
    // Activity `onPause`
}

override fun onHostDestroy() {
    // Activity `onDestroy`
}
```

</TabItem>
</Tabs>

### 线程管理

截至目前，在 Android 系统上，所有原生模块的异步方法都在同一个线程上执行。原生模块不应对它们被调用所在的线程作任何假设，因为当前的分配方式在未来可能会发生变化。如果需要进行阻塞调用，则应将繁重工作分派到内部管理的工作线程，并从那里分发任何回调。
