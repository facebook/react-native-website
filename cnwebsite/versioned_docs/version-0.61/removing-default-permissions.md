---
id: version-0.61-removing-default-permissions
title: 移除不需要的权限
original_id: removing-default-permissions
---

##### 本文档贡献者：[sunnylqm](https://github.com/search?q=sunnylqm%40qq.com+in%3Aemail&type=Users)(93.10%), [not.committed.yet](https://github.com/search?q=not.committed.yet+in%3Aemail&type=Users)(6.90%)

默认情况下我们会给最终打包的 APK 加入一些权限申请，具体如下：

- android.permission.INTERNET - 调试模式所需。
- android.permission.SYSTEM_ALERT_WINDOW - 调试模式所需。
- android.permission.READ_PHONE_STATE - 非必需。
- android.permission.WRITE_EXTERNAL_STORAGE - 非必需。
- android.permission.READ_EXTERNAL_STORAGE - 非必需。

这些权限申请会在用户安装或运行时弹出提示打断用户甚至使用户感到反感，所以我们应该尽量移除不必要的权限申请，以改进用户体验和提升用户好感。

1.  我们首先可以考虑移除`READ_PHONE_STATE`、`WRITE_EXTERNAL_STORAGE`和 `READ_EXTERNAL_STORAGE`三项非必需的权限。即便你使用了`AsyncStorage`也不需要这三个权限，所以移除是很安全的。当你以后需要使用时，还可以再加回来。
2.  打开`android/app/src/main/AndroidManifest.xml`文件。
3.  Even though these three permissions are not listed in the manifest they get added in. We add the three permissions with `tools:node="remove"` attribute, to make sure it gets removed during build. Note that the package identifier will be different, for below it is "com.myapp" because the project was created with `react-native init myapp`.

    ```diff
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.myappid"
    +   xmlns:tools="http://schemas.android.com/tools"
        >

        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
    +   <uses-permission tools:node="remove" android:name="android.permission.READ_PHONE_STATE" />
    +   <uses-permission tools:node="remove" android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
    +   <uses-permission tools:node="remove" android:name="android.permission.READ_EXTERNAL_STORAGE" />

        <application
          android:name=".MainApplication"
          android:label="@string/app_name"
          android:icon="@mipmap/ic_launcher"
          android:allowBackup="false"
          android:theme="@style/AppTheme">
          <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
            android:configChanges="keyboard|keyboardHidden|orientation|screenSize"
            android:windowSoftInputMode="adjustResize">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
          </activity>
          <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
        </application>

    </manifest>
    ```

That's it. We did not remove the `INTERNET` permission as pretty much all apps use it. Now whenever you create a production APK all these 4 permissions will be removed. When you create a debug APK (`react-native run-android`) it will install the APK with all four permissions removed.

## Hint
If your App is free to use in the App-Store and there is no "In-App-Purchase" possible in your App, you also can remove: 
    - android.vending.CHECK_LICENSE