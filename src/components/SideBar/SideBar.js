import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import { selectUser } from '../../features/user/user.selector';
import CountDownTimer from '../CountDownTimer/CountDownTimer';
import {
	FaInbox,
	FaPhoneAlt,
	FaCalendarAlt,
	FaUser,
	FaUserPlus,
	FaGamepad,
	FaSignOutAlt,
	FaBriefcase,
	FaUserClock
} from 'react-icons/fa';
import { userActions } from '../../features/user/user.slice';

const SideBar = (props) => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser) ?? {};
	const [isProfileMenuVisible, toggleProfileMenu] = useState(false);

	return (
		<div className='py-3 flex-col h-full bg-blue-500 rounded-md flex items-center justify-between shadow-2xl text-gray-50'>
			<div className='flex-col'>
				<div className='my-3 px-2 mb-6 flex items-center justify-center'>
					<div className='rounded-full border-cyan-300 ring-2 ring-white cursor-pointer'
						onClick={() => toggleProfileMenu(!isProfileMenuVisible)}>
						{user.image && (
							<img alt='User' src={user.image} className='w-10' />
						)}
						<div className='p-2 relative'>
							{!user.image && <FaUser size={20} />}
							<div
								className='absolute shadow-md rounded-full'
								style={{
									bottom: -2,
									right: -2,
									padding: 7,
									backgroundColor: props.inBreak
										? '#d40f0f'
										: '#4ee600',
								}}
							></div>
						</div>
					</div>
				</div>
				<button className='h-12 flex items-center text-xl my-3 cursor-pointer p-4 bg-white bg-opacity-20 border-r-4 border-white'>
					<FaInbox />
				</button>
				<button className='h-12 flex items-center text-xl my-3 p-4 text-gray-300'>
					<FaPhoneAlt />
				</button>
				<button className='h-12 flex items-center text-xl my-3 p-4 text-gray-300'>
					<FaCalendarAlt />
				</button>
			</div>
			<div className='flex-col flex items-center'>
				{true && (
					<button
						className='h-12 flex items-center text-xl my-4 cursor-pointer p-2'
						onClick={() =>
							props.setBreakMode &&
							props.setBreakMode(!props.breakMode)
						}
					>
						{props.breakMode ? (
							<FaBriefcase size={28} />
						) : (
							<FaGamepad size={28} />
						)}
					</button>
				)}
				<button
					className='cursor-pointer mb-3'
					onClick={() => props.setModalVisible('visible')}
				>
					<CountDownTimer
						strokeWidth={0}
						sidebar={true}
						duration={props.duration}
						timerKey={props.timerKey}
						breakMode={props.breakMode}
					/>
				</button>
			</div>
			<div
				className='absolute left-6 p-2 text-xl rounded-xl top-20 mt-1
				bg-white shadow-lg flex flex-col'
				style={{ visibility: isProfileMenuVisible ? 'visible' : 'hidden' }}
			>
				{user.role === 'admin' && (
					<button
						className='flex flex-row items-center p-2 text-xl cursor-pointer text-blue-500'
						onClick={() => navigate('/signup')}
					>
						<FaUserPlus size={24} />
						<h4 className='text-gray-500 ml-3 text-base cursor-pointer'>Add User</h4>
					</button>
				)}
				<button
					className='flex flex-row items-center p-2 text-xl cursor-pointer text-blue-500'
					onClick={() => { alert('Delegatee Set') }}
				>
					<FaUserClock size={24} />
					<h4 className='text-gray-500 ml-3 text-base cursor-pointer'>Set Delegatee</h4>
				</button>
				<button
					className='flex flex-row items-center p-2 text-xl cursor-pointer text-blue-500'
					onClick={() => {
						const sure = window.confirm(
							'Are you sure you want to logout?',
						);
						if (sure) {
							dispatch(userActions.setAccessToken(''));
							navigate('/signin');
						}
					}}
				>
					<FaSignOutAlt size={24} />
					<h4 className='text-gray-500 ml-3 text-base cursor-pointer'>Log Out</h4>
				</button>
			</div>
		</div>
	);
};

export default SideBar;