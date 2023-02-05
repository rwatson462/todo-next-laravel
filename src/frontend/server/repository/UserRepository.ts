import { RegisterForm } from "@/pages/register"
import { RemoteUserRepository } from "@/types/user"
import axios from "axios"

export default function UserRepository(): RemoteUserRepository {
  return {
    register: (data: RegisterForm) => (
      axios.put(`${process.env.API_URL}/register`, data)
        .then(response => response.data)
    )
  }
}
