import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './navigations/TabNavigator';
import AuthNavigater from './navigations/AuthNavigater';

const Router = () => {

  const Stack = createNativeStackNavigator()
  return 1 < 2 ? <AuthNavigater />: (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='Home' component={TabNavigator} />
    </Stack.Navigator>
  )
}

export default Router