import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  accessToken: null
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
    setAccessToken(
      state,
      action
    ) {
      state.accessToken = action.payload.acessToken;
    },
  },
});

export const userActions = userSlice.actions;
