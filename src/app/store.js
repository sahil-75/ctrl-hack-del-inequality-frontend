import { configureStore } from '@reduxjs/toolkit';
import { chatSlice } from '../features/chats/chat.slice.js';
import { roomSlice } from '../features/rooms/room.slice.js';
import { userSlice } from '../features/user/user.slice.js';

import { loadState, saveState } from '../utils/index';

const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		chat: chatSlice.reducer,
		room: roomSlice.reducer,
	},
	preloadedState: loadState(),
});

store.subscribe(() => saveState({ user: store.getState().user }));

export default store;
