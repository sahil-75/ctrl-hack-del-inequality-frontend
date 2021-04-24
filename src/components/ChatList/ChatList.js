import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ViewBoardsIcon } from '@heroicons/react/solid';
import { useDispatch, useSelector } from 'react-redux';

import { RECENT_CHATS } from '../../Mock';
import ChatUser from '../ChatUser/ChatUser';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import Loader from 'react-loader-spinner';
import {
	selectActiveUser,
	selectchats,
} from '../../features/chats/chat.selector';
import { chatActions } from '../../features/chats/chat.slice';
import {
	selectAccessToken,
	selectUser,
} from '../../features/user/user.selector';

const ChatList = () => {
	const chats = useSelector(selectchats);
	const activeUserEmail = useSelector(selectActiveUser);
	const accessToken = useSelector(selectAccessToken);
	const { email } = useSelector(selectUser);

	const dispatch = useDispatch();
	const setAsActiveUser = (email) => {
		dispatch(chatActions.setActiveUser(email));
	};

	useEffect(() => {
		// setTimeout(() => {
		dispatch(chatActions.setChats(RECENT_CHATS));
		// }, 3000);
	}, []);

	return (
		<div className='shadow-xl bg-gray-800 bg-opacity-50 h-full flex flex-col relative'>
			<div className='absolute w-6 -right-6 h-full flex items-center justify-end select-none'>
				<div className='bg-gray-800 flex items-center justify-center shadow-md trapezoid text-gray-500 z-50 h-16 w-6 cursor-grab'>
					<ViewBoardsIcon className='w-4' />
				</div>
			</div>
			<ProfileMenu />
			<div className='overflow-x-hidden overflow-y-scroll h-full scrollbar-fit'>
				{chats?.length ? (
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
				) : (
					<div className='h-full w-full text-cyan-500 flex items-center justify-center'>
						{/* {loading ? (
              <Loader type='Bars' color='currentColor' width='42' />
            ) : (
              <div className='uppercase tracking-wide text-lg font-sans font-semibold'>
                No Chats Found!
              </div>
            )} */}
					</div>
				)}
				)
			</div>
		</div>
	);
};

export default ChatList;
