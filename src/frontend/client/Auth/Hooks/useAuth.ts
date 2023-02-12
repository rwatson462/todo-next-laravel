import {useContext} from "react";
import {AuthContext} from "@/client/Auth/Context/AuthContext";
import {AuthContextType} from "@/client/Auth/Provider/AuthProvider";

export default function useAuth(): AuthContextType {
    return useContext(AuthContext)
}
