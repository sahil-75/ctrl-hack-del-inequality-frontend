import React, { useState } from 'react';
import { navigate } from '@reach/router';
import Loader from 'react-loader-spinner';
import { useDispatch } from 'react-redux';

import { userActions } from '../../features/user/user.slice';
import useInputForm from '../../hooks/useInputForm';
import { login } from '../../services/api';

const SignIn = (props) => {
	const [email, setEmail] = useInputForm('');
	const [password, setPassword] = useInputForm('');
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);

	const submitHandler = (event) => {
		event.preventDefault();
		setLoading(true);
		login({ email, password })
			.then((response) => {
				if (response.status !== 200) alert('Invalid Credentials!');
				return response.json();
			})
			.then(({ details, accessToken }) => {
				dispatch(
					userActions.setUser({
						...details,
						accessToken,
					}),
				);
				navigate('/');
			})
			.catch(console.error)
			.finally(() => setLoading(false));
	};

	return (
		<div
			className='bg-primary bg-blue-500 text-gray-500 p-12'
			style={{
				background: '#f2f2f2',
			}}
		>
			<div className='bg-white w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 shadow-xl rounded-xl py-4 overflow-y-auto max-h-full'>
				<img
					src={`${process.env.PUBLIC_URL}/logo512.png`}
					alt='Voice Logo'
					title='Voice Logo'
					className='w-20 mx-auto mb-1'
				/>
				<h3 className='text-2xl text-gray-700 mb-8 text-center'>
					Sign in to your account
				</h3>
				<form onSubmit={submitHandler} className='px-6 mb-4'>
					<div>
						<label
							htmlFor='email'
							className='text-gray-600 text-base font-medium'
						>
							Email
						</label>
						<input
							id='email'
							type='email'
							className='input-primary'
							onChange={setEmail}
						/>
					</div>
					<div className='mt-4'>
						<label
							htmlFor='password'
							className='text-gray-600 text-base font-medium'
						>
							Password
						</label>
						<div>
							<input
								id='password'
								type='password'
								className='input-primary'
								onChange={setPassword}
							/>
						</div>
					</div>
					<button
						type='submit'
						disabled={loading}
						className={`btn-primary flex items-center justify-center w-full font-semibold uppercase tracking-wider ${
							loading
								? 'cursor-wait hover:bg-current bg-opacity-50 '
								: ''
						}`}
					>
						{loading ? (
							<span className='mr-3 w-5 h-5'>
								<Loader
									type='Circles'
									color='currentColor'
									width='auto'
									height='auto'
								/>
							</span>
						) : (
							'Submit'
						)}
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
