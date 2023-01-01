import { configureStore } from "@reduxjs/toolkit";
import ChatsSlice from "./Slices/ChatsSlice";
import UserSlice from "./Slices/UserSlice";

export const store = configureStore({
  reducer: {
    chats_info: ChatsSlice,
    current_user: UserSlice,
  },
});
