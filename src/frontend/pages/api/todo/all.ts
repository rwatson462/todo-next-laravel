import TodoRepository from '@/server/repository/TodoRepository'
import type { NextApiRequest, NextApiResponse } from 'next'
import {Todo} from "@/types/todo";
import Cookies from "@/server/Cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[]|Todo|string>
) {
  if (req.method?.toUpperCase() === 'GET') {
    const cookies = Cookies(req, res)
    const token = cookies.get('token')
    const todoRepository = TodoRepository(token)

    try {
      const todos = await todoRepository.getAll()
      cookies.set('token', token, { maxAge: 1800000})  // Should be half an hour
      res.status(200).json(todos)
    } catch (err) {
      const message = (err as {message: string}).message
      if (message === 'Unauthenticated') {
        cookies.del('token')
        res.status(401).send(message)
        return
      }
      res.status(400).send(message)
    }

    return
  }

  res.status(400).send(`Invalid request method ${req.method}, expecting GET`)
}
