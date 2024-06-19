import { View, Text } from 'react-native'
import React from 'react'
import { Button, Section } from '@bsdaoquang/rncomponent';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { removeAuth } from '../../redux/reducers/authReducer';

const ProfileScreen = () => {

  const dispatch = useDispatch()

  const handleLogout =  async () => {
    await AsyncStorage.removeItem('authData')
    dispatch(removeAuth({}))
  }

  return (
    <View>
      <Section>
        <Button title='Logout' onPress={handleLogout} />
      </Section>
    </View>
  )
}

export default ProfileScreen