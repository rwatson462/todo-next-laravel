import TodoRepository from '@/server/repository/TodoRepository'
import type { NextApiRequest, NextApiResponse } from 'next'
import {Todo} from "@/types/todo";
import Cookies from "@/server/Cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo|string>
) {
  const { id: todoId } = req.query

  if (isNaN(Number(todoId))) {
    res.status(400).send('Invalid todo ID given')
    return
  }

  if (req.method?.toUpperCase() === 'POST') {
    const cookies = Cookies(req, res)
    const todoRepository = TodoRepository(cookies.get('token', ''))
    const completeTodo = await todoRepository.complete(Number(todoId))

    res.status(200).json(completeTodo)
    return
  }

  res.status(400)
    .send(`Invalid request method ${req.method}, expecting GET or PUT`)
}
