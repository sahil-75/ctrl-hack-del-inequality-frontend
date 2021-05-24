import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectActiveUser,
	selectActiveUserName,
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
	const [showBreakActions, setShowBreakActions] = useState(false);

	const dispatch = useDispatch();
	const accessToken = useSelector(selectAccessToken);
	const activeUserEmail = useSelector(selectActiveUser);

	const currentUser = useSelector(selectUser);
	const userName = useSelector(selectActiveUserName(activeUserEmail));

	const { _id, messages = [] } =
		useSelector(selectAUser(activeUserEmail)) ?? {};

	const { _id: currentUserId } =
		useSelector(selectAUser(currentUser.email)) ?? {};

	const sendText = async (options = {}) => {
		if (sendingText || !message) {
			return;
		}
		try {
			const newMessage = {
				to: _id,
				content: message,
				from: currentUserId,
				timestamp: new Date().valueOf(),
				toDelegatee: !!options.toDelegatee,
				isUrgent: !!options.isUrgent,
			};
			const data = await sendMessage(accessToken, newMessage);
			if (data?.message === 'User In Break Mode') {
				console.log(data);
				setShowBreakActions(true);
				return;
			}

			dispatch(
				chatActions.addMessageToUser({
					email: data.toEmail,
					message: newMessage,
					lastModified: +new Date(),
				}),
			);

			if (audio) {
				audio.play();
			}
			setMessage('');

			setSendingText(true);

			setShowBreakActions(false);
		} catch (err) {
			console.log(err);
		} finally {
			setSendingText(false);
		}
	};

	useEffect(() => {
		setShowBreakActions(false);
	}, [activeUserEmail]);

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
						<div className='h-14 px-5 bg-gray-50 w-full shadow-xl flex items-center flex-none justify-between text-gray-500 rounded-md'>
							<div className='flex flex-row'>
								<div style={{ paddingTop: 2 }}>
									<FaUser size={24} />
								</div>
								<h1 className='ml-4 text-xl'>{userName}</h1>
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

						<div className='flex-grow w-full overflow-auto'>
							<MessageList chat={true} chatMessages={messages} />
						</div>

						{showBreakActions ? (
							<div className='bg-gray-200 flex flex-col flex-none items-center py-4 font-sans justify-around'>
								<span className='text-center text-gray-700 text-xl'>
									{userName} seems to be on break now.
									<span className='underline block'>
										Please choose an action from below
									</span>
								</span>
								<div className='flex w-full justify-center mt-2'>
									<button
										className='btn-primary m-0 uppercase tracking-wider'
										onClick={() =>
											sendText({ isUrgent: true })
										}
									>
										Send As Urgent
									</button>
									<button
										className='btn-primary m-0 ml-4 uppercase tracking-wider'
										onClick={() =>
											sendText({ toDelegatee: true })
										}
									>
										Delegate
									</button>
								</div>
							</div>
						) : null}

						<div className='w-full flex justify-center items-center my-4'>
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
							<button
								onClick={sendText}
								className='bg-blue-500 hover:bg-cyan-700 h-12 w-12 flex items-center justify-center focus:outline-none text-gray-200 rounded-full'
							>
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
