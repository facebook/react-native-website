---
id: share
title: Share
---

## Basic Example

```jsx
import React, {Component} from 'react'
import {Share, Button} from 'react-native'

class ShareExample extends Component {

  async onShare = () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      })

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    return (
      <Button onPress={this.onShare}>Share</Button>
    );
  }

}
```

---

# 文档

## 方法

### `share()`

```jsx
static share(content, options)
```

打开一个对话框来共享文本内容。

在 iOS 中，返回一个 Promise，最终会解析为一个对象，包含有`action`和`activityType`两个属性。如果用户取消对话框，则 Promise 仍将被解析，最终返回的`action`属性会是`Share.dismissedAction`，而其他属性为 undefined。Note that some share options will not appear or work on the iOS simulator.

在 Android 中同样返回一个 Promise，但返回的`action`始终为`Share.sharedAction`。

### Content

- `message` - 要分享的消息
- `title` - 消息的标题

#### iOS

- `url` - 要分享的网址

至少需要一个 URL 和消息。

### Options

#### iOS

- `subject` - 通过邮件分享的标题
- `excludedActivityTypes`
- `tintColor`

#### Android

- `dialogTitle`

---

### `sharedAction()`

```jsx
static sharedAction()
```

表示内容已成功分享。

---

### `dismissedAction()`

```jsx
static dismissedAction()
```

表示对话框被取消。仅限 iOS。
