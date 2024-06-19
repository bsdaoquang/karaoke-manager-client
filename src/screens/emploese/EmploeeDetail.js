/** @format */

import React, { useEffect, useState } from 'react';
import Container from '../../components/Container';
import {
	Button,
	Col,
	Row,
	Section,
	Space,
	Text,
	colors,
} from '@bsdaoquang/rncomponent';
import { HandleEmploeeAPI } from '../../apis/emploeeAPI';
import { ActivityIndicator, Alert, Image } from 'react-native';

const EmploeeDetail = ({ navigation, route }) => {
	const { id } = route.params;

	const [isLoading, setIsLoading] = useState(false);
	const [detail, setDetail] = useState();

	useEffect(() => {
		handleGetEmpleeDetail();
	}, [id]);

	const handleGetEmpleeDetail = async () => {
		const api = `/get-emploese-detail?id=${id}`;
		setIsLoading(true);
		try {
			const res = await HandleEmploeeAPI(api);
			res.data && setDetail(res.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const renderItem = (title, value) => (
		<Row styles={{ paddingVertical: 8 }}>
			<Col>
				<Text text={title} color={colors.gray700} />
			</Col>
			<Col>
				<Text text={value} />
			</Col>
		</Row>
	);

	const handleRemove = (id) => {
		Alert.alert('Info', 'Xoá nhân viên?', [
			{
				text: 'OK',
				onPress: async () => {
					const api = `/remove-emploee?id=${id}`;
					try {
						await HandleEmploeeAPI(api, undefined, 'delete');
						navigation.goBack();
					} catch (error) {
						console.log(error);
					}
				},
			},
			{
				text: 'Huỷ',
				onPress: () => console.log('Cancel'),
			},
		]);
	};

	return (
		<Container back={true}>
			<Row justifyContent='space-between'>
				<Text
					text='Chi tiết quản lý nhân viên'
					numberOfLine={1}
					size={28}
					weight='bold'
					color='#8e44ad'
				/>
			</Row>

			{isLoading ? (
				<ActivityIndicator />
			) : detail ? (
				<>
					<Text text='Thông tin' weight={'bold'} size={18} />
					<Row>
						<Image
							source={{ uri: detail.img }}
							style={{
								width: 150,
								height: 180,
								borderRadius: 12,
								resizeMode: 'cover',
								marginBottom: 16,
							}}
						/>
					</Row>
					<Row>
						<Button
							title='Sửa thông tin'
							onPress={() => navigation.navigate('AddNewEmploee', { detail })}
							color='coral'
							size='small'
						/>
						<Space width={12} />
						<Button
							title='Xoá nhân viên'
							color='coral'
							size='small'
							onPress={() => handleRemove(detail._id)}
						/>
					</Row>
					<>
						{renderItem('Họ và tên', detail.name)}
						{renderItem('Năm sinh', detail.birthday)}
						{renderItem('Chức vụ', detail.title)}
						{renderItem('Ngày vào làm', detail.hireOfDate)}
						{renderItem('SĐT', detail.phoneNumber)}
						{renderItem('Số căn cước', detail.idNumber)}
					</>
				</>
			) : (
				<Section>
					<Text text='Không tìm thấy thông tin nhân viên' />
				</Section>
			)}
		</Container>
	);
};

export default EmploeeDetail;
