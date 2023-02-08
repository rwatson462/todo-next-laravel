import {createContext} from "react";
import {User} from "@/types/user";

export type AuthContextType = {
  setUser: (user: User) => void,
  isLoggedIn: () => boolean,
  logout: () => void,
  user: User|null,
}

export const AuthContext = createContext<AuthContextType>({
  setUser: (user) => {},
  isLoggedIn: () => false,
  logout: () => {},
  user: null,
})
