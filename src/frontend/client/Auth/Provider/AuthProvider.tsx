import {ReactElement, ReactNode, useEffect, useState} from "react";
import {AuthContext, AuthContextType} from "@/client/Auth/Context/AuthContext";
import {User} from "@/types/user";
import {useRouter} from "next/router";

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const [ user, setUser ] = useState<User|null>(null)
  const { push: navigateTo } = useRouter()

  const value: AuthContextType = {
    isLoggedIn: () => !!user,
    logout: () => {
      setUser(null)
    },
    setUser: (user: User) => {
      setUser(user)
    },
    user: {...user} as User, // prevent modifying of the User object
  }

  useEffect(() => {
    if (user === null) {
      navigateTo('/login')
    }
  }, [user])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
