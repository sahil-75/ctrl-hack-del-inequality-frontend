import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/user.selector';
import {
	FaInbox,
	FaPhoneAlt,
	FaHourglass,
	FaCalendarAlt,
	FaUser,
} from 'react-icons/fa';

const ProfileMenu = () => {
	const user = useSelector(selectUser);

	return (
		<div className='py-3 flex-col h-full bg-blue-500 rounded-md flex items-center justify-between shadow-2xl text-gray-50'>
			<div className='flex-col'>
				<div className='my-3 px-2 mb-6 flex items-center justify-center'>
					<div className='rounded-full border-cyan-300 ring-2 ring-white cursor-pointer'>
						{user.image && (
							<img alt='User' src={user.image} className='w-10' />
						)}
						<div className='p-2'>
							{!user.image && <FaUser size={20} />}
						</div>
					</div>
				</div>
				<h3 className='h-12 flex items-center text-xl my-3 cursor-pointer p-4 bg-white bg-opacity-20 border-r-4 border-white'>
					<FaInbox />
				</h3>
				<h3 className='h-12 flex items-center text-xl my-3 cursor-pointer p-4'>
					<FaPhoneAlt />
				</h3>
				<h3 className='h-12 flex items-center text-xl my-3 cursor-pointer p-4'>
					<FaCalendarAlt />
				</h3>
			</div>
			<h3 className='h-12 flex items-center text-xl my-3 cursor-pointer p-4'>
				<FaHourglass />
			</h3>
		</div>
	);
};

export default React.memo(ProfileMenu);
