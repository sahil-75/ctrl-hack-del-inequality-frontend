import { navigate, RouteComponentProps } from '@reach/router';
import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import ChatList from '../../components/ChatList/ChatList';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import ChatSearch from '../../components/ChatSearch/ChatSearch';

import { selectAccessToken, selectUser } from '../../features/user/user.selector';
import { userActions } from '../../features/user/user.slice';

const Chat = (props) => {
	let { email, accessToken } = useSelector(selectUser);

	if (!accessToken) {
		accessToken = localStorage.getItem('accessToken');
	}

	const dispatch = useDispatch();

	useEffect(() => {
		if (!email || !accessToken) {
			// verifyUser({
			//   variables: {
			//     accessToken,
			//   },
			// });
		}
	}, []); // eslint-disable-line

	// useEffect(() => {
	// if (data) {
	//   const { accessToken, name, email } = data.verifyUser;
	//   localStorage.setItem('accessToken', accessToken);
	//   dispatch(
	//     userActions.setUser({
	//       name,
	//       email,
	//       accessToken,
	//     })
	//   );
	// }
	// }, [data]); // eslint-disable-line

	// useEffect(() => {
	//   if (error) {
	//     navigate('/');
	//   }
	// }, [error]);

	if (!true) {
		return (
			<div className='bg-primary text-cyan-400 flex w-screen h-screen items-center justify-center flex-col border-8 border-cyan-800 border-opacity-50 border-double'>
				<Loader type='Bars' color='currentColor' width='48' />
				<div className='text-white text-2xl uppercase tracking-widest'>
					{accessToken ? 'Verifying User' : 'Loading User Details'}
				</div>
			</div>
		);
	}

	return (
		<div className='bg-primary overflow-hidden p-3 lg:flex flex-row'>
			<div className='flex-none h-full pr-1.5'>
				<ProfileMenu />
			</div>
			<div className='flex-none w-3/12 h-full flex flex-col px-1.5'>
				<ChatSearch />
				<ChatList />
			</div>
			<div className='flex-1 w-8/12 h-full pl-1.5'>
				<ChatRoom />
			</div>
		</div >
	);
};

export default Chat;
