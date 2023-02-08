import { RegisterForm } from "@/pages/register"
import {LoginResponse, RemoteUserRepository} from "@/types/user"
import axios, { AxiosError } from "axios"
import {LoginForm} from "@/pages/login";
import process from "process";

export default function UserRepository(): RemoteUserRepository {
  const client = axios.create({
    baseURL: `${process.env.API_URL}/auth`,
    headers: {
      apikey: process.env.API_KEY
    }
  })

  return {
    register: (data: RegisterForm) => (
      client.put('/register', data)
        .then(response => response.data as LoginResponse)
        .catch((err: AxiosError) => {
          throw new Error(JSON.stringify(err.response?.data))
        })
    ),
    login: (data: LoginForm) => (
      client.post('/login', data)
        .then(response => response.data as LoginResponse)
        .catch((err: AxiosError) => {
          console.log(err)
          throw new Error(JSON.stringify(err.response?.data))
        })
    ),
    check: (token: string) => (
      client.post('/check', { token }, {
        headers: {
          authorization: `Bearer ${token}`,
        }
      })
        .then(response => response.data as LoginResponse)
        .catch((err: AxiosError) => {
          console.log(err)
          throw new Error(JSON.stringify(err.response?.data))
        })
    )
  }
}
