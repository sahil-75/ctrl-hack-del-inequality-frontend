import cs from 'classnames';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { selectUser } from '../../features/user/user.selector';
import Avatar from '../Avatar/Avatar';
import { selectCurrentRoom } from '../../features/rooms/room.selector';

const BreakRoomListItem = ({ room, enterRoom }) => {
	const { room: roomName, users } = room;
	const activeRoom = useSelector(selectCurrentRoom);
	const { email: currentEmail } = useSelector(selectUser);

	const [open, setOpen] = useState(false);

	return (
		<li
			className={cs(
				'w-full overflow-hidden relative rounded-lg my-2 shadow-xl group outline-none mb-4',
				{
					'bg-white': activeRoom !== roomName,
					'bg-blue-500 text-white': activeRoom === roomName,
				},
			)}
		>
			<div
				className={cs('justify-between items-center flex px-3 py-4 ', {
					'text-gray-700': activeRoom !== roomName,
					'text-white': activeRoom === roomName,
				})}
			>
				<p
					className='cursor-pointer w-full mr-2 truncate font-medium text-md'
					onKeyUp={({ key }) =>
						key === 'Enter' && enterRoom && enterRoom()
					}
					onClick={() => enterRoom && enterRoom()}
					title={roomName}
					tabIndex={0}
				>
					{roomName}
				</p>
				<div
					title='See Users in room'
					className='cursor-pointer'
					onClick={() => setOpen((state) => !state)}
				>
					{open ? <FaChevronUp /> : <FaChevronDown />}
				</div>
			</div>
			<div
				className={cs('bg-blue-500 text-white overflow-y-auto', {
					'h-0': open !== true,
					'max-h-40': open === true,
				})}
			>
				{users.map(({ email, name }, key) => (
					<div
						key={key}
						className={cs('py-3 px-3 border-b last:border-0', {
							'first:border-t': activeRoom === roomName,
						})}
					>
						<div className='flex'>
							<Avatar name={name} sm />
							<div className='pl-3'>
								<h3 className='m-0 text-sm'>
									{currentEmail === email ? 'You' : name}
								</h3>
								<p className='text-xs opacity-70'>{email}</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</li>
	);
};

export default BreakRoomListItem;
