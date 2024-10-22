---
id: fabric-native-components-android
title: 'Fabric Native Modules: Android'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native uses Gradle to manage dependencies, auto-linking and codegen. To use this, we're going to add the `WebView` Fabric Native Component to our `Demo` application.

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
                └── webview
                    ├── ReactWebView.{kt,java]
                    ├── ReactWebViewManager.{kt,java}
                    └── ReactWebViewPackage.{kt,java}
```

Create your directories:

```bash title="Demo/"
mkdir -p android/src/main/java/com/webview
```

#### ReactWebView

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="Demo/android/src/main/java/com/webview/ReactWebView.java"
package com.webview;

import android.content.Context;
import android.util.AttributeSet;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.uimanager.UIManagerHelper;
import com.facebook.react.uimanager.events.Event;

public class ReactWebView extends WebView {
  public ReactWebView(Context context) {
    super(context);
    configureComponent();
  }

  public ReactWebView(Context context, AttributeSet attrs) {
    super(context, attrs);
    configureComponent();
  }

  public ReactWebView(Context context, AttributeSet attrs, int defStyleAttr) {
    super(context, attrs, defStyleAttr);
    configureComponent();
  }

  // highlight-start
  private void configureComponent() {
    this.setLayoutParams(new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
    this.setWebViewClient(new WebViewClient() {
      @Override
      public void onPageFinished(WebView view, String url) {
        emitOnScriptLoaded(OnScriptLoadedEventResult.success);
      }
    });
  }

  public void emitOnScriptLoaded(OnScriptLoadedEventResult result) {
    ReactContext reactContext = (ReactContext) context;
    int surfaceId = UIManagerHelper.getSurfaceId(reactContext);
    EventDispatcher eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, getId());
    WritableMap payload = Arguments.createMap();
    payload.putString("result", result.name());

    OnScriptLoadedEvent event = new OnScriptLoadedEvent(surfaceId, getId(), payload);
    if (eventDispatcher != null) {
      eventDispatcher.dispatchEvent(event);
    }
  }

  public enum OnScriptLoadedEventResult {
    success,
    error
  }

  private class OnScriptLoadedEvent extends Event<OnScriptLoadedEvent> {
    private final WritableMap payload;

    OnScriptLoadedEvent(int surfaceId, int viewId, WritableMap payload) {
      super(surfaceId, viewId);
      this.payload = payload;
    }

    @Override
    public String getEventName() {
      return "onScriptLoaded";
    }

    @Override
    public WritableMap getEventData() {
      return payload;
    }
  }
  // highlight-end
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="Demo/android/src/main/java/com/webview/ReactWebView.kt"
package com.webview

import android.content.Context
import android.util.AttributeSet
import android.webkit.WebView
import android.webkit.WebViewClient
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.bridge.ReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event

class ReactWebView: WebView {
  constructor(context: Context) : super(context) {
    configureComponent()
  }

  constructor(context: Context, attrs: AttributeSet?) : super(context, attrs) {
    configureComponent()
  }

  constructor(context: Context, attrs: AttributeSet?, defStyleAttr: Int) : super(context, attrs, defStyleAttr) {
    configureComponent()
  }

  // highlight-start
  private fun configureComponent() {
    this.layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
    this.webViewClient = object : WebViewClient() {
      override fun onPageFinished(view: WebView, url: String) {
        emitOnScriptLoaded(OnScriptLoadedEventResult.success)
      }
    }
  }

  fun emitOnScriptLoaded(result: OnScriptLoadedEventResult) {
    val reactContext = context as ReactContext
    val surfaceId = UIManagerHelper.getSurfaceId(reactContext)
    val eventDispatcher = UIManagerHelper.getEventDispatcherForReactTag(reactContext, id)
    val payload =
        Arguments.createMap().apply {
          putString("result", result.name)
        }
    val event = OnScriptLoadedEvent(surfaceId, id, payload)

    eventDispatcher?.dispatchEvent(event)
  }

  enum class OnScriptLoadedEventResult() {
    success(),
    error()
  }

  inner class OnScriptLoadedEvent(
      surfaceId: Int,
      viewId: Int,
      private val payload: WritableMap
  ) : Event<OnScriptLoadedEvent>(surfaceId, viewId) {
    override fun getEventName() = "onScriptLoaded"

    override fun getEventData() = payload
  }
  // highlight-end
}
```

</TabItem>
</Tabs>

#### WebViewManager

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="Demo/android/src/main/java/com/webview/ReactWebViewManager.java"
package com.webview;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.CustomWebViewManagerInterface;
import com.facebook.react.viewmanagers.CustomWebViewManagerDelegate;

import java.util.HashMap;
import java.util.Map;

@ReactModule(name = ReactWebViewManager.REACT_CLASS)
class ReactWebViewManager extends SimpleViewManager<ReactWebView> implements CustomWebViewManagerInterface<ReactWebView> {
  private final CustomWebViewManagerDelegate<ReactWebView, ReactWebViewManager> delegate =
          new CustomWebViewManagerDelegate<>(this);

  @Override
  public ViewManagerDelegate<ReactWebView> getDelegate() {
    return delegate;
  }

  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @Override
  public ReactWebView createViewInstance(ThemedReactContext context) {
    return new ReactWebView(context);
  }

  @ReactProp(name = "sourceUrl")
  @Override
  public void setSourceURL(ReactWebView view, String sourceURL) {
    if (sourceURL == null) {
      view.emitOnScriptLoaded(ReactWebView.OnScriptLoadedEventResult.error);
      return;
    }
    view.loadUrl(sourceURL, new HashMap<>());
  }

