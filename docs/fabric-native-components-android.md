---
id: fabric-native-components-android
title: 'Fabric Native Modules: Android'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native uses Gradle to manage dependencies, auto-linking and codegen. To use this, we're going to add the `RTNCenteredText` Fabric Native Component to our `Demo` application.

### 1. Run Codegen through Gradle

Run this once to generate boilerplate that your IDE of choice can use.

```bash title="Demo/"
cd android
./gradlew generateCodegenArtifactsFromSchema
```

### 2. Write your Native Platform Code

At the end of this, you'll have the following Android Code:

```text title="Demo/"
android
├── build.gradle[.kts]
└── src
    └── main
        └── java
            └── com
                └── rtncenteredtext
                    ├── CenteredText.{kt,java]
                    ├── CenteredTextManager.{kt,java}
                    └── CenteredTextPackage.{kt,java}
```

Create your directories:

```bash title="Demo/"
mkdir -p android/src/main/java/com/rtncenteredtext
```

#### build.gradle(.kts)

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="Demo/RTNCenteredText/android/build.gradle"
buildscript {
  ext.safeExtGet = {prop, fallback ->
    rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
  }
  repositories {
    google()
    gradlePluginPortal()
  }
  dependencies {
    classpath("com.android.tools.build:gradle:8.7.1")
  }
}

apply plugin: 'com.android.library'
apply plugin: 'com.facebook.react'

android {
  compileSdkVersion safeExtGet('compileSdkVersion', 35)
  namespace "com.rtncenteredtext"

  defaultConfig {
    minSdkVersion safeExtGet('minSdkVersion', 24)
  }
}

repositories {
  mavenCentral()
  google()
}

