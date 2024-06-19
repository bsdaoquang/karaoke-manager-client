/** @format */

import { View, Image, Modal } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/globalStyles';
import { Button, Card, Col, Row, Space, Text, colors } from '@bsdaoquang/rncomponent';
import { AntDesign } from '@expo/vector-icons';

const PaymentModal = ({ isVisible, onClose, bill, onPayment, item }) => {

  const getDate = (time) => {
    const d = new Date(time)
    return `${d.getHours()}:${d.getMinutes()}`
  }

	return (
		<Modal
			visible={isVisible}
			style={{ flex: 1 }}
			animationType='slide'
			transparent>
			<View
				style={[
					globalStyles.container,
					globalStyles.center,
					{
						backgroundColor: 'rgba(0,0,0,0.5)',
					},
				]}>
				{item && bill && (
					<View
						style={{
							width: '90%',
							padding: 20,
							borderRadius: 20,
							backgroundColor: 'white',
						}}>
						<Row justifyContent='flex-end'>
							<Button
								onPress={onClose}
								icon={<AntDesign name='close' size={24} color={'#212121'} />}
								type='text'
							/>
						</Row>

						{item.img && (
							<Image
								source={{ uri: item.img }}
								style={{
									width: '100%',
									height: 200,
									borderTopLeftRadius: 12,
									borderTopRightRadius: 12,
								}}
							/>
						)}
						<Space height={16} />
						<Text text={`Phòng ${item.title}`} weight='bold' size={18} />
						<Text text={`Loại phòng ${item.type ? 'VIP' : 'Thường'}`} />
						<Text text={`Giá: ${item.price}/h`} />
						<Card
							styles={{ paddingHorizontal: 12, marginHorizontal: 0, marginBottom: 0 }}
							shadowed={false}>
							<Row>
								<Col>
									<Text text={`Giờ vào: ${getDate(item.time)}`} size={16} />
									<Text text={`Giờ ra: ${getDate(new Date())}`} size={16} />
								</Col>

                <Button title='Doc ko duoc' size='small' color={colors.success} inline />
							</Row>
              <Space height={24} />
              <Row>
                <Col>
                <Text weight='bold' size={20} text={`Thành tiền: ${parseInt(bill.total).toLocaleString()}`} />
                </Col>
                <Button title='Thanh toán' inline color='coral' onPress={onPayment} radius={12} />
              </Row>
						</Card>
					</View>
				)}
			</View>
		</Modal>
	);
};

export default PaymentModal;
