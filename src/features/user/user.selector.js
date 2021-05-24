export const selectUser = (state) => state.user;

export const selectAccessToken = (state) => state.user.accessToken;

export const selectPomodoroConfig = (state) => state.user.pomodoroConfig;

export const selectStartHour = (state) => state.user.startHour;
