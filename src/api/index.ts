import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import axios, {AxiosInstance} from 'axios'
import { RootStateType } from "../store/store";

export const hostUrl = 'https://www.nestingmatch.com'
const apiVerison = 'v1'
export const baseUrl = `${hostUrl}/api/${apiVerison}`


//RTK query api
export const baseQuery = fetchBaseQuery({
    baseUrl: `${baseUrl}/`,
    prepareHeaders: (headers, { getState, endpoint }) => {
      //Authorization header
      const token = (getState() as RootStateType).user.token;
      if (token) {
        headers.set("Authorization", `Token ${token}`);
      }

      //Language header (localization)
      const language = localStorage.getItem("i18nextLng");
      if (language) {
        headers.set("Accept-Language", language);
      }
  
      return headers;
    },
  });


//Axios instance
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: `${baseUrl}/`,
});



//socket.io (WebSocket)

let socket: any
let oldToken: any


export const getSocketInstance = (token: string | null): WebSocket | undefined => {
  if(token === oldToken && socket) {
    //Return socket when already exists
    return socket
  }
  if(token !== oldToken && socket) {
    //CLose old connection when token changes
    socket?.close()
  } 
  if(token) {
  //Create a socket  
  socket = new WebSocket(`wss://www.nestingmatch.com/ws/?token=${token}`)
  oldToken = token
  //Auto reconnect
  socket.addEventListener('close', () => {
    setTimeout(() => {
      socket = new WebSocket(`wss://www.nestingmatch.com/ws/?token=${token}`)
    }, 3000)
  })
  return socket
  }
}


