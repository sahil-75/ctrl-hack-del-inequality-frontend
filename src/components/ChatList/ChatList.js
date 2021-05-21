import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RECENT_CHATS } from '../../Mock';
import ChatUser from '../ChatUser/ChatUser';
import {
	selectActiveUser,
	selectchats,
} from '../../features/chats/chat.selector';
import { chatActions } from '../../features/chats/chat.slice';
import {
	selectUser,
	selectAccessToken,
} from '../../features/user/user.selector';
import { FaPlus } from 'react-icons/fa';

const ChatList = () => {
	const chats = useSelector(selectchats);
	const activeUserEmail = useSelector(selectActiveUser);
	const accessToken = useSelector(selectAccessToken);
	const { email } = useSelector(selectUser);

	const dispatch = useDispatch();
	const setAsActiveUser = (email) => {
		dispatch(chatActions.setActiveUser(email));
	};
	const screenWidth = window.innerWidth;

	useEffect(() => {
		// setTimeout(() => {
		dispatch(chatActions.setChats(RECENT_CHATS));
		// }, 3000);
	}, []);

	return (
		<>
			<div
				className='overflow-y-auto overflow-x-hidden scrollbar-fit rounded mb-4'
				style={{}}
			>
				{chats?.length ? (
					<ul className='px-2'>
						{chats.map((chat, index) => (
							<ChatUser
								{...chat}
								key={chat.email}
								isActive={activeUserEmail === chat.email}
								setAsActiveUser={setAsActiveUser}
							/>
						))}
					</ul>
				) : (
					<div className='h-full w-full text-cyan-500 flex items-center justify-center'></div>
				)}
			</div>
			<button className='absolute bottom-10 right-7 text-xl p-4 rounded-full text-white bg-blue-500 cursor-pointer filter drop-shadow-xl shadow-xl'>
				<FaPlus />
			</button>
		</>
	);
};

export default ChatList;
