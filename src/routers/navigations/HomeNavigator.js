import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import AddNewRoom from '../../screens/home/AddNewRoom';
import HomeScreen from '../../screens/home/HomeScreen';

const HomeNavigator = () => {

  const Stack = createNativeStackNavigator()

  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='AddNewRoom' component={AddNewRoom} />
    </Stack.Navigator>
  )
}

export default HomeNavigator