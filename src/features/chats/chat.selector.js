export const selectchats = (state) =>
  Object.values(state.chat.items);

export const selectUserMessage = (email) => (state) =>
  state.chat.items[email];

export const selectActiveUser = (state) =>
  state.chat.activeUserEmail;
