import React from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';

const ChatSearch = ({ onSearch }) => {
	return (
		<div className='w-full relative px-2 mt-4 mb-2 text-gray-500'>
			<input
				id='search'
				type='search'
				onChange={(e) => onSearch && onSearch(e.target.value)}
				className='w-full bg-white rounded-md shadow-lg border-none focus:outline-none h-10 mt-0 px-10'
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
