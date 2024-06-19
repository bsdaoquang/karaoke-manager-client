/** @format */

import { Section } from '@bsdaoquang/rncomponent';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addAuth, authSelector } from '../redux/reducers/authReducer';
import AuthNavigater from './navigations/AuthNavigater';
import TabNavigator from './navigations/TabNavigator';

const Router = () => {
	const [isLoading, setIsLoading] = useState(true);
	const auth = useSelector(authSelector);
	const dispatch = useDispatch();

	useEffect(() => {
		checkLogin();
	}, []);

	const checkLogin = async () => {
		const res = await AsyncStorage.getItem('authData');

		if (res) {
			dispatch(addAuth(JSON.parse(res)));
		}

		setIsLoading(false);
	};

	const Stack = createNativeStackNavigator();
	return isLoading ? (
		<Section styles={{ flex: 1, justifyContent: 'center' }}>
			<ActivityIndicator />
		</Section>
	) : auth._id && auth.username ? (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<Stack.Screen name='Home' component={TabNavigator} />
		</Stack.Navigator>
	) : (
		<AuthNavigater />
	);
};

export default Router;
