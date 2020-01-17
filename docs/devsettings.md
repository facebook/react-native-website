---
id: devsettings
title: DevSettings
---

`DevSettings`

---

# Reference

## Methods

### `addMenuItem()`

```jsx
 addMenuItem(title: string, handler: () => )
```
It allows users to add additional dev menu options to their app, so you can use following code to show secret dev screen

```jsx
DevSettings.addMenuItem('Show Secret Dev Screen', () => {
             Alert.alert('Showing secret dev screen!');
           });
```
