import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user";
import { userApi } from "../api/user";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { appReducer } from "./app";
import { dashboardReducer } from "./dashboard";
import { homeReducer } from "./home";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { dashboardApi } from "../api/dashboard";
import { chatApi } from "../api/chat";
import { homeApi } from "../api/home";
import { settingsApi } from "../api/settings";

const persistedUserReducer = persistReducer(
  {
    key: "user",
    storage,
    whitelist: ["token", "signUpStep", "userInfo"],
  },
  userReducer
);

export const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [userApi.reducerPath]: userApi.reducer,
    app: appReducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [homeApi.reducerPath]: homeApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    dashboard: dashboardReducer,
    home: homeReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(userApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(homeApi.middleware)
      .concat(chatApi.middleware)
      .concat(settingsApi.middleware)

  },
});

export const persistor = persistStore(store);

export type RootStateType = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
