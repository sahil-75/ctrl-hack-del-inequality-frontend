export const selectchats = (state) => [
	...Object.values(state.chat.items).filter(
		(c) => c.email !== state.user.email,
	),
];

export const selectEmails = (state) =>
	Object.keys(state.chat.items).filter((c) => c !== state.user.email);

export const selectUserMessage = (email) => (state) => state.chat.items[email];

export const selectAUser = (email) => (state) => state.chat.items[email];

export const selectAUserById = (_id) => (state) =>
	Object.values(state.chat.items).find((c) => c._id === _id);

export const selectActiveUser = (state) => state.chat.activeUserEmail;

export const selectActiveUserName = (email) => (state) =>
	Object.values(state.chat.items || []).find((chat) => chat.email === email)
		?.name;
