import { navigate, RouteComponentProps } from '@reach/router';
import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import ChatList from '../../components/ChatList/ChatList';
import ChatRoom from '../../components/ChatRoom/ChatRoom';
import {
	selectAccessToken,
	selectUser,
} from '../../features/user/user.selector';
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

	if (!email) {
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
		<div className='bg-primary flex flex-col overflow-hidden lg:flex lg:flex-row border-cyan-400 border-t-4'>
			<ChatList />
			<ChatRoom />
		</div>
	);
};

export default Chat;
