import { createSlice } from '@reduxjs/toolkit';

const initialChatState = {
  activeUserEmail: '',
  items: {},
};

export const chatSlice = createSlice({
  name: 'chatCollection',
  initialState: initialChatState,
  reducers: {
    setChats(state, action) {
      return {
        ...state,
        items: Object.fromEntries(
          action.payload.map((chat) => [chat.email, chat])
        ),
      };
    },

    addMessagesToUser(
      state,
      action
    ) {
      const { email, messages } = action.payload;
      const userMessages = state.items[email]?.messages ?? [];
      return {
        ...state,
        items: {
          ...state.items,
          [email]: {
            ...state.items[email],
            messages: [...userMessages, ...messages],
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
