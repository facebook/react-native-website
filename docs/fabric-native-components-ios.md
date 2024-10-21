---
id: fabric-native-components-ios
title: 'Fabric Native Components: iOS'
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

React Native uses CocoaPods to manage iOS dependencies, auto-linking and codegen. You will need to add a `.podspec`.

## Create your Pod

```ruby title="Demo/RTNCenteredText/rtn-centered-text.podspec"
require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name            = "rtn-centered-text"
  s.version         = package["version"]
  s.summary         = package["description"]
  s.description     = package["description"]
  s.homepage        = package["homepage"]
  s.license         = package["license"]
  s.platforms       = { :ios => "11.0" }
  s.author          = package["author"]
  s.source          = { :git => package["repository"], :tag => "#{s.version}" }

  s.source_files    = "ios/**/*.{h,m,mm,swift}"

  install_modules_dependencies(s)
end
```

You'll notice that this is using the information we entered in the `package.json`, to keep that as the single source of truth.

## Using RTNCenteredText to your Application

You can [manually run](the-new-architecture/codegen-cli) the Codegen, however it's simpler to use the application you're going to demo the component in to do this for you.

### 1. Run Codegen through CocoaPods

```bash
cd ios
bundle install
bundle exec pods install
```

Importantly you will see logging output from Codegen, such as:

```log
...
[Codegen] >>>>> Searching for codegen-enabled libraries in react-native.config.js
...
[Codegen] Processing RTNCenteredTextSpecs
[Codegen] Searching for podspec in the project dependencies.
[Codegen] Supported Apple platforms: ios for RTNCenteredTextSpecs
[Codegen] Generating Native Code for FBReactNativeSpec - ios
// highlight-next-line
[Codegen] Generated artifacts: /Users/me/Demo/ios/build/generated/ios
```

:::warning
You should be careful about committing generated code to your repository. Generated code is specific to each version of React Native. Use npm [peerDependencies](https://nodejs.org/en/blog/npm/peer-dependencies) to restrict compatibility with version of React Native.
:::

### 3. Write your Native Platform Code

We need to prepare your iOS project using Xcode by completeing these **5 steps**:

1. Open the CocoPods generated Xcode Workspace:

```bash
cd ios
open TurboModuleExample.xcworkspace
```

<img class="half-size" alt="Open Xcode Workspace" src="/docs/assets/fabric-native-components/1.webp" />

2. Right click on app and select <code>New Group</code>, call the new group `CenteredText`.

<img class="half-size" alt="Right click on app and select New Group" src="/docs/assets/fabric-native-components/2.webp" />

3. In the `CenteredText` group, create <code>New</code>→<code>File from Template</code>.

<img class="half-size" alt="Create a new file using the Cocoa Touch Classs template" src="/docs/assets/fabric-native-components/3.webp" />

4. Use the <code>Objective-C File</code> template, and name it <code>RTNCenteredText</code>.

<img class="half-size" alt="Create an Objective-C RTNCenteredText class" src="/docs/assets/fabric-native-components/4.webp" />

5. Rename <code>RTNCenteredText.m</code> → <code>RTNCenteredText.mm</code> making it an Objective-C++ file

Repeat this for `RTNCenteredTextManager.mm`, so you have the following iOS code:

```
Demo/RTNCenteredText/ios
├── RTNCenteredText.h
├── RTNCenteredText.mm
└── RTNCenteredTextManager.mm
```

#### RTNCenteredTextManager.mm

Declares what the Component exports:

```objc title="Demo/RTNCenteredText/ios/RTNCenteredTextManager.mm"
#import <React/RCTLog.h>
#import <React/RCTUIManager.h>
#import <React/RCTViewManager.h>

@interface RTNCenteredTextManager : RCTViewManager
@end

@implementation RTNCenteredTextManager

// This macro lets Fabric retrieve and instantiate your module
// highlight-next-line
RCT_EXPORT_MODULE(RTNCenteredText)

// This macro exposes the text property of the component. Note it exposes the name and type.
// highlight-next-line
RCT_EXPORT_VIEW_PROPERTY(text, NSString)

@end
```

This registers the modules, properties and methods.

#### RTNCenteredText.h

Declares the interface for RTNCenteredText:

```objc title="Demo/RTNCenteredText/RTNCenteredText.h"
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface RTNCenteredText : RCTViewComponentView

// You would declare native methods you'd want to access from the view here

@end

NS_ASSUME_NONNULL_END
```

#### RTNCenteredText.mm

Defines the implementation of RTNCenteredtext:

- how the host view is constructed, and
- how React `prop` updates are shared with the host view.

```objc title="Demo/RTNCenteredText/RTNCenteredText.mm"
#import "RTNCenteredText.h"

// hightlight-start
// Use the code generated from our TypeScript or Flow specification:
#import <react/renderer/components/RTNCenteredTextSpecs/ComponentDescriptors.h>
#import <react/renderer/components/RTNCenteredTextSpecs/EventEmitters.h>
#import <react/renderer/components/RTNCenteredTextSpecs/Props.h>
#import <react/renderer/components/RTNCenteredTextSpecs/RCTComponentViewHelpers.h>
// hightlight-end

#import "RCTFabricComponentsPlugins.h"

using namespace facebook::react;

@interface RTNCenteredText () <RCTRTNCenteredTextViewProtocol>
@end

@implementation RTNCenteredText {
  UIView *_view;
  UILabel *_label;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RTNCenteredTextComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RTNCenteredTextProps>();
    _props = defaultProps;

    _view = [[UIView alloc] init];
    // Light blue backgroun
    _view.backgroundColor = [UIColor colorWithRed:0.68f green:0.85f blue:0.90f alpha:1.0f];

    _label = [[UILabel alloc] init];
    _label.text = @"Placeholder value";
    [_label sizeToFit];
    [_view addSubview:_label];

    _label.translatesAutoresizingMaskIntoConstraints = false;
    [NSLayoutConstraint activateConstraints:@[
      // Anchors: label <-> view
      [_label.leadingAnchor constraintEqualToAnchor:_view.leadingAnchor],
      [_label.topAnchor constraintEqualToAnchor:_view.topAnchor],
      [_label.trailingAnchor constraintEqualToAnchor:_view.trailingAnchor],
      [_label.bottomAnchor constraintEqualToAnchor:_view.bottomAnchor],
      // View to match the label
      [NSLayoutConstraint constraintWithItem:_view attribute:NSLayoutAttributeWidth relatedBy:NSLayoutRelationEqual toItem:_label attribute:NSLayoutAttributeWidth multiplier:1.0 constant:0],
      [NSLayoutConstraint constraintWithItem:_view attribute:NSLayoutAttributeHeight relatedBy:NSLayoutRelationEqual toItem:_label attribute:NSLayoutAttributeHeight multiplier:1.0 constant:0],
    ]];

    // Our all important centering
    _label.textAlignment = NSTextAlignmentCenter;

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<RTNCenteredTextProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<RTNCenteredTextProps const>(props);

  if (oldViewProps.text != newViewProps.text) {
    _label.text = [[NSString alloc] initWithCString:newViewProps.text.uppercaseString.c_str() encoding:NSASCIIStringEncoding];
  }

  [super updateProps:props oldProps:oldProps];
}

@end

Class<RCTComponentViewProtocol> RTNCenteredTextCls(void)
{
  return RTNCenteredText.class;
}
```
