```SnackPlayer name=FirstPlayer
import React from 'react';
import { Text, View } from 'react-native';

const YourApp = () => {
    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
        Try editing me! 🎉
        </Text>
    </View>
    );
}

export default YourApp;
```

```SnackPlayer name=SecondPlayer&theme=dark&preview=false&supportedPlatforms=ios&loading=eager&dependencies=@react-native-community/slider
import React from 'react';
import { View } from 'react-native';
import Slider from '@react-native-community/slider';

const YourApp = () => {
    return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Slider
          style={{width: 200, height: 40}}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
    </View>
    );
}

export default YourApp;
```
