import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDashboardState } from "./types";

// Define the initial state using that type
const initialState: IDashboardState = {
  daysFilter: 30,
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDaysFilter: (state, action: PayloadAction<number>) => {
      state.daysFilter = action.payload;
    },
    resetDashboardSlice: (state) => {
      Object.assign(state, initialState)
    },
  },
});

export const { setDaysFilter, resetDashboardSlice } = dashboardSlice.actions;

export default dashboardSlice.reducer;
