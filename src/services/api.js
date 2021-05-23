const PROD_URL = 'https://ctrl-hack-del-inequality-be.herokuapp.com';

const URL =
	process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : PROD_URL;

export const getUsers = async (token) => {
	try {
		const result = await fetch(`${URL}/user`, {
			method: 'GET',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		});

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

		return await result.json();
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const sendMessage = async (token, message) => {
	try {
		const result = await fetch(`${URL}/chat`, {
			method: 'POST',
			headers: {
				Authorization: 'Bearer ' + token,
				'Content-Type': 'application/json',
			},

			body: JSON.stringify(message),
		});

		return await result.json();
	} catch (error) {
		console.error(error);
		return [];
	}
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
