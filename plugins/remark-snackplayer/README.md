<h1 align="center">Remark SnackPlayer</h1>

<p align="center">Remark plugin to embed <a href="https://snack.expo.io/">Expo Snack's</a> using Code Blocks</p>

## Usage

This plugin parses codeblocks with language set as `SnackPlayer` and replaces them with embedded Expo's SnackPlayers, you can also provide parameters along with the codeblock to set some basic details.

### Example Code Block

````
```SnackPlayer name=Hello%20World description=This%20is%20a%20description
import React from 'react';
import { Text, View } from 'react-native';

const YourApp = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Try editing me! 🎉</Text>
    </View>
  );
}

export default YourApp;
```
````

The above code snippet would look like this:

<img width="783" alt="Screenshot 2020-10-03 at 1 11 19 AM" src="https://user-images.githubusercontent.com/11258286/94963203-67de3500-0515-11eb-974a-a2289c0bfdc8.png">

### Parameters

| Name               | Description                                               | Default             |
| ------------------ | --------------------------------------------------------- | ------------------- |
| name               | SnackPlayer name                                          | `"Example"`         |
| description        | Description of the example                                | `"Example usage"`   |
| dependencies       | Additional dependencies, eg. `"expo-constant"`            | `""`                |
| platform           | Example platform                                          | `"web"`             |
| supportedPlatforms | Supported platforms                                       | `"ios,android,web"` |
| theme              | SnackPlayer theme, `"light"` or `"dark"`                  | `"light"`           |
| preview            | Preview visible, `"true"` or `"false"`                    | `"true"`            |
| loading            | iFrame loading attribute, `"auto"`, `"lazy"` or `"eager"` | `"lazy"`            |

## Styling

To style the Snack Player wrapper you can use `.snack-player` class.
