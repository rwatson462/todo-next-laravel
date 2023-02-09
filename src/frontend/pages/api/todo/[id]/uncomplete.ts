import TodoRepository from '@/server/repository/TodoRepository'
import type { NextApiRequest, NextApiResponse } from 'next'
import {Todo} from "@/types/todo";
import Cookies from "@/server/Cookies";
import setCookieToken from "@/server/functions/setCookieToken";
import httpMethodNotAllowed from "@/server/functions/httpMethodNotAllowed";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo|string>
) {
  if (httpMethodNotAllowed(req, res, 'POST')) {
    return
  }

  const { id: todoId } = req.query

  if (isNaN(Number(todoId))) {
    res.status(400).send('Invalid todo ID given')
    return
  }

  const cookies = Cookies(req, res)
  const token = cookies.get('token')
  const todoRepository = TodoRepository(token)

  const incompleteTodo = await todoRepository.uncomplete(Number(todoId))

  setCookieToken(cookies, token)
  res.status(200).json(incompleteTodo)

}
