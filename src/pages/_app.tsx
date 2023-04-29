import type { AppProps } from "next/app";
import "../translations/i18init";
import "../styles/main.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from 'redux-persist/integration/react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}
