/** @format */

import { ScrollView, StyleSheet, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
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
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/firebaseConfig';
import { HandleRoomAPI } from '../../apis/roomAPI';

const initState = {
	title: '',
	img: '',
	type: false,
	price: '350000',
	status: 'waiting',
};

const AddNewRoom = ({ navigation }) => {
	// Khi có nhiều hơn 2 state, khai báo theo dạng object để tiện quản lý
	const [formData, setFormData] = useState(initState);
	const [file, setFile] = useState();

	// Hàm này giúp thay đổi state của formdata
	const handleChangeData = (val, key) => {
		const items = { ...formData };
		// vì formData là 1 biến tham chiếu nên cần tạo 1 biến copy

		items[`${key}`] = val;

		setFormData(items);
	};

	const handleAddNewRoom = async () => {
		try {
			const data = {...formData}
			if (file) {
				const storageRef = ref(storage, file.fileName);

				// console.log(file.uri)
				const img = await fetch(file.uri);
				const bytes = await img.blob();

				// upload file to storage firebase
				const res = await uploadBytes(storageRef, bytes);

				// get download url
				const downloadUrl = await getDownloadURL(storageRef)

				// update data
				data.img = downloadUrl
			}

			const api = `/add-new`
			
			const res = await HandleRoomAPI(api, data, 'post')

			setFile(undefined)
			setFormData(initState)

			navigation.goBack()

		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ScrollView style={[globalStyles.container]}>
			<Section>
				<Text text='Tạo phòng mới' size={28} />
			</Section>
			{file ? (
				<Image
					source={{ uri: file.uri }}
					style={{
						width: '100%',
						height: 220,
					}}
				/>
			) : (
				<Section styles={{ paddingTop: 20 }}>
					<Row>
						<Button
							onPress={async () =>
								await ImagePicker.launchImageLibraryAsync({})
									.then((result) => {
										setFile(result.assets[0]);
									})
									.catch((error) => console.log(error))
							}
							title='upload image'
							size='small'
							inline
						/>
						<Space width={12} />
						<Button
							onPress={async () =>
								await ImagePicker.launchCameraAsync({})
									.then((result) => {
										setFile(result.assets[0]);
									})
									.catch((error) => console.log(error))
							}
							title='Take a picture'
							size='small'
							inline
						/>
					</Row>
				</Section>
			)}
			<Space height={16} />
			<Section>
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