dependencies {
  implementation 'com.facebook.react:react-native'
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="Demo/RTNCenteredText/android/build.gradle.kts"
import org.gradle.api.Project

fun Project.safeExtGet(prop: String, defaultValue: Any): Any? = if (rootProject.ext.has(prop)) rootProject.extra.get(prop) else defaultValue

buildscript {
  repositories {
    google()
    mavenCentral()
    gradlePluginPortal()
  }
  dependencies {
    classpath("com.android.tools.build:gradle:8.7.1")
    classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:2.0.21")
  }
}

plugins {
  id("com.android.library")
  id("kotlin-android")
  id("com.facebook.react")
}

android {
  compileSdk = safeExtGet("compileSdkVersion", 35) as Int
  namespace = "com.rtncenteredtext"

  defaultConfig {
    minSdk = safeExtGet("minSdkVersion", 24) as Int
  }
}

repositories {
  mavenCentral()
  google()
}

dependencies {
  implementation(kotlin("stdlib"))
  implementation("com.facebook.react:react-native")
}
```

</TabItem>
</Tabs>

#### CenteredText

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="Demo/RTNCenteredText/android/src/main/java/com/rtncenteredtext/CenteredText.java"
package com.rtncenteredtext;

import android.content.Context;
import android.graphics.Color;
import android.util.AttributeSet;
import android.view.Gravity;
import android.widget.TextView;

public class CenteredText extends TextView {
  public CenteredText(Context context) {
    super(context);
    configureComponent();
  }

  public CenteredText(Context context, AttributeSet attrs) {
    super(context, attrs);
    configureComponent();
  }

  public CenteredText(Context context, AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
    configureComponent();
  }

  // highlight-start
  private void configureComponent() {
    // Light blue
    setBackgroundColor(Color.argb(255, 182, 216, 227));
    setGravity(Gravity.CENTER);
  }
  // highlight-end
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="Demo/RTNCenteredText/android/src/main/java/com/rtncenteredtext/CenteredText.kt"
package com.rtncenteredtext;

import android.content.Context
import android.graphics.Color
import android.util.AttributeSet
import android.view.Gravity
import android.widget.TextView

class CenteredText : TextView {
  constructor(context: Context?) : super(context) {
    configureComponent()
  }

  constructor(context: Context?, attrs: AttributeSet?) : super(context, attrs) {
    configureComponent()
  }

  constructor(context: Context?, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr) {
    configureComponent()
  }

  // highlight-start
  private fun configureComponent() {
    // Light blue
    setBackgroundColor(Color.argb(255, 182, 216, 227))
    gravity = Gravity.CENTER
  }
  // highlight-end
}
```

</TabItem>
</Tabs>

#### CenteredTextManager

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="Demo/RTNCenteredText/android/src/main/java/com/rtncenteredtext/CenteredTextManager.java"
package com.rtncenteredtext;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.RTNCenteredTextManagerInterface;
import com.facebook.react.viewmanagers.RTNCenteredTextManagerDelegate;

@ReactModule(name = CenteredTextManager.REACT_CLASS)
public class CenteredTextManager extends SimpleViewManager<CenteredText> implements RTNCenteredTextManagerInterface<CenteredText> {
  private final RTNCenteredTextManagerDelegate<CenteredText, CenteredTextManager> delegate =
          new RTNCenteredTextManagerDelegate<>(this);

  @Override
  public ViewManagerDelegate<CenteredText> getDelegate() {
    return delegate;
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public CenteredText createViewInstance(ThemedReactContext context) {
    return new CenteredText(context);
  }

  @ReactProp(name = "text")
  @Override
  public void setText(CenteredText view, String text) {
    view.setText(text);
  }

  public static final String REACT_CLASS = "RTNCenteredText";
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="Demo/RTNCenteredText/android/src/main/java/com/rtncenteredtext/CenteredTextManager.kt"
package com.rtncenteredtext

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.viewmanagers.RTNCenteredTextManagerInterface
import com.facebook.react.viewmanagers.RTNCenteredTextManagerDelegate

@ReactModule(name = CenteredTextManager.REACT_CLASS)
class CenteredTextManager(context: ReactApplicationContext) : SimpleViewManager<CenteredText>(), RTNCenteredTextManagerInterface<CenteredText> {
  private val delegate: RTNCenteredTextManagerDelegate<CenteredText, CenteredTextManager> =
    RTNCenteredTextManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<CenteredText> = delegate

  override fun getName(): String = REACT_CLASS

  override fun createViewInstance(context: ThemedReactContext): CenteredText = CenteredText(context)

  @ReactProp(name = "text")
  override fun setText(view: CenteredText, text: String?) {
    view.text = text
  }

  companion object {
    const val REACT_CLASS = "RTNCenteredText"
  }
}

```

</TabItem>
</Tabs>

#### CenteredTextPackage

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="Demo/RTNCenteredText/android/src/main/java/com/rtncenteredtext/CenteredTextPackage.java"
package com.rtncenteredtext;

import com.facebook.react.TurboReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.model.ReactModuleInfo;
import com.facebook.react.module.model.ReactModuleInfoProvider;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CenteredTextPackage extends TurboReactPackage {
  @Override
  public List<ViewManager<?, ?>> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.singletonList(new CenteredTextManager(reactContext));
  }

  @Override
  public NativeModule getModule(String s, ReactApplicationContext reactApplicationContext) {
    if (CenteredTextManager.REACT_CLASS.equals(s)) {
      return new CenteredTextManager(reactApplicationContext);
    }
    return null;
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return new ReactModuleInfoProvider() {
      @Override
      public Map<String, ReactModuleInfo> get() {
        Map<String, ReactModuleInfo> map = new HashMap<>();
        map.put(CenteredTextManager.REACT_CLASS, new ReactModuleInfo(
                CenteredTextManager.REACT_CLASS,        // name
                CenteredTextManager.REACT_CLASS,        // className
                false,                                  // canOverrideExistingModule
                false,                                  // needsEagerInit
                false,                                  // isCxxModule
                BuildConfig.IS_NEW_ARCHITECTURE_ENABLED // isTurboModule
        ));
        return map;
      }
    };
  }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="Demo/RTNCenteredText/android/src/main/java/com/rtncenteredtext/CenteredTextPackage.kt"
package com.rtncenteredtext

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class CenteredTextPackage : TurboReactPackage() {
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(CenteredTextManager(reactContext))
  }

  override fun getModule(s: String, reactApplicationContext: ReactApplicationContext): NativeModule? {
    when (s) {
      CenteredTextManager.REACT_CLASS -> CenteredTextManager(reactApplicationContext)
    }
    return null
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
    mapOf(CenteredTextManager.REACT_CLASS to ReactModuleInfo(
      _name = CenteredTextManager.REACT_CLASS,
      _className = CenteredTextManager.REACT_CLASS,
      _canOverrideExistingModule = false,
      _needsEagerInit = false,
      isCxxModule = false,
      isTurboModule = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
    )
    )
  }
}
```

</TabItem>
</Tabs>
