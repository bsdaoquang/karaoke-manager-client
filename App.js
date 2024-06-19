/** @format */


import {NavigationContainer} from '@react-navigation/native';
import Router from './src/routers/Router';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Platform, SafeAreaView , StatusBar} from 'react-native';

export default function App() {
	return (
		<NavigationContainer>

			<StatusBar style='auto' />
			<Provider store={store}>
				<SafeAreaView style={{flex: 1, backgroundColor: '#000', paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40}}>
				<Router />
				</SafeAreaView>
			</Provider>
		</NavigationContainer>
	);
}
