/** @format */

import {
	Button,
	Col,
	Input,
	Loading,
	Row,
	Section,
	Space,
	Text,
	numberToString,
} from '@bsdaoquang/rncomponent';
import { SimpleLineIcons } from '@expo/vector-icons';
import DateTimPicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Image } from 'react-native';
import { globalStyles } from '../../styles/globalStyles';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase/firebaseConfig';


const initState = {
	name: '',
	birthday: '',
	title: '',
	idNumber: '',
	phoneNumber: '',
	hireOfDate: '',
};

const AddNewEmploee = ({ navigation, route }) => {
	const [formData, setFormData] = useState(initState);
	const [file, setFile] = useState();
	const [isVisbleDateTimePicker, setIsVisbleDateTimePicker] = useState(false);
	const [dateSelectedType, setDateSelectedType] = useState('birthday');
  const [isLoading, setIsLoading] = useState(false);

	const getDate = (time) => {
		const d = new Date(time);

		return `${numberToString(d.getDate())}/${numberToString(
			d.getMonth()
		)}/${d.getFullYear()}`;
	};

	const handleChangeData = (val, key) => {
		const items = { ...formData };
		items[`${key}`] = val;
		setFormData(items);
	};

  const handleAddNewEmploee = async () => {
    setIsLoading(true)
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

      console.log(data)
			
			// await HandleRoomAPI(api, data, detail ? 'put' : 'post');
      
			// setFile(undefined);
			// setFormData(initState);
      
      setIsLoading(false)
			// navigation.goBack();
		} catch (error) {
			console.log(error); setIsLoading(false)
		}
  }

	return (
		<ScrollView style={[globalStyles.container]}>
			<Section styles={{ paddingVertical: 20 }}>
				<Row>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<SimpleLineIcons name='arrow-left' size={24} color='black' />
					</TouchableOpacity>
					<Space width={8} />
					<Col>
						<Text
							text={route.params ? 'Cập nhật phòng' : 'Thêm nhân viên'}
							size={28}
						/>
					</Col>
				</Row>
			</Section>
      <Section>
      {file ? (
				<Image
					source={{ uri: file.uri }}
					style={{
						width: '100%',
						height: 220,
					}}
				/>
			)
    //   : 
    //   detail && detail.img ?<Image
		// 	source={{ uri: detail.img }}
		// 	style={{
		// 		width: '100%',
		// 		height: 220,
		// 	}}
		// /> 
    : (
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
      </Section>
			<Section>
				<Input
					value={formData.name}
					onChange={(val) => handleChangeData(val, 'name')}
					clear
					placeholder='Tên nhân viên'
					label='Tên nhân viên'
				/>
				<Text text='Ngày sinh' weight={'500'} />
				<Space height={8} />
				<Button
					title={formData.birthday ? formData.birthday : 'Chọn'}
					textStyleProps={{ fontWeight: '400', fontSize: 16 }}
					styles={{ justifyContent: 'flex-start' }}
					isShadow={false}
					onPress={() => {
						setDateSelectedType('birthday');
						setIsVisbleDateTimePicker(true);
					}}
				/>
        <Input
					value={formData.title}
					onChange={(val) => handleChangeData(val, 'title')}
					clear
					placeholder='Chức vụ'
					label='Chức vụ'
				/>
        <Input
					value={formData.idNumber}
					onChange={(val) => handleChangeData(val, 'idNumber')}
					clear
					placeholder='Số căn cước'
					label='Số căn cước'
          keyboardType='number-pad'
				/>
        <Input
					value={formData.phoneNumber}
					onChange={(val) => handleChangeData(val, 'phoneNumber')}
					clear
					placeholder='Số điện thoại'
					label='Số điện thoại'
          keyboardType='phone-pad'
				/>
        <Text text='Ngày vào làm' weight={'500'} />
				<Space height={8} />
				<Button
					title={formData.hireOfDate ? formData.hireOfDate : 'Chọn'}
					textStyleProps={{ fontWeight: '400', fontSize: 16 }}
					styles={{ justifyContent: 'flex-start' }}
					isShadow={false}
					onPress={() => {
						setDateSelectedType('hireOfDate');
						setIsVisbleDateTimePicker(true);
					}}
				/>
			</Section>
      <Section>
      <Button type='primary' onPress={handleAddNewEmploee} title='Đồng ý' />

      </Section>
			{isVisbleDateTimePicker && (
				<DateTimPicker
					mode='date'
					display='calendar'
					value={new Date()}
					onChange={(val) => {
						const date = getDate(val.nativeEvent.timestamp);
						handleChangeData(date, dateSelectedType);

						setIsVisbleDateTimePicker(false);
					}}
				/>
			)}
      
      <Loading loading={isLoading} />
		</ScrollView>
	);
};

export default AddNewEmploee;
