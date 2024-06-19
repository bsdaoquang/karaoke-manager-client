/** @format */

import React, { useState } from 'react';
import Container from '../../components/Container';
import { Col, Row, Text, Button } from '@bsdaoquang/rncomponent';

const EmploeeScreen = ({ navigation }) => {
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
		</Container>
	);
};

export default EmploeeScreen;
