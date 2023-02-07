import axios from "axios"
import useAuth from "@/client/Auth/Hooks/useAuth";
import {NewTodoForm} from "@/client/components/NewTodoForm";

type TodoRepository = {
  getAll: () => Promise<Todo[]>,
  create: (data: NewTodoForm) => Promise<Todo>,
  complete: (id: number) => Promise<Todo>,
  uncomplete: (id: number) => Promise<Todo>,
}

export default function TodoRepository(): TodoRepository {
  const { getToken, logout } = useAuth()
  const client = axios.create({
    baseURL: '/api',
    headers: {
      authorization: `Bearer ${getToken()}`
    }
  })

  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        logout()
        throw new Error('User is logged out')
      }
      return error
    }
  )

  return {
    getAll: () => (
      client.get('/todo/all')
        .then(response => response.data)
        .then(todos => todos === '' ? null : todos)
        .catch(err => {
          throw new Error(err.message)
        })
    ),

    create: (data) => (
      client.put('/todo/create', data)
        .then(response => response.data)
    ),

    complete: (id) => (
      client.post(`/todo/${id}/complete`)
        .then(response => response.data)
    ),

    uncomplete: (id) => (
      client.post(`/todo/${id}/uncomplete`)
        .then(response => response.data)
    )
  }
}
