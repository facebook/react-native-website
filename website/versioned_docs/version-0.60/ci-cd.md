---
id: ci-cd
title: Continuous Integration
---

## Automated test, build and delivery

Using continuous integration and delivery allows you to automate the whole build, test and deployment pipeline of your React Native apps. CI/CD systems provide a consistent build environment which can be used by any developer to produce build artifacts.

Your React Native apps can then be automatically distributed to test users via TestFlight, Firebase App Distribution or other third party services and they can also be published directly to the app stores such as App Store or Google Play for example.

To assure the quality of your releases it is possible to run integration and unit tests to verify the quality of your code giving you immediate feedback when errors occur. If automatic build triggering is set up then tests can be run on every new commit.

A well configured CI/CD pipeline will code sign your Android and iOS apps allowing you to create release artifacts.

## Workflow configuration

Most CI/CD pipelines can be configured using a yaml configuration file which defines one or more workflows. This can be checked into source control to make sure changes are tracked which is especially important if working in a larger team. The configuration file should be in the root of the repository branch you want to build.

Yaml configurations are unique to each CI/CD provider but a typical configuration will contain a workflow that contains sections to configure the conditions for triggering a build, environment variables, and scripts that should be executed to build your application, and where to publish the build artifacts.

The following examples demonstrate how to use [Codemagic CI/CD](https://codemagic.io/start/) yaml configuration for building React Native iOS and Android applications.

### iOS configuration example

```yaml
react-native-ios:
        name: React Native iOS
        environment:
            vars:
                XCODE_WORKSPACE: "ios/reactnativeapp.xcworkspace"
                XCODE_SCHEME: "reactnativeapp"
                APP_STORE_CONNECT_ISSUER_ID: Encrypted(...)
                APP_STORE_CONNECT_KEY_IDENTIFIER: Encrypted(...)
                APP_STORE_CONNECT_PRIVATE_KEY: Encrypted(...)
                CERTIFICATE_PRIVATE_KEY: Encrypted(...)
                BUNDLE_ID: "com.example.reactnativeapp"
                APP_STORE_APP_ID: 1111111111
            node: latest
            xcode: 12.5
            cocoapods: default
        triggering:
            events:
                - push
                - tag
                - pull_request
            branch_patterns:
                - pattern: develop
                  include: true
                  source: true
        scripts:
            - name: Install dependencies
              script: |
                yarn install
            - name: Install CocoaPods dependencies
              script: |
                cd ios && pod install
            - name: Set up keychain to be used for codesigning
              script: |
                keychain initialize
            - name: Fetch signing files
              script: |
                app-store-connect fetch-signing-files "$BUNDLE_ID" --type IOS_APP_STORE --create
            - name: Use system default keychain
              script: |
                keychain add-certificates
            - name: Increment build number
              script: |
                agvtool new-version -all $(($(app-store-connect get-latest-testflight-build-number "$APP_STORE_APP_ID") + 1))
            - name: Set up code signing settings on Xcode project
              script: |
                xcode-project use-profiles --warn-only
            - name: Build ipa for distribution
              script: |
                xcode-project build-ipa --workspace "$FCI_BUILD_DIR/ios/$XCODE_WORKSPACE" --scheme "$XCODE_SCHEME"
        artifacts:
          - build/ios/ipa/*.ipa
          - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.dSYM
        publishing:
          - app-store-connect publish
          email:
            recipients:
              - user@example.com
          slack:
            channel: '#channel-name'

```

### Android configuration example

```yaml
react-native-android:
  name: React Native Android
  environment:
    vars:
      GCLOUD_SERVICE_ACCOUNT_CREDENTIALS: Encrypted(...)
      PACKAGE_NAME: 'com.example.reactnativeapp'
      KEYSTORE: Encrypted(...)
      KEYSTORE_PASSWORD: Encrypted(...)
      KEY_ALIAS_PASSWORD: Encrypted(...)
      KEY_ALIAS_USERNAME: Encrypted(...)
      TRACK: 'alpha'
    node: latest
  triggering:
    events:
      - push
      - pull_request
    branch_patterns:
      - pattern: develop
        include: true
        source: true
  scripts:
    - name: Install dependencies
      script: |
        yarn install
    - name: Set Android SDK location
      script: |
        echo "sdk.dir=$ANDROID_SDK_ROOT" > "$FCI_BUILD_DIR/android/local.properties"
    - name: Set up keystore
      script: |
        echo $KEYSTORE | base64 --decode > /tmp/keystore.keystore
    - name: Build Android release
      script: |
        export NEW_BUILD_NUMBER=$(($(google-play get-latest-build-number --package-name "$PACKAGE_NAME") + 1))
        cd android && ./gradlew bundleRelease
  artifacts:
    - android/app/build/outputs/**/*.aab
  publishing:
    email:
      recipients:
        - user@example.com
    slack:
      channel: '#channel-name'
    google_play:
      credentials: $GCLOUD_SERVICE_ACCOUNT_CREDENTIALS
      track: $TRACK
```
