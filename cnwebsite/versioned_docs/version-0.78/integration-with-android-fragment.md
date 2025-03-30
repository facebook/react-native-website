---
id: integration-with-android-fragment
title: 集成到 Android Fragment
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

[与现有应用程序集成](https://reactnative.dev/docs/integration-with-existing-apps)指南中详细介绍了如何将全屏 React Native 应用程序作为 Activity 集成到现有 Android 应用程序中。要在现有应用程序的 Fragments 中使用 React Native 组件，需要进行一些额外的设置。这样做的好处是它允许原生应用程序将 React Native 组件与 Activity 中的原生 Fragments 集成在一起。

### 1. 将 React Native 添加到你的应用程序

按照[与现有应用程序集成](https://reactnative.dev/docs/integration-with-existing-apps)的指南，直到代码集成部分。继续执行第 1 步：创建一个`index.android.js`文件；第 2 步：添加本节中的 React Native 代码。

### 2. 将你的应用程序与 React Native Fragment 集成

你可以将你的 React Native 组件渲染成一个 Fragment，而不是一个全屏的 React Native Activity。该组件可以称为"screen"或"fragment"，它的功能与 Android Fragment 相同，可能包含子组件。这些组件可以放在`/fragments`文件夹中，用于组成 Fragment 的子组件可以放在`/components`文件夹中。

你需要在主应用程序 Java/Kotlin 类中实现`ReactApplication`接口。如果你使用默认活动从 Android Studio 创建了一个新项目，则需要创建一个新类（例如`MyReactApplication.java`或`MyReactApplication.kt`）。如果它是一个现有类，你可以在`AndroidManifest.xml`文件中找到这个主类。在`<application />`标签下，你应该能看到属性`android:name`，例如`android:name=".MyReactApplication"`。此值是要实现的类，并为其提供所需的方法。

确保主应用程序类实现 ReactApplication：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
class MyReactApplication: Application(), ReactApplication {...}
```

</TabItem>
<TabItem value="java">

```java
public class MyReactApplication extends Application implements ReactApplication {...}
```

</TabItem>
</Tabs>

重写所需的方法`getUseDeveloperSupport`, `getPackages`以及`getReactNativeHost`:

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
class MyReactApplication : Application(), ReactApplication {
    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
    }
    private val reactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getUseDeveloperSupport() = BuildConfig.DEBUG
            override fun getPackages(): List<ReactPackage> {
                val packages = PackageList(this).getPackages().toMutableList()
                // Packages that cannot be autolinked yet can be added manually here
                return packages
            }
        }
    override fun getReactNativeHost(): ReactNativeHost = reactNativeHost
}
```

</TabItem>
<TabItem value="java">

```java
public class MyReactApplication extends Application implements ReactApplication {
    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, false);
    }

    private final ReactNativeHost mReactNativeHost = new DefaultReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        protected List<ReactPackage> getPackages() {
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Packages that cannot be autolinked yet can be added manually here
            return packages;
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
```

</TabItem>
</Tabs>

如果你使用的是 Android Studio，请使用 Alt+Enter 在类中添加所有缺失的导入，或者手动导入：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
import android.app.Application

import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.soloader.SoLoader
```

</TabItem>
<TabItem value="java">

```java
import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;

import java.util.List;
```

</TabItem>
</Tabs>

执行"Sync Project files with Gradle"操作。

### 3. 为 React Native Fragment 添加 FrameLayout

现在可以把 React Native Fragment 添加到一个 Activity 中。对于一个新项目来说，这个 Activity 将是`MainActivity`，但它可以是任何 Activity，并且随着将更多 React Native 组件集成到应用程序中，你可以将更多 Fragments 添加到其他 Activity 中。

首先将 React Native Fragment 添加到 Activity 的布局中，例如`res/layouts`文件夹中的`main_activity.xml`。

添加具有 id、宽度和高度的`<FrameLayout>`，React Native Fragment 会被渲染到此布局中。

```xml
<FrameLayout
    android:id="@+id/reactNativeFragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

### 4. 将 React Native Fragment 添加到 FrameLayout

要将 React Native Fragment 添加到布局中，你需要有一个 Activity。正如在一个新项目中提到的那样，它就是 MainActivity。在这个 Activity 中添加一个按钮和一个事件监听器，单击按钮时，将会渲染 React Native Fragment。

修改 Activity 布局以添加按钮：

```xml
<Button
    android:layout_margin="10dp"
    android:id="@+id/button"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:text="Show react fragment" />
```

现在在 Activity 类（例如`MainActivity.java`或`MainActivity.kt`）中，你需要为按钮添加一个`OnClickListener`，实例化`ReactFragment`并将其添加到框架布局中。

将按钮字段添加到 Activity 的顶部：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
private lateinit var button: Button
```

</TabItem>
<TabItem value="java">

```java
private Button mButton;
```

</TabItem>
</Tabs>

更新 Activity 的`onCreate`方法，如下所示：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
override fun onCreate(savedInstanceState: Bundle) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.main_activity)
    button = findViewById<Button>(R.id.button)
    button.setOnClickListener {
        val reactNativeFragment = ReactFragment.Builder()
                .setComponentName("HelloWorld")
                .setLaunchOptions(getLaunchOptions("test message"))
                .build()
        getSupportFragmentManager()
                .beginTransaction()
                .add(R.id.reactNativeFragment, reactNativeFragment)
                .commit()
    }
}
```

</TabItem>
<TabItem value="java">

```java
@Override
protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.main_activity);

    mButton = findViewById(R.id.button);
    mButton.setOnClickListener(new View.OnClickListener() {
        public void onClick(View v) {
            Fragment reactNativeFragment = new ReactFragment.Builder()
                    .setComponentName("HelloWorld")
                    .setLaunchOptions(getLaunchOptions("test message"))
                    .build();

            getSupportFragmentManager()
                    .beginTransaction()
                    .add(R.id.reactNativeFragment, reactNativeFragment)
                    .commit();

        }
    });
}
```

</TabItem>
</Tabs>

在上面的代码中，`Fragment reactNativeFragment = new ReactFragment.Builder()`创建了 ReactFragment，`getSupportFragmentManager().beginTransaction().add()`将 Fragment 添加到框架布局中。

如果你使用了 React Native 的入门工具包，请将"HelloWorld"字符串替换为`index.js`或`index.android.js`文件中的字符串（它是 `AppRegistry.registerComponent()`方法的第一个参数）。

添加`getLaunchOptions`方法，该方法允许你将属性传递到组件。这是可选的，如果不需要传递任何属性，可以删除`setLaunchOptions`。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
private fun getLaunchOptions(message: String) = Bundle().apply {
    putString("message", message)
}

```

</TabItem>
<TabItem value="java">

```java
private Bundle getLaunchOptions(String message) {
    Bundle initialProperties = new Bundle();
    initialProperties.putString("message", message);
    return initialProperties;
}
```

</TabItem>
</Tabs>

在 Activity 类中添加所有缺少的导入。谨慎使用你自己的包中的 BuildConfig 而不是 facebook 包！或者手动导入：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```kotlin
import android.app.Application

import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.shell.MainReactPackage
import com.facebook.soloader.SoLoader

```

</TabItem>
<TabItem value="java">

```java
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
```

</TabItem>
</Tabs>

执行"Sync Project files with Gradle"操作.

### 5. 测试你的集成

确保运行`yarn`来安装你的 react-native 依赖项并运行`yarn native`来启动 Metro 打包器。在 Android Studio 中运行你的 android 应用程序，它应该从开发服务器加载 JavaScript 代码并将其显示在 Activity 的 React Native Fragment 中。

### 6. 附加设置 - 原生模块

你可能需要从你的 react 组件调用现有的 Java/Kotlin 代码。原生模块允许你调用原生代码并在原生应用中运行方法。按照[此处](/docs/native-modules-android)进行设置。
