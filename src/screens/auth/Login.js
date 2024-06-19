/** @format */

import { ScrollView, Platform, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Button, Input, Loading, Row, Section, Text } from '@bsdaoquang/rncomponent';
import { HandleAuthentication } from '../../apis/authAPI';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addAuth } from '../../redux/reducers/authReducer';


const Login = ({navigation}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const dispatch = useDispatch()

	const handleLogin = async () => {
			if (username && password) {
				const data = {username, password}
				const api = `/login`
	
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
				<Text text='Login' size={32} weight={'bold'} />
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
			</Section>
      <Section>
        <Button title='Login' type='primary' onPress={handleLogin} />
      </Section>
      <Section>
        <Button title='Sign up' onPress={() => navigation.navigate('Register')} type='link' />
      </Section>
			<Loading loading={isLoading} />
		</ScrollView>
	);
};

export default Login;
