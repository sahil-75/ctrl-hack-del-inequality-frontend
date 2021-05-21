/* eslint-disable no-undef */
import { Redirect } from '@reach/router';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import SideBar from '../../components/SideBar/SideBar';
import ChatList from '../../components/ChatList/ChatList';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import BreakRoom from '../../components/BreakRoom/BreakRoom';
import ChatSearch from '../../components/ChatSearch/ChatSearch';
import BreakRoomList from '../../components/BreakRoomList/BreakRoomList';
import CountDownModal from '../../components/CountDownModal/CountDownModal';

import {
	selectUser,
	selectAccessToken,
} from '../../features/user/user.selector';
import { roomActions } from '../../features/rooms/room.slice';

const alert = require('../../assets/alert.wav');
const audio = new Audio(alert.default);

const Chat = () => {
	const [key, setKey] = useState(0);
	const [searchKey, setSearchKey] = useState('');
	const [breakMode, setBreakMode] = useState(false);
	const [isBreakOutRoom, setBreakOutRoom] = useState(false);
	const [modalVisible, setModalVisible] = useState('hidden');

	const dispatch = useDispatch();

	const currentUser = useSelector(selectUser);
	const accessToken = useSelector(selectAccessToken);

	const toggleBreakMode = () => {
		console.log('Break Started', key);
		setKey((prevKey) => prevKey + 1);
		setBreakMode(!breakMode);
		setBreakOutRoom(false);
	};

	const connectSocket = () => {
		if (currentUser.name && currentUser.email) {
			disconnectSocket();

			const { name, email } = currentUser;
			Rooms.init({ name, email, id: name });

			Rooms.addListener('message', (message) => {
				console.log('in message', message);
				if (message.user.name !== 'bot') {
					audio.play();
				}

				dispatch(roomActions.addMesssage(message));
			});

			Rooms.addListener('roomData', (roomData) => {
				console.log('in room data', roomData);
				dispatch(roomActions.setRoomData(roomData));
			});

			Rooms.addListener('rooms', (rooms) => {
				console.log('in rooms', rooms);
				dispatch(roomActions.setAllRooms(rooms));
			});

			Rooms.addListener('issue', (issue) => {
				console.log('in issue ', issue);
			});
		}
	};

	const disconnectSocket = () => {
		Rooms.disconnect();

		dispatch(roomActions.setCurrentRoom(''));
		dispatch(roomActions.removeAllMesssage());
	};

	useEffect(() => {
		connectSocket();

		return () => disconnectSocket();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentUser, currentUser.name, currentUser.email]);

	useEffect(() => {
		if (!breakMode) {
			disconnectSocket();
		} else {
			connectSocket();
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [breakMode]);

	if (!accessToken) {
		return <Redirect to='/signin' noThrow />;
	} else {
		return (
			<div
				className='bg-primary overflow-x-auto overflow-y-hidden px-3 flex flex-row'
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
						key={key}
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
					<ChatSearch onSearch={(e) => setSearchKey(e)} />
					{breakMode ? (
						<BreakRoomList search={searchKey} />
					) : (
						<ChatList />
					)}
				</div>
				<div
					className='flex-1 w-8/12 h-full pl-3 pr-1'
					style={{ minWidth: 520 }}
				>
					{breakMode ? <BreakRoom /> : <ChatRoom />}
				</div>
				<div style={{ visibility: modalVisible }}>
					<CountDownModal
						key={key}
						breakMode={breakMode}
						setModalVisible={setModalVisible}
						toggleBreakMode={toggleBreakMode}
					/>
				</div>
			</div>
		);
	}
};

export default Chat;
