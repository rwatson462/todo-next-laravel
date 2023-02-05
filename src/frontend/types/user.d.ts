import { RegisterForm } from "@/pages/register"

type User = {
  id: number,
  name: string
}

type RegisterResponse = User & {
  authToken: string
}

type RemoteUserRepository = {
  register: (data: RegisterForm)
    => Promise<RegisterResponse>
}