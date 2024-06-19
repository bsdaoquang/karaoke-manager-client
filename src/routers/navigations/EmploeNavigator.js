import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EmploeeScreen from '../../screens/emploese/EmploeeScreen';

const EmploeeNavigator = () => {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='EmploeeScreen' component={EmploeeScreen} />
    </Stack.Navigator>
  )
}

export default EmploeeNavigator