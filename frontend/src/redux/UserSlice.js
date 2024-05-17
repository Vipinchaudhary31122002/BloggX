import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userid: "",
  username: "",
  authenticated: false,
  // posts: [
  //   {
  //     posttitle: "",
  //     postcontent: "",
  //     creationdate: "",
  //     like: "",
  //     comments: [
  //       {
  //         comment: "",
  //         username: "",
  //       },
  //     ],
  //   },
  // ],
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    SetUserData: (state, action) => {
      state.userid = action.payload.userid;
      state.username = action.payload.username;
      state.authenticated = true;
    },
  },
});

export const { SetUserData } = UserSlice.actions;

export default UserSlice.reducer;
