import UserRepository from '@/server/repository/UserRepository'
import { User } from '@/types/user'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User|string>
) {
  if (req.method?.toUpperCase() === 'PUT') {
    const userRepository = UserRepository()
    const user = await userRepository.register(req.body)

    res.status(200).json(user)
    return
  }

  res.status(400).send(`Invalid request method ${req.method}, expecting PUT`)
}
