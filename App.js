/** @format */


import {NavigationContainer} from '@react-navigation/native';
import Router from './src/routers/Router';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { Platform, SafeAreaView , StatusBar} from 'react-native';

export default function App() {
	return (
		<NavigationContainer>

			<StatusBar barStyle='ligth-content' translucent backgroundColor={'transparent'}  />
			<Provider store={store}>
				<SafeAreaView style={{flex: 1, backgroundColor: '#212121', paddingTop: Platform.OS === 'android' ?StatusBar.currentHeight : 40}}>
				<Router />
				</SafeAreaView>
			</Provider>
		</NavigationContainer>
	);
}
