import { navigate } from '@reach/router';
import eachMinuteOfInterval from 'date-fns/eachMinuteOfInterval/index';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectEmails } from '../../features/chats/chat.selector';
import { selectAccessToken } from '../../features/user/user.selector';
import useInputForm from '../../hooks/useInputForm';
import { setDelegatee } from '../../services/api';

const Delegatee = () => {
	const [email, setEmail] = useInputForm(null);
	const emails = useSelector(selectEmails);
	const accessToken = useSelector(selectAccessToken);

	const setAsDelegatee = useCallback(() => {
		setDelegatee(
			{
				delegatee: email,
			},
			accessToken,
		);
		navigate('/');
	}, [email]); // eslint-disable-line

	return (
		<div
			className='bg-primary bg-blue-500 text-gray-500 p-12'
			style={{
				background: '#f2f2f2',
			}}
		>
			<div className='bg-white w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 shadow-xl rounded-xl py-4 overflow-y-auto max-h-full p-10 text-center'>
				<div className='my-2 text-2xl text-gray-800 '>
					Set your delegatee
				</div>
				<select
					id='role'
					className='input-primary'
					value={email}
					onChange={setEmail}
				>
					{emails?.map((em) => (
						<option value={em} key={em}>
							{em}
						</option>
					))}
				</select>
				<button className='btn-primary' onClick={setAsDelegatee}>
					Set As Delegatee
				</button>
			</div>
		</div>
	);
};

export default Delegatee;
