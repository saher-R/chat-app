import { configureStore } from "@reduxjs/toolkit";
import ChatsSlice from "./Slices/ChatsSlice";
import UserSlice from "./Slices/UserSlice";

export const store = configureStore({
  reducer: {
    chats_info: ChatsSlice,
    current_user: UserSlice,
  },
});




// import { configureStore } from "@reduxjs/toolkit";
// import ChatsSlice from "./Slices/ChatsSlice";
// import UserSlice from "./Slices/UserSlice";
// /////// for fixd (A non-serializable) bug //////
// import { Iterable } from "immutable";
// import {
//   createSerializableStateInvariantMiddleware,
//   isPlain,
// } from "@reduxjs/toolkit";
// /////////////////////////
// // Augment middleware to consider Immutable.JS iterables serializable
// const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value);

// const getEntries = (value) =>
//   Iterable.isIterable(value) ? value.entries() : Object.entries(value);

// const serializableMiddleware = createSerializableStateInvariantMiddleware({
//   isSerializable,
//   getEntries,
// });
// ///////////////////////

// export const store = configureStore({
//   reducer: {
//     chats_info: ChatsSlice,
//     current_user: UserSlice,
//   },
//   /////////////////////
//   middleware: [serializableMiddleware],
// });
