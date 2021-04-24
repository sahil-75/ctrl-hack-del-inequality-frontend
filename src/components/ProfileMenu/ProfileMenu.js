import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/user.selector';

const ProfileMenu = () => {
  const user = useSelector(selectUser);

  const defaultImagePlaceholder = `http://placehold.it/200x200`;

  return (
    <div className='py-4 flex shadow-lg bg-gray-700 items-center justify-between overflow-hidden'>
      <div className='ml-2 flex-none'>
        <img
          src={user.image || defaultImagePlaceholder}
          alt='User'
          className='w-14 rounded-full border-cyan-300 ring-2 ring-cyan-500 cursor-pointer'
        />
      </div>
      <div className='mr-2 pl-4 font-sans antialiased flex flex-col py-2 flex-grow'>
        <div className='w-full truncate text-base font-semibold uppercase tracking-widest text-gray-200'>
          {user.name}
        </div>
        <div className='w-full truncate text-base text-gray-200 text-opacity-70'>
          {user.email}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProfileMenu);
