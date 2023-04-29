import type { AppProps } from 'next/app'
import "../translations/i18init";
import '../styles/main.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
