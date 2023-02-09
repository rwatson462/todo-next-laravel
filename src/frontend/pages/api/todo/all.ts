import TodoRepository from '@/server/repository/TodoRepository'
import type { NextApiRequest, NextApiResponse } from 'next'
import {Todo} from "@/types/todo";
import Cookies from "@/server/Cookies";
import httpMethodNotAllowed from "@/server/functions/httpMethodNotAllowed";
import setCookieToken from "@/server/functions/setCookieToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Todo[]|string>
) {
  if (httpMethodNotAllowed(req, res, 'GET')) {
    return
  }

  const cookies = Cookies(req, res)
  const token = cookies.get('token')
  const todoRepository = TodoRepository(token)

  try {
    const todos = await todoRepository.getAll()
    setCookieToken(cookies, token)
    res.status(200).json(todos)

  } catch (err) {

    const message = (err as ErrorType).message
    console.log(message)
    res.status(400).send(message)
  }
}
