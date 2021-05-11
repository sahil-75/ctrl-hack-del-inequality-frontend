import React, { useEffect } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import Loader from 'react-loader-spinner';
import useInputForm from '../../hooks/useInputForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { userActions } from '../../features/user/user.slice';

const SignIn = (props) => {
	const [email, setEmail] = useInputForm('');
	const [password, setPassword] = useInputForm('');
	const dispatch = useDispatch();
	const loading = false;

	// useEffect(() => {
	//   if (data) {
	// const { name, email, accessToken } = data.login;

	// localStorage.setItem('accessToken', accessToken);

	// dispatch(
	//   userActions.setUser({
	//     name,
	//     email,
	//     accessToken,
	//   })
	// );

	// navigate('app');
	// }
	// }, [data, dispatch]);

	const submitHandler = (event) => {
		event.preventDefault();
		console.log({ email, password });

		// LOGIN LOGIC
		fetch('http://localhost:4000/user/login', {
			method: 'POST',
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" }
		}).then(
			response => response.json()
		).then(
			({ details, accessToken }) => {
				dispatch(userActions.setUser({ name: details.name, email: details.email, accessToken }));
				navigate('/')
			}
		).catch(
			console.error
		);
	};

	return (
		<div className='bg-primary'>
			<div className='bg-gray-800 bg-opacity-60 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 shadow-xl rounded-md pt-12 border-t-8 border-cyan-600'>
				<img
					src={`${process.env.PUBLIC_URL}/logo512.png`}
					alt='Voice Logo'
					title='Voice Logo'
					className='w-20 mx-auto mb-1'
				/>
				<h3 className='text-2xl text-gray-200 mb-8 text-center'>
					Sign in to your account
				</h3>
				<form onSubmit={submitHandler} className='px-5 mb-14'>
					<div>
						<label
							htmlFor='email'
							className='text-gray-200 text-base font-semibold'
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
							className='text-gray-200 text-base font-semibold'
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
						className={`btn-primary flex items-center justify-center w-full font-semibold uppercase tracking-wider ${loading
							? 'cursor-wait hover:bg-current bg-opacity-50 '
							: ''
							}`}
					>
						{loading ? (
							<span className='mr-3 w-5 h-5'>
								<Loader
									type='Bars'
									color='currentColor'
									width='auto'
									height='auto'
								/>
							</span>
						) : null}
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
