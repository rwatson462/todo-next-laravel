import axios from "axios"
import useAuth from "@/client/Auth/Hooks/useAuth";
import {NewTodoForm} from "@/client/components/NewTodoForm";
import {Todo, TodoGroup} from "@/types/todo";

type TodoRepository = {
  getAll: () => Promise<Todo[]>,
  getGroups: () => Promise<TodoGroup[]>,
  create: (data: NewTodoForm) => Promise<Todo>,
  complete: (id: number) => Promise<Todo>,
  uncomplete: (id: number) => Promise<Todo>,
}

export default function TodoRepository(): TodoRepository {
  const { logout } = useAuth()
  const client = axios.create({
    baseURL: '/api',
  })

  client.interceptors.response.use(
    response => response,
    error => {
      if (error.response.status === 401) {
        logout()
        console.log('User is logged out')
      }
    }
  )

  return {
    getAll: () => (
      client.get('/todo/all')
        .then(response => response.data as Todo[])
        .catch(err => {
          throw new Error(err.message)
        })
    ),

    getGroups: () => (
      client.get('/todo/groups')
        .then(response => response.data as TodoGroup[])
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
