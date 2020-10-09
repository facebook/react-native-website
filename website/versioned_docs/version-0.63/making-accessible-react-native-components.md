---
id: version-0.63-accessibility-guide
title: Making Accessible React Native Components
description: A guide for how to make accessible react native components.
original_id: accessibility-guide
---

Accessibility is the degree to which a product or service can be used by a customer with a particular disability. The more easily and efficiently a customer with disabilities can use a product or service, the more accessible it is. According to The World Bank, 15% of the world's population has some type of disability. People with disabilities depend on accessible apps and services to communicate, learn, and work. Both iOS and Android provide various of APIs for making apps accessible. Similarly, React Native has included many APIs in order to provide the same level support as native apps in terms of accessibility. This doc aims to get you started making your react native component accessible.

## Basic Accessibility Checklist

The accessibility rule of thumb is to use built-in react native components over custom ones. If you can use react native components with built-in accessibility, do so.

### Tag component accessible

Set accessible={true} if the element is not focusable by default such as a custom switch or slider.

### Set accessibility label

Ensure that all meaningful on-screen elements have labels. While testing with the screen reader, if you touch an element and its description is not read, you need to set accessibility label on the element. If the element has an on-screen text, the screen reader will take that as the accessibility label if the label is not explicitly set. Do not to put too much information into the label. Do not include accessibility role and state. For example, if a switch is used to toggle a light, the switch’s label should be “light”, not “light is on”.

### Set accessibility role

