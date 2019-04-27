---
id: version-0.17-modal
title: Modal
original_id: modal
---

A Modal component covers the native view (e.g. UIViewController, Activity) that contains the React Native root.

Use Modal in hybrid apps that embed React Native; Modal allows the portion of your app written in React Native to present content above the enclosing native view hierarchy.

In apps written with React Native from the root view down, you should use Navigator instead of Modal. With a top-level Navigator, you have more control over how to present the modal scene over the rest of your app by using the configureScene property.

This component is only available in iOS at this time.

### Props

- [`animated`](modal.md#animated)
- [`onDismiss`](modal.md#ondismiss)
- [`transparent`](modal.md#transparent)
- [`visible`](modal.md#visible)

---

# Reference

## Props

### `animated`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `onDismiss`

| Type     | Required |
| -------- | -------- |
| function | No       |

---

### `transparent`

| Type | Required |
| ---- | -------- |
| bool | No       |

---

### `visible`

| Type | Required |
| ---- | -------- |
| bool | No       |
