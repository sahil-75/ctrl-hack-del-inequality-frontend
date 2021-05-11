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
    const [orgID, setOrgID] = useInputForm('');
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
        setOrgID('');
    }

    const submitHandler = (event) => {
        event.preventDefault();
        //console.log({ email, password });

        // SIGNUP LOGIC
        fetch('http://localhost:4000/user/signup', {
            method: 'POST',
            body: JSON.stringify({ email, name, password, orgID }),
            headers: { "Content-Type": "application/json" }
        }).then(
            (response) => {
                console.log(response)
                if (response.statusCode != 400)
                    alert('User Added Successfully.')
                clearFormFields();
            }
        ).catch(
            console.error
        );
    };

    return (
        <div className='bg-primary'>
            <div className='bg-gray-800 bg-opacity-60 w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 shadow-xl rounded-md pt-7 border-t-8 border-cyan-600 my-4'>
                <img
                    src={`${process.env.PUBLIC_URL}/logo512.png`}
                    alt='Voice Logo'
                    title='Voice Logo'
                    className='w-20 mx-auto mb-1'
                />
                <h3 className='text-2xl text-gray-200 mb-6 text-center'>Employee Registration Dashboard</h3>
                <form onSubmit={submitHandler} className='px-5 mb-4'>
                    <div>
                        <label htmlFor='name' className='text-gray-200 text-base font-semibold'>Full Name</label>
                        <input id='name' type='text' className='input-primary' onChange={setName} />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='email' className='text-gray-200 text-base font-semibold'>Email</label>
                        <input id='email' type='email' className='input-primary' onChange={setEmail} />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='password' className='text-gray-200 text-base font-semibold'>Password</label>
                        <input id='password' type='password' className='input-primary' onChange={setPassword} />
                    </div>
                    <div className='mt-3'>
                        <label htmlFor='orgID' className='text-gray-200 text-base font-semibold'>Organization ID</label>
                        <input id='orgID' type='text' className='input-primary' onChange={setOrgID} />
                    </div>

                    <button type='submit' disabled={loading}
                        className={`mt-6 btn-primary flex items-center justify-center w-full font-semibold uppercase tracking-wider ${loading
                            ? 'cursor-wait hover:bg-current bg-opacity-50'
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