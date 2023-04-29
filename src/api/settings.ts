import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from ".";

const emptyApi = createApi({
  reducerPath: "settingsApi",
  baseQuery,
  endpoints: () => ({}),
});

export const settingsApi = emptyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => {
    return {
      getTariffs: builder.query<ITariff[], void>({
        query: (days) => {
          return {
            url: "settings/tariff_schedules/",
            params: { days },
          };
        },
      }),
      payTariff: builder.mutation<any, number>({
        query: (tariff_id) => {
          return {
            url: "settings/pay/",
            method: "POST",
            body: {
              tariff_id,
            },
          };
        },
        transformErrorResponse: (raw: any) => {
          return raw?.data?.detail || raw?.data?.error;
        },
      }),
    };
  },
});

export const { useGetTariffsQuery, usePayTariffMutation } = settingsApi;

export interface ITariff {
  id: number;
  name: string;
  description: string;
  amount: number;
}
