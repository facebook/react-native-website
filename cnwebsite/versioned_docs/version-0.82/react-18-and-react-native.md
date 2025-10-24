---
id: react-18-and-react-native
title: React 18 与 React Native
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';
import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

这个页面描述了如何在 React Native 的新架构中启用 React 18 版本。

> **简而言之：** 第一个和 React 18 兼容的 React Native 版本是 **0.69.0**。但要想完整享受到 React 18 中的新特性（如自动批量变更状态，`startTransition`以及`useDeferredValue`等），你必须在应用中启用新架构。

## React 18 与 React Native 的新架构

React 18 引入了 [多个全新特性](https://reactjs.org/blog/2022/03/29/react-v18.html)：

- 自动批量变更状态 (Automatic batching)
- 新的严格模式 (Strict Mode)
- 新的 hooks (`useId`, `useSyncExternalStore`)

同时也包含了一些新的并发特性：

- `startTransition`
- `useTransition`
- `useDeferredValue`
- 完整的 Suspense 特性支持

React 18 中的并发功能是建立在新的并发渲染引擎之上的。并发渲染是一种新的幕后机制，使得 React 能够同时准备多个版本的用户界面。

之前的 React Native 版本基于旧架构，**无法**支持并发渲染或并发功能。这是因为旧架构依赖于对原生树进行变异，这不允许 React 同时准备多个树版本。

幸运的是，新架构从底层开始编写时就考虑了并发渲染，并且与 React 18 完全兼容。这意味着要将您的 React Native 应用程序升级到 React 18，您需要将应用程序迁移到包括 Fabric Native 组件和 Turbo Native 模块在内的 React Native 新架构中。

## 默认启用 React 18

从 React Native 0.69 开始，在启用新架构时，默认情况下会启用 React 18。

这意味着只要您进行迁移，即可立即使用 React 18 中的新功能。由于通过使用`startTransition`或`Suspense`等特性来选择加入并发特性，我们预计对于迁移到新架构或创建启用了新架构的新应用程序用户而言，React 18 将可以直接使用，并且只需进行最少量更改即可。

但如果遇到任何问题，我们提供了一个选择来退出 React 18 的新根。退出意味着您的应用程序将以 React 17 模式运行，并且无法访问 React 18 的任何功能。

### 在 Android 上禁用 React 18

在 Android 上，您可以在 ActivityDelegate（位于`MainActivity`文件中）中覆盖 `isConcurrentRootEnabled` ，从而启用/禁用并发 React。

<Tabs groupId="android-language" queryString defaultValue={constants.defaultAndroidLanguage} values={constants.androidLanguages}>

<TabItem value="java">

```diff
public class MainActivity extends ReactActivity {

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

+   @Override
+   protected boolean isConcurrentRootEnabled() {
+     // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
+     // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
+     return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
+   }
  }
}
```

</TabItem>

<TabItem value="kotlin">

```diff
class MainActivity : ReactActivity() {

    open class MainActivityDelegate(activity: ReactActivity?, mainComponentName: String?) : ReactActivityDelegate(activity, mainComponentName) {
        override fun createRootView(): ReactRootView = ReactRootView(context).apply {
            // If you opted-in for the New Architecture, we enable the Fabric Renderer.
            setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED)
        }

+       // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
+       // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
+       override fun isConcurrentRootEnabled() = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
    }
}
```

</TabItem>
</Tabs>

### 在 iOS 上禁用 React 18

在 iOS 上，您可以在`AppDelegate.mm`文件中访问`concurrentRootEnabled`方法。您应该将返回值更改为`false`(或者 `NO`)以禁用此功能。

```objc
/// This method controls whether the `concurrentRoot`feature of React18 is turned on or off.
///
/// @see: https://reactjs.org/blog/2022/03/29/react-v18.html
/// @note: This requires to be rendering on Fabric (i.e. on the New Architecture).
/// @return: `true` if the `concurrentRoot` feature is enabled. Otherwise, it returns `false`.
- (BOOL)concurrentRootEnabled
{
  // Switch this bool to turn on and off the concurrent root
  return true;
}
```

### 尚未迁移到新架构的 React Native 0.69 用户

注意：如果您使用的是 React Native 0.69 版本，但仍然使用旧架构，则即使在`package.json`文件中安装了 React 18，您的应用程序仍将继续使用 React 17 模式。

覆盖`isConcurrentRootEnabled`方法对您的应用程序没有任何影响。
