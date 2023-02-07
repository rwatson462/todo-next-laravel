import TodoRepository from '@/server/repository/TodoRepository'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[]|Todo|string>
) {
  if (req.method?.toUpperCase() === 'GET') {
    const todoRepository = TodoRepository(req.headers.authorization ?? '')

    try {
      const todos = await todoRepository.getAll()
      res.status(200).json(todos)
    } catch (err) {
      const message = (err as {message: string}).message
      if (message === 'Unauthenticated') {
        res.status(401).send(message)
        return
      }
      res.status(400).send(message)
    }

    return
  }

  res.status(400).send(`Invalid request method ${req.method}, expecting GET`)
}
