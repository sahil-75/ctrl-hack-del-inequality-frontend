import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/user.selector';
import { FaInbox, FaPhoneAlt, FaCalendarAlt, FaHourglass } from 'react-icons/fa';

const ProfileMenu = () => {
  const user = useSelector(selectUser);

  const defaultImagePlaceholder = `https://placehold.it/200x200`;

  return (
    <div className='py-3 flex-col h-full bg-gray-700 rounded flex items-center justify-between overflow-hidden' style={{ color: 'white' }}>
      <div className='my-3 px-2 mb-20'>
        <img src={user.image || defaultImagePlaceholder} alt='User'
          className='w-10 rounded-full border-cyan-300 ring-2 ring-cyan-500 cursor-pointer'
        />
      </div>
      <h3 className='h-12 flex items-center text-xl my-3 cursor-pointer p-4 bg-gray-600 border-r-4 border-white'>
        <FaInbox />
      </h3>
      <h3 className='h-12 flex items-center text-xl my-3 cursor-pointer p-4'>
        <FaPhoneAlt />
      </h3>
      <h3 className='h-12 flex items-center text-xl my-3 cursor-pointer p-4'>
        <FaCalendarAlt />
      </h3>
      <h3 className='h-12 flex items-center text-xl my-3 cursor-pointer p-4'>
        <FaHourglass />
      </h3>
    </div>
  );
};

export default React.memo(ProfileMenu);