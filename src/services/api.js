export const getUsers = async (token) => {
	try {
		const result = await fetch(
			'https://ctrl-hack-del-inequality-be.herokuapp.com/user',
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json',
				},
			},
		);

		const body = await result.json();
		return await body.users;
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const getMessages = async (token, userId) => {
	try {
		const result = await fetch(
			'https://ctrl-hack-del-inequality-be.herokuapp.com/chat/messages/' +
				userId,
			{
				method: 'GET',
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json',
				},
			},
		);

		return await result.json();
	} catch (error) {
		console.error(error);
		return [];
	}
};

export const sendMessage = async (token, message) => {
	try {
		const result = await fetch(
			'https://ctrl-hack-del-inequality-be.herokuapp.com/chat',
			{
				method: 'POST',
				headers: {
					Authorization: 'Bearer ' + token,
					'Content-Type': 'application/json',
				},

				body: JSON.stringify(message),
			},
		);

		return await result.json();
	} catch (error) {
		console.error(error);
		return [];
	}
};
