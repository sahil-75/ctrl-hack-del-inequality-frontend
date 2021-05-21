import { createSlice } from '@reduxjs/toolkit';

const initialRoomState = {
	currentRoom: '',
	messages: [],
	allRooms: [],
	roomData: {},
	issue: {},
};

export const roomSlice = createSlice({
	name: 'room',
	initialState: initialRoomState,
	reducers: {
		setAllRooms(state, action) {
			return { ...state, allRooms: [...action.payload] };
		},
		setRoomData(state, action) {
			return { ...state, roomData: { ...action.payload } };
		},
		addMesssage(state, action) {
			return { ...state, messages: [...state.messages, action.payload] };
		},
		removeAllMesssage(state) {
			return { ...state, messages: [] };
		},
		setCurrentRoom(state, action) {
			return { ...state, currentRoom: action.payload };
		},
	},
});

export const roomActions = roomSlice.actions;
