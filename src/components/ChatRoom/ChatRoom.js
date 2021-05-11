import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveUser } from '../../features/chats/chat.selector';
import { FaPaperPlane, FaPhoneAlt, FaVideo, FaEllipsisV } from 'react-icons/fa';

const ChatRoom = () => {
	const activeUserEmail = useSelector(selectActiveUser);
	const defaultImagePlaceholder = `https://placehold.it/200x200`;
	return (
		<div className='flex-grow flex-col space-between flex h-full overflow-hidden rounded'>
			{activeUserEmail ?
				<>
					<div className='h-14 px-5 bg-gray-800 w-full flex items-center justify-between rounded-md'>
						<div className='flex flex-row'>
							<img
								src={defaultImagePlaceholder} alt='User'
								className='w-8 rounded-full border-cyan-300 ring-2 ring-cyan-500 cursor-pointer'
							/>
							<h1 className='ml-4 text-xl' style={{ color: 'white' }}>{activeUserEmail}</h1>
						</div>
						<div className='flex flex-row'>
							<h3 className='px-5' style={{ color: 'white' }}><FaPhoneAlt /></h3>
							<h3 className='px-5' style={{ color: 'white' }}><FaVideo /></h3>
							<h3 className='px-5' style={{ color: 'white' }}><FaEllipsisV /></h3>
						</div>
					</div>

					<div className='flex-grow bg-gray-900 bg-opacity-30 w-full'></div>

					<div className='h-20 w-full flex items-end px-3'>
						<input
							type='text'
							className='placeholder-gray flex-grow input-primary rounded-md mr-4'
							placeholder='Send a message'
						/>
						<button className='bg-cyan-600 hover:bg-cyan-700 h-10 w-10 mb-2 flex items-center justify-center focus:outline-none text-gray-200 rounded-full'>
							<FaPaperPlane />
						</button>
					</div>
				</>
				:
				<h1 className='mx-auto my-auto text-3xl' style={{ color: 'aqua' }}>Select a conversation to display here</h1>
			}
		</div>
	);
};

export default ChatRoom;