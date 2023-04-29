import type { AppProps } from 'next/app'
import "../translations/i18init";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
