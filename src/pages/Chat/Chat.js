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
	const [timerKey, setTimerKey] = useState(0);
	const [breakMode, setBreakMode] = useState(false);
	const [isBreakOutRoom, setBreakOutRoom] = useState(false);
	const [modalVisible, setModalVisible] = useState('hidden');
	const [isTimeUp, setTimeUp] = useState(false);

	let { email, accessToken } = useSelector(selectUser);

	if (!accessToken) {
		accessToken = localStorage.getItem('accessToken');
	}

	const dispatch = useDispatch();

	const toggleBreakMode = () => {
		// console.log('Break Started', timerKey);
		setTimerKey(prevKey => prevKey + 1);
		setBreakMode(!breakMode);
		setBreakOutRoom(false);
		setTimeUp(false);
	};

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
				<SideBar
					timerKey={timerKey}
					breakMode={breakMode}
					isBreakOutRoom={isBreakOutRoom}
					setModalVisible={setModalVisible}
					setBreakOutRoom={setBreakOutRoom}
				/>
			</div>
			<div
				className='flex-none w-3/12 h-full flex flex-col px-1.5 relative'
				style={{ minWidth: 350 }}
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
				<CountDownModal
					timerKey={timerKey}
					breakMode={breakMode}
					isTimeUp={isTimeUp}
					setTimeUp={setTimeUp}
					setModalVisible={setModalVisible}
					toggleBreakMode={toggleBreakMode}
				/>
			</div>
		</div>
	);
};

export default Chat;