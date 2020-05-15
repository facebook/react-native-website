---
id: pressevent
title: PressEvent Object Type
---

`PressEvent` object is returned in the callback as a result of user press interaction, for example `onPress` in [Button](button) component. This object cannot be mutated (it's read only).

## Example

```js
{
    changedTouches: [PressEvent],
    identifier: 1,
    locationX: 8,
    locationY: 4.5,
    pageX: 24,
    pageY: 49.5,
    target: 1127,
    timestamp: 85131876.58868201,
    touches: []
}
```

## Keys and values

### `changedTouches`

TODO

| Type                 | Optional |
| -------------------- | -------- |
| array of PressEvents | No       |

### `force` <div class="label ios">iOS</div>

Amount of force used during the 3D Touch press. Returns the float value in range from `0.0` to `1.0`.

| Type   | Optional |
| ------ | -------- |
| number | Yes      |

### `identifier`

Unique for session number identifier assigned to the event.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `locationX`

Touch origin X coordinate inside touchable area.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `locationY`

Touch origin Y coordinate inside touchable area.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `pageX`

Touch origin X coordinate on the screen (root view).

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `pageY`

Touch origin Y coordinate on the screen (root view).

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `target`

TODO

| Type   | Optional |
| ------ | -------- |
| number | Yes      |

### `timestamp`

Timestamp value when a press event occured. Value is represented in miliseconds.

| Type   | Optional |
| ------ | -------- |
| number | No       |

### `touches`

TODO

| Type                 | Optional |
| -------------------- | -------- |
| array of PressEvents | No       |

## Used by

- [Button](button)
- [PanResponder](panresponder)
- [Pressable](pressable)
- [ScrollView](scrollview)
- [Text](text)
- [TextInput](textinput)
- [TouchableNativeFeedback](touchablenativefeedback)
- [TouchableWithoutFeedback](touchablewithoutfeedback)
