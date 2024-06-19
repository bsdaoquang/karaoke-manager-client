/** @format */

import { ScrollView, Platform, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import { Button, Input, Row, Section, Text } from '@bsdaoquang/rncomponent';

const Register = ({navigation}) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleRegister = async () => {};

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
				<Text text='Register' size={32} weight={'bold'} />
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
        <Button title='Register' type='primary' onPress={handleRegister} />
      </Section>
      <Section>
        <Button title='Login' onPress={() => navigation.navigate('Login')} type='link' />
      </Section>
		</ScrollView>
	);
};

export default Register;