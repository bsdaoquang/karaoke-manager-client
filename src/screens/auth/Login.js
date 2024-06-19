import { View, Text, ScrollView, Platform, StatusBar } from 'react-native'
import React from 'react'
import {globalStyles} from '../../styles/globalStyles';

const Login = () => {
  return (
    <ScrollView style={[globalStyles.container, {
      flexGrow: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40
    }]} >
      <View style={[globalStyles.center, globalStyles.container]}>
      <Text>Login</Text>
      </View>
    </ScrollView>
  )
}

export default Login