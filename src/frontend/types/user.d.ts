import { RegisterForm } from "@/pages/register"
import {LoginForm} from "@/pages/login";

type User = {
  id: number,
  name: string
}

type LoginResponse = {
  user: User,
  token: string
}

type RemoteUserRepository = {
  register: (data: RegisterForm) => Promise<LoginResponse>,
  login: (data: LoginForm) => Promise<LoginResponse>
}
