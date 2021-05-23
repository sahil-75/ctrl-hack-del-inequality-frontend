import React from 'react';
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
} from 'react-icons/fa';
import { userActions } from '../../features/user/user.slice';

const SideBar = (props) => {
	const dispatch = useDispatch();
	const user = useSelector(selectUser) ?? {};
	return (
		<div className='py-3 flex-col h-full bg-blue-500 rounded-md flex items-center justify-between shadow-2xl text-gray-50'>
			<div className='flex-col'>
				<div className='my-3 px-2 mb-6 flex items-center justify-center'>
					<div className='rounded-full border-cyan-300 ring-2 ring-white'>
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
				{user.role === 'admin' && (
					<button
						className='h-12 flex items-center text-xl my-3 cursor-pointer p-4'
						onClick={() => navigate('/signup')}
					>
						<FaUserPlus size={24} />
					</button>
				)}
			</div>
			<div className='flex-col flex items-center'>
				{props.inBreak && (
					<button
						className='h-12 flex items-center text-xl my-6 cursor-pointer p-2'
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
				<button
					className='h-12 flex items-center text-xl p-4 cursor-pointer'
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
					<FaSignOutAlt />
				</button>
			</div>
		</div>
	);
};

export default SideBar;
