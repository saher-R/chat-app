import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
};

const UserSlice = createSlice({
  name: "currentUserInfo",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
});

export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
