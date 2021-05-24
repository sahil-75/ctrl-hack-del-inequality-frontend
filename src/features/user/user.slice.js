import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: '',
	email: '',
	accessToken: null,
	pomodoroConfig: {},
	startHour: 10,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			return {
				...state,
				...action.payload,
			};
		},
		setAccessToken(state, action) {
			state.accessToken = action.payload.acessToken;
		},
		setPomodoroConfig(state, action) {
			return { ...state, pomodoroConfig: action.payload };
		},
		setStartHour(state, action) {
			return { ...state, startHour: action.payload };
		},
	},
});

export const userActions = userSlice.actions;
