import {ReactElement, ReactNode, useEffect, useState} from "react";
import {AuthContext, AuthContextType} from "@/client/Auth/Context/AuthContext";
import {User} from "@/types/user";
import {useRouter} from "next/router";
import UserRepository from "@/client/repository/UserRepository";

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
        .catch(err => console.log(err))
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
      navigateTo('/')
    }
    // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    userRepository.check()
      .then(response => {
        setUser(response.user)
      })
      .catch(err => {
        console.log(err.message)
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
