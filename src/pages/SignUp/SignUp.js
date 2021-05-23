import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import { useSelector } from 'react-redux';
import { FaArrowLeft } from 'react-icons/fa';

import Loader from 'react-loader-spinner';
import useInputForm from '../../hooks/useInputForm';

import {
	selectUser,
	selectAccessToken,
} from '../../features/user/user.selector';
import { signup } from '../../services/api';

const SignUp = (props) => {
	const [name, setName] = useInputForm('');
	const [alias, setAlias] = useInputForm('');
	const [password, setPassword] = useInputForm('');
	const [role, setRole] = useInputForm('select_an_option');

	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState('');
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);

	// const dispatch = useDispatch();
	const { email: loggedInUser } = useSelector(selectUser);
	const accessToken = useSelector(selectAccessToken);

	const loggedInUserDomain = loggedInUser.substring(
		loggedInUser.indexOf('@') + 1,
	);

	const clearFormFields = () => {
		setName('');
		setAlias('');
		setPassword('');
		setRole('select_an_option');
		setIsSubmitted(false);
	};

	useEffect(() => {
		if (
			email &&
			name &&
			password &&
			role !== 'select_an_option' &&
			isSubmitted
		) {
			setLoading(true);
			signup(
				{
					email,
					name,
					password,
					role,
				},
				accessToken,
			)
				.then((response) => response.json())
				.then((response) => {
					if (response.statusCode === 201) {
						alert('User Added Successfully.');
						clearFormFields();
					} else {
						throw new Error('User could not be added');
					}
				})
				.catch(console.error)
				.finally(() => setLoading(false));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [email, name, password, role, clearFormFields, isSubmitted]);

	const submitHandler = (event) => {
		event.preventDefault();

		if (alias.indexOf('@') !== -1)
			setEmailError(
				'Only enter the alias. Do not enter the full email id',
			);
		else {
			setEmailError('');
			setEmail(`${alias}@${loggedInUserDomain}`);
			setIsSubmitted(true);
		}
	};

	return (
		<div className='bg-primary bg-blue-500 text-gray-500 px-12 py-3'>
			<div className='bg-white w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 shadow-xl rounded-xl px-1 py-4 overflow-y-hidden max-h-full'>
				<h3 className='text-2xl text-gray-700 mt-2 mb-6 mx-3 text-center'>
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
							value={name}
							onChange={setName}
						/>
					</div>
					<div className='mt-3'>
						<label
							htmlFor='alias'
							className='text-gray-700 text-base font-medium'
						>
							Email Id
						</label>
						<div className='flex'>
							<input
								id='alias'
								type='text'
								className='input-primary flex-grow rounded-r-none'
								value={alias}
								onChange={setAlias}
							/>
							<h3
								className='input-primary flex-none rounded-l-none px-5 py-2 select-none'
								style={{
									backgroundColor: '#e6e6e6',
									width: 'fit-content',
								}}
							>{`@${loggedInUserDomain}`}</h3>
						</div>
						{emailError !== '' && (
							<label
								htmlFor='alias'
								className='text-sm ml-2 mb-2'
								style={{ color: '#af0000' }}
							>
								{emailError}
							</label>
						)}
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
							value={password}
							onChange={setPassword}
						/>
					</div>
					<div className='mt-3'>
						<label
							htmlFor='role'
							className='text-gray-700 text-base font-medium'
						>
							Assign Admin Privileges?
						</label>
						<select
							id='role'
							className='input-primary'
							value={role}
							onChange={setRole}
						>
							<option disabled value='select_an_option'>
								-- select an option --
							</option>
							<option value='admin'>Yes</option>
							<option value='user'>No</option>
						</select>
					</div>

					<button
						type='submit'
						disabled={
							loading ||
							name === '' ||
							alias === '' ||
							password === '' ||
							role === 'select_an_option'
						}
						className={`mt-6 btn-primary flex items-center justify-center w-full font-medium uppercase tracking-wider
							${loading
								? 'cursor-wait hover:bg-current bg-opacity-50'
								: name === '' ||
									alias === '' ||
									password === '' ||
									role === 'select_an_option'
									? 'bg-opacity-50'
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
			<h3
				className='absolute top-5 left-5 h-20 cursor-pointer'
				style={{ color: '#FFF' }}
				onClick={() => navigate('/')}
			>
				<FaArrowLeft size={30} />
			</h3>
		</div>
	);
};

export default SignUp;
