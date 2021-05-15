import React from 'react';
import './App.css';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Chat from './pages/Chat/Chat';
import { Router } from '@reach/router';

function App() {
	return (
		<Router>
			<SignIn path='signin' />
			<SignUp path='signup' />
			<Chat path='/' />
		</Router>
	);
}

export default App;
