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
