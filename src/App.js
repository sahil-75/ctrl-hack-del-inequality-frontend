import React from 'react';
import { Router } from '@reach/router';

import Delegatee from './pages/Delegatee/Delegatee';
import Pomodoro from './pages/Pomodoro/Pomodoro';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Chat from './pages/Chat/Chat';
import './App.css';

function App() {
	return (
		<Router>
			<SignIn path='signin' />
			<SignUp path='signup' />
			<Pomodoro path='pomodoro' />
			<Delegatee path='delegatee' />
			<Chat path='/' />
		</Router>
	);
}

export default App;
