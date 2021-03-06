import { navigate } from '@reach/router';
const PROD_URL = 'https://ctrl-hack-del-inequality-be.herokuapp.com';

const URL = PROD_URL;

export const getUsers = async (token) => {
	try {
		const result = await fetch(`${URL}/user`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		});

		if (!handleError(result)) {
			navigate('/signin');
			throw new Error('Api error occurred');
		}

		const body = await result.json();
		return await body.users;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getMessages = async (token, userId) => {
	try {
		const result = await fetch(`${URL}/chat/messages/` + userId, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		});

		if (!handleError(result)) {
			navigate('/signin');
			throw new Error('Api error occurred');
		}

		return await result.json();
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const sendMessage = async (token, message) => {
	return fetch(`${URL}/chat`, {
		method: 'POST',
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},

		body: JSON.stringify(message),
	}).then((res) => res.json());
};

export const login = (body) =>
	fetch(`${URL}/user/login`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: { 'Content-Type': 'application/json' },
	});

export const signup = (body, token) =>
	fetch(`${URL}/user/signup`, {
		method: 'POST',
		body: JSON.stringify(body),
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});

export const setDelegatee = (body, token) =>
	fetch(`${URL}/user`, {
		method: 'PUT',
		body: JSON.stringify(body),
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});

export const setBreakModeOnBE = (breakMode, token) => {
	fetch(`${URL}/user`, {
		method: 'PUT',
		body: JSON.stringify({
			isInBreakMode: breakMode,
		}),
		headers: {
			Authorization: 'Bearer ' + token,
			'Content-Type': 'application/json',
		},
	});
};

const handleError = (response) => {
	if (response.status === 403) {
		return false;
	}

	return true;
};
