---
id: sourcemaps
title: Source Maps
---

Source maps help map a minified file back to an un-packaged state. This is common when investigating issues from release builds.

This helps if you have a stacktrace like

```text
TypeError: Cannot read property 'data' of undefined
  at anonymous(app:///index.android.bundle:1:4277021)
  at call(native)
  at p(app:///index.android.bundle:1:227785)
```

The power of source maps allow tracing that line and column number back to the original source stacktrace.

```text
TypeError: Cannot read property 'data' of undefined
  at anonymous(src/modules/notifications/Permission.js:15:requestNotificationPermission)
  at call(native)
  at p(node_modules/regenerator-runtime/runtime.js:64:Generator)
```

This allows to triage release issues given a more accurate stacktrace.

Follow the instructions below to get started with source maps:

1. [Enable source maps on Android](sourcemaps.md#enable-source-maps-on-android)
2. [Enable source maps on iOS](sourcemaps.md#enable-source-maps-on-ios)
3. [Manual Symbolication](sourcemaps.md#manual-symbolication)

## Enable source maps on Android

### Hermes

:::info
Source maps are built in Release mode by default. However, if `hermesFlagsRelease` is set - source maps will have to be enabled.
:::

If so, ensure the following is set in your app's `android/app/build.gradle` file.

```groovy
project.ext.react = [
    enableHermes: true,
    hermesFlagsRelease: ["-O", "-output-source-map"], // plus whichever flag was required to set this away from default
]
```

If done correctly - you may see the output location of the source map during Metro build output.

```text
Writing bundle output to:, android/app/build/generated/assets/react/release/index.android.bundle
Writing sourcemap output to:, android/app/build/intermediates/sourcemaps/react/release/index.android.bundle.packager.map
```

Development builds do not produce a bundle and thus already have symbols, but if the development build is bundled - you may enable source maps like:

Editing `android/app/build.gradle` file with:

```groovy
project.ext.react = [
  bundleInDebug: true,
  hermesFlagsDebug: ["-O", "-output-source-map"],
]
```

## Enable source maps on iOS

Source maps are built in Release mode by default. However, you might want to redirect the location of the source map for easier use.

If so, within Xcode head to the build phrase - "Bundle React Native code and images"

At the top of the file near the other export's, add an entry for `SOURCEMAP_FILE` to the preferred location and name. Like below:

```
export SOURCEMAP_FILE="$(pwd)/../main.jsbundle.map";

export NODE_BINARY=node
../node_modules/react-native/scripts/react-native-xcode.sh
```

If done correctly - you may see the output location of the source map during Metro build output.

```text
Writing bundle output to:, Build/Intermediates.noindex/ArchiveIntermediates/application/BuildProductsPath/Release-iphoneos/main.jsbundle
Writing sourcemap output to:, Build/Intermediates.noindex/ArchiveIntermediates/application/BuildProductsPath/Release-iphoneos/main.jsbundle.map
```

## Manual Symbolication

:::info
You may read about manual symbolication of a stack trace on the [symbolication](symbolication.md) page.
:::
