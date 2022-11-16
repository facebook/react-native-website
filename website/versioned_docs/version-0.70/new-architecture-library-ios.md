---
id: new-architecture-library-ios
title: Enabling in iOS Library
---

import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

You have defined the JavaScript specs for your native modules as part of the [prerequisites](new-architecture-library-intro) and you are now ready to migrate your library to the New Architecture. Here are the steps you can follow to accomplish this.

## 1. Updating your Podspec for the New Architecture

The New Architecture makes use of CocoaPods.

### Add Folly and Other Dependencies

We'll need to ensure Folly is configured properly in any projects that consume your library. With CocoaPods, we can use the `compiler_flags` and `dependency` properties to set it up.

Add these to your `Pod::Spec.new` block:

```ruby
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  # ...
  s.compiler_flags  = folly_compiler_flags

  s.pod_target_xcconfig    = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\""
  }

  s.dependency "React-Core"
  s.dependency "React-RCTFabric" # This is for Fabric Native Component
  s.dependency "React-Codegen"
  s.dependency "RCT-Folly"
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"
  # ...
end
```

## 2. Extend or implement the code-generated native interfaces

The JavaScript spec for your native module or component will be used to generate native interface code for each supported platform (i.e. Android and iOS). These native interface files will be generated when a React Native application that depends on your library is built.

While this generated native interface code **will not ship as part of your library**, you do need to make sure your Objective-C or Java code conforms to the protocols provided by these native interface files. You can use the Codegen script to generate your library’s native interface code in order to use **as reference**.

```sh
cd <path/to/your/app>
node node_modules/react_native/scripts/generate-artifacts.js \
    --path <your app>/ \
    --outputPath <an/output/path> \
```

This command will generate the boilerplate code required by iOS in the output path provided as paramenter.

The files that are output by the script **should not be committed**, but you’ll need to refer to them to determine what changes you need to make to your native modules in order for them to provide an implementation for each generated `@protocol` / native interface.

### Conform to the protocols provided by the native interface code

Update your native module or component to ensure it implements/extends the native interface that has been generated from your JavaScript specs.

Following the example set forth in the previous section, your library might import `MyAwesomeSpecs.h`, extend the relevant native interface, and implement the necessary methods for this interface:

```objc
#import <MyAwesomeSpecs/MyAwesomeSpecs.h>

@interface MyAwesomeModule () <StringGetterSpec>
@end

RCT_EXPORT_METHOD(getString:(NSString *)string
                   callback:(RCTResponseSenderBlock)callback)
{
  // Implement this method
}

- (std::shared_ptr<TurboModule>)getTurboModule:(const ObjCTurboModule::InitParams &)params
{
  return std::make_shared<StringGetterSpecJSI>(params);
}
```

For an existing native module, you will likely already have one or more instances of [`RCT_EXPORT_METHOD`](native-modules-ios#export-a-native-method-to-javascript). To migrate to the New Architecture, you’ll need to make sure the method signature makes use of the structs provided by the codegen output.
