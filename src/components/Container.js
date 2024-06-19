/** @format */

import { Button, Card, Row, Section } from '@bsdaoquang/rncomponent';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, View } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const Container = (props) => {
	const { children, isScroll } = props;

	const content = (
		<>
			<Section styles={{ paddingTop: 20 }}>
				<Row justifyContent='flex-end'>
					<Button
						inline
						type='text'
						icon={
							<MaterialCommunityIcons name='menu' size={26} color={'white'} />
						}
					/>
				</Row>
			</Section>
			<Section>
				<Image
					source={require('../assets/logo.png')}
					style={{
						width: '80%',
						height: 100,
						resizeMode: 'contain',
					}}
				/>
			</Section>

			<Card
				styles={{
					flex: 1,
					marginHorizontal: 0,
					marginBottom: 0,
					borderRadius: 20,
					borderRadius: 0,
					borderTopRightRadius: 20,
					borderTopLeftRadius: 20,
				}}>
				{children}
			</Card>
		</>
	);

	return isScroll === false ? (
		<View style={[globalStyles.container, { backgroundColor: '#212121' }]}>
			{content}
		</View>
	) : (
		<ScrollView
			style={[
				globalStyles.container,
				{ backgroundColor: '#212121', paddingTop: 20 },
			]}>
			{content}
		</ScrollView>
	);
};

export default Container;
