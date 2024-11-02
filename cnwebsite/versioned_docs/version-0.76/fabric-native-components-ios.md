---
id: fabric-native-components-ios
title: 'Fabric Native Components: iOS'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

现在，是时候编写一些 iOS 平台代码，以便能够渲染 web 视图。以下是需要的步骤：

- 运行 Codegen。
- 编写 `RCTWebView` 的代码
- 在应用中注册 `RCTWebView`

### 1. 运行 Codegen

你可以[手动运行](the-new-architecture/codegen-cli) Codegen，当然直接使用你将要演示组件的应用来完成此操作会更简单。

```bash
cd ios
bundle install
bundle exec pod install
```

重要的是你会看到 Codegen 的日志输出，我们将在 Xcode 中使用它来构建 WebView 原生组件。

:::warning
注意不要将生成的代码提交到你的仓库中。生成的代码与 React Native 的版本相关。使用 npm [peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies) 来约束与 React Native 版本的兼容性。
:::

### 3. 编写 `RCTWebView`

我们需要使用 Xcode 完成以下 **5 步**：

1. 打开 CocoPods 生成的 Xcode workspace 文件：

```bash
cd ios
open Demo.xcworkspace
```

<img class="half-size" alt="Open Xcode Workspace" src="/docs/assets/fabric-native-components/1.webp" />

2. 右键点击应用，选择 <code>New Group</code>，将新组命名为 `WebView`。

<img class="half-size" alt="Right click on app and select New Group" src="/docs/assets/fabric-native-components/2.webp" />

3. 在 `WebView` 组中，创建 <code>New</code>→<code>File from Template</code>。

<img class="half-size" alt="Create a new file using the Cocoa Touch Classs template" src="/docs/assets/fabric-native-components/3.webp" />

4. 使用 <code>Objective-C File</code> 模板，并命名为 <code>RCTWebView</code>。

<img class="half-size" alt="Create an Objective-C RCTWebView class" src="/docs/assets/fabric-native-components/4.webp" />

5. 将 <code>RCTWebView.m</code> 重命名为 <code>RCTWebView.mm</code>，使其成为 Objective-C++ 文件。

```text title="Demo/ios"
Podfile
...
Demo
├── AppDelegate.h
├── AppDelegate.mm
...
// highlight-start
├── RCTWebView.h
├── RCTWebView.mm
// highlight-end
└── main.m
```

创建头文件和实现文件后，可以开始实现它们。

以下是 `RCTWebView.h` 文件的代码，声明了组件接口。

```objc title="Demo/RCTWebView/RTNWebView.h"
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTWebView : RCTViewComponentView

// 你可以在视图中声明你想要访问的原生方法

@end

NS_ASSUME_NONNULL_END
```

这个类定义了一个 `RCTWebView`，它扩展了 `RCTViewComponentView` 类。这是所有原生组件的基础类，由 React Native 提供。

以下是实现文件 (`RCTWebView.mm`) 的代码：

