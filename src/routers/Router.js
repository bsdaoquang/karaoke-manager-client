import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from './navigations/TabNavigator';
import AuthNavigater from './navigations/AuthNavigater';
import { addAuth, authSelector } from '../redux/reducers/authReducer';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Router = () => {

  const auth = useSelector(authSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    checkLogin()
  }, [])

  const checkLogin = async () => {
    const res = await AsyncStorage.getItem('authData')

    if (res) {
      dispatch(addAuth(JSON.parse(res)))
    }
  }

  const Stack = createNativeStackNavigator()
  return auth._id && auth.username ?  (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name='Home' component={TabNavigator} />
    </Stack.Navigator>
  ):<AuthNavigater />
}

export default Router