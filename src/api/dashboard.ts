import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from ".";
import { IProfile } from "./home";
import { HYDRATE } from "next-redux-wrapper";

const emptyApi = createApi({
  reducerPath: "dashboardApi",
  tagTypes: ["Dashboard"],
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: () => ({}),
});

export const dashboardApi = emptyApi.injectEndpoints({
  endpoints: (builder) => {
    return {
      getDashboard: builder.query<IDashboard, number>({
        providesTags: ["Dashboard"],
        query: (days) => {
          return {
            url: "user/dashboard/",
            params: { days },
          };
        },
      }),
    };
  },
});

export const { useGetDashboardQuery } = dashboardApi;

export interface IDashboard {
  activity: {
    i_liked: number;
    i_saw: number;
    searches: number;
  };
  liked_me: IProfile[];
  viewers: IProfile[];
  i_liked: IProfile[];
  likes_matches: IProfile[];
  i_viewer: IProfile[];
  show_in_search: {
    all: 0;
    open: 0;
    write: 0;
  };
}
