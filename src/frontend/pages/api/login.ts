import UserRepository from '@/server/repository/UserRepository'
import {User} from '@/types/user'
import type { NextApiRequest, NextApiResponse } from 'next'
import Cookies from "@/server/Cookies";

export type ErrorResponse = {
    errors: [],
    message: string
}

export type UserResponse = {
  user: User
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserResponse|ErrorResponse|string>
) {
  if (req.method?.toUpperCase() === 'POST') {
    const userRepository = UserRepository()
    const cookies = Cookies(req, res)

    try {

      const response = await userRepository.login(req.body)
      cookies.set('token', response.token, { maxAge: 1800000})  // Should be half an hour
      res.status(200).json({user: response.user})

    } catch (err) {

      const error = (err as {message: ErrorResponse}).message as ErrorResponse
      cookies.del('token')
      console.log(err, error)
      res.status(422).send(error)

    }

    return
  }

  res.status(400).send(`Invalid request method ${req.method}, expecting POST`)
}
