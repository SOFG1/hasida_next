import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUserState } from "./types";
import { userApi } from "../../api/user";

// Define the initial state using that type
const initialState: IUserState = {
  token: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    resetUserSlice: (state) => {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    //Add token and userInfo on sign up
    builder.addMatcher(
      userApi.endpoints.userSignUp.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
      }
    );
    //Add token and userInfo on sign in
    builder.addMatcher(
      userApi.endpoints.userLogin.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token;
      }
    );
  },
});

export const { setToken, resetUserSlice } = userSlice.actions;

export default userSlice.reducer;
