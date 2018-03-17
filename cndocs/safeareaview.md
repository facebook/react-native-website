---
id: safeareaview
title: SafeAreaView
---

Render content within safe area boundaries of an device.

iOS: Renders nested content and automatically applies paddings reflect the portion of the view that is not covered by navigation bars, tab bars, toolbars, and other ancestor views. Moreover, and most importantly, Safe Area's paddings reflect physical limitation of the screen, such as rounded corners or camera notches (aka sensor housing area on iPhone X).

Android: Not applicable.

```javascript
<SafeAreaView style={{ flex: 1 }}>
  <View style={{ flex: 1 }}>
    <Text>Hello World!</Text>
  </View>
</SafeAreaView>
```

### Props

* [View props...](view.md#props)
