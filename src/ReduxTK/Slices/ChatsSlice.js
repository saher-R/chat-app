import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: undefined,
  countOfCurrentChats: undefined,
};

const ChatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    putCurrentChat: (state, { payload }) => {
      state.currentChat = payload;
    },
    putCountOfCurrentChats: (state, { payload }) => {
      state.countOfCurrentChats = payload;
    },
  },
});

export const { putCurrentChat, putCountOfCurrentChats } = ChatsSlice.actions;

export default ChatsSlice.reducer;
