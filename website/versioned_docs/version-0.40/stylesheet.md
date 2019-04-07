---
id: version-0.40-stylesheet
title: StyleSheet
original_id: stylesheet
---

A StyleSheet is an abstraction similar to CSS StyleSheets

Create a new StyleSheet:

```
var styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  activeTitle: {
    color: 'red',
  },
});
```

Use a StyleSheet:

```
<View style={styles.container}>
  <Text style={[styles.title, this.props.isActive && styles.activeTitle]} />
</View>
```

Code quality:

- By moving styles away from the render function, you're making the code easier to understand.
- Naming the styles is a good way to add meaning to the low level components in the render function.

Performance:

- Making a stylesheet from a style object makes it possible to refer to it by ID instead of creating a new style object every time.
- It also allows to send the style only once through the bridge. All subsequent uses are going to refer an id (not implemented yet).

### Methods

- [`setStyleAttributePreprocessor`](stylesheet.md#setstyleattributepreprocessor)
- [`create`](stylesheet.md#create)

### Properties

- [`hairlineWidth`](stylesheet.md#hairlinewidth)
- [`absoluteFill`](stylesheet.md#absolutefill)
- [`absoluteFillObject`](stylesheet.md#absolutefillobject)
- [`flatten`](stylesheet.md#flatten)

---

# Reference

## Methods

### `setStyleAttributePreprocessor()`

```javascript
static setStyleAttributePreprocessor(property, process)
```

WARNING: EXPERIMENTAL. Breaking changes will probably happen a lot and will not be reliably announced. The whole thing might be deleted, who knows? Use at your own risk.

Sets a function to use to pre-process a style property value. This is used internally to process color and transform values. You should not use this unless you really know what you are doing and have exhausted other options.

---

### `create()`

```javascript
static create(obj)
```

Creates a StyleSheet style reference from the given object.

## Properties

---

---

---
