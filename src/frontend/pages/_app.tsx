import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from "@/client/Auth/Provider/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    }
  }
})

export default function App({ Component: Page, pageProps }: AppProps) {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* <link rel="icon" href="/favicon.ico" /> */}
    </Head>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <Page {...pageProps} />
        </QueryClientProvider>
      </AuthProvider>
  </>
}
