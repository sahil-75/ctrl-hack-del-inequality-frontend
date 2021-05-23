import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectActiveUser,
	selectAUser,
} from '../../features/chats/chat.selector';
import {
	FaUser,
	FaPaperPlane,
	FaPhoneAlt,
	FaVideo,
	FaEllipsisV,
} from 'react-icons/fa';
import { sendMessage, getMessages } from '../../services/api';
import {
	selectUser,
	selectAccessToken,
} from '../../features/user/user.selector';
import { chatActions } from '../../features/chats/chat.slice';
import MessageList from '../MessageList/MessageList';
import Loader from '../Loader/Loader';

const ChatRoom = ({ audio }) => {
	const [sendingText, setSendingText] = useState(false);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	const dispatch = useDispatch();
	const accessToken = useSelector(selectAccessToken);
	const activeUserEmail = useSelector(selectActiveUser);

	const currentUser = useSelector(selectUser);

	const { _id, messages = [] } =
		useSelector(selectAUser(activeUserEmail)) ?? {};

	const { _id: currentUserId } =
		useSelector(selectAUser(currentUser.email)) ?? {};

	const sendText = async () => {
		if (sendingText) {
			return;
		}

		const newMessage = {
			to: _id,
			content: message,
			from: currentUserId,
			timestamp: new Date().valueOf(),
		};

		dispatch(
			chatActions.addMessageToUser({
				email: activeUserEmail,
				message: newMessage,
			}),
		);

		if (audio) {
			audio.play();
		}
		setMessage('');

		setSendingText(true);

		await sendMessage(accessToken, newMessage);
		setSendingText(false);
	};

	useEffect(() => {
		(async () => {
			if (activeUserEmail) {
				setLoading(() => true);
				const messages = await getMessages(accessToken, _id);

				dispatch(
					chatActions.addMessagesToUser({
						email: activeUserEmail,
						messages,
					}),
				);
				setLoading(() => false);
			}
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeUserEmail]);
	if (loading) {
		return <Loader />;
	} else {
		return (
			<div className='flex-grow flex-col space-between pt-4 flex h-full rounded'>
				{activeUserEmail ? (
					<>
						<div className='h-14 px-5 bg-gray-50 w-full shadow-xl flex items-center justify-between text-gray-500 rounded-md'>
							<div className='flex flex-row'>
								<div style={{ paddingTop: 2 }}>
									<FaUser size={24} />
								</div>
								<h1 className='ml-4 text-xl'>
									{activeUserEmail}
								</h1>
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
						>
							<MessageList chat={true} chatMessages={messages} />
						</div>

						<div className='w-full flex justify-center items-end px-3 my-3'>
							<input
								type='text'
								value={message}
								placeholder='Send a message'
								onChange={(e) => setMessage(e.target.value)}
								onKeyUp={({ key }) =>
									key === 'Enter' && sendText()
								}
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
	}
};

export default ChatRoom;
