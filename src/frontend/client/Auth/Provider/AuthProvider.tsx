import {ReactElement, ReactNode, useEffect, useState} from "react";
import {AuthContext} from "@/client/Auth/Context/AuthContext";
import {User} from "@/types/user";
import {useRouter} from "next/router";
import UserRepository from "@/client/repository/UserRepository";

export type AuthContextType = {
  setUser: (user: User) => void,
  isLoggedIn: () => boolean,
  logout: () => void,
  user: User|null,
}

type AuthProviderProps = {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps): ReactElement {
  const userRepository = UserRepository()
  const [ user, setUser ] = useState<User|null>(null)
  const { push: navigateTo } = useRouter()

  const value: AuthContextType = {
    isLoggedIn: () => !!user,
    logout: () => {
      userRepository.logout()
        .then(() => setUser(null))
    },
    setUser: (user: User) => {
      setUser(user)
    },
    user: {...user} as User, // prevent modifying of the User object
  }

  useEffect(() => {
    if (user === null) {
      navigateTo('/login')
    } else {
      // If this is called due to a rerender (or React strict mode), an error is thrown which we don't need
      navigateTo('/')
        .catch(err => { console.log(err) })
    }
    // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    userRepository.check()
      .then(response => {
        setUser(response.user)
      })
      .catch(() => {
        setUser(null)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
