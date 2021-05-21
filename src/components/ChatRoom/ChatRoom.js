import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveUser } from '../../features/chats/chat.selector';
import {
	FaUser,
	FaPaperPlane,
	FaPhoneAlt,
	FaVideo,
	FaEllipsisV,
} from 'react-icons/fa';

const ChatRoom = () => {
	const activeUserEmail = useSelector(selectActiveUser);
	return (
		<div className='flex-grow flex-col space-between pt-4 flex h-full rounded'>
			{activeUserEmail ? (
				<>
					<div className='h-14 px-5 bg-gray-50 w-full shadow-xl flex items-center justify-between text-gray-500 rounded-md'>
						<div className='flex flex-row'>
							<div style={{ paddingTop: 2 }}>
								<FaUser size={24} />
							</div>
							<h1 className='ml-4 text-xl'>{activeUserEmail}</h1>
						</div>
						<div className='flex flex-row'>
							<h3 className='px-5'>
								<FaPhoneAlt />
							</h3>
							<h3 className='px-5'>
								<FaVideo />
							</h3>
							<h3 className='px-5'>
								<FaEllipsisV />
							</h3>
						</div>
					</div>

					<div
						className='flex-grow w-full'
						style={{ maxHeight: 'calc(100% - 124px)' }}
					></div>

					<div className='w-full flex justify-center items-end px-3 my-3'>
						<input
							type='text'
							placeholder='Send a message'
							className='placeholder-grey shadow-xl flex-grow input-white border-white rounded-md mr-4'
						/>
						<button className='bg-blue-500 hover:bg-cyan-700 h-10 w-10 flex items-center justify-center focus:outline-none text-gray-200 rounded-full'>
							<FaPaperPlane />
						</button>
					</div>
				</>
			) : (
				<h1 className='mx-auto my-auto text-3xl text-gray-500'>
					Select a conversation to display here
				</h1>
			)}
		</div>
	);
};

export default ChatRoom;
