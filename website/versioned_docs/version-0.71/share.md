---
id: share
title: Share
---

import Tabs from '@theme/Tabs'; import TabItem from '@theme/TabItem'; import constants from '@site/core/TabsConstants';

## Example

<Tabs groupId="syntax" queryString defaultValue={constants.defaultSyntax} values={constants.syntax}>
<TabItem value="functional">

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Function%20Component%20Example&supportedPlatforms=ios,android&ext=js
import React from 'react';
import {Alert, Share, View, Button} from 'react-native';

const ShareExample = () => {
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
      Alert.alert(error.message);
    }
  };
  return (
    <View style={{marginTop: 50}}>
      <Button onPress={onShare} title="Share" />
    </View>
  );
};

export default ShareExample;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Function%20Component%20Example&supportedPlatforms=ios,android&ext=tsx
import React from 'react';
import {Alert, Share, View, Button} from 'react-native';

const ShareExample = () => {
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
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <View style={{marginTop: 50}}>
      <Button onPress={onShare} title="Share" />
    </View>
  );
};

export default ShareExample;
```

</TabItem>
</Tabs>

</TabItem>
<TabItem value="classical">

<Tabs groupId="language" queryString defaultValue={constants.defaultSnackLanguage} values={constants.snackLanguages}>
<TabItem value="javascript">

```SnackPlayer name=Class%20Component%20Example&supportedPlatforms=ios,android&ext=js
import React, {Component} from 'react';
import {Alert, Share, View, Button} from 'react-native';

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
      Alert.alert(error.message);
    }
  };

  render() {
    return (
      <View style={{marginTop: 50}}>
        <Button onPress={this.onShare} title="Share" />
      </View>
    );
  }
}

export default ShareExample;
```

</TabItem>
<TabItem value="typescript">

```SnackPlayer name=Class%20Component%20Example&supportedPlatforms=ios,android&ext=tsx
import React, {Component} from 'react';
import {Alert, Share, View, Button} from 'react-native';

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
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  render() {
    return (
      <View style={{marginTop: 50}}>
        <Button onPress={this.onShare} title="Share" />
      </View>
    );
  }
}

export default ShareExample;
```

</TabItem>
</Tabs>

</TabItem>
</Tabs>

# Reference

## Methods

### `share()`

```tsx
static share(content: ShareContent, options?: ShareOptions);
```

Open a dialog to share text content.

In iOS, returns a Promise which will be invoked with an object containing `action` and `activityType`. If the user dismissed the dialog, the Promise will still be resolved with action being `Share.dismissedAction` and all the other keys being undefined. Note that some share options will not appear or work on the iOS simulator.

In Android, returns a Promise which will always be resolved with action being `Share.sharedAction`.

**Properties:**

| Name                                                         | Type   | Description                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| content <div className="label basic required">Required</div> | object | `message` - a message to share<br/>`url` - a URL to share <div class="label ios">iOS</div><br/>`title` - title of the message <div class="label android">Android</div><hr/>At least one of `url` and `message` is required.                                                                                                                                              |
| options                                                      | object | `dialogTitle` <div class="label android">Android</div><br/>`excludedActivityTypes` <div class="label ios">iOS</div><br/>`subject` - a subject to share via email <div class="label ios">iOS</div><br/>`tintColor` <div class="label ios">iOS</div><br/>`anchor` - the node to which the action sheet should be anchored (used for iPad) <div class="label ios">iOS</div> |

---

## Properties

### `sharedAction`

```tsx
static sharedAction: 'sharedAction';
```

The content was successfully shared.

---

### `dismissedAction` <div class="label ios">iOS</div>

```tsx
static dismissedAction: 'dismissedAction';
```

The dialog has been dismissed.
