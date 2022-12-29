import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: undefined,
};

const ChatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    putCurrentChat: (state, { payload }) => {
      state.currentChat = payload;
    },
  },
});

export const { putCurrentChat } = ChatsSlice.actions;

export default ChatsSlice.reducer;
