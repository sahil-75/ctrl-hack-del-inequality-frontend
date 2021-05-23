import { createSlice } from '@reduxjs/toolkit';

const initialChatState = {
	activeUserEmail: '',
	items: {},
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState: initialChatState,
	reducers: {
		setChats(state, action) {
			return {
				...state,
				items: Object.fromEntries(
					(action.payload ?? []).map((chat) => [chat.email, chat]),
				),
			};
		},

		addMessageToUser(state, action) {
			const { email, message, lastModified } = action.payload;
			const userMessages = state.items[email]?.messages ?? [];
			return {
				...state,
				items: {
					...state.items,
					[email]: {
						...state.items[email],
						messages: [...userMessages, message],
						lastModified,
					},
				},
			};
		},

		addMessagesToUser(state, action) {
			const { email, messages } = action.payload;
			return {
				...state,
				items: {
					...state.items,
					[email]: {
						...state.items[email],
						messages: [...(messages || [])],
					},
				},
			};
		},

		setActiveUser(state, action) {
			return {
				...state,
				activeUserEmail: action.payload,
			};
		},
	},
});

export const chatActions = chatSlice.actions;
