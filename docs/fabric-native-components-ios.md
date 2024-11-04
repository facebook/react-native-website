---
id: fabric-native-components-ios
title: 'Fabric Native Components: iOS'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

Now it's time to write some iOS platform code to be able to render the web view. The steps you need to follow are:

- Run Codegen.
- Write the code for the `RCTWebView`
- Register the `RCTWebView` in the application

### 1. Run Codegen

You can [manually run](the-new-architecture/codegen-cli) the Codegen, however it's simpler to use the application you're going to demo the component in to do this for you.

```bash
cd ios
bundle install
bundle exec pod install
```

Importantly you will see logging output from Codegen, which we're going to use in Xcode to build our WebView native component.

:::warning
You should be careful about committing generated code to your repository. Generated code is specific to each version of React Native. Use npm [peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies) to restrict compatibility with version of React Native.
:::

### 3. Write the `RCTWebView`

We need to prepare your iOS project using Xcode by completeing these **5 steps**:

1. Open the CocoPods generated Xcode Workspace:

```bash
cd ios
open Demo.xcworkspace
```

<img class="half-size" alt="Open Xcode Workspace" src="/docs/assets/fabric-native-components/1.webp" />

2. Right click on app and select <code>New Group</code>, call the new group `WebView`.

<img class="half-size" alt="Right click on app and select New Group" src="/docs/assets/fabric-native-components/2.webp" />

3. In the `WebView` group, create <code>New</code>→<code>File from Template</code>.

<img class="half-size" alt="Create a new file using the Cocoa Touch Classs template" src="/docs/assets/fabric-native-components/3.webp" />

4. Use the <code>Objective-C File</code> template, and name it <code>RCTWebView</code>.

<img class="half-size" alt="Create an Objective-C RCTWebView class" src="/docs/assets/fabric-native-components/4.webp" />

5. Repeat step 4 and create a header file named `RCTWebView.h`.

6. Rename <code>RCTWebView.m</code> → <code>RCTWebView.mm</code> making it an Objective-C++ file.

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

After creating the header file and the implementation file, you can start implementing them.

This is the code for the `RCTWebView.h` file, which declares the component interface.

```objc title="Demo/RCTWebView/RCTWebView.h"
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RCTWebView : RCTViewComponentView

// You would declare native methods you'd want to access from the view here

@end

NS_ASSUME_NONNULL_END
```

This class defines an `RCTWebView` which extends the `RCTViewComponentView` class. This is the base class for all the native components and it is provided by React Native.

The code for the implementation file (`RCTWebView.mm`) is the following:

```objc title="Demo/RCTWebView/RCTWebView.mm"
#import "RCTWebView.h"

#import <react/renderer/components/AppSpec/ComponentDescriptors.h>
#import <react/renderer/components/AppSpec/EventEmitters.h>
#import <react/renderer/components/AppSpec/Props.h>
#import <react/renderer/components/AppSpec/RCTComponentViewHelpers.h>
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

This code is written in Objective-C++ and contains various details:

- the `@interface` implements two protocols:
  - `RCTCustomWebViewViewProtocol`, generated by Codegen;
  - `WKNavigationDelegate`, provided by the WebKit framework to handle the web view navigation events;
- the `init` method that instantiates the `WKWebView`, adds it to the subviews and that sets the `navigationDelegate`;
- the `updateProps` method that is called by React Native when the component's props change;
- the `layoutSubviews` method that describes how the custom view needs to be laid out;
- the `webView:didFinishNavigation:` method that lets you handle what to do when the `WKWebView` finishes loading the page;
- the `urlIsValid:(std::string)propString` method that checks whether the URL received as prop is valid;
- the `eventEmitter` method which is a utility to retrieve a strongly typed `eventEmitter` instance
- the `componentDescriptorProvider` which returns the `ComponentDescriptor` generated by Codegen;
- the `WebViewCls` which is an helper method to register the `RCTWebView` in the application.

#### AppDelegate.mm

Finally, you can register the component in the app.
Update the `AppDelegate.mm` to make your application aware of our custom WebView component:

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

This code overrides the `thirdPartyFabricComponents` method by obtaining a mutable copy of the dictionary of third party components coming from other sources, like third party libraries.

It then adds an entry to the dictionary with the name used in the Codegen specification file. In this way, when React is required to load a component with name `CustomWebView`, React Native will instantiate a `RCTWebView`.

Finally, it returns the new dictionary.

:::warning
We are aware of a couple of issues with iOS that would create some problem when building the app with a custom iOS component.

1. The component requires access to the `yoga/style/Style.h` header which is not currently available for the application. To fix this, add the `$(PODS_ROOT)/Headers/Private/Yoga` path to the header search paths build settings of the app.
2. Codegen is generating a line in the `RCTThirdPartyFabricComponentsProvider` that it should not generate. Remove the lines with the `WebViewCls` symbol in the `RCTThirdPartyFabricComponentsProvider.h` and `RCTThirdPartyFabricComponentsProvider.mm` files.

We have already fixed those issues and they will be released in React Native 0.76.1
:::
