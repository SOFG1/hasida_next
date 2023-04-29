import type { AppProps } from "next/app";
import "../translations/i18init";
import "../styles/main.css";
import { Provider } from "react-redux";
import { persistor, store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import Wrapper from "./_wrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </PersistGate>
    </Provider>
  );
}
