import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RECENT_CHATS } from '../../Mock';
import ChatUser from '../ChatUser/ChatUser';
import { selectActiveUser, selectchats } from '../../features/chats/chat.selector';
import { chatActions } from '../../features/chats/chat.slice';
import { selectAccessToken, selectUser } from '../../features/user/user.selector';
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
			<div className='overflow-x-hidden overflow-y-scroll scrollbar-fit bg-gray-800 bg-opacity-50 rounded'>
				{chats?.length ?
					<ul>
						{chats.map((chat, index) => (
							<ChatUser
								{...chat}
								key={chat.email}
								isActive={activeUserEmail === chat.email}
								setAsActiveUser={setAsActiveUser}
							/>
						))}
					</ul>
					:
					<div className='h-full w-full text-cyan-500 flex items-center justify-center'></div>
				}
			</div>
			<h3 className='absolute bottom-10 text-xl p-4 rounded-full bg-cyan-500 cursor-pointer shadow-md' style={{ left: (screenWidth / 4), color: 'white' }}><FaPlus /></h3>
		</>
	);
};

export default ChatList;