/** @format */

import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/routers/Router';
import { Provider } from 'react-redux';
import store from './src/redux/store';

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style='auto' />
			<Provider store={store}>
			<Router />
			</Provider>
		</NavigationContainer>
	);
}