  public static final String REACT_CLASS = "CustomWebView";

  @Override
  public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
    Map<String, Object> map = new HashMap<>();
    Map<String, Object> bubblingMap = new HashMap<>();
    bubblingMap.put("phasedRegistrationNames", new HashMap<String, String>() {{
      put("bubbled", "onScriptLoaded");
      put("captured", "onScriptLoadedCapture");
    }});
    map.put("onScriptLoaded", bubblingMap);
    return map;
  }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="Demo/android/src/main/java/com/webview/ReactWebViewManager.kt"
package com.webview

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewManagerDelegate;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.viewmanagers.CustomWebViewManagerInterface;
import com.facebook.react.viewmanagers.CustomWebViewManagerDelegate;

@ReactModule(name = ReactWebViewManager.REACT_CLASS)
class ReactWebViewManager(context: ReactApplicationContext) : SimpleViewManager<ReactWebView>(), CustomWebViewManagerInterface<ReactWebView> {
  private val delegate: CustomWebViewManagerDelegate<ReactWebView, ReactWebViewManager> =
    CustomWebViewManagerDelegate(this)

  override fun getDelegate(): ViewManagerDelegate<ReactWebView> = delegate

  override fun getName(): String = REACT_CLASS

  override fun createViewInstance(context: ThemedReactContext): ReactWebView = ReactWebView(context)

  @ReactProp(name = "sourceUrl")
  override fun setSourceURL(view: ReactWebView, sourceURL: String?) {
    if (sourceURL == null) {
      view.emitOnScriptLoaded(ReactWebView.OnScriptLoadedEventResult.error)
      return;
    }
    view.loadUrl(sourceURL, emptyMap())
  }

  companion object {
    const val REACT_CLASS = "CustomWebView"
  }

  override fun getExportedCustomBubblingEventTypeConstants(): Map<String, Any> =
      mapOf(
          "onScriptLoaded" to
              mapOf(
                  "phasedRegistrationNames" to
                      mapOf(
                          "bubbled" to "onScriptLoaded",
                          "captured" to "onScriptLoadedCapture"
                      )))
}
```

</TabItem>
</Tabs>

#### ReactWebViewPackage

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>
<TabItem value="java">

```java title="Demo/android/src/main/java/com/webview/ReactWebViewPackage.java"
package com.webview;

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

public class ReactWebViewPackage extends TurboReactPackage {
  @Override
  public List<ViewManager<?, ?>> createViewManagers(ReactApplicationContext reactContext) {
    return Collections.singletonList(new ReactWebViewManager(reactContext));
  }

  @Override
  public NativeModule getModule(String s, ReactApplicationContext reactApplicationContext) {
    if (ReactWebViewManager.REACT_CLASS.equals(s)) {
      return new ReactWebViewManager(reactApplicationContext);
    }
    return null;
  }

  @Override
  public ReactModuleInfoProvider getReactModuleInfoProvider() {
    return new ReactModuleInfoProvider() {
      @Override
      public Map<String, ReactModuleInfo> get() {
        Map<String, ReactModuleInfo> map = new HashMap<>();
        map.put(ReactWebViewManager.REACT_CLASS, new ReactModuleInfo(
                ReactWebViewManager.REACT_CLASS, // name
                ReactWebViewManager.REACT_CLASS, // className
                false,                           // canOverrideExistingModule
                false,                           // needsEagerInit
                false,                           // isCxxModule
                true                             // isTurboModule
        ));
        return map;
      }
    };
  }
}
```

</TabItem>
<TabItem value="kotlin">

```kotlin title="Demo/android/src/main/java/com/webview/ReactWebView.kt"
package com.webview

import com.facebook.react.TurboReactPackage
import com.facebook.react.bridge.NativeModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.module.model.ReactModuleInfo
import com.facebook.react.module.model.ReactModuleInfoProvider
import com.facebook.react.uimanager.ViewManager

class ReactWebViewPackage : TurboReactPackage() {
  override fun createViewManagers(reactContext: ReactApplicationContext): List<ViewManager<*, *>> {
    return listOf(ReactWebViewManager(reactContext))
  }

  override fun getModule(s: String, reactApplicationContext: ReactApplicationContext): NativeModule? {
    when (s) {
      ReactWebViewManager.REACT_CLASS -> ReactWebViewManager(reactApplicationContext)
    }
    return null
  }

  override fun getReactModuleInfoProvider(): ReactModuleInfoProvider = ReactModuleInfoProvider {
    mapOf(ReactWebViewManager.REACT_CLASS to ReactModuleInfo(
      _name = ReactWebViewManager.REACT_CLASS,
      _className = ReactWebViewManager.REACT_CLASS,
      _canOverrideExistingModule = false,
      _needsEagerInit = false,
      isCxxModule = false,
      isTurboModule = true,
    )
    )
  }
}
```

</TabItem>
</Tabs>

### 3. Make you application aware of the ReactWebViewPackage

```kotlin title="Demo/app/src/main/java/com/demo/MainApplication.kt"
package com.demo

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
// highlight-next-line
import com.webview.ReactWebViewPackage

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost =
      object : DefaultReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
              // highlight-next-line
              add(ReactWebViewPackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

        override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
        override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
      }

  override val reactHost: ReactHost
    get() = getDefaultReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()
    SoLoader.init(this, OpenSourceMergedSoMapping)
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }
  }
}

```
