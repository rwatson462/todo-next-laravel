import TodoRepository from '@/server/repository/TodoRepository'
import type { NextApiRequest, NextApiResponse } from 'next'
import {TodoGroup} from "@/types/todo";
import Cookies from "@/server/Cookies";
import httpMethodNotAllowed from "@/server/functions/httpMethodNotAllowed";
import setCookieToken from "@/server/functions/setCookieToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TodoGroup[]|string>
) {
  if (httpMethodNotAllowed(req, res, 'GET')) {
    return
  }

  const cookies = Cookies(req, res)
  const token = cookies.get('token')
  const todoRepository = TodoRepository(token)

  try {
    const groups = await todoRepository.getGroups()
    setCookieToken(cookies, token)
    res.status(200).json(groups)

  } catch (err) {

    const message = (err as ErrorType).message
    console.log(message)
    res.status(400).send(message)
  }
}
