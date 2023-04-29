import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery, getSocketInstance } from ".";
import { UserPhotoType } from "./user";



const emptyApi = createApi({
  reducerPath: "chatApi",
  baseQuery,
  endpoints: () => ({}),
})



export const chatApi = emptyApi.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => {
    return {
      chatGetDialogs: builder.query<IDialog[], void>({
        query: () => {
          return {
            url: `chat/dialogs/`,
            method: "GET",
          };
        },
      }),
      chatCreateDialog: builder.mutation<IDialog, number>({
        query: (id) => {
          return {
            url: `chat/dialogs/`,
            method: "POST",
            body: {
              opponent: id,
            },
          };
        },
        async onQueryStarted(payload, { dispatch, queryFulfilled }) {
          const { data } = await queryFulfilled;
          dispatch(
            chatApi.util.updateQueryData(
              "chatGetDialogs",
              undefined,
              (draft) => {
                const alreadyExist = draft.find((d) => d.id === data.id);
                if (!alreadyExist) {
                  draft.push(data);
                }
              }
            )
          );
        },
      }),
      chatGetMessages: builder.query<IChatMessage[], number>({
        query: (id) => {
          return {
            url: `chat/messages/${id}`,
            method: "GET",
          };
        },
        onCacheEntryAdded: (arg, { getState, updateCachedData }) => {
          const state = getState();
          //@ts-ignore
          const token = state?.user?.token || null;
          const socket = getSocketInstance(token);
          socket?.addEventListener("message", (m) => {
            const res = JSON.parse(m.data);
            //Response of sent message
            if (res.event_type === "response" && res.data.status === 1) {
              if (res.data.message.dialog_id === arg) {
                updateCachedData((draft) => {
                  draft.unshift(res.data.message);
                });
              }
            }
            //New message from opponent
            if (res.event_type === "message") {
              updateCachedData((draft) => {
                draft.unshift(res.data);
              });
            }
          });
        },
      }),
      chatSetMessagesRead: builder.mutation<any, {dialog_id: number, messages: number[]}>({
        query: (messages) => {
          return {
            url: `chat/messages/set_read/`,
            method: "POST",
            body: {
              messages,
            },
          };
        },
        async onQueryStarted(payload, { getState }) {
          const state = getState();
          //@ts-ignore
          const token = state?.user?.token || null;
          const socket = getSocketInstance(token);
          const data = {
            event_type: "read_message",
            data: {
              dialog_id: payload.dialog_id,
              messages: payload.messages[0]
            },
          };
          socket?.send(JSON.stringify(data))
        },
      }),
      chatGetComplainDetails: builder.query<any, void>({
        query: () => {
          return {
            url: `chat/complaint/`,
            method: "GET",
          };
        },
      }),
      chatComplain: builder.mutation<any, ChatComplainParams>({
        query: ({ id, reason, description }: ChatComplainParams) => {
          return {
            url: `chat/complaint/${id}/`,
            method: "POST",
            body: {
              reason,
              description,
            },
          };
        },
        transformErrorResponse: (raw: any) => {
          return raw.data.detail;
        },
      }),
    };
  },
});

export interface IDialogOpponent {
  id: number;
  age: number;
  city: { id: number; name: string } | null;
  distance: null;
  first_name: string;
  second_name: string;
  gender: string;
  main_photo: UserPhotoType | null;
  online: true | string;
  photos: UserPhotoType[];
}

export interface IDialog {
  id: number;
  is_closed: boolean;
  opponent: IDialogOpponent;
}

export interface IChatMessage {
  id: number;
  date: string;
  dialog_id: number;
  read: boolean;
  sender_id: number;
  text: string;
}

type ChatComplainParams = { id: number; reason?: string; description?: string };

export const {
  useChatGetDialogsQuery,
  useChatCreateDialogMutation,
  useChatGetComplainDetailsQuery,
  useChatComplainMutation,
  useChatGetMessagesQuery,
  useChatSetMessagesReadMutation,
} = chatApi;
