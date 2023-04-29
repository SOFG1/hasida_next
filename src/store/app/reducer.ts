import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AlertType, IAppState } from "./types";
import { userApi } from "../../api/user";
import { chatApi } from "../../api/chat";

// Define the initial state using that type
const initialState: IAppState = {
  alert: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertType | null>) => {
      state.alert = action.payload;
    },
    resetAppSlice: (state) => {
      Object.assign(state, initialState)
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.userUploadPhoto.matchRejected,
      (state, { payload }: any) => {
        state.alert = {
          isError: true,
          text: payload?.error || "Error occured",
        };
      }
    );
    builder.addMatcher(
      userApi.endpoints.userEditProfile.matchRejected,
      (state, { payload }: any) => {
        state.alert = { isError: true, text: payload || "Error occured" };
      }
    );
    builder.addMatcher(
      chatApi.endpoints.chatComplain.matchRejected,
      (state, { payload }: any) => {
        state.alert = { isError: true, text: payload || "Error occured" };
      }
    );
  },
});

export const { setAlert, resetAppSlice } = appSlice.actions;

export default appSlice.reducer;
