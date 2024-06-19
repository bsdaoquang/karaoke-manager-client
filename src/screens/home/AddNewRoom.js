/** @format */

import {
	Button,
	Col,
	Input,
	Row,
	Section,
	Space,
	Text,
	colors,
} from '@bsdaoquang/rncomponent';
import { SimpleLineIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useEffect, useState } from 'react';
import {
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { HandleRoomAPI } from '../../apis/roomAPI';
import { storage } from '../../firebase/firebaseConfig';
import { globalStyles } from '../../styles/globalStyles';


const AddNewRoom = ({ navigation, route }) => {
	
	const detail = route.params ? route.params.detail : undefined;
	const initState = {
		title: '',
		img: '',
		type: false,
		price: '350000',
		status: 'waiting',
	};

	// Khi có nhiều hơn 2 state, khai báo theo dạng object để tiện quản lý
	const [formData, setFormData] = useState(initState);
	const [file, setFile] = useState();

	useEffect(() => {
		if (route.params) {
			

			setFormData({
				img: detail.img,
				title: detail.title,
				price: detail.price,
				type: detail.type === 'true',
			});
		}
	}, [detail]);

	// Hàm này giúp thay đổi state của formdata
	const handleChangeData = (val, key) => {
		const items = { ...formData };
		// vì formData là 1 biến tham chiếu nên cần tạo 1 biến copy

		items[`${key}`] = val;

		setFormData(items);
	};

	const handleAddNewRoom = async () => {
		try {
			const data = { ...formData };
			if (file) {
				const storageRef = ref(storage, file.fileName);

				// console.log(file.uri)
				const img = await fetch(file.uri);
				const bytes = await img.blob();

				// upload file to storage firebase
				await uploadBytes(storageRef, bytes);

				// get download url
				const downloadUrl = await getDownloadURL(storageRef);

				// update data
				data.img = downloadUrl;
			}

			const api = detail ? `/update-rooms?id=${detail._id}` : `/add-new`;

			await HandleRoomAPI(api, data, detail ? 'put' : 'post');

			setFile(undefined);
			setFormData(initState);

			navigation.goBack();
		} catch (error) {
			console.log(error);
		}
	};

	return  (
		<ScrollView style={[globalStyles.container]}>
			<Section>
				<Row>
					<TouchableOpacity onPress={() => navigation.goBack()}> 
						<SimpleLineIcons name='arrow-left' size={24} color='black' />
					</TouchableOpacity>
					<Space width={8} />
					<Col>
					<Text 
						text={route.params ? 'Cập nhật phòng' : 'Tạo phòng mới'}
						size={28}
					/>
					</Col>
				</Row>
			</Section>
			{file ? (
				<Image
					source={{ uri: file.uri }}
					style={{
						width: '100%',
						height: 220,
					}}
				/>
			): detail && detail.img ?<Image
			source={{ uri: detail.img }}
			style={{
				width: '100%',
				height: 220,
			}}
		/> : (
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
				<Button title={detail ? 'Cập nhật'  :'Đồng ý'} type='primary' onPress={handleAddNewRoom} />
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
