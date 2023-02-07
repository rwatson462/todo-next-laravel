import {useContext} from "react";
import {AuthContext, AuthContextType} from "@/client/Auth/Context/AuthContext";

export default function useAuth(): AuthContextType {
    return useContext(AuthContext)
}
