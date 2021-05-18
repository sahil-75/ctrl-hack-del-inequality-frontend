import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'react-loader-spinner';
import useInputForm from '../../hooks/useInputForm';
import { AppDispatch } from '../../app/store';
import { userActions } from '../../features/user/user.slice';

import { selectUser } from '../../features/user/user.selector';

const SignUp = (props) => {
	const [name, setName] = useInputForm('');
	const [email, setEmail] = useInputForm('');
	const [password, setPassword] = useInputForm('');
	const [isAdmin, setIsAdmin] = useInputForm('');
	const [emailError, setEmailError] = useState('');
	const dispatch = useDispatch();
	const loggedInUser = useSelector(selectUser); //Showing empty currently [Shubhajit please check] 

	let loggedInUser1, loggedInUserDomain;
	loggedInUser1 = 'sahil.kalyani@var.com';
	// console.log('Logged in as: ' + loggedInUser1);

	loggedInUserDomain = loggedInUser1.substring(loggedInUser1.indexOf('@') + 1);

	const loading = false;

	const clearFormFields = () => {
		setName('');
		setEmail('');
		setPassword('');
		setIsAdmin('');
	};

	const submitHandler = (event) => {
		event.preventDefault();

		if (email.indexOf('@') == -1)
			setEmailError('');
		else
			setEmailError('Only enter the alias. Do not enter the full email id');

		// SIGNUP LOGIC
		fetch('https://ctrl-hack-del-inequality-be.herokuapp.com/user/signup', {
			method: 'POST',
			body: JSON.stringify({ email, name, password, isAdmin }),
			headers: { 'Content-Type': 'application/json' },
		}).then((response) => {
			// console.log(response);
			if (response.statusCode !== 400)
				alert('User Added Successfully.');
			clearFormFields();
		}).catch(console.error);
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
				<h3 className='text-2xl text-gray-700 mb-6 mx-3 text-center'>Add New Employee</h3>
				<form onSubmit={submitHandler} className='px-5 mb-4'>
					<div>
						<label htmlFor='name' className='text-gray-700 text-base font-medium'>Full Name</label>
						<input
							id='name'
							type='text'
							className='input-primary'
							onChange={setName}
						/>
					</div>
					<div className='mt-3'>
						<label htmlFor='email' className='text-gray-700 text-base font-medium'>Email Id</label>
						<div className='flex'>
							<input
								id='email'
								type='text'
								className='input-primary flex-grow rounded-r-none'
								onChange={setEmail}
							/>
							<h3 className='input-primary flex-none rounded-l-none px-5 py-2 select-none' style={{ backgroundColor: '#e6e6e6', width: 'fit-content' }} >{`@${loggedInUserDomain}`}</h3>
						</div>
						{emailError != '' &&
							<label htmlFor='email' className='text-sm ml-2 mb-2' style={{ color: '#af0000' }}>{emailError}</label>
						}
					</div>
					<div className='mt-3'>
						<label htmlFor='password' className='text-gray-700 text-base font-medium'>Password</label>
						<input
							id='password'
							type='password'
							className='input-primary'
							onChange={setPassword}
						/>
					</div>
					<div className='mt-3'>
						<label htmlFor='isAdmin' className='text-gray-700 text-base font-medium'>Assign Admin Privileges?</label>
						<select id='isAdmin' className='input-primary' onChange={setIsAdmin} defaultValue='select_an_option'>
							<option disabled value='select_an_option'>-- select an option --</option>
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