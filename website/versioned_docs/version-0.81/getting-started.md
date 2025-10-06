npx react-native init KasiKush
cd KasiKush
npm install @react-navigation/native @react-navigation/native-stack react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view axios
// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import OrderScreen from './screens/OrderScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Order" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
// screens/HomeScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Kasi Kush!</Text>
      <Button title="View Menu" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
};

export default HomeScreen;
// screens/MenuScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const MenuScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Menu Items</Text>
      {/* Example menu item */}
      <Button title="Order Cannabis Item 1" onPress={() => navigation.navigate('Order')} />
    </View>
  );
};

export default MenuScreen;
// screens/OrderScreen.js

import React from 'react';
import { View, Text, Button } from 'react-native';

const OrderScreen = () => {
  const handlePayment = () => {
    // Implement payment processing for Visa and Apple Pay here
    alert("Payment processing with Visa or Apple Pay.");
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Your Order</Text>
      <Button title="Pay with Visa" onPress={handlePayment} />
      <Button title="Pay with Apple Pay" onPress={handlePayment} />
    </View>
  );
};

export default OrderScreen;
