---
id: version-0.49-accessibilityinfo
title: AccessibilityInfo
original_id: accessibilityinfo
---

Sometimes it's useful to know whether or not the device has a screen reader that is currently active. The `AccessibilityInfo` API is designed for this purpose. You can use it to query the current state of the screen reader as well as to register to be notified when the state of the screen reader changes.

Here's a small example illustrating how to use `AccessibilityInfo`:

```js
class ScreenReaderStatusExample extends React.Component {
  state = {
    screenReaderEnabled: false,
  }

  componentDidMount() {
    AccessibilityInfo.addEventListener(
      'change',
      this._handleScreenReaderToggled
    );
    AccessibilityInfo.fetch().done((isEnabled) => {
      this.setState({
        screenReaderEnabled: isEnabled
      });
    });
  }

  componentWillUnmount() {
    AccessibilityInfo.removeEventListener(
      'change',
      this._handleScreenReaderToggled
    );
  }

  _handleScreenReaderToggled = (isEnabled) => {
    this.setState({
      screenReaderEnabled: isEnabled,
    });
  }

  render() {
    return (
      <View>
        <Text>
          The screen reader is {this.state.screenReaderEnabled ? 'enabled' : 'disabled'}.
        </Text>
      </View>
    );
  }
}
```

### 方法

<div class="props">
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="fetch"></a><span class="methodType">static </span>fetch<span
            class="methodType">()</span> <a class="hash-link" href="#fetch">#</a></h4>
        <div><p>Query whether a screen reader is currently enabled. Returns a promise which
            resolves to a boolean. The result is <code>true</code> when a screen reader is enabled
            and <code>false</code> otherwise.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="addeventlistener"></a><span class="methodType">static </span>addEventListener<span
            class="methodType">(eventName, handler)</span> <a class="hash-link"
                                                              href="#addeventlistener">#</a>
    </h4>
        <div><p>Add an event handler. Supported events:</p>
            <ul>
                <li><code>change</code>: Fires when the state of the screen reader changes. The argument
                    to the event handler is a boolean. The boolean is <code>true</code> when a screen
                    reader is enabled and <code>false</code> otherwise.
                </li>
                <li><code>announcementFinished</code>: iOS-only event. Fires when the screen reader has
                    finished making an announcement. The argument to the event handler is a dictionary
                    with these keys:
                    <ul>
                        <li><code>announcement</code>: The string announced by the screen reader.</li>
                        <li><code>success</code>: A boolean indicating whether the announcement was successfully made.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="setaccessibilityfocus"></a><span
            class="methodType">static </span>setAccessibilityFocus<span class="methodType">(reactTag)</span> <a
            class="hash-link" href="#setaccessibilityfocus">#</a></h4>
        <div><p>iOS-Only. Set accessibility focus to a react component.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="announceforaccessibility"></a><span
            class="methodType">static </span>announceForAccessibility<span class="methodType">(announcement)</span> <a
            class="hash-link" href="#announceforaccessibility">#</a></h4>
        <div><p>iOS-Only. Post a string to be announced by the screen reader.</p></div>
    </div>
    <div class="prop"><h4 class="methodTitle"><a class="anchor" name="removeeventlistener"></a><span class="methodType">static </span>removeEventListener<span
            class="methodType">(eventName, handler)</span> <a class="hash-link"
                                                              href="#removeeventlistener">#</a>
    </h4>
        <div><p>Remove an event handler.</p></div>
    </div>
</div>