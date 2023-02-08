import { RegisterForm } from "@/pages/register"
import { LoginResponse } from '@/types/user'
import axios from "axios"
import {LoginForm} from "@/pages/login";

type UserRepository = {
  register: (data: RegisterForm) => Promise<LoginResponse>,
  login: (data: LoginForm) => Promise<LoginResponse>,
  check: () => Promise<LoginResponse>,
  logout: () => Promise<void>
}

export default function UserRepository(): UserRepository {
  return {
    register: data => (
      axios.put('/api/register', data)
        .then(response => response.data as LoginResponse)
    ),
    login: data => (
      axios.post('/api/login', data)
        .then(response => response.data as LoginResponse)
        .catch(err => {
          throw new Error(err.response?.data)
        })
    ),
    check: () => (
      axios.post('/api/authCheck')
        .then(response => response.data as LoginResponse)
        .catch(err => {
          console.log(err)
          throw new Error(err.response?.data)
        })
    ),
    logout: () => (
      axios.post('/api/logout')
    )
  }
}
