import { configureStore } from '@reduxjs/toolkit';
import { chatSlice } from '../features/chats/chat.slice.js';
import { userSlice } from '../features/user/user.slice.js';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		chat: chatSlice.reducer,
	},
});
