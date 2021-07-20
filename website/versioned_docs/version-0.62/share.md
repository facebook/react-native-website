---
id: share
title: Share
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## Example

<Tabs groupId="syntax" defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

```SnackPlayer name=Function%20Component%20Example&supportedPlatforms=ios,android
import React from 'react';
import { Share, View, Button } from 'react-native';

export default ShareExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });
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
  return (
    <View style={{ marginTop: 50 }}>
      <Button onPress={onShare} title="Share" />
    </View>
  );
};
```

</TabItem>
<TabItem value="classical">

```SnackPlayer name=Class%20Component%20Example&supportedPlatforms=ios,android
import React, { Component } from 'react';
import { Share, View, Button } from 'react-native';

class ShareExample extends Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

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
      <View style={{ marginTop: 50 }}>
        <Button onPress={this.onShare} title="Share" />
      </View>
    );
  }
}

export default ShareExample;
```

</TabItem>
</Tabs>

# Reference

## Methods

### `share()`

```jsx
static share(content, options)
```

Open a dialog to share text content.

In iOS, returns a Promise which will be invoked with an object containing `action` and `activityType`. If the user dismissed the dialog, the Promise will still be resolved with action being `Share.dismissedAction` and all the other keys being undefined. Note that some share options will not appear or work on the iOS simulator.

In Android, returns a Promise which will always be resolved with action being `Share.sharedAction`.

### Content

- `message` - a message to share

#### iOS

- `url` - an URL to share

At least one of URL and message is required.

#### Android

- `title` - title of the message

### Options

#### iOS

- `subject` - a subject to share via email
- `excludedActivityTypes`
- `tintColor`

#### Android

- `dialogTitle`

---

### `sharedAction()`

```jsx
static sharedAction()
```

The content was successfully shared.

---

### `dismissedAction()`

```jsx
static dismissedAction()
```

_iOS Only_. The dialog has been dismissed.
