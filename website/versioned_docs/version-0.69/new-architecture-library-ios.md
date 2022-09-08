---
id: new-architecture-library-ios
title: Enabling in iOS Library
---

import M1Cocoapods from './\_markdown-m1-cocoapods.mdx';
import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

You have defined the JavaScript specs for your native modules as part of the [prerequisites](new-architecture-library-intro) and you are now ready to migrate your library to the new architecture. Here are the steps you can follow to accomplish this.

## 1. Updating your Podspec for the new architecture

The new architecture makes use of CocoaPods.

### Add Folly and Other Dependencies

We'll need to ensure Folly is configured properly in any projects that consume your library. With CocoaPods, we can use the `compiler_flags` and `dependency` properties to set it up.

Add these to your `Pod::Spec.new` block:

```ruby
# folly_version must match the version used in React Native
# See folly_version in react-native/React/FBReactNativeSpec/FBReactNativeSpec.podspec
folly_version = '2021.06.28.00-v2'
folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  # ...
  s.compiler_flags  = folly_compiler_flags

  s.pod_target_xcconfig    = {
    "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\""
  }

  s.dependency "React-Core"
  s.dependency "React-RCTFabric" # This is for fabric component
  s.dependency "React-Codegen"
  s.dependency "RCT-Folly", folly_version
  s.dependency "RCTRequired"
  s.dependency "RCTTypeSafety"
  s.dependency "ReactCommon/turbomodule/core"
  # ...
end
```

:::caution

Currently, the Folly version used here must match the Folly version used by React Native. A version mismatch here may lead to errors when running `pod install`. If CocoaPods flags an issue with your Folly version, then you may have a version mismatch. Check which version is used by the core modules Podspecs (e.g. FBReactNativeSpec.podspec), and try running `pod install` again after editing your podspec with the correct Folly version.

<M1Cocoapods />

:::

### Enable codegen in your `package.json`

At this point, you are now ready to enable code-gen support in your library. In your library’s package.json add the following:

:::info

Please note that this format is subject to change.

:::

```json title="package.json"
"codegenConfig": {
  "libraries": [
    {
      "name": "YourTurboModuleSpec",
      "type": "modules",
      "jsSrcsDir": "Libraries"
    },
    {
      "name": "YourComponentName",
      "type": "components",
      "jsSrcsDir": "Libraries"
    }
  ]
}
```

There's three arguments that are required:

- `name`: A name of your library. This will be used to determine import path for your library.
- `jsSrcsDir`: Path to the directory that contains the JavaScript specs for this library.

These arguments are optional:

- `type`: Optional. A string that determines which types of artifacts will be generated for your library: “modules” or “components”. If left unspecified, both modules and components artifacts will be generated.

## 2. Extend or implement the code-generated native interfaces

The JavaScript spec for your native module or component will be used to generate native interface code for each supported platform (i.e. Android and iOS). These native interface files will be generated when a React Native application that depends on your library is built.

While this generated native interface code will not ship as part of your library, you do need to make sure your Objective-C or Java code conforms to the protocols provided by these native interface files. You can use the code-gen script to generate your library’s native interface code in order to use as reference. The files that are output by the script should not be committed, but you’ll need to refer to them to determine what changes you need to make to your native modules in order for them to provide an implementation for each generated @protocol / native interface.

### Conform to the protocols provided by the native interface code

Update your native module or component to ensure it implements/extends the native interface that has been code-generated from your JavaScript specs.

Following the example set forth in the previous section, your library might import MyAwesomeSpecs.h, extend the relevant native interface, and implement the necessary methods for this interface:

```objc
#import <MyAwesomeSpecs/MyAwesomeSpecs.h>

@interface MyAwesomeModule () <StringGetterSpec>
@end

RCT_EXPORT_METHOD(getString:(NSString *)string
                   callback:(RCTResponseSenderBlock)callback)
{
  // ...
}

- (std::shared_ptr<TurboModule>)getTurboModule:(const ObjCTurboModule::InitParams &)params
{
  return std::make_shared<StringGetterSpecJSI>(params);
}
```

For an existing native module, you will likely already have one or more instances of [`RCT_EXPORT_METHOD`](native-modules-ios#export-a-native-method-to-javascript). To migrate to the new architecture, you’ll need to make sure the method signature makes use of the structs provided by the codegen output.