```objc title="Demo/RCTWebView/RCTWebView.mm"
#import "RCTWebView.h"

#import <react/renderer/components/AppSpecs/ComponentDescriptors.h>
#import <react/renderer/components/AppSpecs/EventEmitters.h>
#import <react/renderer/components/AppSpecs/Props.h>
#import <react/renderer/components/AppSpecs/RCTComponentViewHelpers.h>
// highlight-next-line
#import <WebKit/WebKit.h>

using namespace facebook::react;

@interface RCTWebView () <RCTCustomWebViewViewProtocol, WKNavigationDelegate>
@end

@implementation RCTWebView {
  NSURL * _sourceURL;
  WKWebView * _webView;
}

-(instancetype)init
{
  if(self = [super init]) {
    // highlight-start
    _webView = [WKWebView new];
    _webView.navigationDelegate = self;
    [self addSubview:_webView];
    // highlight-end
  }
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<CustomWebViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<CustomWebViewProps const>(props);

  // Handle your props here
  if (oldViewProps.sourceURL != newViewProps.sourceURL) {
    NSString *urlString = [NSString stringWithCString:newViewProps.sourceURL.c_str() encoding:NSUTF8StringEncoding];
    _sourceURL = [NSURL URLWithString:urlString];
    // highlight-start
    if ([self urlIsValid:newViewProps.sourceURL]) {
      [_webView loadRequest:[NSURLRequest requestWithURL:_sourceURL]];
    }
    // highlight-end
  }

  [super updateProps:props oldProps:oldProps];
}

-(void)layoutSubviews
{
  [super layoutSubviews];
  _webView.frame = self.bounds;

}

#pragma mark - WKNavigationDelegate

// highlight-start
-(void)webView:(WKWebView *)webView didFinishNavigation:(WKNavigation *)navigation
{
  CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Success};
  self.eventEmitter.onScriptLoaded(result);
}

- (BOOL)urlIsValid:(std::string)propString
{
  if (propString.length() > 0 && !_sourceURL) {
    CustomWebViewEventEmitter::OnScriptLoaded result = CustomWebViewEventEmitter::OnScriptLoaded{CustomWebViewEventEmitter::OnScriptLoadedResult::Error};

    self.eventEmitter.onScriptLoaded(result);
    return NO;
  }
  return YES;
}

// Event emitter convenience method
- (const CustomWebViewEventEmitter &)eventEmitter
{
  return static_cast<const CustomWebViewEventEmitter &>(*_eventEmitter);
}
// highlight-end

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<CustomWebViewComponentDescriptor>();
}

Class<RCTComponentViewProtocol> WebViewCls(void)
{
  return RCTWebView.class;
}

@end
```

这段代码是用 Objective-C++ 编写的，包含以下细节：

- `@interface` 实现了两个协议：
  - `RCTCustomWebViewViewProtocol`, generated by Codegen;
  - `WKNavigationDelegate`, 由 WebKit 框架提供，用于处理 web 视图导航事件；
- `init` 方法实例化 `WKWebView`，将其添加到子视图，并设置 `navigationDelegate`；
- `updateProps` 方法，由 React Native 在组件的属性变化时调用；
- `layoutSubviews` 方法，描述了自定义视图需要如何布局；
- `webView:didFinishNavigation:` 方法，用于处理 `WKWebView` 完成加载页面时需要执行的操作；
- `urlIsValid:(std::string)propString` 方法检查接收到的 URL 属性是否有效；
- `eventEmitter` 方法，用于检索强类型的 `eventEmitter` 实例；
- `componentDescriptorProvider` 方法，返回由 Codegen 生成的 `ComponentDescriptor`；
- `WebViewCls` 方法，用于在应用中注册 `RCTWebView`。

#### AppDelegate.mm

最后，可以在应用中注册组件。更新 `AppDelegate.mm` 文件，使应用意识到自定义的 WebView 组件：

```objc title="Demo/ios/Demo/AppDelegate.mm"
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
// highlight-start
#import <React/RCTBridge+Private.h>
#import "RCTWebView.h"
// highlight-end
@implementation AppDelegate
// ...
// highlight-start
- (NSDictionary<NSString *,Class<RCTComponentViewProtocol>> *)thirdPartyFabricComponents
{
  NSMutableDictionary * dictionary = [super thirdPartyFabricComponents].mutableCopy;
  dictionary[@"CustomWebView"] = [RCTWebView class];
  return dictionary;
}
// highlight-end

@end
```

这段代码通过获取来自其他来源（如第三方库）的第三方组件字典的可变副本，重写了 `thirdPartyFabricComponents` 方法。

然后，向字典中添加一个条目，条目名称与 Codegen 规范文件中使用的名称相同。这样，当 React 需要加载名称 `CustomWebView` 的组件时，React Native 将实例化 `RCTWebView`。

最后，返回新的字典。

:::warning
我们意识到 iOS 存在一些问题，当使用自定义 iOS 组件构建应用时会出现问题。

1. 组件需要访问 `yoga/style/Style.h` 头文件，但当前应用无法访问。为此，将 `$(PODS_ROOT)/Headers/Private/Yoga` 路径添加到应用的头文件搜索路径构建设置中。
2. Codegen 在 `RCTThirdPartyFabricComponentsProvider` 中生成了一行不需要生成的代码。删除 `RCTThirdPartyFabricComponentsProvider.h` 和 `RCTThirdPartyFabricComponentsProvider.mm` 文件中带有 `WebViewCls` 符号的行。

我们已经修复了这些问题，它们将在 React Native 0.76.1 中发布。
:::
