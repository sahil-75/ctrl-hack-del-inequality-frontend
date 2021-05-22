import { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectRoomMessages } from '../../features/rooms/room.selector';
import BreakRoomMessage from '../BreakRoomMessage/BreakRoomMessage';

const BreakRoomMessageList = () => {
	const messagesRef = useRef(null);

	const messages = useSelector(selectRoomMessages);

	useLayoutEffect(() => {
		if (messagesRef.current) {
			const elem = messagesRef.current;
			elem.scrollTop = elem.scrollHeight;
		}
	}, [messages]);

	return (
		<div className='h-full w-full flex flex-col justify-end py-4'>
			<div
				ref={messagesRef}
				className='flex overflow-y-auto pb-4 flex-col'
			>
				{messages.map(({ text, timestamp, user }, index) => (
					<BreakRoomMessage
						key={index}
						user={user}
						text={text}
						timestamp={timestamp}
					/>
				))}
			</div>
		</div>
	);
};

export default BreakRoomMessageList;
