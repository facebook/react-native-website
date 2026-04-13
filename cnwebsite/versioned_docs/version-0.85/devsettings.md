---
id: devsettings
title: DevSettings
---

`DevSettings` 模块可以对开发者菜单进行一些自定义。

---

# 文档

## 方法

### `addMenuItem()`

```tsx
static addMenuItem(title: string, handler: () => any);
```

在开发者菜单中添加一个自定义的菜单项。

**参数：**

| 名称                                                     | 类型     |
| -------------------------------------------------------- | -------- |
| title <div className="label basic required">必需</div>   | string   |
| handler <div className="label basic required">必需</div> | function |

**示例：**

```tsx
DevSettings.addMenuItem('Show Secret Dev Screen', () => {
  Alert.alert('Showing secret dev screen!');
});
```

---

### `reload()`

```tsx
static reload(reason?: string): void;
```

重新加载应用。可以直接调用，也可以通过用户交互来触发。

**示例：**

```tsx
<Button title="Reload" onPress={() => DevSettings.reload()} />
```
