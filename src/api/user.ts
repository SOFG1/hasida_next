import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, baseUrl } from ".";


const emptyApi = createApi({
  reducerPath: "userApi",
  baseQuery,
  tagTypes: ["User", "Fields", "FieldOptions"],
  endpoints: () => ({}),
})

export const userApi = emptyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => {
    return {
      userInfo: builder.query<IUserInfo, void>({
        providesTags: ["User"],
        query: () => {
          return {
            url: "user/info/",
          };
        },
      }),
      userLogin: builder.mutation<
        { token: string },
        { email: string; password: string }
      >({
        query: (body) => {
          return {
            url: "user/signin/",
            method: "POST",
            body,
          };
        },
        transformErrorResponse: (raw: any): any => {
          return raw.data;
        },
      }),
      userSignUp: builder.mutation<{ token: string }, UserSignUpPayload>({
        query: (body) => {
          return {
            url: "user/signup/",
            method: "POST",
            body,
          };
        },
        transformErrorResponse: (raw: any): string => {
          return raw.data.error || raw.data.detail;
        },
      }),
      userRecoverPass: builder.mutation<{ token: string }, string>({
        query: (email) => {
          return {
            url: "user/fogot_pwd/",
            method: "POST",
            body: {
              email,
            },
          };
        },
        transformErrorResponse: (raw: any): string => {
          return raw.data.error || raw.data.detail;
        },
      }),
      userGetFields: builder.query<IField[], void>({
        providesTags: ["Fields"],
        query: () => {
          return {
            url: "user/profile/fields/",
          };
        },
        transformResponse: (raw: { [key: string]: IField }): IField[] => {
          return Object.values(raw || {}).sort((a: IField, b: IField) => {
            return a.step * 1000 + a.order - (b.step * 1000 + b.order);
          });
        },
        transformErrorResponse: (raw: any): string => {
          return raw.error;
        },
      }),
      userGetFieldOptions: builder.query<
        any[],
        { field: string; country_id?: number; state_id?: number }
      >({
        providesTags: ["FieldOptions"],
        query: ({ field, country_id, state_id }) => {
          return {
            url: `user/profile/fields/${field}`,
            params: { country_id, state_id },
          };
        },
        transformErrorResponse: (raw: any): string => {
          return raw.error;
        },
      }),
      userEditProfile: builder.mutation<
        { [key: string]: any },
        { [key: string]: any }
      >({
        invalidatesTags: ["User"],
        query: (body) => {
          return {
            url: "user/profile/edit/",
            method: "POST",
            body,
          };
        },
        transformErrorResponse: (raw: any): string => {
          return raw.data.error;
        },
      }),
      userUploadPhoto: builder.mutation<
        UserPhotoType,
        { photo: File; is_main: boolean }
      >({
        invalidatesTags: ["User"],
        query: (body) => {
          const formData = new FormData();
          formData.append("photo", body.photo);
          formData.append("is_main", String(body.is_main));
          return {
            url: "user/photo/",
            method: "POST",
            body: formData,
          };
        },
      }),
      userDeletePhoto: builder.mutation<number, number>({
        query: (id: number) => {
          return {
            url: `user/photo/${id}/`,
            method: "DELETE",
          };
        },
        transformResponse: (raw: any, request: any, id: number): number => {
          return id;
        },
        invalidatesTags: ["User"],
      }),
      userSetMainPhoto: builder.mutation<any, UserPhotoType>({
        query: (body) => {
          return {
            url: `user/photo/${body.id}/set_main/`,
            method: "POST",
          };
        },
        invalidatesTags: ["User"],
      }),
      userSetGeoLocation: builder.mutation<any, {lat: number, long: number}>({
        query: (body) => {
          return {
            url: `user/set_geo/`,
            method: "POST",
            body
          };
        },
      }), 
    };
  },
});

export const {
  useUserInfoQuery,
  useUserLoginMutation,
  useUserSignUpMutation,
  useUserRecoverPassMutation,
  useUserGetFieldsQuery,
  useUserGetFieldOptionsQuery,
  useUserUploadPhotoMutation,
  useUserDeletePhotoMutation,
  useUserSetMainPhotoMutation,
  useUserEditProfileMutation,
  useUserSetGeoLocationMutation
} = userApi;

export const googleLoginUrl = `${baseUrl}/user/signin/google/`; //Url for window.open
export const facebookLoginUrl = `${baseUrl}/user/signin/facebook/`;

//Types:
type FieldType =
  | "Text" //Textarea
  | "String" //Text input
  | "Date" //Date input
  | "Integer" //Number input
  | "ForeignKey" //Country dropdown
  | "Boolean" //Radio input
  | "Many2Many" //Multiselect

export interface IField {
  id: number;
  name: string;
  view_name: string;
  type: FieldType; //Input type
  step: 1 | 2 | 3; //SignUpStep
  is_registration: boolean; //Show on registration view
  is_profile: boolean; //Show on 'edit profile' view
  is_filter: boolean; //Show on 'filters' view
  options: string[]; //Dropdown options
  order: number; //Order priority
}

type UserSignUpPayload = {
  email: string;
  password: string;
  password_confirmation: string;
  mobile_phone: string
};

export type UserPhotoType = {
  id: number;
  url: string;
};

export interface IUserInfo {
  id: number;
  email: string;
  date_joined: string;
  profile: { [key: string]: any };
}
