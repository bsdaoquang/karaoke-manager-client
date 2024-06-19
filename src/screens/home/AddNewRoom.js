/** @format */

import { ScrollView, StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import { globalStyles } from '../../styles/globalStyles';
import {
	Button,
	Input,
	Row,
	Section,
	Space,
	Text,
	colors,
} from '@bsdaoquang/rncomponent';

const initState = {
	title: '',
	img: '',
	type: false,
	price: '',
	status: '',
};

const AddNewRoom = ({ navigation }) => {
	// Khi có nhiều hơn 2 state, khai báo theo dạng object để tiện quản lý
	const [formData, setFormData] = useState(initState);

	// Hàm này giúp thay đổi state của formdata
	const handleChangeData = (val, key) => {
		const items = { ...formData };
		// vì formData là 1 biến tham chiếu nên cần tạo 1 biến copy

		items[`${key}`] = val;

		setFormData(items);
	};

	const handleAddNewRoom = async () => {
		console.log(formData);
	};

	return (
		<ScrollView style={[globalStyles.container]}>
			{/* <Section styles={{ paddingTop: 20 }}>
				<Row>
					<Button title='upload image' size='small' inline />
					<Space width={12} />
					<Button title='Take a picture' size='small' inline />
				</Row>
			</Section> */}
			<Section>
				<Text text='Tạo phòng mới' size={28} />
			</Section>
			{formData.img && (
				<Image
					source={{ uri: formData.img }}
					style={{ width: '100%', height: 220, resizeMode: 'cover' }}
				/>
			)}
			<Section>
				<Input
					label='Image url'
					value={formData.img}
					onChange={(val) => handleChangeData(val, 'img')}
					clear
				/>
				<Input
					label='Tên phòng'
					value={formData.title}
					placeholder='Tên phòng'
					onChange={(val) => handleChangeData(val, 'title')}
					clear
				/>
				<Input
					label='Giá tiền'
					keyboardType='number-pad'
					value={formData.price}
					placeholder='Giá tiền'
					onChange={(val) => handleChangeData(val, 'price')}
					clear
				/>

				<Text text='Loại phòng' weight={'500'} />
				{/* Loại phòng chỉ có thể là 1 trong 2 nên sẽ sử dụng loại boolean */}
				<Row justifyContent='flex-start' styles={{ paddingVertical: 12 }}>
					<Row
						styles={{ flex: 0 }}
						onPress={() => handleChangeData(true, 'type')}>
						<View
							style={[
								styles.radio,
								{
									borderColor: formData.type ? colors.blue400 : '#e0e0e0',
								},
							]}>
							{formData.type && (
								<View
									style={[
										styles.radio,
										{
											width: 12,
											height: 12,
											backgroundColor: colors.blue400,
										},
									]}
								/>
							)}
						</View>
						<Text text='Phòng thường' />
					</Row>
					<Space width={20} />
					<Row onPress={() => handleChangeData(false, 'type')}>
						<View
							style={[
								styles.radio,
								{
									borderColor: !formData.type ? colors.blue400 : '#e0e0e0',
								},
							]}>
							{!formData.type && (
								<View
									style={[
										styles.radio,
										{
											width: 12,
											height: 12,
											backgroundColor: colors.blue400,
										},
									]}
								/>
							)}
						</View>
						<Text text='Phòng VIP' />
					</Row>
				</Row>
			</Section>
			<Section>
				<Button title='Đồng ý' type='primary' onPress={handleAddNewRoom} />
			</Section>
		</ScrollView>
	);
};

export default AddNewRoom;

const styles = StyleSheet.create({
	radio: {
		width: 18,
		height: 18,
		padding: 2,
		borderColor: '#e0e0e0',
		borderWidth: 1,
		borderRadius: 100,
		marginRight: 8,
	},
});
