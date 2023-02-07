import { RegisterForm } from "@/pages/register"
import { LoginResponse } from '@/types/user'
import axios from "axios"
import {LoginForm} from "@/pages/login";

type UserRepository = {
  register: (data: RegisterForm) => Promise<LoginResponse>,
  login: (data: LoginForm) => Promise<LoginResponse>
}

export default function UserRepository(): UserRepository {
  return {
    register: data => (
      axios.put('/api/register', data)
        .then(response => response.data)
    ),
    login: data => (
      axios.post('/api/login', data)
        .then(response => response.data)
        .catch(err => {
          throw new Error(err.response?.data)
        })
    )
  }
}
