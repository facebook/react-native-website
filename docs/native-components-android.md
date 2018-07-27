---
id: native-components-android
title: Native UI Components
---

There are tons of native UI widgets out there ready to be used in the latest apps - some of them are part of the platform, others are available as third-party libraries, and still more might be in use in your very own portfolio. React Native has several of the most critical platform components already wrapped, like `ScrollView` and `TextInput`, but not all of them, and certainly not ones you might have written yourself for a previous app. Fortunately, it's quite easy to wrap up these existing components for seamless integration with your React Native application.

Like the native module guide, this too is a more advanced guide that assumes you are somewhat familiar with Android SDK programming. This guide will show you how to build a native UI component, walking you through the implementation of a subset of the existing `ImageView` component available in the core React Native library.

## ImageView example

For this example we are going to walk through the implementation requirements to allow the use of ImageViews in JavaScript.

Native views are created and manipulated by extending `ViewManager` or more commonly `SimpleViewManager` . A `SimpleViewManager` is convenient in this case because it applies common properties such as background color, opacity, and Flexbox layout.

These subclasses are essentially singletons - only one instance of each is created by the bridge. They vend native views to the `NativeViewHierarchyManager`, which delegates back to them to set and update the properties of the views as necessary. The `ViewManagers` are also typically the delegates for the views, sending events back to JavaScript via the bridge.

Vending a view is simple:

1. Create the ViewManager subclass.
2. Implement the `createViewInstance` method
3. Expose view property setters using `@ReactProp` (or `@ReactPropGroup`) annotation
4. Register the manager in `createViewManagers` of the applications package.
5. Implement the JavaScript module

## 1. Create the `ViewManager` subclass

In this example we create view manager class `ReactImageManager` that extends `SimpleViewManager` of type `ReactImageView`. `ReactImageView` is the type of object managed by the manager, this will be the custom native view. Set the initializers and set the name `REACT_CLASS` to `CustomRCTImageView` as `RCTImageView` is already used by React. Name returned by `getName` is used to reference the native view type from JavaScript.

```java
// ReactImageManager.java

package com.your-app-name;

import javax.annotation.Nullable;

import com.facebook.drawee.backends.pipeline.Fresco;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewProps;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.views.image.ImageResizeMode;
import com.facebook.react.views.image.ReactImageView;

public class ReactImageManager extends SimpleViewManager<ReactImageView> {

  public static final String REACT_CLASS = 'CustomRCTImageView';
    private Object mCallerContext;

  public ReactImageManagerModule() {
  }

  public ReactImageManagerModule(Object mCallerContext) {
      this.mCallerContext = mCallerContext;
  }

  @Override
  public String getName() {
      return REACT_CLASS;
  }
}
```

## 2. Implement method `createViewInstance`

Views are created in the `createViewInstance` method, the view should initialize itself in its default state, any properties will be set via a follow up call to `updateView.` 

```java
// ReactImageManager.java

  @Override
  public ReactImageView createViewInstance(ThemedReactContext context) {
    return new ReactImageView(context, Fresco.newDraweeControllerBuilder(), null, mCallerContext);
  }
```

## 3. Expose view property setters using `@ReactProp` (or `@ReactPropGroup`) annotation

Properties that are to be reflected in JavaScript needs to be exposed as setter method annotated with `@ReactProp` (or `@ReactPropGroup`). Setter method should take view to be updated (of the current view type) as a first argument and property value as a second argument. Setter should be declared as a `void` method and should be `public`. Property type sent to JS is determined automatically based on the type of value argument of the setter. The following type of values are currently supported: `boolean`, `int`, `float`, `double`, `String`, `Boolean`, `Integer`, `ReadableArray`, `ReadableMap`.

Annotation `@ReactProp` has one obligatory argument `name` of type `String`. Name assigned to the `@ReactProp` annotation linked to the setter method is used to reference the property on JS side.

Except from `name`, `@ReactProp` annotation may take following optional arguments: `defaultBoolean`, `defaultInt`, `defaultFloat`. Those arguments should be of the corresponding primitive type (accordingly `boolean`, `int`, `float`) and the value provided will be passed to the setter method in case when the property that the setter is referencing has been removed from the component. Note that "default" values are only provided for primitive types, in case when setter is of some complex type, `null` will be provided as a default value in case when corresponding property gets removed.

Setter declaration requirements for methods annotated with `@ReactPropGroup` are different than for `@ReactProp`, please refer to the `@ReactPropGroup` annotation class docs for more information about it.

**IMPORTANT!** in ReactJS updating the property value will result in setter method call. Note that one of the ways we can update component is by removing properties that have been set before. In that case setter method will be called as well to notify view manager that property has changed. In that case "default" value will be provided (for primitive types "default" can value can be specified using `defaultBoolean`, `defaultFloat`, etc. arguments of `@ReactProp` annotation, for complex types setter will be called with value set to `null`).

