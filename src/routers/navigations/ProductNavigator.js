import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ProductScreen from '../../screens/products/ProductScreen';

const ProductNavigator = () => {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='ProductScreen' component={ProductScreen} />
    </Stack.Navigator>
  )
}

export default ProductNavigator