---
id: new-architecture-app-renderer-android
title: Enabling Fabric on Android
---

:::caution

This documentation is still **experimental** and details are subject to changes as we iterate. Feel free to share your feedback on the [react-native-website PR](https://github.com/facebook/react-native-website) for this page.

Moreover, it contains several **manual steps**. Please note that this won't be representative of the final developer experience once the New Architecture is stable. We're working on tools, templates and libraries to help you get started fast on the New Architecture, without having to go through the whole setup.

:::

Make sure your application meets all the [prerequisites](new-architecture-app-intro).

## 1. Provide a `JSIModulePackage` inside your `ReactNativeHost`

In order to enable Fabric in your app, you would need to add a `JSIModulePackage` inside your `ReactNativeHost`. If you followed the TurboModule section of this guide, you probably already know where to find your `ReactNativeHost`. If not, you can locate your `ReactNativeHost` by searching for the `getReactNativeHost()`. The `ReactNativeHost` is usually located inside your `Application` class.

Once you located it, you need to add the `getJSIModulePackage` method as from the snippet below:

```diff title='MyApplication.java'
public class MyApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
    new ReactNativeHost(this) {

+     @Nullable
+     @Override
+     protected JSIModulePackage getJSIModulePackage() {
+       return new JSIModulePackage() {
+         @Override
+         public List<JSIModuleSpec> getJSIModules(
+             final ReactApplicationContext reactApplicationContext,
+             final JavaScriptContextHolder jsContext) {
+           final List<JSIModuleSpec> specs = new ArrayList<>();
+           specs.add(new JSIModuleSpec() {
+             @Override
+             public JSIModuleType getJSIModuleType() {
+               return JSIModuleType.UIManager;
+             }
+
+             @Override
+             public JSIModuleProvider<UIManager> getJSIModuleProvider() {
+               final ComponentFactory componentFactory = new ComponentFactory();
+               CoreComponentsRegistry.register(componentFactory);
+               final ReactInstanceManager reactInstanceManager = getReactInstanceManager();
+
+               ViewManagerRegistry viewManagerRegistry =
+                   new ViewManagerRegistry(
+                       reactInstanceManager.getOrCreateViewManagers(
+                           reactApplicationContext));
+
+               return new FabricJSIModuleProvider(
+                   reactApplicationContext,
+                   componentFactory,
+                   new EmptyReactNativeConfig(),
+                   viewManagerRegistry);
+             }
+           });
+           return specs;
+         }
+       };
+     }
    };
}
```

## 2. Make sure your call `setIsFabric` on your Activity’s `ReactRootView`

Inside your `Activity` class, you need to make sure you’re calling `setIsFabric` on the `ReactRootView`.
If you don’t have a `ReactActivityDelegate` you might need to create one.

```diff title='MainActivity.java'
public class MainActivity extends ReactActivity {

  // Add the Activity Delegate, if you don't have one already.
+ public static class MainActivityDelegate extends ReactActivityDelegate {
+
+   public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
+     super(activity, mainComponentName);
+   }
+
+   @Override
+   protected ReactRootView createRootView() {
+     ReactRootView reactRootView = new ReactRootView(getContext());
+
+     // Make sure to call setIsFabric(true) on your ReactRootView
+     reactRootView.setIsFabric(true);
+     return reactRootView;
+   }
+ }

  // Make sure to override the `createReactActivityDelegate()` method.
+ @Override
+ protected ReactActivityDelegate createReactActivityDelegate() {
+   return new MainActivityDelegate(this, getMainComponentName());
+ }
}
```

The crucial part in this code is the `reactRootView.setIsFabric(true)` which will enable the new renderer for this Activity.

You can now verify that everything works correctly by running your android app:

```bash
yarn react-native run-android
```

In your Metro terminal log, you will now see the following log to confirm that Fabric is running correctly:

```
BUNDLE ./App.js
LOG Running "App" with {"fabric":true,"initialProps":{},"rootTag":1}
```

## Migrating Android ViewManagers

First, make sure you followed the instructions to [Enabling the New Renderer (Fabric) in Your Android Application](#enabling-the-new-renderer-fabric-in-your-android-application). Plus we will also assume that you followed the instructions from [Enabling the New NativeModule System (TurboModule) in Your Android Application](#enabling-the-new-nativemodule-system-turbomodule-in-your-android-application) as the Makefile (`Android.mk`) and other native builds setup steps are presented over there and won’t be repeated here.

### JavaScript changes

1. Make sure your other JS changes are ready to go by following Preparing your JavaScript codebase for the new React Native Renderer (Fabric)
2. Replace the call to `requireNativeComponent` with `codegenNativeComponent`. This tells the JS codegen to start generating the native implementation of the component, consisting of C++ and Java classes. This is how it looks for the WebView component:

```ts
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

// babel-plugin-codegen will replace the function call to use NativeComponentRegistry
// 'RCTWebView' is interopped by RCTFabricComponentsPlugins

export default (codegenNativeComponent<NativeProps>(
  'RCTWebView',
): HostComponent<NativeProps>);
```

4. **[Flow users]** Make sure your native component has Flow types for its props, since the JS codegen uses these types to generate the type-safe native implementation of the component. The codegen generates C++ classes during the build time, which guarantees that the native implementation is always up-to-date with its JS interface. Use [these c++ compatible types](https://github.com/facebook/react-native/blob/main/Libraries/Types/CodegenTypes.js#L28-L30).

```ts title="RNTMyNativeViewNativeComponent.js"
import type {Int32} from 'react-native/Libraries/Types/CodegenTypes';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';
import type {HostComponent} from 'react-native';
import type {ViewProps} from 'react-native/Libraries/Components/View/ViewPropTypes';

type NativeProps = $ReadOnly<{|
  ...ViewProps, // This is required.
  someNumber: Int32,
|}>;

[...]

export default (codegenNativeComponent<NativeProps>(
  'RNTMyNativeView',
): HostComponent<NativeProps>);
```

5. **[TypeScript users]** We are currently investigating a support for TypeScript.

### Native/Java Changes

1. **Update (or Create) your ViewManager to use the generated classes from the Codegen.**

Specifically you will have to implement the generated **ViewManagerInterface** and to pass events to the generated **ViewManagerDelegate.**
Your ViewManager could follow this structure. The MyNativeView class in this example is an Android View implementation (like a subclass of LinearLayout, Button, TextView, etc.)

```java title='MyNativeViewManager.java'
// View manager for MyNativeView components.
@ReactModule(name = MyNativeViewManager.REACT_CLASS)
public class MyNativeViewManager extends SimpleViewManager<MyNativeView>
        implements RNTMyNativeViewManagerInterface<MyNativeView> {

  public static final String REACT_CLASS = "RNTMyNativeView";

  private final ViewManagerDelegate<MyNativeView> mDelegate;

  public MyNativeViewManager() {
    mDelegate = new RNTMyNativeViewManagerDelegate<>(this);
  }

  @Nullable
  @Override
  protected ViewManagerDelegate<MyNativeView> getDelegate() {
    return mDelegate;
  }

  @NonNull
  @Override
  public String getName() {
    return REACT_CLASS;
  }

  @NonNull
  @Override
  protected MyNativeView createViewInstance(@NonNull ThemedReactContext reactContext) {
    return new MyNativeView(reactContext);
  }
}
```

1. **Add your ViewManager to one of the Packages loaded by your Application.**

Specifically inside the `ReactNativeHost` , update `getPackages` method to include the following:

```diff title='MyApplication.java'
public class MyApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() { /* ... */ }

    @Override
    protected List<ReactPackage> getPackages() {
      List<ReactPackage> packages = new PackageList(this).getPackages();

      // ... other packages or `TurboReactPackage added` here...

      // Add those lines.
+     packages.add(new ReactPackage() {
+       @NonNull
+       @Override
+       public List<NativeModule> createNativeModules(
+           @NonNull ReactApplicationContext reactContext) {
+         return Collections.emptyList();
+       }
+
+       @NonNull
+       @Override
+       public List<ViewManager> createViewManagers(
+           @NonNull ReactApplicationContext reactContext) {
+         // Your ViewManager is returned here.
+         return Collections.singletonList(new MyNativeViewManager());
+       }
+     });
      return packages;
    }
  };
}
```

3. **Add a Fabric Component Registry**

You need to create a new component Registry that will allow you to **register** your components to be discovered by Fabric. Let’s create the `MyComponentsRegistry` file with the following content.

As you can see, some methods are `native()` which we will implement in C++ in the following paragraph.

```java title='MyComponentsRegistry.java'
package com.awesomeproject;

import com.facebook.jni.HybridData;
import com.facebook.proguard.annotations.DoNotStrip;
import com.facebook.react.fabric.ComponentFactory;
import com.facebook.soloader.SoLoader;

@DoNotStrip
public class MyComponentsRegistry {
  static {
    SoLoader.loadLibrary("fabricjni");
  }

  @DoNotStrip private final HybridData mHybridData;

  @DoNotStrip
  private native HybridData initHybrid(ComponentFactory componentFactory);

  @DoNotStrip
  private MyComponentsRegistry(ComponentFactory componentFactory) {
    mHybridData = initHybrid(componentFactory);
  }

  @DoNotStrip
  public static MyComponentsRegistry register(ComponentFactory componentFactory) {
    return new MyComponentsRegistry(componentFactory);
  }
}
```

4. **Register your custom Fabric Component Registry**

Finally, let’s edit the `getJSIModulePackage` from the `ReactNativeHost` to also register your Component Registry alongside the Core one:

```diff title='MyApplication.java'
public class MyApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Nullable
    @Override
    protected JSIModulePackage getJSIModulePackage() {
      return new JSIModulePackage() {
        @Override
        public List<JSIModuleSpec> getJSIModules(
                final ReactApplicationContext reactApplicationContext,
                final JavaScriptContextHolder jsContext) {
          final List<JSIModuleSpec> specs = new ArrayList<>();
          specs.add(new JSIModuleSpec() {

            @Override
            public JSIModuleProvider<UIManager> getJSIModuleProvider() {
              final ComponentFactory componentFactory = new ComponentFactory();
              CoreComponentsRegistry.register(componentFactory);

+             // Add this line just below CoreComponentsRegistry.register
+             MyComponentsRegistry.register(componentFactory);
            }
          });
          return specs;
        }
      };
    }
  };
}
```

### Native/C++ Changes

It’s now time to provide an implementation for your `MyComponentsRegistry` in C++:

1. **Create a header file: `MyComponentsRegistry.h`**

The file should be placed inside the `src/main/jni` folder.
Please note that the `kJavaDescriptor` should be adapted to follow the package name you picked for your project.

```cpp title="MyComponentsRegistry.h"
#pragma once

#include <ComponentFactory.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <react/renderer/componentregistry/ComponentDescriptorRegistry.h>

namespace facebook {
namespace react {

class MyComponentsRegistry
    : public facebook::jni::HybridClass<MyComponentsRegistry> {
  public:
  constexpr static auto kJavaDescriptor =
      "Lcom/awesomeproject/MyComponentsRegistry;";

  static void registerNatives();

  MyComponentsRegistry(ComponentFactory *delegate);

  private:
  friend HybridBase;

  static std::shared_ptr<ComponentDescriptorProviderRegistry const>
  sharedProviderRegistry();

  const ComponentFactory *delegate_;

  static jni::local_ref<jhybriddata> initHybrid(
      jni::alias_ref<jclass>,
      ComponentFactory *delegate);
};

} // namespace react
} // namespace facebook
```

2. **Create an implementation file: `MyComponentsRegistry.cpp`**

The file should be placed inside the `src/main/jni` folder alongside `MyComponentsRegistry.h

```cpp title="MyComponentsRegistry.cpp"
#include "MyComponentsRegistry.h"

#include <CoreComponentsRegistry.h>
#include <fbjni/fbjni.h>
#include <react/renderer/componentregistry/ComponentDescriptorProviderRegistry.h>
#include <react/renderer/components/rncore/ComponentDescriptors.h>
#include <react/renderer/components/samplelibrary/ComponentDescriptors.h>

namespace facebook {
namespace react {

MyComponentsRegistry::MyComponentsRegistry(
    ComponentFactory *delegate)
    : delegate_(delegate) {}

std::shared_ptr<ComponentDescriptorProviderRegistry const>
MyComponentsRegistry::sharedProviderRegistry() {
  auto providerRegistry = CoreComponentsRegistry::sharedProviderRegistry();

  providerRegistry->add(concreteComponentDescriptorProvider<
                        RNTMyNativeViewComponentDescriptor>());

  return providerRegistry;
}

jni::local_ref<MyComponentsRegistry::jhybriddata>
MyComponentsRegistry::initHybrid(
    jni::alias_ref<jclass>,
    ComponentFactory *delegate) {
  auto instance = makeCxxInstance(delegate);

  auto buildRegistryFunction =
      [](EventDispatcher::Weak const &eventDispatcher,
          ContextContainer::Shared const &contextContainer)
      -> ComponentDescriptorRegistry::Shared {
    auto registry = MyComponentsRegistry::sharedProviderRegistry()
                        ->createComponentDescriptorRegistry(
                            {eventDispatcher, contextContainer});

    auto mutableRegistry =
        std::const_pointer_cast<ComponentDescriptorRegistry>(registry);

    mutableRegistry->setFallbackComponentDescriptor(
        std::make_shared<UnimplementedNativeViewComponentDescriptor>(
            ComponentDescriptorParameters{
                eventDispatcher, contextContainer, nullptr}));

    return registry;
  };

  delegate->buildRegistryFunction = buildRegistryFunction;
  return instance;
}

void MyComponentsRegistry::registerNatives() {
  registerHybrid({
      makeNativeMethod("initHybrid", MyComponentsRegistry::initHybrid),
  });
}

} // namespace react
} // namespace facebook
```

4. **Load your file in the OnLoad.cpp**

If you followed the TurboModule instructions, you should have a `OnLoad.cpp` file inside the `src/main/jni` folder. There you should add a line to load the `MyComponentsRegistry` class:

```diff title="OnLoad.cpp"
 #include <fbjni/fbjni.h>
 #include "MyApplicationTurboModuleManagerDelegate.h"
+#include "MyComponentsRegistry.h"

 JNIEXPORT jint JNICALL JNI_OnLoad(JavaVM *vm, void *) {
   return facebook::jni::initialize(vm, [] {
     facebook::react::MyApplicationTurboModuleManagerDelegate::registerNatives();

+    facebook::react::MyComponentsRegistry::registerNatives();
   });
 }
```

You can now verify that everything works correctly by running your android app:

```bash
yarn react-native run-android
```
