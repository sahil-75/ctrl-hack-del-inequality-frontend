import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { navigate } from '@reach/router';
import { selectUser } from '../../features/user/user.selector';
import CountDownTimer from '../CountDownTimer/CountDownTimer';
import { FaInbox, FaPhoneAlt, FaRegHourglass, FaCalendarAlt, FaUser, FaUserPlus, FaGamepad, FaBriefcase } from 'react-icons/fa';

const SideBar = (props) => {
	const user = useSelector(selectUser);
	return (
		<div className='py-3 flex-col h-full bg-blue-500 rounded-md flex items-center justify-between shadow-2xl text-gray-50'>
			<div className='flex-col'>
				<div className='my-3 px-2 mb-6 flex items-center justify-center'>
					<div className='rounded-full border-cyan-300 ring-2 ring-white cursor-pointer'>
						{user.image && (
							<img alt='User' src={user.image} className='w-10' />
						)}
						<div className='p-2 relative'>
							{!user.image && <FaUser size={20} />}
							<div className='absolute shadow-md rounded-full' style={{ bottom: -2, right: -2, padding: 7, backgroundColor: props.breakMode ? '#d40f0f' : '#4ee600' }}></div>
						</div>
					</div>
				</div>
				{!props.isBreakOutRoom ?
					<>
						<button className='h-12 flex items-center text-xl my-3 cursor-pointer p-4 bg-white bg-opacity-20 border-r-4 border-white'>
							<FaInbox />
						</button>
						<button className='h-12 flex items-center text-xl my-3 cursor-pointer p-4 text-gray-300'>
							<FaPhoneAlt />
						</button>
						<button className='h-12 flex items-center text-xl my-3 cursor-pointer p-4 text-gray-300'>
							<FaCalendarAlt />
						</button>
						{props.isAdmin &&
							<button className='h-12 flex items-center text-xl my-3 cursor-pointer p-4' onClick={() => navigate('/signup')}>
								<FaUserPlus size={24} />
							</button>
						}
					</>
					:
					null
				}
			</div>
			<div className='flex-col flex items-center'>
				{!props.isBreakOutRoom ?
					props.breakMode &&
					<button className='h-12 flex items-center text-xl my-6 cursor-pointer p-2' onClick={() => props.setBreakOutRoom(!props.isBreakOutRoom)}>
						<FaGamepad size={28} />
					</button>
					:
					<button className='h-12 flex items-center text-xl my-6 cursor-pointer p-2' onClick={() => props.setBreakOutRoom(!props.isBreakOutRoom)}>
						<FaBriefcase size={24} className='mx-2' />
					</button>
				}
				<button className='cursor-pointer mb-3' onClick={() => props.setModalVisible('visible')}>
					<CountDownTimer strokeWidth={0} sidebar={true} timerKey={props.timerKey} breakMode={props.breakMode} />
				</button>
			</div>
		</div>
	);
};

export default SideBar;
