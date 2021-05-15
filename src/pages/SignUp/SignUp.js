import React, { useEffect } from 'react';
import { RouteComponentProps, navigate } from '@reach/router';
import Loader from 'react-loader-spinner';
import useInputForm from '../../hooks/useInputForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { userActions } from '../../features/user/user.slice';

const SignUp = (props) => {
	const [name, setName] = useInputForm('');
	const [email, setEmail] = useInputForm('');
	const [password, setPassword] = useInputForm('');
	const [isAdmin, setIsAdmin] = useInputForm('');
	const dispatch = useDispatch();
	const loading = false;

	// useEffect(() => {
	//     if (data) {
	//         const { name, email, accessToken } = data.login;

	//         localStorage.setItem('accessToken', accessToken);

	//         dispatch(
	//             userActions.setUser({
	//                 name,
	//                 email,
	//                 accessToken,
	//             })
	//         );

	//         navigate('app');
	//     }
	// }, [data, dispatch]);

	const clearFormFields = () => {
		setName('');
		setEmail('');
		setPassword('');
		setIsAdmin('');
	};

	const submitHandler = (event) => {
		event.preventDefault();
		// console.log({ email, name, password, isAdmin });

		// SIGNUP LOGIC
		fetch('https://ctrl-hack-del-inequality-be.herokuapp.com/user/signup', {
			method: 'POST',
			body: JSON.stringify({ email, name, password, isAdmin }),
			headers: { 'Content-Type': 'application/json' },
		})
			.then((response) => {
				console.log(response);
				if (response.statusCode !== 400)
					alert('User Added Successfully.');
				clearFormFields();
			})
			.catch(console.error);
	};

	return (
		<div className='bg-primary bg-blue-500 text-gray-500 px-12 py-3'>
			<div className='bg-white w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 shadow-xl rounded-xl px-1 py-4 overflow-y-hidden max-h-full'>
				<img
					src={`${process.env.PUBLIC_URL}/logo512.png`}
					alt='Voice Logo'
					title='Voice Logo'
					className='w-20 mx-auto mb-1'
				/>
				<h3 className='text-2xl text-gray-700 mb-6 mx-3 text-center'>
					Add New Employee
				</h3>
				<form onSubmit={submitHandler} className='px-5 mb-4'>
					<div>
						<label
							htmlFor='name'
							className='text-gray-700 text-base font-medium'
						>
							Full Name
						</label>
						<input
							id='name'
							type='text'
							className='input-primary'
							onChange={setName}
						/>
					</div>
					<div className='mt-3'>
						<label
							htmlFor='email'
							className='text-gray-700 text-base font-medium'
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
					<div className='mt-3'>
						<label
							htmlFor='password'
							className='text-gray-700 text-base font-medium'
						>
							Password
						</label>
						<input
							id='password'
							type='password'
							className='input-primary'
							onChange={setPassword}
						/>
					</div>
					<div className='mt-3'>
						<label
							htmlFor='isAdmin'
							className='text-gray-700 text-base font-medium'
						>
							Assign Admin Privileges?
						</label>
						<select
							id='isAdmin'
							className='input-primary'
							onChange={setIsAdmin}
						>
							<option disabled selected value>-- select an option --</option>
							<option value={true}>Yes</option>
							<option value={false}>No</option>
						</select>
					</div>

					<button
						type='submit'
						disabled={loading || (name == '' || email == '' || password == '' || isAdmin == '')}
						className={`mt-6 btn-primary flex items-center justify-center w-full font-medium uppercase tracking-wider
						${loading
								? 'cursor-wait hover:bg-current bg-opacity-50'
								: (name == '' || email == '' || password == '' || isAdmin == '')
									? 'bg-opacity-50'
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

export default SignUp;
