import { RegisterForm } from "@/pages/register"
import { RemoteUserRepository } from "@/types/user"
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
        .then(response => response.data)
        .catch((err: AxiosError) => {
          throw new Error(JSON.stringify(err.response?.data))
        })
    ),
    login: (data: LoginForm) => (
      client.post('/login', data)
        .then(response => response.data)
        .catch((err: AxiosError) => {
          console.log(err)
          throw new Error(JSON.stringify(err.response?.data))
        })
    )
  }
}
