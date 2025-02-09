---
id: environment-setup
title: Get Started with React Native
hide_table_of_contents: true
---

import PlatformSupport from '@site/src/theme/PlatformSupport';
import BoxLink from '@site/src/theme/BoxLink';

**React Native allows developers who know React to create native apps.** At the same time, native developers can use React Native to gain parity between native platforms by writing common features once.

We believe that the best way to experience React Native is through a **Framework**, a toolbox with all the necessary APIs to let you build production ready apps.

You can also use React Native without a Framework, however we’ve found that most developers benefit from using a React Native Framework like [Expo](https://expo.dev). Expo provides features like file-based routing, high-quality universal libraries, and the ability to write plugins that modify native code without having to manage native files.

<details>
<summary>Can I use React Native without a Framework?</summary>

Yes. You can use React Native without a Framework. **However, if you’re building a new app with React Native, we recommend using a Framework.**

In short, you’ll be able to spend time writing your app instead of writing an entire Framework yourself in addition to your app.

The React Native community has spent years refining approaches to navigation, accessing native APIs, dealing with native dependencies, and more. Most apps need these core features. A React Native Framework provides them from the start of your app.

Without a Framework, you’ll either have to write your own solutions to implement core features, or you’ll have to piece together a collection of pre-existing libraries to create a skeleton of a Framework. This takes real work, both when starting your app, then later when maintaining it.

If your app has unusual constraints that are not served well by a Framework, or you prefer to solve these problems yourself, you can make a React Native app without a Framework using Android Studio, Xcode. If you’re interested in this path, learn how to [set up your environment](set-up-your-environment) and how to [get started without a framework](getting-started-without-a-framework).

</details>

## Start a new React Native project with Expo

<PlatformSupport platforms={['android', 'ios', 'tv', 'web']} />

Expo is a production-grade React Native Framework. Expo provides developer tooling that makes developing apps easier, such as file-based routing, a standard library of native modules, and much more.

Expo's Framework is free and open source, with an active community on [GitHub](https://github.com/expo) and [Discord](https://chat.expo.dev). The Expo team works in close collaboration with the React Native team at Meta to bring the latest React Native features to the Expo SDK.

The team at Expo also provides Expo Application Services (EAS), an optional set of services that complements Expo, the Framework, in each step of the development process.

To create a new Expo project, run the following in your terminal:

```shell
npx create-expo-app@latest
```

Once you’ve created your app, check out the rest of Expo’s getting started guide to start developing your app.

<BoxLink href="https://docs.expo.dev/get-started/set-up-your-environment">Continue with Expo</BoxLink>
import React from "react";
import { View, Text, TouchableOpacity, Switch, Slider, ImageBackground } from "react-native";

const SleepPodUI = () => {
  const [lightOn, setLightOn] = React.useState(true);
  const [temperature, setTemperature] = React.useState(22);
  const [soundOn, setSoundOn] = React.useState(false);
  
  return (
    <ImageBackground source={require("./assets/sleeppod_bg.jpg")} style={{ flex: 1, padding: 20, backgroundColor: "#0A0F1D" }}>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={{ color: "#00CFCF", fontSize: 24, fontWeight: "bold" }}>SleepPod Control</Text>
      </View>
      
      <View style={{ marginBottom: 20 }}>
        <Text style={{ color: "#B0E0E6", fontSize: 18 }}>Температура: {temperature}°C</Text>
        <Slider 
          minimumValue={16} 
          maximumValue={30} 
          step={1} 
          value={temperature} 
          onValueChange={(val) => setTemperature(val)} 
          minimumTrackTintColor="#00CFCF" 
          thumbTintColor="#00CFCF"
        />
      </View>
      
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Text style={{ color: "#B0E0E6", fontSize: 18 }}>Освещение</Text>
        <Switch value={lightOn} onValueChange={() => setLightOn(!lightOn)} thumbColor="#00CFCF" />
      </View>
      
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 20 }}>
        <Text style={{ color: "#B0E0E6", fontSize: 18 }}>Звуковая терапия</Text>
        <Switch value={soundOn} onValueChange={() => setSoundOn(!soundOn)} thumbColor="#00CFCF" />
      </View>
      
      <TouchableOpacity style={{ backgroundColor: "#00CFCF", padding: 15, borderRadius: 10, alignItems: "center" }}>
        <Text style={{ color: "#0A0F1D", fontSize: 18, fontWeight: "bold" }}>Запуск сна</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default SleepPodUI;

