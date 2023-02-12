import {createContext} from "react";
import {AuthContextType} from "@/client/Auth/Provider/AuthProvider";

export const AuthContext = createContext<AuthContextType>({
  setUser: (user) => user,
  isLoggedIn: () => false,
  logout: () => {},
  user: null,
})
