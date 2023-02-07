import UserRepository from '@/server/repository/UserRepository'
import {LoginResponse} from '@/types/user'
import type { NextApiRequest, NextApiResponse } from 'next'

type ErrorResponse = {
    errors: [],
    message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse|ErrorResponse|string>
) {
  if (req.method?.toUpperCase() === 'PUT') {
    const userRepository = UserRepository()

    try {

      const response = await userRepository.register(req.body)
      res.status(200).json(response)

    } catch (err) {
      const error = (err as {message: ErrorResponse}).message as ErrorResponse
      console.log(error)
      res.status(422).send(error)

    }

    return
  }

  res.status(400).send(`Invalid request method ${req.method}, expecting PUT`)
}
