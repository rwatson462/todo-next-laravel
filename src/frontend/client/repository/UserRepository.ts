import { RegisterForm } from "@/pages/register"
import axios from "axios"

type RegisterResponse = {
  id: number,
  name: string,
  authToken: string
}

type UserRepository = {
  register: (data: RegisterForm) => Promise<RegisterResponse>
}

export default function UserRepository(): UserRepository {
  return {
    register: data => (
      axios.put('/api/register', data)
        .then(response => response.data)
    )
  }
}