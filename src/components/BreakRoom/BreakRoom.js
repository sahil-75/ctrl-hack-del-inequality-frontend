import cs from 'classnames';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaHome, FaPaperPlane, FaPlus } from 'react-icons/fa';

import { selectUser } from '../../features/user/user.selector';
import { roomActions } from '../../features/rooms/room.slice';
import { selectCurrentRoom } from '../../features/rooms/room.selector';
import BreakRoomMessageList from '../BreakRoomMessageList/BreakRoomMessageList';

let olderTimestamp;

const BreakRoom = () => {
	const dispatch = useDispatch();

	const [message, setMessage] = useState('');
	const activeRoom = useSelector(selectCurrentRoom);
	const currentUser = useSelector(selectUser);

	const sendMessage = () => {
		const timestamp = new Date().valueOf();

		if (olderTimestamp) {
			if (Math.abs(olderTimestamp - timestamp) < 750) {
				alert('Please wait a moment before sending message again');

				olderTimestamp = timestamp;
				return;
			}
		}

		olderTimestamp = timestamp;
		// eslint-disable-next-line no-undef
		Rooms.sendMessage(message);

		setMessage(() => '');
	};

	const leaveRoom = () => {
		// eslint-disable-next-line no-undef
		Rooms.leave(activeRoom, currentUser);

		dispatch(roomActions.setCurrentRoom(''));

		setTimeout(function () {
			dispatch(roomActions.removeAllMesssage());
		}, 1000);

		setMessage(() => '');
	};

	return (
		<div className='flex-grow flex-col space-between pt-4 flex h-full rounded'>
			{activeRoom ? (
				<>
					<div className='h-14 px-5 bg-white w-full shadow-xl flex items-center justify-between text-gray-500 rounded-md'>
						<div className='flex flex-row'>
							<div style={{ paddingTop: 2 }}>
								<FaHome size={24} />
							</div>
							<h1 className='ml-4 text-xl font-medium text tracking-wider'>
								{activeRoom}
							</h1>
						</div>
						<div className='flex flex-row'>
							<h3
								onClick={() => leaveRoom()}
								className='pl-5 cursor-pointer transform rotate-45 translate-x-2 -translate-y-2'
							>
								<FaPlus size={24} />
							</h3>
						</div>
					</div>

					<div
						className='flex-grow w-full'
						style={{ maxHeight: 'calc(100% - 124px)' }}
					>
						<BreakRoomMessageList />
					</div>

					<div className='w-full flex justify-center items-center my-4'>
						<input
							type='text'
							value={message}
							placeholder='Send a message'
							onChange={(e) => setMessage(e.target.value)}
							onKeyUp={({ key }) =>
								key === 'Enter' && sendMessage()
							}
							className='placeholder-grey shadow-xl flex-grow input-white border-white rounded-md mr-4 py-2'
						/>
						<button
							onClick={() => sendMessage()}
							className={cs(
								'bg-blue-500 hover:bg-blue-700 h-12 w-12 flex items-center justify-center',
								'focus:outline-none text-gray-200 rounded-full shadow-lg',
							)}
						>
							<FaPaperPlane />
						</button>
					</div>
				</>
			) : (
				<div className='mx-auto my-auto text-2xl text-blue-500'></div>
			)}
		</div>
	);
};

export default BreakRoom;
