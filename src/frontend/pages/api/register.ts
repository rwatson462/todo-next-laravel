import UserRepository from '@/server/repository/UserRepository'
import type { NextApiRequest, NextApiResponse } from 'next'
import httpMethodNotAllowed from "@/server/functions/httpMethodNotAllowed";
import setCookieToken from "@/server/functions/setCookieToken";
import {UserResponse} from "@/pages/api/login";
import Cookies from "@/server/Cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse|string>
) {
  if (httpMethodNotAllowed(req, res, 'PUT')) {
    return
  }

  try {

    const cookies = Cookies(req, res)
    const userRepository = UserRepository()
    const response = await userRepository.register(req.body)
    setCookieToken(cookies, response.token)
    res.status(200).json(response)

  } catch (err) {

    const error = (err as ErrorType).message
    console.log(error)
    res.status(422).send(error)

  }
}
