/** @format */

import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import { Col, Row, Text, Button, Section } from '@bsdaoquang/rncomponent';
import { HandleEmploeeAPI } from '../../apis/emploeeAPI';
import {
	ActivityIndicator,
	Dimensions,
	FlatList,
	Image,
	View,
	TouchableOpacity
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { globalStyles } from '../../styles/globalStyles';

const EmploeeScreen = ({ navigation }) => {
	const [emploese, setEmploese] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const WIDTH = (Dimensions.get('window').width - 64) / 3;
	const isFocused = useIsFocused();

	useEffect(() => {
		isFocused && handleGetEmployese();
	}, [isFocused]);

	const handleGetEmployese = async () => {
		const api = `/get-emploese`;
		emploese.length === 0 &&
		setIsLoading(true);
		try {
			const res = await HandleEmploeeAPI(api);
			if (res.data) {
				setEmploese(res.data);
			}
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	return (
		<Container isScroll={false}>
			<Row justifyContent='space-between'>
				<Text text='Quản lý' size={28} weight='bold' color='#8e44ad' />
				<Button
					inline
					color='coral'
					title='Thêm nhân viên'
					onPress={() => navigation.navigate('AddNewEmploee')}
					radius={4}
					size='small'
				/>
			</Row>
			{isLoading ? (
				<ActivityIndicator />
			) : emploese.length > 0 ? (
				<FlatList
					style={{ paddingTop: 16 }}
					data={emploese}
					renderItem={({ item }) => (
						<TouchableOpacity onPress={() => navigation.navigate('EmploeeDetail', {id: item._id})}
							style={{
								width: WIDTH,
								marginBottom: 16,
								borderRadius: 12,
							}}>
							<Image
								source={{ uri: item.img }}
								style={{
									width: WIDTH,
									height: WIDTH * 1.2,
									resizeMode: 'cover',
									borderRadius: 12,
								}}
							/>
							<View style={[globalStyles.center, { paddingVertical: 8 }]}>
								<Text text={item.name} weight={'500'} numberOfLine={1}/>
								<Text text={item.birthday} size={12} />
								<Text text={item.title} weight={'600'} />
							</View>
						</TouchableOpacity>
					)} numColumns={3} columnWrapperStyle={{justifyContent: 'space-between'}}
					keyExtractor={(item) => item._id}
				/>
			) : (
				<Section>
					<Text text='Chưa có nhân viên' />
				</Section>
			)}
		</Container>
	);
};

export default EmploeeScreen;
