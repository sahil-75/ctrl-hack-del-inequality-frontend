import React from 'react';
import { FaSearch, FaMicrophone } from 'react-icons/fa';

const ChatSearch = () => {
    return (
        <div className='w-full h-20 relative'>
            <input id='search' className='input-primary rounded-md focus:outline-none h-10 px-12' />
            <h3 className='flex flex-row justify-between px-5 absolute top-5 ' style={{ color: 'white' }}><FaSearch /></h3>
            <h3 className='flex flex-row justify-between px-5 absolute top-5 right-0' style={{ color: 'white' }}><FaMicrophone /></h3>
        </div>
    );
}

export default ChatSearch;