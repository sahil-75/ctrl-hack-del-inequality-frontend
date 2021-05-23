import { FaPlus } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	selectActiveUser,
	selectchats,
} from '../../features/chats/chat.selector';
import { chatActions } from '../../features/chats/chat.slice';
import { selectAccessToken } from '../../features/user/user.selector';
import { getUsers } from '../../services/api';
import ChatUser from '../ChatUser/ChatUser';
import Loader from '../Loader/Loader';

const comparator = (c1, c2) => {
	return (
		new Date(c2.lastModified || -1).valueOf() -
		new Date(c1.lastModified || -1).valueOf()
	);
};

const ChatList = () => {
	const [loading, setLoading] = useState(true);

	const chats = useSelector(selectchats);
	const sortedChats = chats.sort(comparator);

	const activeUserEmail = useSelector(selectActiveUser);
	const accessToken = useSelector(selectAccessToken);
	// const { email } = useSelector(selectUser);

	const dispatch = useDispatch();
	const setAsActiveUser = (email) => {
		dispatch(chatActions.setActiveUser(email));
	};

	useEffect(() => {
		(async () => {
			setLoading(() => true);
			const users = await getUsers(accessToken);

			setLoading(() => false);
			dispatch(chatActions.setChats(users));
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accessToken]);

	if (loading) {
		return <Loader />;
	} else {
		return (
			<>
				<div className='overflow-y-auto overflow-x-hidden scrollbar-fit rounded mb-4'>
					{chats?.length ? (
						<ul className='px-2'>
							{sortedChats.map((chat, index) => (
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
	}
};

export default ChatList;
