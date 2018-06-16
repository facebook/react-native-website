---
id: splash-screen-android
title: Splash Screen
---

There are a few ways to do splash screens. This shows one of the simpler and more effective ways. We will set a background color on the splash, and also center an image. Optional notes on how to set status bar coloring while in the splash screen is also shown.

1. **Create a custom color** - We have to first create a color we can reference. In the `./android/app/src/main/res/values/` directory create a file called `colors.xml` and populate it with this contents:
  
    ```
    <?xml version="1.0" encoding="utf-8"?>
    <resources>
      <color name="foobar">#00ff00</color>
    </resources>
    ```
  
    You can use any hex in place of `#00ff00` and can name the color anything in place of `foobar`. For this guide we will be leaving it at this, it is green.

2. **Create drawable directory** - We will need to place some assets in a special folder. Create a directory in `./android/app/src/main/res/` called `drawable`.

3. **Add image of logo** - To this newly created "drawable" directory add an image. For example we can add `myimg.png` to `./android/app/src/main/res/drawable/myimg.png`.

4. **Create layout file** - We now layout what our splash screen should look like. We want it to have the color `foobar` and lets place a centered logo image. Create a file called `splash_screen.xml` in this "drawable" directory. (Final path of file is: `./android/app/src/main/res/drawable/splash_screen.xml`). Populate this file with the following contents:

    ```
    <?xml version="1.0" encoding="utf-8"?>
    <layer-list xmlns:android="http://schemas.android.com/apk/res/android">

        <item android:drawable="@color/foobar" />

        <item>
            <bitmap android:gravity="center" android:src="@drawable/myimg" />
        </item>

    </layer-list>
    ```
    
    The bitmap here centers our image, and the `android:src` is `@drawable/` followed by our image file name *without* the image extension.  
    
5. **Update styles.xml** - Update the `styles.xml` file located at `./android/app/src/main/res/values/styles.xml`. Add the following lines:

    ```diff
    <resources>

        <!-- Base application theme. -->
        <style name="AppTheme" parent="Theme.AppCompat.Light.NoActionBar">
            <!-- Customize your theme here. -->
        </style>

    +    <style name="SplashTheme" parent="AppTheme">
    +        <item name="android:windowBackground">@drawable/splash_screen</item>
    +    </style>

    </resources>
    ```
    
6. **Update AndroidManifest.xml** - Open `./android/app/src/main/AndroidManifest.xml` and change the `android:theme` from `@style/AppTheme` to `@style/SplashTheme` in `MainActivity`:

    ```diff
    <manifest xmlns:android="http://schemas.android.com/apk/res/android"
        package="com.trustedscore"
        xmlns:tools="http://schemas.android.com/tools">

        <uses-permission android:name="android.permission.INTERNET" />
        <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
        <uses-permission tools:node="remove" android:name="android.permission.READ_PHONE_STATE" />

        <application
          android:name=".MainApplication"
          android:label="@string/app_name"
          android:icon="@mipmap/ic_launcher"
          android:allowBackup="false"
    -      android:theme="@style/AppTheme">
    +      android:theme="@style/SplashTheme">
          <activity
            android:name=".MainActivity"
            android:label="@string/app_name"
    ```
