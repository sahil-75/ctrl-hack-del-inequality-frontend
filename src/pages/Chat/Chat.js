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
import usePomodoro from '../../hooks/usePomodoro';

const alert = require('../../assets/alert.wav');
const audio = new Audio(alert.default);

const Chat = () => {
	const [timerKey, setTimerKey] = useState(0);
	const [searchKey, setSearchKey] = useState('');
	const [breakMode, setBreakMode] = useState(false);
	const [modalVisible, setModalVisible] = useState('hidden');
	const [isTimeUp, setTimeUp] = useState(false);

	const dispatch = useDispatch();

	const currentUser = useSelector(selectUser);
	const accessToken = useSelector(selectAccessToken);

	const { inBreak, duration } = usePomodoro({
		time: {
			workTime: 1500,
			breakTime: 300,
			lunchTime: 3600,
			pomodoroTime: 900,
		},
	});

	console.log({ inBreak, duration });

	const toggleBreakMode = () => {
		// console.log('Break Started', timerKey + 1);
		setTimerKey((prevKey) => prevKey + 2);
		setBreakMode(!breakMode);
		setTimeUp(false);
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

	useEffect(() => {
		setTimerKey((prevKey) => prevKey + 2);
	}, [inBreak, duration]);

	useEffect(() => {
		if (!inBreak) {
			setBreakMode(false);
		}
	}, [inBreak]);

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
						inBreak={inBreak}
						duration={duration}
						timerKey={timerKey}
						breakMode={breakMode}
						setBreakMode={setBreakMode}
						setModalVisible={setModalVisible}
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
						timerKey={timerKey}
						isTimeUp={isTimeUp}
						duration={duration}
						breakMode={inBreak}
						setTimeUp={setTimeUp}
						setModalVisible={setModalVisible}
						toggleBreakMode={toggleBreakMode}
					/>
				</div>
			</div>
		);
	}
};

export default Chat;
