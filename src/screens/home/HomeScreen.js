/** @format */

import { View, Image } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import {
	Button,
	Card,
	Col,
	Input,
	Row,
	Section,
	Space,
	Text,
} from '@bsdaoquang/rncomponent';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
	const [searchKey, setSearchKey] = useState('');
	return (
		<View style={[globalStyles.container]}>
			<Section>
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
					source={require('../../assets/logo.png')}
					style={{
						width: '80%',
						height: 120,
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
				}}
				color='#212121'>
				<Row>
					<Text text='Đặt phòng' size={28} weight='bold' color='#8e44ad' />
					<Space width={8} />
					<Button
						inline
						color='coral'
						title='Chỉnh sửa'
						onPress={() => navigation.navigate('AddNewRoom')}
						radius={4}
						size='small'
					/>
					<Space width={8} />
					<Col>
						<Input
							prefix={<AntDesign name='search1' size={24} color='black' />}
							inline
							value={searchKey}
							onChange={(val) => setSearchKey(val)}
							placeholder='Search'
						/>
					</Col>
				</Row>
			</Card>
		</View>
	);
};

export default HomeScreen;
