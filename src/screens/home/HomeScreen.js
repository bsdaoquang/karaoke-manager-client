/** @format */

import
	{
		Button,
		Input,
		Row,
		Space,
		Text
	} from '@bsdaoquang/rncomponent';
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import
	{
		Dimensions,
		FlatList,
		Image,
		TouchableOpacity,
		View,
	} from 'react-native';
import { HandleRoomAPI } from '../../apis/roomAPI';
import Container from '../../components/Container';
import PaymentModal from '../../modals/PaymentModal';

const HomeScreen = ({ navigation }) => {
	const [searchKey, setSearchKey] = useState('');
	const [rooms, setRooms] = useState([]);
	const [billDetail, setBillDetail] = useState();
	const [isVisibleModalPayment, setIsVisibleModalPayment] = useState(false);
	const [roomSelected, setRoomSelected] = useState();

	const isFocused = useIsFocused();

	const WIDTH = (Dimensions.get('window').width - 48) / 2;

	useEffect(() => {
		isFocused && getRooms();
	}, [isFocused]);

	const getRooms = async () => {
		const api = `/get-rooms`;

		try {
			const res = await HandleRoomAPI(api);
			if (res.data) {
				setRooms(res.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateRoom = async (id, status) => {
		const data =
			status === 'waiting'
				? {
						status: 'active',
						time: Date.now(),
				  }
				: {
						status: 'waiting',
				  };

		const api = `/update-rooms?id=${id}`;
		try {
			await HandleRoomAPI(api, data, 'put');
			await getRooms();
		} catch (error) {
			console.log(error);
		}
	};

	const handlePayBill = async (item) => {
		try {
			const api = `/payment?id=${item._id}`;
			const res = await HandleRoomAPI(api);
			setRoomSelected(item);
			setBillDetail(res.data);
			setIsVisibleModalPayment(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container isScroll={false}>
				<Row justifyContent='space-between'>
					<Text text='Đặt phòng' size={28} weight='bold' color='#8e44ad' />
					<Button
						inline
						color='coral'
						icon={<Ionicons name='add-sharp' size={24} color='white' />}
						onPress={() => navigation.navigate('AddNewRoom')}
						radius={4}
						size='small'
					/>
				</Row>
				{rooms.length > 0 && (
					<FlatList
						ListHeaderComponent={
							<Input
								prefix={<AntDesign name='search1' size={24} color='black' />}
								value={searchKey}
								onChange={(val) => setSearchKey(val)}
								placeholder='Search'
							/>
						}
						style={{ paddingTop: 12, flex: 1 }}
						data={rooms}
						renderItem={({ item }) => (
							<TouchableOpacity
								onPress={() =>
									navigation.navigate('AddNewRoom', { detail: item })
								}
								key={item._id}
								style={[{ width: WIDTH, marginBottom: 16 }]}>
								{item.img && (
									<Image
										source={{ uri: item.img }}
										style={{
											width: WIDTH,
											height: WIDTH * 0.8,
											borderTopLeftRadius: 12,
											borderTopRightRadius: 12,
										}}
									/>
								)}
								<View
									style={{
										padding: 12,
										backgroundColor: '#e0e0e0',
										borderBottomLeftRadius: 12,
										borderBottomRightRadius: 12,
									}}>
									<Text text={item.title} weight='bold' size={16} />
									<Text text={`Phòng ${item.type ? 'VIP' : 'Thường'}`} />
									<Text
										text={`Giá: ${parseInt(item.price).toLocaleString()}/h`}
									/>
									<Space height={8} />
									<Button
										onPress={
											item.status === 'waiting'
												? () => handleUpdateRoom(item._id, item.status)
												: () => handlePayBill(item)
										}
										title={
											item.status === 'waiting' ? 'Đăt phòng' : 'Thanh toán'
										}
										inline
										color={item.status === 'waiting' ? 'coral' : '#676767'}
										size='small'
										radius={4}
										isShadow={false}
									/>
								</View>

								<Button
									onPress={async () => {
										try {
											await HandleRoomAPI(
												`/delete-room?id=${item._id}`,
												undefined,
												'delete'
											);
											await getRooms();
										} catch (error) {
											console.log(error);
										}
									}}
									styles={{
										position: 'absolute',
										right: 10,
										top: 10,
									}}
									icon={<Entypo name='trash' size={24} color='coral' />}
									isShadow={false}
									inline
									type='text'
								/>
							</TouchableOpacity>
						)}
						keyExtractor={(item) => item._id}
						numColumns={2}
						columnWrapperStyle={{
							justifyContent: 'space-between',
						}}
					/>
				)}
			
			<PaymentModal
				item={roomSelected}
				bill={billDetail}
				isVisible={isVisibleModalPayment}
				onClose={() => {
					setIsVisibleModalPayment(false);
					setRoomSelected(undefined);
				}}
				onPayment={async () => {
					setIsVisibleModalPayment(false);
					await handleUpdateRoom(roomSelected._id, 'ative');
					setRoomSelected(undefined);
					setBillDetail(undefined);
				}}
			/>
		</Container>
	);
};

export default HomeScreen;
