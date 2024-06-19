/** @format */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeNavigator from '../navigations/HomeNavigator';
import EmploeeNavigator from './EmploeNavigator';
import ProductNavigator from './ProductNavigator';
import ProfileNavigator from './ProfileNavigator';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import {View} from 'react-native';


const TabNavigator = () => {
	const Tabs = createBottomTabNavigator();
	return (
		<Tabs.Navigator
			screenOptions={({route}) =>({
				headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:{
          backgroundColor: '#000'
        },
        tabBarIcon: ({focused, size, color}) => {
          size = 24
          color = focused ? 'coral' : '#fafafa'
          let icon;
            switch (route.name){
              case 'HomeTab' :
                icon = <>
                  <Entypo name="home" size={size} color={color} />
                  {focused && <View style={{
                    backgroundColor: color,
                    width: 10,
                    marginTop: 4,
                    height:4,
                    borderRadius: 10
                  }} />}
                </>
              break
              case 'EmploeeTab' :
                icon = <Entypo name="users" size={size} color={color} />
              break
              case 'ProductTab' :
                icon = <Entypo name="box" size={size} color={color} />
              break
              case 'ProfileTab' :
                icon = <FontAwesome5 name="user" size={size} color={color} />
              break
            }
          return icon
        }
			})}>
			<Tabs.Screen name='HomeTab' component={HomeNavigator} />
      <Tabs.Screen name='EmploeeTab' component={EmploeeNavigator} />
      <Tabs.Screen name='ProductTab' component={ProductNavigator} />
      <Tabs.Screen name='ProfileTab' component={ProfileNavigator} />
		</Tabs.Navigator>
	);
};

export default TabNavigator;
