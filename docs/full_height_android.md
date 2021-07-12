---
id: full-height-android
title: Full height
---

By default, React Native Android apps will not render your app below the Status Bar or Navigation bar. You still can use `<StatusBar translucent />` to work around it, but may face some issues when rotating.
For a better experience, follows:

Add to your main activity:
```java
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    resetWindowConfiguration();
    super.onCreate(savedInstanceState);
  }

  @Override
  protected void onResume() {
    resetWindowConfiguration();
    super.onResume();
  }

  @Override
  protected void onRestart() {
    resetWindowConfiguration();
    super.onRestart();
  }

  private void resetWindowConfiguration() {
    int decorViewVisibility = getWindow().getDecorView().getSystemUiVisibility();

    decorViewVisibility |= View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN;
    decorViewVisibility |= View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION;
    decorViewVisibility |= View.SYSTEM_UI_FLAG_LAYOUT_STABLE;
    
    getWindow().getDecorView().setSystemUiVisibility(decorViewVisibility);
  }
```

Then, in your `styles.xml` add:

```xml
    <item name="android:statusBarColor">@android:color/transparent</item>
    <item name="android:navigationBarColor">@android:color/transparent</item>
    <item name="android:navigationBarDividerColor">@android:color/transparent</item>
    <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
    <item name="android:enforceStatusBarContrast">false</item>
    <item name="android:enforceNavigationBarContrast">false</item>
    <item name="android:windowLightNavigationBar">false</item> <!-- true if you have light background -->
    <item name="android:windowLightStatusBar">false</item> <!-- true if you have light background -->
```

> You will have to break these rules in specific files for `v29`, `v27`, `v23`. Just paste it in `styles.xml` and `Android Studio` will help you out. Or see below.

With that, your app will render both below the `StatusBar` and `NavigationBar`.

You may use `SafeAreaView` to handle the spaces properly when needed.

You should also check out:

- [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)
- [React Native Navigation Bar Color](https://github.com/thebylito/react-native-navigation-bar-color)

---

Follows how your styles files should look like:

v29/styles.xml
```xml
<resources>
  <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
    <!-- ... -->
    <item name="android:statusBarColor">@android:color/transparent</item>
    <item name="android:navigationBarColor">@android:color/transparent</item>
    <item name="android:navigationBarDividerColor">@android:color/transparent</item>
    <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
    <item name="android:enforceStatusBarContrast">false</item>
    <item name="android:enforceNavigationBarContrast">false</item>
    <item name="android:windowLightNavigationBar">false</item> <!-- true if you have light background -->
    <item name="android:windowLightStatusBar">false</item> <!-- true if you have light background -->
  </style>
</resources>
```

v27/styles.xml
```xml
<resources>
  <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
    <!-- ... -->
    <item name="android:statusBarColor">@android:color/transparent</item>
    <item name="android:navigationBarColor">@android:color/transparent</item>
    <item name="android:navigationBarDividerColor">@android:color/transparent</item>
    <item name="android:windowLayoutInDisplayCutoutMode">shortEdges</item>
    <item name="android:windowLightNavigationBar">false</item> <!-- true if you have light background -->
    <item name="android:windowLightStatusBar">false</item> <!-- true if you have light background -->
  </style>
</resources>
```

v23/styles.xml
```xml
<resources>
  <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
    <!-- ... -->
    <item name="android:statusBarColor">@android:color/transparent</item>
    <item name="android:navigationBarColor">@android:color/transparent</item>
    <item name="android:windowLightStatusBar">false</item> <!-- true if you have light background -->
  </style>
</resources>
```

styles.xml
```xml
<resources>
  <style name="AppTheme" parent="Theme.AppCompat.DayNight.NoActionBar">
    <!-- ... -->
    <item name="android:statusBarColor">@android:color/transparent</item>
    <item name="android:navigationBarColor">@android:color/transparent</item>
  </style>
</resources>
```
