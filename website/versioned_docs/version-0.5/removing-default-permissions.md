---
id: version-0.5-removing-default-permissions
title: Removing Default Permissions
original_id: removing-default-permissions
---

By default, some permissions are added to your Android APK.

The default permissions that get added are:

- android.permission.INTERNET - Required for debug mode.
- android.permission.SYSTEM_ALERT_WINDOW - Required for debug mode.
- android.permission.READ_PHONE_STATE - Not required for debug or production.
- android.permission.WRITE_EXTERNAL_STORAGE - Not required for debug or production.
- android.permission.READ_EXTERNAL_STORAGE - Not required for debug or production.

1. Let's start by removing `READ_PHONE_STATE`, `WRITE_EXTERNAL_STORAGE`, and `READ_EXTERNAL_STORAGE` from both production and debug APKs, as it is not required in either. These storage permissions are still not needed if `AsyncStorage` module is in use, so it is safe to remove from both production and debug.
2. Open your `android/app/src/main/AndroidManifest.xml` file.
3. Even though these three permissions are not listed in the manifest they get added in. We add the three permissions with `tools:node="remove"` attribute, to make sure it gets removed during build. Note that the package identifier will be different, for below it is "com.myapp" because the project was created with `react-native init myapp`.

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

4. Now let's remove `SYSTEM_ALERT_WINDOW` from the production APK only.
5. Go to the `android/app/src/` directory. Create a new directory inside this directory, called `release`. (path: `android/app/src/release/`)
6. Inside this `android/app/src/release/` directory create a `AndroidManifest.xml` file. (path: `android/app/src/release/AndroidManifest.xml`)
7. Inside this file paste the following contents. Note, make sure to update your package identifier from "com.myapp" to what yours is.

   ```diff
   <manifest xmlns:android="http://schemas.android.com/apk/res/android"
       package="com.myapp"
       xmlns:tools="http://schemas.android.com/tools">

       <uses-permission tools:node="remove" android:name="android.permission.SYSTEM_ALERT_WINDOW" />

   </manifest>
   ```

That's it. We did not remove the `INTERNET` permission as pretty much all apps use it. Now whenever you create a production APK all these 4 permissions will be removed. When you create a debug APK (`react-native run-android`) it will install the APK with only the three permissions removed, and `SYSTEM_ALERT_WINDOW` will remain.
