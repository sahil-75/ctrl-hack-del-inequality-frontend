import cs from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { FaExclamationTriangle, FaPlus } from 'react-icons/fa';

import {
	selectRooms,
	selectCurrentRoom,
} from '../../features/rooms/room.selector';
import { roomActions } from '../../features/rooms/room.slice';
import { selectUser } from '../../features/user/user.selector';
import BreakRoomListItem from '../BreakRoomListItem/BreakRoomListItem';
import { useState } from 'react';

const BreakRoomList = ({ search = '' }) => {
	const dispatch = useDispatch();

	const [showForm, setShowForm] = useState(false);
	const [newRoomName, setNewRoomName] = useState('');

	const rooms = useSelector(selectRooms);
	const { email, name } = useSelector(selectUser);
	const activeRoom = useSelector(selectCurrentRoom);

	/* eslint-disable no-undef */
	const enterRoom = (room) => {
		console.log('joinign room');
		const { room: roomName } = room;

		if (activeRoom === room) {
			return;
		}

		dispatch(roomActions.setCurrentRoom(roomName));

		Rooms.leave(activeRoom, { email, name });

		setTimeout(function () {
			dispatch(roomActions.removeAllMesssage());
		}, 100);

		setTimeout(function () {
			Rooms.join(roomName, { id: email, email, name });
		}, 500);
	};

	const createRoom = () => {
		if (!newRoomName) {
			return;
		}

		enterRoom({ room: newRoomName });
		setShowForm(false);
		setNewRoomName('');
	};

	const filteredRooms = rooms.filter((r) =>
		r.room.toLowerCase().includes(search.trim().toLowerCase()),
	);

	return (
		<>
			<div
				className='relative overflow-y-auto overflow-x-hidden scrollbar-fit rounded pb-4'
				style={{ minHeight: 'calc(100% - 64px)' }}
			>
				{filteredRooms?.length ? (
					<ul className='px-2'>
						{filteredRooms.map((room, index) => (
							<BreakRoomListItem
								room={room}
								key={index}
								enterRoom={() => enterRoom(room)}
							/>
						))}
					</ul>
				) : (
					<div className='h-full w-full text-blue-500 flex items-center justify-center text-xl pb-6'>
						<div className='flex flex-col items-center'>
							<FaExclamationTriangle size={80} />
							<div className='pt-2 text-base'>No rooms found</div>
							<div className='pt-1 text-xs'>
								{rooms?.length > 0
									? 'Change or remove filter to widen your search'
									: 'Create/Enter a room to join the conversation'}
							</div>
						</div>
					</div>
				)}
				<div
					className={cs(
						'absolute bottom-4 p-4 text-xl rounded-xl bottom-20',
						'bg-white shadow-lg flex flex-col items-end justify-end right-2',
						{ visible: showForm, invisible: !showForm },
					)}
				>
					<div>
						<input
							id='email'
							type='text'
							value={newRoomName}
							className='input-primary'
							placeholder='Enter room name'
							onChange={(e) => setNewRoomName(e.target.value)}
						/>
					</div>
					<div>
						<button
							type='submit'
							onClick={() => createRoom()}
							className={`btn-primary mt-2 text-sm font-medium uppercase`}
						>
							create
						</button>
					</div>
				</div>
				<button
					className={cs(
						'fixed hover:bg-blue-700 bottom-4 h-12 w-12 text-xl rounded-full',
						'bg-blue-500 cursor-pointer shadow-lg flex items-center justify-center',
					)}
					style={{ left: 364, color: 'white' }}
					onClick={() => setShowForm((state) => !state)}
				>
					<FaPlus />
				</button>
			</div>
		</>
	);
};

export default BreakRoomList;
