---
id: version-0.5-accessibilityinfo
title: AccessibilityInfo
original_id: accessibilityinfo
---

Sometimes it's useful to know whether or not the device has a screen reader that is currently active. The `AccessibilityInfo` API is designed for this purpose. You can use it to query the current state of the screen reader as well as to register to be notified when the state of the screen reader changes.

Here's a small example illustrating how to use `AccessibilityInfo`:

```jsx
class ScreenReaderStatusExample extends React.Component {
  state = {
    screenReaderEnabled: false,
  };

  componentDidMount() {
    AccessibilityInfo.addEventListener(
      'change',
      this._handleScreenReaderToggled,
    );
    AccessibilityInfo.fetch().done((isEnabled) => {
      this.setState({
        screenReaderEnabled: isEnabled,
      });
    });
  }

  componentWillUnmount() {
    AccessibilityInfo.removeEventListener(
      'change',
      this._handleScreenReaderToggled,
    );
  }

  _handleScreenReaderToggled = (isEnabled) => {
    this.setState({
      screenReaderEnabled: isEnabled,
    });
  };

  render() {
    return (
      <View>
        <Text>
          The screen reader is{' '}
          {this.state.screenReaderEnabled ? 'enabled' : 'disabled'}.
        </Text>
      </View>
    );
  }
}
```

### Methods

- [`fetch`](accessibilityinfo.md#fetch)
- [`addEventListener`](accessibilityinfo.md#addeventlistener)
- [`setAccessibilityFocus`](accessibilityinfo.md#setaccessibilityfocus)
- [`announceForAccessibility`](accessibilityinfo.md#announceforaccessibility)
- [`removeEventListener`](accessibilityinfo.md#removeeventlistener)

---

# Reference

## Methods

### `fetch()`

```jsx
AccessibilityInfo.fetch();
```

Query whether a screen reader is currently enabled. Returns a promise which resolves to a boolean. The result is `true` when a screen reader is enabled and `false` otherwise.

---

### `addEventListener()`

```jsx
AccessibilityInfo.addEventListener(eventName, handler);
```

Add an event handler.

| Name      | Type     | Required | Description       |
| --------- | -------- | -------- | ----------------- |
| eventName | string   | Yes      | Name of the event |
| handler   | function | Yes      | Event handler     |

Supported events:

- `change`: Fires when the state of the screen reader changes. The argument to the event handler is a boolean. The boolean is `true` when a screen reader is enabled and `false` otherwise.
- `announcementFinished`: iOS-only event. Fires when the screen reader has finished making an announcement. The argument to the event handler is a dictionary with these keys:
  - `announcement`: The string announced by the screen reader.
  - `success`: A boolean indicating whether the announcement was successfully made.

---

### `setAccessibilityFocus()`

```jsx
AccessibilityInfo.setAccessibilityFocus(reactTag);
```

Set accessibility focus to a React component.

| Name     | Type   | Required | Description         |
| -------- | ------ | -------- | ------------------- |
| reactTag | number | Yes      | React component tag |

| Platform |
| -------- |
| iOS      |

---

### `announceForAccessibility()`

```jsx
AccessibilityInfo.announceForAccessibility(announcement);
```

Post a string to be announced by the screen reader.

| Name         | Type   | Required | Description            |
| ------------ | ------ | -------- | ---------------------- |
| announcement | string | Yes      | String to be announced |

| Platform |
| -------- |
| iOS      |

---

### `removeEventListener()`

```jsx
AccessibilityInfo.removeEventListener(eventName, handler);
```

Remove an event handler.

| Name      | Type     | Required | Description       |
| --------- | -------- | -------- | ----------------- |
| eventName | string   | Yes      | Name of the event |
| handler   | function | Yes      | Event handler     |
