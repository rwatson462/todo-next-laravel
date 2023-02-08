import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import ProviderLayer from "@/client/ProviderLayer";

export default function App({ Component: Page, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
      <ProviderLayer>
        <Page {...pageProps} />
      </ProviderLayer>
  </>
}