If the element is a custom component, ensure that the element has an informative description of its type by setting accessibility role, such as “button”, “link” and “checkbox”. Use accessibilityRole API instead of accessibilityTrait(iOS) and accessbilityComponentType(Android). accessibilityTrait and accessbilityComponentType are removed in React Native 0.60. See the [React Native API document](https://facebook.github.io/react-native/docs/accessibility#accessibilityrole-ios-android) for more information.

### Set accessibility state

Ensure that the element exposes its status by setting accessibility state if it can have one or more of the following states - disabled, selected, checked, busy or expanded. Changes in accessibility state will result in a notification to the screen reader, which could alert the user that a change has occurred. The screen reader will determine what to say about the state. The same state can be spoken differently depending on the platform (iOS or Android) and the accessibility role of the element. For example, both checkbox and switch can have state “checked”. However, screen reader says “checked” for checkbox but “on” for switch. React Native doesn’t support giving custom label on the state. Use accessibilityState API instead of accessibilityStates which is deprecated now. See the [React Native API document](https://facebook.github.io/react-native/docs/accessibility#accessibilitystate-ios-android) for more information.

### Set accessibility value

When a component has a static label and a dynamic value, set accessibilityValue property to return the value. It can be numeric or textual. For example, although an element that represents a slider might have the label “Volume,” its value is the current value like 24 or 35%. Another example, for a button which represents a thermostat, the accessibility label should be the name of the thermostat such as “living room” and the accessibility value should be the temperature such as “67°F”. Whenever the accessibility value is changed, the screen reader will announce the new value. See the [React Native API document](https://facebook.github.io/react-native/docs/accessibility#accessibilityvalue-ios-android) for more information.

### Implement accessibility actions

Any component supporting touch interaction that is more than a click (double tap if screen reader is on), needs to implement accessibility action. For example, a custom slider should add increment and decrement actions and adjust the slider’s value in onAccessibilityAction callback. Another example, swipeable row which allows for horizontal swiping left and right to perform some actions like deleting a row should add swipe right and swipe left actions to accessibilityActions prop and implement onAccessibilityAction callback to invoke the function as the swipe is performed. See the [React Native API document](https://facebook.github.io/react-native/docs/accessibility#accessibility-actions) for more information.

### DON’T make accessibility announcements whenever possible

Announcement events are discouraged. They’re highly timing dependent and there are lots of cases in which the timing of the updates is off such that the user never hears the announcement. This also doesn’t support other disabilities such as blind customers using braille.

## Accessibility APIs Availability

The following table shows which version of React Native and the corresponding TypeScript definition that the accessibility APIs mentioned above were introduced.

| API                                     | Version of React Native | Version of @types/react-native | Removed version |
| --------------------------------------- | ----------------------- | ------------------------------ | --------------- |
| accessible                              | 0.5                     | first release                  | N/A             |
| ---                                     | ---                     | ---                            | ---             |
| accessibilityLabel                      | 0.5                     | first release                  | N/A             |
| accessibilityRole                       | 0.57                    | 0.57                           | N/A             |
| accessibilityState                      | 0.61                    | 0.6                            | N/A             |
| accessbilityValue                       | 0.62                    | 0.62                           | N/A             |
| accessibilityActions                    | 0.6                     | 0.6                            | N/A             |
| ~~accessibilityTrait (iOS)~~            | 0.5                     | first release                  | 0.6             |
| ~~accessbilityComponentType (Android)~~ | 0.5                     | first release                  | 0.6             |
| ~~accessibilityStates~~                 | 0.57                    | 0.57                           | 0.62            |

## Notes Based on Components

### Button/Touchable

1. Set accessibility label.
2. Set accessibility role such as button, imagebutton or link on the Touchables.
3. Set accessibility state properly such as "disabled" if the component can be disabled.

### Switch/Radio Button/Checkbox

1. Ideally the switch/radio button/checkbox should be grouped with the adjacent text as a single selectable component. First, set`accessible={true}`on the container which wraps the text and the switch/radio button. Second, set `importantForAccessibility='no-hide-descendants'` on the switch/radio button/checkbox for the sake of Android.

> On Android, {accessible} doesn't work as described in the API document if some elements in the group are accessible. Setting this prop will result in multiple accessibility focus - one on the group view and the other on the accessible child elements. Therefore, we need to hide the accessible elements using importForAccessibility API. This API is android specific but it does no harm on iOS.

1. Set accessibility label. Do not include the state of the component such as "on/off" or "checked/unchecked" in the label.
2. Set accessibility role.
3. Set accessibility state "checked" properly. If the component can be disabled, set "disabled" state as well.
4. If the switch and the text are wrapped in a container, add accessibility action "activate" on the container. Toggle the switch/radio button in the onAccessibilityAction function.

### _Sample Code_

```jsx
class Checkbox extends React.Component {
  state = {
    checkbox: false
  };

  _onPress = () => {
    const checkbox = !this.state.checkbox;

    this.setState({
      checkbox: checkbox
    });
  };

  render() {
    return (
      <View
        style={{ flex: 1, flexDirection: 'row' }}
        accessible
        accessibilityLabel="Meat"
        accessibilityRole="checkbox"
        accessibilityState={{ checked: this.state.checkbox }}
        accessibilityActions={[{ name: 'activate' }]}
        onAccessibilityAction={(event) => {
          switch (event.nativeEvent.actionName) {
            case 'activate':
              this._onPress();
              break;
          }
        }}>
        <TouchableWithoutFeedback
          onPress={this._onPress}
          importantForAccessibility="no-hide-descendants">
          <Image
            style={styles.image}
            source={
              this.state.checkbox
                ? checkImageSource
                : uncheckImageSource
            }
          />
        </TouchableWithoutFeedback>
        <Text>Milk</Text>
      </View>
    );
  }
}
```

### Image

1. Add accessibility label to the image.
2. Set accessibility role "image".

### TextInput

1. If it's a search field, set accessibility role "search".
2. Add accessibility label and accessibility role "button" for the clear text button in the edit box.

### Tab

1. Set accessibility role "tab".
2. Set accessibility state "selected" properly.

### Slider/Equalizer

1. Set accessibility role "adjustable".
2. Add support for accessibility actions "increment" and "decrement". Since "increment" and "decrement" are standard actions, action labels are optional.
3. Add the numeric value or the textual value represented by the component to accessibilityValue property.

### _Sample Code_

```jsx
class FakeSliderExample extends React.Component {
  state = {
    current: 50,
    textualValue: 'center'
  };

  increment = () => {
    let newValue = this.state.current + 2;
    if (newValue > 100) {
      newValue = 100;
    }
    this.setState({
      current: newValue
    });
  };

  decrement = () => {
    let newValue = this.state.current - 2;
    if (newValue < 0) {
      newValue = 0;
    }
    this.setState({
      current: newValue
    });
  };

  render() {
    return (
      <View>
        <View
          accessible={true}
          accessibilityLabel="Fake Slider"
          accessibilityRole="adjustable"
          accessibilityActions={[
            { name: 'increment' },
            { name: 'decrement' }
          ]}
          onAccessibilityAction={(event) => {
            switch (event.nativeEvent.actionName) {
              case 'increment':
                this.increment();
                break;
              case 'decrement':
                this.decrement();
                break;
            }
          }}
          accessibilityValue={{
            min: 0,
            now: this.state.current,
            max: 100
          }}>
          <Text>Fake Slider</Text>
        </View>
        <TouchableWithoutFeedback
          accessibilityLabel="Equalizer"
          accessibilityRole="adjustable"
          accessibilityActions={[
            { name: 'increment' },
            { name: 'decrement' }
          ]}
          onAccessibilityAction={(event) => {
            switch (event.nativeEvent.actionName) {
              case 'increment':
                if (this.state.textualValue === 'center') {
                  this.setState({ textualValue: 'right' });
                } else if (this.state.textualValue === 'left') {
                  this.setState({ textualValue: 'center' });
                }
                break;
              case 'decrement':
                if (this.state.textualValue === 'center') {
                  this.setState({ textualValue: 'left' });
                } else if (this.state.textualValue === 'right') {
                  this.setState({ textualValue: 'center' });
                }
                break;
            }
          }}
          accessibilityValue={{ text: this.state.textualValue }}>
          <View>
            <Text>Equalizer</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}
```

### Progress Bar

1. Add accessibility label to the progress bar.
2. Add accessibility role of progress bar.
3. Add the value of the progress to accessibilityValue prop.

> If the value of the progress bar updates frequently, it will result in the announcements for the accessibility value being queued up.

### Picker

1. Add accessibility label to the picker such that the label will be read once focused on the picker but not on change.
