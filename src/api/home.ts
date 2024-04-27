import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery } from ".";
import { UserPhotoType } from "./user";
import { HYDRATE } from "next-redux-wrapper";

const emptyApi = createApi({
  reducerPath: "homeApi",
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  endpoints: () => ({}),
});

type ProfilesListParams = {
  [key: string]: any;
};




export const homeApi = emptyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => {
    return {
      profilesList: builder.query<any, ProfilesListParams>({
        query: (body) => {
          console.log("fetch");
          const params = { ...body };
          delete params._lang;
          return {
            url: `home/profiles_list/`,
            params,
          };
        },
        merge: (currentCache, newData, args) => {
          if (currentCache.data.length === args?.arg?.offset) {
            currentCache.data.push(...newData.data);
          }
        },
        serializeQueryArgs: (args) => {
          const params = { ...args.queryArgs };
          delete params.offset;
          return JSON.stringify(params);
        },
      }),
      profileDetails: builder.query<any, number>({
        query: (id) => {
          return {
            url: `home/profile_detail/${id}/`,
          };
        },
      }),
      profileLike: builder.mutation<any, number>({
        query: (id) => {
          return {
            url: `home/profile_like/${id}/`,
            method: "POST",
          };
        },
        async onQueryStarted(payload, { dispatch, queryFulfilled }) {
          //Set like
          const patchRes = dispatch(
            homeApi.util.updateQueryData("profileDetails", payload, (draft) => {
              draft.liked = true;
            })
          );
          try {
            const { data } = await queryFulfilled;
            //If mutual like
            if (data.res.cross) {
              dispatch(
                homeApi.util.updateQueryData(
                  "profileDetails",
                  payload,
                  (draft) => {
                    draft.mutual_like = true;
                  }
                )
              );
            }
          } catch {
            patchRes.undo();
          }
        },
        transformResponse: (res, req, id) => {
          return { res, id };
        },
      }),
      profileHide: builder.mutation<any, number>({ 
        query: (id) => { 
          return {
            url: `home/profile_hide/${id}/`,
            method: "POST", 
          };       
        },     
      }),         
    };             
  },               
});                     
       
export const {     
  useLazyProfilesListQuery,       
  useProfileDetailsQuery,  
  useProfileLikeMutation,    
  useProfileHideMutation, 
} = homeApi; 
  
export interface IProfile {
  age: number;
  city: { id: number; name: string } | null;
  first_name: string;
  last_name: string;
  gender: string;
  id: number;
  liked: boolean;
  online: boolean;
  photos: UserPhotoType[];
  main_photo: UserPhotoType | null;
  second_name: string;
  mutual_like?: boolean;
  viewed: boolean;
}