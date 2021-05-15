import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectActiveUser } from '../../features/chats/chat.selector';
// import { chatActions, ChatState } from '../../features/chats/chat.slice';

const ChatUser = ({
	name,
	email,
	image,
	isActive,
	lastMessage,
	setAsActiveUser,
}) => {
	return (
		<li
			className={`w-full relative flex py-3 px-4 bg-white rounded-lg shadow-xl my-2 cursor-pointer group items-start justify-start outline-none `}
			onClick={() => setAsActiveUser(email)}
			onKeyUp={({ key }) => key === 'Enter' && setAsActiveUser(email)}
			tabIndex={0}
		>
			{isActive && (
				<div
					className='absolute bg-blue-500 h-6 w-6 rounded-full -right-3 top-5'
					style={{
						clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)',
					}}
				></div>
			)}
			<div className='h-auto'>
				<img
					alt={name}
					src={image}
					className='w-10 rounded-full shadow-lg'
				/>
			</div>
			<div className='pl-4 w-10/12'>
				<div
					className={`text-base font-sans w-full text-left font-medium text-gray-600`}
				>
					{name}
				</div>
				<div
					className={`text-sm font-sans w-full text-left truncate text-gray-500`}
				>
					{lastMessage}
				</div>
			</div>
		</li>
	);
};

export default React.memo(
	ChatUser,
	(pre, curr) =>
		pre.lastMessage === curr.lastMessage && pre.isActive === curr.isActive,
);
