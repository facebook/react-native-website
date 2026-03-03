---
id: building-for-tv
title: 🗑️ Building For TV Devices
hide_table_of_contents: true
---

TV devices support has been implemented with the intention of making existing React Native applications work on Apple TV and Android TV, with few or no changes needed in the JavaScript code for the applications.

:::warning Deprecated
TV support has moved to the [React Native for TV](https://github.com/react-native-tvos/react-native-tvos#readme) repository. Please see the **README** there for information on projects for Apple TV or Android TV.
:::
import * as React from 'react';
import { MD2LightTheme, PaperProvider } from 'react-native-paper';
import App from './src/App';

export default function Main() {
  const theme = {
    ...MD2LightTheme,

    // Specify a custom property
    custom: 'property',

    // Specify a custom nested property
    colors: {
      ...MD2LightTheme.colors,
      primary: '#fefefe',
    },
  };

  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}
