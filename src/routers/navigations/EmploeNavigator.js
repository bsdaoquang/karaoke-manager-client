import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import EmploeeScreen from '../../screens/emploese/EmploeeScreen';
import AddNewEmploee from '../../screens/emploese/AddNewEmploee';

const EmploeeNavigator = () => {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='EmploeeScreen' component={EmploeeScreen} />
      <Stack.Screen name='AddNewEmploee' component={AddNewEmploee} />
    </Stack.Navigator>
  )
}

export default EmploeeNavigator