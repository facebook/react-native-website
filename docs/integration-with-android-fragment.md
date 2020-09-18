---
id: integration-with-existing-apps
title: Integration with an Android Fragment
---

The guide for [Integration with Existing Apps](https://reactnative.dev/docs/integration-with-existing-apps) details how to integrate a full-screen React Native app into an existing Android app as an Activity. To use React Native components within Fragments in an existing app requires some additional setup. The benefit of this is that it allows for a native app to integrate React Native components alongside native fragments in an Activity.

### 1. Add React Native to your app

Follow the guide for [Integration with Existing Apps](https://reactnative.dev/docs/integration-with-existing-apps) until the Code integration section. Continue to follow Step 1. Create an index.android.js file and Step 2. Add your React Native code from this section.

### 2. Integrating your App with a React Native Fragment

We now need to render our React Native component into a Fragment instead of a full screen React Native Activity. The component may be termed a "screen" or "fragment" and it will function in the same manner as an Android fragment, likely containing child components. These components can be placed in a `/fragments` folder and the child components used to compose the fragment can be placed in a `/components` folder.

We need to implement ReactApplication in our main Application Java class. If you have created a new project from Android Studio with a default activity, you will need to create a new class e.g. MyReactApplication.java. If it is an existing class you can find this main class in your  `AndroidManifest.xml` file. Under the `<application />` tag you should see a property `android:name=".MyReactApplication"`. The value provided is the class you want to add this implementation to and provide the required methods.

Ensure your main Application Java class implements ReactApplication:

```java
public class MyReactApplication extends Application implements ReactApplication {...}
```

Override the required methods `getUseDeveloperSupport`, `getPackages` and `getReactNativeHost`:

```java
public class MyReactApplication extends Application implements ReactApplication {
    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, false);
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
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

If you are using Android Studio, use Alt + Enter to add all missing imports in your class. Alternatively these are the required imports to include manually:

```java
import android.app.Application;

import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.List;
```

Perform a "Sync Project files with Gradle" operation.
