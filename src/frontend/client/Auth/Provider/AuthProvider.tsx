import {ReactElement, ReactNode, useEffect, useState} from "react";
import {AuthContext, AuthContextType} from "@/client/Auth/Context/AuthContext";
import {User} from "@/types/user";
import useLocalStorage from "@/client/hooks/useLocalStorage";
import {useRouter} from "next/router";

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const localStorage = useLocalStorage()
  const [ user, setUser ] = useState<User|null>(null)
  const [ token, setToken ] = useState<string|null>(localStorage.getItem('token'))
  const { push: navigateTo } = useRouter()

  function _setToken(token: string) {
    localStorage.setItem('token', token)
    setToken(token)
  }

  const value: AuthContextType = {
    getToken: () => token,
    setToken: (token: string) => _setToken(token),
    isLoggedIn: () => !!user,
    logout: () => {
      setUser(null)
      setToken(null)
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
