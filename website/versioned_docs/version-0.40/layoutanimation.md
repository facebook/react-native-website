---
id: version-0.40-layoutanimation
title: LayoutAnimation
original_id: layoutanimation
---

Automatically animates views to their new positions when the next layout happens.

A common way to use this API is to call it before calling `setState`.

Note that in order to get this to work on **Android** you need to set the following flags via `UIManager`:

    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

### Methods

- [`configureNext`](layoutanimation.md#configurenext)
- [`create`](layoutanimation.md#create)

### Properties

- [`Types`](layoutanimation.md#types)
- [`Properties`](layoutanimation.md#properties)
- [`configChecker`](layoutanimation.md#configchecker)
- [`Presets`](layoutanimation.md#presets)
- [`easeInEaseOut`](layoutanimation.md#easeineaseout)
- [`linear`](layoutanimation.md#linear)
- [`spring`](layoutanimation.md#spring)

---

# Reference

## Methods

### `configureNext()`

```jsx
static configureNext(config, onAnimationDidEnd?)
```

Schedules an animation to happen on the next layout.

@param config Specifies animation properties:

- `duration` in milliseconds
- `create`, config for animating in new views (see `Anim` type)
- `update`, config for animating views that have been updated (see `Anim` type)

@param onAnimationDidEnd Called when the animation finished. Only supported on iOS. @param onError Called on error. Only supported on iOS.

---

### `create()`

```jsx
static create(duration, type, creationProp)
```

Helper for creating a config for `configureNext`.

## Properties

---

---

---

---

---

---
