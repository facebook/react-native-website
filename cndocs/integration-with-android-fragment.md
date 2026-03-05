---
id: integration-with-android-fragment
title: 集成到 Android Fragment
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

[与现有应用程序集成](/docs/integration-with-existing-apps)指南中详细介绍了如何将全屏 React Native 应用程序作为 **Activity** 集成到现有 Android 应用程序中。

要在现有应用程序的 **Fragments** 中使用 React Native 组件，需要进行一些额外的设置。

### 1. 将 React Native 添加到你的应用程序

按照[与现有应用程序集成](/docs/integration-with-existing-apps)的指南完成所有步骤，确保你可以在全屏 Activity 中正常运行 React Native 应用。

### 2. 为 React Native Fragment 添加 FrameLayout

在本示例中，我们将使用 `FrameLayout` 把一个 React Native Fragment 添加到 Activity 中。这种方式足够灵活，也可以适配其他布局（如底部弹窗或标签布局）。

首先在 Activity 的布局文件（例如 `res/layouts` 文件夹中的 `main_activity.xml`）中添加一个带有 id、宽度和高度的 `<FrameLayout>`。React Native Fragment 将渲染到此布局中。

```xml
<FrameLayout
    android:id="@+id/react_native_fragment"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

### 3. 让宿主 Activity 实现 `DefaultHardwareBackBtnHandler`

由于你的宿主 Activity 不是 `ReactActivity`，你需要实现 `DefaultHardwareBackBtnHandler` 接口来处理返回键按下事件。React Native 需要该接口来处理返回键按下事件。

进入你的宿主 Activity，确保它实现了 `DefaultHardwareBackBtnHandler` 接口：

:::warning 已弃用
自 API 级别 33 起，`Activity.onBackPressed()` 已被[弃用](<https://developer.android.com/reference/android/app/Activity#onBackPressed()>)。面向 API 级别 36 的 Android 16 设备将[不再调用此方法](https://developer.android.com/about/versions/16/behavior-changes-16#predictive-back)，应改用 [OnBackPressedDispatcher](https://developer.android.com/reference/androidx/activity/OnBackPressedDispatcher)。
:::

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```diff
package <your-package-here>

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
+import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

+class MainActivity : AppCompatActivity() {
+class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)

        findViewById<Button>(R.id.sample_button).setOnClickListener {
            // Handle button click
        }
    }

+   override fun invokeDefaultOnBackPressed() {
+       onBackPressedDispatcher.onBackPressed()
+   }
}
```

</TabItem>
<TabItem value="java">

```diff
package <your-package-here>;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
+import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

-class MainActivity extends AppCompatActivity {
+class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        findViewById(R.id.button_appcompose).setOnClickListener(button -> {
            // Handle button click
        });
    }

+   @Override
+   public void invokeDefaultOnBackPressed() {
+       getOnBackPressedDispatcher().onBackPressed();
+   }
}
```

</TabItem>
</Tabs>

### 4. 将 React Native Fragment 添加到 FrameLayout

最后，我们可以更新 Activity 以将 React Native Fragment 添加到 FrameLayout 中。在这个具体示例中，我们假设你的 Activity 有一个 id 为 `sample_button` 的按钮，点击后将在 FrameLayout 中渲染一个 React Native Fragment。

更新 Activity 的 `onCreate` 方法如下：

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="kotlin">

```diff
package <your-package-here>

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
+import com.facebook.react.ReactFragment
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler

public class MainActivity : AppCompatActivity(), DefaultHardwareBackBtnHandler {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.main_activity)

        findViewById<Button>(R.id.sample_button).setOnClickListener {
+           val reactNativeFragment = ReactFragment.Builder()
+               .setComponentName("HelloWorld")
+               .setLaunchOptions(Bundle().apply { putString("message", "my value") })
+               .build()
+           supportFragmentManager
+               .beginTransaction()
+               .add(R.id.react_native_fragment, reactNativeFragment)
+               .commit()
        }
    }

   override fun invokeDefaultOnBackPressed() {
       super.onBackPressed()
   }
}
```

</TabItem>
<TabItem value="java">

```diff
package <your-package-here>;

import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
+import com.facebook.react.ReactFragment;
import com.facebook.react.modules.core.DefaultHardwareBackBtnHandler;

public class MainActivity extends AppCompatActivity implements DefaultHardwareBackBtnHandler {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        findViewById(R.id.button_appcompose).setOnClickListener(button -> {
+           Bundle launchOptions = new Bundle();
+           launchOptions.putString("message", "my value");
+
+           ReactFragment fragment = new ReactFragment.Builder()
+                   .setComponentName("HelloWorld")
+                   .setLaunchOptions(launchOptions)
+                   .build();
+           getSupportFragmentManager()
+                   .beginTransaction()
+                   .add(R.id.react_native_fragment, fragment)
+                   .commit();
        });
    }

    @Override
    public void invokeDefaultOnBackPressed() {
        super.onBackPressed();
    }
}
```

</TabItem>
</Tabs>

让我们看看上面的代码。

`ReactFragment.Builder()` 用于创建一个新的 `ReactFragment`，然后我们使用 `supportFragmentManager` 将该 Fragment 添加到 `FrameLayout` 中。

在 builder 中你可以自定义 Fragment 的创建方式：

- `setComponentName` 是你要渲染的组件名称，与你在 `index.js` 中的 `registerComponent` 方法里指定的字符串相同。
- `setLaunchOptions` 是一个可选方法，用于向组件传递初始属性。如果不使用可以移除。

### 5. 测试你的集成

确保运行 `yarn start` 来启动打包器，然后在 Android Studio 中运行你的 Android 应用。应用应该会从开发服务器加载 JavaScript/TypeScript 代码并将其显示在 Activity 的 React Native Fragment 中。

你的应用应该如下所示：

![Screenshot](/docs/assets/EmbeddedAppAndroidFragmentVideo.gif)
