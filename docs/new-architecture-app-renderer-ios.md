---
id: new-architecture-app-renderer-ios
title: Enabling Fabric on iOS
---

import M1Cocoapods from './\_markdown-m1-cocoapods.mdx';
import NewArchitectureWarning from './\_markdown-new-architecture-warning.mdx';

<NewArchitectureWarning/>

This section will go over how to enable the new renderer in your app. Make sure your application meets all the [prerequisites](new-architecture-app-intro).

## 1. Enable Fabric in Podfile

Add changes to your Podfile. You can see some examples in [RNTester](https://github.com/facebook/react-native/blob/main/packages/rn-tester/Podfile) and [rn-demo-app](https://github.com/facebook/fbt/blob/rn-demo-app/ios/Podfile).

```ruby title="Podfile"
# Add the following line at the top of Podfile.
# Codegen produces files/classes that share names, and it will show the warning.
# deterministic_uuids option surpresses the warning.
install! 'cocoapods', :deterministic_uuids => false
target 'Some App' do
  pods()
end
def pods()
  # Get config
  config = use_native_modules!
  # Use env variables to turn it on/off.
  fabric_enabled = ENV['USE_FABRIC']
  use_react_native!(
    ...
    # Modify here if your app root path isn't the same as this one.
    :app_path => "#{Dir.pwd}/..",
    # Pass the flag to enable fabric to use_react_native!.
    :fabric_enabled => fabric_enabled
  )
end
```

## 2. Update your root view

The way to render your app with Fabric depends on your setup. Here is an example of how you can enable Fabric in your app with the `RN_FABRIC_ENABLED` compiler flag to enable/disable. Refer [RN-Tester’s AppDelegate](https://github.com/facebook/react-native/blob/main/packages/rn-tester/RNTester/AppDelegate.mm) as an example.

```objc title="AppDelegate.mm"
#ifdef RN_FABRIC_ENABLED
#import <React/RCTFabricSurfaceHostingProxyRootView.h>
#import <React/RCTSurfacePresenter.h>
#import <React/RCTSurfacePresenterBridgeAdapter.h>
#import <react/config/ReactNativeConfig.h>
#endif

@interface AppDelegate () <RCTCxxBridgeDelegate,
                           RCTTurboModuleManagerDelegate> {
#ifdef RN_FABRIC_ENABLED
  RCTSurfacePresenterBridgeAdapter *_bridgeAdapter;
  std::shared_ptr<const facebook::react::ReactNativeConfig> _reactNativeConfig;
  facebook::react::ContextContainer::Shared _contextContainer;
#endif

  // Find a line that define rootView and replace/edit with the following lines.

#ifdef RN_FABRIC_ENABLED
  _contextContainer = std::make_shared<facebook::react::ContextContainer const>();
  _reactNativeConfig = std::make_shared<facebook::react::EmptyReactNativeConfig const>();

  _contextContainer->insert("ReactNativeConfig", _reactNativeConfig);

  _bridgeAdapter = [[RCTSurfacePresenterBridgeAdapter alloc]
        initWithBridge:_bridge
      contextContainer:_contextContainer];

  _bridge.surfacePresenter = _bridgeAdapter.surfacePresenter;

  UIView *rootView =
      [[RCTFabricSurfaceHostingProxyRootView alloc] initWithBridge:_bridge
                                                        moduleName:@"MyTestApp"
                                                 initialProperties:nil];
#else
  // Current implementation to define rootview.
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"MyTestApp"
                                            initialProperties:nil];
#endif
```

## 3. Add Babel Plugins

This will trigger the codegen that will run at the metro building time.

```javascript title="babel.config.js"
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    './node_modules/react-native/packages/babel-plugin-codegen'
  ]
};
```

## 4. Run pod install

```bash
// Run pod install with the flags
USE_FABRIC=1 RCT_NEW_ARCH_ENABLED=1 pod install
```

<M1Cocoapods />
