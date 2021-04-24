import React from 'react';
import { useSelector } from 'react-redux';
import { selectActiveUser } from '../../features/chats/chat.selector';
// import SendIcon from '../../icons/SendIcon';
const ChatRoom = () => {
	const activeUserEmail = useSelector(selectActiveUser);
	return (
		<div className='flex-grow flex-col space-between flex h-full w-full overflow-hidden max-w-2'>
			{!activeUserEmail ? null : (
				<>
					<div className='h-24 bg-gray-800 w-full'>
						{activeUserEmail}
					</div>
					<div className='flex-grow bg-gray-900 bg-opacity-30 w-full'></div>

					<div className='h-20 bg-gray-800 w-full flex items-center pl-4'>
						<input
							type='text'
							className='flex-grow input-primary rounded-md'
							placeholder='Send a message'
						/>
						<button className='bg-cyan-600 hover:bg-cyan-700 h-10 w-10 mx-4 flex items-center justify-center text-gray-200 rounded-full'>
							{/* <SendIcon className='w-6 rotate-90' /> */}
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default ChatRoom;
