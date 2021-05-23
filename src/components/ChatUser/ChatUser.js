import React from 'react';
import Avatar from '../Avatar/Avatar';

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
			className={`w-full relative flex py-3 px-4 bg-white rounded-lg shadow-xl my-2 mb-3 cursor-pointer group items-center justify-start outline-none `}
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
			{image ? (
				<div className='h-auto'>
					<img
						alt={name}
						src={image}
						className='w-10 rounded-full shadow-lg'
					/>
				</div>
			) : (
				<Avatar sm name={name} altBg />
			)}
			<div className='pl-4 w-10/12'>
				<div
					className={`text-base font-sans w-full text-left font-medium text-gray-600`}
				>
					{name}
				</div>
				{lastMessage && (
					<div
						className={`text-sm font-sans w-full text-left truncate text-gray-500`}
					>
						{lastMessage}
					</div>
				)}
			</div>
		</li>
	);
};

export default React.memo(
	ChatUser,
	(pre, curr) =>
		pre.lastMessage === curr.lastMessage && pre.isActive === curr.isActive,
);
