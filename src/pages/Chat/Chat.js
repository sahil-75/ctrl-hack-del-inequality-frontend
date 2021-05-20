import React, { useEffect, useState } from 'react';
import { navigate, RouteComponentProps } from '@reach/router';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../../components/SideBar/SideBar';
import ChatList from '../../components/ChatList/ChatList';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import ChatSearch from '../../components/ChatSearch/ChatSearch';
import CountDownModal from '../../components/CountDownModal/CountDownModal';

import { selectAccessToken, selectUser } from '../../features/user/user.selector';
import { userActions } from '../../features/user/user.slice';


const Chat = (props) => {
	const [key, setKey] = useState(0);
	const [breakMode, setBreakMode] = useState(false);
	const [modalVisible, setModalVisible] = useState('hidden');
	let { email, accessToken } = useSelector(selectUser);

	if (!accessToken) {
		accessToken = localStorage.getItem('accessToken');
	}

	const dispatch = useDispatch();

	const toggleBreakMode = () => {
		console.log('Break Started', key);
		setKey(prevKey => prevKey + 1);
		setBreakMode(!breakMode);
	};

	if (!true) {
		return (
			<div className='bg-primary text-cyan-400 flex w-screen h-screen items-center justify-center flex-col border-8 border-cyan-800 border-opacity-50 border-double'>
				<Loader type='Bars' color='currentColor' width='48' />
				<div className='text-white text-2xl uppercase tracking-widest'>
					{accessToken ? 'Verifying User' : 'Loading User Details'}
				</div>
			</div>
		);
	}

	return (
		<div className='bg-primary overflow-x-auto overflow-y-hidden px-3 flex flex-row'
			style={{
				minWidth: 950,
				background: '#f2f2f2',
				scrollbarWidth: 'thin',
			}}
		>
			<div
				className='flex-none h-full p-4 px-1 pr-3'
				style={{ minWidth: 56 }}
			>
				<SideBar setModalVisible={setModalVisible.bind()} key={key} breakMode={breakMode} />
			</div>
			<div
				className='flex-none w-3/12 h-full flex flex-col px-1.5'
				style={{ minWidth: 341 }}
			>
				<ChatSearch />
				<ChatList />
			</div>
			<div
				className='flex-1 w-8/12 h-full pl-1.5'
				style={{ minWidth: 520 }}
			>
				<ChatRoom />
			</div>
			<div style={{ visibility: modalVisible }}>
				<CountDownModal setModalVisible={setModalVisible.bind()} key={key} breakMode={breakMode} toggleBreakMode={toggleBreakMode.bind()} />
			</div>
		</div>
	);
};

export default Chat;