import { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectRoomMessages } from '../../features/rooms/room.selector';
import Message from '../Message/Message';

const MessageList = ({ chat = false, chatMessages = [] }) => {
	const messagesRef = useRef(null);

	const messages = useSelector(selectRoomMessages);

	useLayoutEffect(() => {
		if (messagesRef.current) {
			const elem = messagesRef.current;
			elem.scrollTop = elem.scrollHeight;
		}
	}, [messages, chatMessages]);

	return (
		<div className='h-full w-full flex flex-col justify-end py-4'>
			<div
				ref={messagesRef}
				className='flex overflow-y-auto pb-4 flex-col'
			>
				{(chat ? chatMessages : messages).map(
					(
						{ text, content, to, from, timestamp, user } = {},
						index,
					) => (
						<Message
							to={to}
							chat={chat}
							key={index}
							from={from}
							user={user}
							timestamp={timestamp}
							text={chat ? content : text}
						/>
					),
				)}
			</div>
		</div>
	);
};

export default MessageList;
