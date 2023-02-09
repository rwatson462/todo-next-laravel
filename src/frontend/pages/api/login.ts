import UserRepository from '@/server/repository/UserRepository'
import {User} from '@/types/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from "@/server/Cookies";
import httpMethodNotAllowed from "@/server/functions/httpMethodNotAllowed";
import setCookieToken from "@/server/functions/setCookieToken";

export type UserResponse = {
  user: User
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse|string>
) {
  if (httpMethodNotAllowed(req, res, 'POST')) {
    return
  }

  const userRepository = UserRepository()
  const cookies = Cookies(req, res)

  try {

    const response = await userRepository.login(req.body)
    setCookieToken(cookies, response.token)
    res.status(200).json({user: response.user})

  } catch (err) {

    const error = (err as ErrorType).message
    console.log(err, error)
    cookies.del('token')
    res.status(422).send(error)

  }
}
