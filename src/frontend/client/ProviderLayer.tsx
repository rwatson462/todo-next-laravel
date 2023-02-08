import {ReactElement, ReactNode} from "react";
import CacheProvider from "@/client/Providers/CacheProvider";
import AuthProvider from "@/client/Auth/Provider/AuthProvider";

type ProviderLayerProps = {
  children: ReactNode
}

export default function ProviderLayer({ children }: ProviderLayerProps): ReactElement {
  return (
    <AuthProvider>
      <CacheProvider>
        {children}
      </CacheProvider>
    </AuthProvider>
  )
}