```java
// ReactImageManager.java

  @ReactProp(name = "src")
  public void setSrc(ReactImageView view, @Nullable ReadableArray sources) {
    view.setSource(sources);
  }

  @ReactProp(name = "borderRadius", defaultFloat = 0f)
  public void setBorderRadius(ReactImageView view, float borderRadius) {
    view.setBorderRadius(borderRadius);
  }

  @ReactProp(name = ViewProps.RESIZE_MODE)
  public void setResizeMode(ReactImageView view, @Nullable String resizeMode) {
    view.setScaleType(ImageResizeMode.toScaleType(resizeMode));
  }
```

## 4. Register the `ViewManager`

The final Java step is to register the ViewManager to the application, this happens in a similar way to [Native Modules](native-modules-android.md), via the applications package member function `createViewManagers.`

```java
//ReactImageManagerPackage.java

package com.your-app-name;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class ReactImageManagerPackage implements ReactPackage {

  @Override
  public List<ViewManager> createViewManagers(
                            ReactApplicationContext reactContext) {
    return Arrays.<ViewManager>asList(
      new MainReactPackage(),
      new ReactImageManager() // <- new UI Component here
    );
  }
  
  @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new ReactImageManagerModule(reactContext));

        return modules;
    }
 }
```

## 5. Implement the JavaScript module

The very final step is to create the JavaScript module that defines the interface layer between Java and JavaScript for the users of your new view. Much of the effort is handled by internal React code in Java and JavaScript and all that is left for you is to describe the `propTypes`.

```javascript
// ImageView.js

import PropTypes from 'prop-types';
import {
    requireNativeComponent,
    ViewPropTypes
} from 'react-native';

var iface = {
  name: 'CustomImageView',
  propTypes: {
      src: PropTypes.arrayOf(
              PropTypes.shape({
                  uri: PropTypes.string,
          })
      ),
      borderRadius: PropTypes.number,
      resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch']),
      ...ViewPropTypes, // include the default view properties
  },
};

module.exports = requireNativeComponent('CustomRCTImageView', iface);
```

`requireNativeComponent` commonly takes two parameters, the first is the name of the native view and the second is an object that describes the component interface. The component interface should declare a friendly `name` for use in debug messages and must declare the `propTypes` reflected by the Native View. The `propTypes` are used for checking the validity of a user's use of the native view. Now we can use the created component in our React-Native application. Dont worry why we have to set wrap the `uri-Object` into `[]` for now. When you use already creatred `<Image />` component you do not have to do that. 

```javascript
// App.js

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import CustomImageView from './bridge/ImageView.js';

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <CustomImageView src={[{ uri: 'https://facebook.github.io/react/logo-og.png'}]}
          style={{ width: 400, height: 400 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
```

Note that if you need your JavaScript component to do more than just specify a name and propTypes, like do custom event handling, you can wrap the native component in a normal react component. In that case, you want to pass in the wrapper component instead of `iface` to `requireNativeComponent`. This is illustrated in the `MyCustomView` example below.

# Events

So now we know how to expose native view components that we can control easily from JS, but how do we deal with events from the user, like pinch-zooms or panning? When a native event occurs the native code should issue an event to the JavaScript representation of the View, and the two views are linked with the value returned from the `getId()` method.

```java
class MyCustomView extends View {
   ...
   public void onReceiveNativeEvent() {
      WritableMap event = Arguments.createMap();
      event.putString("message", "MyMessage");
      ReactContext reactContext = (ReactContext)getContext();
      reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(
          getId(),
          "topChange",
          event);
    }
}
```

To map the `topChange` event name to the `onChange` callback prop in JavaScript, register it by overriding the `getExportedCustomBubblingEventTypeConstants` method in your `ViewManager`:

```java
public class ReactImageManager extends SimpleViewManager<MyCustomView> {
    ...
    public Map getExportedCustomBubblingEventTypeConstants() {
        return MapBuilder.builder()
            .put(
                "topChange",
                MapBuilder.of(
                    "phasedRegistrationNames",
                    MapBuilder.of("bubbled", "onChange")))
                    .build();
    }
}
```

This callback is invoked with the raw event, which we typically process in the wrapper component to make a simpler API:

```javascript
// MyCustomView.js

class MyCustomView extends React.Component {
  constructor(props) {
    super(props);
    this._onChange = this._onChange.bind(this);
  }
  _onChange(event: Event) {
    if (!this.props.onChangeMessage) {
      return;
    }
    this.props.onChangeMessage(event.nativeEvent.message);
  }
  render() {
    return <RCTMyCustomView {...this.props} onChange={this._onChange} />;
  }
}
MyCustomView.propTypes = {
  /**
   * Callback that is called continuously when the user is dragging the map.
   */
  onChangeMessage: PropTypes.func,
  ...
};

var RCTMyCustomView = requireNativeComponent(`RCTMyCustomView`, MyCustomView, {
  nativeOnly: {onChange: true}
});
```

Note the use of `nativeOnly` above. Sometimes you'll have some special properties that you need to expose for the native component, but don't actually want them as part of the API for the associated React component. For example, `Switch` has a custom `onChange` handler for the raw native event, and exposes an `onValueChange` handler property that is invoked with just the boolean value rather than the raw event (similar to `onChangeMessage` in the example above). Since you don't want these native only properties to be part of the API, you don't want to put them in `propTypes`, but if you don't you'll get an error. The solution is simply to call them out via the `nativeOnly` option.
