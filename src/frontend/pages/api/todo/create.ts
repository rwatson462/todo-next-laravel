import TodoRepository from '@/server/repository/TodoRepository'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[]|Todo|string>
) {
  if (req.method?.toUpperCase() === 'PUT') {
    const todoRepository = TodoRepository(req.headers.authorization ?? '')

    try {
      const newTodo = await todoRepository.create(req.body)
      res.status(200).json(newTodo)
    } catch (err) {
      const message = (err as {message: string}).message
      console.log(message)
      res.status(400).send(message)
    }
    return
  }

  res.status(400).send(`Invalid request method ${req.method}, expecting PUT`)
}
