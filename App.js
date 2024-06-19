/** @format */

import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/routers/Router';

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style='auto' />
			<Router />
		</NavigationContainer>
	);
}
