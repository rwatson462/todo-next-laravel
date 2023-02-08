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
    const token = cookies.get('token')
    const todoRepository = TodoRepository(token)
    const incompleteTodo = await todoRepository.uncomplete(Number(todoId))

    cookies.set('token', token, { maxAge: 1800000})  // Should be half an hour
    res.status(200).json(incompleteTodo)
    return
  }

  res.status(400)
    .send(`Invalid request method ${req.method}, expecting GET or PUT`)
}
