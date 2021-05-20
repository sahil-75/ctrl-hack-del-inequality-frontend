import React from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';

const ChatSearch = () => {
	return (
		<div className='w-full relative pl-2 mt-4 mb-2 text-gray-400'>
			<input
				id='search'
				className='w-full rounded-md shadow-lg focus:outline-none h-10 mt-0 px-10'
			/>
			<h3 className='flex flex-row justify-between px-5 absolute top-3 left-0'>
				<FaSearch />
			</h3>
			<h3 className='flex flex-row justify-between px-5 absolute top-3 right-0'>
				<FaMicrophone />
			</h3>
		</div>
	);
};

export default ChatSearch;
