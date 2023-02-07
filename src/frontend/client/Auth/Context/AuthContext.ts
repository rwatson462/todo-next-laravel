import {createContext} from "react";
import {User} from "@/types/user";

export type AuthContextType = {
  getToken: () => string|null,
  setToken: (token: string) => void,
  setUser: (user: User) => void,
  isLoggedIn: () => boolean,
  logout: () => void,
  user: User|null,
}

export const AuthContext = createContext<AuthContextType>({
  getToken: () => null,
  setToken: (token) => null,
  setUser: (user) => {},
  isLoggedIn: () => false,
  logout: () => {},
  user: null,
})
