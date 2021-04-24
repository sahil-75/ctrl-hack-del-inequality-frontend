export const selectchats = (state) =>
  Object.values(state.chatCollection.items);

export const selectUserMessage = (email) => (state) =>
  state.chatCollection.items[email];

export const selectActiveUser = (state) =>
  state.chatCollection.activeUserEmail;
