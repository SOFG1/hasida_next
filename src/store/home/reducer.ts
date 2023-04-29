import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IHomeState } from "./types";
import { IProfile, homeApi } from "../../api/home";

// Define the initial state using that type
const initialState: IHomeState = {
  appliedFilters: {},
  isFetchingFeed: false,
  feedData: {
    data: [],
    count: 0,
  },
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setAppliedFilters: (
      state,
      action: PayloadAction<{ [key: string]: any }>
    ) => {
      state.appliedFilters = action.payload;
      state.feedData = {
        data: [],
        count: 0,
      };
      state.isFetchingFeed = false;
    },
    removeFilter: (state, action: PayloadAction<string>) => {
      delete state.appliedFilters[action.payload];
      state.feedData = {
        data: [],
        count: 0,
      };
      state.isFetchingFeed = false;
    },
    setIsFetchingFeed: (state, action: PayloadAction<boolean>) => {
      state.isFetchingFeed = action.payload;
    },
    setFeedData: (
      state,
      action: PayloadAction<{ data: IProfile[]; count: number }>
    ) => {
      state.feedData.data.push(...action.payload.data);
      state.feedData.count = action.payload.count;
    },
    removeFeedData: (state) => {
      state.feedData = { data: [], count: 0 };
    },
    resetHomeSlice: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      homeApi.endpoints.profileHide.matchFulfilled,
      (state) => {
        state.feedData = { data: [], count: 0 };
      }
    );
  },
});

export const {
  setAppliedFilters,
  removeFilter,
  setIsFetchingFeed,
  resetHomeSlice,
  setFeedData,
  removeFeedData,
} = homeSlice.actions;

export default homeSlice.reducer;
