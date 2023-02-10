import {QueryClient, QueryClientProvider} from "react-query";
import {ReactElement, ReactNode} from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    }
  }
})

type CacheProviderProps = {
  children: ReactNode
}

export default function CacheProvider({ children }: CacheProviderProps): ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
