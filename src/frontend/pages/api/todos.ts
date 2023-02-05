import TodoRepository from '@/server/repository/TodoRepository'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[]|Todo|string>
) {
  if (req.method?.toUpperCase() === 'GET') {
    const todoRepository = TodoRepository()
    const todos = await todoRepository.getAll()

    res.status(200).json(todos)
    return
  }

  if (req.method?.toUpperCase() === 'PUT') {
    const todoRepository = TodoRepository()
    const newTodo = await todoRepository.create(req.body)
    
    res.status(200).json(newTodo)
    return
  }

  res.status(400).send(`Invalid request method ${req.method}, expecting GET or PUT` as unknown as Todo)
}
