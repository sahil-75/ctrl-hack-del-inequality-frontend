import React from 'react';
import './App.css';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Chat from './pages/Chat/Chat';
import { Router } from '@reach/router';
import Delegatee from './components/Delegatee/Delegatee';

function App() {
	return (
		<Router>
			<SignIn path='signin' />
			<SignUp path='signup' />
			<Delegatee path='delegatee' />
			<Chat path='/' />
		</Router>
	);
}

export default App;
