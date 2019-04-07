---
title: Accessibility API Updates
author: Ziqi Chen
authorTitle: Student at UC Berkeley
authorURL: https://ziqichen.com/
authorImageURL: https://avatars2.githubusercontent.com/u/13990087?s=400&u=5841da1b6064341d52ecab70a586b6701d9f6978&v=4
category: engineering
---

## Motivation

As technology advances and mobile apps become increasingly important to everyday life, the necessity of creating accessible applications has likewise grown in importance.

React Native's limited Accessibility API has always been a huge pain point for developers, so we've made a few updates to the Accessibility API to make it easier to create inclusive mobile applications.

## Problems With the Existing API

### Problem One: Two Completely Different Yet Similar Props - accessibilityComponentType (Android) and accessibilityTraits (iOS)

`accessibilityComponentType` and `accessibilityTraits` are two properties that are used to tell TalkBack on Android and VoiceOver on iOS what kind of UI element the user is interacting with. The two biggest problems with these properties are that:

1. **They are two different properties with different usage methods, yet have the same purpose.** In the previous API, these are two separate properties (one for each platform), which was not only inconvenient, but also confusing to many developers. `accessibilityTraits` on iOS allows 17 different values while `accessibilityComponentType` on Android allows only 4 values. Furthermore, the values for the most part had no overlap. Even the input types for these two properties are different. `accessibilityTraits` allows either an array of traits to be passed in or a single trait, while `accessibilityComponentType` allows only a single value.
2. **There is very limited functionality on Android.** With the old property, the only UI elements that Talkback were able to recognize were “button,” “radiobutton_checked,” and “radiobutton_unchecked.”

### Problem Two: Non-existent Accessibility Hints:

Accessibility Hints help users using TalkBack or VoiceOver understand what will happen when they perform an action on an accessibility element that is not apparent by only the accessibility label. These hints can be turned on and off in the settings panel. Previously, React Native's API did not support accessibility hints at all.

### Problem Three: Ignoring Inverted Colors:

Some users with vision loss use inverted colors on their mobile phones to have greater screen contrast. Apple provided an API for iOS which allows developers to ignore certain views. This way, images and videos aren't distorted when a user has the inverted colors setting on. This API is currently unsupported by React Native.

## Design of the New API

### Solution One: Combining accessibilityComponentType (Android) and accessibilityTraits (iOS)

In order to solve the confusion between `accessibilityComponentType` and `accessibilityTraits`, we decided to merge them into a single property. This made sense because they technically had the same intended functionality and by merging them, developers no longer had to worry about platform specific intricacies when building accessibility features.

**Background**

On iOS, `UIAccessibilityTraits` is a property that can be set on any NSObject. Each of the 17 traits passed in through the javascript property to native is mapped to a `UIAccessibilityTraits` element in Objective-C. Traits are each represented by a long int, and every trait that is set is ORed together.

On Android however, `AccessibilityComponentType` is a concept that was made up by React Native, and doesn't directly map to any properties in Android. Accessibility is handled by an accessibility delegate. Each view has a default accessibility delegate. If you want to customize any accessibility actions, you have to create a new accessibility delegate, override specific methods you want to customize, and then set the accessibility delegate of the view you are handling to be associated with the new delegate. When a developer set `AccessibilityComponentType`, the native code created a new delegate based off of the component that was passed in, and set the view to have that accessibility delegate.

**Changes Made**

For our new property, we wanted to create a superset of the two properties. We decided to keep the new property modeled mostly after the existing property `accessibilityTraits`, since `accessibilityTraits` has significantly more values. The functionality of Android for these traits would be polyfilled in by modifying the Accessibility Delegate.

There are 17 values of UIAccessibilityTraits that `accessibilityTraits` on iOS can be set to. However, we didn't include all of them as possible values to our new property. This is because the effect of setting some of these traits is actually not very well known, and many of these values are virtually never used.

The values UIAccessibilityTraits were set to generally took on one of two purposes. They either described a role that UI element had, or they described the state a UI element was in. Most uses of the previous properties we observed usually used one value that represented a role and combined it with either “state selected,” “state disabled,” or both. Therefore, we decided to create two new accessibility properties: `accessibilityRole` and `accessibilityState`.

**`accessibilityRole`**

The new property, `accessibilityRole`, is used to tell Talkback or Voiceover the role of a UI Element. This new property can take on one of the following values:

- `none`
- `button`
- `link`
- `search`
- `image`
- `keyboardkey`
- `text`
- `adjustable`
- `header`
- `summary`
- `imagebutton`

This property only allows one value to be passed in because UI elements generally don't logically take on more than one of these. The exception is image and button, so we've added a role imagebutton that is a combination of both.

**`accessibilityStates`**

The new property, `accessibilityStates`, is used to tell Talkback or Voiceover the state a UI Element is in. This property takes on an Array containing one or both of the following values:

- `selected`
- `disabled`

### Solution Two: Adding Accessibility Hints

For this, we added a new property, `accessibilityHint`. Setting this property will allow Talkback or Voiceover to recite the hint to users.

**`accessibilityHint`**

This property takes in the accessibility hint to be read in the form of a String.

On iOS, setting this property will set the corresponding native property AccessibilityHint on the view. The hint will then be read by Voiceover if Accessibility Hints are turned on in the iPhone.

On Android, setting this property appends the value of the hint to the end of the accessibility label. The upside to this implementation is that it mimics the behavior of hints on iOS, but the downside to this implementation is that these hints cannot be turned off in the settings on Android the way they can be on iOS.

The reason we made this decision on Android is because normally, accessibility hints correspond with a specific action (e.g. click), and we wanted to keep behaviors consistent across platforms.

### Solution to Problem Three

**`accessibilityIgnoresInvertColors`**

We exposed Apple's api AccessibilityIgnoresInvertColors to JavaScript, so now when you have a view where you don't want colors to be inverted (e.g image), you can set this property to true, and it won't be inverted.

## New Usage

These new properties will become available in the React Native 0.57 release.

### How to Upgrade

If you are currently using `accessibilityComponentType` and `accessibilityTraits`, here are the steps you can take to upgrade to the new properties.

#### 1. Using jscodeshift

The most simple use cases can be replaced by running a jscodeshift script.

This [script](https://gist.github.com/ziqichen6/246e5778617224d2b4aff198dab0305d) replaces the following instances:

    accessibilityTraits=“trait”
    accessibilityTraits={[“trait”]}

With

    accessibilityRole= “trait”

This script also removes instances of `AccessibilityComponentType` (assuming everywhere you set `AccessibilityComponentType`, you would also set `AccessibilityTraits`).

#### 2. Using a manual codemod

For the cases that used `AccessibilityTraits` that don't have a corresponding value for `AccessibilityRole`, and the cases where multiple traits were passed into `AccessibilityTraits`, a manual codemod would have to be done.

In general,

    accessibilityTraits= {[“button”, “selected”]}

would be manually replaced with

    accessibilityRole=“button”
    accessibilityStates={[“selected”]}

These properties are already being used in Facebook's codebase. The codemod for Facebook was surprisingly simple. The jscodeshift script fixed about half of our instances, and the other half was fixed manually. Overall, the entire process took less than a few hours.

Hopefully you will find the updated API useful! And please continue making apps accessible! #inclusion
