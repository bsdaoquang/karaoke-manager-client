/** @format */

import { Button, Input, Loading, Section, Text } from '@bsdaoquang/rncomponent';
import React, { useState } from 'react';
import { Alert, Platform, ScrollView, StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import { HandleAuthentication } from '../../apis/authAPI';
import { globalStyles } from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addAuth } from '../../redux/reducers/authReducer';

const Register = ({navigation}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [comfirmPassword, setComfirmPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch()

	const handleRegister = async () => {
		if (username && password && comfirmPassword) {
			if (comfirmPassword === password) {
				const data = {username, password}
			const api = `/register`

			setIsLoading(true)
			try {
				const res = await HandleAuthentication(api, data, 'post')
				
					// save to get again when user reopen app
					await AsyncStorage.setItem('authData', JSON.stringify(res.data))

					dispatch(addAuth(res.data))
				setIsLoading(false)
			} catch (error) {
				console.log(error)
				setIsLoading(false)
			}
			}else{
				Alert.alert('Lỗi', 'Password is not match')
			}
			
		}else{
			Alert.alert('Lỗi', 'Please enter your username and/or password')
		}
	};

	return (
		<ScrollView
			style={[
				globalStyles.container,
				{
					flexGrow: 1,
					paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
				},
			]}>
			<Section flex={1} styles={{ marginTop: 20 }}>
				<Text text='Register' color='white' size={32} weight={'bold'} />
			</Section>
			<Section>
				<Input
					placeholder='User name'
					label='User name'
					required

					helpText='Please enter username'
					value={username}
					onChange={(val) => setUsername(val)}
					clear
				/>
				<Input
					label='Password'
          password
					required
					helpText='Your password?'
					placeholder='Password'
					value={password}
					onChange={(val) => setPassword(val)}
				/>
				<Input
					label='Confirm password'
          password
					required
					helpText='Your password?'
					placeholder='Password'
					value={comfirmPassword}
					onChange={(val) => setComfirmPassword(val)}
				/>
			</Section>
      <Section>
        <Button title='Register' type='primary' onPress={handleRegister} />
      </Section>
      <Section>
        <Button title='Login' onPress={() => navigation.navigate('Login')} type='link' />
      </Section>
			<Loading loading={isLoading} />
		</ScrollView>
	);
};

export default Register;
