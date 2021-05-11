import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { selectActiveUser } from '../../features/chats/chat.selector';
// import { chatActions, ChatState } from '../../features/chats/chat.slice';

const ChatUser = ({
	name,
	email,
	lastMessage,
	image,
	isActive,
	setAsActiveUser,
}) => {
	return (
		<li
			className={`w-full flex py-4 px-5 cursor-pointer group items-start justify-start outline-none ${isActive
					? 'bg-cyan-600 shadow-md'
					: 'hover:bg-gray-900 focus:bg-gray-900'
				}`}
			onClick={() => setAsActiveUser(email)}
			onKeyUp={({ key }) => key === 'Enter' && setAsActiveUser(email)}
			tabIndex={0}
		>
			<div className='h-auto'>
				<img
					src={image}
					alt={name}
					className='w-12 rounded-full shadow-lg ring ring-gray-600'
				/>
			</div>
			<div className='pl-6 w-10/12'>
				<div
					className={`text-base font-sans w-full text-left font-medium ${isActive
							? 'text-gray-50'
							: 'text-gray-400 group-hover:text-gray-50'
						}`}
				>
					{name}
				</div>
				<div
					className={`text-base font-sans w-full text-left truncate ${isActive
							? 'text-gray-200'
							: 'text-gray-500 group-hover:text-gray-100'
						}`}
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
